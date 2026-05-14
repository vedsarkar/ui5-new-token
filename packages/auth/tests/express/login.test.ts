/**
 * Integration tests for `GET /login` mounted under the Express adapter.
 *
 * Each test drives a real Express app via `supertest`, sets a realistic
 * `Referer` header, and asserts the redirect URL emitted by the router
 * together with the `state` cookie set on the response.
 *
 * The OAuth server is not touched by `GET /login` — the endpoint only
 * generates a state token and redirects the browser. No MSW mocking
 * needed for this file.
 */

import { describe, expect, it } from "vitest";
import {
	createTestApp,
	DEFAULT_CONFIG,
	getStateCookieValue,
	parseSetCookies,
	TEST_APP_ORIGIN,
	TEST_HOST,
} from "./testApp";

describe("Express adapter — GET /login", () => {
	it("redirects to the Login Page with client_id, redirect_uri, and a fresh state cookie", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/dashboard`);

		expect(res.statusCode).toBe(302);

		const state = getStateCookieValue(res.headers["set-cookie"]);
		expect(state).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		);

		const location = new URL(res.headers.location);
		expect(location.origin).toBe(DEFAULT_CONFIG.loginPath);
		expect(location.searchParams.get("client_id")).toBe(
			DEFAULT_CONFIG.clientId,
		);
		const redirectUri = location.searchParams.get("redirect_uri");
		expect(redirectUri).toBeTruthy();

		const callbackUrl = new URL(redirectUri as string);
		expect(callbackUrl.origin).toBe(TEST_APP_ORIGIN);
		expect(callbackUrl.pathname).toBe("/api/auth/callback");
		expect(callbackUrl.searchParams.get("redirectUrl")).toBe(
			`${TEST_APP_ORIGIN}/dashboard`,
		);
		expect(callbackUrl.searchParams.get("state")).toBe(state);
	});

	it("propagates the tenant from the Referer's query string to the Login Page URL", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/dashboard?tenant=acme`);

		const location = new URL(res.headers.location);
		expect(location.searchParams.get("tenant")).toBe("acme");
	});

	it("appends notenant=true when the configuration sets notenant: true", async () => {
		const app = createTestApp({ config: { notenant: true } });

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/dashboard`);

		const location = new URL(res.headers.location);
		expect(location.searchParams.get("notenant")).toBe("true");
	});

	it("forces https in the callback redirect_uri when secure: true", async () => {
		const app = createTestApp({ config: { secure: true } });

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `http://${TEST_HOST}/dashboard`); // plain HTTP

		const location = new URL(res.headers.location);
		const callbackUrl = new URL(
			location.searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.protocol).toBe("https:");
	});

	it("preserves the referer scheme when secure: false", async () => {
		const app = createTestApp({ config: { secure: false } });

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `http://${TEST_HOST}/dashboard`);

		const location = new URL(res.headers.location);
		const callbackUrl = new URL(
			location.searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.protocol).toBe("http:");
	});

	it("sets the state cookie with HttpOnly, Secure, SameSite=Lax, Path=/ when secure: true", async () => {
		const app = createTestApp({ config: { secure: true } });

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/`);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.state).toBeDefined();
		const attributes = cookies.state.attributes.join("; ");
		expect(attributes).toContain("Path=/");
		expect(attributes).toContain("HttpOnly");
		expect(attributes).toContain("Secure");
		expect(attributes).toContain("SameSite=Lax");
	});

	it("omits the Secure flag on the state cookie when secure: false", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/`);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		expect(cookies.state).toBeDefined();
		const attributes = cookies.state.attributes.join("; ");
		expect(attributes).not.toContain("Secure");
		expect(attributes).toContain("HttpOnly");
		expect(attributes).toContain("SameSite=Lax");
	});

	it("returns 400 when the Referer header is missing", async () => {
		const app = createTestApp();

		const res = await app.get("/api/auth/login").set("Host", TEST_HOST);

		expect(res.statusCode).toBe(400);
	});

	it("emits Cache-Control: no-store and Pragma: no-cache on every response", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/`);

		expect(res.headers["cache-control"]).toContain("no-store");
		expect(res.headers["cache-control"]).toContain("no-cache");
		expect(res.headers["cache-control"]).toContain("private");
		expect(res.headers.pragma).toBe("no-cache");
	});

	it("dispatches the login handler regardless of mount path", async () => {
		const app = createTestApp({ mountPath: "/anywhere/auth" });

		const res = await app
			.get("/anywhere/auth/login")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/`);

		expect(res.statusCode).toBe(302);
		const callbackUrl = new URL(
			new URL(res.headers.location).searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.pathname).toBe("/anywhere/auth/callback");
	});
});
