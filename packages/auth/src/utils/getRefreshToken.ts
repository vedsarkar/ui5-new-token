/**
 * Reads the refresh token from a request's `refresh_token` cookie.
 *
 * Returns `null` when the cookie is absent. The request argument is NOT
 * mutated.
 *
 * Accepts Express `Request`, Next.js `NextRequest`, or Web `Request`
 * uniformly through the shared `readHeader` helper.
 */

import { parseCookies, REFRESH_TOKEN_COOKIE } from "./cookies";
import { type AnyRequest, readHeader } from "./readHeader";

export function getRefreshToken(request: AnyRequest): string | null {
	const cookies = parseCookies(readHeader(request, "cookie"));
	// Empty-string cookie value treated as missing — same convention as
	// `getAccessToken`.
	return cookies[REFRESH_TOKEN_COOKIE] || null;
}
