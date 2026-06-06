/**
 * Pure per-request resolver for the upstream Reltio Auth Server URL.
 *
 * Reads the HMAC-signed `reltio_aurl` cookie minted at login, verifies it,
 * and resolves to the per-session Auth Server cluster URL — or falls back
 * to the statically configured `oauthPath` when no valid cookie is present.
 *
 * Both the per-session `aurl` claim and the static `oauthPath` are reduced
 * to their origin, then the fixed `/oauth` base path is appended. `/oauth`
 * is a Reltio Auth Service contract — the cluster origin carried by the
 * `aurl` claim is path-less, and `/checkToken`, `/token`, etc. always live
 * under `/oauth` — so it is hardcoded here rather than derived from config.
 *
 * Fail-closed: any cookie failure (missing, malformed, wrong HMAC,
 * non-UTF-8) falls back to the static `oauthPath` silently. The caller never
 * sees an error, and an attacker cannot steer requests by tampering with the
 * cookie.
 *
 * Takes a single flat `options` object (`AuthDeps` plus the request). No
 * setup state of its own — the once-derived HMAC key arrives in `options`,
 * built once in `createAuth`.
 */

import { AUTH_URL_COOKIE, parseCookies } from "../utils/cookies";
import { type AnyRequest, readHeader } from "../utils/readHeader";
import { verifyAurl } from "./aurlCookie";
import type { AuthDeps } from "./handlers/types";

/**
 * Fixed Reltio Auth Service base path. The `aurl` claim is a path-less
 * cluster origin and `oauthPath` may or may not include this segment, so the
 * resolver normalizes both to `origin + OAUTH_BASE_PATH`.
 */
const OAUTH_BASE_PATH = "/oauth";

/** Flat options for {@link resolveAuthPath}: the shared deps plus the request. */
export type ResolveAuthPathOptions = AuthDeps & {
	request: AnyRequest;
};

export async function resolveAuthPath(
	options: ResolveAuthPathOptions,
): Promise<string> {
	const { keyPromise, config, request } = options;
	const key = await keyPromise;
	const cookies = parseCookies(readHeader(request, "cookie"));
	const aurl = await verifyAurl(cookies[AUTH_URL_COOKIE], key);
	const { origin } = new URL(aurl ?? config.oauthPath);
	return `${origin}${OAUTH_BASE_PATH}`;
}
