/**
 * Integration tests for `POST /refreshToken` mounted under the Express adapter.
 *
 * `POST /refreshToken` reads the `refresh_token` cookie, exchanges it via
 * the OAuth server's `/token` endpoint, and replaces both auth cookies on
 * success.
 */

import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	TOKEN_WITH_AURL,
	TOKEN_WITH_AURL_ORIGIN,
} from "../fixtures/aurlTokens";
import {
	createTestApp,
	DEFAULT_CONFIG,
	MULTIAUTH_CONFIG,
	mswServer,
	parseSetCookies,
	TEST_HOST,
	TEST_OAUTH_HOST,
	useMswServer,
} from "./testApp";

/** Mocks the OAuth server's `/token` endpoint. */
function mockOAuthTokenRefresh(response: {
	access_token?: string;
	refresh_token?: string;
	expires_in?: number;
	status?: number;
	body?: unknown;
}) {
	mswServer.use(
		http.post(`${TEST_OAUTH_HOST}/oauth/token`, async () => {
			if (response.status && response.status >= 400) {
				return HttpResponse.json(response.body ?? { error: "rejected" }, {
					status: response.status,
				});
			}
			return HttpResponse.json({
				access_token: response.access_token ?? "new_access",
				refresh_token: response.refresh_token ?? "new_refresh",
				expires_in: response.expires_in ?? 3600,
			});
		}),
	);
}

describe("Express adapter — POST /refreshToken", () => {
	useMswServer();

	it("returns 201 and replaces both auth cookies", async () => {
		mockOAuthTokenRefresh({
			access_token: "refreshed_access_999",
			refresh_token: "refreshed_refresh_888",
			expires_in: 1800,
		});
		const app = createTestApp();

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=old_refresh_token"]);

		expect(res.statusCode).toBe(201);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.access_token.value).toBe("refreshed_access_999");
		expect(cookies.refresh_token.value).toBe("refreshed_refresh_888");
	});

	it("keeps the access_token cookie co-terminal with refresh_token (no Max-Age) so its aurl survives to the next refresh", async () => {
		// The next /refreshToken routes by the access token's aurl (the refresh
		// token is opaque), so both cookies share one session lifetime.
		mockOAuthTokenRefresh({
			access_token: "a",
			refresh_token: "r",
			expires_in: 600,
		});
		const app = createTestApp();

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=token"]);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.access_token.attributes.join("; ")).not.toContain("Max-Age");
		expect(cookies.refresh_token.attributes.join("; ")).not.toContain(
			"Max-Age",
		);
	});

	it("sends grant_type=refresh_token and Basic auth in the upstream call", async () => {
		let capturedBody: URLSearchParams | undefined;
		let capturedAuth: string | null = null;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/token`, async ({ request }) => {
				const bodyText = await request.text();
				capturedBody = new URLSearchParams(bodyText);
				capturedAuth = request.headers.get("authorization");
				return HttpResponse.json({
					access_token: "a",
					refresh_token: "r",
				});
			}),
		);
		const app = createTestApp();

		await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=incoming_refresh_value"]);

		expect(capturedBody?.get("grant_type")).toBe("refresh_token");
		expect(capturedBody?.get("refresh_token")).toBe("incoming_refresh_value");
		expect(capturedAuth).toBe(
			`Basic ${btoa(`${DEFAULT_CONFIG.clientId}:${DEFAULT_CONFIG.clientSecret}`)}`,
		);
	});

	it("emits new cookies with the same secure attributes as fresh cookies", async () => {
		mockOAuthTokenRefresh({});
		const app = createTestApp({ config: { secure: true } });

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=token"]);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		const accessAttrs = cookies.access_token.attributes.join("; ");
		expect(accessAttrs).toContain("HttpOnly");
		expect(accessAttrs).toContain("Secure");
		expect(accessAttrs).toContain("SameSite=Lax");
	});

	it("returns 401 when the refresh_token cookie is missing — no upstream call made", async () => {
		let upstreamCalled = false;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/token`, () => {
				upstreamCalled = true;
				return HttpResponse.json({});
			}),
		);
		const app = createTestApp();

		const res = await app.post("/api/auth/refreshToken").set("Host", TEST_HOST);

		expect(res.statusCode).toBe(401);
		expect(upstreamCalled).toBe(false);
	});

	it("returns 401 when the OAuth server rejects the refresh token with 400", async () => {
		mockOAuthTokenRefresh({
			status: 400,
			body: { error: "invalid_grant" },
		});
		const app = createTestApp();

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=expired_token"]);

		expect(res.statusCode).toBe(401);
	});

	it("returns 502 when the OAuth server is down (5xx)", async () => {
		mockOAuthTokenRefresh({ status: 503, body: { error: "down" } });
		const app = createTestApp();

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=token"]);

		expect(res.statusCode).toBe(502);
	});

	it("propagates (500) when the OAuth server returns a malformed 200 body", async () => {
		// A 200 with a non-JSON body throws a SyntaxError inside
		// refreshAccessToken, which is NOT a RequestError. The handler must not
		// mistranslate it to 401/502 — it propagates (→ 500) rather than
		// emitting broken cookies from a half-parsed success.
		mswServer.use(
			http.post(
				`${TEST_OAUTH_HOST}/oauth/token`,
				() => new HttpResponse("<<not json>>", { status: 200 }),
			),
		);
		const app = createTestApp();

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=token"]);

		expect(res.statusCode).toBe(500);
	});

	it("emits Cache-Control headers", async () => {
		mockOAuthTokenRefresh({});
		const app = createTestApp();

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=token"]);

		expect(res.headers["cache-control"]).toContain("no-store");
		expect(res.headers.pragma).toBe("no-cache");
	});

	it("routes the token exchange to the cluster named by the access token's aurl, with that cluster's credentials", async () => {
		// The refresh must go to the same cluster that issued the access token,
		// selected from the allowlist by the token's aurl claim — never the
		// primary when a trusted additional cluster matches.
		let clusterAuth: string | null = null;
		let staticCalled = false;
		mswServer.use(
			http.post(`${TOKEN_WITH_AURL_ORIGIN}/oauth/token`, ({ request }) => {
				clusterAuth = request.headers.get("authorization");
				return HttpResponse.json({ access_token: "a", refresh_token: "r" });
			}),
			http.post(`${TEST_OAUTH_HOST}/oauth/token`, () => {
				staticCalled = true;
				return HttpResponse.json({ access_token: "a", refresh_token: "r" });
			}),
		);
		const app = createTestApp({
			config: { authEnvironments: MULTIAUTH_CONFIG.authEnvironments },
		});

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", [`access_token=${TOKEN_WITH_AURL}; refresh_token=token`]);

		expect(res.statusCode).toBe(201);
		expect(clusterAuth).toBe(
			`Basic ${btoa("additional_client_id:additional_client_secret")}`,
		);
		expect(staticCalled).toBe(false);
	});
});
