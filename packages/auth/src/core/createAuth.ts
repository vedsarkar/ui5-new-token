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
import { getBasicToken } from "../utils/getBasicToken";
import type { AnyRequest } from "../utils/readHeader";
import { deriveHmacKey } from "./aurlCookie";
import { callbackHandler } from "./handlers/callbackHandler";
import { checkTokenHandler } from "./handlers/checkTokenHandler";
import { loginHandler } from "./handlers/loginHandler";
import { logoutHandler } from "./handlers/logoutHandler";
import { refreshTokenHandler } from "./handlers/refreshTokenHandler";
import type { AuthDeps, Handler } from "./handlers/types";
import { resolveAuthPath } from "./resolveAuthPath";

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

/**
 * Returned object — the single composition root of the package.
 *
 * - `handle(request)` is the per-request router entry point.
 * - `resolveAuthPath(request)` resolves the per-session Auth Server URL
 *   from the signed `reltio_aurl` cookie (falling back to the static
 *   `oauthPath`). Exposed for app code that calls the Auth server directly,
 *   bypassing the router's `/checkToken` and `/refreshToken` endpoints.
 *   Framework adapters re-surface it on their own return values.
 */
export type AuthHandler = {
	handle: (request: Request) => Promise<Response>;
	resolveAuthPath: (request: AnyRequest) => Promise<string>;
};

/**
 * Builds the auth router — the ONLY factory in the package.
 *
 * Call this ONCE per application. Every "derive-once" value (the Basic auth
 * header and the HMAC routing key) is computed here and captured in a single
 * `deps` record shared by the route table and the pure OAuth/routing
 * functions. Building per request would re-derive the HMAC key on every call.
 */
export function createAuth(config: AuthConfig): AuthHandler {
	const deps: AuthDeps = {
		config,
		authHeader: `Basic ${getBasicToken(config.clientId, config.clientSecret)}`,
		keyPromise: deriveHmacKey(config.clientSecret),
	};

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
			return withCacheHeaders(await route.handler({ ...deps, request }));
		},
		resolveAuthPath: (request) => resolveAuthPath({ ...deps, request }),
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
