## Context

`@reltio/auth` v1 ships five framework-agnostic endpoints — `/login`, `/logout`, `/callback`, `/refreshToken`, `/checkToken` — that cover OAuth orchestration end-to-end. What it does NOT ship is a way to call **Reltio API microservices** from the browser with the user's access token attached. Every consumer application instead carries its own BFF middleware that reads a target URL from a request header, attaches `Authorization: Bearer <token>` from the `access_token` cookie, and forwards the request. This pattern has emerged in `admin-tools`, the catalog applications, HUB UI, and the new agent-flow stack — all with subtle variations.

The Reltio backend topology that drives this is non-trivial: dozens of microservices (`apiPath`, `irsPath`, `mlApi`, `alApi`, `dataPipelineApi`, `rdmPath`, ...) live on per-environment subdomains (`361.reltio.com`, `test-irs.reltio.com`, `prod-usg-ml-match-api.reltio.com`, `mpe-01-data-pipeline-hub.reltio.com`, ...). The env→URL mapping is hosted at `https://cdn.reltio.com/admintools.prod.json` and owned by the Reltio DevOps team. New microservices and new deeper subdomain levels (e.g. `env.service.cloud.reltio.com`) are being added without coordination with application teams. Hard-coding upstream URLs at build time in each application is therefore unworkable; the FE constructs upstream URLs at runtime from the current env selection.

The current state — every application reinventing the proxy — has been a steady source of bugs. The exemplar is `apps/admin-tools/src/api/proxy/proxy.ts`:

```9:27:apps/admin-tools/src/api/proxy/proxy.ts
  (req, res, next) => {
    const targetUrl = req.headers[proxyHeaderName] as string;

    try {
      const apiUrl = new URL(targetUrl);

      if (!apiUrl.origin.endsWith('.reltio.com')) {
        throw new Error();
      }
    } catch (e) {
      res.status(400).send({
        error: `Header ${proxyHeaderName} must be valid url on reltio.com domain`,
      });
    }

    req.headers.authorization = `Bearer ${getRequestToken(req)}`;

    next();
  },
```

Two bugs in 17 lines: (1) the `catch` block has no `return`, so a rejected request still has the user's bearer token attached and is still passed to `next()` — the proxy fires anyway against whatever `req.headers[proxyHeaderName]` happens to be; (2) `apiUrl.origin.endsWith('.reltio.com')` admits every `*.reltio.com` host, including `careers.reltio.com`, `support.reltio.com`, `cdn.reltio.com`, and any future marketing/support subdomain the company stands up. Both are corner-cases of an aspirationally-thin design; both are exactly the kind of defect a single audited implementation should eliminate.

Constraints:

- **Same source-of-truth model as the rest of `@reltio/auth`.** The proxy lives in the framework-agnostic core (`src/core/handlers/proxyHandler.ts`); the Express and Next.js adapters dispatch to it through the same `expressToWebRequest` / `applyWebResponseToExpressRes` pipeline.
- **No new public types beyond `ProxyConfig`.** `AuthConfig` gains a single optional `proxy?: ProxyConfig` key. Everything else (`SsoRedirect`, `TokenResponse`, etc.) stays as-is.
- **No new MCP or external dependencies.** The pattern matcher is hand-rolled (TLS-style host wildcards + literal path prefix); no `micromatch`, `minimatch`, or comparable libraries are pulled in.
- **Web Fetch API core.** The handler accepts a Web `Request`, calls `globalThis.fetch`, and returns a Web `Response`. No `node:http`, no `node-fetch`.
- **Same-origin deployment only.** `@reltio/auth` is always shipped inside the consumer's app on the same origin as the browser-facing pages. Cross-origin proxy is not a supported topology; no `Access-Control-*` headers are emitted.
- **Streaming is explicitly deferred.** Body forwarding in this iteration is buffered (`ArrayBuffer` round-trip in the Express adapter). Streaming requires reworking `applyWebResponseToExpressRes` and `expressToWebRequest` for `ReadableStream` / `Readable` translation, which deserves its own design exploration — queued as `add-auth-proxy-streaming`.

Stakeholders:

- **admin-tools team** — owner of the canonical broken proxy; lead migrator once this ships.
- **Catalog application teams** — each maintain their own proxy variant; secondary migrators.
- **Reltio security review** — single audit surface instead of N per-application surfaces.
- **Design Platform team** — owns `@reltio/auth`, the Storybook stories, the migration story, and the `add-auth-proxy-streaming` follow-up.
- **Reltio DevOps team** — owns the `cdn.reltio.com/admintools.prod.json` env mapping; an interested party in how the FE composes upstream URLs (which is unchanged — the FE still owns the URL string; the BFF just validates and forwards).

## Goals / Non-Goals

**Goals:**

- Replace every home-grown `apps/*/api/proxy` with a single audited `/proxy` endpoint in `@reltio/auth`.
- Make the wildcard DSL strict, documented, and TLS-style — explicit semantics, no ambiguity, no DSL feature growth in v1.
- Make the endpoint transparent at the response level: upstream status, headers, and body pass through unmodified (except the `Set-Cookie` and hop-by-hop strips, both motivated by security/correctness).
- Defend against the standard cross-origin browser confused-deputy attack surface (CSRF, cookie/auth header smuggling, upstream-cookie injection) without requiring per-consumer configuration.
- Keep `AuthConfig` as additive as possible — one new optional key, one new type, zero changes to the existing five endpoints.

**Non-Goals:**

- Streaming bodies. Buffered text/JSON only in v1; the follow-up `add-auth-proxy-streaming` change covers SSE, multipart upload, large downloads, and the Express-adapter streaming rework.
- Cross-origin (CORS) proxy support. The architectural constraint says `@reltio/auth` is co-deployed with the application on the same origin; supporting cross-origin would require a per-consumer CORS policy and a different threat model.
- Automatic token refresh on upstream 401. The client (the platform's React `useFetch` hook) drives refresh through the existing `POST /refreshToken` endpoint; the proxy just propagates upstream 401 as-is. Adding auto-refresh inside the proxy would force the proxy to be stateful and serialise concurrent refreshes across in-flight proxied requests, which is out of scope.
- Request-side timeouts, retry policies, circuit breakers. The proxy is transparent — it inherits whatever the upstream and the platform's reverse-proxy chain provide.
- Env-aware proxy (BFF resolves `env=361`+`service=apiPath`+`path=/...` into an upstream URL itself). Discussed during explore; rejected because the FE already fetches `admintools.prod.json` for unrelated reasons and composing the URL there keeps the proxy maximally generic. The FE is the source of truth for the upstream URL.
- New subpath exports. `proxy` is reachable through the existing `@reltio/auth/express` and `@reltio/auth/next` entries; no new public surface is added.
- Per-target overrides (different `allowedTargets` per environment, per-tenant, etc.). The allowlist is a single flat string array; if multi-tenant scoping is needed later it can be added as a structured form behind the same `proxy` key without breaking v1 consumers.

## Decisions

### 1. The `reltio-target-url` request header carries the upstream URL

**Decision.** The proxy reads the full upstream URL from a single custom request header named `reltio-target-url`. The header carries an absolute URL string (scheme + host + port + path + query + fragment). No `?target=` query parameter, no path-based dispatch (`/proxy/<encoded-url>`), no body-based dispatch.

**Why.**

- **CSRF defense by browser preflight.** Custom request headers are not "simple" per the Fetch spec, so any cross-origin request that sets `reltio-target-url` triggers a CORS preflight. Since the endpoint emits no `Access-Control-*` headers, the preflight is rejected by the browser and the actual request is never sent — even though the `access_token` cookie is `SameSite=Lax` and would otherwise allow same-site form submissions. Using a query parameter or a body field instead would not produce this property: a malicious page could trigger a same-site GET with a `?target=` parameter (no preflight, cookie attached), and the proxy would happily forward.
- **Self-documenting at the call site.** A line like `fetch("/auth/proxy", { headers: { "reltio-target-url": targetUrl } })` reads obviously. A path-based dispatch (`fetch("/auth/proxy/" + encodeURIComponent(targetUrl))`) hides intent and forces URL re-encoding/decoding in two places.
- **Namespace.** `reltio-target-url` is namespaced to avoid colliding with any conventional Reltio API header. The legacy admin-tools middleware uses an unprefixed `target-url`-style name; the rename is a one-line consumer change documented in the migration story.

**Alternatives considered.**

- *Query parameter `?target=<url>`.* Loses the CSRF preflight property. Rejected.
- *Path dispatch `/proxy/<percent-encoded-url>`.* Same CSRF problem (no custom header) plus double-encoding pitfalls (the upstream URL itself contains `%` sequences). Rejected.
- *Body-based dispatch.* GETs cannot carry bodies; the proxy must transparently support all methods. Asymmetric. Rejected.
- *Multiple custom headers (`reltio-target-host`, `reltio-target-path`).* More moving parts, no security upside, harder to construct correctly on the consumer side. Rejected.

### 2. The proxy is opt-in via `config.proxy` and 404 when omitted

**Decision.** When `AuthConfig.proxy` is absent, `/proxy` responds `404` exactly like any other unmatched path. When `AuthConfig.proxy` is set with `allowedTargets: []` (empty array), `/proxy` responds `403` for every request — the endpoint is configured but no upstream is reachable.

**Why.**

- **Backwards compatibility.** Every existing consumer that does not set `proxy` keeps the byte-for-byte v1 behaviour — `/proxy` does not exist.
- **Explicit opt-in.** A proxy that requires the consumer to *enable* it (and pass a non-empty allowlist) prevents an accidentally-deployed instance from being a generic auth-attaching gateway.
- **Distinguishing "disabled" from "everything denied".** 404 communicates "no such endpoint" — admins reading logs immediately see that the consumer has not enabled the proxy. 403 with an empty allowlist communicates "feature is on, your request is rejected by policy" — useful when iterating on the allowlist during development.

**Alternatives considered.**

- *Always-on, default `allowedTargets: []`.* Same effective behaviour (403 for everything) but obscures the "feature is off" signal. Rejected.
- *Throw at `createAuth(config)` time if `allowedTargets` is empty.* Annoying during local development when the allowlist is environment-specific. Rejected.

### 3. URL wildcard DSL — TLS-style host wildcards plus literal path prefix

**Decision.** Each entry in `allowedTargets` is a string of the shape `https://<host-pattern><path-prefix>`. The host pattern is one of:

- A literal host (`rdm.reltio.com`) — exact-match only.
- `*.<rest>` — exactly one subdomain label in place of `*`. Following RFC 6125 §6.4.3, `*` does not match `.` (the label separator) and does not match an empty label. `*.reltio.com` matches `app.reltio.com` and `test-irs.reltio.com`, NOT `reltio.com` (no label) and NOT `a.b.reltio.com` (two labels).
- `**.<rest>` — one or more subdomain labels at any depth. `**.reltio.com` matches `app.reltio.com`, `a.b.reltio.com`, `env.service.cloud.reltio.com`. Does NOT match `reltio.com` (zero labels) — same as `*`, the wildcard requires at least one matched label.

The path prefix is a literal string compared with `URL.pathname.startsWith(prefix)`. `**.reltio.com/reltio/` matches any URL whose host satisfies `**.reltio.com` AND whose normalized pathname starts with `/reltio/`. A pattern with no path (`**.reltio.com`) is treated as `**.reltio.com/` and matches any path on the matched origins. A trailing `*` after the path prefix is sugar (`**.reltio.com/reltio/*` ≡ `**.reltio.com/reltio/`); it exists purely as a visual hint for readers and is stripped before matching.

Compilation happens once at `createAuth(config)` time. The compiler throws on:

- Patterns without `https://` (or with `http://`, `ws://`, etc.).
- Patterns with `*` or `**` anywhere other than the leading host label (`a.*.foo` → invalid, `*foo.com` → invalid because there is no separating dot between the wildcard and the next label).
- Patterns with glob characters (`*`, `**`, `?`, `[]`, `{}`) anywhere in the path other than the trailing-`*` sugar.
- Patterns with a port number (`*.reltio.com:8443/`). HTTPS defaults to 443; non-default-port upstreams are not part of the Reltio API topology in 2026, and admitting a port wildcard adds confusion (`*.reltio.com:*`?) without a real use case.
- Patterns with a query string or fragment.

The matcher works on the **normalized** `URL.host` and `URL.pathname`:

- `URL.host` is the lowercased host (`URL.hostname`) plus `:port` only when the port differs from the scheme default — for `https:` URLs without an explicit port, `URL.host === URL.hostname`. The matcher compares `URL.host` directly against the compiled host pattern; mismatched ports cannot accidentally match a defaulted pattern.
- `URL.pathname` is the percent-decoded, dot-segment-resolved path. `..` is resolved before the match (`/api/../admin` → `/admin`, which then does NOT match `/api/`), and `%2e%2e` is decoded before resolution.

**Why `**` exists and is recommended.** The Reltio microservice topology already exhibits multi-tier subdomains (`<env>-irs.reltio.com`, `<env>-ml-match-api.reltio.com`, etc.), and the DevOps team has signalled that future services will live deeper (e.g. `env.service.cloud.reltio.com`). Forcing consumers to enumerate the depth in their allowlist is a recipe for production breakage every time the topology shifts; `**` lets the consumer write `["https://**.reltio.com/**"]` once and stop thinking about subdomain layout.

**Why `*` still exists alongside `**`.** Some consumers know they only ever talk to one specific microservice (`api.reltio.com`) and want the narrower allowlist as defence-in-depth. `*` is the narrower form; `**` is the convenient form. Both are first-class. The Storybook guide explicitly recommends `**.reltio.com/...` as the default for catalog apps and reserves `*.reltio.com/...` for "I know exactly which subdomain I talk to" cases.

**Why path is literal prefix, not glob.** Glob inside the path is a known footgun (CSP `script-src` history). Literal prefix is unambiguous, easy to audit, easy to test, and covers every use case that has surfaced in the explore phase. If a consumer needs "anything ending in `/stream`" they can switch to a coarser prefix or add multiple entries to the allowlist.

**Why `https://` only.** Every Reltio API endpoint is HTTPS; admitting `http://` would allow MITM on the downstream leg even when the BFF→browser leg is HTTPS. Rejected at construction time.

**Alternatives considered.**

- *Structured allowlist `{ host, pathPrefix }[]`.* No DSL ambiguity; slightly more verbose. Rejected because the string DSL reads naturally and the strict construction-time validation eliminates the ambiguity risk.
- *Drop `*` and only support `**`.* Simpler, but loses the narrow-allowlist defence-in-depth case. Rejected.
- *Glob inside the path.* Footgun; no demonstrated use case. Rejected.
- *Function-based matcher (`validateTarget: (url, request) => boolean`).* Maximally flexible but pushes a per-consumer security-critical function out of the audited library and into application code, defeating the consolidation goal. Rejected.

### 4. Header rewriting at the BFF→upstream boundary

**Decision.** Before forwarding the request upstream, the proxy:

- **Strips:**
  - `Authorization` — the proxy controls this header and overrides whatever the client sent.
  - `Cookie` — the inbound cookie header is for the BFF's cookies (`access_token`, `refresh_token`, `state`); forwarding them upstream would leak BFF session state to the Reltio API.
  - `reltio-target-url` — service header, never reaches upstream.
  - Hop-by-hop headers per RFC 7230 § 6.1: `Connection`, `Keep-Alive`, `Transfer-Encoding`, `TE`, `Trailer`, `Upgrade`, `Proxy-Authenticate`, `Proxy-Authorization`. Plus any header name listed in the inbound `Connection` header value (which is the RFC's mechanism for extension hop-by-hop headers).
  - `Host` — replaced with the upstream URL's host (see below).
  - `Content-Length` — recomputed by the runtime when the buffered body is attached (`fetch` sets it from the body).
- **Replaces:**
  - `Host: <upstream-host>` — the upstream URL's `URL.host`. The `fetch()` call sets this automatically when given a full URL, but the spec calls it out so the contract is explicit.
- **Adds:**
  - `Authorization: Bearer <token>` where `<token>` is the value of the `access_token` cookie on the inbound request.
- **Forwards:** every other inbound header verbatim.

After the upstream returns, the proxy:

- **Strips:**
  - `Set-Cookie` — upstream cannot plant cookies on the application's origin via the BFF. The browser would otherwise honour an upstream `Set-Cookie` as if it came from the BFF (same origin), opening a cookie-injection vector.
  - Hop-by-hop response headers per RFC 7230 § 6.1.
  - `Content-Length` — recomputed by the BFF's `Response` constructor.
- **Forwards:** every other upstream response header verbatim, including `Content-Type`, `Cache-Control`, `ETag`, `Location`, custom Reltio headers, etc. The upstream's content-negotiation and caching directives reach the browser unchanged.
- **Preserves:** upstream status code byte-for-byte. A 401 from upstream is a 401 to the browser; a 502 from upstream is a 502 to the browser. The proxy does NOT classify (the existing "Upstream error propagation" requirement that maps 5xx→502 and 4xx→401 applies only to the OAuth-server endpoints, not to the proxy).

**Why no Cache-Control override.** The five existing endpoints emit `Cache-Control: no-store, no-cache, ...` on every response. Applying that to `/proxy` would override whatever caching directive upstream sent, masking valid cache semantics. The proxy is transparent, so it carries upstream's `Cache-Control` through.

**Alternatives considered.**

- *Forward all inbound headers blindly, including `Authorization` and `Cookie`.* Confused-deputy. Rejected.
- *Strip everything except a hardcoded allowlist.* Brittle — every new header the Reltio API adds (custom auth, tracing, idempotency keys) would need to be added to the allowlist. Rejected.
- *Add `X-Forwarded-For`, `X-Forwarded-Proto`, etc.* Reltio APIs do not currently require these, and adding them would couple the proxy to Reltio's reverse-proxy chain assumptions. Skipped for v1; can be added behind a config flag if the API team asks.

### 5. Routing — extend the core's `(method, suffix)` table with a method-agnostic entry

**Decision.** `createAuth.ts` keeps its existing routing table (`{ method: "GET", suffix: "login", handler: loginHandler }`, ...) and adds one new entry whose `method` field is the sentinel string `"*"`. The dispatch loop is updated to match `r.method === request.method || r.method === "*"`. This keeps every existing route's strict method enforcement (`POST /login` is still 404, not the login handler) and gives the proxy the all-methods behaviour it needs.

**Why a sentinel string instead of a separate dispatch path.** Adding an `"*"` row keeps the routing model uniform — one table, one loop, one match condition. A separate dispatch (e.g. an `if (suffix === "proxy")` early branch) would mean two code paths to keep in sync.

**Express adapter implication.** The Express adapter currently registers each route individually (`router.get("/login", handle)`, etc.). It gains one new line: `router.all("/proxy", handle)`. The existing four lines are unchanged.

**Next.js adapter implication.** The current adapter exports `GET` and `POST` only. The new endpoint accepts all methods, so the adapter exports `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`. Each handler is the same `handle = (request) => auth.handle(request)` wrapper; the multiplication is purely a Next.js App Router quirk (route files export per-method named handlers). Apps mount the auth router at `app/auth/[...auth]/route.ts` as today; the new method handlers attach to the same `route.ts` automatically. Consumers do not have to touch their route file as long as they use the spread (`export const { GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS } = createNextAuth(config).handlers`); the README is updated to show the full destructuring.

**Alternatives considered.**

- *Wildcard suffix dispatch (`r.suffix === "*"`).* Too broad — the core router would then match `GET /auth/foo` as well. Rejected.
- *Separate handler registry for the proxy.* Two routing tables to keep in sync. Rejected.

### 6. Buffered body forwarding in v1, streaming queued as `add-auth-proxy-streaming`

**Decision.** The Express adapter is extended to forward the inbound request body as a single `Buffer` attached to the Web `Request`. The Next.js adapter already passes the `NextRequest.body` (a `ReadableStream`) through unchanged, but the proxy handler buffers it via `await request.arrayBuffer()` before calling `fetch()` so the two adapters behave identically. Upstream responses are likewise buffered via `await upstream.arrayBuffer()` before being returned as a Web `Response`.

**Why buffer in v1.** Streaming both directions requires three orthogonal changes: (a) extending `expressToWebRequest` to convert `req` (Node `Readable`) to a Web `ReadableStream` with `duplex: "half"`; (b) extending `applyWebResponseToExpressRes` to pipe `webResponse.body` (Web `ReadableStream`) into `res` (Node `Writable`) without buffering; (c) ensuring the proxy handler does not buffer at any intermediate point. Each piece has its own edge cases (early client disconnect propagation, error handling, abort signals). Rolling all three into the same change as the proxy endpoint would make this proposal hard to review and would block the consumer-facing rollout on adapter plumbing that has its own design considerations. Splitting buys clarity at the cost of a temporary buffering window.

**What this means in practice.** Buffered v1 fully supports REST/JSON traffic, which is the dominant pattern across the catalog applications. It does NOT support `text/event-stream` (the consumer's `useTextStream` hook will block until the full stream completes — practically useless), large file uploads (memory pressure), or large downloads. The Storybook guide explicitly says "for streaming endpoints, wait for `add-auth-proxy-streaming`" and lists the SSE and upload use cases as not-yet-supported.

**Why not silently buffer and ship streaming later as a non-breaking improvement.** Buffered semantics are observable: a consumer who *thinks* they are streaming and tests against a small dev payload will discover the difference only under production load. Calling the limitation out explicitly in the Storybook guide and in the changelog avoids that footgun.

**Alternatives considered.**

- *Ship streaming in this change.* See above — three orthogonal adapter changes plus the proxy handler in the same PR. Rejected.
- *Refuse `text/event-stream` and `multipart/*` upstream requests in v1.* Defensive but surprises consumers; we cannot reliably detect intent before the body arrives. Rejected.

### 7. 401 on missing token; no auto-refresh inside the proxy

**Decision.** When the inbound request has no `access_token` cookie (or the cookie is empty), the proxy responds `401` without contacting upstream. When upstream itself returns `401` (the cookie was present but the token had expired or been revoked), the proxy forwards the 401 verbatim. The client — the platform's React `useFetch` hook — is responsible for catching the 401, calling `POST /refreshToken`, and retrying the proxied request.

**Why.**

- **Stateless and simple.** The proxy never holds in-flight requests waiting for a token refresh.
- **Avoids concurrent-refresh races.** If the proxy auto-refreshed on 401, two simultaneous requests both seeing expired tokens would both try to refresh; the second refresh would fail because the first rotated the refresh token. Either the proxy adds a refresh-mutex (stateful) or accepts intermittent double-401s (footgun). The client-side `useFetch` already solves this once for all callers.
- **Symmetric with `/checkToken`.** The existing `POST /checkToken` endpoint behaves the same way — 401 on absent or rejected token, no auto-refresh.

**What about non-idempotent methods?** A 401 retry after refresh re-runs the original POST/PUT/PATCH/DELETE. The client's responsibility. The proxy does not duplicate or de-duplicate.

**Alternatives considered.**

- *Auto-refresh inside the proxy on upstream 401.* Adds state, concurrency complexity, retry policy. Rejected — the platform converged on client-driven refresh.
- *Auto-refresh on missing cookie but not on upstream 401.* Inconsistent. Rejected.

### 8. No CORS support; same-origin deployment is contractual

**Decision.** The `/proxy` endpoint emits no `Access-Control-*` response headers. It does not special-case `OPTIONS` requests. An `OPTIONS` with a matching `reltio-target-url` is forwarded upstream like any other method (the upstream Reltio API may have its own content-negotiation `OPTIONS` semantics). An `OPTIONS` *without* `reltio-target-url` follows the same 400 path as every other method.

**Why.** The architectural constraint is that `@reltio/auth` runs co-located with the consuming application on the same origin (every catalog app ships `@reltio/auth` as a local Express middleware or Next.js catch-all route under its own domain). Cross-origin proxy calls would require per-consumer CORS configuration and a different threat model (the `access_token` cookie is `SameSite=Lax`, which is exactly the property the same-origin deployment relies on). Explicitly not supporting CORS keeps the contract narrow and the audit surface small.

**Alternatives considered.**

- *Emit permissive `Access-Control-*` for the configured app origin.* Forces a new config key (`appOrigin` or similar) and pushes deployment topology into `AuthConfig`. Rejected for the same reasons Decision 3 of the explicit-tenant change rejected an `appOrigin` key.
- *Reject all `OPTIONS` with 405.* Surprises consumers who legitimately need to forward a `OPTIONS` upstream. Rejected.

### 9. No request timeout — upstream is the timeout authority

**Decision.** The proxy calls `fetch(upstreamUrl, { ... })` without an `AbortSignal` timeout. The platform's reverse-proxy chain, the upstream microservice, and `undici`'s default keep-alive timeout govern the request lifecycle.

**Why.**

- **Transparency.** A BFF-side timeout would be a tunable consumers cannot reason about (especially since they cannot inspect upstream timing). It would also surface as a different failure mode (504 from BFF) than what the consumer sees when calling Reltio API directly elsewhere in their app.
- **Reltio API behaviour is the source of truth.** Every Reltio microservice has its own SLO and its own timeout; the BFF should not pretend to know better.

**Risk:** an unresponsive upstream holds the BFF's connection open until the platform's reverse-proxy chain times out — typically 60s–300s depending on environment. For Express that pins one event-loop slot per stuck request; for Next.js it does the same with the route handler's worker. Acceptable in v1 — the platform has not flagged this as a known production hot-spot, and adding a configurable timeout is straightforward to add later behind a `proxy.timeoutMs` key without breaking v1 consumers.

**Alternatives considered.**

- *Fixed 30s timeout.* Surprises any Reltio endpoint that legitimately takes longer (export jobs, large data-loader runs). Rejected.
- *Configurable `proxy.timeoutMs`.* Defer to v2 if production observability shows the need.

### 10. `Set-Cookie` from upstream is stripped, not pass-through

**Decision.** Any `Set-Cookie` header upstream returns is dropped from the response forwarded to the browser. All other upstream response headers pass through.

**Why.** The browser observes the response as coming from the BFF's origin (same origin as the application). A `Set-Cookie` from upstream would be honoured as a cookie on the application's origin, even though the upstream service has no business managing the BFF's cookies. This is exactly the cookie-injection vector that closes the confused-deputy attack surface from the upstream side.

**Why this is not "logic" in the spirit of transparency.** Strictly speaking, dropping `Set-Cookie` is a behavioural difference from upstream. The trade-off is unavoidable: any transparent proxy that bridges cookie scopes either drops upstream cookies or admits a cookie-injection vector. The platform direction picks security over absolute transparency here, and documents it explicitly in the spec.

**Alternatives considered.**

- *Forward `Set-Cookie` verbatim.* Cookie-injection vector. Rejected.
- *Rewrite the `Domain` attribute of upstream `Set-Cookie` to scope cookies under the upstream's host.* Browsers ignore `Set-Cookie` whose `Domain` does not match the response origin, so the upstream cookie would simply be ignored — same observable behaviour as stripping, but with extra logic. Rejected as gratuitous.
- *Make pass-through opt-in via `proxy.passThroughUpstreamCookies: true`.* Adds a security-sensitive footgun for marginal benefit. Rejected for v1.

## Risks / Trade-offs

- **Risk:** A consumer mis-writes a pattern (e.g. forgets the dot: `*reltio.com`) and the matcher quietly rejects every request, breaking the app.
  **Mitigation:** Patterns are compiled at `createAuth(config)` time, not per-request. Construction throws with a precise error message naming the invalid pattern. The misconfiguration surfaces at app boot, not at first proxy call.

- **Risk:** A consumer writes `["https://**.reltio.com/**"]` and accidentally admits non-API subdomains (`careers.reltio.com`, `support.reltio.com`, `cdn.reltio.com`). The user's `access_token` is sent to those services.
  **Mitigation:** The audit boundary moves from "every consumer's middleware" to "every consumer's `allowedTargets` string in their `createAuth(config)` call". The Storybook guide recommends path-prefixed allowlists (`["https://**.reltio.com/reltio/**"]`, `["https://**.reltio.com/irs/**"]`, etc.) and explicitly calls out the over-broad pattern as a footgun. The Reltio security review can grep across `apps/*/api/auth/route.ts` (or equivalent) and surface over-broad patterns for follow-up. This is a strict improvement over status quo, where the same kind of mistake is dispersed across N hand-rolled middlewares.

- **Risk:** An attacker on a third-party origin convinces a logged-in user to visit a page that triggers `<form action="/auth/proxy" method="POST">` (same-site, browser sends the cookie). No `reltio-target-url` header is set, so the proxy responds `400` — but is `400` observable enough that the attack is fully neutralised?
  **Mitigation:** `<form>` submissions cannot set custom request headers. The proxy MUST receive `reltio-target-url` to do anything useful; in its absence it returns 400 without contacting any upstream. No bearer token is attached, no upstream call is made. The attack reduces to "an attacker can make the user's browser send 400-producing requests to their own BFF", which has no security impact. Documented as a test scenario.

- **Risk:** The Express adapter's `expressToWebRequest` is currently body-less. The new buffered-body path is a code change with its own bug surface (request-size limits, malformed bodies, content-encoding handling).
  **Mitigation:** The body forwarding is tested in `packages/auth/tests/express/proxy.test.ts` with a mock upstream that asserts the bytes received match the bytes sent. Defensive JSDoc flags the buffered-only nature and points to the streaming follow-up.

- **Risk:** `add-auth-proxy-streaming` materialises later than expected and `useTextStream` consumers are blocked.
  **Mitigation:** The streaming follow-up is sized for a single sprint. If it slips, consumers needing SSE today fall back to their own ad-hoc middleware for the streaming endpoints specifically, while every non-streaming use case migrates to `/proxy` immediately. The split between buffered REST and streaming is a clean interface — no consumer has a half-migrated state.

- **Trade-off:** No environment-aware proxy. The FE owns the upstream URL and the BFF only validates it. This means the FE has to know the env→URL mapping (which it already does via `admintools.prod.json`); the BFF stays out of that business. Cost: an FE bug that picks the wrong env can route the user's token to the wrong upstream. Benefit: `@reltio/auth` remains generic and not coupled to the Reltio env-config schema. Accepted — see Goals/Non-Goals.

- **Trade-off:** `**` is one wildcard form away from "any reltio.com subdomain", and the Reltio DevOps team is the source of truth for what subdomains exist. The proxy effectively transitively trusts whatever DevOps stands up on `*.reltio.com`. If DevOps ever delegates a subdomain to a third-party SaaS (e.g. `survey.reltio.com` → Typeform), the user's bearer token would be eligible to be sent there under a `**.reltio.com/**` allowlist. This is the cost of supporting arbitrary topology growth; the mitigation is to document the trade-off in the Storybook guide and to push consumers toward path-prefixed allowlists for the narrower defence.

## Open Questions

- **Pattern syntax for the trailing-`*` sugar.** Current proposal accepts `**.reltio.com/reltio/*` as equivalent to `**.reltio.com/reltio/`. Should patterns *require* the trailing `/` to mark "prefix" intent, or *require* the trailing `*` to mark "wildcard" intent? Current preference: accept both as equivalent (most permissive reading), document the canonical form in the guide as the trailing `/`. If review prefers strict single-form, swap to "trailing `/` only" before implementation — no other decision depends on this.
- **Should `reltio-target-url` accept relative URLs?** A consumer could theoretically pass `/reltio/api/.../entities/123` and have the BFF append a base URL from `config.proxy.baseUrl`. This would tighten the trust model (the FE never builds the host part) but reintroduces some of the env-aware proxy complexity rejected above. Current preference: absolute URLs only in v1; if a consumer use case emerges where the FE genuinely cannot know the host, revisit with a structured config form.
- **Migration timing for `apps/admin-tools`.** The lead consumer's PR to delete its custom proxy is conditional on this change shipping. Question is sequencing: ship `@reltio/auth` minor → admin-tools updates dependency → admin-tools deletes proxy. Coordinated, no surprises. To be confirmed during PR review.
