/**
 * `GET /logout` handler.
 *
 * Clears `access_token`, `refresh_token`, and the in-flight `state` cookies,
 * then redirects (302) the browser to the Reltio Login Page's logout URL.
 * A fresh `state` cookie is issued so the user can immediately re-authenticate.
 *
 * All cookie clears reuse the same option vector used at set time so browsers
 * reliably remove the cookies (some browsers won't clear a Secure cookie
 * unless the clear header also carries Secure).
 */

import {
	ACCESS_TOKEN_COOKIE,
	clearCookie,
	defaultCookieOptions,
	REFRESH_TOKEN_COOKIE,
	STATE_COOKIE,
	serializeCookie,
} from "../../utils/cookies";
import { generateState } from "../../utils/state";
import type { Handler } from "./types";

export const logoutHandler: Handler = async (ctx) => {
	const { request, config } = ctx;
	const secure = config.secure !== false;

	const refererHeader = request.headers.get("referer");
	if (!refererHeader) {
		return new Response("Missing Referer header", { status: 400 });
	}

	let refererUrl: URL;
	try {
		refererUrl = new URL(refererHeader);
	} catch {
		return new Response("Malformed Referer header", { status: 400 });
	}

	if (secure) {
		refererUrl.protocol = "https:";
	}

	const state = generateState();
	const tenant = refererUrl.searchParams.get("tenant");

	const requestUrl = new URL(request.url);
	const authCallbackUrl = new URL(refererUrl.origin);
	authCallbackUrl.pathname = requestUrl.pathname.replace(/logout$/, "callback");
	authCallbackUrl.searchParams.set("redirectUrl", refererUrl.href);
	authCallbackUrl.searchParams.set("state", state);

	const loginUrl = new URL(config.loginPath);
	loginUrl.searchParams.set("client_id", config.clientId);
	loginUrl.searchParams.set("redirect_uri", authCallbackUrl.href);
	if (tenant) {
		loginUrl.searchParams.set("tenant", tenant);
	}
	if (config.notenant) {
		loginUrl.searchParams.set("notenant", "true");
	}

	const logoutUrl = new URL(`${config.loginPath}/logout`);
	logoutUrl.searchParams.set("redirectUrl", loginUrl.href);

	const cookieOptions = defaultCookieOptions(secure);
	const response = new Response(null, {
		status: 302,
		headers: { Location: logoutUrl.href },
	});
	response.headers.append(
		"Set-Cookie",
		clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions),
	);
	response.headers.append(
		"Set-Cookie",
		clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions),
	);
	response.headers.append(
		"Set-Cookie",
		clearCookie(STATE_COOKIE, cookieOptions),
	);
	response.headers.append(
		"Set-Cookie",
		serializeCookie(STATE_COOKIE, state, cookieOptions),
	);
	return response;
};
