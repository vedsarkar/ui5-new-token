/**
 * `createNextAuth(config)` — Next.js App Router adapter.
 *
 * Returns `{ handlers: { GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS } }`
 * where each handler accepts a Web `Request` (Next.js `NextRequest` is a
 * subclass) and returns a Web `Response`. Consumers mount them as a
 * dynamic catch-all route:
 *
 *   // app/auth/[...auth]/route.ts
 *   import { createNextAuth } from "@reltio/auth/next";
 *   export const { GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS } =
 *     createNextAuth({...}).handlers;
 *
 * The wide export surface is required for `/proxy` to accept any HTTP
 * method. The five auth endpoints stay `GET`/`POST`-only — the core
 * router enforces method+suffix matching, so e.g. `PUT /login` is 404.
 *
 * The `[...auth]` catch-all parameter name is arbitrary — `createNextAuth`
 * never reads Next.js's `params` object. The router dispatches by the last
 * URL segment of `request.url`, so `[...slug]`, `[...path]`, or any other
 * name works identically. The mount folder before the catch-all is also
 * free (`app/auth/`, `app/api/auth/`, etc.).
 *
 * Pages Router is intentionally not supported in v1; Pages Router
 * applications integrate through `@reltio/auth/express` on a custom Express
 * server.
 */

import { type CheckTokenOptions, createAuth } from "../core/createAuth";
import type { AuthConfig, CheckTokenResponse } from "../types";
import type { AnyRequest } from "../utils/readHeader";

type NextRouteHandler = (req: Request) => Promise<Response>;

const METHODS = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"HEAD",
	"OPTIONS",
] as const;
type Method = (typeof METHODS)[number];

export function createNextAuth(config: AuthConfig): {
	handlers: Record<Method, NextRouteHandler>;
	/**
	 * Resolves the Auth Server URL for the request's session from the access
	 * token's `aurl` claim (matched against the allowlist, falling back to the
	 * primary cluster). Use in route handlers that call the Auth server
	 * directly, bypassing the BFF's `/checkToken` and `/refreshToken` endpoints.
	 */
	resolveAuthPath: (req: AnyRequest) => Promise<string>;
	/**
	 * Introspects the request's access token server-side and returns the
	 * parsed `CheckTokenResponse` payload — the programmatic sibling of the
	 * `POST /checkToken` route. Use in Route Handlers or Middleware to gate
	 * routes by role/permission. Throws `RequestError` on failure (missing
	 * token → 401, upstream 4xx → upstream status, upstream 5xx / network →
	 * 502).
	 */
	checkToken: (
		req: AnyRequest,
		opts?: CheckTokenOptions,
	) => Promise<CheckTokenResponse>;
} {
	const auth = createAuth(config);
	const handle: NextRouteHandler = (request) => auth.handle(request);

	return {
		handlers: Object.fromEntries(METHODS.map((m) => [m, handle])) as Record<
			Method,
			NextRouteHandler
		>,
		resolveAuthPath: auth.resolveAuthPath,
		checkToken: auth.checkToken,
	};
}
