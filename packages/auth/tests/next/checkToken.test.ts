/**
 * Integration tests for `POST /checkToken` mounted under the Next.js
 * App Router adapter.
 */

import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	buildRequest,
	createTestHandlers,
	mswServer,
	TEST_OAUTH_HOST,
	useMswServer,
} from "./testHandlers";

function mockOAuthCheckToken(response: {
	body?: unknown;
	status?: number;
	onRequest?: (request: globalThis.Request) => void;
}) {
	mswServer.use(
		http.post(`${TEST_OAUTH_HOST}/checkToken`, async ({ request }) => {
			response.onRequest?.(request);
			if (response.status && response.status >= 400) {
				return HttpResponse.json(response.body ?? { error: "rejected" }, {
					status: response.status,
				});
			}
			return HttpResponse.json(
				response.body ?? {
					username: "user@example.com",
					tenants: [{ id: "acme", roles: ["ROLE_USER"] }],
				},
			);
		}),
	);
}

describe("Next.js adapter — POST /auth/checkToken", () => {
	useMswServer();

	it("reads the access token from the access_token cookie", async () => {
		let capturedBody: URLSearchParams | undefined;
		mockOAuthCheckToken({
			onRequest: async (req) => {
				const bodyText = await req.text();
				capturedBody = new URLSearchParams(bodyText);
			},
		});
		const { POST } = createTestHandlers();

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "token_from_cookie" },
			}),
		);

		expect(capturedBody?.get("token")).toBe("token_from_cookie");
	});

	it("reads the access token from a Bearer Authorization header", async () => {
		let capturedBody: URLSearchParams | undefined;
		mockOAuthCheckToken({
			onRequest: async (req) => {
				const bodyText = await req.text();
				capturedBody = new URLSearchParams(bodyText);
			},
		});
		const { POST } = createTestHandlers();

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				authorization: "Bearer token_from_header",
			}),
		);

		expect(capturedBody?.get("token")).toBe("token_from_header");
	});

	it("prefers the Bearer header over the cookie when both are present", async () => {
		let capturedBody: URLSearchParams | undefined;
		mockOAuthCheckToken({
			onRequest: async (req) => {
				const bodyText = await req.text();
				capturedBody = new URLSearchParams(bodyText);
			},
		});
		const { POST } = createTestHandlers();

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				authorization: "Bearer header_token",
				cookies: { access_token: "cookie_token" },
			}),
		);

		expect(capturedBody?.get("token")).toBe("header_token");
	});

	it("accepts Bearer header in any case (Bearer / bearer / BEARER)", async () => {
		const seen: string[] = [];
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/checkToken`, async ({ request }) => {
				const body = new URLSearchParams(await request.text());
				seen.push(body.get("token") ?? "");
				return HttpResponse.json({});
			}),
		);
		const { POST } = createTestHandlers();

		for (const prefix of ["Bearer", "bearer", "BEARER"]) {
			await POST(
				buildRequest({
					method: "POST",
					path: "/auth/checkToken",
					authorization: `${prefix} value_${prefix}`,
				}),
			);
		}

		expect(seen).toEqual(["value_Bearer", "value_bearer", "value_BEARER"]);
	});

	it("returns 401 with no upstream call when neither header nor cookie is present", async () => {
		let upstreamCalled = false;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/checkToken`, () => {
				upstreamCalled = true;
				return HttpResponse.json({});
			}),
		);
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({ method: "POST", path: "/auth/checkToken" }),
		);

		expect(res.status).toBe(401);
		expect(upstreamCalled).toBe(false);
	});

	it("forwards serviceId and tenantId query parameters to the upstream call", async () => {
		let capturedUrl: URL | undefined;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/checkToken`, async ({ request }) => {
				capturedUrl = new URL(request.url);
				return HttpResponse.json({});
			}),
		);
		const { POST } = createTestHandlers();

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				query: { serviceId: "MDM", tenantId: "acme-prod" },
				cookies: { access_token: "token" },
			}),
		);

		expect(capturedUrl?.searchParams.get("serviceId")).toBe("MDM");
		expect(capturedUrl?.searchParams.get("tenantId")).toBe("acme-prod");
	});

	it("omits absent query parameters in the upstream URL", async () => {
		let capturedUrl: URL | undefined;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/checkToken`, async ({ request }) => {
				capturedUrl = new URL(request.url);
				return HttpResponse.json({});
			}),
		);
		const { POST } = createTestHandlers();

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "token" },
			}),
		);

		expect(capturedUrl?.searchParams.get("serviceId")).toBeNull();
		expect(capturedUrl?.searchParams.get("tenantId")).toBeNull();
	});

	it("returns the upstream JSON body verbatim on 200", async () => {
		const upstreamBody = {
			username: "alice@example.com",
			tenants: [{ id: "tenant-1", roles: ["ROLE_INTEGRATION_CUSTOMER_ADMIN"] }],
			exp: 1234567890,
		};
		mockOAuthCheckToken({ body: upstreamBody });
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "token" },
			}),
		);

		expect(res.status).toBe(200);
		await expect(res.json()).resolves.toEqual(upstreamBody);
	});

	it("returns 401 when the OAuth server rejects the token with 400", async () => {
		mockOAuthCheckToken({ status: 400, body: { error: "invalid_token" } });
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "expired_token" },
			}),
		);

		expect(res.status).toBe(401);
	});

	it("returns 502 when the OAuth server is down (5xx)", async () => {
		mockOAuthCheckToken({ status: 503 });
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "token" },
			}),
		);

		expect(res.status).toBe(502);
	});

	it("emits Cache-Control headers", async () => {
		mockOAuthCheckToken({});
		const { POST } = createTestHandlers();

		const res = await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "token" },
			}),
		);

		expect(res.headers.get("cache-control")).toContain("no-store");
		expect(res.headers.get("pragma")).toBe("no-cache");
	});
});
