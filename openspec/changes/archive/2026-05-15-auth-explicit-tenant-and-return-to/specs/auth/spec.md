## MODIFIED Requirements

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

### Requirement: GET /logout endpoint

The router SHALL expose a `GET /logout` endpoint that clears authentication cookies and redirects to the Reltio Login Page logout URL. Clearing SHALL use the same cookie options used when setting (so browsers identify and remove the cookie reliably).

The endpoint SHALL resolve the **return URL** and the **tenant** from the same source hierarchy as the `GET /login` endpoint: the request's `?returnTo=` and `?tenant=` query parameters take precedence over the `Referer` header. An empty or whitespace-only `?tenant=` SHALL be treated as absent.

The endpoint SHALL respond `400` only when **both** the request's `?returnTo=` query parameter and the `Referer` header are missing. A malformed `Referer` SHALL be treated as absent when `?returnTo=` is supplied.

When **both** an explicit `?returnTo=` and a `Referer` header are present, the endpoint SHALL assert that `new URL(returnTo).origin === refererUrl.origin`. A mismatch SHALL produce `400 returnTo origin does not match Referer origin`, no cookies SHALL be cleared, and no redirect to the Login Page's logout URL SHALL be issued. When `?returnTo=` is supplied alone (no `Referer`), the endpoint SHALL NOT perform a BFF-side same-origin check — the same OAuth-server-allowlist trust model as `GET /login` SHALL apply.

The OAuth `redirect_uri` query parameter sent into the logout chain (Login Page logout URL → BFF callback → final return URL) SHALL be built from a client-supplied origin (`new URL(returnTo).origin` on the explicit path, `refererUrl.origin` on the legacy fallback path) plus the BFF's own pathname (`new URL(request.url).pathname.replace(/logout$/, "callback")`). The endpoint SHALL NOT use `new URL(request.url).origin` for the OAuth callback URL.

#### Scenario: Logout clears all auth cookies

- **WHEN** a browser issues `GET /logout` with a same-origin `Referer` header and carrying `access_token`, `refresh_token`, and `state` cookies
- **THEN** the response contains three `Set-Cookie` headers that clear each cookie with `HttpOnly`, `Secure` (when `secure: true`), `SameSite=Lax`, and `Path=/` matching the original set

#### Scenario: Logout redirects via login page logout URL

- **WHEN** logout is invoked with a same-origin `Referer` header
- **THEN** the response is 302 to `${loginPath}/logout?redirectUrl=...`

#### Scenario: New state cookie issued for subsequent login

- **WHEN** logout is invoked with a same-origin `Referer` header
- **THEN** the response sets a fresh `state` cookie so the user can immediately re-authenticate

#### Scenario: Logout with explicit returnTo query parameter

- **WHEN** the request URL is `GET /logout?tenant=acme&returnTo=https://app.example.com/hub/acme` and the `Referer` header is absent
- **THEN** the response is 302, the redirect chain ultimately returns to `https://app.example.com/hub/acme`, and the Login Page's `tenant` parameter equals `acme`

#### Scenario: Explicit returnTo overrides referer href

- **WHEN** the request URL is `GET /logout?returnTo=https://app.example.com/hub/acme` and the `Referer` is `https://app.example.com/dashboard?tenant=other`
- **THEN** the resolved return URL is `https://app.example.com/hub/acme` (explicit `?returnTo=` wins); the tenant falls back to the referer query (`other`) because no `?tenant=` was supplied on the request

#### Scenario: Logout responds 400 when neither query nor Referer supplies returnTo

- **WHEN** the request URL is `GET /logout` (no `?returnTo=` query parameter) and no `Referer` header is supplied
- **THEN** the response is `400` with the body `Missing returnTo query parameter or Referer header`, no cookies are cleared, and no redirect to the Login Page's logout URL is issued

#### Scenario: Logout responds 400 when explicit returnTo origin differs from Referer origin

- **WHEN** the request URL is `GET /logout?returnTo=https://evil.example.com/` and the `Referer` header is `https://app.example.com/dashboard`
- **THEN** the response is `400` with the body `returnTo origin does not match Referer origin`, no cookies are cleared, and no redirect to the Login Page's logout URL is issued

#### Scenario: Logout forwards single-source returnTo without same-origin check

- **WHEN** the request URL is `GET /logout?returnTo=https://app.example.com/hub/acme` and no `Referer` header is supplied
- **THEN** the response is 302 into the logout chain with the OAuth `redirect_uri` carrying origin `https://app.example.com`; no BFF-side same-origin check is performed
