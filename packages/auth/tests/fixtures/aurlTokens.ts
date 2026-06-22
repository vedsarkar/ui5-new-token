/**
 * Pre-generated Reltio JWT fixtures for `aurl` routing tests.
 *
 * Synthetic payloads — no real user data. Shared by every test that
 * exercises the dynamic OAuth routing path so the same byte-for-byte
 * token is used across `decodeAccessToken`, `resolveAuthPath`, and the
 * Express / Next adapter integration tests.
 *
 * Regenerate (Node 22.15+):
 *
 *   import { zstdCompressSync } from "node:zlib";
 *
 *   function mint(json) {
 *     const body = zstdCompressSync(Buffer.from(json));
 *     const prefix = Buffer.alloc(4);
 *     prefix.writeUInt32BE(Buffer.byteLength(json), 0); // ← BIG-endian
 *     return `s.${Buffer.concat([prefix, body]).toString("base64url")}.fakesig`;
 *   }
 *
 *   mint('{"aurl":"https://auth-idev-02.reltio.com","sub":"test-user","t":"test-tenant"}');
 *   mint('{"sub":"test-user","t":"test-tenant"}');
 *
 * Byte order matters — see the file header in `src/core/decodeAccessToken.ts`
 * for why the prefix is big-endian. Generating it any other way passes
 * the legacy "skip the prefix" path but silently breaks the
 * bounded-decompress path.
 */

/** Reltio JWT whose decoded payload contains `aurl: "https://auth-idev-02.reltio.com"`. */
export const TOKEN_WITH_AURL =
	"s.AAAATii1L_0gTjUCAGJEDxWgVwdmfRmLb1JmF_tQ9bn5G437H4SJ31LL38UvdfGaN7Kw6uLCDcats3wmAPBIYqH6pnOQGr8yMnubjAQBAD7EhAI.fakesig";

/**
 * The `aurl` value encoded inside {@link TOKEN_WITH_AURL}. Invariant: this
 * string MUST match the `aurl` claim that `decodeAccessToken` extracts from the
 * token above. Keeping them paired in one module is what makes that
 * invariant enforceable — adapters that need both the token and the
 * cluster origin import both from here.
 */
export const TOKEN_WITH_AURL_ORIGIN = "https://auth-idev-02.reltio.com";

/** Reltio JWT whose decoded payload has no `aurl` claim (legacy / main-cluster token). */
export const TOKEN_WITHOUT_AURL =
	"s.AAAAJSi1L_0gJSkBAHsic3ViIjoidGVzdC11c2VyIiwidCI6InRlc3QtdGVuYW50In0.fakesig";

/**
 * Hand-crafted bomb-defence fixture — the 4-byte big-endian prefix declares
 * 200 000 (> the 128 KiB `MAX_DECOMPRESSED_SIZE` ceiling), so
 * `decodeAccessToken` must reject it at the declared-size gate (Guard 1)
 * before any memory is allocated. Regenerate with the recipe at the top of
 * this file and a `writeUInt32BE` value comfortably above the current cap.
 */
export const TOKEN_OVERSIZED_PREFIX =
	"s.AAMNQCi1L_0gIAEBAHsiYXVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20veCJ9.fakesig";

/**
 * Hand-crafted bomb-defence fixture — the 4-byte big-endian prefix declares
 * 42 (well under the ceiling, passes Guard 1), but the actual zstd stream
 * decompresses to ~500 B and would write past the 42-byte output buffer.
 * `fzstd.decompress` throws `ZstdError`, caught by the outer try/catch
 * and turned into `null` (Guard 3 — bounded output buffer).
 */
export const TOKEN_LYING_PREFIX =
	"s.AAAAKii1L_1g_wBFAQAEAnsiYXVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20veSJ9AQByq8AJ.fakesig";
