/**
 * Multiauth allowlist construction and `aurl`-based cluster selection for the
 * auth router (`createAuth`) — shared by every routing/introspection path
 * (`resolveAuthPath`, `refreshAccessToken`, `checkToken`).
 *
 * Selection is the security boundary: an attacker-controlled `aurl` can only
 * ever SELECT a pre-configured cluster, never introduce a new outbound origin.
 */

import type { AuthConfig, AuthEnvironment } from "../types";
import { getAccessToken } from "../utils/getAccessToken";
import { getBasicToken } from "../utils/getBasicToken";
import type { AnyRequest } from "../utils/readHeader";
import { decodeAccessToken } from "./decodeAccessToken";

/** The `AuthConfig` subset the allowlist is built from: the primary environment plus `authEnvironments`. */
export type AllowlistConfig = AuthEnvironment &
	Pick<AuthConfig, "authEnvironments">;

/**
 * A trusted cluster reduced to what callers need: its normalized origin (the
 * matching key and outbound target) and the precomputed `Authorization` Basic
 * header for introspecting/refreshing the token against it.
 */
export type ResolvedAuthService = {
	origin: string;
	authHeader: string;
};

/** Reduces a URL to its origin, or `null` when it cannot be parsed. */
function toOrigin(url: string): string | null {
	try {
		return new URL(url).origin;
	} catch {
		return null;
	}
}

/**
 * Builds the ordered allowlist from config. Index 0 is the primary cluster;
 * `authEnvironments` follow, skipping duplicate origins (the earlier entry
 * wins). Throws (fail-fast) if any `oauthPath` — the primary one or an
 * `authEnvironments` entry — is not a parseable URL.
 */
export function buildAllowlist(config: AllowlistConfig): ResolvedAuthService[] {
	const primaryOrigin = toOrigin(config.oauthPath);
	if (primaryOrigin === null) {
		throw new TypeError(
			`Invalid oauthPath: ${JSON.stringify(config.oauthPath)}`,
		);
	}
	const allowlist: ResolvedAuthService[] = [
		{
			origin: primaryOrigin,
			authHeader: `Basic ${getBasicToken(config.clientId, config.clientSecret)}`,
		},
	];
	for (const env of config.authEnvironments ?? []) {
		const origin = toOrigin(env.oauthPath);
		if (origin === null) {
			throw new TypeError(
				`Invalid authEnvironments oauthPath: ${JSON.stringify(env.oauthPath)}`,
			);
		}
		if (allowlist.some((entry) => entry.origin === origin)) continue;
		allowlist.push({
			origin,
			authHeader: `Basic ${getBasicToken(env.clientId, env.clientSecret)}`,
		});
	}
	return allowlist;
}

/**
 * Selects the cluster to introspect against from the token's `aurl` claim,
 * falling back to the primary (index 0) when `aurl` is absent, undecodable, or
 * not in the allowlist. Never throws.
 */
export function selectAuthService(
	allowlist: ResolvedAuthService[],
	token: string,
): ResolvedAuthService {
	const claims = decodeAccessToken(token);
	const aurl = typeof claims?.aurl === "string" ? claims.aurl : null;
	const aurlOrigin = aurl === null ? null : toOrigin(aurl);
	if (aurlOrigin !== null) {
		const match = allowlist.find((entry) => entry.origin === aurlOrigin);
		if (match) return match;
	}
	return allowlist[0];
}

/**
 * Selects the cluster for a request from its access token's `aurl` claim (read
 * from the `Authorization: Bearer` header or the `access_token` cookie),
 * falling back to the primary cluster when no token is present. Used by the BFF
 * routing read path (`resolveAuthPath`, `refreshAccessToken`). Never throws.
 */
export function selectAuthServiceForRequest(
	allowlist: ResolvedAuthService[],
	request: AnyRequest,
): ResolvedAuthService {
	const token = getAccessToken(request);
	return token === null ? allowlist[0] : selectAuthService(allowlist, token);
}
