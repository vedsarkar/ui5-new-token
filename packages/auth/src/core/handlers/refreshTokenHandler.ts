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
	AUTH_URL_COOKIE,
	clearCookie,
	defaultCookieOptions,
	REFRESH_TOKEN_COOKIE,
	serializeCookie,
} from "../../utils/cookies";
import { isRequestError } from "../../utils/errors";
import { getRefreshToken } from "../../utils/getRefreshToken";
import { signAurl } from "../aurlCookie";
import { decodeAccessToken } from "../decodeAccessToken";
import { refreshAccessToken } from "../refreshAccessToken";
import type { Handler } from "./types";

export const refreshTokenHandler: Handler = async (options) => {
	const { request, config } = options;
	const secure = config.secure !== false;

	const refreshToken = getRefreshToken(request);
	if (!refreshToken) {
		return new Response(null, { status: 401 });
	}

	let tokens: Awaited<ReturnType<typeof refreshAccessToken>>;
	try {
		tokens = await refreshAccessToken({ ...options, refreshToken });
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

	// Re-derive routing from the NEW access token: mint when the
	// refreshed token carries an aurl claim, clear when it does not —
	// the old reltio_aurl may point at a cluster the refreshed token
	// wasn't issued by. Both `decodeAccessToken` and `signAurl` are
	// fail-open: a signing failure degrades to "no aurl", the cookie
	// clears, and the next call falls back to config.oauthPath. Silent
	// per design rule (no log output); `signAurl` cannot reject with
	// valid Web Crypto inputs, so the catch is a structural belt for an
	// unreachable path rather than an observable failure mode.
	const claims = decodeAccessToken(tokens.access_token);
	const aurl = typeof claims?.aurl === "string" ? claims.aurl : null;
	const signedAurl = aurl
		? await signAurl(aurl, await options.keyPromise).catch(() => null)
		: null;
	const oauthUrlSetCookie = signedAurl
		? serializeCookie(AUTH_URL_COOKIE, signedAurl, baseOptions)
		: clearCookie(AUTH_URL_COOKIE, baseOptions);

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
	response.headers.append("Set-Cookie", oauthUrlSetCookie);
	return response;
};
