/**
 * Integration tests for `GET /callback` mounted under the Next.js App
 * Router adapter.
 */

import type { SsoRedirect } from "@reltio/auth/types";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	buildRequest,
	createTestHandlers,
	DEFAULT_CONFIG,
	mswServer,
	parseSetCookies,
	TEST_APP_ORIGIN,
	TEST_HOST,
	TEST_LOGIN_HOST,
	useMswServer,
} from "./testHandlers";

/** Helper: mocks the Login Page's `/token` endpoint. */
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

describe("Next.js adapter — GET /auth/callback", () => {
	useMswServer();

	it("exchanges the code, sets both token cookies, and 302s to redirectUrl", async () => {
		mockTokenExchange({
			access_token: "new_access_xyz",
			refresh_token: "new_refresh_abc",
		});
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: {
					code: "auth_code_xxx",
					state: STATE,
					redirectUrl: `${TEST_APP_ORIGIN}/dashboard`,
				},
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe(`${TEST_APP_ORIGIN}/dashboard`);

		const cookies = parseSetCookies(res);
		expect(cookies.access_token.value).toBe("new_access_xyz");
		expect(cookies.refresh_token.value).toBe("new_refresh_abc");

		const accessAttrs = cookies.access_token.attributes.join("; ");
		expect(accessAttrs).toContain("HttpOnly");
		expect(accessAttrs).toContain("Secure");
		expect(accessAttrs).toContain("SameSite=Lax");
		expect(accessAttrs).toContain("Path=/");
	});

	it("redirects to / when redirectUrl is omitted", async () => {
		mockTokenExchange({});
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "x", state: STATE },
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe("/");
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
		const { GET } = createTestHandlers();

		await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "auth_code_yyy", state: STATE },
				cookies: { state: STATE },
			}),
		);

		expect(capturedBody).toEqual({
			grant_type: "authorization_code",
			code: "auth_code_yyy",
		});
		expect(capturedAuth).toBe(
			`Basic ${btoa(`${DEFAULT_CONFIG.clientId}:${DEFAULT_CONFIG.clientSecret}`)}`,
		);
	});

	it("returns 401 when the state cookie and query parameter do not match", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "x", state: "different-value" },
				cookies: { state: "cookie-value" },
			}),
		);

		expect(res.status).toBe(401);
		expect(res.headers.getSetCookie?.()).toEqual([]);
	});

	it("returns 401 when the state cookie is missing", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "x", state: STATE },
			}),
		);

		expect(res.status).toBe(401);
	});

	it("returns 401 when the state query parameter is missing", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "x" },
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(401);
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
		const { GET } = createTestHandlers({ ssoRedirect });

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: {
					code: "x",
					state: STATE,
					redirectUrl: `${TEST_APP_ORIGIN}/dashboard`,
				},
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe(`${TEST_APP_ORIGIN}/welcome`);

		expect(capturedContext).toBeDefined();
		expect(capturedContext?.accessToken).toBe("access_for_callback");
		expect(capturedContext?.refreshToken).toBe("refresh_for_callback");
		expect(capturedContext?.redirectUrl).toBe(`${TEST_APP_ORIGIN}/dashboard`);
		expect(capturedContext?.state).toBe(STATE);
		expect(capturedContext?.request).toBeInstanceOf(Request);
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
		const { GET } = createTestHandlers({ ssoRedirect });

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: {
					code: "x",
					state: STATE,
					redirectUrl: `${TEST_APP_ORIGIN}/onboarding`,
				},
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(200);
		expect(res.headers.get("x-custom")).toBe("user-set");

		const cookies = parseSetCookies(res);
		expect(cookies.access_token.value).toBe("ssoredirect_access");
		expect(cookies.refresh_token.value).toBe("ssoredirect_refresh");
	});

	it("supports the admin-tools tenant-injection pattern via the Web-API ssoRedirect signature", async () => {
		mockTokenExchange({});

		const ssoRedirect: SsoRedirect = ({ redirectUrl, request }) => {
			const url = new URL(redirectUrl);
			const tenant = new URL(request.url).searchParams.get("tenant");
			if (tenant) {
				url.searchParams.set("tenant", tenant);
			}
			return Response.redirect(url.href, 302);
		};
		const { GET } = createTestHandlers({ ssoRedirect });

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: {
					code: "x",
					state: STATE,
					redirectUrl: `${TEST_APP_ORIGIN}/dashboard`,
					tenant: "acme",
				},
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(302);
		const location = new URL(res.headers.get("Location") as string);
		expect(location.pathname).toBe("/dashboard");
		expect(location.searchParams.get("tenant")).toBe("acme");
	});

	it("returns 401 when the Login Page rejects the authorization code with 4xx", async () => {
		mockTokenExchange({
			status: 400,
			body: { error: "invalid_grant", error_description: "code expired" },
		});
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "x", state: STATE },
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(401);
		expect(res.headers.getSetCookie?.()).toEqual([]);
	});

	it("maps a 5xx from the Login Page to 502", async () => {
		mockTokenExchange({ status: 500, body: { error: "internal" } });
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "x", state: STATE },
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(502);
	});

	it("returns 400 when the code query parameter is missing", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { state: STATE },
				cookies: { state: STATE },
			}),
		);

		expect(res.status).toBe(400);
	});

	it("emits Cache-Control headers on every response", async () => {
		mockTokenExchange({});
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/callback",
				query: { code: "x", state: STATE },
				cookies: { state: STATE },
			}),
		);

		expect(res.headers.get("cache-control")).toContain("no-store");
		expect(res.headers.get("pragma")).toBe("no-cache");
	});
});
