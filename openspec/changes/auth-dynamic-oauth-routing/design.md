## Context

`@reltio/auth` v1 ships a BFF router whose upstream Auth Server is a single static URL — `config.oauthPath`. Every `/checkToken` and `/refreshToken` call goes to that one URL. The Reltio IDP team is splitting the Auth Server into per-environment clusters (`auth.reltio.com`, `auth-idev-02.reltio.com`, `auth-test.reltio.com`, …) so that token lifecycle and tenant data can move independently per environment. A token issued by one cluster can only be introspected or refreshed by that same cluster — calling a different cluster's `/checkToken` returns 401 even when the token is otherwise valid.

The issuing cluster identity is carried inside the access token. Reltio access tokens are structured as `s.<base64url-encoded zstd-compressed JSON>.<signature>`. The decoded payload contains an `aurl` claim:

```json
{ "u": "user@acme.com", "t": "acme", "aurl": "https://auth-idev-02.reltio.com", ... }
```

The platform's contract with consumer applications is that they install `@reltio/auth` and never learn about Auth Server topology. The naive implementation — "decode `aurl` per request and use it as the upstream URL" — collapses two security boundaries: (1) the BFF would happily send the `clientSecret`-bearing `Authorization: Basic` header to any URL the access token cookie claims, including attacker-controlled hosts when the attacker has tampered with the cookie via DevTools (cookies are `HttpOnly` against reads, not writes); and (2) the BFF would feed every request through the same decompression code path, multiplying decompression-bomb surface area.

A previous iteration mitigated (1) with an `allowedAuthOrigins: string[]` field on `AuthConfig` — an SSRF allowlist on the routing URL. That iteration was rejected during review. The cost analysis: 20+ consumer applications, each needing a coordinated change every time IDP adds a cluster — `O(apps × clusters)` operator work owned by the UI Center of Excellence, with the application teams as a synchronisation bottleneck. The whole point of dynamic routing is to remove cluster topology from consumer configuration. Reintroducing it as an SSRF allowlist defeats the goal.

This design fixes both problems by separating **routing capture** from **routing use**:

- **Capture** happens once per session at `GET /callback` (and any `POST /refreshToken` that returns a new `aurl`). The handler reads `aurl` from the access token it just received from the trusted Login Page, seals it with an HMAC into an `HttpOnly` cookie, and writes it back to the browser.
- **Use** happens on every `POST /checkToken` and `POST /refreshToken`. The handler reads the cookie, runs constant-time HMAC verify against the key it derived at factory time, and uses the verified URL — or falls back fail-closed to `config.oauthPath`.

The forged-JWT routing vector dies entirely because `decodeAurl` no longer runs on the request hot path. An attacker tampering with the `access_token` cookie to inject a malicious `aurl` no longer affects routing — the routing comes from the separate signed cookie they cannot forge without the HMAC key (which is derived from `clientSecret`, never exposed to the browser).

Constraints:

- **Single source of truth contract preserved.** Routing lives in the framework-agnostic core (`src/core/handlers/*.ts`) and the adjacent private modules (`src/core/decodeAurl.ts`, `src/core/signAurl.ts`, `src/core/base64url.ts`); Express and Next.js adapters dispatch to it through the same `expressToWebRequest` / `applyWebResponseToExpressRes` pipeline. No adapter-specific routing logic. These primitives live in `src/core/`, which has no public subpath in the `package.json` `exports` map — so they are private and unreachable by consumers (privacy by location, not by index omission — see the package `AGENTS.md`).
- **No public `AuthConfig` change.** Zero new consumer-facing configuration. `clientSecret` is the only secret the package requires; the design reuses it.
- **No new MCP or external dependencies beyond `fzstd`.** Web Crypto for HMAC and SHA-256; `globalThis.fetch` for upstream calls; no `node:crypto`, no `node-forge`, no `jose`. zstd decompression uses `fzstd@^0.1.1` — the same version already pinned on the existing `DESIGN-75` reference branch's `packages/auth/package.json`, vetted by the CoE there, ported into this change without re-evaluation.
- **No public surface for `decodeAurl` or `signAurl`.** Both are internal to `src/utils/` (NOT re-exported from `src/utils/index.ts`). The only public routing API is `resolveAuthPath` — exposed on the value returned by `createExpressAuth(config)` / `createNextAuth(config)` (a method on the returned `Router` for Express, a field next to `handlers` for Next.js). It is the **same** resolver the router uses internally, so the HMAC key is derived once (in `createAuth`) and shared. Exposing it on the adapter return — rather than as a standalone factory in `@reltio/auth/utils` — keeps `createAuth` the single factory that owns all once-derived state, and the additive member keeps the release a non-breaking minor (existing mount lines are unchanged).
- **Fail-closed routing, fail-open compatibility.** Every routing decision falls back to `config.oauthPath` on any cookie miss, parse failure, or HMAC mismatch. Apps that do not run against multi-cluster Auth Servers see byte-for-byte identical behaviour.
- **No log output.** The `no console logging` requirement applies — cookie parse failures, HMAC verification failures, and decompression-bomb trips SHALL NOT print anything; they SHALL silently fall back to `config.oauthPath`.

Stakeholders:

- **Reltio IDP team** — owns Auth Server cluster topology, the `aurl` claim in access tokens, and the `/checkToken` / `/token` semantics per cluster. Primary upstream dependency.
- **Reltio UI Center of Excellence (CoE)** — owns `@reltio/auth`, this design, and the migration story. Responsible for shipping the change without consumer-facing breakage.
- **20+ consumer application teams** — every `@reltio/auth` consumer benefits transparently for traffic that flows through the BFF endpoints. Every consumer application that today calls an Auth Server API directly (bypassing the BFF) with a hardcoded `oauthPath` MUST migrate every such call site from `${oauthPath}/checkToken` to `${await auth.resolveAuthPath(req)}/checkToken`, where `auth` is the value already returned by `createExpressAuth(config)` / `createNextAuth(config)` to mount the router. So that direct calls route to the same cluster the BFF would have routed to. This is a fleet-wide migration: there is no opt-out for direct call sites in a multi-cluster deployment, because a hardcoded `oauthPath` will return 401 for any user whose token was issued by a non-default cluster. The adapter mount lines (`app.use("/auth", createExpressAuth(config))` for Express, `export const { GET, POST } = createNextAuth(config).handlers` for Next.js) are unchanged — `resolveAuthPath` is an additive member on the same return value, this is a minor bump.
- **Reltio security review** — single audit surface (the four new requirements + the six modified handler requirements) instead of N per-application surfaces.

## Goals / Non-Goals

**Goals:**

1. Route every `/checkToken` and `/refreshToken` call to the cluster that issued the user's current access token, with zero new consumer configuration.
2. Make routing cookie tampering and forged-JWT routing impossible from the browser side.
3. Keep `decodeAurl` off the per-request hot path of `/checkToken` (so decompression surface area is limited to one zstd decompress per login and one per refresh — never one per API call).
4. Provide a public resolver API that applications calling Auth Server APIs directly can use to learn the same routing URL the BFF would use. The API SHALL be `resolveAuthPath`, exposed on the value returned by `createExpressAuth(config)` / `createNextAuth(config)` — the same resolver the router uses internally, sharing the once-derived HMAC key. It SHALL accept Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly through the `AnyRequest` adapter type. The HMAC key SHALL be derived exactly once (in `createAuth`) and SHALL NOT be re-derived per request or per resolver call.
5. Fail closed to `config.oauthPath` on every routing edge case so single-cluster deployments and pre-aurl tokens keep working byte-for-byte unchanged.

**Non-goals:**

1. **Token signature verification.** `decodeAurl` reads the `aurl` claim only. Signature verification is the Auth Server's responsibility and SHALL NOT be added to `@reltio/auth`. The HMAC seals the routing decision, not the token itself.
2. **Per-cluster `clientSecret` rotation.** The design assumes one `clientSecret` per application across all clusters (the existing operator model). Future per-cluster credentials would be a separate change.
3. **External verification of the `reltio_aurl` cookie.** The cookie is meant to be consumed by the same BFF instance (or sibling instances sharing `clientSecret`) that minted it. Service-to-service verification by a third party is out of scope.
4. **Independent HMAC-key rotation.** Rotating the HMAC key requires rotating `clientSecret` today. A dedicated `aurlSigningSecret` config field is a deliberate non-goal of v1; see the "Future-proofing" decision below for the backward-compatible upgrade path.
5. **Streaming or chunked upstream responses.** The proxy semantics of `/checkToken` and `/refreshToken` remain JSON-only and buffered, as they are today.
6. **Replay protection beyond cookie attributes.** The cookie has no nonce or expiry independent of the browser's session — a replayed valid `reltio_aurl` cookie returns the same routing decision. This is acceptable because `aurl` is routing metadata, not an authorisation primitive, and routing to a stale cluster fails closed with a 401 from upstream which the BFF maps to 401 and the SPA bounces to `/login`.

## Decisions

### Cookie name and format

**Decision:** Name `reltio_aurl`, value `base64url(aurl) + "." + base64url(mac)`, full 32-byte HMAC-SHA-256 tag.

**Rationale:**

- **Name** matches the `aurl` claim name with a `reltio_` prefix consistent with future Reltio-owned cookie additions; uses an underscore (RFC 6265 `cookie-name` token character set, not a reserved character).
- **Format** keeps the cookie a single ASCII string suitable for header transport. Base64url is the canonical URL/cookie-safe encoding; no padding, no `+`/`/` characters that would conflict with `;` or `,` cookie separators.
- **Tag length** is the full 32-byte HMAC-SHA-256 output. The roughly 21-character cookie-size saving from truncating to 16 bytes (`HMAC-SHA-256/128`) was not worth the cost of hand-rolling a constant-time comparison: with a 32-byte tag we can verify directly with `crypto.subtle.verify` (constant-time by Web Crypto spec) and delete ~15 lines of hand-rolled `constantTimeEqual` code. Cookie size with a 32-byte tag is ~90 bytes for a typical 40-byte `aurl` — well under every browser limit and trivially compressible by HTTP/2 HPACK and HTTP/3 QPACK headers.

**Alternatives rejected:**

- JSON-encoded cookie (`{"aurl": "...", "mac": "..."}`) — three times the bytes, requires JSON parse on the hot path, no security gain.
- Separate `reltio_aurl` and `reltio_aurl_sig` cookies — doubles cookie count, browsers may send them out of order or drop one independently, introduces inconsistency states the verifier has to handle.
- Truncated MAC (`HMAC-SHA-256/128`, 16 bytes per NIST SP 800-107 §5.3.4) — saves ~21 cookie bytes but forces a hand-rolled `constantTimeEqual` instead of `crypto.subtle.verify`. The cookie-size win is dwarfed by HPACK/QPACK header compression and is irrelevant against browser limits; the cost is more crypto code to own. Forgery resistance at 2^128 would still be infeasible at this value, but the trade-off favours simpler code over cookie-byte micro-optimisation.
- Stripping the `.` separator (concatenated `b64url(aurl) + b64url(mac)`) — variable-length `aurl` makes splitting ambiguous; the dot is unambiguous and base64url itself never contains it.

### HMAC key derivation

**Decision:** Derive a 32-byte key from `SHA-256("reltio-auth-routing-v1:" + clientSecret)` and import it as an HMAC-SHA-256 `CryptoKey`. The derivation lives behind a single exported function `deriveHmacKey(clientSecret): Promise<CryptoKey>` in `src/core/signAurl.ts` (private), and is invoked **exactly once** — in `createAuth(config)`, the single factory. The resulting `Promise<CryptoKey>` is stored in the `AuthDeps` record (field `keyPromise`) that `createAuth` builds once and threads into every handler and OAuth/routing function via the flat `options` object. Both the mint side (`signAurl(aurl, await options.keyPromise)` inside `callbackHandler` / `refreshTokenHandler`) and the verify side (`resolveAuthPath`, which reads `options.keyPromise`) consume that one key — there is no second derivation. The key is reached only through `await options.keyPromise` inside the functions that sign or verify; it is never placed on a public surface.

**Rationale:**

- **Reusing `clientSecret` is operator-safe.** Every `@reltio/auth` deployment already provides it as a high-entropy secret. Adding a new operator step (`HMAC_SECRET=...`) creates the exact coordination cost we are removing — secret generation, secret-store rotation, environment-variable propagation, post-deploy verification, per-app PRs.
- **The domain-separation label (`"reltio-auth-routing-v1:"`) makes reuse cryptographically safe.** Using `clientSecret` directly as the HMAC key would let any attacker who learned the routing key (full HMAC-SHA-256 key recovery is computationally infeasible at 2^256) also know `clientSecret`. The hash-then-use pattern derives an independent key; the label ensures that even if multiple components hash `clientSecret`, the resulting keys are pairwise distinct. The `v1` suffix is the version handle for future rotation without breaking existing cookies (a `v2` key would coexist with the `v1` reader during transition).
- **Factory-time derivation amortises the cost.** SHA-256 + `crypto.subtle.importKey` together are <1 ms on commodity hardware; doing them once per `createAuth(config)` call removes them from the per-request hot path entirely. Per-request the only cost is the HMAC-SHA-256 over the (~40-byte) `aurl` — ~10 µs. Deriving the key once (rather than once per mint factory and once per verify factory, as an earlier iteration did) also halves the boot-time derivation work and removes any possibility of the two sides drifting onto different keys.

**Alternatives rejected:**

- **Use `clientSecret` directly as the key.** Cryptographically sound (HMAC is robust against weak keys), but no domain separation makes future component additions (e.g. signing a different cookie) brittle. Costs nothing to add the SHA-256 wrapper.
- **Dedicated `HMAC_SECRET` env var.** Operator burden, defeats the goal of zero-config routing. Acceptable when there is a concrete need (external verification, independent rotation, compliance). Section "Future-proofing" below documents the backward-compatible migration path.
- **HKDF-Expand instead of plain SHA-256.** HKDF (RFC 5869) is the standard "derive multiple keys from one secret" construction. Overkill here: we derive exactly one key. SHA-256 with a fixed label achieves the same domain separation in one step. If we ever need to derive a second key for a separate purpose, switching to HKDF (with the same `clientSecret` as input keying material) is a non-breaking implementation detail.

### Fail-open compatibility, fail-closed routing

**Decision:** Routing is fail-closed (cookie miss / parse failure / verify failure → `config.oauthPath`). Apps without multi-cluster Auth Servers see no behavioural change.

**Rationale:**

- The IDP rollout is staged. Many consumer environments will continue running against single-cluster Auth Servers for months. They never see an `aurl` claim, they never get a `reltio_aurl` cookie minted, and every routing decision falls back to `config.oauthPath` — which is what they had before.
- When an attacker actively tampers with the cookie, fail-closed routing redirects them to the configured `oauthPath` (the same place they would have been routed anyway in the static-routing era). The attempt fails silently — no log entry, no error message that could leak the existence of the routing mechanism.
- The same logic applies when `decodeAurl` returns `null` (opaque UUID, JWT without `aurl`, decompression-bomb guard trips). No cookie is minted → routing falls back to `config.oauthPath` → identical to pre-aurl behaviour.

### `decodeAurl` is NOT called on `/checkToken`

**Decision:** `decodeAurl` runs at exactly two places: `GET /callback` (once per login) and `POST /refreshToken` (once per refresh, on the **new** token). `POST /checkToken` and the routing read paths SHALL NOT call `decodeAurl`.

**Rationale:**

- **Security.** If `/checkToken` decoded `aurl` from the incoming access token, an attacker with cookie write access (any XSS the consumer app fails to prevent, plus the documented DevTools-edit vector for `HttpOnly` cookies) could redirect every introspection call to `https://attacker.example.com/checkToken` carrying `Authorization: Basic <clientSecret>`. The signed cookie closes this vector by sourcing routing exclusively from the HMAC-protected channel.
- **Performance.** zstd decompression and JSON parse on every API call is measurable cost; doing it once per login/refresh is amortised cost. The hot path stays single-digit microseconds (one HMAC verify).
- **Decompression-bomb surface.** The three 8-KiB-anchored guards hold per call. Holding them across one call per session is operationally cheap; holding them across thousands of calls per session is needless attack surface.

### Public resolver API — `resolveAuthPath` on the adapter return value

**Decision:** Expose the per-session Auth Server cluster URL resolver as `resolveAuthPath`, a member of the value returned by `createExpressAuth(config)` / `createNextAuth(config)`. It is the **same** function the router uses internally; the adapters re-surface it. The Express adapter attaches it to the returned `Router` (`Router & { resolveAuthPath }`); the Next.js adapter returns it as a field next to `handlers`. Do NOT export a standalone `createOauthPathResolver` factory from `@reltio/auth/utils`, and do NOT export `createAuth` itself.

`resolveAuthPath`:

- Has signature `(request: AnyRequest) => Promise<string>`, accepting Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly through the existing `AnyRequest` adapter type.
- Is implemented as a pure function `resolveAuthPath(options: AuthDeps & { request })`; the adapter member is a thin closure `(request) => resolveAuthPath({ ...deps, request })` over the `AuthDeps` record `createAuth` built once.
- Reuses the router's once-derived `keyPromise` — no second `deriveHmacKey`, no per-call key derivation.

**Rationale (in priority order):**

- **One factory owns all once-derived state.** `createAuth` is the single place that derives the HMAC key and computes the Basic header. Exposing the resolver from that same factory's return means the read path provably shares the router's key — there is no separate factory that could be constructed with a mismatched `clientSecret` or that re-derives the key. An earlier iteration used a separate public `createOauthPathResolver(config)` factory plus an internal `createAurlSigner(config)` factory; that derived the HMAC key **twice** at boot and created two factories to keep in sync.
- **No correctness burden pushed onto consumers.** A standalone pure resolver would have to be paired with an exported `deriveHmacKey` and a documented "derive once, cache the deps, reuse" contract; a consumer who built the deps per request would silently lose the performance the design exists for. Surfacing the bound resolver on the adapter return removes that footgun — the consumer calls `auth.resolveAuthPath(req)` and the once-derivation is guaranteed by construction. It also keeps the HMAC key and `deriveHmacKey` entirely internal.
- **Available where consumers already are.** Apps making direct Auth Server calls already mount the router (`createExpressAuth` / `createNextAuth`), so the resolver is one member access away on a value they already hold — no extra import, no second config object.
- **No breaking change.** `resolveAuthPath` is an additive member: a method on the returned `Router` for Express (still a `Router`, so `app.use(path, auth)` is unchanged) and a field next to `handlers` for Next.js. The release stays a non-breaking minor.
- **`AnyRequest` over raw `Cookie` header keeps the input surface consistent with sibling helpers.** The resolver does the Express/Next/Web runtime detection internally via the existing `readHeader(request, "cookie")` helper, the same way `getAccessToken` / `getRefreshToken` do.

**Writer/reader contract.** The cookie pipeline has two sides: the BFF *writes* the `reltio_aurl` cookie inside `callbackHandler` and `refreshTokenHandler` (`decodeAurl` → `signAurl(aurl, key)` → `Set-Cookie`); `resolveAuthPath` *reads* it (`Cookie` header → `parseCookies` → `verifyAurl` → return `${verifiedOrigin}/oauth`). Drift in the key-derivation formula is structurally impossible — the key is derived once in `createAuth` and the same `keyPromise` feeds both sides. What is *not* automatically prevented is drift in the rest of the pipeline: cookie envelope (`base64url(aurl) + "." + base64url(mac)`), cookie name (`reltio_aurl`), cookie attributes, `signAurl` / `verifyAurl` argument shapes, or base64url encoding. A contract integration test (a single `it(...)` block in `packages/auth/tests/express/callback.test.ts`, task §4.5) drives `GET /callback` end-to-end, captures the minted cookie, and asserts that a separately-constructed `createExpressAuth({ ...DEFAULT_CONFIG, oauthPath: "https://fallback.example.com" }).resolveAuthPath` reads it back to `https://auth-idev-02.reltio.com/oauth` (proving the cookie, not the fallback origin, drives resolution) — covering every one of those regression vectors in one assertion. Only Express is exercised (the contract is between adapter-agnostic internal modules already covered by per-runtime unit tests of `resolveAuthPath` and the cookie helpers).

**Alternatives rejected:**

- **Standalone `createOauthPathResolver(config)` factory exported from `@reltio/auth/utils`** (the previous design). Drawbacks: derives the HMAC key a second time at boot; creates a separate factory whose `clientSecret` must be kept in sync with the router's; and as a public *pure* alternative would force exporting `deriveHmacKey` and a "build deps once" contract onto consumers. The adapter-member approach shares the router's exact `keyPromise` and removes all of that.
- **A standalone factory *and* an adapter member (two-surface API).** Doubles the public surface and forces consumers to choose between equivalent options for no behavioural difference.
- **Export `createAuth` so a resolver-only service can call `createAuth(config).resolveAuthPath`.** Deferred (YAGNI): every current direct-call consumer also mounts the router, so the adapter member suffices. Exporting `createAuth` later is a non-breaking additive change if a router-less consumer ever appears.

### Single factory, flat options, pure functions

**Decision:** `createAuth` is the only factory in the package. It builds one flat `AuthDeps` record at construction (`config`, `authHeader`, `keyPromise`) and threads it into every collaborator. Everything else is a plain function that takes a single flat `options` object (the options-object pattern): `exchangeCode`, `refreshAccessToken`, `checkAccessToken` (one export per file, replacing the former `createOAuthClient` factory object), `resolveAuthPath`, `safeFetch`, and the five handlers. The HMAC key never crosses a boundary as a bound closure — collaborators reach it via `await options.keyPromise`.

**Rationale:**

- **Fewer moving parts.** The earlier design had four factories (`createAuth`, `createOAuthClient`, `createAurlSigner`, `createOauthPathResolver`) and a strategy injected through a second factory. Collapsing to one factory + pure functions makes the call graph obvious from the file listing (`exchangeCode.ts`, `refreshAccessToken.ts`, `checkAccessToken.ts`, `resolveAuthPath.ts`, `safeFetch.ts`) and removes the duplicate key derivation.
- **Handlers stay decode-agnostic.** `checkTokenHandler` forwards `checkAccessToken({ ...options, accessToken, ... })`; the cookie read + HMAC verify live entirely inside `resolveAuthPath`, which `checkAccessToken` calls. No cookie/HMAC/decode import enters the handler — the forged-JWT routing vector stays structurally impossible to reintroduce.
- **Flat options, explicit dependencies.** Each function declares its needs as `AuthDeps & { …params }`; the former nested `params` object on `checkToken` is flattened to `serviceId?` / `tenantId?`. Call sites read as `fn({ ...options, code })` — no positional arguments, no nested `deps` wrapper. `refreshAccessToken` / `checkAccessToken` options are supersets of `ResolveAuthPathOptions`, so they forward `options` to `resolveAuthPath` directly.

**Alternatives rejected:**

- **Multiple factories returning objects (`createOAuthClient`, `createAurlSigner`, `createOauthPathResolver`).** Each was a closure over the same `clientSecret`/key, so they duplicated derivation and added surface to keep in sync. A single `createAuth` closure holds all once-derived state.
- **Positional arguments or a nested `deps` argument (`fn(deps, code)`).** The options-object pattern keeps every call self-documenting and lets a function ignore fields it does not use without changing arity.
- **`HandlerContext.signAurl` / `aurlKey` bound onto the context.** Replaced by `options.keyPromise` + the pure `signAurl(aurl, key)` primitive; one fewer bound function to construct and pass.

### Cookie minting happens last in `/callback`

**Decision:** The `Set-Cookie: reltio_aurl` header is appended at the very end of `callbackHandler`, after the existing `access_token` and `refresh_token` cookies and after the `ssoRedirect` callback (if any). Any throw from `decodeAurl` or `signAurl` SHALL NOT result in a partial `Set-Cookie` write that leaves the browser with stale tokens but no routing cookie.

**Rationale:**

- `decodeAurl` is designed never to throw (returns `null` on every error path), but defensive ordering protects against a bug in the decompression library propagating an exception out.
- `signAurl` can theoretically throw if Web Crypto is misconfigured at runtime; deferring the cookie append until after `signAurl` resolves means a throw causes the handler to return without writing any cookies at all, preserving the invariant that the three (or four) cookies are written atomically.

### Future-proofing — migration path to a dedicated `HMAC_SECRET`

**Decision:** v1 does NOT add a config field for an independent HMAC secret. The path to one is documented as a backward-compatible three-step migration that future maintainers can apply when (and only when) a concrete need arises (external verifiers, independent rotation cadence, compliance gate). The migration is non-breaking thanks to the `"-v1"` suffix on the current label.

**Steps when the need arises:**

1. Add optional `aurlSigningSecret?: string` to `AuthConfig`. When set, derive `key = SHA-256("reltio-auth-routing-v2:" + aurlSigningSecret)`; when unset, fall back to v1 derivation from `clientSecret`.
2. Bump the label suffix to `v2` for the new code path. The reader tries `v2` first, then `v1` — cookies minted before the upgrade still verify until they're refreshed.
3. Document the rotation procedure in the Storybook guide. After every active session has been refreshed, deployments can rotate the `aurlSigningSecret` independently of `clientSecret`.

**Costs of doing it today:** new operator step in every consumer deployment, new env var to manage, new failure mode (unset `aurlSigningSecret` vs unset `clientSecret`), new test matrix. None of these costs are justified by today's threat model.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Decompression bomb in a forged JWT crashing the BFF | Four independent guards in `decodeAurl`, all anchored to a single `MAX_DECOMPRESSED_SIZE = 8 KiB` ceiling (browser cookies cap ~4 KB, real Reltio JWTs decompress to ~500–1500 bytes — 8 KiB is generous for honest tokens and rejects oversized inputs cheaply). Guard 1: encoded-segment cap — early-exit when `segments[1].length > MAX_ENCODED_PAYLOAD_SIZE` (≈10 928 chars, the base64url expansion of `MAX_DECOMPRESSED_SIZE + 4`). Runs BEFORE `base64urlDecode` so an attacker can't amplify a multi-megabyte segment of valid base64url characters into a proportional `Uint8Array` allocation at decode time (memory-amplification vector). Guard 2: declared-size gate — early-exit when the 4-byte big-endian prefix exceeds 8 KiB, before any decompression allocation. Guard 3: compressed-input cap — early-exit when the compressed bytes after the prefix exceed 8 KiB, closing the CPU-exhaustion vector where a lying small prefix is paired with a large compressed stream. Guard 4: bounded output buffer — `fzstd.decompress(compressed, new Uint8Array(declaredSize))` throws `ZstdError` if the actual stream would write past the buffer, regardless of what the prefix said. The try/catch returns `null` on every guard trip. `decodeAurl` never throws. |
| HMAC key recovery from the cookie | Full 32-byte HMAC-SHA-256 tags resist forgery at 2^256 — computationally infeasible. Even if the key were recovered, the worst case is the attacker can route the user's requests to clusters they choose; the access token itself is unchanged and still validates only against its issuing cluster, so the attack is a self-DoS. |
| `clientSecret` rotation invalidating in-flight `reltio_aurl` cookies | Next `/checkToken` call sees HMAC verify failure → falls back to `config.oauthPath`. SPA either succeeds (single-cluster compatible) or gets 401 and bounces to `/login`. No data loss, brief inconvenience. Documented as acceptable. |
| Cross-app `reltio_aurl` replay | Cookies are scoped per origin (browser default). An attacker with cross-origin cookie injection has bigger problems than routing. Apps that share an origin and share `clientSecret` would share the routing cookie validly — that's the existing operator model. |
| `decodeAurl` interpretation drift if IDP changes the JWT format | `decodeAurl` returns `null` on any parse failure → fail-closed to `config.oauthPath`. The Auth Server team would coordinate a JWT format change as a major Reltio platform event; the routing layer degrades gracefully in the interim. |
| Performance regression from per-call HMAC verify | ~10 µs per call on commodity hardware. At 100k req/s the HMAC verify costs <1% of one CPU core. Network and JSON parsing of the upstream `/checkToken` response dominate the request total. |
| Decoder loading zstd library on first import | One-time cost; `fzstd@^0.1.1` is imported once per BFF process start at the top of `src/core/decodeAurl.ts`. Bundle size impact: ~7 KB minified (fzstd is intentionally a minimal pure-JS zstd decoder, no WASM, no Node-only APIs). Documented in the Storybook page. |
| Contract drift between the BFF (cookie *writer* via `callbackHandler` / `refreshTokenHandler` → `signAurl(aurl, key)`) and `resolveAuthPath` (cookie *reader* via `verifyAurl`) — cookie envelope, cookie name, cookie attributes, `signAurl` / `verifyAurl` argument shapes, or base64url encoding changing on only one side | Key-derivation drift is structurally impossible (the HMAC key is derived once in `createAuth` and the same `keyPromise` feeds both writer and reader). Everything else in the cookie pipeline is covered by an end-to-end contract test (single `it(...)` block in `packages/auth/tests/express/callback.test.ts`, task §4.5) that drives `GET /callback`, captures the minted `reltio_aurl` cookie, and asserts that a separately-constructed `createExpressAuth({ ...DEFAULT_CONFIG, oauthPath: "https://fallback.example.com" }).resolveAuthPath` reads it back to `https://auth-idev-02.reltio.com/oauth`. Express-only (the contract is between adapter-agnostic internal modules already covered by per-runtime unit tests). |

## Open Questions

None blocking. The IDP team has confirmed:

- The `aurl` claim is a full URL (scheme + host, no path) and is always present in cluster-issued tokens.
- Tokens issued by the legacy monolith Auth Server omit `aurl`; this is the trigger for the fail-open fallback to `config.oauthPath`.
- The Login Page is and will remain a single static service (`login.reltio.com`); it owns the cluster routing for the **login** chain. `@reltio/auth` only owns the cluster routing for `/checkToken` and `/refreshToken`.

A follow-up may add per-cluster `clientSecret` if the operator model evolves; that change is independent of this one and is not currently scheduled.
