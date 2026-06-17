/**
 * Integration tests for `POST /checkToken` mounted under the Express adapter.
 *
 * `POST /checkToken` reads the access token from either an Authorization
 * header or the `access_token` cookie, calls the OAuth server's
 * `/checkToken` endpoint, and returns the upstream JSON response.
 */

import { createExpressAuth } from "@reltio/auth/express";
import { HttpResponse, http } from "msw";
import { describe, expect, it, vi } from "vitest";
import {
	TOKEN_WITH_AURL,
	TOKEN_WITH_AURL_ORIGIN,
} from "../fixtures/aurlTokens";
import {
	createTestApp,
	DEFAULT_CONFIG,
	mintAurlCookie,
	mswServer,
	TEST_HOST,
	TEST_OAUTH_HOST,
	useMswServer,
} from "./testApp";

/** Mocks the OAuth server's `/checkToken` endpoint. */
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

describe("Express adapter — POST /checkToken", () => {
	useMswServer();

	it("reads the access token from the access_token cookie", async () => {
		let capturedBody: URLSearchParams | undefined;
		mockOAuthCheckToken({
			onRequest: async (req) => {
				const bodyText = await req.text();
				capturedBody = new URLSearchParams(bodyText);
			},
		});
		const app = createTestApp();

		await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token_from_cookie"]);

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
		const app = createTestApp();

		await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Authorization", "Bearer token_from_header");

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
		const app = createTestApp();

		await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Authorization", "Bearer header_token")
			.set("Cookie", ["access_token=cookie_token"]);

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
		const app = createTestApp();

		for (const prefix of ["Bearer", "bearer", "BEARER"]) {
			await app
				.post("/api/auth/checkToken")
				.set("Host", TEST_HOST)
				.set("Authorization", `${prefix} value_${prefix}`);
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
		const app = createTestApp();

		const res = await app.post("/api/auth/checkToken").set("Host", TEST_HOST);

		expect(res.statusCode).toBe(401);
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
		const app = createTestApp();

		await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"])
			.query({ serviceId: "MDM", tenantId: "acme-prod" });

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
		const app = createTestApp();

		await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"]);

		expect(capturedUrl?.searchParams.get("serviceId")).toBeNull();
		expect(capturedUrl?.searchParams.get("tenantId")).toBeNull();
	});

	it("returns the upstream JSON body verbatim on 200", async () => {
		const upstreamBody = {
			username: "alice@example.com",
			tenants: [
				{
					id: "tenant-1",
					roles: ["ROLE_INTEGRATION_CUSTOMER_ADMIN"],
				},
			],
			exp: 1234567890,
		};
		mockOAuthCheckToken({ body: upstreamBody });
		const app = createTestApp();

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"]);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(upstreamBody);
	});

	it("returns 401 when the OAuth server rejects the token with 400", async () => {
		mockOAuthCheckToken({ status: 400, body: { error: "invalid_token" } });
		const app = createTestApp();

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=expired_token"]);

		expect(res.statusCode).toBe(401);
	});

	it("returns 502 when the OAuth server is down (5xx)", async () => {
		mockOAuthCheckToken({ status: 503 });
		const app = createTestApp();

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"]);

		expect(res.statusCode).toBe(502);
	});

	it("returns 502 when the OAuth server is unreachable (network error)", async () => {
		// A thrown fetch (DNS/connection failure) is distinct from an HTTP
		// 5xx: it surfaces in safeFetch's catch, which normalises it to 502.
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () =>
				HttpResponse.error(),
			),
		);
		const app = createTestApp();

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"]);

		expect(res.statusCode).toBe(502);
	});

	it("propagates (500) when the OAuth server returns a malformed 200 body", async () => {
		// A 200 with a non-JSON body is a hostile/buggy upstream: response.json()
		// throws a SyntaxError, which is NOT a RequestError. The handler must
		// NOT mistranslate it to 401/502 — it propagates (→ 500) so the failure
		// is loud rather than a silently-broken success.
		mswServer.use(
			http.post(
				`${TEST_OAUTH_HOST}/oauth/checkToken`,
				() => new HttpResponse("<<not json>>", { status: 200 }),
			),
		);
		const app = createTestApp();

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"]);

		expect(res.statusCode).toBe(500);
	});

	it("routes the upstream call to the verified reltio_aurl cluster URL", async () => {
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
		const app = createTestApp();
		const reltioAurl = await mintAurlCookie(app, TOKEN_WITH_AURL);

		await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", [`access_token=token; reltio_aurl=${reltioAurl}`]);

		expect(clusterCalled).toBe(true);
		expect(staticCalled).toBe(false);
	});

	it("falls back to the static oauthPath when reltio_aurl is tampered (fail-closed)", async () => {
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
		const app = createTestApp();

		await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token; reltio_aurl=tampered-garbage"]);

		expect(staticCalled).toBe(true);
		expect(clusterCalled).toBe(false);
	});

	it("emits Cache-Control headers", async () => {
		mockOAuthCheckToken({});
		const app = createTestApp();

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"]);

		expect(res.headers["cache-control"]).toContain("no-store");
		expect(res.headers.pragma).toBe("no-cache");
	});
});

/** Builds a Web `Request` carrying optional cookie / Bearer headers. */
function introspectionRequest(options: {
	cookie?: string;
	authorization?: string;
}): Request {
	const headers = new Headers();
	if (options.cookie) {
		headers.set("Cookie", options.cookie);
	}
	if (options.authorization) {
		headers.set("Authorization", options.authorization);
	}
	return new Request("https://app.test/api/data", { headers });
}

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

describe("Express adapter — checkToken (programmatic introspection)", () => {
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
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		const result = await checkToken(
			introspectionRequest({ cookie: "access_token=token" }),
		);

		expect(result).toEqual(upstreamBody);
		expect(result.roles).toEqual(["ROLE_INTEGRATION_CUSTOMER_ADMIN"]);
		expect(result.scopes).toEqual(["read", "write"]);
		expect(result.user.username).toBe("alice@example.com");
	});

	it("reads the token from a Bearer header", async () => {
		let capturedBody: URLSearchParams | undefined;
		mockOAuthCheckToken({
			onRequest: async (req) => {
				capturedBody = new URLSearchParams(await req.text());
			},
		});
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		await checkToken(
			introspectionRequest({ authorization: "Bearer header_token" }),
		);

		expect(capturedBody?.get("token")).toBe("header_token");
	});

	it("throws RequestError 401 with no upstream call when the request has no token", async () => {
		let upstreamCalled = false;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () => {
				upstreamCalled = true;
				return HttpResponse.json({});
			}),
		);
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		const error = await captureError(checkToken(introspectionRequest({})));

		expect(error.statusCode).toBe(401);
		expect(error.name).toBe("RequestError");
		expect(upstreamCalled).toBe(false);
	});

	it("throws RequestError with the upstream status when the token is rejected (4xx)", async () => {
		mockOAuthCheckToken({ status: 403, body: { error: "forbidden" } });
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		const error = await captureError(
			checkToken(introspectionRequest({ cookie: "access_token=expired" })),
		);

		expect(error.statusCode).toBe(403);
		expect(error.name).toBe("RequestError");
	});

	it("throws RequestError 502 when the upstream returns 5xx", async () => {
		mockOAuthCheckToken({ status: 503 });
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		const error = await captureError(
			checkToken(introspectionRequest({ cookie: "access_token=token" })),
		);

		expect(error.statusCode).toBe(502);
	});

	it("throws RequestError 502 on a network failure", async () => {
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () =>
				HttpResponse.error(),
			),
		);
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		const error = await captureError(
			checkToken(introspectionRequest({ cookie: "access_token=token" })),
		);

		expect(error.statusCode).toBe(502);
	});

	it("routes via the verified reltio_aurl cookie", async () => {
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
		const app = createTestApp();
		const reltioAurl = await mintAurlCookie(app, TOKEN_WITH_AURL);
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		await checkToken(
			introspectionRequest({
				cookie: `access_token=token; reltio_aurl=${reltioAurl}`,
			}),
		);

		expect(clusterCalled).toBe(true);
		expect(staticCalled).toBe(false);
	});

	it("falls back to the static oauthPath when no reltio_aurl cookie is present", async () => {
		let capturedUrl: URL | undefined;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, ({ request }) => {
				capturedUrl = new URL(request.url);
				return HttpResponse.json({});
			}),
		);
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		await checkToken(introspectionRequest({ cookie: "access_token=token" }));

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
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

		await checkToken(introspectionRequest({ cookie: "access_token=token" }), {
			serviceId: "MDM",
			tenantId: "acme-prod",
		});

		expect(capturedUrl?.searchParams.get("serviceId")).toBe("MDM");
		expect(capturedUrl?.searchParams.get("tenantId")).toBe("acme-prod");
	});

	it("derives the HMAC key once and reuses it across many checkToken calls", async () => {
		const importKeySpy = vi.spyOn(crypto.subtle, "importKey");
		try {
			mockOAuthCheckToken({});
			const { checkToken } = createExpressAuth(DEFAULT_CONFIG);

			for (let i = 0; i < 5; i++) {
				await checkToken(
					introspectionRequest({ cookie: "access_token=token" }),
				);
			}

			expect(importKeySpy).toHaveBeenCalledTimes(1);
		} finally {
			importKeySpy.mockRestore();
		}
	});

	it("does not mutate the request", async () => {
		mockOAuthCheckToken({});
		const { checkToken } = createExpressAuth(DEFAULT_CONFIG);
		const request = introspectionRequest({ cookie: "access_token=token" });
		const cookieBefore = request.headers.get("Cookie");

		await checkToken(request);

		expect(request.headers.get("Cookie")).toBe(cookieBefore);
	});
});
