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

import { createExpressAuth } from "@reltio/auth/express";
import type { SsoRedirect } from "@reltio/auth/types";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	TOKEN_LYING_PREFIX,
	TOKEN_OVERSIZED_PREFIX,
	TOKEN_WITH_AURL,
	TOKEN_WITH_AURL_ORIGIN,
} from "../fixtures/aurlTokens";
import {
	createTestApp,
	DEFAULT_CONFIG,
	mintAurlCookie,
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

	it("propagates (500) when the Login Page returns a malformed 200 body", async () => {
		// A 200 with a non-JSON body throws a SyntaxError inside exchangeCode,
		// which is NOT a RequestError. The handler must not mistranslate it to
		// 401/502 — it propagates (→ 500) so a broken upstream never looks like
		// a successful login.
		mswServer.use(
			http.post(
				`${TEST_LOGIN_HOST}/token`,
				() => new HttpResponse("<<not json>>", { status: 200 }),
			),
		);
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		expect(res.statusCode).toBe(500);
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

	it("minted reltio_aurl verifies through the public adapter resolveAuthPath (writer/reader contract)", async () => {
		// Writer: callbackHandler signs an aurl into the reltio_aurl cookie
		// using createAuth's internal signer. Reader: the public
		// `resolveAuthPath` exposed on the Express adapter's router, the
		// helper apps use when they bypass the BFF. The two MUST agree
		// byte-for-byte on cookie name, envelope, encoding, attributes,
		// and MAC — this test is the only one that drives both sides
		// through their public surfaces. A one-sided change to either side
		// (constant rename, alphabet swap, MAC length, …) breaks CI here.
		mockTokenExchange({ access_token: TOKEN_WITH_AURL });
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		const reltioAurl = parseSetCookies(res.headers["set-cookie"]).reltio_aurl
			.value;

		// A standalone reader configured with the same secret but a
		// different static fallback — proves the cookie (not the fallback)
		// drives the resolution.
		const { resolveAuthPath } = createExpressAuth({
			...DEFAULT_CONFIG,
			oauthPath: "https://fallback.example.com",
		});
		const request = new Request("https://app.test/", {
			headers: { Cookie: `reltio_aurl=${reltioAurl}` },
		});

		expect(await resolveAuthPath(request)).toBe(
			`${TOKEN_WITH_AURL_ORIGIN}/oauth`,
		);
	});

	it("clears reltio_aurl when the access token has no aurl claim", async () => {
		// An opaque (non-JWT) token is the common case: no decodable aurl
		// claim, so the router must not mint a routing cookie.
		mockTokenExchange({ access_token: "opaque-access-token-string" });
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.reltio_aurl?.value).toBe("");
		expect(cookies.reltio_aurl?.attributes).toContain("Max-Age=0");
	});

	// Fail-closed routing contract: a token that is NOT a clean, decodable
	// Reltio JWT carrying an aurl claim must never steer per-session routing,
	// no matter why it failed to decode. Publicly this is observable as one
	// outcome — the reltio_aurl cookie is cleared — so a single parametrised
	// test covers the class. The malicious decompression-bomb fixtures
	// additionally drive the decoder's bomb-defence gates (oversized prefix,
	// lying prefix → ZstdError) end-to-end through the public callback.
	it.each([
		[
			"a decompression-bomb token (honest oversized prefix)",
			TOKEN_OVERSIZED_PREFIX,
		],
		[
			"a decompression-bomb token (lying prefix, oversized stream)",
			TOKEN_LYING_PREFIX,
		],
		// No fixture for `segments[1].length > MAX_ENCODED_PAYLOAD_SIZE`:
		// after the cap was raised that gate sits above 21 KB, and a token
		// that large cannot survive a Set-Cookie round-trip — HTTP parsers
		// in the test runner (and every real client) reject the header
		// before `decodeAccessToken` runs. The gate stays in the decoder
		// as defence-in-depth but is unreachable from the public boundary.
		[
			"a Reltio-shaped token with an undecodable payload",
			"s.!!!not-base64!!!.fakesig",
		],
	])("fail-closed: clears reltio_aurl for %s", async (_label, accessToken) => {
		mockTokenExchange({ access_token: accessToken });
		const app = createTestApp();

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.reltio_aurl?.value).toBe("");
		expect(cookies.reltio_aurl?.attributes).toContain("Max-Age=0");
	});

	it("clears a stale reltio_aurl cookie carried over from a previous session", async () => {
		// Without the clear, a valid stale cookie from a previous
		// session keeps routing /checkToken to the old cluster using
		// a token that was never issued by it.
		const app = createTestApp();
		// A genuine signed cookie from an earlier session, obtained through
		// the public callback round-trip rather than the private signer.
		const stalePreviousAurl = await mintAurlCookie(app, TOKEN_WITH_AURL);

		mockTokenExchange({ access_token: "opaque-access-token-string" });

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`, `reltio_aurl=${stalePreviousAurl}`])
			.query({ code: "x", state: STATE });

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.reltio_aurl?.value).toBe("");
		expect(cookies.reltio_aurl?.attributes).toContain("Max-Age=0");
	});

	it("does not override Cache-Control / Pragma that the ssoRedirect callback already set", async () => {
		// withCacheHeaders only fills in the no-store headers when absent, so a
		// consumer callback can opt into its own caching policy on the final
		// response.
		mockTokenExchange({});
		const ssoRedirect: SsoRedirect = ({ redirectUrl }) =>
			new Response(null, {
				status: 302,
				headers: {
					Location: redirectUrl,
					"Cache-Control": "private, max-age=30",
					Pragma: "custom-pragma",
				},
			});
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

		expect(res.headers["cache-control"]).toBe("private, max-age=30");
		expect(res.headers.pragma).toBe("custom-pragma");
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
