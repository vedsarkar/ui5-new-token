/**
 * Redeems an OAuth authorization code for tokens.
 *
 * Calls the Login Page's `/token` endpoint (NOT the OAuth cluster) because
 * the Reltio Login Page exposes its own `/token` for authorization-code
 * redemption, which accepts a JSON body. Used only by `callbackHandler`.
 *
 * Takes a single flat `options` object (`AuthDeps` plus the `code`).
 */

import type { TokenResponse } from "../types";
import type { AuthDeps } from "./handlers/types";
import { safeFetch } from "./safeFetch";

/** Flat options for {@link exchangeCode}: the shared deps plus the auth code. */
export type ExchangeCodeOptions = AuthDeps & {
	code: string;
};

export async function exchangeCode(
	options: ExchangeCodeOptions,
): Promise<TokenResponse> {
	const { config, authHeader, code } = options;
	const response = await safeFetch({
		url: `${config.loginPath}/token`,
		method: "POST",
		headers: {
			Authorization: authHeader,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ grant_type: "authorization_code", code }),
	});
	return (await response.json()) as TokenResponse;
}
