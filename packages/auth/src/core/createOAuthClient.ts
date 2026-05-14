/**
 * OAuth client for the Reltio OAuth server.
 *
 * This module implements only the three operations the BFF router actually
 * needs: authorization-code exchange, refresh, and token introspection. The
 * password grant (`login`) and client credentials grant (`clientCredLogin`)
 * from the legacy `node-oauth-provider` are intentionally not implemented;
 * see the design document (decision #2) for the rationale.
 *
 * Errors are surfaced as `RequestError` with a normalised `statusCode`:
 * upstream 4xx propagate the upstream status, upstream 5xx and network
 * failures normalise to `502`. This lets fronts distinguish "your session
 * expired" (401) from "the auth server is down" (502).
 */

import type { CheckTokenResponse, TokenResponse } from "../types";
import { getBasicToken } from "../utils/getBasicToken";
import { RequestError } from "./errors";

type OAuthClientConfig = {
	oauthPath: string;
	loginPath: string;
	clientId: string;
	clientSecret: string;
};

/**
 * Builds the OAuth client. Returned methods are bound to the configured
 * credentials and endpoint URLs.
 *
 * Note: `exchangeCode` uses `loginPath` (the Login Page service) because
 * the Reltio Login Page exposes its own `/token` endpoint for authorization
 * code redemption, which accepts a JSON body. `refreshToken` and `checkToken`
 * use `oauthPath` (the OAuth service), which accepts form-encoded bodies.
 * The split mirrors the legacy `auth-middleware` wire contract.
 */
export function createOAuthClient(config: OAuthClientConfig) {
	const authHeader = `Basic ${getBasicToken(config.clientId, config.clientSecret)}`;

	return {
		exchangeCode: async (code: string): Promise<TokenResponse> => {
			const response = await safeFetch(`${config.loginPath}/token`, {
				method: "POST",
				headers: {
					Authorization: authHeader,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ grant_type: "authorization_code", code }),
			});
			return (await response.json()) as TokenResponse;
		},

		refreshToken: async (refreshToken: string): Promise<TokenResponse> => {
			const form = new URLSearchParams();
			form.append("grant_type", "refresh_token");
			form.append("refresh_token", refreshToken);
			const response = await safeFetch(`${config.oauthPath}/token`, {
				method: "POST",
				headers: { Authorization: authHeader },
				body: form,
			});
			return (await response.json()) as TokenResponse;
		},

		checkToken: async (
			accessToken: string,
			params?: { serviceId?: string; tenantId?: string },
		): Promise<CheckTokenResponse> => {
			const url = new URL(`${config.oauthPath}/checkToken`);
			if (params?.serviceId) {
				url.searchParams.set("serviceId", params.serviceId);
			}
			if (params?.tenantId) {
				url.searchParams.set("tenantId", params.tenantId);
			}
			const form = new URLSearchParams();
			form.append("token", accessToken);
			const response = await safeFetch(url.href, {
				method: "POST",
				headers: { Authorization: authHeader },
				body: form,
			});
			return (await response.json()) as CheckTokenResponse;
		},
	};
}

/**
 * Wraps `globalThis.fetch` with the error-mapping policy described in the
 * module header. Returns the raw `Response` on 2xx, throws `RequestError`
 * for everything else. Never returns a non-ok response.
 *
 * This is the one shared helper — every method above calls it. The
 * three previously-separate `postTokenJson` / `postTokenForm` /
 * `postCheckToken` wrappers were inlined into the methods themselves,
 * since each was called from a single place.
 */
async function safeFetch(url: string, init: RequestInit): Promise<Response> {
	let response: Response;
	try {
		response = await globalThis.fetch(url, init);
	} catch (cause) {
		throw new RequestError("OAuth server unreachable", {
			statusCode: 502,
			cause,
		});
	}
	if (response.ok) {
		return response;
	}
	const statusCode = response.status >= 500 ? 502 : response.status;
	throw new RequestError(response.statusText || `Upstream ${response.status}`, {
		response,
		statusCode,
	});
}
