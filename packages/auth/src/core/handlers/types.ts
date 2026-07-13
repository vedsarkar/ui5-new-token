/**
 * Shared types for the five core handlers and the internal OAuth/routing
 * functions.
 *
 * The whole core uses the **options object pattern**: every function takes a
 * single flat `options` argument that carries the shared runtime
 * dependencies (`AuthDeps`) plus that function's own parameters. There are
 * no positional arguments and no nested `deps` wrapper — call sites read as
 * `fn({ ...deps, code })`.
 *
 * All `AuthDeps` values are "derive-once": they are computed a single time
 * in `createAuth` and spread into the options of every handler and OAuth
 * call. Nothing in the request path re-derives them.
 */

import type { AuthConfig } from "../../types";
import type { ResolvedAuthService } from "../allowlist";

/**
 * Runtime dependencies derived once in `createAuth`. Spread into the flat
 * `options` object of every handler and internal OAuth/routing function.
 */
export type AuthDeps = {
	/** Static auth configuration provided by the consumer. */
	config: AuthConfig;
	/**
	 * Multiauth allowlist built once from `config` (primary cluster at index 0,
	 * then `authEnvironments`). Each entry carries its cluster origin and the
	 * precomputed `Authorization` Basic header. The primary cluster's header is
	 * used for the authorization-code exchange; `/checkToken` and
	 * `/refreshToken` select the entry named by the token's `aurl` claim.
	 */
	allowlist: ResolvedAuthService[];
};

/** Flat options every core handler receives: the shared deps plus the request. */
export type HandlerOptions = AuthDeps & {
	request: Request;
};

/** Pure handler function. */
export type Handler = (options: HandlerOptions) => Promise<Response>;
