/**
 * Pure per-request resolver for the upstream Reltio Auth Server URL.
 *
 * Reads the request's access token (`Authorization: Bearer` or the
 * `access_token` cookie), decodes its `aurl` claim, and resolves to the
 * matching cluster from the configured allowlist — or falls back to the
 * primary cluster when no token is present or `aurl` is absent, undecodable,
 * or not in the allowlist.
 *
 * `aurl` can only ever SELECT a pre-configured cluster (matched by origin),
 * never introduce a new outbound origin, so a forged `aurl` in a tampered
 * access token cannot steer requests to an attacker-controlled host — it just
 * misses the allowlist and falls back to the primary cluster.
 *
 * The selected origin is suffixed with the fixed `/oauth` base path (see
 * {@link OAUTH_BASE_PATH}). Kept `async` so the adapter-exposed signature
 * `(request) => Promise<string>` is stable.
 */

import type { AnyRequest } from "../utils/readHeader";
import { selectAuthServiceForRequest } from "./allowlist";
import type { AuthDeps } from "./handlers/types";

/**
 * Fixed Reltio Auth Service base path. A cluster origin (from config or a token
 * `aurl`) is path-less; `/checkToken`, `/token`, `/refreshToken` all live under
 * `/oauth`, so callers build `${origin}${OAUTH_BASE_PATH}` to form the base.
 * Hardcoded — it is a Reltio Auth Service contract, not consumer config.
 */
export const OAUTH_BASE_PATH = "/oauth";

/** Flat options for {@link resolveAuthPath}: the shared deps plus the request. */
export type ResolveAuthPathOptions = AuthDeps & {
	request: AnyRequest;
};

export async function resolveAuthPath(
	options: ResolveAuthPathOptions,
): Promise<string> {
	const { allowlist, request } = options;
	const service = selectAuthServiceForRequest(allowlist, request);
	return `${service.origin}${OAUTH_BASE_PATH}`;
}
