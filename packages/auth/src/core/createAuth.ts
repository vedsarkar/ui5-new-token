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

import type { AuthConfig, CheckTokenResponse } from "../types";
import type { AnyRequest } from "../utils/readHeader";
import { buildAllowlist } from "./allowlist";
import { checkAccessToken } from "./checkAccessToken";
import { callbackHandler } from "./handlers/callbackHandler";
import { checkTokenHandler } from "./handlers/checkTokenHandler";
import { loginHandler } from "./handlers/loginHandler";
import { logoutHandler } from "./handlers/logoutHandler";
import { refreshTokenHandler } from "./handlers/refreshTokenHandler";
import type { AuthDeps, Handler } from "./handlers/types";
import { resolveAuthPath } from "./resolveAuthPath";

/** Optional scopes for {@link AuthHandler.checkToken}. */
export type CheckTokenOptions = {
	serviceId?: string;
	tenantId?: string;
};

const CACHE_CONTROL = "no-store, no-cache, max-age=0, must-revalidate, private";
const PRAGMA = "no-cache";

/** Route table — matched by HTTP method plus the request's last path segment. */
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
 * - `resolveAuthPath(request)` resolves the Auth Server URL for the request's
 *   session from the access token's `aurl` claim (matched against the
 *   configured allowlist, falling back to the primary cluster). Exposed for
 *   app code that calls the Auth server directly, bypassing the router's
 *   `/checkToken` and `/refreshToken` endpoints. Framework adapters re-surface
 *   it on their own return values.
 * - `checkToken(request, opts?)` is the programmatic sibling of the
 *   `POST /checkToken` route: it reads the access token from the request,
 *   introspects it against the cluster named by its `aurl` claim, and returns
 *   the parsed `CheckTokenResponse` payload. Unlike the route, it returns the
 *   parsed payload (not a `Response`) and signals failure by throwing
 *   `RequestError`: a missing request token → `statusCode` 401, an upstream
 *   4xx → the upstream status, upstream 5xx / network failure → 502. Framework
 *   adapters re-surface it on their own return values.
 */
export type AuthHandler = {
	handle: (request: Request) => Promise<Response>;
	resolveAuthPath: (request: AnyRequest) => Promise<string>;
	checkToken: (
		request: AnyRequest,
		opts?: CheckTokenOptions,
	) => Promise<CheckTokenResponse>;
};

/**
 * Builds the auth router — the ONLY factory in the package.
 *
 * Call this ONCE per application. The multiauth allowlist (each cluster's
 * origin and precomputed Basic header) is built here from `config` and
 * captured in a single `deps` record shared by the route table and the pure
 * OAuth/routing functions.
 */
export function createAuth(config: AuthConfig): AuthHandler {
	const deps: AuthDeps = {
		config,
		allowlist: buildAllowlist(config),
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
		checkToken: (request, opts) =>
			checkAccessToken({
				allowlist: deps.allowlist,
				request,
				serviceId: opts?.serviceId,
				tenantId: opts?.tenantId,
			}),
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
