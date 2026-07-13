/**
 * Tests for the Express ↔ Web Fetch conversion edges in the Express adapter.
 *
 * These drive the public `/callback` endpoint to reach two adapter paths the
 * endpoint-behaviour tests don't:
 *   - `expressToWebRequest` forwarding a multi-valued (Node-arrayed) request
 *     header (`Set-Cookie` is the one header Node always represents as an
 *     array) into the Web `Request`.
 *   - `applyWebResponseToExpressRes` surfacing a response-body-stream failure
 *     to the client (aborted connection) instead of hanging or crashing.
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

	it("surfaces a response-body-stream failure to the client instead of hanging", async () => {
		mockTokenExchange();
		// A consumer ssoRedirect returning a Response whose body stream errors.
		// The adapter streams the body through `pipeline`, so a body failure
		// aborts the client connection (surfaced as a socket error) rather
		// than hanging forever or crashing the process.
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

		await expect(
			app
				.get("/api/auth/callback")
				.set("Host", TEST_HOST)
				.set("Cookie", [`state=${STATE}`])
				.query({ code: "x", state: STATE }),
		).rejects.toThrow();
	});
});
