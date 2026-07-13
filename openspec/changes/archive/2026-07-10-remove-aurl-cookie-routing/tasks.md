# Tasks — Remove the `reltio_aurl` cookie, unify BFF routing on the allowlist

## 1. Config & types

- [x] 1.1 Add a shared `AuthEnvironment` base type (`{ oauthPath, clientId, clientSecret }`) to `packages/auth/src/types/index.ts`; make `AuthConfig` extend it and add optional `authEnvironments: AuthEnvironment[]` as the allowlist entry used by both BFF and standalone API-service routing.

## 2. Shared allowlist routing core

- [x] 2.1 Generalise `buildAllowlist` to accept an `AllowlistConfig` (the `oauthPath` + `authEnvironments` + credentials subset of `AuthConfig`) so it can be reused by every routing path (`packages/auth/src/core/allowlist.ts`).
- [x] 2.2 Add `selectAuthServiceForRequest(allowlist, request)` that reads the access token via `getAccessToken` and delegates to `selectAuthService` (primary on no token).
- [x] 2.3 Rework `checkAccessToken({ allowlist, request, serviceId?, tenantId? })` into the shared throwing introspection path (read token, select cluster from the allowlist, post to its `/checkToken`); fold the low-level introspect POST in as a private helper.

## 3. Rewire the BFF onto the allowlist

- [x] 3.1 `AuthDeps` (`core/handlers/types.ts`): drop `authHeader` and `keyPromise`; add the precomputed `allowlist`.
- [x] 3.2 `createAuth.ts`: build the allowlist once via `buildAllowlist(config)`; delegate `checkToken` to `checkAccessToken`.
- [x] 3.3 `resolveAuthPath.ts`: resolve the cluster via `selectAuthServiceForRequest` + `OAUTH_BASE_PATH`, replacing cookie verification.
- [x] 3.4 `refreshAccessToken.ts`: route the `/token` call via `selectAuthServiceForRequest` (per-cluster origin + credentials).
- [x] 3.5 `exchangeCode.ts`: always use the primary cluster's credentials (`allowlist[0].authHeader`).
- [x] 3.6 `checkTokenHandler.ts`: delegate to `checkAccessToken`.
- [x] 3.7 `callbackHandler.ts` / `refreshTokenHandler.ts`: remove all `reltio_aurl` mint/re-mint/clear logic (set only `access_token` + `refresh_token`).
- [x] 3.8 `logoutHandler.ts`: stop clearing `reltio_aurl` (clear only `access_token`, `refresh_token`, `state`).

## 4. Delete the HMAC subsystem & dead primitives

- [x] 4.1 Delete `core/aurlCookie.ts` (`signAurl`, `verifyAurl`, `deriveHmacKey`).
- [x] 4.2 Remove `AUTH_URL_COOKIE` from `utils/cookies.ts`.
- [x] 4.3 Remove `base64urlEncode` from `core/base64url.ts` (keep `base64urlDecode`, used by `decodeAccessToken`).
- [x] 4.4 Update stale JSDoc referencing the removed symbols (`checkAccessToken.ts`, `safeFetch.ts`, `utils/index.ts`, adapter JSDoc).

## 5. Tests

- [x] 5.1 Test infra: drop `mintAurlCookie` helpers; add a `MULTIAUTH_CONFIG` fixture (allowlist entry matching `TOKEN_WITH_AURL_ORIGIN`) to the Express and Next test harnesses.
- [x] 5.2 Rewrite `resolveAuthPath.test.ts` for token-`aurl` + allowlist resolution, including fallback for absent/undecodable/bomb/unknown-`aurl` tokens.
- [x] 5.3 Rewrite the `reltio_aurl` routing tests in `express/checkToken.test.ts`, `next/checkToken.test.ts`, `express/refreshToken.test.ts` for allowlist routing; delete the HMAC-key-derivation tests.
- [x] 5.4 Remove the cookie-mint/clear scenarios from `express/callback.test.ts` and `next/callback.test.ts`.
- [x] 5.5 Update `utils/publicSurface.test.ts` to guard the real private introspectors (`checkAccessToken`, `introspectToken`).
- [x] 5.6 `npm run test -w @reltio/auth` green (257 tests).

## 6. Drop the local token-checker prototype (never committed to `main`)

- [x] 6.1 Delete `src/core/createTokenChecker.ts` and `src/api/index.ts`; remove the `TokenCheckerConfig` type from `types/index.ts`.
- [x] 6.2 Drop the `./api` entry from `package.json` `exports` + `typesVersions`, and the `@reltio/auth/api` alias from `vitest.config.ts`.
- [x] 6.3 Delete `tests/api/tokenChecker.test.ts`; remove the `@reltio/auth/api` block from `utils/publicSurface.test.ts`.
- [x] 6.4 Delete the OpenSpec change `add-token-checker-multiauth` (incl. the `token-checker` capability delta) and its `.changeset/token-checker-multiauth.md` — the surface never shipped.

## 7. Make loginPath optional (one factory for BFF + API services)

- [x] 7.1 `AuthConfig.loginPath` → optional; JSDoc explains it is required only for the interactive OAuth flow.
- [x] 7.2 Guard `loginHandler`, `logoutHandler`, `callbackHandler`: respond `500` when `config.loginPath` is absent.
- [x] 7.3 Add coverage: `checkToken` works with a `loginPath`-less config; `GET /login|/logout|/callback` respond `500` without `loginPath`.

## 8. Docs

- [x] 8.1 `README.md`: document `AuthEnvironment` + `authEnvironments`; drop `AUTH_URL_COOKIE`; rewrite the routing / `resolveAuthPath` narrative; drop the `@reltio/auth/api` row + `TokenCheckerConfig`; rewrite the standalone-API section around `auth.checkToken` + optional `loginPath`.
- [x] 8.2 Rewrite the Dynamic OAuth Routing guide (`guides/auth/dynamic-oauth-routing.story.mdx`) for the allowlist model; drop `TokenCheckerConfig`.
- [x] 8.3 Update `packages/auth/AGENTS.md` examples that cited the removed cookie/HMAC symbols.

## 9. Review follow-ups

- [x] 9.1 Refresh routing (High): `refreshTokenHandler.ts` emits the `access_token` cookie co-terminal with `refresh_token` (drop the `expires_in` → `Max-Age` cap) so an opaque-refresh secondary-cluster session keeps its `aurl` routing hint; update Express + Next refresh tests.
- [x] 9.2 `allowlist.ts` (L2): run the primary `oauthPath` through `toOrigin` with a message-bearing `TypeError`, symmetric with `authEnvironments`.
- [x] 9.3 Coverage (L1/L3): construction fail-fast on malformed `authEnvironments[].oauthPath` and primary `oauthPath`; non-URL `aurl` claim falls back to the primary (new `TOKEN_WITH_NON_URL_AURL` fixture).
- [x] 9.4 Document the co-terminal access cookie (opaque refresh token) and tenant-based routing as out-of-scope (`design.md`, `spec.md`).
- [x] 9.5 Rename `additionalServices` → `authEnvironments` and introduce the shared `AuthEnvironment` base type (entry field `url` → `oauthPath`); `AuthConfig` extends `AuthEnvironment`. Propagate across source, tests, README, guide, and OpenSpec artifacts.

## 10. Verify

- [x] 10.1 `npx @biomejs/biome check packages/auth` clean.
- [x] 10.2 `npm run build -w @reltio/auth` clean (ESM + CJS typecheck).
- [x] 10.3 `npm run test -w @reltio/auth` green.
- [x] 10.4 `openspec validate remove-aurl-cookie-routing --strict` passes.
- [x] 10.5 Changeset (minor bump) documents the cookie removal, `authEnvironments` for multiauth BFFs, and optional `loginPath`.
