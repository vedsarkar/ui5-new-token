## ADDED Requirements

### Requirement: reltio_aurl cookie

The router SHALL mint, verify, and clear a cookie named `reltio_aurl` that carries the HMAC-signed URL of the Auth Server cluster that issued the user's current access token. The cookie SHALL be the single source of truth for per-session routing of `POST /checkToken` and `POST /refreshToken` upstream calls.

The cookie value SHALL be the ASCII string `base64url(aurl) + "." + base64url(mac)`, where:

- `aurl` is the verbatim string of the `aurl` claim extracted from the access token's JWT payload (a full URL — scheme + host + optional port, no path, no query, no fragment).
- `mac` is the full 32-byte HMAC-SHA-256 of the UTF-8-encoded `aurl` string, computed with the HMAC key derived per the `HMAC key derivation` requirement.
- `base64url` is the URL-safe, padding-free Base64 alphabet (RFC 4648 §5).
- The `.` separator is a literal U+002E period; it SHALL never appear inside either base64url segment.

The cookie SHALL be set with the option vector `HttpOnly`, `SameSite=Lax`, `Path=/`, plus `Secure` when `AuthConfig.secure` is `true` (the default). The option vector SHALL be byte-identical to the `access_token` and `refresh_token` cookies set by `GET /callback`. Cookie clearing SHALL use the same option vector with `Max-Age=0` and an empty value, exactly as the other cookies set by the router.

The cookie SHALL be minted only by `GET /callback` (on initial login or silent SSO) and `POST /refreshToken` (after a successful token refresh whose new access token contains an `aurl` claim). The cookie SHALL be cleared by `GET /logout` and by `POST /refreshToken` (when the new access token after a successful refresh does NOT contain an `aurl` claim). No other handler SHALL emit a `Set-Cookie: reltio_aurl` header.

The cookie name SHALL be exported from the package's internal cookies module as `AUTH_URL_COOKIE` for use by handlers. The constant SHALL NOT be re-exported from any public subpath — consumers do not interact with the cookie directly; they go through the `resolveAuthPath` member exposed on the value returned by `createExpressAuth(config)` / `createNextAuth(config)`.

#### Scenario: Cookie value round-trips through sign and verify

- **WHEN** an arbitrary `aurl` string (e.g. `"https://auth-idev-02.reltio.com"`) is passed to the internal `signAurl(aurl, key)` function and the resulting cookie value is passed to `verifyAurl(value, key)` with the same key
- **THEN** `verifyAurl` returns the original `aurl` string byte-for-byte

#### Scenario: Cookie carries the same option vector as access_token

- **WHEN** `GET /callback` mints `reltio_aurl` alongside `access_token` and `refresh_token`
- **THEN** the three `Set-Cookie` headers carry identical `HttpOnly`, `Secure`, `SameSite`, and `Path` attributes; the only attribute that differs is the cookie name and value

#### Scenario: Cookie absent when access token has no aurl claim

- **WHEN** `GET /callback` exchanges a code for tokens and the resulting access token is an opaque UUID, OR is a JWT whose payload contains no `aurl` claim, OR is a JWT whose `aurl` claim is the empty string
- **THEN** no `Set-Cookie: reltio_aurl` header is emitted in the response

#### Scenario: Cookie not exported as a public constant

- **WHEN** a consumer attempts `import { AUTH_URL_COOKIE } from "@reltio/auth/utils"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined`

### Requirement: HMAC key derivation

The router SHALL derive a 32-byte HMAC-SHA-256 key from `AuthConfig.clientSecret` **exactly once** per `createAuth(config)` invocation. `createAuth` (the single factory) calls `deriveHmacKey(config.clientSecret)` once and stores the resulting `Promise<CryptoKey>` in the `AuthDeps` record (field `keyPromise`) it threads into every handler and OAuth/routing function via the flat `options` object. Both the mint side (`signAurl(aurl, await options.keyPromise)`) and the verify side (`resolveAuthPath`, which reads `options.keyPromise`) consume that one key — there is no second derivation. The raw `CryptoKey` is reached only via `await options.keyPromise` inside the functions that sign or verify; it is never placed on a public surface. The derivation SHALL use the formula:

```
key_material = SHA-256(UTF-8("reltio-auth-routing-v1:" + clientSecret))
key          = crypto.subtle.importKey("raw", key_material,
                 { name: "HMAC", hash: "SHA-256" },
                 extractable=false,
                 usages=["sign", "verify"])
```

The label string `"reltio-auth-routing-v1:"` SHALL be a fixed, version-tagged domain-separation prefix that prevents the derived key from colliding with any other key derived from `clientSecret` for a different purpose (HTTP Basic credential, future signing keys, etc.). The version suffix (`v1`) is the rotation handle for backward-compatible future migrations.

All cryptographic operations (SHA-256 digest, HMAC sign, HMAC verify, key import) SHALL use `globalThis.crypto.subtle` (Web Crypto API). The router SHALL NOT import `node:crypto`, `node-forge`, `jose`, or any other Node-only or non-Web-Crypto cryptographic library.

The derived key SHALL be marked `extractable: false` and SHALL carry exactly the two usages `"sign"` and `"verify"` — no `"encrypt"`, `"decrypt"`, `"wrapKey"`, `"unwrapKey"`, `"deriveKey"`, or `"deriveBits"`.

`createAuth` SHALL reference `config.clientSecret` only at construction time (once for the HTTP Basic credential, once for `deriveHmacKey`) and never on a per-request code path. The functions that sign or verify SHALL `await options.keyPromise` on first use and reuse the resolved `CryptoKey` thereafter. `createAuth` SHALL NOT mutate the `config` argument and SHALL NOT memoise across calls (each invocation produces an independent `AuthDeps` record and key).

The `deriveHmacKey` function SHALL be defined exactly once in the package, at `src/core/signAurl.ts` (private — `core/` has no public subpath), and SHALL be called from exactly one site: `createAuth`. Because the BFF's mint side, the BFF's verify side, and the resolver exposed on the adapter return all read the same `keyPromise` from the same `AuthDeps` record, the writer and reader cannot drift onto different keys. A contract test (see the `resolveAuthPath resolver` requirement, "Writer/reader contract" scenario) SHALL drive `GET /callback` end-to-end, capture the minted `reltio_aurl` cookie, and assert that a separately-constructed adapter's `resolveAuthPath` (same `clientSecret`, different fallback `oauthPath`) returns the original `aurl` — so any regression in the cookie envelope, cookie name, `signAurl` / `verifyAurl` shape, base64url encoding, or cookie attributes is caught before release.

#### Scenario: Key derivation is deterministic

- **WHEN** `deriveHmacKey(clientSecret)` is called twice with the same string
- **THEN** signing the same message with each resulting key produces the same MAC byte-for-byte

#### Scenario: Different clientSecret produces unrelated keys

- **WHEN** two distinct `clientSecret` strings are passed to `deriveHmacKey`, and the same `aurl` is signed under each resulting key
- **THEN** the resulting MACs differ, and verifying a cookie minted under key A using key B returns `null`

#### Scenario: Domain-separation label is mandatory

- **WHEN** the package source files are scanned for the string `"reltio-auth-routing-v1:"`
- **THEN** the label appears exactly once in the source (in `signAurl.ts` or its equivalent), and the derivation is the only consumer of it; raw `clientSecret` is never passed directly to `importKey` for HMAC use

#### Scenario: Key is derived at factory time, not per request

- **WHEN** `createAuth(config)` is invoked once and then 1000 requests are handled
- **THEN** `crypto.subtle.importKey` is invoked exactly **once** for the duration of the test — inside `createAuth`, via the single `deriveHmacKey(config.clientSecret)` call — and never per request (verified via a `vi.spyOn` on `crypto.subtle.importKey`)

#### Scenario: No Node-only crypto imports

- **WHEN** the package source files are scanned
- **THEN** none of them imports `node:crypto`, `crypto` (the Node built-in), `node-forge`, `jose`, `tweetnacl`, or any other Node-only or non-Web-Crypto cryptographic library

### Requirement: Dynamic OAuth cluster routing

The router SHALL route `POST /checkToken` and `POST /refreshToken` upstream calls per-request to the Auth Server cluster identified by the verified `reltio_aurl` cookie, falling back fail-closed to `AuthConfig.oauthPath` whenever the cookie is absent, malformed, signed with a different key, or fails HMAC verification for any reason.

Routing is owned by a single pure function — `resolveAuthPath(options)` where `options` is `AuthDeps & { request: AnyRequest }` — defined in `src/core/resolveAuthPath.ts`. `createAuth` builds the `AuthDeps` record once and both the OAuth functions (`checkAccessToken` / `refreshAccessToken`, which forward their `options` to `resolveAuthPath`) and the adapter-exposed resolver read from it. The BFF and any external direct-call site therefore share **one** implementation of the routing read path.

The function SHALL:

1. Read the request's `Cookie` header via the internal `readHeader(request, "cookie")` adapter.
2. Parse it via `parseCookies` and read the `reltio_aurl` cookie value.
3. Await `options.keyPromise` and pass the cookie value plus the resolved key to the internal `verifyAurl(value, key)` function. `verifyAurl` returns `string | null` — `null` when the cookie is absent, malformed, or fails HMAC verification.
4. Select the base URL: the verified `aurl` string when `verifyAurl` returned a non-null value, otherwise `config.oauthPath`. Reduce it to its origin (`new URL(base).origin`) and append the fixed `/oauth` base path, returning `${origin}/oauth`.

The `/oauth` base path is a fixed Reltio Auth Service contract, hardcoded as `OAUTH_BASE_PATH = "/oauth"` in `resolveAuthPath.ts` — NOT derived from `config.oauthPath`. The `aurl` claim is always a path-less cluster origin, and `config.oauthPath` may or may not carry the `/oauth` segment; both are normalized to their origin and given the contract path so callers can append endpoint paths uniformly — `${resolved}/checkToken` is well-formed on both the verified and the fallback branch.

For every dispatched `POST /checkToken` and `POST /refreshToken` request, the handler SHALL forward its flat `options` (plus the request-specific params) to `checkAccessToken({ ...options, accessToken, ... })` / `refreshAccessToken({ ...options, refreshToken })`. That function SHALL call `resolveAuthPath(options)` once to obtain the upstream root and then dispatch the upstream `fetch` against `${root}/checkToken` or `${root}/token` with the same body, headers, and method semantics it would have used pre-DESIGN-75.

The handlers SHALL NOT import `decodeAurl`, `verifyAurl`, `signAurl`, `parseCookies`, or `AUTH_URL_COOKIE` for the purpose of routing — every routing concern is encapsulated in `resolveAuthPath`. The handler for `POST /checkToken` SHALL NOT import `decodeAurl` at all (the mint side never runs there). Routing SHALL be sourced exclusively from the signed `reltio_aurl` cookie — this closes the forged-JWT routing vector that would otherwise let a browser-side attacker (who can write but not read `HttpOnly` cookies via DevTools) redirect upstream traffic by tampering with the `access_token` cookie payload.

The handler for `POST /refreshToken` SHALL apply the routing rule above for the upstream `/token` call. After a successful refresh, the handler SHALL re-derive routing by calling `decodeAurl` on the **new** access token and either minting a fresh `Set-Cookie: reltio_aurl` (when the new token has an `aurl` claim) or clearing the cookie via `Max-Age=0` (when the new token does not). See the modified `POST /refreshToken endpoint` requirement for the full re-minting rule.

Verification failures, parse failures, missing cookies, and tampered cookies SHALL all produce identical observable behaviour: the routing decision falls back silently to `AuthConfig.oauthPath`. The router SHALL NOT log, throw, or emit any error response to the client based on a routing fallback — the fallback path is the existing static-routing behaviour and SHALL be byte-for-byte indistinguishable from a pre-DESIGN-75 deployment.

#### Scenario: Routing uses verified aurl when cookie is valid

- **WHEN** `POST /checkToken` is dispatched with a `reltio_aurl` cookie whose value was just minted by `signAurl(aurl, key)` for `"https://auth-idev-02.reltio.com"`, alongside a valid `access_token` cookie, and `config.oauthPath` ends in `/oauth`
- **THEN** the upstream `fetch` call targets `https://auth-idev-02.reltio.com/oauth/checkToken`, not `${config.oauthPath}/checkToken`

#### Scenario: Routing falls back when cookie is absent

- **WHEN** `POST /checkToken` is dispatched with no `reltio_aurl` cookie in the request
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken`

#### Scenario: Routing falls back when cookie is tampered

- **WHEN** `POST /checkToken` is dispatched with a `reltio_aurl` cookie whose MAC segment has been altered by one bit
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken` and no error is logged or returned to the client

#### Scenario: Routing falls back when cookie was signed by a different clientSecret

- **WHEN** `POST /checkToken` is dispatched with a `reltio_aurl` cookie minted under one `clientSecret` while the BFF is now configured with a different `clientSecret`
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken`

#### Scenario: Routing applies identically to POST /refreshToken

- **WHEN** `POST /refreshToken` is dispatched with a valid `reltio_aurl` cookie set to `"https://auth-idev-02.reltio.com"` and `config.oauthPath` ends in `/oauth`
- **THEN** the upstream `fetch` call targets `https://auth-idev-02.reltio.com/oauth/token`, not `${config.oauthPath}/token`

#### Scenario: decodeAurl is not invoked on /checkToken

- **WHEN** the package source files are scanned and `POST /checkToken` is dispatched 1000 times in a test harness
- **THEN** `checkTokenHandler.ts` does not import `decodeAurl` and no execution of the handler invokes `decodeAurl` (verified via `vi.spyOn` on the `decodeAurl` module export)

### Requirement: resolveAuthPath resolver

The value returned by `createExpressAuth(config)` and `createNextAuth(config)` SHALL expose `resolveAuthPath: (request: AnyRequest) => Promise<string>` as the sole public API for resolving the per-session Auth Server cluster URL. This is the recommended (and only) way for applications to learn the cluster URL the BFF would route to for the same session, so apps that call Auth Server APIs directly (bypassing the BFF) route to the same cluster. The Express adapter SHALL attach it to the returned `Router` (`Router & { resolveAuthPath }`); the Next.js adapter SHALL return it as a field alongside `handlers`.

`resolveAuthPath` SHALL be the **same** resolver the router uses internally — it reads the `keyPromise` and parsed-`oauthPath` segments from the `AuthDeps` record `createAuth` built once. It is therefore exposed on the adapter return (rather than as a standalone factory in `@reltio/auth/utils`) so that: (1) a single factory (`createAuth`) owns all once-derived state and the HMAC key is derived exactly once; (2) the read path provably shares the router's key and cannot drift onto a mismatched `clientSecret` or re-derive the key; and (3) the resolver requires no extra setup, key derivation, or "build deps once" contract from the consumer — it is a member of a value they already hold to mount the router.

The internal implementation SHALL be a pure function `resolveAuthPath(options: AuthDeps & { request: AnyRequest }): Promise<string>` in `src/core/resolveAuthPath.ts`; the adapter member is a thin closure `(request) => resolveAuthPath({ ...deps, request })`.

`resolveAuthPath` SHALL:

1. Await `options.keyPromise` (the key derived once in `createAuth`).
2. Read the `Cookie` header via the internal `readHeader(request, "cookie")` helper (which abstracts over Express `Request`, Next.js `NextRequest`, and Web `Request`), parse it via `parseCookies`, and read the `reltio_aurl` value.
3. Call `await verifyAurl(value, key)` (a missing cookie yields `verifyAurl(undefined, key) === null`).
4. Select the base URL — the verified `aurl` on success, else `config.oauthPath` — reduce it to its origin via `new URL(base).origin`, and return `${origin}/oauth`.

The `/oauth` base path is hardcoded as `OAUTH_BASE_PATH = "/oauth"` — a fixed Reltio Auth Service contract, NOT derived from `config.oauthPath`. The verified `aurl` claim is always a path-less origin, and `config.oauthPath` may or may not carry the `/oauth` segment; reducing both to their origin and appending the contract path means `${resolved}/checkToken` is well-formed on both branches regardless of whether `config.oauthPath` was configured with or without a trailing path. An invalid `config.oauthPath` (one that fails `new URL(...)`) SHALL surface a `TypeError` when `resolveAuthPath` falls back to it.

`config.clientSecret` SHALL NOT be in scope on the per-request path — only the derived `keyPromise` is. `createAuth` SHALL NOT memoise across calls; each invocation produces an independent `AuthDeps` record and key. Callers SHOULD build the auth value once at server boot (as they already do to mount the router) and reuse `resolveAuthPath`.

#### Scenario: resolveAuthPath is exposed on the adapter return

- **WHEN** `const auth = createExpressAuth(config)` (or `createNextAuth(config)`) is called
- **THEN** `auth.resolveAuthPath` is a function with signature `(request: AnyRequest) => Promise<string>`

#### Scenario: resolver returns verified aurl origin plus the fixed /oauth base path when cookie is present and valid

- **WHEN** an adapter constructed with `oauthPath = "https://fallback.example.com/oauth"` exposes `resolveAuthPath`, called with a request whose `reltio_aurl` cookie was minted by `signAurl("https://auth-idev-02.reltio.com", key)` with a key derived from the same `clientSecret`
- **THEN** the resolver returns `"https://auth-idev-02.reltio.com/oauth"` (verified `aurl` origin + the fixed `/oauth` base path); when the adapter was instead constructed with `oauthPath = "https://fallback.example.com"` (no path segment), the resolver returns the same `"https://auth-idev-02.reltio.com/oauth"` — the `/oauth` base path is hardcoded, not taken from `config.oauthPath`

#### Scenario: resolver falls back to oauthPath origin on absent or tampered cookie

- **WHEN** the resolver is called with a request lacking a `reltio_aurl` cookie, OR with a tampered `reltio_aurl` cookie, OR with a `reltio_aurl` cookie signed by a different `clientSecret`
- **THEN** in each case the resolver returns `${new URL(config.oauthPath).origin}/oauth` and does not throw (for the canonical `oauthPath` ending in `/oauth`, this equals `config.oauthPath`)

#### Scenario: HMAC key derived once across the router and the resolver

- **WHEN** `createAuth(config)` is invoked once and the returned `resolveAuthPath` is invoked 100 times alongside any number of routed requests
- **THEN** `crypto.subtle.importKey` is invoked exactly once (during `createAuth`), proving the resolver shares the router's once-derived key (verified via `vi.spyOn` on `crypto.subtle.importKey`)

#### Scenario: resolver is not exported from @reltio/auth/utils

- **WHEN** a consumer attempts `import { createOauthPathResolver, resolveAuthPath } from "@reltio/auth/utils"`
- **THEN** module resolution does not provide either name (the resolver is reached only through the adapter return value)

#### Scenario: Internal HMAC primitives are not exported

- **WHEN** a consumer attempts `import { signAurl, verifyAurl, decodeAurl, deriveHmacKey } from "@reltio/auth/utils"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime imports resolve to `undefined`. External consumers mint nothing — they only verify via the adapter-exposed `resolveAuthPath`.

#### Scenario: Writer/reader contract — cookie minted by callbackHandler verifies through resolveAuthPath

- **WHEN** `GET /callback` mints a `reltio_aurl` cookie for an access token containing `"aurl": "https://auth-idev-02.reltio.com"` using the test `clientSecret`, and the cookie is then handed (via a request fixture) to the `resolveAuthPath` of a separately-constructed `createExpressAuth({ ...DEFAULT_CONFIG, oauthPath: "https://fallback.example.com" })` (the fallback origin differs from the verified `aurl`, so a fallback would be observable)
- **THEN** the resolver returns `"https://auth-idev-02.reltio.com/oauth"` — the verified `aurl` origin plus the hardcoded `/oauth` base path, NOT a URL derived from the fallback `oauthPath` origin. The test lives at `packages/auth/tests/express/callback.test.ts` (single `it(...)` block, kept next to the writer it exercises rather than in a standalone `tests/integration/` directory) and asserts that the cookie the BFF writes (envelope + name + encoding + attributes + MAC) is exactly what the resolver reads — any one-sided change to the writer (`callbackHandler` → `signAurl`) or the reader (`resolveAuthPath` → `verifyAurl`) breaks CI. The Next.js adapter is intentionally NOT mirrored — the contract is between adapter-agnostic internal modules (both `AnyRequest`-typed and exercised by their own unit tests across runtimes), so a single-adapter integration test is sufficient. Key-derivation drift is structurally impossible (the key is derived once in `createAuth` and the same `keyPromise` feeds writer and reader).

## MODIFIED Requirements

### Requirement: GET /callback endpoint

The router SHALL expose a `GET /callback` endpoint that exchanges the OAuth authorization code for access and refresh tokens. It SHALL validate the state parameter against the state cookie, validate the `redirectUrl` query parameter against the request origin, exchange the code via `POST ${loginPath}/token` with HTTP Basic authentication, store the resulting tokens in `access_token` and `refresh_token` cookies, mint the per-session routing cookie `reltio_aurl` when the access token carries an `aurl` claim, and finalise the response — either by invoking the optional `config.ssoRedirect` callback with a `SsoRedirectContext` and returning its `Response`, or by performing a default 302 redirect to `redirectUrl`.

After a successful authorization-code exchange, the handler SHALL call the internal `decodeAurl(tokens.access_token)` function exactly once. `decodeAurl` returns `string | null`. When the return value is a non-empty string, the handler SHALL compute `cookieValue = await signAurl(aurl, await options.keyPromise)` — using the pure `signAurl(aurl, key)` primitive and the HMAC key derived once in `createAuth` and threaded in via `options.keyPromise` — and append a third `Set-Cookie: reltio_aurl=${cookieValue}` header with the cookie option vector returned by `defaultCookieOptions(secure)` — byte-identical to the `access_token` and `refresh_token` cookies. When `decodeAurl` returns `null` (opaque UUID access token, JWT without `aurl` claim, decompression-bomb guard trip, malformed JWT), the handler SHALL NOT emit any `Set-Cookie: reltio_aurl` header.

All `Set-Cookie` appends (`access_token`, `refresh_token`, and the conditional `reltio_aurl`) SHALL be emitted as a single atomic group: the handler SHALL fully compute the cookie set — including running `decodeAurl` and, if its result is a non-empty string, awaiting `signAurl` — **before** writing any `Set-Cookie` header to the response. If `decodeAurl` returns `null`, the group reduces to `access_token` and `refresh_token` and is emitted immediately. If `signAurl` is called and throws (extreme edge case — Web Crypto runtime failure), the handler SHALL return `502 Bad Gateway` with no `Set-Cookie` headers at all — `access_token` and `refresh_token` MUST NOT be half-written without the corresponding `reltio_aurl`.

The `decodeAurl` call SHALL run exactly once per successful login (the only call site in this handler), and is one of exactly two call sites for `decodeAurl` across the entire router (the other being `POST /refreshToken`).

#### Scenario: Successful callback

- **WHEN** the callback receives matching state cookie and query, a valid same-origin `redirectUrl`, and a `code` that the OAuth server accepts
- **THEN** the response is 302 with `access_token` and `refresh_token` cookies set with `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/` and the `Location` header points at `redirectUrl`

#### Scenario: Successful callback with aurl claim mints reltio_aurl

- **WHEN** the callback succeeds and the returned `access_token` is a Reltio JWT whose decoded payload contains `"aurl": "https://auth-idev-02.reltio.com"`
- **THEN** the response includes three `Set-Cookie` headers — `access_token`, `refresh_token`, and `reltio_aurl` — and the `reltio_aurl` value verifies back to `"https://auth-idev-02.reltio.com"` when passed to the `resolveAuthPath` of an adapter constructed with the same `clientSecret` (the writer/reader contract — see the dedicated scenario below)

#### Scenario: Successful callback with opaque access token mints no reltio_aurl

- **WHEN** the callback succeeds and the returned `access_token` is an opaque UUID
- **THEN** the response includes exactly two `Set-Cookie` headers — `access_token` and `refresh_token` — and no `Set-Cookie: reltio_aurl` header

#### Scenario: Successful callback with JWT lacking aurl claim mints no reltio_aurl

- **WHEN** the callback succeeds and the returned `access_token` is a Reltio JWT whose decoded payload does not include an `aurl` claim
- **THEN** the response includes exactly two `Set-Cookie` headers and no `Set-Cookie: reltio_aurl` header

#### Scenario: Decompression-bomb guard trip mints no reltio_aurl

- **WHEN** the callback succeeds and the returned `access_token` is a Reltio JWT whose payload trips any of the four decompression-bomb guards in `decodeAurl` (encoded-segment cap, declared-size gate, compressed-input cap, or bounded output buffer)
- **THEN** the response includes exactly two `Set-Cookie` headers (the handler treats the guard trip identically to `decodeAurl` returning `null`)

#### Scenario: signAurl throw produces atomic 502 with no cookies

- **WHEN** the callback succeeds at the token exchange step but `signAurl(aurl, key)` throws an unexpected exception
- **THEN** the response is `502` with no `Set-Cookie` headers — `access_token` and `refresh_token` are NOT half-written

#### Scenario: State mismatch (unchanged from prior behaviour)

- **WHEN** the `state` query parameter differs from the `state` cookie
- **THEN** the response is 401 and no `Set-Cookie` for `access_token`, `refresh_token`, or `reltio_aurl` is emitted

#### Scenario: Missing state cookie (unchanged from prior behaviour)

- **WHEN** the `state` cookie is absent from the request
- **THEN** the response is 401

#### Scenario: Missing state query parameter (unchanged from prior behaviour)

- **WHEN** the `state` query parameter is absent from the request
- **THEN** the response is 401

#### Scenario: Redirect URL on foreign origin (unchanged from prior behaviour)

- **WHEN** the `redirectUrl` query parameter is provided and its origin (scheme + host + port) does not match the request origin
- **THEN** the response is 400 and no tokens are exchanged

#### Scenario: Redirect URL on same origin different port (unchanged from prior behaviour)

- **WHEN** the `redirectUrl` is `http://app.example.com:8080` and the request arrived at `http://app.example.com:8080`
- **THEN** the response is 302 (origins match)

#### Scenario: Redirect URL on same host different scheme (unchanged from prior behaviour)

- **WHEN** the `redirectUrl` is `http://app.example.com` and the request arrived at `https://app.example.com`
- **THEN** the response is 400 (origins differ)

#### Scenario: ssoRedirect callback receives full context (unchanged from prior behaviour)

- **WHEN** the configuration provides `ssoRedirect` and the authorization code exchange succeeds
- **THEN** the callback is invoked exactly once with a `SsoRedirectContext` argument containing `request`, `accessToken`, `refreshToken`, `redirectUrl`, and `state`; its returned `Response` becomes the HTTP response (with `access_token`, `refresh_token`, and conditional `reltio_aurl` `Set-Cookie` headers appended by the router)

#### Scenario: ssoRedirect does not mutate request (unchanged from prior behaviour)

- **WHEN** the `ssoRedirect` callback runs
- **THEN** `context.request` is unchanged after the callback returns

#### Scenario: Default redirect when no ssoRedirect (unchanged from prior behaviour)

- **WHEN** the configuration omits `ssoRedirect` and the request omits `redirectUrl`
- **THEN** the response 302 redirects to `/`

### Requirement: POST /refreshToken endpoint

The router SHALL expose a `POST /refreshToken` endpoint that exchanges the refresh token cookie for a fresh access token by calling `POST ${upstreamRoot}/token` with `grant_type=refresh_token` and HTTP Basic authentication, where `${upstreamRoot}` is resolved per-request from the `reltio_aurl` cookie (when present and HMAC-verified) or falls back to `AuthConfig.oauthPath`. On success, the endpoint SHALL update both the `access_token` and `refresh_token` cookies, re-derive the `reltio_aurl` cookie from the new access token's `aurl` claim (minting a fresh signed cookie when present, clearing the cookie when absent), and respond 201 with an empty body. On absence of a refresh token cookie or upstream rejection, the endpoint SHALL respond 401.

The handler SHALL apply the routing rule from the `Dynamic OAuth cluster routing` requirement: forward `refreshAccessToken({ ...options, refreshToken })`, which calls `resolveAuthPath(options)` to read the `reltio_aurl` cookie, run HMAC verification, and return the per-request upstream root (or `config.oauthPath` on miss/verify-failure). The handler SHALL NOT import or call `verifyAurl` directly.

After a successful upstream refresh, the handler SHALL call `decodeAurl(tokens.access_token)` on the **new** access token exactly once. The handler SHALL NOT call `decodeAurl` on the old access token; the routing for the refresh call is sourced exclusively from the signed `reltio_aurl` cookie (via `resolveAuthPath`), not from the JWT payload of the request.

When `decodeAurl` on the new access token returns a non-empty string `newAurl`, the handler SHALL append `Set-Cookie: reltio_aurl=${await signAurl(newAurl, await options.keyPromise)}` — using the pure `signAurl(aurl, key)` primitive with the key from `options.keyPromise` — with the same option vector as the other refreshed cookies. The handler SHALL re-mint even when `newAurl` equals the value already in the request cookie (the handler does not optimise for the no-change case — re-minting is cheap and keeps the logic uniform).

When `decodeAurl` on the new access token returns `null` (the new token is opaque UUID, JWT without `aurl`, or trips a decompression-bomb guard), the handler SHALL append `Set-Cookie: reltio_aurl=` with `Max-Age=0` and the standard option vector — clearing the cookie so the session does not retain a stale routing cookie pointing at a cluster the new token wasn't issued by.

All `Set-Cookie` appends (`access_token`, `refresh_token`, and the conditional re-mint or clear of `reltio_aurl`) SHALL be emitted as a single atomic group: the handler SHALL fully compute the cookie set — including running `decodeAurl` on the new access token and, if its result is a non-empty string, awaiting `signAurl` — **before** writing any `Set-Cookie` header to the response. When `decodeAurl` returns `null`, the `reltio_aurl` slot in the group is a `Max-Age=0` clear rather than a fresh mint, and no `signAurl` call is made. If `signAurl` is called and throws, the handler SHALL return `502 Bad Gateway` with no `Set-Cookie` headers — `access_token` and `refresh_token` MUST NOT be half-written without the corresponding `reltio_aurl` re-mint.

#### Scenario: Successful refresh routes via verified cookie

- **WHEN** the request carries a valid `refresh_token` cookie and a valid `reltio_aurl` cookie set to `"https://auth-idev-02.reltio.com"`, and `config.oauthPath` ends in `/oauth`
- **THEN** the upstream `fetch` call targets `https://auth-idev-02.reltio.com/oauth/token`, not `${config.oauthPath}/token`

#### Scenario: Successful refresh routes to oauthPath when cookie is absent

- **WHEN** the request carries a valid `refresh_token` cookie and no `reltio_aurl` cookie
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/token`

#### Scenario: Successful refresh routes to oauthPath when cookie is tampered

- **WHEN** the request carries a valid `refresh_token` cookie and a `reltio_aurl` cookie whose MAC segment has been altered by one bit
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/token`

#### Scenario: Successful refresh with new aurl re-mints the cookie

- **WHEN** the upstream refresh returns a new access token whose payload contains `"aurl": "https://auth-test.reltio.com"` and the existing `reltio_aurl` cookie pointed at `"https://auth-idev-02.reltio.com"`
- **THEN** the response includes a fresh `Set-Cookie: reltio_aurl=<...>` whose value verifies to `"https://auth-test.reltio.com"`

#### Scenario: Successful refresh with same aurl still re-mints

- **WHEN** the upstream refresh returns a new access token whose `aurl` claim equals the value in the existing `reltio_aurl` cookie
- **THEN** the response still includes a fresh `Set-Cookie: reltio_aurl=<...>` (no optimisation for the no-change case)

#### Scenario: Successful refresh with opaque new token clears the cookie

- **WHEN** the upstream refresh returns a new access token that is an opaque UUID (no `aurl` claim available)
- **THEN** the response includes `Set-Cookie: reltio_aurl=` with `Max-Age=0` and the same `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/` option vector as the original cookie

#### Scenario: Successful refresh updates access and refresh cookies (unchanged from prior behaviour)

- **WHEN** the request carries a `refresh_token` cookie that the OAuth server accepts
- **THEN** the response is 201, both `access_token` and `refresh_token` cookies are replaced, and the new `access_token` cookie carries `Max-Age` equal to the OAuth server's `expires_in` value (in seconds)

#### Scenario: No refresh token cookie (unchanged from prior behaviour)

- **WHEN** the request has no `refresh_token` cookie
- **THEN** the response is 401 and no upstream call is made

#### Scenario: Upstream rejects refresh token (unchanged from prior behaviour)

- **WHEN** the OAuth server returns 4xx for the refresh request
- **THEN** the response is 401 and no `Set-Cookie` for `access_token`, `refresh_token`, or `reltio_aurl` is emitted

#### Scenario: signAurl throw on re-mint produces atomic 502

- **WHEN** the upstream refresh succeeds but the post-refresh `signAurl(newAurl, key)` call throws an unexpected exception
- **THEN** the response is `502` with no `Set-Cookie` headers — `access_token` and `refresh_token` are NOT half-written

### Requirement: POST /checkToken endpoint

The router SHALL expose a `POST /checkToken` endpoint that validates the access token and returns user and permission data. It SHALL read the access token from the `Authorization: Bearer` header if present, otherwise from the `access_token` cookie. It SHALL call `POST ${upstreamRoot}/checkToken` with optional `serviceId` and `tenantId` query parameters propagated from the request, where `${upstreamRoot}` is resolved per-request from the `reltio_aurl` cookie (when present and HMAC-verified) or falls back to `AuthConfig.oauthPath`. It SHALL return the upstream JSON response with HTTP 200. On absence of an access token it SHALL respond 401.

The handler SHALL apply the routing rule from the `Dynamic OAuth cluster routing` requirement and SHALL NOT call `decodeAurl` on the incoming access token. Routing is sourced exclusively from the signed `reltio_aurl` cookie. This boundary is what closes the forged-JWT routing vector: a browser-side attacker who tampers with the `access_token` cookie payload to inject `"aurl": "https://attacker.example.com"` does NOT influence routing, because the handler never reads `aurl` from the request access token.

#### Scenario: Token validation routes via verified cookie

- **WHEN** the request carries a valid `access_token` cookie and a valid `reltio_aurl` cookie set to `"https://auth-idev-02.reltio.com"`, and `config.oauthPath` ends in `/oauth`
- **THEN** the upstream `fetch` call targets `https://auth-idev-02.reltio.com/oauth/checkToken`

#### Scenario: Token validation routes to oauthPath when cookie is absent

- **WHEN** the request carries a valid `access_token` cookie and no `reltio_aurl` cookie
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken`

#### Scenario: Token validation routes to oauthPath when cookie is tampered

- **WHEN** the request carries a valid `access_token` cookie and a `reltio_aurl` cookie whose MAC segment has been altered by one bit
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken`

#### Scenario: decodeAurl is never invoked on /checkToken

- **WHEN** any number of `POST /checkToken` requests are dispatched with any combination of `access_token` payloads (opaque UUIDs, JWTs with `aurl`, JWTs without `aurl`, malformed JWTs)
- **THEN** `decodeAurl` is invoked zero times across all of these requests (verified via `vi.spyOn` on the `decodeAurl` module export)

#### Scenario: Forged aurl in access_token is ignored for routing

- **WHEN** the request carries an `access_token` cookie whose payload has been tampered to claim `"aurl": "https://attacker.example.com"`, and a valid `reltio_aurl` cookie set to `"https://auth-idev-02.reltio.com"`, and `config.oauthPath` ends in `/oauth`
- **THEN** the upstream `fetch` call targets `https://auth-idev-02.reltio.com/oauth/checkToken`, not `https://attacker.example.com/checkToken` or any URL derived from the forged `aurl` claim

#### Scenario: Forged aurl in access_token without reltio_aurl cookie falls back to oauthPath

- **WHEN** the request carries an `access_token` cookie whose payload has been tampered to claim `"aurl": "https://attacker.example.com"`, and no `reltio_aurl` cookie
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken`, not `https://attacker.example.com/checkToken`

#### Scenario: Token validation succeeds (unchanged from prior behaviour)

- **WHEN** the request carries a valid `access_token` cookie and the OAuth server returns 200 with a JSON body
- **THEN** the response is 200 with the same JSON body

#### Scenario: Bearer header takes precedence over cookie (unchanged from prior behaviour)

- **WHEN** the request carries both an `Authorization: Bearer X` header and an `access_token` cookie with a different value
- **THEN** the upstream call uses the header token

#### Scenario: Bearer header is case-insensitive (unchanged from prior behaviour)

- **WHEN** the request carries `authorization: bearer X`, `Authorization: Bearer X`, or `Authorization: BEARER X`
- **THEN** the token is extracted correctly in every case

#### Scenario: serviceId and tenantId forwarded (unchanged from prior behaviour)

- **WHEN** the request carries query parameters `serviceId=svc&tenantId=t1`
- **THEN** the upstream call is made with the same query parameters appended to the resolved upstream URL

#### Scenario: No access token (unchanged from prior behaviour)

- **WHEN** the request has neither `Authorization` header nor `access_token` cookie
- **THEN** the response is 401 and no upstream call is made

### Requirement: GET /logout endpoint

The router SHALL expose a `GET /logout` endpoint that clears authentication cookies and redirects to the Reltio Login Page logout URL. Clearing SHALL use the same cookie options used when setting (so browsers identify and remove the cookie reliably). The cookies cleared SHALL be `access_token`, `refresh_token`, `state`, and `reltio_aurl` — four `Set-Cookie` headers, one per cookie.

The handler SHALL NOT call `decodeAurl`, `signAurl`, or `verifyAurl`. Logout is pure cookie cleanup; routing is irrelevant after the user has logged out. The handler SHALL NOT make any upstream call to an Auth Server cluster.

The endpoint SHALL resolve the **return URL** and the **tenant** from the same source hierarchy as the `GET /login` endpoint: the request's `?returnTo=` and `?tenant=` query parameters take precedence over the `Referer` header. An empty or whitespace-only `?tenant=` SHALL be treated as absent.

The endpoint SHALL respond `400` only when **both** the request's `?returnTo=` query parameter and the `Referer` header are missing. A malformed `Referer` SHALL be treated as absent when `?returnTo=` is supplied.

When **both** an explicit `?returnTo=` and a `Referer` header are present, the endpoint SHALL assert that `new URL(returnTo).origin === refererUrl.origin`. A mismatch SHALL produce `400 returnTo origin does not match Referer origin`, no cookies SHALL be cleared, and no redirect to the Login Page's logout URL SHALL be issued. When `?returnTo=` is supplied alone (no `Referer`), the endpoint SHALL NOT perform a BFF-side same-origin check — the same OAuth-server-allowlist trust model as `GET /login` SHALL apply.

The OAuth `redirect_uri` query parameter sent into the logout chain (Login Page logout URL → BFF callback → final return URL) SHALL be built from a client-supplied origin (`new URL(returnTo).origin` on the explicit path, `refererUrl.origin` on the legacy fallback path) plus the BFF's own pathname (`new URL(request.url).pathname.replace(/logout$/, "callback")`). The endpoint SHALL NOT use `new URL(request.url).origin` for the OAuth callback URL.

#### Scenario: Logout clears all four auth cookies

- **WHEN** a browser issues `GET /logout` with a same-origin `Referer` header and carrying `access_token`, `refresh_token`, `state`, and `reltio_aurl` cookies
- **THEN** the response contains four `Set-Cookie` headers that clear each cookie (`Max-Age=0`, empty value) with `HttpOnly`, `Secure` (when `secure: true`), `SameSite=Lax`, and `Path=/` matching the original set

#### Scenario: Logout clears reltio_aurl even when the cookie is absent on the request

- **WHEN** a browser issues `GET /logout` carrying only `access_token` and `refresh_token` cookies (no `reltio_aurl` cookie was ever minted because the access token was opaque)
- **THEN** the response still contains a `Set-Cookie: reltio_aurl=; Max-Age=0` header — the clear is unconditional (browsers ignore clears for cookies they do not have)

#### Scenario: Logout makes no upstream call

- **WHEN** the logout handler runs
- **THEN** no `fetch` call is made to any Auth Server cluster URL (verified via `vi.spyOn(globalThis, "fetch")`)

#### Scenario: Logout redirects via login page logout URL (unchanged from prior behaviour)

- **WHEN** logout is invoked with a same-origin `Referer` header
- **THEN** the response is 302 to `${loginPath}/logout?redirectUrl=...`

#### Scenario: New state cookie issued for subsequent login (unchanged from prior behaviour)

- **WHEN** logout is invoked with a same-origin `Referer` header
- **THEN** the response sets a fresh `state` cookie so the user can immediately re-authenticate

#### Scenario: Logout with explicit returnTo query parameter (unchanged from prior behaviour)

- **WHEN** the request URL is `GET /logout?tenant=acme&returnTo=https://app.example.com/hub/acme` and the `Referer` header is absent
- **THEN** the response is 302, the redirect chain ultimately returns to `https://app.example.com/hub/acme`, and the Login Page's `tenant` parameter equals `acme`

#### Scenario: Explicit returnTo overrides referer href (unchanged from prior behaviour)

- **WHEN** the request URL is `GET /logout?returnTo=https://app.example.com/hub/acme` and the `Referer` is `https://app.example.com/dashboard?tenant=other`
- **THEN** the resolved return URL is `https://app.example.com/hub/acme` (explicit `?returnTo=` wins); the tenant falls back to the referer query (`other`) because no `?tenant=` was supplied on the request

#### Scenario: Logout responds 400 when neither query nor Referer supplies returnTo (unchanged from prior behaviour)

- **WHEN** the request URL is `GET /logout` (no `?returnTo=` query parameter) and no `Referer` header is supplied
- **THEN** the response is `400` with the body `Missing returnTo query parameter or Referer header`, no cookies are cleared, and no redirect to the Login Page's logout URL is issued

#### Scenario: Logout responds 400 when explicit returnTo origin differs from Referer origin (unchanged from prior behaviour)

- **WHEN** the request URL is `GET /logout?returnTo=https://evil.example.com/` and the `Referer` header is `https://app.example.com/dashboard`
- **THEN** the response is `400` with the body `returnTo origin does not match Referer origin`, no cookies are cleared (none of the four), and no redirect to the Login Page's logout URL is issued

#### Scenario: Logout forwards single-source returnTo without same-origin check (unchanged from prior behaviour)

- **WHEN** the request URL is `GET /logout?returnTo=https://app.example.com/hub/acme` and no `Referer` header is supplied
- **THEN** the response is 302 into the logout chain with the OAuth `redirect_uri` carrying origin `https://app.example.com`; no BFF-side same-origin check is performed

### Requirement: Cookie attributes

All cookies set by the router SHALL be `HttpOnly`. The `access_token`, `refresh_token`, and `reltio_aurl` cookies SHALL additionally be `SameSite=Lax` and `Path=/`. The `state` cookie SHALL be `SameSite=Lax`, `Path=/`. When the configuration sets `secure: true`, all four cookies SHALL also carry the `Secure` flag. Cookies SHALL be cleared with the identical option vector used at set time.

The `reltio_aurl` cookie SHALL use the same option vector as `access_token` and `refresh_token` — set via `defaultCookieOptions(secure)` from `src/utils/cookies.ts` so any future change to the default vector applies uniformly to all three.

#### Scenario: Secure mode default

- **WHEN** the configuration omits `secure`
- **THEN** all four cookies (`access_token`, `refresh_token`, `state`, `reltio_aurl`) are set with the `Secure` flag (default is `true`)

#### Scenario: Insecure mode

- **WHEN** the configuration sets `secure: false`
- **THEN** all four cookies are set without the `Secure` flag

#### Scenario: Clear cookie matches set cookie

- **WHEN** the router clears any cookie it previously set (including `reltio_aurl` at logout)
- **THEN** the `Set-Cookie` header used for clearing carries the same `HttpOnly`, `Secure`, `SameSite`, and `Path` as the original set

#### Scenario: reltio_aurl option vector identical to access_token

- **WHEN** `GET /callback` mints `access_token`, `refresh_token`, and `reltio_aurl` in a single response
- **THEN** the three `Set-Cookie` headers carry byte-identical `HttpOnly`, `Secure`, `SameSite`, and `Path` attributes

### Requirement: Framework-agnostic helpers

The `@reltio/auth/utils` entry SHALL export three functions:

- `getAccessToken(request)` — reads the access token from `Authorization: Bearer` (case-insensitive), then from the `access_token` cookie. Returns the token string or `null`.
- `getRefreshToken(request)` — reads the refresh token from the `refresh_token` cookie. Returns the token string or `null`.
- `getBasicToken(clientId, clientSecret)` — returns the base64-encoded `clientId:clientSecret` string suitable for HTTP Basic authentication.

The per-session routing resolver is NOT exported from `@reltio/auth/utils`; it is exposed as `resolveAuthPath` on the value returned by `createExpressAuth(config)` / `createNextAuth(config)` (see the `resolveAuthPath resolver` requirement), so it shares the router's once-derived HMAC key.

Both request-accepting helpers (`getAccessToken`, `getRefreshToken`) — and the adapter-exposed `resolveAuthPath` — SHALL accept Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly through runtime detection of the request shape (the `AnyRequest` internal type). Helpers SHALL NOT mutate the request argument.

#### Scenario: getAccessToken with Express request and Bearer header (unchanged from prior behaviour)

- **WHEN** called with an Express request whose `headers.authorization` is `Bearer abc`
- **THEN** returns `"abc"`

#### Scenario: getAccessToken with Web Request and cookie (unchanged from prior behaviour)

- **WHEN** called with a Web `Request` whose `Cookie` header includes `access_token=xyz`
- **THEN** returns `"xyz"`

#### Scenario: getAccessToken returns null when no token (unchanged from prior behaviour)

- **WHEN** called with a request that has neither a Bearer header nor an `access_token` cookie
- **THEN** returns `null`

#### Scenario: getBasicToken encoding (unchanged from prior behaviour)

- **WHEN** called with `clientId="test"` and `clientSecret="secret"`
- **THEN** returns `"dGVzdDpzZWNyZXQ="`

#### Scenario: Helpers do not mutate the request (unchanged from prior behaviour)

- **WHEN** any helper is called with a request argument
- **THEN** the request's `headers`, `cookies`, and own properties are unchanged after the call returns

#### Scenario: adapter-exposed resolveAuthPath returns a working per-request resolver

- **WHEN** `const auth = createExpressAuth(config); await auth.resolveAuthPath(request)` is called with a request containing a valid `reltio_aurl` cookie
- **THEN** the verified `aurl` string is returned (see the `resolveAuthPath resolver` requirement for the full scenario set)

