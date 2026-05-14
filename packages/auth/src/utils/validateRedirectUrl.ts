/**
 * Redirect URL validation for `GET /callback`.
 *
 * The legacy `auth-middleware` only compared hostnames, so
 * `http://app.example.com:8080` would have passed validation for a request
 * received at `https://app.example.com:443`. We compare full origins
 * (scheme + host + port) instead.
 */

/**
 * Returns `true` when `redirectUrl` is a valid absolute URL whose origin
 * matches the origin of `requestUrl`. Both inputs are parsed with `new URL`;
 * malformed inputs return `false`.
 */
export function validateRedirectUrl(
	requestUrl: string,
	redirectUrl: string | null | undefined,
): boolean {
	if (!redirectUrl) {
		return false;
	}
	let target: URL;
	let request: URL;
	try {
		target = new URL(redirectUrl);
		request = new URL(requestUrl);
	} catch {
		return false;
	}
	return target.origin === request.origin;
}
