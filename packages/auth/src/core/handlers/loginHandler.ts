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
import { generateState } from "../../utils/state";
import type { Handler } from "./types";

export const loginHandler: Handler = async (ctx) => {
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
	authCallbackUrl.pathname = requestUrl.pathname.replace(/login$/, "callback");
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
