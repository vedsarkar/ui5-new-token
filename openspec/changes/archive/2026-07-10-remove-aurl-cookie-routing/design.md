# Design — Remove the `reltio_aurl` cookie, unify BFF routing on the allowlist

## Context

The shipped BFF answered "which Auth Server cluster issued this token?" with the `reltio_aurl` cookie: `GET /callback` decoded the access token's `aurl`, HMAC-signed it, and minted the `reltio_aurl` cookie. `POST /checkToken` and `POST /refreshToken` read+verified that cookie to route; `POST /refreshToken` re-minted it; `GET /logout` cleared it. The cookie — not the access token — was the routing source of truth on the hot path, and the whole HMAC subsystem (`deriveHmacKey`/`signAurl`/`verifyAurl`, the `keyPromise` on `AuthDeps`, the domain-separation label) existed to make trusting that cookie safe.

The cookie only carried the routing **origin**, never credentials, so the BFF authenticated every upstream call with a single shared `clientId` / `clientSecret`. That is the design's real limit: each `aurl` cluster is a distinct OAuth registration with its **own** `clientId` / `clientSecret`, so routing a request's URL to a secondary cluster while presenting the primary's credentials is rejected — the cookie mechanism cannot do genuine multiauth.

An **allowlist** model resolves both the origin and the credentials from one place: decode the access token's `aurl`, match it against an operator-configured allowlist (the primary `oauthPath` + `authEnvironments`), route to the matched cluster **with that cluster's own credentials**, and fall back to the primary on any miss — no signing, no cookie. It reaches the same SSRF-safety guarantee (a forged `aurl` can only ever select a pre-configured cluster) and generalises to standalone API services, which have no login flow to mint a cookie in the first place. (An allowlist-based `createTokenChecker` / `@reltio/auth/api` surface was explored locally for API services but never committed to `main` or shipped.)

This change makes the BFF route by the allowlist, deletes the cookie subsystem, and serves API-service introspection through the same `auth.checkToken` — so a single mechanism and a single factory cover both. No separate token-checker factory or subpath is introduced.

## Goals / Non-Goals

**Goals**
- One routing model across BFF and API services: decode the access token's `aurl`, match it against the allowlist, fall back to the primary cluster.
- Remove the `reltio_aurl` cookie and every line of code that exists only to mint, verify, re-mint, clear, or key it.
- One factory: introduce no separate `createTokenChecker` / `@reltio/auth/api`; let `auth.checkToken` (with an optional `loginPath`) serve standalone API services.
- Keep the public adapter surface (`createExpressAuth`/`createNextAuth` return, `resolveAuthPath`, `checkToken`) signature-compatible.

**Non-Goals**
- Local token-signature verification (still deferred). Trust in `aurl` remains allowlist-membership only.
- Any change to CSRF `state` handling, redirect-origin validation, or the upstream error policy. (`GET /login` gains only the `loginPath`-absent `500` guard.)
- **Tenant-based routing.** The neighbouring Java resource server (`oauth2-security-common`) resolves the cluster from the request tenant in addition to the token `aurl`. That is a data-plane concern tied to per-tenant Auth Server mapping; `@reltio/auth` routes on `aurl` only. Tenant routing is explicitly out of scope here.

## Decisions

### Decision 1 — Routing source of truth becomes the access token's `aurl` + allowlist

The BFF resolves the cluster via the shared `allowlist.ts` core, and every other routing/introspection path reuses the same core:

- `buildAllowlist(config)` builds `ResolvedAuthService[]` once at `createAuth` time (primary at index 0, then `authEnvironments`); a malformed `oauthPath` (primary or an `authEnvironments` entry) throws at construction (fail-fast). Duplicate origins: the primary / earlier entry wins.
- `selectAuthServiceForRequest(allowlist, request)` reads the access token via `getAccessToken`, decodes its `aurl`, and returns the matching entry (origin match, trailing-slash insensitive) or the primary on any miss (absent/undecodable/unknown `aurl`).

This replaces the previous "read the `reltio_aurl` cookie and HMAC-verify it" path everywhere it appeared.

**Why this is still SSRF-safe without signing.** The `aurl` claim can only *select* an entry the operator pre-configured in the allowlist. It is never used to construct an outbound origin. A forged token's worst case is selecting an already-trusted cluster or falling back to the primary — identical to the guarantee the signed cookie gave, minus the crypto.

**On the forged-JWT concern the old design called out.** The prior `/checkToken` requirement deliberately routed from the *cookie*, not the request's access token, to stop a browser-side attacker who can write (but not read) `HttpOnly` cookies from steering traffic by tampering with the `access_token` cookie payload. That concern dissolves under the allowlist: even a fully attacker-chosen `aurl` cannot escape the allowlist, so reading `aurl` from the request access token is safe. The token the BFF routes with is the same token it then introspects/refreshes — there is no second, independently-trusted routing input to keep in sync.

### Decision 2 — `AuthDeps` carries the allowlist, not a key

`AuthDeps` was `{ config, authHeader, keyPromise }`. It becomes `{ config, allowlist }`:

- `allowlist: ResolvedAuthService[]` — each entry carries its cluster origin and precomputed Basic `authHeader`.
- The authorization-code exchange (`exchangeCode`) always uses the primary cluster's credentials (`allowlist[0].authHeader`).
- `/checkToken` and `/refreshToken` select the entry named by the token's `aurl` and use that entry's origin + `authHeader`.
- `keyPromise` and the standalone `authHeader` are gone; no key is derived anywhere.

### Decision 3 — One introspection path, no separate API factory

Every introspection entry point delegates to a single `checkAccessToken({ allowlist, request, serviceId?, tenantId? })` that reads the token, selects the cluster, and posts to its `/checkToken` (the low-level POST is a private helper in the same file). The BFF `auth.checkToken` (already on the adapter return via `add-auth-checktoken-method`) routes this way, which is exactly what a standalone API service needs — so no separate `createTokenChecker` factory, `@reltio/auth/api` subpath, or `TokenCheckerConfig` type is introduced. Standalone API services call `createExpressAuth(config).checkToken` / `createNextAuth(config).checkToken` — same 401/4xx/502 mapping, same non-JSON-200 propagation, one factory.

### Decision 4 — `loginPath` becomes optional so one factory serves API services

A dedicated API-service factory would be tempting mainly because its config need not demand a `loginPath` an API service has no use for. To let the single `AuthConfig`/factory serve introspection-only services cleanly instead, `loginPath` becomes optional. It is read only by the interactive-flow handlers (`loginHandler`, `logoutHandler`, `exchangeCode` via `callbackHandler`); each guards on its absence and returns `500` rather than throwing an opaque `new URL(undefined)`. `checkToken` and `resolveAuthPath` never read `loginPath`, so they are unaffected. An API service configures `{ oauthPath, clientId, clientSecret, authEnvironments? }`, never mounts the router, and only calls `checkToken`.

### Decision 5 — Cookie surface shrinks to two auth cookies + state

`GET /callback` and `POST /refreshToken` set only `access_token` and `refresh_token`. `GET /logout` clears only those two (plus issuing a fresh `state`). No handler emits or clears `reltio_aurl`. The atomic-cookie-group logic that existed to keep `reltio_aurl` in sync with the token cookies (and the `502-on-signAurl-throw` edge case) is deleted along with the cookie.

### Decision 7 — The refreshed `access_token` cookie is co-terminal with `refresh_token`

Routing now reads the cluster from the access token's `aurl`, including on `POST /refreshToken`. The refresh token is **opaque** (a UUID-style bearer, not a JWT) and carries no `aurl`, so the only routing hint at reactive-refresh time is the access token cookie. If that cookie could expire before the refresh cookie, a secondary-cluster session whose access token had lapsed would present no `aurl`, fall back to the primary cluster, and its refresh would fail against the wrong cluster.

Therefore `POST /refreshToken` no longer caps the `access_token` cookie with the upstream `expires_in` (`Max-Age`). Both auth cookies are emitted with identical options — session cookies bounded by the same lifetime — so the access token's `aurl` always survives at least as long as the refresh token it routes with. The access token's *own* `exp` still governs when a refresh is triggered; the cookie lifetime only governs how long the routing hint is readable.

### Decision 6 — Delete the HMAC subsystem and dead primitives

Removed: `src/core/aurlCookie.ts` (`signAurl`/`verifyAurl`/`deriveHmacKey`), the `AUTH_URL_COOKIE` constant in `cookies.ts`, and `base64urlEncode` in `base64url.ts` (its only caller was `aurlCookie.ts`). `base64urlDecode` stays — `decodeAccessToken` still needs it to read the `aurl` claim.

## Risks / Trade-offs

- **Behavioural change for multiauth BFF deployments.** Routing now requires `authEnvironments` to be configured; a deployment that relied on the cookie carrying the cluster without any config must add the allowlist. Mitigation: single-cluster deployments are unaffected (every request resolves to `oauthPath`), so the release is net-additive for published consumers and ships as a `minor` bump.
- **`aurl` decoded on the hot path.** The BFF now decodes the access token's `aurl` on every `/checkToken` and `/refreshToken` (previously only at cookie mint time). `decodeAccessToken` keeps its layered decompression-bomb guards, so a hostile token cannot amplify. The cost is a bounded zstd decompress per request — negligible next to the upstream round-trip it precedes.
- **Loss of the writer/reader contract test.** That test guarded the cookie envelope; with no cookie there is nothing to keep in sync. Routing is now covered by allowlist-selection tests driven through the public adapter surface.

## Migration Notes

- Multiauth BFFs: add `authEnvironments: [{ oauthPath, clientId, clientSecret }, …]` to the `AuthConfig` passed to `createExpressAuth` / `createNextAuth`.
- No consumer action for the cookie removal itself — `reltio_aurl` was `HttpOnly` and never part of the public API. Any code inspecting it should be deleted.
- Standalone API services: there is no `createTokenChecker` / `@reltio/auth/api`. Build the router with `createExpressAuth` / `createNextAuth` (omit `loginPath`), don't mount it, and call `auth.checkToken(request)`. No such surface ever shipped, so no published consumer is affected.
