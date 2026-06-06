/**
 * Exchanges a refresh token for a fresh access token.
 *
 * Calls the per-session Auth Server cluster's `/token` endpoint with a
 * form-encoded `grant_type=refresh_token` body. The cluster URL comes from
 * `resolveAuthPath` (the signed `reltio_aurl` cookie, falling back to the
 * static `oauthPath`). Used only by `refreshTokenHandler`.
 *
 * Takes a single flat `options` object (`AuthDeps` plus the request and the
 * `refreshToken`); it is a superset of `ResolveAuthPathOptions`, so it
 * forwards straight to `resolveAuthPath`.
 */

import type { TokenResponse } from "../types";
import type { AnyRequest } from "../utils/readHeader";
import type { AuthDeps } from "./handlers/types";
import { resolveAuthPath } from "./resolveAuthPath";
import { safeFetch } from "./safeFetch";

/** Flat options for {@link refreshAccessToken}. */
export type RefreshAccessTokenOptions = AuthDeps & {
	request: AnyRequest;
	refreshToken: string;
};

export async function refreshAccessToken(
	options: RefreshAccessTokenOptions,
): Promise<TokenResponse> {
	const { authHeader, refreshToken } = options;
	const authPath = await resolveAuthPath(options);
	const form = new URLSearchParams();
	form.append("grant_type", "refresh_token");
	form.append("refresh_token", refreshToken);
	const response = await safeFetch({
		url: `${authPath}/token`,
		method: "POST",
		headers: { Authorization: authHeader },
		body: form,
	});
	return (await response.json()) as TokenResponse;
}
