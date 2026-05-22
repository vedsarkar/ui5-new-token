/**
 * Integration tests for `GET /login` mounted under the Next.js App Router
 * adapter.
 *
 * No upstream calls — `GET /login` only generates a state token and
 * redirects, so no MSW handlers are needed here.
 */

import { describe, expect, it } from "vitest";
import {
	buildRequest,
	createTestHandlers,
	DEFAULT_CONFIG,
	getStateCookieValue,
	parseSetCookies,
	TEST_APP_ORIGIN,
} from "./testHandlers";

describe("Next.js adapter — GET /auth/login", () => {
	it("redirects to the Login Page with client_id, redirect_uri, and a fresh state cookie", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				referer: `${TEST_APP_ORIGIN}/dashboard`,
			}),
		);

		expect(res.status).toBe(302);

		const state = getStateCookieValue(res);
		expect(state).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		);

		const location = new URL(res.headers.get("Location") as string);
		expect(location.origin).toBe(DEFAULT_CONFIG.loginPath);
		expect(location.searchParams.get("client_id")).toBe(
			DEFAULT_CONFIG.clientId,
		);

		const callbackUrl = new URL(
			location.searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.origin).toBe(TEST_APP_ORIGIN);
		expect(callbackUrl.pathname).toBe("/auth/callback");
		expect(callbackUrl.searchParams.get("redirectUrl")).toBe(
			`${TEST_APP_ORIGIN}/dashboard`,
		);
		expect(callbackUrl.searchParams.get("state")).toBe(state);
	});

	it("propagates the tenant from the Referer's query string to the Login Page URL", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				referer: `${TEST_APP_ORIGIN}/dashboard?tenant=acme`,
			}),
		);

		const location = new URL(res.headers.get("Location") as string);
		expect(location.searchParams.get("tenant")).toBe("acme");
	});

	it("appends notenant=true when the configuration sets notenant: true", async () => {
		const { GET } = createTestHandlers({ config: { notenant: true } });

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				referer: `${TEST_APP_ORIGIN}/`,
			}),
		);

		const location = new URL(res.headers.get("Location") as string);
		expect(location.searchParams.get("notenant")).toBe("true");
	});

	it("sets the state cookie with HttpOnly, Secure, SameSite=Lax, Path=/", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				referer: `${TEST_APP_ORIGIN}/`,
			}),
		);

		const cookies = parseSetCookies(res);
		const attributes = cookies.state.attributes.join("; ");
		expect(attributes).toContain("Path=/");
		expect(attributes).toContain("HttpOnly");
		expect(attributes).toContain("Secure");
		expect(attributes).toContain("SameSite=Lax");
	});

	it("returns 400 when neither ?returnTo= nor Referer supplies a return URL", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(buildRequest({ path: "/auth/login" }));

		expect(res.status).toBe(400);
	});

	it("emits Cache-Control: no-store and Pragma: no-cache", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				referer: `${TEST_APP_ORIGIN}/`,
			}),
		);

		expect(res.headers.get("cache-control")).toContain("no-store");
		expect(res.headers.get("cache-control")).toContain("no-cache");
		expect(res.headers.get("pragma")).toBe("no-cache");
	});

	it("uses explicit ?returnTo= and ?tenant= when Referer is absent", async () => {
		const { GET } = createTestHandlers();
		const returnTo = `${TEST_APP_ORIGIN}/hub/acme/dashboard`;

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				query: { tenant: "acme", returnTo },
			}),
		);

		expect(res.status).toBe(302);
		const location = new URL(res.headers.get("Location") as string);
		expect(location.searchParams.get("tenant")).toBe("acme");
		const callbackUrl = new URL(
			location.searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.origin).toBe(TEST_APP_ORIGIN);
		expect(callbackUrl.pathname).toBe("/auth/callback");
		expect(callbackUrl.searchParams.get("redirectUrl")).toBe(returnTo);
	});

	it("explicit ?tenant= overrides the tenant from Referer query string", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				query: { tenant: "acme" },
				referer: `${TEST_APP_ORIGIN}/dashboard?tenant=other`,
			}),
		);

		const location = new URL(res.headers.get("Location") as string);
		expect(location.searchParams.get("tenant")).toBe("acme");
	});

	it("empty ?tenant= falls back to the tenant from Referer", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				query: { tenant: "" },
				referer: `${TEST_APP_ORIGIN}/dashboard?tenant=acme`,
			}),
		);

		const location = new URL(res.headers.get("Location") as string);
		expect(location.searchParams.get("tenant")).toBe("acme");
	});

	it("explicit ?returnTo= with malformed Referer succeeds (soft-fail)", async () => {
		const { GET } = createTestHandlers();
		const returnTo = `${TEST_APP_ORIGIN}/dashboard`;

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				query: { returnTo, tenant: "acme" },
				referer: "not a valid url",
			}),
		);

		expect(res.status).toBe(302);
	});

	it("explicit ?returnTo= and same-origin Referer both present → 302 (HUB UI path-based tenant pattern)", async () => {
		const { GET } = createTestHandlers();
		const returnTo = `${TEST_APP_ORIGIN}/ui/acme/dashboard`;

		const res = await GET(
			buildRequest({
				path: "/login",
				query: { tenant: "acme", returnTo },
				referer: `${TEST_APP_ORIGIN}/ui/acme/dashboard`,
			}),
		);

		expect(res.status).toBe(302);
		const location = new URL(res.headers.get("Location") as string);
		expect(location.searchParams.get("tenant")).toBe("acme");
		const callbackUrl = new URL(
			location.searchParams.get("redirect_uri") as string,
		);
		expect(callbackUrl.searchParams.get("redirectUrl")).toBe(returnTo);
	});

	it("returns 400 when explicit ?returnTo= origin differs from Referer origin", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/auth/login",
				query: { returnTo: "https://evil.example.com/" },
				referer: `${TEST_APP_ORIGIN}/dashboard`,
			}),
		);

		expect(res.status).toBe(400);
		const body = await res.text();
		expect(body).toContain("returnTo origin does not match Referer origin");
	});

	it("dispatches the login handler regardless of mount path", async () => {
		const { GET } = createTestHandlers();

		const res = await GET(
			buildRequest({
				path: "/api/auth/login",
				referer: `${TEST_APP_ORIGIN}/`,
			}),
		);

		expect(res.status).toBe(302);
		const callbackUrl = new URL(
			new URL(res.headers.get("Location") as string).searchParams.get(
				"redirect_uri",
			) as string,
		);
		expect(callbackUrl.pathname).toBe("/api/auth/callback");
	});
});
