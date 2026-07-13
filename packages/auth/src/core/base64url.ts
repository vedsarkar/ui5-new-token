/**
 * Base64url decoder (RFC 4648 §5).
 *
 * Internal helper used by `decodeAccessToken` to decode the Reltio JWT
 * envelope. Private to `src/core/` — unreachable by consumers (no public
 * subpath).
 *
 * base64url differs from standard base64 in three ways:
 *   - `+` is replaced with `-`
 *   - `/` is replaced with `_`
 *   - trailing `=` padding is omitted
 *
 * Strict by design: `base64urlDecode` rejects any input that contains
 * characters outside the base64url alphabet (`A-Z`, `a-z`, `0-9`, `-`,
 * `_`). Standard base64 inputs (with `+`, `/`, or `=`) return `null`
 * rather than being silently coerced — this protects callers that
 * branch on the JWT format from accepting forged variants.
 */

/**
 * Decodes a base64url string to bytes, or returns `null` when the input
 * is not strict base64url or has an invalid length. Never throws.
 *
 * Two-stage validation:
 *   1. Alphabet gate rejects `+`, `/`, `=`, whitespace, and any other
 *      non-base64url character before any decoding work happens.
 *   2. `atob` is the second line of defence for length errors after we
 *      re-add `=` padding (a single trailing `a` cannot be padded into
 *      a valid 4-char block, for example).
 */
export function base64urlDecode(value: string): Uint8Array | null {
	if (!/^[A-Za-z0-9_-]*$/.test(value)) return null;

	try {
		const standard = value.replace(/-/g, "+").replace(/_/g, "/");
		const padded = standard.padEnd(Math.ceil(standard.length / 4) * 4, "=");
		return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
	} catch {
		return null;
	}
}
