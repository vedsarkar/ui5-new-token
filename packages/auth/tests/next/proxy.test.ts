/**
 * Integration tests for `/proxy` mounted under the Next.js App Router adapter.
 *
 * Validation, header rewriting, target matching, and structured errors are
 * covered through the public boundary in `../express/proxyValidation.test.ts`.
 * This file guards the Next-specific streaming behaviour end-to-end:
 *
 *   1. all seven method handlers exist and are functions
 *   2. request body forwarded through a `NextRequest`-style `Request`
 *   3. large request bodies stream through with no size cap
 *   4. streaming responses (SSE) are piped through, not buffered
 *   5. `/proxy` is `404` when `config.proxy` is omitted
 */

import { createNextAuth } from "@reltio/auth/next";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	createTestHandlers,
	DEFAULT_CONFIG,
	mswServer,
	TEST_APP_ORIGIN,
	useMswServer,
} from "./testHandlers";

const TEST_UPSTREAM = "https://api.test.reltio.com";

const PROXY_CONFIG = {
	allowedTargets: [`${TEST_UPSTREAM}/`],
};

const METHOD_NAMES = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"HEAD",
	"OPTIONS",
] as const;

describe("Next.js adapter — /proxy", () => {
	useMswServer();

	it("exposes GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS handlers (task 9.3)", () => {
		const handlers = createNextAuth({
			...DEFAULT_CONFIG,
			proxy: PROXY_CONFIG,
		}).handlers;
		for (const method of METHOD_NAMES) {
			expect(typeof handlers[method]).toBe("function");
		}
	});

	it("forwards a PUT body through NextRequest to upstream byte-identical", async () => {
		let receivedMethod: string | undefined;
		let receivedBody: string | undefined;
		let receivedAuth: string | null = null;
		mswServer.use(
			http.put(`${TEST_UPSTREAM}/entities/abc`, async ({ request }) => {
				receivedMethod = request.method;
				receivedBody = await request.text();
				receivedAuth = request.headers.get("authorization");
				return HttpResponse.text("upstream-ok", { status: 200 });
			}),
		);
		const handlers = createTestHandlers({ config: { proxy: PROXY_CONFIG } });

		const payload = '{"name":"Acme","tags":["a","b"]}';
		const req = new Request(`${TEST_APP_ORIGIN}/auth/proxy`, {
			method: "PUT",
			headers: {
				"reltio-target-url": `${TEST_UPSTREAM}/entities/abc`,
				cookie: "access_token=test_access_token",
				"content-type": "application/json",
			},
			body: payload,
		});

		const res = await handlers.PUT(req);

		expect(receivedMethod).toBe("PUT");
		expect(receivedBody).toBe(payload);
		expect(receivedAuth).toBe("Bearer test_access_token");
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("upstream-ok");
	});

	it("returns 404 for /proxy when config.proxy is omitted", async () => {
		const handlers = createTestHandlers();

		const req = new Request(`${TEST_APP_ORIGIN}/auth/proxy`, {
			method: "GET",
			headers: {
				"reltio-target-url": `${TEST_UPSTREAM}/x`,
				cookie: "access_token=test_access_token",
			},
		});

		const res = await handlers.GET(req);

		expect(res.status).toBe(404);
	});

	it("streams a large request body upstream with no size cap", async () => {
		// 60 MiB — larger than the old buffered 50 MiB cap, proving the body
		// is piped straight through instead of buffered-and-limited.
		const SIZE = 60 * 1024 * 1024;
		let receivedLength = 0;
		mswServer.use(
			http.post(`${TEST_UPSTREAM}/upload`, async ({ request }) => {
				receivedLength = (await request.arrayBuffer()).byteLength;
				return HttpResponse.text("stored", { status: 201 });
			}),
		);
		const body = new ReadableStream({
			start(controller) {
				controller.enqueue(new Uint8Array(SIZE));
				controller.close();
			},
		});
		const handlers = createTestHandlers({ config: { proxy: PROXY_CONFIG } });

		const req = new Request(`${TEST_APP_ORIGIN}/auth/proxy`, {
			method: "POST",
			headers: {
				"reltio-target-url": `${TEST_UPSTREAM}/upload`,
				cookie: "access_token=test_access_token",
				"content-type": "application/octet-stream",
			},
			body,
			// duplex required by undici when body is a ReadableStream; not yet in lib.dom typings
			duplex: "half",
		} as RequestInit & { duplex: "half" });

		const res = await handlers.POST(req);
		expect(res.status).toBe(201);
		expect(receivedLength).toBe(SIZE);
	});

	it("pipes a streaming (SSE) response through incrementally, not buffered", async () => {
		// The upstream sends one chunk and holds the stream open. A buffered
		// proxy would block on the full body and this read would hang (test
		// timeout); a streaming proxy delivers the first chunk immediately.
		const encoder = new TextEncoder();
		let closeUpstream: () => void = () => {};
		mswServer.use(
			http.get(`${TEST_UPSTREAM}/events`, () => {
				const stream = new ReadableStream({
					start(controller) {
						controller.enqueue(encoder.encode("data: one\n\n"));
						closeUpstream = () => controller.close();
					},
				});
				return new HttpResponse(stream, {
					status: 200,
					headers: { "content-type": "text/event-stream" },
				});
			}),
		);
		const handlers = createTestHandlers({ config: { proxy: PROXY_CONFIG } });

		const req = new Request(`${TEST_APP_ORIGIN}/auth/proxy`, {
			method: "GET",
			headers: {
				"reltio-target-url": `${TEST_UPSTREAM}/events`,
				cookie: "access_token=test_access_token",
			},
		});

		const res = await handlers.GET(req);
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toMatch(/text\/event-stream/);

		const body = res.body;
		if (!body) throw new Error("expected a streaming response body");
		const reader = body.getReader();
		const first = await reader.read();
		expect(first.done).toBe(false);
		expect(new TextDecoder().decode(first.value)).toContain("data: one");

		closeUpstream();
		await reader.cancel();
	});
});
