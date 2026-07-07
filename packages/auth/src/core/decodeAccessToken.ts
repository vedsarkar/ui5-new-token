/**
 * Decodes a Reltio JWT access token into its claims object.
 *
 * Reltio access tokens use a non-standard format:
 *   s.<base64url-payload>.<base64url-signature>
 *
 * The payload bytes are prefixed with a 4-byte big-endian uint32 length
 * value (the decompressed JSON length), followed by the zstd-compressed
 * JSON claims object. This function strips the prefix, decompresses, and
 * returns the parsed claims object. Callers read individual claims (today
 * only `aurl`, the routing hint) off the returned object.
 *
 * Read-only — no signature verification is performed. The claims are used
 * purely as a routing hint by the BFF; the Auth server remains
 * responsible for signature verification.
 *
 * Decompression-bomb defence runs in four layers, documented inline at each
 * gate. Together they bound memory at `MAX_DECOMPRESSED_SIZE` and CPU at
 * `MAX_COMPRESSED_SIZE` per decode, regardless of what the token declares.
 *
 * Returns `null` when the token is not a Reltio JWT (e.g. an opaque UUID),
 * decodes to a non-object payload, or encounters any error during decoding.
 * A successfully decoded token with no `aurl` claim (legacy single-cluster
 * tokens) still returns a claims object — the missing claim is the caller's
 * concern. Never throws.
 */

import { decompress } from "fzstd";
import { base64urlDecode } from "./base64url";

/**
 * Decoded Reltio JWT claims. The on-wire shape is owned by the Auth server,
 * so it is modelled as an open record; today the BFF reads only the optional
 * `aurl` routing hint, validating its type at the call site.
 */
export type AccessTokenClaims = Record<string, unknown>;

/**
 * Hard ceiling for the decompressed JSON claims payload. Permission-rich
 * Reltio tokens (multi-tenant admins, federated accounts) embed a
 * flattened resource × privilege × tenant map that decompresses to
 * 20–30 KB of JSON — observed at 24 KB in production. 128 KiB is generous
 * (~5× that worst case) and still a tight per-decode memory bound. Cookie
 * limits are irrelevant here: the on-wire form is the *compressed* token
 * (~1–2 KB), this ceiling only bounds the transient decompressed buffer.
 */
const MAX_DECOMPRESSED_SIZE = 131_072;

/**
 * Hard ceiling for the compressed input stream. Closes the CPU-exhaustion
 * vector where an attacker pairs a tiny lying `declaredSize` with a
 * multi-KB stream that would keep `fzstd` parsing blocks until the
 * bounded output buffer filled. Sized off the worst-case compression
 * ratio (~15–20× under zstd for repetitive JSON), with headroom for
 * pathological inputs. Tuned independently of `MAX_DECOMPRESSED_SIZE`.
 */
const MAX_COMPRESSED_SIZE = 16_384;

/**
 * Hard ceiling for the encoded payload segment. Derived from
 * `MAX_COMPRESSED_SIZE` (the on-wire form is base64url over the
 * compressed bytes, not the decompressed ones), checked BEFORE
 * `base64urlDecode` so a multi-megabyte segment can't amplify into a
 * proportional `Uint8Array` allocation (memory-amplification DoS vector).
 */
const MAX_ENCODED_PAYLOAD_SIZE = Math.ceil(((MAX_COMPRESSED_SIZE + 4) * 4) / 3);

export function decodeAccessToken(token: string): AccessTokenClaims | null {
	try {
		// Reltio JWTs start with "s." and have exactly three segments
		const segments = token.split(".");
		if (segments.length !== 3 || segments[0] !== "s") return null;

		// Pre-decode size gate: the actual first allocation site is
		// `base64urlDecode` below, so the segment length has to be bounded
		// HERE, before that call, or an attacker can amplify a string of
		// arbitrary bytes into a proportional Uint8Array allocation.
		if (segments[1].length > MAX_ENCODED_PAYLOAD_SIZE) return null;

		const payloadBytes = base64urlDecode(segments[1]);
		// Malformed base64url, or shorter than the 4-byte length prefix
		if (payloadBytes === null || payloadBytes.length < 4) return null;

		// Read the declared decompressed-size prefix. Early-exit when the
		// attacker claims a payload bigger than our ceiling, before any
		// memory is allocated for decompression.
		const declaredSize = new DataView(
			payloadBytes.buffer,
			payloadBytes.byteOffset,
			4,
		).getUint32(0, /* littleEndian */ false);
		if (declaredSize === 0 || declaredSize > MAX_DECOMPRESSED_SIZE) return null;

		// `subarray` returns a view, not a copy — minor perf vs `slice`
		const compressed = payloadBytes.subarray(4);

		// Cap the compressed input itself. The bounded `decompressBuffer`
		// below stops memory bombs (tiny in → huge out), but a large
		// compressed stream with a lying small `declaredSize` would still
		// keep `fzstd` busy parsing blocks until the output filled — that's
		// a CPU-exhaustion vector this front gate closes cheaply.
		if (compressed.length > MAX_COMPRESSED_SIZE) return null;

		// Bounded output buffer is the memory defence: `declaredSize` is
		// attacker-controlled, but `fzstd.decompress` throws `ZstdError` if
		// the actual stream would write past the buffer length, regardless
		// of what the prefix said. The throw is caught below and returns null.
		const decompressBuffer = new Uint8Array(declaredSize);
		const decompressed = decompress(compressed, decompressBuffer);

		// Raw bytes → UTF-8 string → JWT claims object. Reject any
		// non-object shape (literal `JSON.parse("null")`, numbers,
		// strings, arrays) so the contract is "claims record or null".
		const claimsJson = new TextDecoder().decode(decompressed);
		const claims: unknown = JSON.parse(claimsJson);
		return typeof claims === "object" &&
			claims !== null &&
			!Array.isArray(claims)
			? (claims as AccessTokenClaims)
			: null;
	} catch {
		// Malformed token, invalid base64, decompression failure (including
		// ZstdError when the stream exceeds the bounded output buffer), or
		// JSON parse error — fall back silently, caller uses config.oauthPath.
		return null;
	}
}
