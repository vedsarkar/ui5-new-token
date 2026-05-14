/**
 * Integration tests for `GET /logout` mounted under the Express adapter.
 *
 * `GET /logout` clears the three auth cookies and redirects the browser
 * to the Login Page's logout URL. It does not call the OAuth server, so
 * no MSW mocking is needed here.
 */

import { describe, expect, it } from "vitest";
import {
	createTestApp,
	DEFAULT_CONFIG,
	parseSetCookies,
	TEST_APP_ORIGIN,
	TEST_HOST,
} from "./testApp";

describe("Express adapter — GET /logout", () => {
	it("clears access_token, refresh_token, and state cookies", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/logout")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/dashboard`)
			.set("Cookie", [
				"access_token=old_access",
				"refresh_token=old_refresh",
				"state=old_state",
			]);

		expect(res.statusCode).toBe(302);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		// Cleared cookies have an empty value and Max-Age=0.
		expect(cookies.access_token).toBeDefined();
		expect(cookies.access_token.value).toBe("");
		expect(cookies.access_token.attributes.join("; ")).toContain("Max-Age=0");

		expect(cookies.refresh_token).toBeDefined();
		expect(cookies.refresh_token.value).toBe("");
		expect(cookies.refresh_token.attributes.join("; ")).toContain("Max-Age=0");
	});

	it("issues a fresh state cookie so the user can re-authenticate immediately", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/logout")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/`);

		// Two state cookies in the Set-Cookie list: one empty (clear), one new.
		const setCookieHeaders = res.headers["set-cookie"] ?? [];
		const stateHeaders = (setCookieHeaders as string[]).filter((h) =>
			h.startsWith("state="),
		);
		expect(stateHeaders).toHaveLength(2);
		const stateValues = stateHeaders.map((h) => {
			const eq = h.indexOf("=");
			const semi = h.indexOf(";");
			return h.slice(eq + 1, semi === -1 ? undefined : semi);
		});
		expect(stateValues).toContain("");
		const fresh = stateValues.find((v) => v !== "");
		expect(fresh).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		);
	});

	it("redirects to the Login Page's /logout endpoint", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/logout")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/dashboard`);

		const location = new URL(res.headers.location);
		expect(location.origin).toBe(DEFAULT_CONFIG.loginPath);
		expect(location.pathname).toBe("/logout");
		const redirectUrl = location.searchParams.get("redirectUrl");
		expect(redirectUrl).toBeTruthy();
		expect(redirectUrl).toContain(DEFAULT_CONFIG.loginPath);
	});

	it("preserves the tenant query parameter from the Referer in the logout chain", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/logout")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/dashboard?tenant=acme`);

		const location = new URL(res.headers.location);
		const redirectUrl = location.searchParams.get("redirectUrl") as string;
		expect(redirectUrl).toContain("tenant=acme");
	});

	it("uses the same cookie attributes on clear as on set (HttpOnly, Secure, SameSite, Path)", async () => {
		const app = createTestApp({ config: { secure: true } });

		const res = await app
			.get("/api/auth/logout")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/`);

		const cookies = parseSetCookies(res.headers["set-cookie"]);
		const accessTokenAttrs = cookies.access_token.attributes.join("; ");
		expect(accessTokenAttrs).toContain("HttpOnly");
		expect(accessTokenAttrs).toContain("Secure");
		expect(accessTokenAttrs).toContain("SameSite=Lax");
		expect(accessTokenAttrs).toContain("Path=/");
	});

	it("returns 400 when Referer is missing", async () => {
		const app = createTestApp();

		const res = await app.get("/api/auth/logout").set("Host", TEST_HOST);

		expect(res.statusCode).toBe(400);
	});

	it("emits Cache-Control headers", async () => {
		const app = createTestApp();

		const res = await app
			.get("/api/auth/logout")
			.set("Host", TEST_HOST)
			.set("Referer", `${TEST_APP_ORIGIN}/`);

		expect(res.headers["cache-control"]).toContain("no-store");
		expect(res.headers.pragma).toBe("no-cache");
	});
});
