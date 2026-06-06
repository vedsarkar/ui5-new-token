/**
 * HMAC signing/verification for the `reltio_aurl` routing cookie.
 *
 * The BFF needs to pin a per-session Auth Server cluster URL into a
 * client cookie so that subsequent `/checkToken` and `/refreshToken`
 * calls route to the same cluster that issued the access token. The
 * cookie is `HttpOnly` and minted server-side, but we still HMAC it so
 * that a compromised browser (XSS) or proxy cannot forge a routing
 * decision and steer requests to an attacker-controlled origin.
 *
 * Wire format (two base64url segments joined by `.`):
 *
 *   base64url(aurl-bytes) "." base64url(mac-32-bytes)
 *
 * - `aurl-bytes`: the UTF-8 encoding of the Auth Server URL.
 * - `mac`: the full HMAC-SHA-256 output (32 bytes / 256 bits).
 *
 * The HMAC key is derived once at startup with `deriveHmacKey` and
 * reused for every sign/verify call — `subtle.importKey` is the
 * expensive step, `subtle.sign` and `subtle.verify` are cheap.
 *
 * All three functions live in the same module because they form one
 * cryptographic protocol: derive a key, sign a value, verify a value.
 * Private to `src/core/` — no public subpath points into `core/`, so this
 * is unreachable by consumers. Consumed only by `createAuth` (key
 * derivation), the handlers (signing), and `resolveAuthPath` (verification).
 */

import { base64urlDecode, base64urlEncode } from "./base64url";

/**
 * `@types/node` exposes Web Crypto types only under the `webcrypto`
 * namespace, not as bare globals. Rather than add `DOM` or `WebWorker`
 * to the package's `tsconfig.lib` — which would pull in dozens of
 * unrelated globals — we infer the type from the runtime API we
 * actually use. Local to this module; no public-API impact.
 */
type CryptoKey = Awaited<ReturnType<typeof globalThis.crypto.subtle.importKey>>;

/**
 * Domain-separation salt prefixed to the client secret before hashing.
 *
 * Tags the derived key as "this package, this purpose, this version" so
 * that the same `clientSecret` byte-for-byte produces a different HMAC
 * key here than in any other place that might also derive keys from it
 * (token introspection, basic-auth headers, etc.). The `:v1` suffix
 * lets us rotate the derivation formula in a future major release
 * without invalidating existing infrastructure that depends on the
 * current shape.
 */
const HMAC_KEY_SALT = "reltio-auth-routing-v1:";

/**
 * Full HMAC-SHA-256 output length in bytes (256 bits). Used as a
 * fast-fail length gate in `verifyAurl` so obviously-wrong MACs are
 * rejected before reaching `subtle.verify`.
 */
const MAC_BYTES = 32;

/**
 * Derives a non-extractable HMAC-SHA-256 key from a Reltio OAuth client
 * secret. The same `clientSecret` always produces the same key bytes
 * (SHA-256 is deterministic), so the BFF and any standalone resolver
 * configured with the same secret will produce/accept the same cookies.
 *
 * Call once at startup and reuse the returned `CryptoKey` — `importKey`
 * is the expensive step in the chain.
 */
export async function deriveHmacKey(clientSecret: string): Promise<CryptoKey> {
	const seed = new TextEncoder().encode(HMAC_KEY_SALT + clientSecret);
	const digest = await globalThis.crypto.subtle.digest("SHA-256", seed);
	return globalThis.crypto.subtle.importKey(
		"raw",
		digest,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);
}

/**
 * Signs an aurl string and returns the wire-format cookie value
 * (`base64url(aurl).base64url(mac32)`).
 */
export async function signAurl(aurl: string, key: CryptoKey): Promise<string> {
	const aurlBytes = new TextEncoder().encode(aurl);
	const macBuffer = await globalThis.crypto.subtle.sign("HMAC", key, aurlBytes);
	return `${base64urlEncode(aurlBytes)}.${base64urlEncode(new Uint8Array(macBuffer))}`;
}

/**
 * Verifies a `reltio_aurl` cookie value and recovers the original aurl
 * string, or returns `null` for any failure (missing, malformed, wrong
 * key, tampered, or non-UTF-8 payload). Never throws.
 *
 * Verification delegates to `crypto.subtle.verify`, which is constant-
 * time by Web Crypto spec — no hand-rolled comparison required. The
 * final UTF-8 decode uses `{ fatal: true }` as defence-in-depth: bytes
 * that pass the HMAC check but are not valid UTF-8 cannot have come
 * from `signAurl` (which always encodes from a string), so we reject
 * them rather than returning a silently-corrupted string with U+FFFD
 * replacements.
 */
export async function verifyAurl(
	cookieValue: string | null | undefined,
	key: CryptoKey,
): Promise<string | null> {
	if (!cookieValue) return null;

	const segments = cookieValue.split(".");
	if (segments.length !== 2) return null;

	const aurlBytes = base64urlDecode(segments[0]);
	const receivedMac = base64urlDecode(segments[1]);
	if (aurlBytes === null || receivedMac === null) return null;
	if (receivedMac.length !== MAC_BYTES) return null;

	const ok = await globalThis.crypto.subtle.verify(
		"HMAC",
		key,
		receivedMac,
		aurlBytes,
	);
	if (!ok) return null;

	try {
		return new TextDecoder("utf-8", { fatal: true }).decode(aurlBytes);
	} catch {
		return null;
	}
}
