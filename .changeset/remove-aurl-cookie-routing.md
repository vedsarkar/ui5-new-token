---
"@reltio/auth": minor
---

Route per-session cluster from the access token's `aurl` claim (matched against an allowlist) and drop the internal `reltio_aurl` routing cookie.

The BFF router previously derived per-session cluster routing from a dedicated HMAC-signed `reltio_aurl` cookie minted at `GET /callback`. That cookie and its entire HMAC subsystem (`signAurl` / `verifyAurl` / `deriveHmacKey`, the `AUTH_URL_COOKIE` constant, and the `base64urlEncode` primitive) are gone. `POST /checkToken`, `POST /refreshToken`, and the adapter-exposed `resolveAuthPath` now resolve the upstream cluster by decoding the access token's `aurl` claim and matching it against the operator-configured allowlist (the primary `oauthPath` plus the new `AuthConfig.authEnvironments`), falling back to the primary cluster for an absent/undecodable/non-allowlisted `aurl`. A forged `aurl` can still only ever *select* a pre-configured cluster, so the model is SSRF-safe without signing.

This also unifies token introspection on the same mechanism: standalone API services introspect via `createExpressAuth(config).checkToken` / `createNextAuth(config).checkToken`, and `AuthConfig.loginPath` becomes optional so one factory serves both BFFs and introspection-only API services (`/login`, `/logout`, `/callback` respond `500` when it is absent).

For published consumers this is net-additive — existing single-cluster deployments keep working with no config change (every request resolves to `oauthPath`):

- `AuthConfig` now extends the shared `AuthEnvironment` type (`{ oauthPath, clientId, clientSecret }`) and gains an optional `authEnvironments: AuthEnvironment[]` allowlist. Configure it to route to non-primary clusters; omit it and every request resolves to `oauthPath`.
- `AuthConfig.loginPath` is now optional (required only for the interactive `/login`, `/logout`, `/callback` flow).
- The public adapter surface (`createExpressAuth` / `createNextAuth` return shape, `resolveAuthPath`, `checkToken`) is unchanged in signature; only the routing mechanism behind it changed.
- The `reltio_aurl` cookie was `HttpOnly` and never public API; the BFF now sets exactly two auth cookies (`access_token`, `refresh_token`) plus the CSRF `state` cookie.
