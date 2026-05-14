/**
 * CSRF state token utilities.
 *
 * The OAuth Authorization Code flow uses a `state` parameter to prevent CSRF
 * attacks against the callback URL. We generate a random UUID at login time,
 * store it in an `HttpOnly` cookie, and require the cookie to match the
 * `state` query parameter when the callback fires.
 *
 * `crypto.randomUUID()` is a global Web Crypto API method available since
 * Node 19 and in every modern browser/runtime. No `node:crypto` import.
 */

/**
 * Generates a fresh state token. Uses Web Crypto's `randomUUID()` so the
 * implementation works in Node, the browser, Edge runtime, and Workers.
 */
export function generateState(): string {
	return globalThis.crypto.randomUUID();
}

/**
 * Validates the `state` query parameter against the `state` cookie.
 *
 * Returns `true` only when both values are non-null, non-empty, and equal.
 * Comparison is character-by-character (not constant-time) because:
 * - The state value is short-lived (a single in-flight login).
 * - The cookie is `HttpOnly` so the value is not exposed to JavaScript.
 * - The OAuth state mechanism is CSRF protection, not a secret comparison.
 *
 * If a future threat model demands constant-time comparison, swap this for
 * a Web Crypto-based equality check.
 */
export function validateState(
	cookieState: string | null | undefined,
	queryState: string | null | undefined,
): boolean {
	if (!cookieState || !queryState) {
		return false;
	}
	return cookieState === queryState;
}
