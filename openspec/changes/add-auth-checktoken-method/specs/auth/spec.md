## ADDED Requirements

### Requirement: checkToken introspection method

The value returned by `createExpressAuth(config)` and `createNextAuth(config)` SHALL expose `checkToken: (request: AnyRequest, opts?: { serviceId?: string; tenantId?: string }) => Promise<CheckTokenResponse>` as the public API for introspecting the current request's access token server-side and obtaining the **parsed** result. This is the recommended (and only) way for applications to gate routes by role/permission without re-implementing the introspection wire contract. The Express adapter SHALL attach it to the returned `Router` (`Router & { resolveAuthPath; checkToken }`); the Next.js adapter SHALL return it as a field alongside `handlers` and `resolveAuthPath`.

`checkToken` SHALL be the same internal `checkAccessToken` implementation the router's `POST /checkToken` endpoint uses, bound to the single `AuthDeps` record `createAuth` built once. It is therefore exposed on the adapter return (rather than as a standalone factory or a `@reltio/auth/utils` export) so that: (1) it reuses the once-derived `authHeader` (HTTP Basic credential) and `keyPromise` (HMAC routing key) — there is no second key derivation and no Basic-header re-encoding per call; (2) the `AuthDeps` record is never placed on a public surface; and (3) the method requires no extra setup or "build deps once" contract from the consumer — it is a member of a value they already hold to mount the router. `checkAccessToken` is stateful (its options type is a strict superset of `ResolveAuthPathOptions`, needing both `authHeader` and `keyPromise`), so it cannot be exposed from `@reltio/auth/utils`; the adapter-member form is the only consistent way to surface it, identical to `resolveAuthPath`.

`checkToken` SHALL:

1. Read the access token from the request via the existing `getAccessToken(request)` helper — `Authorization: Bearer` (case-insensitive) first, then the `access_token` cookie.
2. When no access token is present on the request, throw a `RequestError` with `statusCode` `401` and SHALL NOT make any upstream call.
3. Resolve the per-session upstream cluster root via the same `resolveAuthPath` routing the router uses (sourced exclusively from the HMAC-signed `reltio_aurl` cookie, falling back to `config.oauthPath`); `checkToken` SHALL NOT decode an `aurl` claim from the request access token.
4. POST a form-encoded `token` body to `${resolved}/checkToken`, appending `serviceId` and/or `tenantId` query parameters when supplied in `opts`, with the once-derived `Authorization: Basic` header.
5. Return the parsed JSON payload typed as `CheckTokenResponse`. `checkToken` SHALL return the parsed payload, NOT an HTTP `Response`.

`checkToken` SHALL preserve the package's `RequestError` upstream-error policy verbatim (the `safeFetch` policy `checkAccessToken` already applies): an upstream 4xx SHALL surface as a thrown `RequestError` whose `statusCode` is the upstream status; an upstream 5xx or a network failure SHALL surface as a thrown `RequestError` whose `statusCode` is `502`. A missing request token SHALL surface as a thrown `RequestError` whose `statusCode` is `401`. Consumers SHALL distinguish outcomes via `isRequestError(error)` and `error.statusCode` (4xx = token rejected, 502 = Auth Server unreachable / 5xx). This policy SHALL be documented as the public contract of `checkToken`.

`checkToken` SHALL accept Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly through the internal `AnyRequest` type, identical to `resolveAuthPath` and `getAccessToken`. It SHALL NOT mutate the request argument. `config.clientSecret` SHALL NOT be referenced on the per-request path — only the once-derived `authHeader` and `keyPromise` are.

The existing public `CheckTokenResponse` type exported from `@reltio/auth/types` SHALL be enriched in place from `Record<string, unknown>` to describe the parsed introspection payload. It SHALL type the known Reltio introspection fields (`clientId: string`, `expiration: number`, `resourceIds: string[]`, `roles: string[]`, `scopes: string[]`, and a `user` object with at least `customer`, `username`, `email`) while remaining permissive for additional fields (index signature). `CheckTokenResponse` SHALL remain the single name for this payload — internal callers reference it directly. `CheckTokenResponse` is a compile-time convenience — `checkToken` SHALL NOT perform runtime schema validation on the payload.

#### Scenario: checkToken is exposed on the adapter return

- **WHEN** `const auth = createExpressAuth(config)` (or `createNextAuth(config)`) is called
- **THEN** `auth.checkToken` is a function with signature `(request: AnyRequest, opts?: { serviceId?: string; tenantId?: string }) => Promise<CheckTokenResponse>`

#### Scenario: checkToken returns the parsed introspection payload

- **WHEN** `auth.checkToken(request)` is called with a request carrying a valid `access_token` cookie and the upstream `/checkToken` returns 200 with a JSON body containing `roles`, `scopes`, and `user`
- **THEN** the call resolves to the parsed object (typed as `CheckTokenResponse`), not an HTTP `Response`, with `result.roles`, `result.scopes`, and `result.user` accessible

#### Scenario: checkToken throws 401 when the request carries no access token

- **WHEN** `auth.checkToken(request)` is called with a request that has neither an `Authorization: Bearer` header nor an `access_token` cookie
- **THEN** the call rejects with a `RequestError` whose `statusCode` is `401`, and no upstream `fetch` call is made

#### Scenario: checkToken throws with the upstream 4xx status when the token is rejected

- **WHEN** `auth.checkToken(request)` is called with a token the Auth Server rejects (upstream `/checkToken` returns a 4xx)
- **THEN** the call rejects with a `RequestError` whose `statusCode` equals the upstream 4xx status, distinguishable via `isRequestError(error)`

#### Scenario: checkToken normalises upstream 5xx and network failures to 502

- **WHEN** `auth.checkToken(request)` is called and the upstream `/checkToken` returns 500, OR the upstream `fetch` rejects with a network error
- **THEN** in each case the call rejects with a `RequestError` whose `statusCode` is `502`

#### Scenario: checkToken routes via the verified reltio_aurl cookie

- **WHEN** `auth.checkToken(request)` is called with a request carrying a valid `access_token` cookie and a valid `reltio_aurl` cookie set to `"https://auth-idev-02.reltio.com"`, and `config.oauthPath` ends in `/oauth`
- **THEN** the upstream `fetch` call targets `https://auth-idev-02.reltio.com/oauth/checkToken`, not `${config.oauthPath}/checkToken`

#### Scenario: checkToken forwards serviceId and tenantId

- **WHEN** `auth.checkToken(request, { serviceId: "svc", tenantId: "t1" })` is called
- **THEN** the upstream `fetch` call appends `serviceId=svc` and `tenantId=t1` query parameters to the resolved `/checkToken` URL

#### Scenario: checkToken reuses the router's once-derived key and credential

- **WHEN** `createAuth(config)` is invoked once and the returned `checkToken` is invoked 100 times alongside any number of routed requests
- **THEN** `crypto.subtle.importKey` is invoked exactly once (during `createAuth`), proving `checkToken` shares the router's once-derived HMAC key and does not re-derive it per call (verified via `vi.spyOn` on `crypto.subtle.importKey`)

#### Scenario: checkToken does not mutate the request

- **WHEN** `auth.checkToken(request)` is called with any supported request shape
- **THEN** the request's `headers`, `cookies`, and own properties are unchanged after the call returns

#### Scenario: CheckTokenResponse is exported from the types subpath

- **WHEN** a consumer writes `import type { CheckTokenResponse } from "@reltio/auth/types"`
- **THEN** the type resolves and exposes typed `clientId`, `expiration`, `resourceIds`, `roles`, `scopes`, and `user` members while permitting additional fields

#### Scenario: checkAccessToken remains unimportable as a standalone function

- **WHEN** a consumer attempts `import { checkAccessToken } from "@reltio/auth/utils"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined` — introspection is reachable only through the adapter-exposed `checkToken` member

## MODIFIED Requirements

### Requirement: Framework-agnostic helpers

The `@reltio/auth/utils` entry SHALL export these helpers:

- `getAccessToken(request)` — reads the access token from `Authorization: Bearer` (case-insensitive), then from the `access_token` cookie. Returns the token string or `null`.
- `getRefreshToken(request)` — reads the refresh token from the `refresh_token` cookie. Returns the token string or `null`.
- `getBasicToken(clientId, clientSecret)` — returns the base64-encoded `clientId:clientSecret` string suitable for HTTP Basic authentication.
- `RequestError` — the error class thrown by the adapter-exposed `checkToken` member (and surfaced by the router's upstream-error policy), carrying a numeric `statusCode` and an optional `response`.
- `isRequestError(value)` — a type guard returning `true` when a caught value is a `RequestError`, so consumers can branch on `error.statusCode` without `instanceof` coupling.

`RequestError` / `isRequestError` SHALL live in a public directory (`src/utils/`), not in private `src/core/`, because `checkToken` throws `RequestError` to its caller and the documented failure contract (`isRequestError(error)` + `error.statusCode`) is only satisfiable when the error type is importable from a public subpath.

The per-session routing resolver is NOT exported from `@reltio/auth/utils`; it is exposed as `resolveAuthPath` on the value returned by `createExpressAuth(config)` / `createNextAuth(config)` (see the `resolveAuthPath resolver` requirement), so it shares the router's once-derived HMAC key. The server-side token introspection method is likewise NOT exported from `@reltio/auth/utils`; it is exposed as `checkToken` on the same adapter return value (see the `checkToken introspection method` requirement), so it shares the router's once-derived `authHeader` and HMAC key. Both members reach stateful, once-derived behaviour that cannot live in `utils`.

Both request-accepting helpers (`getAccessToken`, `getRefreshToken`) — and the adapter-exposed `resolveAuthPath` and `checkToken` — SHALL accept Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly through runtime detection of the request shape (the `AnyRequest` internal type). Helpers SHALL NOT mutate the request argument.

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

#### Scenario: adapter-exposed checkToken returns a working introspection method

- **WHEN** `const auth = createExpressAuth(config); await auth.checkToken(request)` is called with a request containing a valid access token
- **THEN** the parsed `CheckTokenResponse` payload is returned (see the `checkToken introspection method` requirement for the full scenario set)

#### Scenario: RequestError and isRequestError are importable from the utils subpath

- **WHEN** a consumer writes `import { RequestError, isRequestError } from "@reltio/auth/utils"`
- **THEN** both resolve at runtime; `isRequestError(error)` narrows a caught `checkToken` rejection to `RequestError`, exposing `error.statusCode` (401 missing token, upstream 4xx, 502 unreachable/5xx)

### Requirement: No public OAuth client surface in v1 (BREAKING)

The package SHALL NOT expose a `createOAuthClient`, `clientCredentialsLogin`, password-grant `login`, or any other public function that performs direct OAuth API calls outside the BFF router endpoints, with the single exception of the adapter-exposed `checkToken` member (see the `checkToken introspection method` requirement). The OAuth HTTP logic the router needs (authorization code exchange, refresh, introspection) is internal to `src/core/` (the pure `exchangeCode` / `refreshAccessToken` / `checkAccessToken` functions) and not reachable through any public subpath. `checkToken` does NOT widen this surface to a standalone importable function — it is a bound member of the value `createExpressAuth(config)` / `createNextAuth(config)` already returns, sharing the router's once-derived `AuthDeps`, and the underlying `checkAccessToken` remains unimportable from any subpath.

#### Scenario: createOAuthClient is not importable

- **WHEN** a consumer attempts `import { createOAuthClient } from "@reltio/auth/types"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined`

#### Scenario: clientCredentialsLogin is not importable

- **WHEN** a consumer attempts `import { clientCredentialsLogin } from "@reltio/auth/types"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined`

#### Scenario: checkAccessToken is not importable as a standalone function

- **WHEN** a consumer attempts `import { checkAccessToken } from "@reltio/auth/utils"` or from any other subpath
- **THEN** TypeScript reports an error and the runtime import resolves to `undefined` — introspection is reachable only through the adapter-exposed `checkToken` member

#### Scenario: Migration story documents the deliberate non-migration

- **WHEN** an AI agent reads the Migration story
- **THEN** the story explicitly states that `node-oauth-provider` direct consumers are not provided a `@reltio/auth` migration target in v1, recommends reworking such integrations through the BFF router, and notes that the legacy `node-oauth-provider` git package remains installable but unmaintained
