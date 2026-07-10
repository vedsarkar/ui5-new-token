/**
 * Test infrastructure for `@reltio/auth/next` integration tests.
 *
 * Next.js App Router handlers accept a Web `Request` (Next.js `NextRequest`
 * is a subclass) and return a Web `Response`. No supertest, no Express app
 * — tests build a `Request` directly and call the handler. The OAuth
 * server is mocked via MSW exactly like in the Express tests.
 *
 * The canonical mount path in tests is `/auth/...` — matching what a
 * consumer would write in `app/auth/[...auth]/route.ts`.
 */

import { createNextAuth } from "@reltio/auth/next";
import type { AuthConfig, SsoRedirect } from "@reltio/auth/types";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { TOKEN_WITH_AURL_ORIGIN } from "../fixtures/aurlTokens";

/**
 * Reltio OAuth and Login Page URLs used by every test. Stable, fake hosts
 * — MSW intercepts every fetch to them.
 */
export const TEST_OAUTH_HOST = "https://auth-test.reltio.com";
export const TEST_LOGIN_HOST = "https://login-test.reltio.com";

/** Stable `Host` header used in test requests. */
export const TEST_HOST = "app.test";

/**
 * Base URL of the consumer application — `https` because Next.js App
 * Router applications run over HTTPS in production and the tests build
 * their own `Request` objects (no supertest http-only constraint here).
 * Matches realistic Next.js BFF deployment.
 */
export const TEST_APP_ORIGIN = `https://${TEST_HOST}`;

/**
 * Default `AuthConfig` for tests. Includes `secure: true` — Next.js
 * production deployments are always HTTPS, and the test infrastructure
 * builds https request URLs accordingly.
 */
export const DEFAULT_CONFIG: AuthConfig = {
	oauthPath: TEST_OAUTH_HOST,
	loginPath: TEST_LOGIN_HOST,
	clientId: "test_client_id",
	clientSecret: "test_client_secret",
	secure: true,
};

/**
 * `AuthConfig` with a multiauth allowlist entry whose origin matches the
 * `aurl` claim in {@link TOKEN_WITH_AURL}. Tests that exercise per-request
 * cluster routing use this so a request carrying `TOKEN_WITH_AURL` routes to
 * the additional cluster instead of the primary `oauthPath`.
 */
export const MULTIAUTH_CONFIG: AuthConfig = {
	...DEFAULT_CONFIG,
	authEnvironments: [
		{
			oauthPath: TOKEN_WITH_AURL_ORIGIN,
			clientId: "additional_client_id",
			clientSecret: "additional_client_secret",
		},
	],
};

/** Shared MSW server. */
export const mswServer = setupServer();

/**
 * Wires the MSW server into the current Vitest test file's lifecycle.
 * Mirrors the helper in `tests/express/testApp.ts`.
 */
export function useMswServer(): void {
	beforeAll(() =>
		mswServer.listen({
			onUnhandledRequest: (request) => {
				const url = new URL(request.url);
				if (
					url.hostname === "127.0.0.1" ||
					url.hostname === "localhost" ||
					url.hostname === "::1"
				) {
					return;
				}
				throw new Error(
					`Unhandled ${request.method} ${request.url} — register an MSW handler in the test`,
				);
			},
		}),
	);
	afterEach(() => mswServer.resetHandlers());
	afterAll(() => mswServer.close());
}

/** Options accepted by `createTestHandlers`. */
export type CreateTestHandlersOptions = {
	/** Override individual `AuthConfig` keys. */
	config?: Partial<AuthConfig>;
	/** Provide an `ssoRedirect` callback. */
	ssoRedirect?: SsoRedirect;
};

/**
 * Builds the full `{ GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS }`
 * handler set using `DEFAULT_CONFIG` merged with any per-test overrides.
 * The auth-endpoint tests destructure just `GET`/`POST`; the proxy tests
 * use the wider surface.
 */
export function createTestHandlers(
	options: CreateTestHandlersOptions = {},
): ReturnType<typeof createNextAuth>["handlers"] {
	return createNextAuth({
		...DEFAULT_CONFIG,
		...options.config,
		ssoRedirect: options.ssoRedirect,
	}).handlers;
}

/**
 * Convenience: builds a Web `Request` with realistic headers, query
 * parameters, and cookies. Keeps each test file focused on its scenario
 * instead of repeating `new Request(url, {...})` plumbing.
 */
export function buildRequest(options: {
	method?: "GET" | "POST";
	path: string;
	query?: Record<string, string>;
	cookies?: Record<string, string>;
	referer?: string;
	authorization?: string;
}): Request {
	const url = new URL(`${TEST_APP_ORIGIN}${options.path}`);
	if (options.query) {
		for (const [key, value] of Object.entries(options.query)) {
			url.searchParams.set(key, value);
		}
	}
	const headers = new Headers({ Host: TEST_HOST });
	if (options.referer) {
		headers.set("Referer", options.referer);
	}
	if (options.authorization) {
		headers.set("Authorization", options.authorization);
	}
	if (options.cookies) {
		const cookieString = Object.entries(options.cookies)
			.map(([k, v]) => `${k}=${v}`)
			.join("; ");
		headers.set("Cookie", cookieString);
	}
	return new Request(url.href, {
		method: options.method ?? "GET",
		headers,
	});
}

/**
 * Parses the `Set-Cookie` headers from a Web `Response` into an object
 * keyed by cookie name. Mirrors `parseSetCookies` from the Express tests.
 */
export function parseSetCookies(
	response: Response,
): Record<string, { value: string; attributes: string[] }> {
	const out: Record<string, { value: string; attributes: string[] }> = {};
	const list = response.headers.getSetCookie?.() ?? [];
	for (const cookie of list) {
		const [pair, ...attrs] = cookie.split(";").map((s) => s.trim());
		const eq = pair.indexOf("=");
		const name = pair.slice(0, eq);
		const value = decodeURIComponent(pair.slice(eq + 1));
		out[name] = { value, attributes: attrs };
	}
	return out;
}

/** Extracts the `state` cookie value from a response's `Set-Cookie` headers. */
export function getStateCookieValue(response: Response): string {
	const parsed = parseSetCookies(response);
	const state = parsed.state?.value;
	if (!state) {
		throw new Error("test helper: expected a state cookie on the response");
	}
	return state;
}
