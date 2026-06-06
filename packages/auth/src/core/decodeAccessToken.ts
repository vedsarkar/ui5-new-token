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
 * Decompression-bomb defence runs in four cheap layers, each closing a
 * different attack vector:
 *
 *   1. Encoded-segment cap (`segments[1].length > MAX_ENCODED_PAYLOAD_SIZE`)
 *      — runs BEFORE `base64urlDecode` so a multi-megabyte middle segment
 *      can't amplify into a proportional Uint8Array allocation at decode
 *      time. The first true allocation site.
 *   2. Declared-size gate (prefix > `MAX_DECOMPRESSED_SIZE`) — rejects
 *      honest oversized payloads before any decompression allocation.
 *   3. Compressed-input cap (`compressed.length > MAX_COMPRESSED_SIZE`)
 *      — closes the CPU-exhaustion vector where an attacker pairs a tiny
 *      lying prefix with a huge compressed stream so `fzstd` keeps
 *      parsing blocks until the bounded output fills.
 *   4. Bounded output buffer (`new Uint8Array(declaredSize)`) — `fzstd`
 *      throws `ZstdError` if the actual stream would write past
 *      `out.length`, regardless of what the prefix said. The try/catch
 *      returns `null` on that throw.
 *
 * Both memory and CPU are bounded at `MAX_DECOMPRESSED_SIZE` (plus its
 * base64 expansion) regardless of what the attacker declares.
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
 * Hard ceiling for the decompressed JSON claims payload. Browser cookies are
 * capped at ~4 KB, and a typical Reltio JWT compresses to ~200–400 B and
 * decompresses to ~500–1500 B of JSON. 8 KB is generous for legitimate
 * tokens and rejects oversized inputs before any memory is allocated.
 */
const MAX_DECOMPRESSED_SIZE = 8_192;

/**
 * Hard ceiling for the compressed input stream. Aliased to the
 * decompressed ceiling — legitimate Reltio JWTs compress to a few hundred
 * bytes, so any honest compressed input is also well under 8 KB. Capping
 * here closes the CPU-exhaustion vector where an attacker pairs a tiny
 * lying `declaredSize` with a multi-KB compressed stream, which would
 * otherwise keep `fzstd` busy parsing blocks until the bounded output
 * buffer filled. Defined as a separate name so the two ceilings can be
 * tuned independently if the compression ratio ever shifts.
 */
const MAX_COMPRESSED_SIZE = 8_192;

/**
 * Hard ceiling for the encoded payload segment, derived from the
 * decompressed-size ceiling above. Base64url expands binary 3 → 4, so an
 * 8 KiB-compressed payload + 4-byte length prefix encodes to at most
 * `ceil((8192 + 4) * 4 / 3)` ≈ 10 928 chars. Checked BEFORE `base64urlDecode`
 * so a multi-megabyte middle segment can't force a large `Uint8Array`
 * allocation at the first decode step (memory-amplification DoS vector).
 */
const MAX_ENCODED_PAYLOAD_SIZE = Math.ceil(
	((MAX_DECOMPRESSED_SIZE + 4) * 4) / 3,
);

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
