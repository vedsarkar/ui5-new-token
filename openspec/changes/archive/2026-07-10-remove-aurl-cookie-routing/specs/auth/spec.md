## REMOVED Requirements

### Requirement: reltio_aurl cookie

**Reason:** Per-session cluster routing no longer uses a dedicated cookie. The BFF now decodes the access token's `aurl` claim and matches it against the `AuthConfig.authEnvironments` allowlist (see the modified `Dynamic OAuth cluster routing` requirement). The `reltio_aurl` cookie, the `AUTH_URL_COOKIE` constant, and the `signAurl` / `verifyAurl` primitives are deleted.

### Requirement: HMAC key derivation

**Reason:** The HMAC key existed solely to sign and verify the `reltio_aurl` cookie. With the cookie removed and routing derived from the allowlist, there is no value to sign — `deriveHmacKey`, the `keyPromise` field on `AuthDeps`, and the `reltio-auth-routing-v1:` domain-separation label are deleted. `AuthDeps` now carries the precomputed allowlist instead of a key.

## MODIFIED Requirements

### Requirement: Configuration shape

The auth factory SHALL accept a configuration object that extends the shared `AuthEnvironment` base type (`{ oauthPath: string; clientId: string; clientSecret: string }` — the primary cluster) with the following additional keys: `loginPath` (string, OPTIONAL), `ssoRedirect` (function, optional, signature `(ctx: SsoRedirectContext) => Response | Promise<Response>`), `secure` (boolean, optional, default `true`), `notenant` (boolean, optional, default `false`), and `authEnvironments` (optional array of `AuthEnvironment` — the multiauth allowlist of additional trusted clusters). The same `AuthConfig` shape is accepted by `createAuth`, `createExpressAuth`, and `createNextAuth`.

`loginPath` is required only for the interactive OAuth flow (`GET /login`, `GET /logout`, `GET /callback`), which build a Reltio Login Page URL from it. It is OPTIONAL so a standalone API service that only introspects tokens (`auth.checkToken`) or resolves the per-session cluster (`auth.resolveAuthPath`) can configure the router without it. When `loginPath` is absent, the three login-flow routes SHALL respond `500`; the introspection/routing surface SHALL be fully functional.

The three required keys (`oauthPath`, `clientId`, `clientSecret`) are enforced by TypeScript at compile time. The runtime SHALL NOT perform additional null/empty-string validation of the configuration object — consumers are responsible for validating configuration that originates from untyped sources before passing it to the factory. A malformed `oauthPath` — the primary one or any `authEnvironments[].oauthPath` — SHALL throw at construction time (fail-fast), because the allowlist is built once when the factory is called.

There SHALL be no separate factory or subpath for standalone API-service introspection: the same `createExpressAuth` / `createNextAuth` factories serve BFFs and API services, differing only in whether `loginPath` is configured and whether the router is mounted. `@reltio/auth` SHALL NOT expose a `createTokenChecker` factory, a `TokenCheckerConfig` type, or an `@reltio/auth/api` subpath.

#### Scenario: Required keys provided, loginPath present

- **WHEN** the factory is called with `{ oauthPath, loginPath, clientId, clientSecret }` and no `authEnvironments`
- **THEN** it returns a working router, uses default values for the optional keys, and routes every upstream `/checkToken` / `/refreshToken` call to `oauthPath`

#### Scenario: Introspection-only config omits loginPath

- **WHEN** the factory is called with `{ oauthPath, clientId, clientSecret }` and no `loginPath`
- **THEN** it returns a value whose `checkToken` and `resolveAuthPath` are fully functional, and no compile-time or construction-time error occurs

#### Scenario: Login-flow routes respond 500 without loginPath

- **WHEN** `GET /login`, `GET /logout`, or `GET /callback` is dispatched on a router configured without `loginPath`
- **THEN** each responds `500` and makes no upstream call

#### Scenario: TypeScript rejects missing required keys at compile time

- **WHEN** a TypeScript consumer attempts to call the factory without `oauthPath`, `clientId`, or `clientSecret`
- **THEN** the TypeScript compiler reports an error before the code can be executed

#### Scenario: Malformed authEnvironments oauthPath throws at construction

- **WHEN** the factory is called with an `authEnvironments` entry whose `oauthPath` cannot be parsed by the WHATWG `URL` parser
- **THEN** the factory throws at construction time, before any request is handled

#### Scenario: No standalone token-checker factory or subpath exists

- **WHEN** a consumer attempts `import { createTokenChecker } from "@reltio/auth/api"` or `import type { TokenCheckerConfig } from "@reltio/auth/types"`
- **THEN** module resolution fails (no `./api` subpath) and the type does not exist; API services introspect via `createExpressAuth(config).checkToken` / `createNextAuth(config).checkToken`

### Requirement: GET /callback endpoint

The router SHALL expose a `GET /callback` endpoint that exchanges the OAuth authorization code for access and refresh tokens. It SHALL validate the state parameter against the state cookie, exchange the code via `POST ${loginPath}/token` with HTTP Basic authentication (using the primary cluster's credentials), store the resulting tokens in `access_token` and `refresh_token` cookies, and finalise the response — either by invoking the optional `config.ssoRedirect` callback with a `SsoRedirectContext` and returning its `Response`, or by performing a default 302 redirect to `redirectUrl`.

The handler SHALL emit exactly two `Set-Cookie` headers on success — `access_token` and `refresh_token`. It SHALL NOT decode the access token, and SHALL NOT emit any routing cookie: per-session routing is derived on demand from the access token's `aurl` claim by later requests, not persisted at callback time.

#### Scenario: Successful callback

- **WHEN** the callback receives matching state cookie and query, a `redirectUrl`, and a `code` that the OAuth server accepts
- **THEN** the response is 302 with exactly two `Set-Cookie` headers — `access_token` and `refresh_token` — set with `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, and the `Location` header points at `redirectUrl`

#### Scenario: State mismatch

- **WHEN** the `state` query parameter differs from the `state` cookie
- **THEN** the response is 401 and no `Set-Cookie` for `access_token` or `refresh_token` is emitted

#### Scenario: Missing state cookie

- **WHEN** the `state` cookie is absent from the request
- **THEN** the response is 401

#### Scenario: Missing state query parameter

- **WHEN** the `state` query parameter is absent from the request
- **THEN** the response is 401

#### Scenario: ssoRedirect callback receives full context

- **WHEN** the configuration provides `ssoRedirect` and the authorization code exchange succeeds
- **THEN** the callback is invoked exactly once with a `SsoRedirectContext` containing `request`, `accessToken`, `refreshToken`, `redirectUrl`, and `state`; its returned `Response` becomes the HTTP response with `access_token` and `refresh_token` `Set-Cookie` headers appended by the router

#### Scenario: Default redirect when no ssoRedirect

- **WHEN** the configuration omits `ssoRedirect` and the request omits `redirectUrl`
- **THEN** the response 302 redirects to `/`

### Requirement: POST /refreshToken endpoint

The router SHALL expose a `POST /refreshToken` endpoint that exchanges the refresh token cookie for a fresh access token by calling `POST ${upstreamRoot}/token` with `grant_type=refresh_token` and HTTP Basic authentication, where `${upstreamRoot}` and the Basic credential are resolved per-request from the access token's `aurl` claim matched against the allowlist (falling back to the primary cluster when the token is absent, undecodable, or its `aurl` is not in the allowlist). On success, the endpoint SHALL update both the `access_token` and `refresh_token` cookies and respond 201 with an empty body. On absence of a refresh token cookie or upstream rejection, the endpoint SHALL respond 401.

The handler SHALL resolve the cluster via `selectAuthServiceForRequest(allowlist, request)` — reading the access token from the request, decoding its `aurl`, and selecting the matching allowlist entry (or the primary). It SHALL NOT read or emit any routing cookie, and SHALL NOT re-mint or clear one after a successful refresh — the refreshed token is routed on its next request the same way, by decoding its own `aurl`.

The refreshed `access_token` and `refresh_token` cookies SHALL be emitted with identical cookie options (co-terminal lifetime); the `access_token` cookie SHALL NOT be capped with a `Max-Age` derived from the upstream `expires_in`. Because the refresh token is opaque and carries no `aurl`, the access token cookie is the sole routing hint for the next `POST /refreshToken`; capping it shorter than the refresh cookie would strand a secondary-cluster session on the primary once the access cookie lapsed. The access token's own `exp` still governs when the client triggers a refresh.

#### Scenario: Successful refresh routes to the cluster named by the token aurl

- **WHEN** the request carries a valid `refresh_token` cookie and an `access_token` cookie whose `aurl` claim equals an allowlisted additional cluster's origin
- **THEN** the upstream `fetch` call targets that cluster's `/oauth/token`, authenticated with that cluster's Basic credential, not the primary `oauthPath`

#### Scenario: Successful refresh falls back to the primary when the token has no allowlisted aurl

- **WHEN** the request carries a valid `refresh_token` cookie and an access token whose `aurl` is absent or not in the allowlist
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/token` with the primary Basic credential

#### Scenario: Successful refresh updates access and refresh cookies

- **WHEN** the request carries a `refresh_token` cookie that the OAuth server accepts
- **THEN** the response is 201, both `access_token` and `refresh_token` cookies are replaced with identical (co-terminal) cookie options, neither cookie carries a `Max-Age` derived from the upstream `expires_in`, and no routing cookie is emitted

#### Scenario: No refresh token cookie

- **WHEN** the request has no `refresh_token` cookie
- **THEN** the response is 401 and no upstream call is made

#### Scenario: Upstream rejects refresh token

- **WHEN** the OAuth server returns 4xx for the refresh request
- **THEN** the response is 401 and no `Set-Cookie` for `access_token` or `refresh_token` is emitted

### Requirement: POST /checkToken endpoint

The router SHALL expose a `POST /checkToken` endpoint that validates the access token and returns user and permission data. It SHALL read the access token from the `Authorization: Bearer` header if present, otherwise from the `access_token` cookie. It SHALL call `POST ${upstreamRoot}/checkToken` with optional `serviceId` and `tenantId` query parameters propagated from the request, where `${upstreamRoot}` and the Basic credential are resolved per-request from the access token's `aurl` claim matched against the allowlist (falling back to the primary cluster on any miss). It SHALL return the upstream JSON response with HTTP 200. On absence of an access token it SHALL respond 401.

Routing is derived from the same access token the endpoint introspects: the handler decodes the token's `aurl` claim and selects the matching allowlist entry. Because `aurl` can only ever select a pre-configured cluster, a forged `aurl` cannot steer the upstream call to an arbitrary origin — the worst case is selecting an already-trusted cluster or falling back to the primary.

#### Scenario: Token validation routes to the cluster named by the token aurl

- **WHEN** the request carries an `access_token` whose `aurl` claim equals an allowlisted additional cluster's origin
- **THEN** the upstream `fetch` call targets that cluster's `/oauth/checkToken` with that cluster's Basic credential

#### Scenario: Token validation falls back to the primary when the aurl is not allowlisted

- **WHEN** the request carries an `access_token` whose `aurl` claim is absent or not present in the allowlist
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken` with the primary Basic credential

#### Scenario: Forged aurl can only select an allowlisted cluster

- **WHEN** the request carries an `access_token` whose payload has been tampered to claim `"aurl": "https://attacker.example.com"`, which is not in the allowlist
- **THEN** the upstream `fetch` call targets `${config.oauthPath}/checkToken`, never `https://attacker.example.com`

#### Scenario: Token validation succeeds

- **WHEN** the request carries a valid `access_token` and the OAuth server returns 200 with a JSON body
- **THEN** the response is 200 with the same JSON body

#### Scenario: Bearer header takes precedence over cookie

- **WHEN** the request carries both an `Authorization: Bearer X` header and an `access_token` cookie with a different value
- **THEN** the upstream call uses the header token

#### Scenario: serviceId and tenantId forwarded

- **WHEN** the request carries query parameters `serviceId=svc&tenantId=t1`
- **THEN** the upstream call is made with the same query parameters appended to the resolved upstream URL

#### Scenario: No access token

- **WHEN** the request has neither `Authorization` header nor `access_token` cookie
- **THEN** the response is 401 and no upstream call is made

### Requirement: GET /logout endpoint

The router SHALL expose a `GET /logout` endpoint that clears authentication cookies and redirects to the Reltio Login Page logout URL. Clearing SHALL use the same cookie options used when setting. The cookies cleared SHALL be `access_token`, `refresh_token`, and `state` — three `Set-Cookie` headers, one per cookie. There is no routing cookie to clear.

The handler SHALL NOT make any upstream call to an Auth Server cluster. Logout is pure cookie cleanup; routing is irrelevant after the user has logged out.

The endpoint SHALL resolve the **return URL** and the **tenant** from the same source hierarchy as `GET /login`: the request's `?returnTo=` and `?tenant=` query parameters take precedence over the `Referer` header. An empty or whitespace-only `?tenant=` SHALL be treated as absent. The endpoint SHALL respond `400` only when both the request's `?returnTo=` query parameter and the `Referer` header are missing. When both an explicit `?returnTo=` and a `Referer` are present, the endpoint SHALL assert `new URL(returnTo).origin === refererUrl.origin`; a mismatch SHALL produce `400 returnTo origin does not match Referer origin`, no cookies SHALL be cleared, and no redirect SHALL be issued.

#### Scenario: Logout clears the three auth cookies

- **WHEN** a browser issues `GET /logout` with a same-origin `Referer` header and carrying `access_token`, `refresh_token`, and `state` cookies
- **THEN** the response contains `Set-Cookie` headers that clear `access_token`, `refresh_token`, and `state` (`Max-Age=0`, empty value) with `HttpOnly`, `Secure` (when `secure: true`), `SameSite=Lax`, and `Path=/` matching the original set, and no `reltio_aurl` cookie is referenced

#### Scenario: Logout makes no upstream call

- **WHEN** the logout handler runs
- **THEN** no `fetch` call is made to any Auth Server cluster URL

#### Scenario: Logout redirects via login page logout URL

- **WHEN** logout is invoked with a same-origin `Referer` header
- **THEN** the response is 302 to `${loginPath}/logout?redirectUrl=...`

#### Scenario: New state cookie issued for subsequent login

- **WHEN** logout is invoked with a same-origin `Referer` header
- **THEN** the response sets a fresh `state` cookie so the user can immediately re-authenticate

#### Scenario: Logout responds 400 when neither query nor Referer supplies returnTo

- **WHEN** the request URL is `GET /logout` (no `?returnTo=`) and no `Referer` header is supplied
- **THEN** the response is `400`, no cookies are cleared, and no redirect is issued

### Requirement: Cookie attributes

All cookies set by the router SHALL be `HttpOnly`. The `access_token` and `refresh_token` cookies SHALL additionally be `SameSite=Lax` and `Path=/`. The `state` cookie SHALL be `SameSite=Lax`, `Path=/`. When the configuration sets `secure: true`, all three cookies SHALL also carry the `Secure` flag. Cookies SHALL be cleared with the identical option vector used at set time. The router SHALL set no routing cookie.

#### Scenario: Secure mode default

- **WHEN** the configuration omits `secure`
- **THEN** all three cookies (`access_token`, `refresh_token`, `state`) are set with the `Secure` flag (default is `true`)

#### Scenario: Insecure mode

- **WHEN** the configuration sets `secure: false`
- **THEN** all three cookies are set without the `Secure` flag

#### Scenario: Clear cookie matches set cookie

- **WHEN** the router clears any cookie it previously set
- **THEN** the `Set-Cookie` header used for clearing carries the same `HttpOnly`, `Secure`, `SameSite`, and `Path` as the original set

### Requirement: Dynamic OAuth cluster routing

The router SHALL route `POST /checkToken` and `POST /refreshToken` upstream calls per-request to the Auth Server cluster identified by the access token's `aurl` claim, matched against the operator-configured allowlist, falling back to `AuthConfig.oauthPath` (the primary cluster) whenever the token is absent, undecodable, carries no `aurl` claim, or carries an `aurl` that is not in the allowlist.

The allowlist SHALL be built once at `createAuth(config)` time by `buildAllowlist(config)` into a `ResolvedAuthService[]` — the primary cluster (the top-level `oauthPath` + primary credentials) at index 0, followed by each `authEnvironments` entry (its `oauthPath` origin + its own precomputed Basic credential). Origin matching SHALL be trailing-slash insensitive and compared by WHATWG-`URL` origin. When an additional environment duplicates the primary origin, the primary (earlier) entry's credentials SHALL win.

Routing SHALL be owned by shared core functions: `selectAuthService(allowlist, accessToken)` selects the entry for a decoded token, and `selectAuthServiceForRequest(allowlist, request)` reads the access token from the request (via `getAccessToken`) and delegates to `selectAuthService`, returning the primary when no token is present. Both the BFF handlers and the adapter-exposed `resolveAuthPath` read from this one implementation. The `aurl` claim SHALL NEVER be used to construct an outbound origin that is not present in the allowlist.

Because the routing source (the access token's `aurl`) is the very token being introspected or refreshed, and because `aurl` can only select a pre-configured cluster, there is no separate trusted routing input to keep in sync and no SSRF surface: a forged `aurl` resolves to either an already-trusted cluster or the primary fallback.

#### Scenario: Routing uses the token aurl when it matches an allowlist entry

- **WHEN** `POST /checkToken` is dispatched with an access token whose `aurl` equals an allowlisted additional cluster's origin
- **THEN** the upstream `fetch` targets that cluster's `/oauth/checkToken` with that cluster's Basic credential

#### Scenario: Routing falls back to the primary when the token has no aurl

- **WHEN** `POST /checkToken` is dispatched with an access token that carries no `aurl` claim
- **THEN** the upstream `fetch` targets `${config.oauthPath}/checkToken` with the primary credential

#### Scenario: Routing falls back to the primary for an undecodable token

- **WHEN** `POST /checkToken` is dispatched with an opaque or malformed access token that cannot be decoded
- **THEN** the upstream `fetch` targets `${config.oauthPath}/checkToken`, and the handler does not throw on the decode failure

#### Scenario: A non-allowlisted aurl is never contacted

- **WHEN** `POST /checkToken` is dispatched with an access token whose `aurl` is `https://attacker.example.com`, not present in the allowlist
- **THEN** no request is ever made to `https://attacker.example.com`; the call targets `${config.oauthPath}/checkToken`

#### Scenario: Routing applies identically to POST /refreshToken

- **WHEN** `POST /refreshToken` is dispatched with an access token whose `aurl` matches an allowlisted additional cluster
- **THEN** the upstream `/token` call targets that cluster's `/oauth/token` with that cluster's Basic credential

### Requirement: resolveAuthPath resolver

The value returned by `createExpressAuth(config)` and `createNextAuth(config)` SHALL expose `resolveAuthPath: (request: AnyRequest) => Promise<string>` as the sole public API for resolving the per-session Auth Server cluster URL. This is the recommended (and only) way for applications to learn the cluster URL the BFF would route to for the same session, so apps that call Auth Server APIs directly (bypassing the BFF) route to the same cluster. The Express adapter SHALL attach it to the returned `Router`; the Next.js adapter SHALL return it as a field alongside `handlers`.

`resolveAuthPath` SHALL be the **same** resolution the router uses internally: it reads the allowlist built once in `createAuth`. The internal implementation SHALL be a pure function `resolveAuthPath(options: AuthDeps & { request: AnyRequest }): Promise<string>` in `src/core/resolveAuthPath.ts`; the adapter member is a thin closure `(request) => resolveAuthPath({ ...deps, request })`.

`resolveAuthPath` SHALL:

1. Call `selectAuthServiceForRequest(allowlist, request)` — read the access token from the request, decode its `aurl`, and select the matching allowlist entry (or the primary on any miss).
2. Return `${service.origin}${OAUTH_BASE_PATH}` where `OAUTH_BASE_PATH` is the fixed `"/oauth"` Reltio Auth Service contract path — NOT derived from `config.oauthPath`. The selected entry's origin plus the contract path means `${resolved}/checkToken` is well-formed on both the matched and fallback branches.

`config.clientSecret` SHALL NOT be re-read on the per-request path — the allowlist already carries every precomputed Basic credential. `createAuth` SHALL NOT memoise across calls; each invocation produces an independent `AuthDeps` record. Callers SHOULD build the auth value once at server boot and reuse `resolveAuthPath`.

#### Scenario: resolveAuthPath is exposed on the adapter return

- **WHEN** `const auth = createExpressAuth(config)` (or `createNextAuth(config)`) is called
- **THEN** `auth.resolveAuthPath` is a function with signature `(request: AnyRequest) => Promise<string>`

#### Scenario: resolver returns the allowlisted cluster origin plus the fixed /oauth base path

- **WHEN** the resolver is called with a request whose access token's `aurl` matches an allowlisted cluster `https://auth-idev-02.reltio.com`
- **THEN** the resolver returns `"https://auth-idev-02.reltio.com/oauth"` — the matched origin plus the hardcoded `/oauth` base path

#### Scenario: resolver falls back to the primary oauthPath origin on any routing miss

- **WHEN** the resolver is called with a request that has no access token, or whose token has no `aurl`, is undecodable, or carries an `aurl` not in the allowlist
- **THEN** in each case the resolver returns `${new URL(config.oauthPath).origin}/oauth` and does not throw

#### Scenario: resolver reads the token from a Bearer header or the access_token cookie

- **WHEN** the resolver is called with the token supplied via `Authorization: Bearer` in one call and via the `access_token` cookie in another, both carrying the same allowlisted `aurl`
- **THEN** both calls resolve to the same allowlisted cluster URL

#### Scenario: resolver is not exported from @reltio/auth/utils

- **WHEN** a consumer attempts `import { resolveAuthPath } from "@reltio/auth/utils"`
- **THEN** module resolution does not provide the name (the resolver is reached only through the adapter return value)

#### Scenario: Internal routing helpers are not exported

- **WHEN** a consumer attempts `import { selectAuthService, buildAllowlist, checkAccessToken } from "@reltio/auth/utils"` or from any other public subpath
- **THEN** TypeScript reports an error and the runtime imports resolve to `undefined`

### Requirement: Framework-agnostic helpers

The `@reltio/auth/utils` entry SHALL export three functions:

- `getAccessToken(request)` — reads the access token from `Authorization: Bearer` (case-insensitive), then from the `access_token` cookie. Returns the token string or `null`.
- `getRefreshToken(request)` — reads the refresh token from the `refresh_token` cookie. Returns the token string or `null`.
- `getBasicToken(clientId, clientSecret)` — returns the base64-encoded `clientId:clientSecret` string suitable for HTTP Basic authentication.

The per-session routing resolver is NOT exported from `@reltio/auth/utils`; it is exposed as `resolveAuthPath` on the value returned by `createExpressAuth(config)` / `createNextAuth(config)` (see the `resolveAuthPath resolver` requirement), so it shares the router's once-built allowlist.

Both request-accepting helpers (`getAccessToken`, `getRefreshToken`) — and the adapter-exposed `resolveAuthPath` — SHALL accept Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly through runtime detection of the request shape (the `AnyRequest` internal type). Helpers SHALL NOT mutate the request argument.

#### Scenario: getAccessToken with Express request and Bearer header

- **WHEN** called with an Express request whose `headers.authorization` is `Bearer abc`
- **THEN** returns `"abc"`

#### Scenario: getAccessToken with Web Request and cookie

- **WHEN** called with a Web `Request` whose `Cookie` header includes `access_token=xyz`
- **THEN** returns `"xyz"`

#### Scenario: getAccessToken returns null when no token

- **WHEN** called with a request that has neither a Bearer header nor an `access_token` cookie
- **THEN** returns `null`

#### Scenario: getBasicToken encoding

- **WHEN** called with `clientId="test"` and `clientSecret="secret"`
- **THEN** returns `"dGVzdDpzZWNyZXQ="`

#### Scenario: Helpers do not mutate the request

- **WHEN** any helper is called with a request argument
- **THEN** the request's `headers`, `cookies`, and own properties are unchanged after the call returns

#### Scenario: adapter-exposed resolveAuthPath returns a working per-request resolver

- **WHEN** `const auth = createExpressAuth(config); await auth.resolveAuthPath(request)` is called with a request whose access token carries an allowlisted `aurl`
- **THEN** the matched cluster URL is returned (see the `resolveAuthPath resolver` requirement for the full scenario set)
