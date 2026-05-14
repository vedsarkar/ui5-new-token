/**
 * Reads the access token from a request.
 *
 * Source preference is the same as in the legacy `auth-middleware`:
 *   1. `Authorization: Bearer <token>` header (case-insensitive)
 *   2. `access_token` cookie
 *
 * Returns `null` when no token is present in either source. The request
 * argument is NOT mutated.
 *
 * Accepts Express `Request`, Next.js `NextRequest`, or Web `Request`
 * uniformly through the shared `readHeader` helper.
 */

import { ACCESS_TOKEN_COOKIE, parseCookies } from "./cookies";
import { type AnyRequest, readHeader } from "./readHeader";

const BEARER_PREFIX = /^Bearer\s+/i;

export function getAccessToken(request: AnyRequest): string | null {
	const authHeader = readHeader(request, "authorization");
	if (authHeader && BEARER_PREFIX.test(authHeader)) {
		return authHeader.replace(BEARER_PREFIX, "");
	}
	const cookies = parseCookies(readHeader(request, "cookie"));
	// Treat an empty-string cookie value the same as a missing cookie. An
	// `access_token=` cookie has no usable token and downstream code should
	// not have to handle both `null` and `""`.
	return cookies[ACCESS_TOKEN_COOKIE] || null;
}
