/**
 * Integration tests for `POST /refreshToken` mounted under the Next.js
 * App Router adapter.
 */

import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	buildRequest,
	createTestHandlers,
	DEFAULT_CONFIG,
	mswServer,
	parseSetCookies,
	TEST_OAUTH_HOST,
	useMswServer,
} from "./testHandlers";

function mockOAuthTokenRefresh(response: {
	access_token?: string;
	refresh_token?: string;
	expires_in?: number;
	status?: number;
	body?: unknown;
}) {
	mswServer.use(
		http.post(`${TEST_OAUTH_HOST}/token`, async () => {
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

describe("Next.js adapter — POST /auth/refreshToken", () => {
	useMswServer();

	it("returns 201 and replaces both auth cookies", async () => {
		mockOAuthTokenRefresh({
			access_token: "refreshed_access_999",
			refresh_token: "refreshed_refresh_888",
			expires_in: 1800,
		});
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/refreshToken",
				cookies: { refresh_token: "old_refresh_token" },
			}),
		);

		expect(res.status).toBe(201);

		const cookies = parseSetCookies(res);
		expect(cookies.access_token.value).toBe("refreshed_access_999");
		expect(cookies.refresh_token.value).toBe("refreshed_refresh_888");
	});

	it("sets Max-Age on the access_token cookie from the upstream expires_in", async () => {
		mockOAuthTokenRefresh({
			access_token: "a",
			refresh_token: "r",
			expires_in: 600,
		});
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/refreshToken",
				cookies: { refresh_token: "token" },
			}),
		);

		const cookies = parseSetCookies(res);
		expect(cookies.access_token.attributes.join("; ")).toContain("Max-Age=600");
	});

	it("sends grant_type=refresh_token and Basic auth in the upstream call", async () => {
		let capturedBody: URLSearchParams | undefined;
		let capturedAuth: string | null = null;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/token`, async ({ request }) => {
				const bodyText = await request.text();
				capturedBody = new URLSearchParams(bodyText);
				capturedAuth = request.headers.get("authorization");
				return HttpResponse.json({
					access_token: "a",
					refresh_token: "r",
				});
			}),
		);
		const { POST } = createTestHandlers();

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/refreshToken",
				cookies: { refresh_token: "incoming_refresh_value" },
			}),
		);

		expect(capturedBody?.get("grant_type")).toBe("refresh_token");
		expect(capturedBody?.get("refresh_token")).toBe("incoming_refresh_value");
		expect(capturedAuth).toBe(
			`Basic ${btoa(`${DEFAULT_CONFIG.clientId}:${DEFAULT_CONFIG.clientSecret}`)}`,
		);
	});

	it("emits new cookies with HttpOnly, Secure, SameSite=Lax", async () => {
		mockOAuthTokenRefresh({});
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/refreshToken",
				cookies: { refresh_token: "token" },
			}),
		);

		const cookies = parseSetCookies(res);
		const attrs = cookies.access_token.attributes.join("; ");
		expect(attrs).toContain("HttpOnly");
		expect(attrs).toContain("Secure");
		expect(attrs).toContain("SameSite=Lax");
	});

	it("returns 401 when the refresh_token cookie is missing — no upstream call made", async () => {
		let upstreamCalled = false;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/token`, () => {
				upstreamCalled = true;
				return HttpResponse.json({});
			}),
		);
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({ method: "POST", path: "/auth/refreshToken" }),
		);

		expect(res.status).toBe(401);
		expect(upstreamCalled).toBe(false);
	});

	it("returns 401 when the OAuth server rejects the refresh token with 400", async () => {
		mockOAuthTokenRefresh({ status: 400, body: { error: "invalid_grant" } });
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/refreshToken",
				cookies: { refresh_token: "expired_token" },
			}),
		);

		expect(res.status).toBe(401);
	});

	it("returns 502 when the OAuth server is down (5xx)", async () => {
		mockOAuthTokenRefresh({ status: 503, body: { error: "down" } });
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/refreshToken",
				cookies: { refresh_token: "token" },
			}),
		);

		expect(res.status).toBe(502);
	});

	it("emits Cache-Control headers", async () => {
		mockOAuthTokenRefresh({});
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/refreshToken",
				cookies: { refresh_token: "token" },
			}),
		);

		expect(res.headers.get("cache-control")).toContain("no-store");
		expect(res.headers.get("pragma")).toBe("no-cache");
	});
});
