/**
 * `POST /refreshToken` handler.
 *
 * Exchanges the `refresh_token` cookie for a fresh access token by calling
 * the OAuth server's `/token` endpoint with `grant_type=refresh_token`. On
 * success, both `access_token` and `refresh_token` cookies are replaced
 * and the response is 201. On absence of the refresh token cookie or
 * upstream rejection of the token, the response is 401. On upstream server
 * failure (5xx or network), the response is 502.
 */

import {
	ACCESS_TOKEN_COOKIE,
	defaultCookieOptions,
	REFRESH_TOKEN_COOKIE,
	serializeCookie,
} from "../../utils/cookies";
import { getRefreshToken } from "../../utils/getRefreshToken";
import { isRequestError } from "../errors";
import type { Handler } from "./types";

export const refreshTokenHandler: Handler = async ({
	request,
	config,
	oauth,
}) => {
	const secure = config.secure !== false;

	const refreshToken = getRefreshToken(request);
	if (!refreshToken) {
		return new Response(null, { status: 401 });
	}

	let tokens: Awaited<ReturnType<typeof oauth.refreshToken>>;
	try {
		tokens = await oauth.refreshToken(refreshToken);
	} catch (error) {
		if (isRequestError(error)) {
			// Per spec "Upstream error propagation": 5xx and network failures
			// surface as 502; any 4xx from the token endpoint means the refresh
			// token was rejected → 401.
			const status = error.statusCode >= 500 ? 502 : 401;
			return new Response(null, { status });
		}
		throw error;
	}

	const baseOptions = defaultCookieOptions(secure);
	const accessTokenCookie = serializeCookie(
		ACCESS_TOKEN_COOKIE,
		tokens.access_token,
		{
			...baseOptions,
			maxAge:
				typeof tokens.expires_in === "number" ? tokens.expires_in : undefined,
		},
	);
	const refreshTokenCookie = serializeCookie(
		REFRESH_TOKEN_COOKIE,
		tokens.refresh_token,
		baseOptions,
	);

	const response = new Response(null, { status: 201 });
	response.headers.append("Set-Cookie", accessTokenCookie);
	response.headers.append("Set-Cookie", refreshTokenCookie);
	return response;
};
