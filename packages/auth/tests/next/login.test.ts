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

	it("returns 400 when the Referer header is missing", async () => {
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
