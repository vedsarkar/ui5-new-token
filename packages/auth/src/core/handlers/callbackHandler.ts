/**
 * `GET /callback` handler.
 *
 * Exchanges the OAuth authorization code for access and refresh tokens.
 * Validates the CSRF state before making any upstream call. On success,
 * sets the token cookies and either invokes the consumer's `ssoRedirect`
 * callback or performs a default 302 redirect to `redirectUrl`.
 */

import {
	ACCESS_TOKEN_COOKIE,
	AUTH_URL_COOKIE,
	clearCookie,
	defaultCookieOptions,
	parseCookies,
	REFRESH_TOKEN_COOKIE,
	STATE_COOKIE,
	serializeCookie,
} from "../../utils/cookies";
import { validateState } from "../../utils/state";
import { signAurl } from "../aurlCookie";
import { decodeAccessToken } from "../decodeAccessToken";
import { isRequestError } from "../errors";
import { exchangeCode } from "../exchangeCode";
import type { Handler } from "./types";

export const callbackHandler: Handler = async (options) => {
	const { request, config } = options;
	const secure = config.secure !== false;

	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const queryState = url.searchParams.get("state");
	const redirectUrlParam = url.searchParams.get("redirectUrl");

	const cookies = parseCookies(request.headers.get("cookie"));
	const cookieState = cookies[STATE_COOKIE] ?? null;

	if (!validateState(cookieState, queryState)) {
		return new Response("State mismatch", { status: 401 });
	}

	if (!code) {
		return new Response("Missing authorization code", { status: 400 });
	}

	let tokens: Awaited<ReturnType<typeof exchangeCode>>;
	try {
		tokens = await exchangeCode({ ...options, code });
	} catch (error) {
		if (isRequestError(error)) {
			// Per spec "Upstream error propagation": 5xx and network failures
			// surface as 502 (OAuth server is down); any 4xx from the token
			// endpoint means the authorization code was rejected, which is an
			// authentication failure from the client's perspective → 401.
			const status = error.statusCode >= 500 ? 502 : 401;
			return new Response(null, { status });
		}
		throw error;
	}

	const cookieOptions = defaultCookieOptions(secure);

	// Derive routing from the new access token: mint when it carries
	// an aurl claim, clear when it does not — a stale `reltio_aurl`
	// from a previous session may point at a cluster the new token
	// wasn't issued by. Both `decodeAccessToken` and `signAurl` are
	// fail-open: a failure clears the cookie and the next call falls
	// back to config.oauthPath. The catch on `signAurl` is structural
	// — it cannot reject with valid Web Crypto inputs.
	const claims = decodeAccessToken(tokens.access_token);
	const aurl = typeof claims?.aurl === "string" ? claims.aurl : null;
	const signedAurl = aurl
		? await signAurl(aurl, await options.keyPromise).catch(() => null)
		: null;
	const oauthUrlSetCookie = signedAurl
		? serializeCookie(AUTH_URL_COOKIE, signedAurl, cookieOptions)
		: clearCookie(AUTH_URL_COOKIE, cookieOptions);

	const accessTokenSetCookie = serializeCookie(
		ACCESS_TOKEN_COOKIE,
		tokens.access_token,
		cookieOptions,
	);
	const refreshTokenSetCookie = serializeCookie(
		REFRESH_TOKEN_COOKIE,
		tokens.refresh_token,
		cookieOptions,
	);

	const redirectUrl = redirectUrlParam ?? "/";
	let response: Response;
	if (config.ssoRedirect) {
		const userResponse = await config.ssoRedirect({
			request,
			accessToken: tokens.access_token,
			refreshToken: tokens.refresh_token,
			redirectUrl,
			state: queryState ?? "",
		});
		// Clone the user's response so we can append Set-Cookie headers without
		// mutating headers the user may have committed.
		response = new Response(userResponse.body, userResponse);
	} else {
		response = new Response(null, {
			status: 302,
			headers: { Location: redirectUrl },
		});
	}
	response.headers.append("Set-Cookie", accessTokenSetCookie);
	response.headers.append("Set-Cookie", refreshTokenSetCookie);
	response.headers.append("Set-Cookie", oauthUrlSetCookie);
	return response;
};
