## Why

`@reltio/auth` already exposes `resolveAuthPath` on the value returned by `createExpressAuth` / `createNextAuth` for apps that call the Auth Server directly, bypassing the router's `/checkToken`. But several BFFs (reltio-react-ui, admin-tools, …) need more than the path: they need to **introspect the current request's access token server-side** to gate routes (role/permission checks) and then act on the *parsed result*, not on an HTTP `Response`. Today each app hand-rolls the exact body of the package's internal `checkAccessToken` — duplicating the wire contract (form encoding, Basic header, `serviceId`/`tenantId`, per-session cluster routing, error normalisation) across repos, in the security-sensitive introspection path. Every copy drifts when the contract changes.

## What Changes

- **New `checkToken` member on the adapter return value.** `createExpressAuth(config)` and `createNextAuth(config)` gain `checkToken(request, opts?) => Promise<CheckTokenResponse>`, mirroring exactly how `resolveAuthPath` is attached today (a method on the returned `Router` for Express, a field alongside `handlers` for Next.js).
- **Reuses the once-derived `AuthDeps`.** `checkToken` is a thin closure over the same `AuthDeps` record `createAuth` already builds once (`authHeader`, `keyPromise`, `config`). No extra setup, no second key derivation, and `AuthDeps` never leaks onto a public surface. The member is the existing internal `checkAccessToken` bound to that record.
- **Reads the token from the request, routes per-session, returns the parsed payload.** `checkToken` sources the access token from the request (`Authorization: Bearer`, then `access_token` cookie) via the existing `getAccessToken`, resolves the per-session cluster URL via `resolveAuthPath`, POSTs the form-encoded introspection with the Basic header, and returns the parsed, typed payload — not a `Response`. When no access token is present on the request it throws a `RequestError` with `statusCode` 401.
- **Keeps the existing `RequestError` error policy.** Upstream 4xx propagate their status; upstream 5xx and network failures normalise to 502 (the `safeFetch` policy `checkAccessToken` already uses). This is documented as the public contract of `checkToken` — it throws `RequestError`, it does not return a `Response`.
- **Types the introspection payload.** The existing public `CheckTokenResponse` type (in `@reltio/auth/types`) is enriched in place from `Record<string, unknown>` to the typed return shape, capturing the known Reltio introspection fields (`clientId`, `expiration`, `resourceIds`, `roles`, `scopes`, `user`) while staying permissive for additional fields.
- **Non-breaking, purely additive.** Apps that only mount the router are unaffected. Apps doing direct introspection drop their hand-rolled copy and call `auth.checkToken(req, opts)`. No removed members, no mount-line edits, no `AuthConfig` change.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `auth`: adds one new requirement (the `checkToken introspection method` exposed on the adapter return values) and modifies the `Framework-agnostic helpers` requirement to note that `checkToken`, like `resolveAuthPath`, is reached through the adapter return rather than `@reltio/auth/utils`. The `createExpressAuth(config)` / `createNextAuth(config)` return values gain an additive `checkToken` member (a method on the returned `Router` for Express, a field alongside `handlers` for Next.js) — no removed members, non-breaking minor. The existing public `CheckTokenResponse` type in `@reltio/auth/types` is enriched in place from `Record<string, unknown>` to the structured introspection shape (additive — extra fields stay permissive via index signatures).

## Impact

- **Runtime code:**
  - `packages/auth/src/core/checkAccessToken.ts` — already implements the wire contract; return type tightened from `Record<string, unknown>` to the enriched `CheckTokenResponse`. No behavioural change.
  - `packages/auth/src/core/createAuth.ts` — `AuthHandler` gains a `checkToken` member; the factory binds `checkAccessToken` over the once-built `AuthDeps` record (reading the token from the request via `getAccessToken`, forwarding `opts.serviceId` / `opts.tenantId`).
  - `packages/auth/src/express/createExpressAuth.ts` — attaches `checkToken` to the returned `Router` (`Router & { resolveAuthPath; checkToken }`), same pattern as `resolveAuthPath`.
  - `packages/auth/src/next/createNextAuth.ts` — returns `checkToken` as a field next to `handlers` and `resolveAuthPath`.
  - `packages/auth/src/core/handlers/checkTokenHandler.ts` — unchanged behaviourally; may be simplified to call the bound `checkToken` path, but the router's HTTP contract (`/checkToken` → 200/401/502 `Response`) is preserved.
- **Type surface:**
  - `packages/auth/src/types/index.ts` — the existing public `CheckTokenResponse` type is enriched in place from `Record<string, unknown>` to the structured introspection shape.
  - `AuthHandler` and both adapter return types gain the additive `checkToken` member.
- **Tests:**
  - New `packages/auth/tests/express/checkToken.test.ts` / `next/checkToken.test.ts` assertions exercising the adapter-exposed `checkToken` member through the public boundary: returns the parsed payload for a 200 upstream; throws `RequestError` 401 when the request has no token and when upstream returns 4xx; throws `RequestError` 502 on upstream 5xx / network failure; routes via the verified `reltio_aurl` cookie; forwards `serviceId` / `tenantId`.
- **Storybook documentation:**
  - Extend `guides/auth/dynamic-oauth-routing.story.mdx` (or the README) with a `checkToken` usage section per runtime and a note on the `RequestError` policy (4xx propagate, 5xx/network → 502).
- **Release vehicle:** `minor` `@reltio/auth` bump. Additive only — adapter returns gain a `checkToken` member and `@reltio/auth/types` gains `CheckTokenResponse`; no public member removed, no `AuthConfig` change.
- **`@reltio/design` does not change.** This is a `@reltio/auth`-only release.
