## ADDED Requirements

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

The auth factory SHALL accept a configuration object with the following keys: `oauthPath` (string, required), `loginPath` (string, required), `clientId` (string, required), `clientSecret` (string, required), `ssoRedirect` (function, optional, signature `(ctx: SsoRedirectContext) => Response | Promise<Response>`), `secure` (boolean, optional, default `true`), `notenant` (boolean, optional, default `false`). The same `AuthConfig` shape is accepted by `createAuth`, `createExpressAuth`, and `createNextAuth` — the `ssoRedirect` signature is uniform across adapters. Required keys are enforced by TypeScript at compile time. The runtime SHALL NOT perform additional null/empty-string validation on the configuration object — consumers are responsible for validating configuration that originates from untyped sources (environment variables, JSON files, etc.) before passing it to the factory.

#### Scenario: All required keys provided

- **WHEN** the factory is called with `{ oauthPath, loginPath, clientId, clientSecret }`
- **THEN** it returns a working router and uses default values for the optional keys

#### Scenario: TypeScript rejects missing required keys at compile time

- **WHEN** a TypeScript consumer attempts to call the factory without one or more required keys
- **THEN** the TypeScript compiler reports an error before the code can be executed

### Requirement: GET /login endpoint

The router SHALL expose a `GET /login` endpoint that initiates the OAuth Authorization Code flow. It SHALL generate a CSRF state token, store it in a `state` cookie, and redirect (HTTP 302) the browser to the Reltio Login Page with `client_id`, `redirect_uri`, and any `tenant` or `notenant` parameter set.

#### Scenario: Plain login

- **WHEN** a browser issues `GET /login` with a `Referer` header pointing at the consumer's origin
- **THEN** the response is 302 with a `Location` header pointing at `${loginPath}/`, query parameters `client_id` and `redirect_uri`, and a `Set-Cookie` for `state` with `HttpOnly`, `Secure`, and `SameSite=Lax`

#### Scenario: Login with tenant in referer

- **WHEN** the `Referer` header includes `?tenant=acme`
- **THEN** the redirect URL also carries `&tenant=acme`

#### Scenario: Login with notenant flag

- **WHEN** the configuration sets `notenant: true`
- **THEN** the redirect URL carries `&notenant=true`

#### Scenario: Login with secure flag forces https

- **WHEN** the configuration sets `secure: true` and the request arrives over HTTP
- **THEN** the `redirect_uri` query parameter uses the `https` scheme

### Requirement: GET /callback endpoint

The router SHALL expose a `GET /callback` endpoint that exchanges the OAuth authorization code for access and refresh tokens. It SHALL validate the state parameter against the state cookie, validate the `redirectUrl` query parameter against the request origin, exchange the code via `POST ${loginPath}/token` with HTTP Basic authentication, store the resulting tokens in `access_token` and `refresh_token` cookies, and finalise the response — either by invoking the optional `config.ssoRedirect` callback with a `SsoRedirectContext` and returning its `Response`, or by performing a default 302 redirect to `redirectUrl`.

#### Scenario: Successful callback

- **WHEN** the callback receives matching state cookie and query, a valid same-origin `redirectUrl`, and a `code` that the OAuth server accepts
- **THEN** the response is 302 with `access_token` and `refresh_token` cookies set with `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/` and the `Location` header points at `redirectUrl`

#### Scenario: State mismatch

- **WHEN** the `state` query parameter differs from the `state` cookie
- **THEN** the response is 401 and no `Set-Cookie` for `access_token` or `refresh_token` is emitted

#### Scenario: Missing state cookie

- **WHEN** the `state` cookie is absent from the request
- **THEN** the response is 401

#### Scenario: Missing state query parameter

- **WHEN** the `state` query parameter is absent from the request
- **THEN** the response is 401

#### Scenario: Redirect URL on foreign origin

- **WHEN** the `redirectUrl` query parameter is provided and its origin (scheme + host + port) does not match the request origin
- **THEN** the response is 400 and no tokens are exchanged

#### Scenario: Redirect URL on same origin different port

- **WHEN** the `redirectUrl` is `http://app.example.com:8080` and the request arrived at `http://app.example.com:8080`
- **THEN** the response is 302 (origins match)

#### Scenario: Redirect URL on same host different scheme

- **WHEN** the `redirectUrl` is `http://app.example.com` and the request arrived at `https://app.example.com`
- **THEN** the response is 400 (origins differ)

#### Scenario: ssoRedirect callback receives full context

- **WHEN** the configuration provides `ssoRedirect` and the authorization code exchange succeeds
- **THEN** the callback is invoked exactly once with a `SsoRedirectContext` argument containing `request`, `accessToken`, `refreshToken`, `redirectUrl`, and `state`; its returned `Response` becomes the HTTP response (with `access_token` and `refresh_token` `Set-Cookie` headers appended by the router)

#### Scenario: ssoRedirect does not mutate request

- **WHEN** the `ssoRedirect` callback runs
- **THEN** `context.request` is unchanged after the callback returns (no `accessToken`, `refreshToken`, or any other property mutated onto it)

#### Scenario: Default redirect when no ssoRedirect

- **WHEN** the configuration omits `ssoRedirect` and the request omits `redirectUrl`
- **THEN** the response 302 redirects to `/`

### Requirement: GET /logout endpoint

The router SHALL expose a `GET /logout` endpoint that clears authentication cookies and redirects to the Reltio Login Page logout URL. Clearing SHALL use the same cookie options used when setting (so browsers identify and remove the cookie reliably).

#### Scenario: Logout clears all auth cookies

- **WHEN** a browser issues `GET /logout` carrying `access_token`, `refresh_token`, and `state` cookies
- **THEN** the response contains three `Set-Cookie` headers that clear each cookie with `HttpOnly`, `Secure` (when `secure: true`), `SameSite=Lax`, and `Path=/` matching the original set

#### Scenario: Logout redirects via login page logout URL

- **WHEN** logout is invoked
- **THEN** the response is 302 to `${loginPath}/logout?redirectUrl=...`

#### Scenario: New state cookie issued for subsequent login

- **WHEN** logout is invoked
- **THEN** the response sets a fresh `state` cookie so the user can immediately re-authenticate

### Requirement: POST /refreshToken endpoint

The router SHALL expose a `POST /refreshToken` endpoint that exchanges the refresh token cookie for a fresh access token by calling `POST ${oauthPath}/token` with `grant_type=refresh_token` and HTTP Basic authentication. On success, the endpoint SHALL update both the `access_token` and `refresh_token` cookies and respond 201 with an empty body. On absence of a refresh token cookie or upstream rejection, the endpoint SHALL respond 401.

#### Scenario: Successful refresh

- **WHEN** the request carries a `refresh_token` cookie that the OAuth server accepts
- **THEN** the response is 201, both `access_token` and `refresh_token` cookies are replaced, and the new `access_token` cookie carries `Max-Age` equal to the OAuth server's `expires_in` value (in seconds)

#### Scenario: No refresh token cookie

- **WHEN** the request has no `refresh_token` cookie
- **THEN** the response is 401 and no upstream call is made

#### Scenario: Upstream rejects refresh token

- **WHEN** the OAuth server returns 4xx for the refresh request
- **THEN** the response is 401

### Requirement: POST /checkToken endpoint

The router SHALL expose a `POST /checkToken` endpoint that validates the access token and returns user and permission data. It SHALL read the access token from the `Authorization: Bearer` header if present, otherwise from the `access_token` cookie. It SHALL call `POST ${oauthPath}/checkToken` with optional `serviceId` and `tenantId` query parameters propagated from the request, and return the upstream JSON response with HTTP 200. On absence of an access token it SHALL respond 401.

#### Scenario: Token validation succeeds

- **WHEN** the request carries a valid `access_token` cookie and the OAuth server returns 200 with a JSON body
- **THEN** the response is 200 with the same JSON body

#### Scenario: Bearer header takes precedence over cookie

- **WHEN** the request carries both an `Authorization: Bearer X` header and an `access_token` cookie with a different value
- **THEN** the upstream call uses the header token

#### Scenario: Bearer header is case-insensitive

- **WHEN** the request carries `authorization: bearer X`, `Authorization: Bearer X`, or `Authorization: BEARER X`
- **THEN** the token is extracted correctly in every case

#### Scenario: serviceId and tenantId forwarded

- **WHEN** the request carries query parameters `serviceId=svc&tenantId=t1`
- **THEN** the upstream `POST ${oauthPath}/checkToken` is called with the same query parameters

#### Scenario: No access token

- **WHEN** the request has neither `Authorization` header nor `access_token` cookie
- **THEN** the response is 401 and no upstream call is made

### Requirement: Cookie attributes

All cookies set by the router SHALL be `HttpOnly`. The `access_token` and `refresh_token` cookies SHALL additionally be `SameSite=Lax` and `Path=/`. The `state` cookie SHALL be `SameSite=Lax`, `Path=/`. When the configuration sets `secure: true`, all three cookies SHALL also carry the `Secure` flag. Cookies SHALL be cleared with the identical option vector used at set time.

#### Scenario: Secure mode default

- **WHEN** the configuration omits `secure`
- **THEN** all cookies are set with the `Secure` flag (default is `true`)

#### Scenario: Insecure mode

- **WHEN** the configuration sets `secure: false`
- **THEN** cookies are set without the `Secure` flag

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

Each request-accepting helper SHALL accept Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly through runtime detection of the request shape. Helpers SHALL NOT mutate the request argument.

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

### Requirement: No public OAuth client surface in v1 (BREAKING)

The package SHALL NOT expose a `createOAuthClient`, `clientCredentialsLogin`, password-grant `login`, or any other public function that performs direct OAuth API calls outside the BFF router endpoints. The OAuth HTTP logic the router needs (authorization code exchange, refresh, introspection) is internal to `src/core/createOAuthClient.ts` and not reachable through any public subpath.

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

