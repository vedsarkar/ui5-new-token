"use client";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Same-origin BFF proxy route mounted by `@reltio/auth` (see `lib/auth.ts`).
// The browser never talks to a Reltio API directly — an absolute URL is routed
// through this route, which attaches the session's access token and forwards
// the request. Its target travels in the `reltio-target-url` header.
const PROXY_PATH = "/auth/proxy";

const isAbsoluteUrl = (url: string): boolean => /^https?:\/\//i.test(url);

// Prepend the base path to app-local URLs so callers pass plain paths like
// `/auth/checkToken` or `/auth/proxy`. Absolute URLs (external APIs) and
// protocol-relative URLs pass through untouched.
const withBasePath = (url: string): string => {
	if (isAbsoluteUrl(url) || url.startsWith("//")) return url;
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
// body), so sharing the Response across callers is safe. This matters here:
// `useTenants` fires one request per environment in parallel, so a stale
// session would otherwise trigger a burst of racing refreshes.
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
 * URL routing is baked in too:
 * - an **absolute** URL (`https://…`) is a Reltio API target — it is sent
 *   through the same-origin BFF `/auth/proxy` with the URL in the
 *   `reltio-target-url` header, so the server (not the browser) attaches the
 *   access token and forwards the cross-origin call;
 * - a **relative** URL is an app-local request — it is base-path prefixed and
 *   called directly (e.g. `/auth/checkToken`, `/api/config`).
 *
 * The single source of truth for the session lifecycle: every request through
 * `lib/useFetch` (reads) and every direct Reltio API call goes through here, so
 * there is no way to reach the Reltio APIs bypassing refresh/login.
 */
export async function authFetch(
	url: string,
	init?: RequestInit,
): Promise<Response> {
	const absolute = isAbsoluteUrl(url);
	// Absolute URLs go through the BFF proxy. The target is sent in the
	// `reltio-target-url` header (the proxy reads it from there) AND as a
	// query parameter (ignored by the proxy, but visible in DevTools and
	// matchable by MSW mocks without header inspection).
	const input = absolute
		? withBasePath(`${PROXY_PATH}?reltio-target-url=${url}`)
		: withBasePath(url);
	const requestInit = absolute
		? {
				...init,
				headers: { ...init?.headers, "reltio-target-url": url },
			}
		: init;

	let response = await fetch(input, requestInit);

	if (response.status === 401) {
		const refresh = await refreshSession();
		if (refresh.status === 401) {
			redirectToLogin();
			return new Promise<Response>(() => {});
		}
		if (!refresh.ok) throw new Error(`HTTP ${refresh.status}`);
		response = await fetch(input, requestInit);
	}

	if (response.status === 401) {
		redirectToLogin();
		return new Promise<Response>(() => {});
	}

	return response;
}
