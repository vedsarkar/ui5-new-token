/**
 * `createAuth` — the framework-agnostic core of `@reltio/auth`.
 *
 * Build the auth handler ONCE with the static configuration:
 *
 *     const auth = createAuth({ oauthPath, loginPath, clientId, clientSecret });
 *
 * Then dispatch each incoming request through `auth.handle(request)`.
 *
 * The `config.ssoRedirect` callback (if provided) is invoked at the end of
 * a successful `/callback` exchange. Its signature is Web-API native:
 * `(ctx) => Response | Promise<Response>`. The same callback shape works
 * in every supported adapter (Express, Next.js) and any Web Fetch runtime.
 *
 * Routing is path-suffix based so the router is mount-point agnostic
 * (`/auth/login`, `/api/auth/login`, etc. all dispatch to the login handler).
 * All responses get `Cache-Control` and `Pragma` headers applied so
 * intermediate caches never store authentication state.
 */

import type { AuthConfig } from "../types";
import { createOAuthClient } from "./createOAuthClient";
import { callbackHandler } from "./handlers/callbackHandler";
import { checkTokenHandler } from "./handlers/checkTokenHandler";
import { loginHandler } from "./handlers/loginHandler";
import { logoutHandler } from "./handlers/logoutHandler";
import { refreshTokenHandler } from "./handlers/refreshTokenHandler";
import type { Handler } from "./handlers/types";

const CACHE_CONTROL = "no-store, no-cache, max-age=0, must-revalidate, private";
const PRAGMA = "no-cache";

/**
 * Routing table. Path matching is suffix-based — the last URL segment
 * selects the handler, which makes the router mount-point agnostic
 * (`/auth/login`, `/api/auth/login`, and `/anything/login` all dispatch
 * to `loginHandler`).
 */
const ROUTES: ReadonlyArray<{
	method: string;
	suffix: string;
	handler: Handler;
}> = [
	{ method: "GET", suffix: "login", handler: loginHandler },
	{ method: "GET", suffix: "logout", handler: logoutHandler },
	{ method: "GET", suffix: "callback", handler: callbackHandler },
	{ method: "POST", suffix: "refreshToken", handler: refreshTokenHandler },
	{ method: "POST", suffix: "checkToken", handler: checkTokenHandler },
];

/** Returned object — exposes `handle(request)`. */
export type AuthHandler = {
	handle: (request: Request) => Promise<Response>;
};

/**
 * Builds the auth router.
 *
 * Call this ONCE per application — the returned `handle` function is the
 * per-request entry point. Building per request would re-create the OAuth
 * client and the route table on every call, which is wasteful.
 */
export function createAuth(config: AuthConfig): AuthHandler {
	const oauth = createOAuthClient({
		oauthPath: config.oauthPath,
		loginPath: config.loginPath,
		clientId: config.clientId,
		clientSecret: config.clientSecret,
	});

	return {
		async handle(request) {
			const url = new URL(request.url);
			const lastSegment = url.pathname.split("/").filter(Boolean).pop() ?? "";
			const route = ROUTES.find(
				(r) => r.method === request.method && r.suffix === lastSegment,
			);
			if (!route) {
				return withCacheHeaders(new Response(null, { status: 404 }));
			}
			const response = await route.handler({ request, config, oauth });
			return withCacheHeaders(response);
		},
	};
}

/**
 * Adds `Cache-Control` and `Pragma` headers to a response. Applied to every
 * response coming out of the router (success or 404).
 */
function withCacheHeaders(response: Response): Response {
	if (!response.headers.has("Cache-Control")) {
		response.headers.set("Cache-Control", CACHE_CONTROL);
	}
	if (!response.headers.has("Pragma")) {
		response.headers.set("Pragma", PRAGMA);
	}
	return response;
}
