## ADDED Requirements

### Requirement: Proxy endpoint

The router SHALL expose a `/proxy` endpoint that accepts any HTTP method (`GET`, `HEAD`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`) and transparently forwards the request to an upstream URL supplied in the `reltio-target-url` request header. The endpoint SHALL be available only when `AuthConfig.proxy` is provided; when `AuthConfig.proxy` is absent, every request to `/proxy` (any method) SHALL respond `404` exactly like any other unmatched path.

When `AuthConfig.proxy` is provided, the endpoint SHALL execute the following sequence for every request:

1. Read the `reltio-target-url` request header. If the header is absent, the empty string, or whitespace-only, respond `400` with no upstream call.
2. Parse the header value with the WHATWG URL parser. On parse failure, respond `400` with no upstream call.
3. Reject the request with `400` if the parsed URL's `protocol` is not `https:`. No upstream call SHALL be made for `http:`, `ws:`, `wss:`, `file:`, or any other scheme.
4. Match the parsed URL against `AuthConfig.proxy.allowedTargets` (see the `Proxy target allowlist` requirement). If no entry matches, respond `403` with no upstream call.
5. Read the access token from the `access_token` cookie on the inbound request. The endpoint SHALL NOT read from the inbound `Authorization` header — that header is treated as untrusted and stripped. If the `access_token` cookie is absent or its value is the empty string, respond `401` with no upstream call.
6. Build the outgoing request to the parsed upstream URL with the inbound request's HTTP method, query string, and body, applying the header rewriting rules below.
7. Forward the outgoing request via `globalThis.fetch`. On a network error (the `fetch` promise rejects), respond `502` with an empty body.
8. On success, forward the upstream response — status code, response headers (after the response-header rewriting rules below), and body — back to the inbound caller.

**Request-side header rewriting (BFF → upstream).** Before calling `fetch`, the endpoint SHALL:

- **Strip** the inbound `Authorization`, `Cookie`, and `reltio-target-url` headers — these never reach upstream.
- **Strip** all hop-by-hop headers per RFC 7230 § 6.1: `Connection`, `Keep-Alive`, `Transfer-Encoding`, `TE`, `Trailer`, `Upgrade`, `Proxy-Authenticate`, `Proxy-Authorization`. Plus any header name listed as a token in the inbound `Connection` header's value (the RFC's mechanism for extension hop-by-hop headers).
- **Strip** the inbound `Host` header. The outgoing `Host` is set by the runtime from the upstream URL's `host`.
- **Strip** the inbound `Content-Length` header. The runtime recomputes it from the buffered body.
- **Attach** `Authorization: Bearer <token>` where `<token>` is the value of the `access_token` cookie.
- **Forward** every other inbound request header verbatim.

**Response-side header rewriting (upstream → BFF).** Before constructing the response returned to the inbound caller, the endpoint SHALL:

- **Strip** every `Set-Cookie` header from the upstream response. Upstream services SHALL NOT plant cookies on the application's origin via the proxy.
- **Strip** hop-by-hop headers per RFC 7230 § 6.1 (same list as the request-side, applied to the response).
- **Strip** the upstream `Content-Length` header. The runtime recomputes it from the buffered body.
- **Forward** every other upstream response header verbatim, including `Content-Type`, `Cache-Control`, `ETag`, `Location`, and any Reltio-specific custom headers.

**Status-code transparency.** The endpoint SHALL forward the upstream HTTP status code byte-for-byte for every value returned by upstream — including `401`, `403`, `404`, `429`, `5xx`. The endpoint SHALL NOT classify upstream status codes (the existing `Upstream error propagation` requirement that maps OAuth-server 5xx to 502 and OAuth-server 4xx to 401 applies only to the OAuth-server endpoints `/callback`, `/refreshToken`, and `/checkToken`; it does NOT apply to `/proxy`).

**Body forwarding.** The endpoint SHALL forward the inbound request body verbatim to upstream and the upstream response body verbatim back to the caller. In this iteration, body forwarding is buffered — the endpoint SHALL read the inbound body fully into memory before calling `fetch`, and SHALL read the upstream response body fully into memory before constructing the outbound `Response`. Streaming bodies (`text/event-stream`, chunked uploads/downloads) are functionally supported (the bytes are correct) but block on full read; the follow-up change `add-auth-proxy-streaming` SHALL lift this restriction.

**Token refresh.** The endpoint SHALL NOT attempt to refresh the access token on a missing cookie or on an upstream `401`. Refresh is the responsibility of the inbound caller (typically through the existing `POST /refreshToken` endpoint). An upstream `401` SHALL be forwarded to the caller verbatim alongside the upstream response body and other headers.

**`ssoRedirect` callback.** The `ssoRedirect` callback configured on `AuthConfig` SHALL NOT be invoked for any `/proxy` request. The callback is documented as a `/callback`-only hook.

#### Scenario: Proxy not configured

- **WHEN** `AuthConfig.proxy` is absent and a request `GET /proxy` arrives with a `reltio-target-url` header set to a syntactically valid URL
- **THEN** the response is `404` with no upstream call

#### Scenario: Configured but empty allowlist denies every request

- **WHEN** `AuthConfig.proxy` is `{ allowedTargets: [] }` and a request `GET /proxy` arrives with a syntactically valid `reltio-target-url`
- **THEN** the response is `403` with no upstream call

#### Scenario: Successful GET forwarded with bearer token

- **WHEN** `AuthConfig.proxy` is `{ allowedTargets: ["https://**.reltio.com/reltio/"] }`, the inbound request is `GET /proxy` with header `reltio-target-url: https://app.reltio.com/reltio/api/v1/entities/123` and a cookie `access_token=ABC`, and upstream returns `200 {"id":"123"}` with `Content-Type: application/json`
- **THEN** the outgoing `fetch` call uses `https://app.reltio.com/reltio/api/v1/entities/123`, method `GET`, header `Authorization: Bearer ABC`, and no inbound `Cookie` or `Authorization` header
- **AND** the response to the inbound caller is `200` with body `{"id":"123"}` and `Content-Type: application/json`

#### Scenario: POST body forwarded verbatim

- **WHEN** the inbound request is `POST /proxy` with `Content-Type: application/json`, body `{"q":"foo"}`, header `reltio-target-url: https://app.reltio.com/reltio/api/v1/entities/_search`, and a valid `access_token` cookie
- **THEN** the outgoing `fetch` call uses method `POST`, body bytes equal to `{"q":"foo"}`, and `Content-Type: application/json`

#### Scenario: Every HTTP method is dispatched to the proxy handler

- **WHEN** any of `HEAD`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` is sent to `/proxy` with a valid `reltio-target-url` header and a valid `access_token` cookie against an allowlisted target
- **THEN** the request is dispatched to the proxy handler (not to `/login`, `/logout`, `/callback`, `/refreshToken`, or `/checkToken`) and forwarded to upstream with the same method

#### Scenario: Inbound Authorization header is stripped and replaced

- **WHEN** the inbound request carries both an `Authorization: Bearer CLIENT_SUPPLIED` header and a cookie `access_token=COOKIE_TOKEN`
- **THEN** the outgoing `fetch` call uses `Authorization: Bearer COOKIE_TOKEN` (the cookie value), NOT `CLIENT_SUPPLIED`

#### Scenario: Inbound Cookie header is stripped

- **WHEN** the inbound request carries `Cookie: access_token=ABC; refresh_token=DEF; state=XYZ`
- **THEN** the outgoing `fetch` call has no `Cookie` header

#### Scenario: Hop-by-hop request headers are stripped

- **WHEN** the inbound request carries `Connection: keep-alive, x-custom-hop`, `Keep-Alive: timeout=5`, `Transfer-Encoding: chunked`, `TE: trailers`, `Trailer: x-trailer`, `Upgrade: websocket`, `Proxy-Authenticate: ...`, `Proxy-Authorization: ...`, and `x-custom-hop: value` (extension hop-by-hop named via `Connection`)
- **THEN** none of these headers reach the outgoing `fetch` call

#### Scenario: Service header reltio-target-url is stripped

- **WHEN** the inbound request carries `reltio-target-url: https://app.reltio.com/reltio/`
- **THEN** the outgoing `fetch` call has no `reltio-target-url` header

#### Scenario: Upstream Set-Cookie is dropped

- **WHEN** upstream returns `200` with `Set-Cookie: session=upstream-cookie; Domain=app.reltio.com`
- **THEN** the response to the inbound caller has no `Set-Cookie` header

#### Scenario: Upstream status is forwarded verbatim including 401

- **WHEN** upstream returns `401 Unauthorized` with body `{"error":"token_expired"}`
- **THEN** the response to the inbound caller is `401` with body `{"error":"token_expired"}` (no remapping to 502, no client-side refresh, no retry)

#### Scenario: Upstream 5xx is forwarded verbatim

- **WHEN** upstream returns `503 Service Unavailable` with body `upstream is down`
- **THEN** the response to the inbound caller is `503` with body `upstream is down` (NOT remapped to 502; the OAuth-server-status mapping does NOT apply to /proxy)

#### Scenario: Upstream content-type and cache headers pass through

- **WHEN** upstream returns `200` with `Content-Type: application/xml`, `Cache-Control: max-age=300`, `ETag: "abc"`, and a custom `X-Reltio-Trace-Id: 42`
- **THEN** the response to the inbound caller carries the same four headers with the same values

#### Scenario: Network error becomes 502

- **WHEN** the outgoing `fetch` rejects with a network error (e.g. DNS failure, connection refused, TLS handshake failure)
- **THEN** the response to the inbound caller is `502` with an empty body

#### Scenario: Missing target header

- **WHEN** the inbound request has no `reltio-target-url` header
- **THEN** the response is `400` with no upstream call

#### Scenario: Empty target header

- **WHEN** the inbound request has `reltio-target-url: ` (empty value)
- **THEN** the response is `400` with no upstream call

#### Scenario: Malformed target URL

- **WHEN** the inbound request has `reltio-target-url: not a url`
- **THEN** the response is `400` with no upstream call

#### Scenario: Non-https target scheme

- **WHEN** the inbound request has `reltio-target-url: http://app.reltio.com/reltio/` (note `http:`, not `https:`) and `http://app.reltio.com/reltio/` would match an allowlist entry if compared by host/path
- **THEN** the response is `400` with no upstream call (scheme check fires before allowlist match)

#### Scenario: Target not in allowlist

- **WHEN** `allowedTargets` is `["https://**.reltio.com/reltio/"]` and the inbound request has `reltio-target-url: https://evil.example.com/reltio/api/`
- **THEN** the response is `403` with no upstream call

#### Scenario: No access_token cookie

- **WHEN** the inbound request has a valid `reltio-target-url` matching the allowlist, but no `access_token` cookie
- **THEN** the response is `401` with no upstream call

#### Scenario: Empty access_token cookie

- **WHEN** the inbound request has `Cookie: access_token=` (empty value)
- **THEN** the response is `401` with no upstream call

#### Scenario: Authorization header alone is not enough

- **WHEN** the inbound request has `Authorization: Bearer CLIENT_TOKEN` but no `access_token` cookie
- **THEN** the response is `401` with no upstream call (the `Authorization` header is stripped and is not a fallback token source for `/proxy`)

#### Scenario: ssoRedirect callback is not invoked for /proxy

- **WHEN** `AuthConfig.ssoRedirect` is set and an inbound `GET /proxy` request succeeds
- **THEN** the `ssoRedirect` callback is not invoked

#### Scenario: OPTIONS request without target header is rejected

- **WHEN** the inbound request is `OPTIONS /proxy` with no `reltio-target-url` header (e.g. a browser preflight from a cross-origin page)
- **THEN** the response is `400` with no upstream call and no `Access-Control-*` headers

#### Scenario: OPTIONS request with valid target is forwarded to upstream

- **WHEN** the inbound request is `OPTIONS /proxy` with a valid `reltio-target-url`, a matching allowlist entry, and a valid `access_token` cookie
- **THEN** the outgoing `fetch` call uses method `OPTIONS` against the upstream URL and forwards the upstream response verbatim

### Requirement: Proxy target allowlist

`AuthConfig.proxy.allowedTargets` SHALL be a flat array of pattern strings. Patterns SHALL be compiled once at `createAuth(config)` time (NOT on every request) into a matcher function. The compiler SHALL throw a descriptive error at construction time for every invalid pattern, naming the offending pattern in the message — misconfiguration SHALL surface at application boot, not on the first proxy request.

A pattern has the shape `https://<host-pattern><path-prefix>` where the `<path-prefix>` portion is optional. Both portions are matched against the WHATWG URL parser's normalized output (`URL.host` and `URL.pathname`) of the parsed `reltio-target-url`, not against the raw header string.

**Host pattern syntax.** The host pattern SHALL be one of:

- A literal hostname (`rdm.reltio.com`) — matched case-insensitively against `URL.host`.
- `*.<rest>` — the leading `*` SHALL match exactly one DNS label. A label is a non-empty string of characters that does NOT contain a `.`. `*.reltio.com` matches `app.reltio.com` and `test-irs.reltio.com`; it does NOT match `reltio.com` (zero labels) and does NOT match `a.b.reltio.com` (two labels). Semantics follow RFC 6125 § 6.4.3.
- `**.<rest>` — the leading `**` SHALL match one or more DNS labels at any depth. `**.reltio.com` matches `app.reltio.com`, `a.b.reltio.com`, and `env.service.cloud.reltio.com`. It does NOT match `reltio.com` (zero labels).

The host comparison SHALL be case-insensitive (DNS hostnames are case-insensitive). `*` and `**` MAY appear ONLY as the leading label of the host pattern; patterns with wildcards anywhere else (`a.*.foo`, `*foo.com`, `a**.foo`, `*.bar.*.foo`) SHALL be rejected at construction time.

**Port handling.** Patterns SHALL NOT include a port number; the matcher SHALL reject patterns like `*.reltio.com:8443` at construction time. The matcher SHALL be matched against `URL.host`, which for `https:` URLs equals `URL.hostname` only when the URL has no explicit port (or an explicit port `:443`); an inbound target URL with a non-default explicit port (`https://app.reltio.com:8443/`) SHALL NOT match a port-less pattern, because `URL.host` then includes the port.

**Path-prefix syntax.** The `<path-prefix>` portion (if present) SHALL be a literal string starting with `/`. The matcher SHALL accept the parsed `URL.pathname` if `URL.pathname.startsWith(<path-prefix>)`. Path comparison SHALL be case-sensitive (URL paths are case-sensitive). The compiler SHALL reject patterns whose path portion contains `*`, `**`, `?`, `[`, `]`, `{`, `}` anywhere other than as a single trailing `*` character, which is treated as cosmetic sugar (`/api/*` is equivalent to `/api/` for matching purposes; the trailing `*` is stripped before storage).

A pattern with no path portion (`https://**.reltio.com`, `https://rdm.reltio.com`) SHALL be treated as if its path portion were `/` and SHALL match every URL whose host satisfies the host pattern.

The matcher SHALL match against the parsed `URL.pathname`, which is the WHATWG URL parser's already-normalized form: dot segments resolved (`/api/../admin` → `/admin`), percent-encoded `.` sequences (`%2e%2e`) decoded before resolution, and consecutive slashes collapsed per the URL spec. Patterns SHALL NOT attempt to defeat normalization by encoding dots themselves.

**Scheme.** Patterns SHALL begin with the literal string `https://`. Patterns starting with `http://`, `ws://`, `wss://`, `file://`, or any other scheme — or with no scheme prefix at all — SHALL be rejected at construction time. The matcher SHALL only ever be queried by the request handler with a URL whose scheme is `https:` (the scheme check inside the handler fires before allowlist matching), so the matcher itself does not need to re-check the scheme of the inbound URL.

**Query and fragment.** Patterns SHALL NOT include a query string or fragment. The matcher SHALL ignore the query string and fragment of the inbound URL — they pass through to upstream unchanged but are not part of the allowlist match.

**Match semantics.** A target URL matches the allowlist if at least one entry's host pattern matches `URL.host` AND that entry's path prefix is a prefix of `URL.pathname`. Multiple entries are OR-combined; the matcher iterates entries in declaration order and returns on first match. An empty `allowedTargets` array matches no URL.

#### Scenario: Exact host pattern matches only that host

- **WHEN** `allowedTargets` contains `https://rdm.reltio.com/` and the inbound target URL is `https://rdm.reltio.com/api/123`
- **THEN** the URL matches

#### Scenario: Exact host pattern does not match a subdomain

- **WHEN** `allowedTargets` contains `https://reltio.com/` and the inbound target URL is `https://app.reltio.com/`
- **THEN** the URL does not match

#### Scenario: Single-label wildcard matches one subdomain

- **WHEN** `allowedTargets` contains `https://*.reltio.com/` and the inbound target URL is `https://app.reltio.com/api`
- **THEN** the URL matches

#### Scenario: Single-label wildcard does not match multi-label host

- **WHEN** `allowedTargets` contains `https://*.reltio.com/` and the inbound target URL is `https://a.b.reltio.com/api`
- **THEN** the URL does not match

#### Scenario: Single-label wildcard does not match apex

- **WHEN** `allowedTargets` contains `https://*.reltio.com/` and the inbound target URL is `https://reltio.com/`
- **THEN** the URL does not match

#### Scenario: Multi-label wildcard matches single-label subdomain

- **WHEN** `allowedTargets` contains `https://**.reltio.com/` and the inbound target URL is `https://app.reltio.com/`
- **THEN** the URL matches

#### Scenario: Multi-label wildcard matches deep subdomain

- **WHEN** `allowedTargets` contains `https://**.reltio.com/` and the inbound target URL is `https://env.service.cloud.reltio.com/api/v1`
- **THEN** the URL matches

#### Scenario: Multi-label wildcard does not match apex

- **WHEN** `allowedTargets` contains `https://**.reltio.com/` and the inbound target URL is `https://reltio.com/`
- **THEN** the URL does not match

#### Scenario: Pattern with no path matches any path

- **WHEN** `allowedTargets` contains `https://**.reltio.com` (no trailing path) and the inbound target URL is `https://app.reltio.com/anything/at/all`
- **THEN** the URL matches

#### Scenario: Path prefix admits matching path

- **WHEN** `allowedTargets` contains `https://**.reltio.com/reltio/` and the inbound target URL is `https://app.reltio.com/reltio/api/v1/entities`
- **THEN** the URL matches

#### Scenario: Path prefix rejects non-matching path

- **WHEN** `allowedTargets` contains `https://**.reltio.com/reltio/` and the inbound target URL is `https://app.reltio.com/admin/users`
- **THEN** the URL does not match

#### Scenario: Path prefix is case-sensitive

- **WHEN** `allowedTargets` contains `https://**.reltio.com/reltio/` and the inbound target URL is `https://app.reltio.com/RELTIO/api/v1`
- **THEN** the URL does not match (path comparison is case-sensitive)

#### Scenario: Host comparison is case-insensitive

- **WHEN** `allowedTargets` contains `https://**.reltio.com/` and the inbound target URL is `https://APP.RELTIO.COM/api`
- **THEN** the URL matches (host comparison is case-insensitive; the URL parser also lowercases `URL.host`)

#### Scenario: Trailing wildcard sugar is equivalent to path prefix

- **WHEN** `allowedTargets` contains `https://**.reltio.com/reltio/*` and the inbound target URL is `https://app.reltio.com/reltio/api/v1`
- **THEN** the URL matches (the trailing `*` is treated as sugar for path-prefix matching)

#### Scenario: Path traversal does not bypass the prefix check

- **WHEN** `allowedTargets` contains `https://**.reltio.com/reltio/` and the inbound `reltio-target-url` header value is `https://app.reltio.com/reltio/../admin/users`
- **THEN** the URL does not match (the WHATWG URL parser normalizes the path to `/admin/users` before matching, which is not under the `/reltio/` prefix)

#### Scenario: Percent-encoded dot traversal does not bypass the prefix check

- **WHEN** `allowedTargets` contains `https://**.reltio.com/reltio/` and the inbound `reltio-target-url` header value is `https://app.reltio.com/reltio/%2e%2e/admin`
- **THEN** the URL does not match (the URL parser decodes `%2e%2e` and resolves to `/admin`)

#### Scenario: Multiple entries are OR-combined

- **WHEN** `allowedTargets` contains `["https://rdm.reltio.com/", "https://**.reltio.com/reltio/"]` and the inbound target URL is `https://rdm.reltio.com/api/lookups`
- **THEN** the URL matches (via the first entry)

#### Scenario: Query string passes through but is ignored during matching

- **WHEN** `allowedTargets` contains `https://**.reltio.com/reltio/` and the inbound target URL is `https://app.reltio.com/reltio/api/v1?filter=name&limit=10`
- **THEN** the URL matches AND the outgoing `fetch` call uses the URL `https://app.reltio.com/reltio/api/v1?filter=name&limit=10` (query string preserved)

#### Scenario: Default https port matches port-less pattern

- **WHEN** `allowedTargets` contains `https://**.reltio.com/` and the inbound target URL is `https://app.reltio.com/api` (no explicit port; `URL.host === "app.reltio.com"`)
- **THEN** the URL matches

#### Scenario: Explicit non-default port does not match port-less pattern

- **WHEN** `allowedTargets` contains `https://**.reltio.com/` and the inbound target URL is `https://app.reltio.com:8443/api` (`URL.host === "app.reltio.com:8443"`)
- **THEN** the URL does not match

#### Scenario: Invalid pattern with http scheme throws at construction

- **WHEN** `createAuth(config)` is called with `proxy: { allowedTargets: ["http://app.reltio.com/"] }`
- **THEN** construction throws an error whose message names the offending pattern and explains that `https://` is required

#### Scenario: Invalid pattern with no scheme throws at construction

- **WHEN** `createAuth(config)` is called with `proxy: { allowedTargets: ["app.reltio.com/"] }`
- **THEN** construction throws an error whose message names the offending pattern and explains that `https://` is required

#### Scenario: Invalid pattern with wildcard mid-host throws at construction

- **WHEN** `createAuth(config)` is called with `proxy: { allowedTargets: ["https://a.*.reltio.com/"] }`
- **THEN** construction throws an error whose message names the offending pattern and explains that wildcards are allowed only as the leading host label

#### Scenario: Invalid pattern with wildcard merged into a label throws at construction

- **WHEN** `createAuth(config)` is called with `proxy: { allowedTargets: ["https://*reltio.com/"] }` (no dot between `*` and the next label)
- **THEN** construction throws an error whose message names the offending pattern and explains that the wildcard must be followed by a `.`

#### Scenario: Invalid pattern with port throws at construction

- **WHEN** `createAuth(config)` is called with `proxy: { allowedTargets: ["https://*.reltio.com:8443/"] }`
- **THEN** construction throws an error whose message names the offending pattern and explains that ports are not allowed in patterns

#### Scenario: Invalid pattern with glob inside path throws at construction

- **WHEN** `createAuth(config)` is called with `proxy: { allowedTargets: ["https://**.reltio.com/api/*/raw"] }`
- **THEN** construction throws an error whose message names the offending pattern and explains that `*` is only permitted as a trailing path character

#### Scenario: Invalid pattern with query string throws at construction

- **WHEN** `createAuth(config)` is called with `proxy: { allowedTargets: ["https://**.reltio.com/api?tenant=*"] }`
- **THEN** construction throws an error whose message names the offending pattern and explains that query strings are not allowed in patterns

## MODIFIED Requirements

### Requirement: Configuration shape

The auth factory SHALL accept a configuration object with the following keys: `oauthPath` (string, required), `loginPath` (string, required), `clientId` (string, required), `clientSecret` (string, required), `ssoRedirect` (function, optional, signature `(ctx: SsoRedirectContext) => Response | Promise<Response>`), `secure` (boolean, optional, default `true`), `notenant` (boolean, optional, default `false`), `proxy` (object, optional, default `undefined`).

The optional `proxy` key has the shape `{ allowedTargets: string[] }` where `allowedTargets` is a list of URL patterns the proxy endpoint is permitted to forward requests to (see the `Proxy endpoint` and `Proxy target allowlist` requirements for semantics). When `proxy` is `undefined`, the `/proxy` endpoint is disabled and SHALL respond `404` to every request. When `proxy.allowedTargets` is the empty array, the `/proxy` endpoint is enabled but SHALL respond `403` to every request.

The same `AuthConfig` shape is accepted by `createAuth`, `createExpressAuth`, and `createNextAuth` — the `ssoRedirect` signature and the `proxy` shape are uniform across adapters. Required keys are enforced by TypeScript at compile time. The runtime SHALL NOT perform additional null/empty-string validation on the configuration object — consumers are responsible for validating configuration that originates from untyped sources (environment variables, JSON files, etc.) before passing it to the factory. The one exception is `proxy.allowedTargets` patterns, which the runtime SHALL validate at construction time (see `Proxy target allowlist`) because invalid patterns cannot be expressed in TypeScript's type system.

#### Scenario: All required keys provided

- **WHEN** the factory is called with `{ oauthPath, loginPath, clientId, clientSecret }`
- **THEN** it returns a working router and uses default values for the optional keys; the `/proxy` endpoint responds `404` to every request

#### Scenario: TypeScript rejects missing required keys at compile time

- **WHEN** a TypeScript consumer attempts to call the factory without one or more required keys
- **THEN** the TypeScript compiler reports an error before the code can be executed

#### Scenario: Proxy key enables the proxy endpoint

- **WHEN** the factory is called with `{ oauthPath, loginPath, clientId, clientSecret, proxy: { allowedTargets: ["https://**.reltio.com/reltio/"] } }`
- **THEN** the `/proxy` endpoint is enabled and dispatches requests against the pattern (see the `Proxy endpoint` requirement); the other six configuration semantics are unchanged

### Requirement: Cache-control headers

The router SHALL emit `Cache-Control: no-store, no-cache, max-age=0, must-revalidate, private` and `Pragma: no-cache` headers on every response from the five authentication endpoints (`/login`, `/logout`, `/callback`, `/refreshToken`, `/checkToken`), to prevent intermediate caches from storing authentication state. These headers SHALL NOT be added to `/proxy` responses — the proxy forwards upstream's caching directives verbatim (see the `Proxy endpoint` requirement), so adding a no-store override at the BFF would mask valid upstream cache semantics.

#### Scenario: Cache control on every authentication endpoint

- **WHEN** any of `/login`, `/logout`, `/callback`, `/refreshToken`, or `/checkToken` responds (success or error)
- **THEN** both `Cache-Control` and `Pragma` headers are present with the specified values

#### Scenario: Cache control not added on /proxy

- **WHEN** `/proxy` responds with upstream's `Cache-Control: max-age=300` header
- **THEN** the response to the inbound caller carries `Cache-Control: max-age=300` and does NOT carry the no-store override

#### Scenario: Cache control not added on /proxy 400/401/403/404

- **WHEN** `/proxy` responds `400`, `401`, `403`, or `404` (error before reaching upstream) without contacting upstream
- **THEN** the response has no `Cache-Control` header added by the router (the response carries whatever defaults the runtime emits, with no router-injected no-store override)

### Requirement: Express adapter

The `@reltio/auth/express` entry SHALL export a `createExpressAuth(config)` function that returns an Express `Router`. The router SHALL mount the five authentication endpoints (`/login`, `/logout`, `/callback`, `/refreshToken`, `/checkToken`) under its own root using strict per-method bindings (`router.get("/login", ...)`, etc.). When `config.proxy` is provided, the router SHALL additionally mount `/proxy` with a method-agnostic binding (`router.all("/proxy", ...)`) so every HTTP method dispatches to the proxy handler. `config` is an `AuthConfig` — the same shape as the Next.js adapter accepts. The Express adapter's `expressToWebRequest` helper SHALL forward the inbound request body to the Web `Request` (as a buffered `Uint8Array`/`Buffer`) for `/proxy` requests; the existing five endpoints do not read a body and the helper MAY skip body forwarding for them as an implementation optimisation.

#### Scenario: Behavioural drop-in for auth-middleware (URLs, cookies, responses)

- **WHEN** a consumer replaces `import auth from "auth-middleware"` with `import { createExpressAuth } from "@reltio/auth/express"`, swaps the factory call, and updates the `ssoRedirect` callback to the new Web-API signature
- **THEN** every existing endpoint behaves identically to the legacy library at the network level (same URLs, same cookies, same response codes, same response bodies)

#### Scenario: Express adapter shares the ssoRedirect signature with Next.js

- **WHEN** a consumer passes `ssoRedirect: ({ redirectUrl }) => Response.redirect(redirectUrl, 302)` to `createExpressAuth`
- **THEN** the callback is invoked with a `SsoRedirectContext` and its returned `Response` becomes the HTTP response — the exact same behaviour as the Next.js adapter

#### Scenario: Express adapter mounts /proxy when proxy config is provided

- **WHEN** a consumer passes `proxy: { allowedTargets: ["https://**.reltio.com/reltio/"] }` to `createExpressAuth` and the resulting router is mounted at `/auth`
- **THEN** `PUT /auth/proxy`, `DELETE /auth/proxy`, `OPTIONS /auth/proxy`, and every other method dispatch to the proxy handler (not 404)

#### Scenario: Express adapter does not mount /proxy when proxy config is absent

- **WHEN** a consumer omits the `proxy` key from `createExpressAuth(config)`
- **THEN** every method on `/proxy` responds `404`

### Requirement: Next.js App Router adapter

The `@reltio/auth/next` entry SHALL export a `createNextAuth(config)` function that returns `{ handlers: { GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS } }` where each handler accepts a `NextRequest` and returns a `Promise<Response>`. Each handler SHALL route the request to the appropriate endpoint based on the URL path segment after the mount point and, for `/proxy`, accept any HTTP method while still falling through to `404` for any other suffix whose method does not match one of the documented routing rows. `config` is an `AuthConfig` — the same shape as the Express adapter accepts.

#### Scenario: App Router catch-all route

- **WHEN** a consumer creates `app/auth/[...auth]/route.ts` with `export const { GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS } = createNextAuth(config).handlers`
- **THEN** requests to `/auth/login`, `/auth/callback`, `/auth/proxy`, etc. are routed to the corresponding endpoint with the correct method semantics

#### Scenario: Next.js adapter exposes all method handlers

- **WHEN** `createNextAuth(config)` is called
- **THEN** the returned `handlers` object exposes named functions `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`, each calling the same core `auth.handle(request)` dispatcher

#### Scenario: Next.js adapter dispatches all methods on /proxy when configured

- **WHEN** a consumer mounts the adapter with `proxy: { allowedTargets: ["https://**.reltio.com/reltio/"] }` and issues a `DELETE` to `/auth/proxy` with a valid `reltio-target-url` and `access_token` cookie
- **THEN** the request is dispatched to the proxy handler and forwarded upstream as a `DELETE`

### Requirement: Storybook documentation

The package SHALL ship five Storybook MDX stories:

- `packages/auth/README.story.mdx` — overview, install, quick start (rendered from `packages/auth/README.md`). No explicit `Meta` title — Storybook auto-titles the page from the file path (`packages/auth/README`), matching the `@reltio/design` convention.
- `guides/auth/Setup.Express.story.mdx` (`<Meta title="Guides/Auth/Setup Express" />`) — Express setup walkthrough with runnable examples.
- `guides/auth/Setup.NextAppRouter.story.mdx` (`<Meta title="Guides/Auth/Setup Next.js App Router" />`) — App Router setup walkthrough.
- `guides/auth/Migration.FromAuthMiddleware.story.mdx` (`<Meta title="Guides/Auth/Migration from auth-middleware" />`) — import-path mapping, three breaking changes, before/after migration patterns.
- `guides/auth/Proxy.story.mdx` (`<Meta title="Guides/Auth/Proxy" />`) — the `/proxy` endpoint: the `reltio-target-url` header contract, the wildcard DSL with worked examples driven from `admintools.prod.json`'s real environment list, header rewriting rules, error semantics, the buffered-body limitation in v1, and the migration story for catalog applications (one-line replacement of their custom proxy with a `proxy: { allowedTargets: [...] }` config entry, with a before/after snippet from `apps/admin-tools/src/api/proxy/proxy.ts` as the worked example).

Stories SHALL use `/auth/` as the canonical mount path in examples and explicitly note that consumers may mount the router on any path. There SHALL be no setup story for the Next.js Pages Router: v1 does not ship a Pages Router adapter, and Pages Router applications integrate through `@reltio/auth/express` on a custom Express server.

#### Scenario: Stories appear in Storybook navigation

- **WHEN** Storybook is built or run in dev mode
- **THEN** the README story appears under `packages/auth/README` (its auto-title), and the four setup/migration/proxy guides appear nested under the top-level `Guides/Auth/` group

#### Scenario: Migration story documents every legacy import path

- **WHEN** an AI agent queries the Migration story through the Reltio Design MCP
- **THEN** the response contains the mapping `auth-middleware → @reltio/auth/express`, `auth-middleware/src/utils/getAccessToken → @reltio/auth/utils`, `auth-middleware/src/utils/getBasicToken → @reltio/auth/utils`, `auth-middleware/utils/getAccessToken → @reltio/auth/utils`, and the explicit removal note for `auth-middleware/signingHandler` with the replacement pattern using `getAccessToken` and manual header assignment on the outgoing request

#### Scenario: Proxy story documents the reltio-target-url contract and wildcard DSL

- **WHEN** an AI agent queries the Proxy story through the Reltio Design MCP
- **THEN** the response contains: the `reltio-target-url` header name and value shape, the four error responses (400/401/403/404), the `*` vs `**` wildcard semantics with concrete examples, the path-prefix matching rules, the `Set-Cookie`/`Authorization`/`Cookie` strip rules, the buffered-body limitation in v1 (with a forward reference to `add-auth-proxy-streaming`), and the before/after migration snippet replacing `apps/admin-tools/src/api/proxy/proxy.ts`
