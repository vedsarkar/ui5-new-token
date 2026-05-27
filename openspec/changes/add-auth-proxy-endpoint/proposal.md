## Why

Every Reltio application that talks to a Reltio API microservice from the browser ships its own ad-hoc BFF proxy: a route that reads `target-url` (or similar) from a request header, attaches `Authorization: Bearer <token>` from the user's `access_token` cookie, and forwards. The Reltio backend is a sprawl of microservices (`apiPath`, `irsPath`, `mlApi`, `alApi`, `dataPipelineApi`, `rdmPath`, ...) deployed across many environments (`361`, `test`, `prod-usg`, `mpe-01`, `dev-h360`, ...). The env→URL mapping lives in `https://cdn.reltio.com/admintools.prod.json` and is owned by the DevOps team — application code learns the URLs at runtime, so the FE composes upstream URLs dynamically and the BFF cannot enumerate them ahead of time.

These home-grown proxies have repeatedly shipped security and reliability bugs. The lead example is `apps/admin-tools/src/api/proxy/proxy.ts`:

- The validation `try { ... } catch { res.status(400).send(...) }` has no `return` — after the 400 is dispatched, execution continues to `req.headers.authorization = ...` and `next()`, so the request is **still proxied** with the user's bearer token attached. This is a working open-proxy under the right inputs.
- The allowlist `apiUrl.origin.endsWith('.reltio.com')` admits every reltio.com subdomain, including non-API services (`careers.reltio.com`, `support.reltio.com`, `cdn.reltio.com`), which means the user's access token can be sent to arbitrary subdomains the API server has no business with.
- There is no path validation at all.

Other catalog applications carry slight variations on the same shape, each with its own bug surface. Consolidating one audited proxy implementation inside `@reltio/auth` removes this entire class of bugs, lets the platform team run security review against a single artefact, and deletes 30–50 lines of fragile code from every consumer application.

## What Changes

- **New endpoint `/proxy`** dispatched by the existing core router. The endpoint accepts any HTTP method (GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS) so it can transparently forward whatever the consumer needs.
- **New optional `proxy` key on `AuthConfig`** with one required field, `allowedTargets: string[]`. When the `proxy` key is omitted, `/proxy` responds `404` — opting in is explicit. When `allowedTargets` is the empty array, the endpoint responds `403` to every request (no upstream is reachable).
- **`reltio-target-url` request header** carries the full upstream URL (scheme + host + port + path + query + fragment). The endpoint:
  1. Parses the header with the WHATWG URL parser; rejects with `400` on parse failure.
  2. Rejects with `400` if the scheme is not `https:`.
  3. Matches the parsed URL against `allowedTargets`; rejects with `403` on no match.
  4. Reads the access token from the `access_token` cookie only (NOT from `Authorization: Bearer` on the inbound request, which is stripped). On absence or empty value, responds `401` — the client is responsible for refresh via the existing `POST /refreshToken` round-trip (the platform's React `useFetch` hook already implements this).
  5. Strips the inbound `Authorization` header, the inbound `Cookie` header, the `reltio-target-url` service header, and all hop-by-hop headers (`Connection`, `Transfer-Encoding`, `Keep-Alive`, `TE`, `Trailer`, `Upgrade`, `Proxy-Authenticate`, `Proxy-Authorization`) before forwarding.
  6. Replaces the `Host` header with the upstream URL's host.
  7. Attaches `Authorization: Bearer <token>`.
  8. Sends the request upstream with the original HTTP method, body, query string, and remaining headers.
  9. Returns the upstream response **verbatim** — status code, response headers (except `Set-Cookie`, which is stripped to prevent upstream from planting cookies on the application origin), and body.

- **URL pattern DSL for `allowedTargets`** — flat list of strings with documented semantics:
  - `https://` scheme is mandatory; patterns without `https://` or with `http://` are configuration errors at construction time.
  - **Host wildcards:**
    - `*.reltio.com` — exactly one subdomain label. Matches `app.reltio.com`, NOT `a.b.reltio.com` and NOT `reltio.com`. TLS-style semantics (RFC 2818 / RFC 6125).
    - `**.reltio.com` — one or more subdomain labels at any depth. Matches `app.reltio.com`, `env.service.cloud.reltio.com`, `a.b.c.d.reltio.com`. Recommended default in README examples because microservice hosts move across nesting depths under DevOps's control without consumer code changing.
    - Exact host with no wildcard (e.g. `rdm.reltio.com`) — matches that host only.
    - `*` and `**` MAY appear only as a host's leading label (`*.foo`, `**.foo`). Patterns like `a.*.foo` or `*foo.com` (no separating dot) are configuration errors.
  - **Path is a literal prefix** on the URL's normalized `pathname`. `**.reltio.com/reltio/` matches every URL whose host is under `reltio.com` and whose normalized path starts with `/reltio/`. A pattern with no path (`**.reltio.com`) is treated as `**.reltio.com/` and matches all paths on the matched origins.
  - **Trailing `/*` is sugar** for "anything below"; `**.reltio.com/reltio/*` is the same pattern as `**.reltio.com/reltio/`. No other glob characters are recognised inside the path; `**` inside the path is rejected at construction time.
  - **Query strings and fragments are ignored during matching** and pass through to upstream verbatim.
  - The parsed `URL.host` and `URL.pathname` (already normalized by the WHATWG URL parser — `..` resolved, `%2e` decoded, default ports stripped) are matched, NOT the raw header string.

- **Streaming is explicitly out of scope for this change.** The proxy buffers request and response bodies via `await new Response(...).arrayBuffer()` / `await upstream.arrayBuffer()`. Endpoints that produce `text/event-stream` or large bodies (uploads/downloads) work for small bodies but block on full read; a follow-up change `add-auth-proxy-streaming` is queued to rework the Express adapter for streaming (the Next.js adapter is already stream-capable) and lift this restriction. The decision is recorded in `design.md` § "Decisions".
- **No CORS support.** The endpoint emits no `Access-Control-*` headers and does not handle `OPTIONS` preflights for cross-origin browsers. `@reltio/auth` is always deployed on the same origin as the consuming application, so cross-origin proxy calls are not a supported topology. `OPTIONS` requests with a matching `reltio-target-url` are forwarded upstream like any other method (some Reltio APIs do receive same-origin `OPTIONS` for content negotiation).
- **No request timeout.** The endpoint inherits whatever timeout the upstream microservice and the platform's reverse-proxy chain enforce. Adding a BFF-side timeout would add a tunable consumers cannot reason about; transparency wins here.
- **Routing:** the core router (`createAuth.ts`) is extended to dispatch `/proxy` for any HTTP method while keeping the existing five (method, suffix) pairs unchanged. The Express adapter adds `router.all("/proxy", handle)`; the Next.js adapter exports new `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS` handlers alongside the existing `GET`/`POST` so the App Router catch-all dispatches every method of `/proxy` to the core.
- **Storybook documentation.** A new guide `guides/auth/Proxy.story.mdx` documents the endpoint, the header contract, the wildcard DSL with worked examples driven from `admintools.prod.json`'s real environment list, and the migration story for catalog apps (one-line replacement of their custom proxy with a `proxy: { allowedTargets: [...] }` config entry).

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `auth`: adds a new requirement for the `/proxy` endpoint (URL allowlisting, header rewriting, error responses), extends the existing `Configuration shape` requirement with the new optional `proxy` key, and extends the Express and Next.js adapter requirements to mount the sixth endpoint. The five existing endpoints (`/login`, `/logout`, `/callback`, `/refreshToken`, `/checkToken`) are unchanged at the network level.

## Impact

- **Runtime code:**
  - New file `packages/auth/src/core/handlers/proxyHandler.ts` — the handler.
  - New file `packages/auth/src/core/proxy/targetMatcher.ts` — pattern compiler and matcher (exports `compileTargetPatterns(patterns: string[])` returning a `(url: URL) => boolean` matcher; throws on invalid patterns at construction time so misconfiguration surfaces at `createAuth(config)` rather than per-request).
  - `packages/auth/src/core/createAuth.ts` — add a method-agnostic dispatch entry for the `proxy` suffix; today's table dispatches by `(method, suffix)` pairs, the new entry uses a `"*"` sentinel for any method.
  - `packages/auth/src/types/index.ts` — add `ProxyConfig` type (`{ allowedTargets: string[] }`) and the optional `proxy?: ProxyConfig` key on `AuthConfig`.
  - `packages/auth/src/express/createExpressAuth.ts` — add `router.all("/proxy", handle)` so every HTTP method on `/proxy` dispatches to the core.
  - `packages/auth/src/next/createNextAuth.ts` — extend the returned `handlers` object with `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS` alongside the existing `GET` and `POST`.
- **Buffered body handling in adapters:**
  - `packages/auth/src/express/adapter.ts` — `expressToWebRequest` is extended to forward the inbound request body (currently dropped per the inline comment "Body is not forwarded — none of the five auth endpoints reads a request body"). The body is read into a Node `Buffer` and attached to the `Request`. Streaming is NOT introduced in this change — `add-auth-proxy-streaming` covers that follow-up.
  - `applyWebResponseToExpressRes` — no change in this iteration; `webResponse.text()` is replaced with `webResponse.arrayBuffer()` only when we know the body is binary (which we don't for proxy yet, so we stick with `text()` for backward compat and accept that the proxy is text-only until the streaming follow-up).
  - Defensive JSDoc in both helpers flags that the body-handling shape will change again when streaming lands.
- **Tests:**
  - `packages/auth/tests/core/targetMatcher.test.ts` — unit tests for the pattern compiler covering every wildcard semantics scenario in the spec.
  - `packages/auth/tests/express/proxy.test.ts` — integration tests against the Express adapter with a mock upstream (`fetch` shimmed via `vi.spyOn(globalThis, "fetch")`).
  - `packages/auth/tests/next/proxy.test.ts` — matching scenarios against the Next.js adapter using the existing `testHandlers.ts` plumbing.
- **Spec delta:** `openspec/specs/auth/spec.md` — one new requirement (`POST /proxy endpoint`), one new requirement (`Proxy target allowlist`), modified `Configuration shape`, modified `Express adapter`, modified `Next.js App Router adapter`. The existing `Cache-control headers` and `Upstream error propagation` requirements stay scoped to the original five endpoints — the proxy forwards upstream status and headers verbatim, so neither rule applies to it (the spec is updated to explicitly exclude `/proxy`).
- **Storybook docs:** new `guides/auth/Proxy.story.mdx`; `packages/auth/README.story.mdx` and `packages/auth/README.md` gain a "Proxying browser requests to Reltio microservices" section with the wildcard DSL summary and a one-paragraph migration note for catalog apps.
- **Consumers — concrete migration path:** `apps/admin-tools/src/api/proxy/proxy.ts` is deleted in a follow-up PR (in the admin-tools repo, not this monorepo); admin-tools instead passes `proxy: { allowedTargets: ["**.reltio.com/**"] }` to `createExpressAuth`. The change is non-breaking for every other consumer — when `proxy` is omitted, `/proxy` is a 404 and nothing changes.
- **Release vehicle:** minor `@reltio/auth` bump (additive, backwards-compatible). Changeset under "Added" lists the new `/proxy` endpoint, the `reltio-target-url` header, the `proxy.allowedTargets` config, and the wildcard DSL.
- **`@reltio/design` does not change.** This is a `@reltio/auth`-only release.
- **Follow-up: `add-auth-proxy-streaming`.** A separate OpenSpec proposal is queued to rework the Express adapter for streaming bodies and lift the buffering restriction in `proxyHandler`. The follow-up depends on this change and is scoped strictly to body-handling plumbing; the public API of `/proxy` does not change between the two.
