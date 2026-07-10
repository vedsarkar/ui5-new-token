/**
 * Integration tests for `/proxy` mounted under the Express adapter.
 *
 * Validation, header rewriting, target matching, and structured errors are
 * covered through the public boundary in `proxyValidation.test.ts`. This file
 * guards the Express-specific streaming plumbing:
 *
 *   1. raw request-body streaming + cookie-derived bearer
 *   2. large bodies stream through with no size cap
 *   3. `router.all` dispatches non-POST methods
 *   4. binary response bytes survive the stream round-trip
 *   5. the `if (config.proxy)` mount gate
 */

import type { AuthConfig } from "@reltio/auth/types";
import { HttpResponse, http } from "msw";
import type { Agent } from "supertest";
import { describe, expect, it } from "vitest";
import { createTestApp, mswServer, TEST_HOST, useMswServer } from "./testApp";

const TEST_UPSTREAM = "https://api.test.reltio.com";

const PROXY_CONFIG: AuthConfig["proxy"] = {
	allowedTargets: [`${TEST_UPSTREAM}/`],
};

const ACCESS_COOKIE = ["access_token=test_access_token"];

/** App with `/proxy` mounted and an allowlist that admits `TEST_UPSTREAM`. */
function createProxyApp(): Agent {
	return createTestApp({ config: { proxy: PROXY_CONFIG } });
}

describe("Express adapter — /proxy", () => {
	useMswServer();

	it("Case A — forwards raw body and cookie-derived bearer; returns upstream status + body", async () => {
		let receivedBody: string | undefined;
		let receivedAuth: string | null = null;
		let receivedTargetHeader: string | null = null;
		mswServer.use(
			http.post(`${TEST_UPSTREAM}/entities`, async ({ request }) => {
				receivedBody = await request.text();
				receivedAuth = request.headers.get("authorization");
				receivedTargetHeader = request.headers.get("reltio-target-url");
				return HttpResponse.text("upstream-body", { status: 201 });
			}),
		);
		const app = createProxyApp();

		const res = await app
			.post("/api/auth/proxy")
			.set("Host", TEST_HOST)
			.set("Cookie", ACCESS_COOKIE)
			.set("reltio-target-url", `${TEST_UPSTREAM}/entities`)
			.set("Content-Type", "text/plain")
			.send("hello upstream");

		expect(receivedBody).toBe("hello upstream");
		expect(receivedAuth).toBe("Bearer test_access_token");
		expect(receivedTargetHeader).toBeNull();
		expect(res.statusCode).toBe(201);
		expect(res.text).toBe("upstream-body");
	});

	it("streams a large request body upstream with no size cap", async () => {
		// 60 MiB — larger than the old buffered 50 MiB cap, proving the body
		// is piped through rather than buffered-and-limited.
		const SIZE = 60 * 1024 * 1024;
		let receivedLength = 0;
		mswServer.use(
			http.post(`${TEST_UPSTREAM}/upload`, async ({ request }) => {
				receivedLength = (await request.arrayBuffer()).byteLength;
				return HttpResponse.text("stored", { status: 201 });
			}),
		);
		const app = createProxyApp();

		const res = await app
			.post("/api/auth/proxy")
			.set("Host", TEST_HOST)
			.set("Cookie", ACCESS_COOKIE)
			.set("reltio-target-url", `${TEST_UPSTREAM}/upload`)
			.set("Content-Type", "application/octet-stream")
			.send(Buffer.alloc(SIZE));

		expect(res.statusCode).toBe(201);
		expect(receivedLength).toBe(SIZE);
	});

	it.each([
		{ method: "PUT", call: (a: Agent) => a.put("/api/auth/proxy") },
		{ method: "DELETE", call: (a: Agent) => a.delete("/api/auth/proxy") },
	] as const)(
		"router.all dispatches $method to the proxy handler",
		async ({ method, call }) => {
			let receivedMethod: string | undefined;
			mswServer.use(
				http.all(`${TEST_UPSTREAM}/entities/abc`, ({ request }) => {
					receivedMethod = request.method;
					return HttpResponse.text("ok", { status: 200 });
				}),
			);
			const app = createProxyApp();

			const res = await call(app)
				.set("Host", TEST_HOST)
				.set("Cookie", ACCESS_COOKIE)
				.set("reltio-target-url", `${TEST_UPSTREAM}/entities/abc`);

			expect(receivedMethod).toBe(method);
			expect(res.statusCode).toBe(200);
		},
	);

	it("preserves binary upstream response bytes byte-identical (stream round-trip)", async () => {
		// PNG magic + a 0x00 and a high byte — any text() round-trip would
		// silently mangle the 0x89 / 0xff bytes via UTF-8 replacement.
		const binary = Buffer.from([
			0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0xff,
		]);
		mswServer.use(
			http.get(
				`${TEST_UPSTREAM}/image`,
				() =>
					new HttpResponse(binary, {
						status: 200,
						headers: { "Content-Type": "application/octet-stream" },
					}),
			),
		);
		const app = createProxyApp();

		const res = await app
			.get("/api/auth/proxy")
			.set("Host", TEST_HOST)
			.set("Cookie", ACCESS_COOKIE)
			.set("reltio-target-url", `${TEST_UPSTREAM}/image`)
			.buffer(true)
			.parse((response, callback) => {
				const chunks: Buffer[] = [];
				response.on("data", (chunk: Buffer) => chunks.push(chunk));
				response.on("end", () => callback(null, Buffer.concat(chunks)));
			});

		expect(res.statusCode).toBe(200);
		expect((res.body as Buffer).equals(binary)).toBe(true);
	});

	it("returns 404 for /proxy when config.proxy is omitted", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/proxy")
			.set("Host", TEST_HOST)
			.set("Cookie", ACCESS_COOKIE)
			.set("reltio-target-url", `${TEST_UPSTREAM}/x`);

		expect(res.statusCode).toBe(404);
	});
});
