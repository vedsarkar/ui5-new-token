/**
 * Integration tests for the core router dispatch via the Next.js adapter.
 *
 * The Next.js adapter is a catch-all (`GET`/`POST` forward every path to
 * `auth.handle`), so it is the surface that exercises the core router's
 * match-by-(method, suffix) logic — including the 404 path for anything that
 * doesn't match a known endpoint. Like every router response, the 404 still
 * carries the no-store cache headers.
 */

import { describe, expect, it } from "vitest";
import { buildRequest, createTestHandlers, useMswServer } from "./testHandlers";

describe("Next.js adapter — router dispatch", () => {
	useMswServer();

	it("returns 404 with cache headers for an unknown endpoint", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(buildRequest({ path: "/auth/does-not-exist" }));

		expect(res.status).toBe(404);
		expect(res.headers.get("cache-control")).toContain("no-store");
		expect(res.headers.get("pragma")).toBe("no-cache");
	});

	it("returns 404 for a known suffix used with the wrong HTTP method", async () => {
		// `/checkToken` is POST-only; routing a GET to it must not match.
		const { GET } = createTestHandlers();

		const res = await GET(buildRequest({ path: "/auth/checkToken" }));

		expect(res.status).toBe(404);
	});

	it("returns 404 for a request to the bare mount root (no suffix segment)", async () => {
		// pathname "/" has no segments, so the last-segment lookup yields the
		// empty string and matches no route.
		const { GET } = createTestHandlers();

		const res = await GET(buildRequest({ path: "/" }));

		expect(res.status).toBe(404);
	});
});
