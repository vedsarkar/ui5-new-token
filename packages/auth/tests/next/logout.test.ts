/**
 * Integration tests for `GET /logout` mounted under the Next.js App Router
 * adapter. No upstream calls.
 */

import { describe, expect, it } from "vitest";
import {
	buildRequest,
	createTestHandlers,
	DEFAULT_CONFIG,
	parseSetCookies,
	TEST_APP_ORIGIN,
} from "./testHandlers";

describe("Next.js adapter — GET /auth/logout", () => {
	it("clears access_token, refresh_token, and state cookies", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				referer: `${TEST_APP_ORIGIN}/dashboard`,
				cookies: {
					access_token: "old_access",
					refresh_token: "old_refresh",
					state: "old_state",
				},
			}),
		);

		expect(res.status).toBe(302);

		const cookies = parseSetCookies(res);
		expect(cookies.access_token.value).toBe("");
		expect(cookies.access_token.attributes.join("; ")).toContain("Max-Age=0");
		expect(cookies.refresh_token.value).toBe("");
		expect(cookies.refresh_token.attributes.join("; ")).toContain("Max-Age=0");
	});

	it("issues a fresh state cookie so the user can re-authenticate immediately", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				referer: `${TEST_APP_ORIGIN}/`,
			}),
		);

		// Two state cookies in the response: one cleared (Max-Age=0), one fresh.
		const setCookieHeaders = res.headers.getSetCookie?.() ?? [];
		const stateHeaders = setCookieHeaders.filter((h) => h.startsWith("state="));
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
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				referer: `${TEST_APP_ORIGIN}/dashboard`,
			}),
		);

		const location = new URL(res.headers.get("Location") as string);
		expect(location.origin).toBe(DEFAULT_CONFIG.loginPath);
		expect(location.pathname).toBe("/logout");
		const redirectUrl = location.searchParams.get("redirectUrl");
		expect(redirectUrl).toContain(DEFAULT_CONFIG.loginPath);
	});

	it("preserves the tenant query parameter from the Referer in the logout chain", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				referer: `${TEST_APP_ORIGIN}/dashboard?tenant=acme`,
			}),
		);

		const location = new URL(res.headers.get("Location") as string);
		const redirectUrl = location.searchParams.get("redirectUrl") as string;
		expect(redirectUrl).toContain("tenant=acme");
	});

	it("uses the same cookie attributes on clear as on set (HttpOnly, Secure, SameSite, Path)", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				referer: `${TEST_APP_ORIGIN}/`,
			}),
		);

		const cookies = parseSetCookies(res);
		const attrs = cookies.access_token.attributes.join("; ");
		expect(attrs).toContain("HttpOnly");
		expect(attrs).toContain("Secure");
		expect(attrs).toContain("SameSite=Lax");
		expect(attrs).toContain("Path=/");
	});

	it("returns 400 when neither ?returnTo= nor Referer supplies a return URL", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(buildRequest({ path: "/auth/logout" }));

		expect(res.status).toBe(400);
	});

	it("uses explicit ?returnTo= and ?tenant= when Referer is absent", async () => {
		const { GET } = createTestHandlers();
		const returnTo = `${TEST_APP_ORIGIN}/hub/acme`;

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				query: { tenant: "acme", returnTo },
			}),
		);

		expect(res.status).toBe(302);
		const loginUrl = new URL(
			new URL(res.headers.get("Location") as string).searchParams.get(
				"redirectUrl",
			) as string,
		);
		expect(loginUrl.searchParams.get("tenant")).toBe("acme");
		const callbackUrl = new URL(
			loginUrl.searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.origin).toBe(TEST_APP_ORIGIN);
	});

	it("explicit ?returnTo= overrides Referer href; tenant still falls back to Referer", async () => {
		const { GET } = createTestHandlers();
		const returnTo = `${TEST_APP_ORIGIN}/hub/acme`;

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				query: { returnTo },
				referer: `${TEST_APP_ORIGIN}/dashboard?tenant=other`,
			}),
		);

		expect(res.status).toBe(302);
		const loginUrl = new URL(
			new URL(res.headers.get("Location") as string).searchParams.get(
				"redirectUrl",
			) as string,
		);
		expect(loginUrl.searchParams.get("tenant")).toBe("other");
		const callbackUrl = new URL(
			loginUrl.searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.searchParams.get("redirectUrl")).toBe(returnTo);
	});

	it("explicit ?returnTo= and same-origin Referer both present → 302 (HUB UI path-based tenant pattern)", async () => {
		const { GET } = createTestHandlers();
		const returnTo = `${TEST_APP_ORIGIN}/ui/acme`;

		const res = await GET(
			buildRequest({
				path: "/logout",
				query: { tenant: "acme", returnTo },
				referer: `${TEST_APP_ORIGIN}/ui/acme/dashboard`,
			}),
		);

		expect(res.status).toBe(302);
		const loginUrl = new URL(
			new URL(res.headers.get("Location") as string).searchParams.get(
				"redirectUrl",
			) as string,
		);
		expect(loginUrl.searchParams.get("tenant")).toBe("acme");
	});

	it("returns 400 when explicit ?returnTo= origin differs from Referer origin", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				query: { returnTo: "https://evil.example.com/" },
				referer: `${TEST_APP_ORIGIN}/dashboard`,
			}),
		);

		expect(res.status).toBe(400);
		const body = await res.text();
		expect(body).toContain("returnTo origin does not match Referer origin");
	});

	it("emits Cache-Control headers", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/logout",
				referer: `${TEST_APP_ORIGIN}/`,
			}),
		);

		expect(res.headers.get("cache-control")).toContain("no-store");
		expect(res.headers.get("pragma")).toBe("no-cache");
	});
});
