/**
 * Public-boundary coverage for the `/proxy` request validation, target-URL
 * allowlist DSL, structured error envelope, upstream-failure handling, and
 * construction-time pattern validation.
 *
 * These behaviors live in the private `core/handlers/proxyHandler` module but
 * are fully observable through the Express adapter's `/proxy` route, so they are driven
 * here through `@reltio/auth/express` per the package testing rule (never
 * import `src/core/*` in a test). Adapter-only concerns (body forwarding,
 * binary fidelity, the mount gate) stay in `proxy.test.ts`.
 */

import { createExpressAuth } from "@reltio/auth/express";
import type { AuthConfig } from "@reltio/auth/types";
import { HttpResponse, http } from "msw";
import type { Agent } from "supertest";
import { describe, expect, it } from "vitest";
import {
	createTestApp,
	DEFAULT_CONFIG,
	mswServer,
	TEST_HOST,
	useMswServer,
} from "./testApp";

const TEST_UPSTREAM = "https://api.test.reltio.com";
const ACCESS_COOKIE = ["access_token=test_access_token"];

/** App exposing `/proxy` with a caller-supplied allowlist. */
function proxyApp(allowedTargets: string[]): Agent {
	return createTestApp({ config: { proxy: { allowedTargets } } });
}

/** GET `/proxy` with the standard cookie and an optional target header. */
function getProxy(app: Agent, target?: string) {
	const req = app.get("/api/auth/proxy").set("Host", TEST_HOST);
	// Some validation tests intentionally omit the cookie or the target.
	return target === undefined ? req : req.set("reltio-target-url", target);
}

describe("Express /proxy — request validation envelope", () => {
	useMswServer();

	it("400 missing_target_url when the reltio-target-url header is absent", async () => {
		const res = await getProxy(proxyApp([`${TEST_UPSTREAM}/`])).set(
			"Cookie",
			ACCESS_COOKIE,
		);
		expect(res.statusCode).toBe(400);
		expect(res.headers["content-type"]).toMatch(/application\/json/);
		expect(res.body.error).toBe("missing_target_url");
	});

	it("400 invalid_target_url when the target is not a parseable URL", async () => {
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/`]),
			"not-a-valid-url",
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(400);
		expect(res.body.error).toBe("invalid_target_url");
	});

	it("400 invalid_target_url when the target embeds credentials", async () => {
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/`]),
			"https://user:pass@api.test.reltio.com/entities",
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(400);
		expect(res.body.error).toBe("invalid_target_url");
		// The origin+path is echoed, never the credentials.
		expect(res.body.message).not.toMatch(/user:pass/);
	});

	it("400 unsupported_scheme for an http:// target", async () => {
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/`]),
			"http://api.test.reltio.com/entities",
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(400);
		expect(res.body.error).toBe("unsupported_scheme");
	});

	it("403 target_not_allowed for an https target outside the allowlist", async () => {
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/`]),
			"https://evil.example.com/steal",
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("target_not_allowed");
	});

	it("401 missing_access_token when no access_token cookie is present", async () => {
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/`]),
			`${TEST_UPSTREAM}/entities`,
		);
		expect(res.statusCode).toBe(401);
		expect(res.body.error).toBe("missing_access_token");
	});
});

describe("Express /proxy — allowlist DSL matching", () => {
	useMswServer();

	/** Registers a catch-all 200 handler for one upstream host + path. */
	function upstreamOk(url: string): void {
		mswServer.use(
			http.all(url, () => HttpResponse.text("ok", { status: 200 })),
		);
	}

	it("literal host forwards an exact-host request", async () => {
		upstreamOk(`${TEST_UPSTREAM}/entities`);
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/`]),
			`${TEST_UPSTREAM}/entities`,
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(200);
	});

	it("literal host denies a different subdomain (403)", async () => {
		const res = await getProxy(
			proxyApp(["https://reltio.com/"]),
			`${TEST_UPSTREAM}/entities`,
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(403);
		expect(res.body.error).toBe("target_not_allowed");
	});

	it("single-label * matches one label but denies multi-label", async () => {
		upstreamOk(`${TEST_UPSTREAM}/x`);
		const app = proxyApp(["https://*.test.reltio.com/"]);

		const allowed = await getProxy(app, `${TEST_UPSTREAM}/x`).set(
			"Cookie",
			ACCESS_COOKIE,
		);
		expect(allowed.statusCode).toBe(200);

		const denied = await getProxy(app, "https://a.b.test.reltio.com/x").set(
			"Cookie",
			ACCESS_COOKIE,
		);
		expect(denied.statusCode).toBe(403);
	});

	it("multi-label ** matches a deep subdomain", async () => {
		upstreamOk("https://a.b.test.reltio.com/x");
		const res = await getProxy(
			proxyApp(["https://**.test.reltio.com/"]),
			"https://a.b.test.reltio.com/x",
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(200);
	});

	it("path prefix denies a target outside the prefix (403)", async () => {
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/reltio/`]),
			`${TEST_UPSTREAM}/other/thing`,
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(403);
	});

	it("a pattern with no path (host only) admits any path", async () => {
		upstreamOk(`${TEST_UPSTREAM}/anything/deep`);
		const res = await getProxy(
			proxyApp([TEST_UPSTREAM]),
			`${TEST_UPSTREAM}/anything/deep`,
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(200);
	});
});

describe("Express /proxy — upstream failure", () => {
	useMswServer();

	it("502 upstream_error when the upstream fetch fails (leaks no internals)", async () => {
		mswServer.use(
			http.get(`${TEST_UPSTREAM}/boom`, () => HttpResponse.error()),
		);
		const res = await getProxy(
			proxyApp([`${TEST_UPSTREAM}/`]),
			`${TEST_UPSTREAM}/boom`,
		).set("Cookie", ACCESS_COOKIE);
		expect(res.statusCode).toBe(502);
		expect(res.body.error).toBe("upstream_error");
	});
});

describe("createExpressAuth — proxy allowlist construction-time validation", () => {
	const withPatterns = (patterns: string[]): AuthConfig => ({
		...DEFAULT_CONFIG,
		proxy: { allowedTargets: patterns },
	});

	it.each([
		{ name: "non-https scheme", pattern: "http://api.reltio.com/" },
		{ name: "mid-host wildcard", pattern: "https://api.*.reltio.com/" },
		{
			name: "merged wildcard (no separating dot)",
			pattern: "https://*reltio.com/",
		},
		{ name: "port in pattern", pattern: "https://api.reltio.com:8443/" },
		{ name: "glob in path", pattern: "https://api.reltio.com/api/*/raw" },
		{ name: "query string in pattern", pattern: "https://api.reltio.com/?q=1" },
		{ name: "host without a dot (SSRF guard)", pattern: "https://localhost/" },
	])("throws TypeError naming the offending pattern: $name", ({ pattern }) => {
		expect(() => createExpressAuth(withPatterns([pattern]))).toThrow(TypeError);
		expect(() => createExpressAuth(withPatterns([pattern]))).toThrow(
			new RegExp(escapeForRegex(`"${pattern}"`)),
		);
	});

	it("names the FIRST invalid pattern when multiple are present", () => {
		expect(() =>
			createExpressAuth(
				withPatterns([
					"https://**.reltio.com/",
					"http://api.reltio.com/",
					"https://localhost/",
				]),
			),
		).toThrow(/"http:\/\/api\.reltio\.com\/"/);
	});

	it("accepts an empty allowedTargets array (enables /proxy, then rejects every request)", () => {
		expect(() => createExpressAuth(withPatterns([]))).not.toThrow();
	});

	it("accepts every valid DSL shape", () => {
		expect(() =>
			createExpressAuth(
				withPatterns([
					"https://rdm.reltio.com/",
					"https://*.reltio.com/reltio/",
					"https://**.reltio.com/reltio/",
					"https://**.reltio.com/",
					"https://api.reltio.com/reltio/*",
				]),
			),
		).not.toThrow();
	});
});

/** Escapes regex metacharacters so a literal pattern can be embedded in a `RegExp`. */
function escapeForRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
