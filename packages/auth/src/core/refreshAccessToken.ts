/**
 * Exchanges a refresh token for a fresh access token.
 *
 * Calls the issuing cluster's `/token` endpoint with a form-encoded
 * `grant_type=refresh_token` body. The cluster is selected from the request's
 * (soon-to-be-replaced) access token `aurl` claim against the allowlist,
 * falling back to the primary cluster — the refresh must go to the cluster
 * that issued the session, using that cluster's own credentials. Used only by
 * `refreshTokenHandler`.
 *
 * Takes a single flat `options` object (`AuthDeps` plus the request and the
 * `refreshToken`).
 */

import type { TokenResponse } from "../types";
import type { AnyRequest } from "../utils/readHeader";
import { selectAuthServiceForRequest } from "./allowlist";
import type { AuthDeps } from "./handlers/types";
import { OAUTH_BASE_PATH } from "./resolveAuthPath";
import { safeFetch } from "./safeFetch";

/** Flat options for {@link refreshAccessToken}. */
export type RefreshAccessTokenOptions = AuthDeps & {
	request: AnyRequest;
	refreshToken: string;
};

export async function refreshAccessToken(
	options: RefreshAccessTokenOptions,
): Promise<TokenResponse> {
	const { allowlist, request, refreshToken } = options;
	const service = selectAuthServiceForRequest(allowlist, request);
	const form = new URLSearchParams();
	form.append("grant_type", "refresh_token");
	form.append("refresh_token", refreshToken);
	const response = await safeFetch({
		url: `${service.origin}${OAUTH_BASE_PATH}/token`,
		method: "POST",
		headers: { Authorization: service.authHeader },
		body: form,
	});
	return (await response.json()) as TokenResponse;
}
