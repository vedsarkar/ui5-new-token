/**
 * `createNextAuth(config)` — Next.js App Router adapter.
 *
 * Returns `{ handlers: { GET, POST } }` where each handler accepts a Web
 * `Request` (Next.js `NextRequest` is a subclass) and returns a Web
 * `Response`. Consumers mount them as a dynamic catch-all route:
 *
 *   // app/auth/[...auth]/route.ts
 *   import { createNextAuth } from "@reltio/auth/next";
 *   export const { GET, POST } = createNextAuth({...}).handlers;
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

export function createNextAuth(config: AuthConfig): {
	handlers: {
		GET: (req: Request) => Promise<Response>;
		POST: (req: Request) => Promise<Response>;
	};
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
	const handle = (request: Request) => auth.handle(request);

	return {
		handlers: {
			GET: handle,
			POST: handle,
		},
		resolveAuthPath: auth.resolveAuthPath,
		checkToken: auth.checkToken,
	};
}
