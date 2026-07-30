/**
 * Regression tests pinning the Express router's independence from middleware
 * order.
 *
 * Every consumer app mounts `express.json()` somewhere, and most mount it
 * before the auth router. Once a parser matches the request's `Content-Type` it
 * drains the raw stream, so a router that then hands that stream to the core
 * builds a Web `Request` whose body is already disturbed — `new Request(...)`
 * throws `TypeError` and the endpoint 500s. The trigger is the parser actually
 * matching: a POST with no body (or an unmatched type) leaves the stream intact
 * and survives either way, which is why the browser-realistic
 * `Content-Type: application/json` cases below are the ones that reproduce it.
 *
 * The five auth endpoints read only headers, cookies, and the query string, so
 * they must never touch the stream and must work at any position in the chain.
 *
 * `/proxy` is the deliberate exception: it forwards the body upstream, so it
 * does require mounting before the parsers. The last two tests are a matched
 * pair isolating mount position as the only variable — wrong order fails
 * loudly rather than silently forwarding an empty body; right order streams
 * the body through.
 */

import type { AuthConfig } from "@reltio/auth/types";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	createTestApp,
	mswServer,
	parseSetCookies,
	TEST_APP_ORIGIN,
	TEST_HOST,
	TEST_LOGIN_HOST,
	TEST_OAUTH_HOST,
	useMswServer,
} from "./testApp";

const TEST_UPSTREAM = "https://api.test.reltio.com";

const PROXY_CONFIG: AuthConfig["proxy"] = {
	allowedTargets: [`${TEST_UPSTREAM}/`],
};

describe("Express adapter — auth endpoints behind a body parser", () => {
	useMswServer();

	it("POST /checkToken succeeds when express.json() consumed a JSON body first", async () => {
		let capturedToken: string | null = null;
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, async ({ request }) => {
				capturedToken = new URLSearchParams(await request.text()).get("token");
				return HttpResponse.json({ username: "alice@example.com" });
			}),
		);
		const app = createTestApp({ bodyParserFirst: true });

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token_from_cookie"])
			.send({ ignored: "payload" });

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ username: "alice@example.com" });
		expect(capturedToken).toBe("token_from_cookie");
	});

	it("POST /checkToken succeeds with no request body at all", async () => {
		// The baseline shape: nothing for the parser to match, so the stream is
		// untouched either way. Guards against a fix that only handles the
		// consumed-stream case and regresses the plain call.
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () =>
				HttpResponse.json({ ok: true }),
			),
		);
		const app = createTestApp({ bodyParserFirst: true });

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"]);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ ok: true });
	});

	it("POST /checkToken succeeds when express.urlencoded() consumed a form body", async () => {
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/checkToken`, () =>
				HttpResponse.json({ ok: true }),
			),
		);
		const app = createTestApp({ bodyParserFirst: true });

		const res = await app
			.post("/api/auth/checkToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=token"])
			.type("form")
			.send({ ignored: "payload" });

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ ok: true });
	});

	it("POST /refreshToken succeeds and still rotates both cookies when express.json() ran first", async () => {
		mswServer.use(
			http.post(`${TEST_OAUTH_HOST}/oauth/token`, () =>
				HttpResponse.json({
					access_token: "refreshed_access",
					refresh_token: "refreshed_refresh",
					expires_in: 1800,
				}),
			),
		);
		const app = createTestApp({ bodyParserFirst: true });

		const res = await app
			.post("/api/auth/refreshToken")
			.set("Host", TEST_HOST)
			.set("Cookie", ["refresh_token=old_refresh"])
			.send({ ignored: "payload" });

		expect(res.statusCode).toBe(201);
		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.access_token.value).toBe("refreshed_access");
		expect(cookies.refresh_token.value).toBe("refreshed_refresh");
	});

	it("GET /login still redirects to the Login Page when express.json() ran first", async () => {
		const app = createTestApp({ bodyParserFirst: true });

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/dashboard`);

		expect(res.statusCode).toBe(302);
		expect(res.headers.location).toContain(TEST_LOGIN_HOST);
	});

	it("/proxy behind a body parser fails loudly instead of forwarding an empty body", async () => {
		// The documented constraint: a proxying app MUST mount the router before
		// its parsers. When it does not, the raw stream is already drained, so the
		// adapter throws rather than silently sending a truncated request upstream.
		let upstreamCalled = false;
		mswServer.use(
			http.post(`${TEST_UPSTREAM}/entities`, () => {
				upstreamCalled = true;
				return HttpResponse.text("upstream-body", { status: 201 });
			}),
		);
		const app = createTestApp({
			config: { proxy: PROXY_CONFIG },
			bodyParserFirst: true,
		});

		const res = await app
			.post("/api/auth/proxy")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=test_access_token"])
			.set("reltio-target-url", `${TEST_UPSTREAM}/entities`)
			.send({ payload: "would be lost" });

		expect(res.statusCode).toBe(500);
		expect(upstreamCalled).toBe(false);
	});

	it("/proxy streams the body when the router is mounted before the parsers", async () => {
		// The mirror of the test above — same app, same request, correct mount
		// order — so the pair isolates middleware position as the only variable.
		let receivedBody: string | undefined;
		mswServer.use(
			http.post(`${TEST_UPSTREAM}/entities`, async ({ request }) => {
				receivedBody = await request.text();
				return HttpResponse.text("upstream-body", { status: 201 });
			}),
		);
		const app = createTestApp({ config: { proxy: PROXY_CONFIG } });

		const res = await app
			.post("/api/auth/proxy")
			.set("Host", TEST_HOST)
			.set("Cookie", ["access_token=test_access_token"])
			.set("reltio-target-url", `${TEST_UPSTREAM}/entities`)
			.send({ payload: "arrives intact" });

		expect(res.statusCode).toBe(201);
		expect(receivedBody).toBe(JSON.stringify({ payload: "arrives intact" }));
	});
});
