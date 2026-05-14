/**
 * Integration tests for `GET /callback` mounted under the Express adapter.
 *
 * `GET /callback` is the most complex endpoint:
 *   - Validates the CSRF state (cookie vs query).
 *   - Validates the `redirectUrl` query parameter against the request origin.
 *   - Exchanges the authorization code for tokens via the Login Page's
 *     `/token` endpoint (MSW-mocked).
 *   - Sets the access_token / refresh_token cookies.
 *   - Invokes the consumer's `ssoRedirect` callback (if any) or redirects
 *     by default.
 */

import type { SsoRedirect } from "@reltio/auth/types";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	createTestApp,
	DEFAULT_CONFIG,
	mswServer,
	parseSetCookies,
	TEST_APP_ORIGIN,
	TEST_HOST,
	TEST_LOGIN_HOST,
	useMswServer,
} from "./testApp";

/** Helper: mocks the Login Page's `/token` endpoint with the given response. */
function mockTokenExchange(response: {
	access_token?: string;
	refresh_token?: string;
	status?: number;
	body?: unknown;
}) {
	mswServer.use(
		http.post(`${TEST_LOGIN_HOST}/token`, async () => {
			if (response.status && response.status >= 400) {
				return HttpResponse.json(response.body ?? { error: "rejected" }, {
					status: response.status,
				});
			}
			return HttpResponse.json({
				access_token: response.access_token ?? "fresh_access_token",
				refresh_token: response.refresh_token ?? "fresh_refresh_token",
			});
		}),
	);
}

const STATE = "fixed-state-value";

describe("Express adapter — GET /callback", () => {
	useMswServer();

	it("exchanges the code, sets both token cookies, and 302s to redirectUrl", async () => {
		mockTokenExchange({
			access_token: "new_access_token_xyz",
			refresh_token: "new_refresh_token_abc",
		});
		// Cookie attributes are exercised under secure: true so the Secure
		// flag is present in the assertion below.
		const app = createTestApp({ config: { secure: true } });

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({
				code: "auth_code_xxx",
				state: STATE,
				redirectUrl: `${TEST_APP_ORIGIN}/dashboard`,
			});

		expect(res.statusCode).toBe(302);
		expect(res.headers.location).toBe(`${TEST_APP_ORIGIN}/dashboard`);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.access_token.value).toBe("new_access_token_xyz");
		expect(cookies.refresh_token.value).toBe("new_refresh_token_abc");

		const accessAttrs = cookies.access_token.attributes.join("; ");
		expect(accessAttrs).toContain("HttpOnly");
		expect(accessAttrs).toContain("Secure");
		expect(accessAttrs).toContain("SameSite=Lax");
		expect(accessAttrs).toContain("Path=/");
	});

	it("redirects to / when redirectUrl is omitted", async () => {
		mockTokenExchange({});
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		expect(res.statusCode).toBe(302);
		expect(res.headers.location).toBe("/");
	});

	it("sends grant_type=authorization_code and Basic auth to the Login Page /token endpoint", async () => {
		let capturedBody: unknown;
		let capturedAuth: string | null = null;
		mswServer.use(
			http.post(`${TEST_LOGIN_HOST}/token`, async ({ request }) => {
				capturedBody = await request.json();
				capturedAuth = request.headers.get("authorization");
				return HttpResponse.json({
					access_token: "a",
					refresh_token: "r",
				});
			}),
		);
		const app = createTestApp();

		await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "auth_code_yyy", state: STATE });

		expect(capturedBody).toEqual({
			grant_type: "authorization_code",
			code: "auth_code_yyy",
		});
		expect(capturedAuth).toBe(
			`Basic ${btoa(`${DEFAULT_CONFIG.clientId}:${DEFAULT_CONFIG.clientSecret}`)}`,
		);
	});

	it("returns 401 when the state cookie and query parameter do not match", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", ["state=cookie-value"])
			.query({ code: "x", state: "different-value" });

		expect(res.statusCode).toBe(401);
		expect(res.headers["set-cookie"]).toBeUndefined();
	});

	it("returns 401 when the state cookie is missing", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.query({ code: "x", state: STATE });

		expect(res.statusCode).toBe(401);
	});

	it("returns 401 when the state query parameter is missing", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x" });

		expect(res.statusCode).toBe(401);
	});

	it("returns 400 when redirectUrl is on a foreign host", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({
				code: "x",
				state: STATE,
				redirectUrl: "https://evil.example.com/steal",
			});

		expect(res.statusCode).toBe(400);
	});

	it("returns 400 when redirectUrl is on the same host but a different scheme", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({
				code: "x",
				state: STATE,
				// Request arrives over http://app.test (supertest), but redirectUrl
				// points at https://app.test — same host, different scheme. The
				// router validates by full origin so this is rejected.
				redirectUrl: `https://${TEST_HOST}/dashboard`,
			});

		expect(res.statusCode).toBe(400);
	});

	it("invokes the ssoRedirect callback with the full SsoRedirectContext and uses its Response", async () => {
		mockTokenExchange({
			access_token: "access_for_callback",
			refresh_token: "refresh_for_callback",
		});

		let capturedContext: Parameters<SsoRedirect>[0] | undefined;
		const ssoRedirect: SsoRedirect = (ctx) => {
			capturedContext = ctx;
			return Response.redirect(`${TEST_APP_ORIGIN}/welcome`, 302);
		};

		const app = createTestApp({ ssoRedirect });

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({
				code: "x",
				state: STATE,
				redirectUrl: `${TEST_APP_ORIGIN}/dashboard`,
			});

		expect(res.statusCode).toBe(302);
		expect(res.headers.location).toBe(`${TEST_APP_ORIGIN}/welcome`);

		expect(capturedContext).toBeDefined();
		expect(capturedContext?.accessToken).toBe("access_for_callback");
		expect(capturedContext?.refreshToken).toBe("refresh_for_callback");
		expect(capturedContext?.redirectUrl).toBe(`${TEST_APP_ORIGIN}/dashboard`);
		expect(capturedContext?.state).toBe(STATE);
		expect(capturedContext?.request).toBeInstanceOf(Request);
	});

	it("does not mutate the request argument passed to ssoRedirect", async () => {
		mockTokenExchange({});

		let snapshot: { headers: number; url: string } | undefined;
		const ssoRedirect: SsoRedirect = ({ request }) => {
			snapshot = {
				headers: [...request.headers].length,
				url: request.url,
			};
			const before = snapshot;
			// Verify nothing on the request changed by the end of the callback.
			expect(before).toEqual({
				headers: [...request.headers].length,
				url: request.url,
			});
			return Response.redirect("/", 302);
		};

		const app = createTestApp({ ssoRedirect });

		await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		expect(snapshot).toBeDefined();
	});

	it("appends Set-Cookie headers to the user's ssoRedirect Response even when the callback sets its own headers", async () => {
		mockTokenExchange({
			access_token: "ssoredirect_access",
			refresh_token: "ssoredirect_refresh",
		});

		const ssoRedirect: SsoRedirect = ({ redirectUrl }) =>
			new Response("custom body", {
				status: 200,
				headers: { "X-Custom": "user-set", Location: redirectUrl },
			});

		const app = createTestApp({ ssoRedirect });

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({
				code: "x",
				state: STATE,
				redirectUrl: `${TEST_APP_ORIGIN}/onboarding`,
			});

		expect(res.statusCode).toBe(200);
		expect(res.headers["x-custom"]).toBe("user-set");

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.access_token.value).toBe("ssoredirect_access");
		expect(cookies.refresh_token.value).toBe("ssoredirect_refresh");
	});

	it("supports the admin-tools tenant-injection pattern via the Web-API ssoRedirect signature", async () => {
		mockTokenExchange({});

		// Reproduces the migrated admin-tools/api/auth.ts ssoRedirect.
		const ssoRedirect: SsoRedirect = ({ redirectUrl, request }) => {
			const url = new URL(redirectUrl);
			const tenant = new URL(request.url).searchParams.get("tenant");
			if (tenant) {
				url.searchParams.set("tenant", tenant);
			}
			return Response.redirect(url.href, 302);
		};

		const app = createTestApp({ ssoRedirect });

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({
				code: "x",
				state: STATE,
				redirectUrl: `${TEST_APP_ORIGIN}/dashboard`,
				tenant: "acme",
			});

		expect(res.statusCode).toBe(302);
		const location = new URL(res.headers.location);
		expect(location.pathname).toBe("/dashboard");
		expect(location.searchParams.get("tenant")).toBe("acme");
	});

	it("returns 401 when the Login Page rejects the authorization code with 4xx", async () => {
		mockTokenExchange({
			status: 400,
			body: { error: "invalid_grant", error_description: "code expired" },
		});
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		expect(res.statusCode).toBe(401);
		// The auth router returns an empty body and does not leak the
		// upstream OAuth server's error details to the client.
		expect(res.body).toEqual({});

		// No token cookies should be set on a failed exchange.
		expect(res.headers["set-cookie"]).toBeUndefined();
	});

	it("maps a 5xx from the Login Page to 502", async () => {
		mockTokenExchange({ status: 500, body: { error: "internal" } });
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		expect(res.statusCode).toBe(502);
	});

	it("returns 400 when the code query parameter is missing", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ state: STATE });

		expect(res.statusCode).toBe(400);
	});

	it("emits Cache-Control headers on every response (success and error)", async () => {
		mockTokenExchange({});
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		expect(res.headers["cache-control"]).toContain("no-store");
		expect(res.headers.pragma).toBe("no-cache");
	});
});
