/**
 * Integration tests for `POST /checkToken` mounted under the Next.js
 * App Router adapter.
 */

import { createNextAuth } from "@reltio/auth/next";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	TOKEN_WITH_AURL,
	TOKEN_WITH_AURL_ORIGIN,
	TOKEN_WITHOUT_AURL,
} from "../fixtures/aurlTokens";
import {
	buildRequest,
	createTestHandlers,
	DEFAULT_CONFIG,
	MULTIAUTH_CONFIG,
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
		http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, async ({ request }) => {
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
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, async ({ request }) => {
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
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () => {
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
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, async ({ request }) => {
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
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, async ({ request }) => {
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

	it("routes the upstream call to the cluster named by the access token's aurl", async () => {
		let clusterCalled = false;
		let staticCalled = false;
		mswServer.use(
			http.post(`${TOKEN_WITH_AURL_ORIGIN}/oauth/checkToken`, () => {
				clusterCalled = true;
				return HttpResponse.json({});
			}),
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () => {
				staticCalled = true;
				return HttpResponse.json({});
			}),
		);
		const { POST } = createTestHandlers({
			config: { authEnvironments: MULTIAUTH_CONFIG.authEnvironments },
		});

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: TOKEN_WITH_AURL },
			}),
		);

		expect(clusterCalled).toBe(true);
		expect(staticCalled).toBe(false);
	});

	it("falls back to the primary oauthPath when the token's aurl is not in the allowlist", async () => {
		let clusterCalled = false;
		let staticCalled = false;
		mswServer.use(
			http.post(`${TOKEN_WITH_AURL_ORIGIN}/oauth/checkToken`, () => {
				clusterCalled = true;
				return HttpResponse.json({});
			}),
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () => {
				staticCalled = true;
				return HttpResponse.json({});
			}),
		);
		// DEFAULT_CONFIG has no authEnvironments: the token's aurl is untrusted.
		const { POST } = createTestHandlers();

		await POST(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: TOKEN_WITH_AURL },
			}),
		);

		expect(staticCalled).toBe(true);
		expect(clusterCalled).toBe(false);
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

/** Captures the error thrown by an async call, failing if none is thrown. */
async function captureError(promise: Promise<unknown>): Promise<{
	statusCode: number;
	name: string;
}> {
	try {
		await promise;
	} catch (error) {
		return error as { statusCode: number; name: string };
	}
	throw new Error("expected the call to throw, but it resolved");
}

describe("Next.js adapter — checkToken (programmatic introspection)", () => {
	useMswServer();

	it("returns the parsed introspection payload on a 200 upstream", async () => {
		const upstreamBody = {
			clientId: "reltio-ui",
			expiration: 1234567890,
			resourceIds: ["res-1"],
			roles: ["ROLE_INTEGRATION_CUSTOMER_ADMIN"],
			scopes: ["read", "write"],
			user: {
				customer: "acme",
				username: "alice@example.com",
				email: "alice@example.com",
			},
		};
		mockOAuthCheckToken({ body: upstreamBody });
		const { checkToken } = createNextAuth(DEFAULT_CONFIG);

		const result = await checkToken(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "token" },
			}),
		);

		expect(result).toEqual(upstreamBody);
		expect(result.roles).toEqual(["ROLE_INTEGRATION_CUSTOMER_ADMIN"]);
		expect(result.user.username).toBe("alice@example.com");
	});

	it("throws RequestError 401 with no upstream call when the request has no token", async () => {
		let upstreamCalled = false;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () => {
				upstreamCalled = true;
				return HttpResponse.json({});
			}),
		);
		const { checkToken } = createNextAuth(DEFAULT_CONFIG);

		const error = await captureError(
			checkToken(buildRequest({ method: "POST", path: "/auth/checkToken" })),
		);

		expect(error.statusCode).toBe(401);
		expect(error.name).toBe("RequestError");
		expect(upstreamCalled).toBe(false);
	});

	it("throws RequestError with the upstream status when the token is rejected (4xx)", async () => {
		mockOAuthCheckToken({ status: 403, body: { error: "forbidden" } });
		const { checkToken } = createNextAuth(DEFAULT_CONFIG);

		const error = await captureError(
			checkToken(
				buildRequest({
					method: "POST",
					path: "/auth/checkToken",
					cookies: { access_token: "expired" },
				}),
			),
		);

		expect(error.statusCode).toBe(403);
	});

	it("throws RequestError 502 when the upstream returns 5xx", async () => {
		mockOAuthCheckToken({ status: 503 });
		const { checkToken } = createNextAuth(DEFAULT_CONFIG);

		const error = await captureError(
			checkToken(
				buildRequest({
					method: "POST",
					path: "/auth/checkToken",
					cookies: { access_token: "token" },
				}),
			),
		);

		expect(error.statusCode).toBe(502);
	});

	it("throws RequestError 502 on a network failure", async () => {
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () =>
				HttpResponse.error(),
			),
		);
		const { checkToken } = createNextAuth(DEFAULT_CONFIG);

		const error = await captureError(
			checkToken(
				buildRequest({
					method: "POST",
					path: "/auth/checkToken",
					cookies: { access_token: "token" },
				}),
			),
		);

		expect(error.statusCode).toBe(502);
	});

	it("routes to the cluster named by the access token's aurl", async () => {
		let clusterCalled = false;
		let staticCalled = false;
		mswServer.use(
			http.post(`${TOKEN_WITH_AURL_ORIGIN}/oauth/checkToken`, () => {
				clusterCalled = true;
				return HttpResponse.json({});
			}),
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () => {
				staticCalled = true;
				return HttpResponse.json({});
			}),
		);
		const { checkToken } = createNextAuth(MULTIAUTH_CONFIG);

		await checkToken(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: TOKEN_WITH_AURL },
			}),
		);

		expect(clusterCalled).toBe(true);
		expect(staticCalled).toBe(false);
	});

	it("falls back to the primary oauthPath when the token has no aurl claim", async () => {
		let capturedUrl: URL | undefined;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, ({ request }) => {
				capturedUrl = new URL(request.url);
				return HttpResponse.json({});
			}),
		);
		const { checkToken } = createNextAuth(MULTIAUTH_CONFIG);

		await checkToken(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: TOKEN_WITHOUT_AURL },
			}),
		);

		expect(capturedUrl?.origin).toBe(new URL(DEFAULT_CONFIG.oauthPath).origin);
	});

	it("forwards serviceId and tenantId from opts as query parameters", async () => {
		let capturedUrl: URL | undefined;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, ({ request }) => {
				capturedUrl = new URL(request.url);
				return HttpResponse.json({});
			}),
		);
		const { checkToken } = createNextAuth(DEFAULT_CONFIG);

		await checkToken(
			buildRequest({
				method: "POST",
				path: "/auth/checkToken",
				cookies: { access_token: "token" },
			}),
			{ serviceId: "MDM", tenantId: "acme-prod" },
		);

		expect(capturedUrl?.searchParams.get("serviceId")).toBe("MDM");
		expect(capturedUrl?.searchParams.get("tenantId")).toBe("acme-prod");
	});
});
