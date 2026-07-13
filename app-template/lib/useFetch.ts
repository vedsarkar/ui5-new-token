"use client";

import type { TUseFetch } from "@reltio/design/hooks";
import { useFetch as useDesignFetch } from "@reltio/design/hooks";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Prepend the base path to app-local URLs so callers pass plain paths like
// `/auth/checkToken` or `/api/entities`. Absolute URLs (external APIs) and
// protocol-relative URLs pass through untouched.
const withBasePath = (url: string): string => {
	if (/^https?:\/\//i.test(url) || url.startsWith("//")) return url;
	return url.startsWith("/") ? `${BASE_PATH}${url}` : url;
};

// Send the browser to the login flow with the current URL as an explicit
// `returnTo`. Only the browser knows the real public URL — behind a platform
// path rewrite the server sees a rewritten path and the Referer can be altered
// upstream — so `returnTo` must come from `location.href` here.
const redirectToLogin = (): void => {
	const returnTo = encodeURIComponent(window.location.href);
	window.location.replace(`${BASE_PATH}/auth/login?returnTo=${returnTo}`);
};

// Coalesce concurrent refreshes: when several requests fail with 401 at once
// they share a single `POST /auth/refreshToken`. The refresh token rotates on
// use, so parallel refreshes would race. Only the status is read (never the
// body), so sharing the Response across callers is safe.
let refreshInFlight: Promise<Response> | null = null;
const refreshSession = (): Promise<Response> => {
	if (!refreshInFlight) {
		refreshInFlight = fetch(`${BASE_PATH}/auth/refreshToken`, {
			method: "POST",
		}).finally(() => {
			refreshInFlight = null;
		});
	}
	return refreshInFlight;
};

/**
 * `fetch()` with the Reltio session lifecycle baked in. On a `401` it tries a
 * silent token refresh (`POST /auth/refreshToken`) and retries the request
 * once; only if the refresh is itself rejected with `401` — the session is
 * truly over — does it redirect to login. A non-401 refresh failure (e.g. `502`)
 * is thrown so the caller can surface it. When redirecting, the returned promise
 * never settles so callers don't act on a page that is navigating away.
 *
 * Private on purpose: every request made through `useFetch` goes through here,
 * so there is no way to reach the Reltio APIs bypassing refresh/login.
 */
async function authFetch(input: string, init?: RequestInit): Promise<Response> {
	let response = await fetch(input, init);

	if (response.status === 401) {
		const refresh = await refreshSession();
		if (refresh.status === 401) {
			redirectToLogin();
			return new Promise<Response>(() => {});
		}
		if (!refresh.ok) throw new Error(`HTTP ${refresh.status}`);
		response = await fetch(input, init);
	}

	if (response.status === 401) {
		redirectToLogin();
		return new Promise<Response>(() => {});
	}

	return response;
}

/**
 * App wrapper over `@reltio/design`'s `useFetch`. Reads JSON once on mount,
 * deduplicated by `url`, and routes **every** request through the Reltio session
 * lifecycle (`401 → silent refresh → retry → login`).
 *
 * App-local URLs are given the base path automatically — pass plain paths like
 * `/auth/checkToken` (absolute URLs to external APIs are left as-is). Pass a
 * `RequestInit` for the method, body, headers, etc.
 */
export function useFetch<R, E = unknown>(
	url: string,
	init?: RequestInit,
): TUseFetch<R, E> {
	return useDesignFetch<R, E>(url, async (resolvedUrl) => {
		const response = await authFetch(withBasePath(resolvedUrl), init);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.json() as Promise<R>;
	});
}
