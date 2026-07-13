# auth Specification

## Purpose
TBD - created by archiving change add-auth-proxy-endpoint. Update Purpose after archive.
## Requirements
### Requirement: Package distribution

The `@reltio/auth` package SHALL be published to the public npm registry from `packages/auth/` in the `reltio-design` monorepo. Its `package.json` `exports` field SHALL declare exactly four subpath entries — `./types`, `./express`, `./next`, `./utils` — and no `.` entry. Consumers SHALL always import from a subpath; the bare `@reltio/auth` import SHALL fail to resolve. This matches the mandatory subpath-imports convention already enforced by `@reltio/design`.

The `./types` subpath exposes type-only exports (`AuthConfig`, `SsoRedirect`, `SsoRedirectContext`, `TokenResponse`, `CheckTokenResponse`). The framework-agnostic core router (`createAuth`) is internal — adapters use it directly from `src/core/`, but it is NOT reachable from any public subpath.

#### Scenario: Public subpath imports resolve

- **WHEN** a consumer imports from `@reltio/auth/types`, `@reltio/auth/express`, `@reltio/auth/next`, or `@reltio/auth/utils`
- **THEN** module resolution succeeds and the documented exports are available with TypeScript types

#### Scenario: Core runtime is not reachable

- **WHEN** a consumer attempts `import { createAuth } from "@reltio/auth/types"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined` — `createAuth` is internal to the package

#### Scenario: Bare package import is not exposed

- **WHEN** a consumer attempts `import x from "@reltio/auth"` (no subpath)
- **THEN** module resolution fails with an `ERR_PACKAGE_PATH_NOT_EXPORTED` error

#### Scenario: Internal paths are not reachable

- **WHEN** a consumer attempts to import from `@reltio/auth/src/...` or `@reltio/auth/dist/...` or any path other than the four documented subpaths
- **THEN** module resolution fails with an `ERR_PACKAGE_PATH_NOT_EXPORTED` error

#### Scenario: No OAuth client subpath exposed

- **WHEN** a consumer attempts `import { createOAuthClient } from "@reltio/auth/oauth-client"` or any similar path
- **THEN** module resolution fails (no such subpath is exposed in v1)

### Requirement: Build output

The package SHALL ship dual ESM and CJS builds. Every public subpath SHALL resolve to both an ESM and a CJS file, plus a `.d.ts` declaration. The Node engine requirement SHALL be `>=20`.

#### Scenario: ESM consumer imports

- **WHEN** a Next.js application with `"type": "module"` imports any public subpath
- **THEN** Node loads the ESM build

#### Scenario: CJS consumer requires

- **WHEN** an Express application with `"type": "commonjs"` requires any public subpath
- **THEN** Node loads the CJS build

#### Scenario: TypeScript consumption

- **WHEN** a TypeScript consumer imports from any public subpath
- **THEN** the TypeScript compiler resolves complete type definitions for every export

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

### Requirement: GET /login endpoint

The router SHALL expose a `GET /login` endpoint that initiates the OAuth Authorization Code flow. It SHALL generate a CSRF state token, store it in a `state` cookie, and redirect (HTTP 302) the browser to the Reltio Login Page with `client_id`, `redirect_uri`, and any `tenant` or `notenant` parameter set.

The endpoint SHALL resolve two values — the **return URL** (used as the callback's `redirectUrl` query parameter and ultimately as the post-login destination) and the **tenant** (used as the Login Page's `tenant` query parameter) — from the following sources, in order:

1. The request's own query parameters: `?returnTo=<absolute-url>` for the return URL, `?tenant=<non-empty-string>` for the tenant. An empty or whitespace-only `?tenant=` value SHALL be treated as absent.
2. The `Referer` header URL, parsed via the WHATWG URL parser, with the `href` providing the return URL and `searchParams.get("tenant")` providing the tenant.

The endpoint SHALL respond `400` only when **both** the request's `?returnTo=` query parameter and the `Referer` header are missing. A malformed `Referer` header SHALL be treated as absent when `?returnTo=` is supplied, and SHALL produce `400 Malformed Referer header` only when `?returnTo=` is also absent.

When **both** an explicit `?returnTo=` and a `Referer` header are present, the endpoint SHALL assert that `new URL(returnTo).origin === refererUrl.origin`. A mismatch SHALL produce `400 returnTo origin does not match Referer origin`, no `state` cookie SHALL be set, and no redirect to the Login Page SHALL be issued. When `?returnTo=` is supplied alone (no `Referer`), the endpoint SHALL NOT perform a BFF-side same-origin check — the Reltio OAuth server's `redirect_uri` allowlist for the `client_id` SHALL be the authoritative protection against open-redirect attacks in this path.

The OAuth `redirect_uri` query parameter sent to the Login Page SHALL be built from a client-supplied origin plus the BFF's own pathname: the **origin** SHALL come from `new URL(returnTo).origin` when `?returnTo=` is supplied, otherwise from `refererUrl.origin` (the legacy referer-fallback path); the **pathname** SHALL come from `new URL(request.url).pathname.replace(/login$/, "callback")` in both paths. The endpoint SHALL NOT use `new URL(request.url).origin` (the request's scheme/host/port) when building the OAuth `redirect_uri`, because the platform's reverse-proxy chain rewrites those values and they do not reflect the public origin the browser sees.

When `secure: true` (the default), the resolved return URL's `protocol` SHALL be forced to `https:` before being threaded into the callback URL's `redirectUrl` query parameter.

#### Scenario: Plain login with Referer fallback

- **WHEN** a browser issues `GET /login` with a `Referer` header pointing at the consumer's origin and no `?returnTo=` query parameter
- **THEN** the response is 302 with a `Location` header pointing at `${loginPath}/`, query parameters `client_id` and `redirect_uri`, and a `Set-Cookie` for `state` with `HttpOnly`, `Secure`, and `SameSite=Lax`

#### Scenario: Login with tenant in referer

- **WHEN** the `Referer` header includes `?tenant=acme` and no `?tenant=` query parameter is supplied on the request
- **THEN** the redirect URL also carries `&tenant=acme`

#### Scenario: Login with explicit tenant query parameter

- **WHEN** the request URL is `GET /login?tenant=acme&returnTo=https://app.example.com/hub/acme/dashboard` and the `Referer` header is absent
- **THEN** the response is 302, the redirect URL carries `&tenant=acme`, and the OAuth callback URL's `redirectUrl` query parameter equals `https://app.example.com/hub/acme/dashboard`

#### Scenario: Explicit tenant query overrides referer tenant

- **WHEN** the request URL is `GET /login?tenant=acme` and the `Referer` is `https://app.example.com/?tenant=other`
- **THEN** the redirect URL carries `&tenant=acme` (the explicit query parameter wins)

#### Scenario: Empty tenant query falls back to referer

- **WHEN** the request URL is `GET /login?tenant=` (empty value) and the `Referer` is `https://app.example.com/?tenant=acme`
- **THEN** the redirect URL carries `&tenant=acme`

#### Scenario: Explicit returnTo with no Referer

- **WHEN** the request URL is `GET /login?returnTo=https://app.example.com/hub/acme/dashboard` and no `Referer` header is supplied
- **THEN** the response is 302 and the OAuth callback URL's `redirectUrl` query parameter equals `https://app.example.com/hub/acme/dashboard`

#### Scenario: Explicit returnTo with malformed Referer

- **WHEN** the request URL is `GET /login?returnTo=https://app.example.com/dashboard&tenant=acme` and the `Referer` header is a malformed URL string
- **THEN** the response is 302 (the malformed `Referer` is ignored because `?returnTo=` and `?tenant=` cover both sources)

#### Scenario: Login with notenant flag

- **WHEN** the configuration sets `notenant: true`
- **THEN** the redirect URL carries `&notenant=true`

#### Scenario: Login with secure flag forces https on returnTo

- **WHEN** the configuration sets `secure: true` and the resolved return URL uses the `http` scheme
- **THEN** the OAuth callback URL's `redirectUrl` query parameter uses the `https` scheme

#### Scenario: Login responds 400 when neither query nor Referer supplies returnTo

- **WHEN** the request URL is `GET /login` (no `?returnTo=` query parameter) and no `Referer` header is supplied
- **THEN** the response is `400` with the body `Missing returnTo query parameter or Referer header` and no `state` cookie is set

#### Scenario: Login responds 400 when explicit returnTo origin differs from Referer origin

- **WHEN** the request URL is `GET /login?returnTo=https://evil.example.com/` and the `Referer` header is `https://app.example.com/dashboard`
- **THEN** the response is `400` with the body `returnTo origin does not match Referer origin`, no `state` cookie is set, and no redirect to the Login Page is issued

#### Scenario: Login forwards single-source returnTo without same-origin check

- **WHEN** the request URL is `GET /login?returnTo=https://app.example.com/dashboard` and no `Referer` header is supplied
- **THEN** the response is 302 to the Login Page with the OAuth `redirect_uri` carrying origin `https://app.example.com`; no BFF-side same-origin check is performed (the Reltio OAuth server's `redirect_uri` allowlist is the authoritative protection in this path)

#### Scenario: OAuth callback URL origin comes from returnTo on the explicit path

- **WHEN** `GET /login?returnTo=https://app.example.com/hub/acme/dashboard` arrives at the BFF (which the BFF's process sees as `http://localhost:3000/api/auth/login` after the reverse-proxy chain), with no `Referer`
- **THEN** the OAuth `redirect_uri` parameter sent to the Login Page has origin `https://app.example.com` (from `returnTo`), not `http://localhost:3000` (from `request.url`); the path is `/api/auth/callback` (from `request.url.pathname`)

#### Scenario: OAuth callback URL origin comes from Referer on the legacy fallback path

- **WHEN** `GET /login` arrives with no `?returnTo=` query parameter and a `Referer` of `https://app.example.com/dashboard`
- **THEN** the OAuth `redirect_uri` parameter sent to the Login Page has origin `https://app.example.com` (from `refererUrl.origin`), preserving the v1 behaviour byte-for-byte

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

### Requirement: Cache-control headers

The router SHALL emit `Cache-Control: no-store, no-cache, max-age=0, must-revalidate, private` and `Pragma: no-cache` headers on every response from the five endpoints, to prevent intermediate caches from storing authentication state.

#### Scenario: Cache control on every endpoint

- **WHEN** any of `/login`, `/logout`, `/callback`, `/refreshToken`, or `/checkToken` responds (success or error)
- **THEN** both `Cache-Control` and `Pragma` headers are present with the specified values

### Requirement: Upstream error propagation

The router SHALL distinguish authentication failures (401) from upstream OAuth server failures. When the OAuth server returns 5xx, the router SHALL respond 502 with an empty body. When the OAuth server is unreachable (network error), the router SHALL respond 502. When the OAuth server returns 4xx for token-exchange operations (`/callback`, `/refreshToken`, `/checkToken`), the router SHALL respond 401 (authentication failed) with an empty body. Upstream error details (status, body) SHALL NOT be leaked to the client.

#### Scenario: OAuth server 500 on refresh

- **WHEN** `POST /refreshToken` triggers an upstream call that returns 500
- **THEN** the response is 502 (not 401)

#### Scenario: OAuth server unreachable

- **WHEN** the upstream `fetch` rejects with a network error
- **THEN** the response is 502

#### Scenario: OAuth server 400 on refresh

- **WHEN** the upstream returns 400 because the refresh token is rejected
- **THEN** the response is 401

### Requirement: Express adapter

The `@reltio/auth/express` entry SHALL export a `createExpressAuth(config)` function that returns an Express `Router`. The router SHALL mount the five endpoints under its own root. `config` is an `AuthConfig` — the same shape as the Next.js adapter accepts.

#### Scenario: Behavioural drop-in for auth-middleware (URLs, cookies, responses)

- **WHEN** a consumer replaces `import auth from "auth-middleware"` with `import { createExpressAuth } from "@reltio/auth/express"`, swaps the factory call, and updates the `ssoRedirect` callback to the new Web-API signature
- **THEN** every endpoint behaves identically to the legacy library at the network level (same URLs, same cookies, same response codes, same response bodies)

#### Scenario: Express adapter shares the ssoRedirect signature with Next.js

- **WHEN** a consumer passes `ssoRedirect: ({ redirectUrl }) => Response.redirect(redirectUrl, 302)` to `createExpressAuth`
- **THEN** the callback is invoked with a `SsoRedirectContext` and its returned `Response` becomes the HTTP response — the exact same behaviour as the Next.js adapter

### Requirement: Next.js App Router adapter

The `@reltio/auth/next` entry SHALL export a `createNextAuth(config)` function that returns `{ handlers: { GET, POST } }` where each handler accepts a `NextRequest` and returns a `Promise<Response>`. The handlers SHALL route requests to the appropriate endpoint based on the URL path segment after the mount point. `config` is an `AuthConfig` — the same shape as the Express adapter accepts.

#### Scenario: App Router catch-all route

- **WHEN** a consumer creates `app/auth/[...auth]/route.ts` with `export const { GET, POST } = createNextAuth(config).handlers`
- **THEN** requests to `/auth/login`, `/auth/callback`, etc. are routed to the corresponding endpoint

### Requirement: No Next.js Pages Router adapter in v1

The package SHALL NOT export a `createNextPagesAuth` function or any other Pages-Router-specific adapter. Consumers on the Next.js Pages Router SHALL integrate through `@reltio/auth/express` running on a custom Express server.

#### Scenario: createNextPagesAuth is not importable

- **WHEN** a consumer attempts `import { createNextPagesAuth } from "@reltio/auth/next"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined`

#### Scenario: Pages Router consumers documented to use Express adapter

- **WHEN** an AI agent queries setup guidance for a Pages Router application through the Reltio Design MCP
- **THEN** the response points the consumer to `@reltio/auth/express` on a custom Express server, not to any Next.js adapter

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

### Requirement: No public OAuth client surface in v1 (BREAKING)

The package SHALL NOT expose a `createOAuthClient`, `clientCredentialsLogin`, password-grant `login`, or any other public function that performs direct OAuth API calls outside the BFF router endpoints. The OAuth HTTP logic the router needs (authorization code exchange, refresh, introspection) is internal to `src/core/oauthClient.ts` (the pure `exchangeCode` / `refreshAccessToken` / `checkAccessToken` functions) and not reachable through any public subpath.

#### Scenario: createOAuthClient is not importable

- **WHEN** a consumer attempts `import { createOAuthClient } from "@reltio/auth/types"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined`

#### Scenario: clientCredentialsLogin is not importable

- **WHEN** a consumer attempts `import { clientCredentialsLogin } from "@reltio/auth/types"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined`

#### Scenario: Migration story documents the deliberate non-migration

- **WHEN** an AI agent reads the Migration story
- **THEN** the story explicitly states that `node-oauth-provider` direct consumers are not provided a `@reltio/auth` migration target in v1, recommends reworking such integrations through the BFF router, and notes that the legacy `node-oauth-provider` git package remains installable but unmaintained

### Requirement: No signing middleware in v1 (BREAKING)

The `@reltio/auth/utils` entry SHALL NOT export a `signingHandler`, `createSigningHandler`, or any other middleware that mutates the incoming request to add an `Authorization` header. Consumers that need to forward the access token to an upstream Reltio API SHALL read the token explicitly with `getAccessToken(req)` and apply it to their outgoing request themselves.

#### Scenario: signingHandler import fails

- **WHEN** a consumer attempts `import { createSigningHandler } from "@reltio/auth/utils"` or `import signingHandler from "@reltio/auth/signingHandler"`
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined`

#### Scenario: Migration story documents the breaking change

- **WHEN** an AI agent reads the Migration story
- **THEN** the story explicitly lists the removal of `signingHandler`, explains the rationale, and shows the recommended replacement pattern using `getAccessToken` plus an explicit outgoing-request header assignment

### Requirement: No console logging

The package SHALL NOT emit any output to `console.log`, `console.info`, `console.warn`, `console.error`, or `process.stdout`/`stderr` during normal operation. Errors are surfaced through thrown errors or HTTP responses, never through console output.

#### Scenario: Silent operation across all endpoints

- **WHEN** the package source files are scanned
- **THEN** no calls to `console.log`, `console.info`, `console.warn`, `console.error`, or `process.stdout`/`stderr` are present

### Requirement: No external git dependencies

The package's runtime dependencies SHALL all be published on the public npm registry. No git-protocol dependencies, no Bitbucket references, no `node-oauth-provider`, no `node-fetch`.

#### Scenario: All runtime deps from npm

- **WHEN** `package.json` is inspected
- **THEN** every entry under `dependencies` is a valid npm package specifier with a SemVer range

### Requirement: Native fetch and Web Crypto

The package SHALL use `globalThis.fetch` for all upstream HTTP calls and `globalThis.crypto.randomUUID()` for state generation, with no Node-specific fallbacks.

#### Scenario: Core has no Node-only imports

- **WHEN** the core source files are scanned
- **THEN** none of them imports `node:crypto`, `node:buffer`, `node-fetch`, or any other Node-only module

### Requirement: Storybook documentation

The package SHALL ship four Storybook MDX stories:

- `packages/auth/README.story.mdx` — overview, install, quick start (rendered from `packages/auth/README.md`). No explicit `Meta` title — Storybook auto-titles the page from the file path (`packages/auth/README`), matching the `@reltio/design` convention.
- `guides/auth/Setup.Express.story.mdx` (`<Meta title="Guides/Auth/Setup Express" />`) — Express setup walkthrough with runnable examples.
- `guides/auth/Setup.NextAppRouter.story.mdx` (`<Meta title="Guides/Auth/Setup Next.js App Router" />`) — App Router setup walkthrough.
- `guides/auth/Migration.FromAuthMiddleware.story.mdx` (`<Meta title="Guides/Auth/Migration from auth-middleware" />`) — import-path mapping, three breaking changes, before/after migration patterns.

Stories SHALL use `/auth/` as the canonical mount path in examples and explicitly note that consumers may mount the router on any path. There SHALL be no setup story for the Next.js Pages Router: v1 does not ship a Pages Router adapter, and Pages Router applications integrate through `@reltio/auth/express` on a custom Express server.

#### Scenario: Stories appear in Storybook navigation

- **WHEN** Storybook is built or run in dev mode
- **THEN** the README story appears under `packages/auth/README` (its auto-title) and the three setup/migration guides appear nested under the top-level `Guides/Auth/` group

#### Scenario: Migration story documents every legacy import path

- **WHEN** an AI agent queries the Migration story through the Reltio Design MCP
- **THEN** the response contains the mapping `auth-middleware → @reltio/auth/express`, `auth-middleware/src/utils/getAccessToken → @reltio/auth/utils`, `auth-middleware/src/utils/getBasicToken → @reltio/auth/utils`, `auth-middleware/utils/getAccessToken → @reltio/auth/utils`, and the explicit removal note for `auth-middleware/signingHandler` with the replacement pattern using `getAccessToken` and manual header assignment on the outgoing request

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

