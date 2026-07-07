/**
 * `GET /login` handler.
 *
 * Generates a CSRF state token, stores it in the `state` cookie, and
 * redirects (302) the browser to the Reltio Login Page with `client_id`,
 * `redirect_uri`, and any `tenant`/`notenant` parameter set.
 */

import {
	defaultCookieOptions,
	STATE_COOKIE,
	serializeCookie,
} from "../../utils/cookies";
import {
	resolveRedirectParams,
	upgradeToHttps,
} from "../../utils/resolveRedirectParams";
import { generateState } from "../../utils/state";
import type { Handler } from "./types";

export const loginHandler: Handler = async (options) => {
	const { request, config } = options;
	if (!config.loginPath) {
		return new Response("loginPath is not configured", { status: 500 });
	}
	const secure = config.secure !== false;

	const redirectParams = resolveRedirectParams(request);
	if (!redirectParams.ok) {
		return redirectParams.error;
	}

	const { tenant, returnTo } = redirectParams;

	const returnToUrl = upgradeToHttps(returnTo, secure);

	const state = generateState();
	const requestUrl = new URL(request.url);
	const authCallbackUrl = new URL(returnToUrl.origin);
	authCallbackUrl.pathname = requestUrl.pathname.replace(/login$/, "callback");
	authCallbackUrl.searchParams.set("redirectUrl", returnToUrl.href);
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

	const response = new Response(null, {
		status: 302,
		headers: { Location: loginUrl.href },
	});
	response.headers.append(
		"Set-Cookie",
		serializeCookie(STATE_COOKIE, state, defaultCookieOptions(secure)),
	);
	return response;
};
