import { bypass, http } from "msw";

const TARGET_RE = /^https?:\/\/[^/]+\.reltio\.com\//i;
const BODYLESS_METHODS = new Set(["GET", "HEAD"]);

/**
 * Global MSW handler that transparently rewrites every outgoing request to
 * `*.reltio.com` into a same-origin call to `/api/proxy`, moving the original
 * URL into the `x-target-url` header. Caller code can keep using the real
 * Reltio URL (so curl previews stay accurate) while the actual network hop is
 * served by the BFF in `api/proxy.ts` (production, Vercel Edge) or by the
 * local Vite middleware in `.storybook/main.ts` (development).
 *
 * `bypass()` is used on the proxied fetch so MSW does not re-intercept it.
 */
export const reltioProxyHandler = http.all(TARGET_RE, async ({ request }) => {
	const headers = new Headers(request.headers);
	headers.set("x-target-url", request.url);

	const proxied = new Request("/api/proxy", {
		method: request.method,
		headers,
		body: BODYLESS_METHODS.has(request.method) ? null : request.body,
		duplex: "half",
		redirect: "manual",
	} as RequestInit);

	return fetch(bypass(proxied));
});
