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
	defaultCookieOptions,
	parseCookies,
	REFRESH_TOKEN_COOKIE,
	STATE_COOKIE,
	serializeCookie,
} from "../../utils/cookies";
import { validateState } from "../../utils/state";
import { isRequestError } from "../errors";
import type { Handler } from "./types";

export const callbackHandler: Handler = async ({ request, config, oauth }) => {
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

	let tokens: Awaited<ReturnType<typeof oauth.exchangeCode>>;
	try {
		tokens = await oauth.exchangeCode(code);
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
	return response;
};
