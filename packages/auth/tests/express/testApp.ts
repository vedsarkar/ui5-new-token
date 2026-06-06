/**
 * Test infrastructure for `@reltio/auth/express` integration tests.
 *
 * Provides a real Express app with the auth router mounted at `/api/auth`
 * (mirroring the `admin-tools` mount path) plus an MSW server that mocks
 * the Reltio OAuth and Login Page endpoints. Tests use `supertest` to
 * drive the app over a UNIX-domain socket — no port allocation, no
 * cross-test interference.
 */

import { createExpressAuth } from "@reltio/auth/express";
import type { AuthConfig, SsoRedirect } from "@reltio/auth/types";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import supertest, { type Agent } from "supertest";
import { afterAll, afterEach, beforeAll } from "vitest";

/**
 * Reltio OAuth and Login Page URLs used by every test. Stable, fake hosts
 * — MSW intercepts every fetch to them.
 */
export const TEST_OAUTH_HOST = "https://auth-test.reltio.com";
export const TEST_LOGIN_HOST = "https://login-test.reltio.com";

/**
 * Default `AuthConfig` for tests.
 *
 * `secure: false` because supertest issues HTTP requests against its own
 * internal ephemeral server — under `secure: true` the login handler would
 * force the callback URL to https, breaking the origin check on the
 * callback's return trip. Tests that specifically exercise the `Secure`
 * cookie flag or the https forcing pass `{ config: { secure: true } }`
 * explicitly.
 *
 * Individual tests override anything else by passing partial overrides to
 * `createTestApp`.
 */
export const DEFAULT_CONFIG: AuthConfig = {
	oauthPath: TEST_OAUTH_HOST,
	loginPath: TEST_LOGIN_HOST,
	clientId: "test_client_id",
	clientSecret: "test_client_secret",
	secure: false,
};

/** Stable `Host` header used by `supertest` requests. */
export const TEST_HOST = "app.test";

/**
 * Base URL of the consumer application — used as the request origin.
 *
 * Supertest always issues HTTP requests against its internal ephemeral
 * server; combined with the `Host: app.test` header the Express adapter
 * sees, the reconstructed request URL inside the router is `http://app.test/...`.
 * The same scheme is used here so `redirectUrl` origin validation passes
 * in happy-path tests. Tests that exercise scheme mismatch override the
 * scheme inline.
 */
export const TEST_APP_ORIGIN = `http://${TEST_HOST}`;

/**
 * MSW server. Tests register handlers via `mswServer.use(http.post(...))`
 * to intercept the OAuth and Login Page calls the router makes internally.
 * Lifecycle (`beforeAll` / `afterEach` / `afterAll`) is wired in each test
 * file with the `useMswServer()` helper below.
 */
export const mswServer = setupServer();

/**
 * Wires the MSW server into the current Vitest test file's lifecycle.
 * Call once at the top of each `describe` block. Tests inside the block
 * register handlers per scenario; `afterEach` resets them so state does
 * not leak between tests.
 *
 * Unhandled requests to localhost (supertest's internal ephemeral server)
 * are bypassed. Unhandled requests to any other host throw — tests can
 * never silently hit the real internet.
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

/**
 * Options accepted by `createTestApp`. Extends `AuthConfig` overrides with
 * a few test-specific knobs.
 */
export type CreateTestAppOptions = {
	/** Override individual `AuthConfig` keys. */
	config?: Partial<AuthConfig>;
	/** Override the legacy `ssoRedirect` callback. */
	ssoRedirect?: SsoRedirect;
	/**
	 * Mount path for the auth router. Defaults to `/api/auth` — the path
	 * `admin-tools` uses. Override to `/auth` to test the canonical
	 * documentation path, or any other path to verify mount-point agnostic
	 * routing.
	 */
	mountPath?: string;
};

/**
 * Builds an Express app with the auth router mounted, plus the
 * `admin-tools`-style error handler that surfaces upstream OAuth errors
 * as JSON responses to the client.
 */
export function createTestApp(options: CreateTestAppOptions = {}): Agent {
	const { config, ssoRedirect, mountPath = "/api/auth" } = options;

	const app = express();
	app.use(
		mountPath,
		createExpressAuth({
			...DEFAULT_CONFIG,
			ssoRedirect,
			...config,
		}),
	);

	// Error handler patterned after `admin-tools/api/auth.ts` — passes
	// upstream `RequestError` bodies through to the client as JSON.
	app.use(
		async (
			err: Error & { response?: globalThis.Response },
			_req: Request,
			res: Response,
			next: NextFunction,
		) => {
			if (err.response != null) {
				try {
					const json = await err.response.json();
					res.status(err.response.status).json(json);
					return;
				} catch (error) {
					next(error);
					return;
				}
			}
			next(err);
		},
	);

	return supertest(app);
}

/**
 * Parses an array of `Set-Cookie` header values into an object keyed by
 * cookie name. Useful for asserting individual cookie attributes without
 * relying on header order.
 */
export function parseSetCookies(
	rawCookies: string[] | string | undefined,
): Record<string, { value: string; attributes: string[] }> {
	const out: Record<string, { value: string; attributes: string[] }> = {};
	const list = Array.isArray(rawCookies)
		? rawCookies
		: rawCookies
			? [rawCookies]
			: [];
	for (const cookie of list) {
		const [pair, ...attrs] = cookie.split(";").map((s) => s.trim());
		const eq = pair.indexOf("=");
		const name = pair.slice(0, eq);
		const value = decodeURIComponent(pair.slice(eq + 1));
		out[name] = { value, attributes: attrs };
	}
	return out;
}

/**
 * Mints a signed `reltio_aurl` routing cookie the only way a consumer can:
 * by driving a real `GET /callback` exchange whose access token carries the
 * given `aurl` claim. The HMAC signing key never leaves the router, so this
 * public round-trip is how tests obtain a valid routing cookie without
 * reaching into the private `core/` signer. Registers its own one-off MSW
 * handler for the Login Page `/token` endpoint; callers register their own
 * handlers (for `/checkToken` etc.) independently.
 */
export async function mintAurlCookie(
	app: Agent,
	accessToken: string,
): Promise<string> {
	const state = "mint-state";
	mswServer.use(
		http.post(`${TEST_LOGIN_HOST}/token`, () =>
			HttpResponse.json({
				access_token: accessToken,
				refresh_token: "mint_refresh",
			}),
		),
	);
	const res = await app
		.get("/api/auth/callback")
		.set("Host", TEST_HOST)
		.set("Cookie", [`state=${state}`])
		.query({ code: "mint-code", state });
	const cookie = parseSetCookies(res.headers["set-cookie"]).reltio_aurl?.value;
	if (!cookie) {
		throw new Error(
			"test helper: GET /callback did not mint a reltio_aurl cookie",
		);
	}
	return cookie;
}

/** Extracts the `state` cookie value from a `Set-Cookie` header array. */
export function getStateCookieValue(rawCookies: string[] | undefined): string {
	const parsed = parseSetCookies(rawCookies);
	const state = parsed.state?.value;
	if (!state) {
		throw new Error("test helper: expected a state cookie on the response");
	}
	return state;
}
