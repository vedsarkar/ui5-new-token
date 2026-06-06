/**
 * Tests for the Express ↔ Web Fetch conversion edges in the Express adapter.
 *
 * These drive the public `/callback` endpoint to reach two adapter paths the
 * endpoint-behaviour tests don't:
 *   - `expressToWebRequest` forwarding a multi-valued (Node-arrayed) request
 *     header (`Set-Cookie` is the one header Node always represents as an
 *     array) into the Web `Request`.
 *   - `applyWebResponseToExpressRes` forwarding a response-write failure to
 *     Express's error handler via `next(error)` instead of crashing.
 */

import type { SsoRedirect } from "@reltio/auth/types";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import {
	createTestApp,
	mswServer,
	TEST_HOST,
	TEST_LOGIN_HOST,
	useMswServer,
} from "./testApp";

const STATE = "fixed-state-value";

function mockTokenExchange() {
	mswServer.use(
		http.post(`${TEST_LOGIN_HOST}/token`, () =>
			HttpResponse.json({ access_token: "a", refresh_token: "r" }),
		),
	);
}

describe("Express adapter — request/response conversion", () => {
	useMswServer();

	it("forwards a multi-valued request header (Node-arrayed Set-Cookie) into the Web Request", async () => {
		mockTokenExchange();
		let forwarded: string[] = [];
		const ssoRedirect: SsoRedirect = ({ request }) => {
			forwarded = request.headers.getSetCookie?.() ?? [];
			return Response.redirect("/", 302);
		};
		const app = createTestApp({ ssoRedirect });

		await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.set("Set-Cookie", ["a=1", "b=2"])
			.query({ code: "x", state: STATE });

		expect(forwarded).toEqual(["a=1", "b=2"]);
	});

	it("forwards a response-write failure to Express's error handler", async () => {
		mockTokenExchange();
		// A consumer ssoRedirect returning a Response whose body stream errors
		// makes `webResponse.text()` reject inside the adapter; the catch must
		// route it to `next(error)` (→ 500) rather than leave it unhandled.
		const ssoRedirect: SsoRedirect = () =>
			new Response(
				new ReadableStream({
					start(controller) {
						controller.error(new Error("body stream failed"));
					},
				}),
				{ status: 200 },
			);
		const app = createTestApp({ ssoRedirect });

		const res = await app
			.get("/api/auth/callback")
			.set("Host", TEST_HOST)
			.set("Cookie", [`state=${STATE}`])
			.query({ code: "x", state: STATE });

		expect(res.statusCode).toBe(500);
	});
});
