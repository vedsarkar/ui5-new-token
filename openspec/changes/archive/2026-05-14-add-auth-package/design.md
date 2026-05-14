## Context

The legacy `auth-middleware` package is a pure-CommonJS Node.js Express router published as a git dependency from `bitbucket.org/reltio-ondemand/auth-middleware`. It exposes a router factory `auth(cfg)` that mounts five endpoints (`/login`, `/logout`, `/callback`, `/refreshToken`, `/checkToken`) plus a `signingHandler` middleware and a handful of `src/utils/*` helpers that consumers reach into through internal paths because the package has no `exports` field.

All 25 customer-facing applications listed in `public/apps/catalog.json` consume the legacy `auth-middleware` today. The `admin-tools` repository was cloned locally as a representative sample for the design phase; it is a Next.js application with a custom Express server that mounts the router under `/api/auth/`. The other 24 apps follow the same pattern with their own mount points and BFF setups, and an unknown set of internal Reltio services also consume the legacy library. Most new applications standardise on Next.js (App Router by default, Pages Router for legacy code). Some apps will keep custom Express servers indefinitely.

The library has a transitive private dependency on `node-oauth-provider`, also a git-only Bitbucket package. Together they carry a handful of issues catalogued during the explore phase: hardcoded cookie names, duplicate `getBasicToken` implementations, `node-fetch@2` instead of native `fetch`, `node:crypto` instead of Web Crypto, missing `Secure`/`SameSite` on the state cookie, `clearCookie` without matching options, hostname-only redirect URL validation, `console.log` side effects inside helpers, all-errors-collapse-to-401 in token introspection, and no TypeScript types.

Constraints:
- **OAuth callback URLs are immutable in v1.** The Reltio OAuth server has the consumer applications' callback URLs (`/callback` relative to each consumer's mount point) pre-registered. Renaming or restructuring the five endpoints requires coordinated changes across the OAuth server and all 25 consumer apps, which is out of scope for v1.
- **Session continuity across deploys is a nice-to-have, not a hard requirement.** Access tokens are short-lived by Reltio security policy and users re-authenticate often anyway. If a `@reltio/auth` deploy invalidates an in-flight session, the central Reltio Login Page re-authenticates the user without prompting for credentials (the Login Page maintains its own SSO session). The new package nonetheless preserves cookie names and attributes by default, so session continuity is the actual outcome — it just doesn't gate the design.
- **Single npm package, dual runtime.** Consumers install one package. The same install must work in legacy Express servers (CJS) and modern Next.js apps (ESM).
- **AI-first documentation.** The Reltio Design MCP exposes documentation to AI agents through the Storybook server. Docs must be instructional, code-first, and discoverable through MCP tools.

Stakeholders:
- **Design Platform team** — owns `@reltio/auth`, the Storybook stories, and the migration story.
- **Application teams** — consumers across 25+ apps, migrating on their own schedule.
- **AI agents** — primary readers of the documentation through the Reltio Design MCP.

## Goals / Non-Goals

**Goals:**
- Ship `@reltio/auth` v1.0.0 to npm with a stable public API across four subpath entries: `@reltio/auth/types` (type-only), `@reltio/auth/express`, `@reltio/auth/next`, `@reltio/auth/utils`. The package has no bare entry — this matches the mandatory subpath-imports convention already enforced by `@reltio/design`. The framework-agnostic `createAuth` core function and the `RequestError` class are internal-only — consumers integrate through the two adapters and never need direct access to either.
- Preserve the full external contract of the legacy `auth-middleware` so existing consumers migrate by changing only import paths and (where applicable) the router factory name.
- Provide first-class Next.js integration for the App Router (Web `Request`/`Response`). The Pages Router is intentionally not covered by a dedicated adapter; consumers on Pages Router integrate through `@reltio/auth/express` on a custom Express server.
- Absorb `node-oauth-provider` into `@reltio/auth`. No external git dependencies remain.
- Apply the twelve non-breaking internal improvements listed in `proposal.md` so v1 starts from a clean technical baseline.
- Document v1 in Storybook with a small focused set of stories oriented at AI agents and product engineers consuming the docs through the Reltio Design MCP.

**Non-Goals (deferred to follow-up features):**
- Configurable cookie names, configurable Bearer header name, configurable logger interface.
- Server-side session storage. v1 stores all state in cookies, same as the legacy library.
- PKCE. The OAuth client is confidential (client secret lives on the BFF). PKCE adds defence-in-depth and is required by OAuth 2.1, but introducing it requires coordination with the Reltio OAuth server and is out of scope for v1.
- RFC 7662 standard token introspection. The `/checkToken` endpoint stays as a Reltio-specific endpoint returning user and permission data.
- Edge runtime helpers (`checkTokenEdge`, etc.) for Next.js `middleware.ts`.
- Zero-config Next.js mounting (`export { GET, POST } from "@reltio/auth/next/route"` with `auth.config.ts` discovery).
- An automated migration codemod. Migration is a documented small manual edit per consumer.
- Publishing a transitional `auth-middleware@4` npm shim. The legacy repository is deprecated as-is.

## Decisions

### 1. Web Fetch API core with thin framework adapters

**Decision.** The core of `@reltio/auth` is a function `createAuth(config)` returning `{ handle(request: Request): Promise<Response> }`. `Request` and `Response` are the standard Web Fetch API types. The Express and Next.js entries are thin adapters that convert framework-native request/response objects to and from the Web standard, then delegate to the core.

**Why.** This is the architecture proven by `next-auth` v5 / `auth.js`, `Hono`, `Remix`'s server runtimes, and SvelteKit. It compresses the orchestration logic into one place, makes each adapter ~50 lines of pure conversion, lets us unit-test the core with simple `new Request(...)` calls, and forward-positions us for future runtimes (Bun, Cloudflare Workers, Edge) at zero extra cost.

**Alternatives considered.**
- *Independent Express and Next.js implementations sharing only helpers.* Simpler mental model per file, but duplicates state validation, cookie serialisation, OAuth flow logic, and error mapping. Two places to fix every bug.
- *Express-shaped core with a Next.js adapter that fakes `req`/`res`.* Pins the core to Node-only APIs (`http.IncomingMessage`) and makes the Edge story impossible.

### 2. Reimplement the OAuth HTTP calls the router needs; do not expose them

**Decision.** `@reltio/auth/src/core/createOAuthClient.ts` implements three internal HTTP operations — authorization code exchange (used by `/callback`), refresh token grant (used by `/refreshToken`), and token introspection against `${oauthPath}/checkToken` (used by `/checkToken`). The implementation is fresh code on native `fetch` and Web Crypto, not copied from `node-oauth-provider`. The remaining `node-oauth-provider` surface (`login`, `clientCredLogin`) is NOT reimplemented and is NOT exposed publicly under any `@reltio/auth` subpath.

**Why.** The router only needs three HTTP calls; `login` (password grant) and `clientCredLogin` (client credentials grant) are scenarios `auth-middleware` itself never used and that the platform direction explicitly discourages. Exposing an `@reltio/auth/oauth-client` subpath would normalise the very pattern (direct programmatic OAuth API calls from app code) that the platform wants to eliminate. Apps that today install `node-oauth-provider` directly can either rework their flow through the BFF router or, if they really need the legacy behaviour, keep installing the deprecated git package — at their own risk. `@reltio/auth` v1 makes the BFF auth router the canonical Reltio auth integration; direct OAuth-API access is not part of v1's public contract.

**Alternatives considered.**
- *Expose `createOAuthClient` and `clientCredentialsLogin` under `@reltio/auth/oauth-client`.* Provides a clean migration target for direct `node-oauth-provider` consumers, at the cost of legitimising the direct-API pattern and growing the v1 surface area. Rejected because it works against the platform's stated direction.
- *Keep `node-oauth-provider` alive as `@reltio/oauth-client` workspace inside the monorepo.* Same problem as above plus splits the auth surface across two packages. Rejected.
- *Re-implement `login`/`clientCredLogin` internally for future flexibility, do not expose yet.* Dead code with no v1 use case. Rejected; can be added when a real internal need appears.

### 3. Helpers live under `@reltio/auth/utils`, work with any request type

**Decision.** `getAccessToken`, `getRefreshToken`, and `getBasicToken` live under `@reltio/auth/utils`. They accept Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly through runtime type detection (presence of `cookies` object vs `headers.get` vs `req.cookies`).

**Why.** The legacy library exposed two of these (`getAccessToken`, `getBasicToken`) and the only known consumer reached into `src/utils/*` to get the rest. Putting all three on a single canonical path under `/utils` removes any need for consumers to touch internal paths.

**Alternatives considered.**
- *Per-framework helper modules (`/express/utils`, `/next/utils`).* Triples the surface area and forces consumers to know which entry to import based on framework. The current API works in any context, so we keep it that way.

### 3a. Drop the `signingHandler` middleware entirely (BREAKING)

**Decision.** The legacy `signingHandler` middleware is not ported to v1. Consumers that need to forward the access token to an upstream Reltio API read it explicitly with `getAccessToken(req)` and set the header on the outgoing request themselves.

**Why.** The legacy middleware mutated `req.headers.Authorization` on the incoming request — a side effect on a function argument that is broadly considered an anti-pattern. It also defaulted to `Bearer ""` when no token was present, which produces a malformed Authorization header that consumers had no easy way to detect. On top of that, the documented import path (`require('auth-middleware/signingHandler')`) did not actually resolve because the package had no `exports` field and no top-level shim file. A grep across the Reltio organisation's known consumers (`admin-tools`, `login-page`, `rdm-react`, `data-modeller`, the rest of the catalogue) shows zero imports of `signingHandler` from any path. Dropping it removes a footgun without breaking any current consumer in practice.

**Alternatives considered.**
- *Port `createSigningHandler` 1:1.* Preserves the legacy README's intent but inherits the request-mutation anti-pattern.
- *Port it but write to the outgoing request only.* Would be a different API shape (not a middleware), at which point it's just `getAccessToken` and the consumer's own line of code to set the upstream header. Not worth a separate helper.

### 4. Canonical mount path is `/auth/`, but not enforced

**Decision.** Documentation, examples, and Storybook stories use `/auth/` as the canonical mount point. Consumers may mount the router on any path (`admin-tools` keeps `/api/auth/`). The router itself uses paths relative to its mount point — never absolute paths.

**Why.** `/api/` is a Next.js Pages Router convention, not a universal one. App Router uses arbitrary paths and Express imposes nothing. The legacy library is already mount-point agnostic, so this is a documentation decision, not a runtime decision.

### 5. Preserve the legacy config key set, with one BREAKING signature change

**Decision.** v1 accepts the same config keys as the legacy library: `oauthPath`, `loginPath`, `clientId`, `clientSecret`, `ssoRedirect`, `secure`, `notenant`. The shape of `ssoRedirect` changes BREAKING-ly from the legacy Express `(req, res, next) => void` to a Web-API native `(ctx: SsoRedirectContext) => Response | Promise<Response>`. All other keys keep their legacy semantics. Adding, renaming, or removing config keys is otherwise permitted only when strongly justified, and must be documented in the migration guide.

**Why.** Every customer-facing app today reads `oauthPath`, `loginPath`, `clientId`, `clientSecret`, `secure`, `notenant` from its own config files; preserving those key names shrinks per-app migration to a one-line import swap for the typical case. The `ssoRedirect` callback, however, was reshaped after the v1 internal architecture stabilised on a Web Fetch API core. The Web-native signature works identically in Express, Next.js App Router, and any future Web-standard runtime (Cloudflare Workers, Bun, Edge), eliminates the need for an Express-specific bridge module (≈100 lines), removes the legacy `req.accessToken` mutation anti-pattern, and gives consumers one signature to learn across every adapter. The migration cost is ≈6 lines per consumer (replace `req.query.X` with `new URL(context.request.url).searchParams.get("X")`, replace `res.redirect(url)` with `Response.redirect(url, 302)`). The Migration story walks through the before/after for `admin-tools`.

**Alternatives considered.**
- *Keep the legacy `(req, res, next)` signature behind an Express-specific bridge.* Initially chosen for minimum migration effort, then reconsidered during code review. The bridge required ~100 lines of mock-`res` infrastructure, leaked internal types into the public API, and created two different `ssoRedirect` signatures across adapters. The breaking change to a unified Web-native signature is small for consumers (mechanical 6-line edit) and a large structural win for the package.
- *Two `ssoRedirect` types — legacy for Express, Web for Next.js.* Maintenance burden, dual documentation, dual tests, no upside.

### 5a. Subpath-only public surface (no bare package entry)

**Decision.** `@reltio/auth`'s `package.json` `exports` field has no `.` entry. Every public API lives under a named subpath: `@reltio/auth/types`, `@reltio/auth/express`, `@reltio/auth/next`, `@reltio/auth/utils`. Attempting `import x from "@reltio/auth"` fails at module resolution with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

The `./types` subpath exposes only TypeScript types (`AuthConfig`, `SsoRedirect`, `SsoRedirectContext`, `TokenResponse`, `CheckTokenResponse`). The framework-agnostic `createAuth` is internal — only the two adapters import it from `src/core/`. Consumers never call it directly, so it stays out of the public surface; if a future v1.x runtime (Cloudflare Workers, Bun) needs its own adapter, the path to expose `createAuth` is a deliberate v1.x decision, not a v1 default.

**Why.** Subpath-only is the convention already established and enforced by `@reltio/design` (see `AGENTS.md` → "Why the /components subpath is mandatory"). Naming the type-only subpath `./types` rather than the previously-considered `./core` accurately reflects what it contains: TypeScript declarations, no runtime exports. Hiding `createAuth` keeps the v1 surface honest — only the entry points consumers actually use are part of the contract we maintain across v1.x.

**Alternatives considered.**
- *Keep a bare `@reltio/auth` entry pointing at the core API.* Breaks the platform convention and creates two paths to the same exports — confusing.
- *Expose `createAuth` under `./types` (subpath named `./core`).* Misleading name once we shrink the export list to types only. Renaming clarifies intent.
- *Inline types into each adapter (`@reltio/auth/express` re-exports `AuthConfig`, `SsoRedirect`, …).* Duplicates the same types across two subpaths — "which import is canonical?" becomes a real question. Centralising in `./types` keeps one source of truth.

### 6. Dual ESM + CJS build via TypeScript compiler

**Decision.** `tsc` emits both ESM (`.mjs`) and CJS (`.js`) outputs from a single TypeScript source. The `package.json` `exports` field maps each subpath to both. No bundler.

**Why.** Modern Next.js apps prefer ESM. Legacy Express apps with `"type": "commonjs"` need CJS. `tsc`'s dual emit is sufficient — there are no bundling concerns (no React, no CSS, no runtime imports of code paths that vary by environment). Same approach as `packages/design/`.

### 7. Test against the spec, not the legacy implementation

**Decision.** Tests are written from the requirements in `specs/auth/spec.md`, not by translating the legacy `tests/index.test.js`. A separate compatibility regression file (`tests/compat.test.ts`) covers a small set of explicit invariants — cookie names, URL paths, response shapes — that must match the legacy library on the wire.

**Why.** The legacy tests assert on URL-encoded strings full of double-escaped query parameters that reflect the legacy implementation's exact `URL` API usage, not the actual contract. Translating them verbatim would lock the new implementation into the legacy code's internal habits. Spec-first tests give us a clean baseline.

### 8. Logging is silent in v1

**Decision.** v1 emits no logs. No `console.log`, no logger interface. Errors are surfaced through normal mechanisms (thrown errors in core, `next(err)` in Express adapter, `Response` with appropriate status from Next.js adapter).

**Why.** The legacy library writes a `console.log` inside `getAccessToken` that fires on every request with an Authorization header. This is spam, side-effecting in unexpected places, and not part of any observability strategy. v1 stays silent; logging is a follow-up feature with a proper interface design.

### 9. Storybook stories are instructions for AI agents, not narratives

**Decision.** `packages/auth/` contains exactly four stories:
- `README.story.mdx` — overview, install, quick start
- `Setup → Express` — step-by-step setup of `createExpressAuth` with a complete example
- `Setup → Next.js App Router` — step-by-step setup of `createNextAuth` with App Router
- `Migration → From auth-middleware` — exhaustive import-path mapping and config diff

Stories contain runnable code snippets. They do not explain rationale, internal architecture, or trade-offs. Architectural reasoning lives in this design document and is not exposed through MCP. The Next.js Pages Router is intentionally absent — both as an adapter and as a documentation story: new Reltio apps standardise on App Router, and existing Pages Router apps (e.g. `admin-tools`) integrate through the Express adapter via their custom Express server. If a real Pages-Router-only consumer appears, the adapter ships in v1.x — implementation cost is small once the App Router adapter exists.

**Why.** The Reltio Design MCP indexes Storybook MDX and exposes it to AI agents through `list-all-documentation` and `get-documentation` tools. Agents want minimal, code-first answers. Architectural narrative belongs in the proposal/design/spec triplet for the platform team's own review, not in consumer-facing docs.

### 10. Cookie behaviour: write and clear with identical options

**Decision.** Every `Set-Cookie` operation uses the same option vector (`HttpOnly`, `Secure` when `config.secure === true`, `SameSite=Lax`, `Path=/`). Every `Clear-Cookie` operation reuses the same options. The `state` cookie joins this regime — it currently goes out with only `HttpOnly`.

**Why.** Browsers identify a cookie by `(name, domain, path)` plus the `Secure` flag. Calling `clearCookie('access_token')` without the original options may leave a stale cookie behind in some browsers. Aligning set and clear options fixes a latent logout-doesn't-fully-logout bug.

### 11. Redirect URL validation by full origin

**Decision.** The callback handler validates `redirectUrl` by parsing both the URL and the request URL with `new URL(...)` and comparing `.origin` (scheme + host + port). The legacy library compares only hostname.

**Why.** `http://app.reltio.com:8080` should not satisfy a request that arrived at `https://app.reltio.com:443`. Hostname-only comparison passes both, full origin comparison rejects them as expected.

### 12. Upstream errors propagate with their real status code

**Decision.** When the OAuth server returns a 4xx response for a token-exchange operation (`/callback`, `/refreshToken`, `/checkToken`), the router responds 401 with an empty body. When it returns a 5xx response or the upstream is unreachable, the router responds 502 with an empty body. The legacy library collapsed every upstream failure to 401, masking server outages as authentication failures. The new behaviour lets the frontend distinguish "your session expired" (401, retry login) from "the auth server is down" (502, surface a real error). Upstream error details (status, body) are not leaked to the client — they remain internal to the BFF.

**Why.** Fronts can distinguish "your session expired" (401) from "the auth server is down" (502 or 503). Today they cannot, and treat all upstream failures as session expiration — leading to redirect loops during real outages.

## Risks / Trade-offs

- **Risk: contract drift on URL paths or response shapes breaks consumer integrations.** Cookie name drift is recoverable (the central Login Page transparently re-authenticates), but URL path drift breaks pre-registered OAuth callback URLs and response shape drift breaks frontend code that parses `/checkToken` permissions. → Mitigation: explicit `compat.test.ts` covering URL paths, request/response shapes, and (as a side-effect target) cookie names and attributes; CI runs it on every PR. With 25 apps deploying independently, a single URL or response-shape drift would compound across the fleet, so this test gates the merge.
- **Risk: consumers miss the `ssoRedirect` signature change during migration and ship code that doesn't compile.** → Mitigation: TypeScript catches the signature mismatch at build time (the new `SsoRedirect` type has nothing in common with the old `(req, res, next) => void` shape). The Migration story shows the before/after diff explicitly. CI in consumer repos surfaces the failure before merge.
- **Risk: Next.js App Router cookies API differs across Next.js versions.** → Mitigation: peer-depend on `next >=13` and use `cookies()` from `next/headers` only via the adapter layer. If a future Next.js release breaks the API, only the adapter changes — core is unaffected.
- **Risk: AI agents generate code with `/api/auth/` paths because the legacy library is mounted that way in admin-tools.** → Mitigation: Storybook stories show `/auth/` as canonical with an explicit note that any mount path works. Migration story explicitly mentions admin-tools' `/api/auth/` mount.
- **Risk: dropping `console.log` removes a signal someone secretly relied on.** → Mitigation: searched the codebase, no consumer parses or expects the legacy log line. Confirmed with the change owner that logging is intentionally dropped in v1 and re-added as a configurable feature later.
- **Trade-off: choosing the Web Fetch API core adds one indirection layer for Express consumers.** → Accepted. Auth endpoints are called at most a few times per session. The conversion cost is negligible and the architectural payoff is substantial.
- **Trade-off: deferring PKCE.** → Accepted. The confidential client model is secure with current cookie hardening. PKCE is an OAuth 2.1 best practice but requires coordinated changes on the Reltio OAuth server side.

## Migration Plan

This change ships ONE deliverable: the `@reltio/auth@1.0.0` package, published to npm with full documentation. Consumer migration and legacy deprecation are recognised as required for the fleet-wide rollout but are NOT part of this change — they are delivered via separate OpenSpec changes scoped to each consumer repository (and to the legacy `auth-middleware` / `node-oauth-provider` Bitbucket repositories) on each team's schedule.

**This change — Package landing.**
1. Implement `packages/auth/` per the spec.
2. Publish `@reltio/auth@1.0.0` to npm under the existing publish flow (`changeset version`, `changeset publish`).
3. Ship documentation via Storybook (README + Setup × 2 + Migration stories) so AI agents and product teams have the migration guide available from day one of public availability.

**Subsequent (separate) changes.**
- *Consumer migration.* Each customer-facing app in `public/apps/catalog.json` performs a one-file (or four-file in admin-tools' case) import-path swap to `@reltio/auth/express` or `@reltio/auth/next`. The Storybook Migration story documents the mechanical edits and the three breaking changes (`ssoRedirect` signature, removed `signingHandler`, no `node-oauth-provider` migration target). Tracked outside this change.
- *Legacy deprecation.* Once internal tracking shows zero remaining consumers, deprecation banners on `auth-middleware/README.md` and `node-oauth-provider/README.md` plus repo lock-down. Tracked outside this change.

**Rollback.** Each consumer pins `@reltio/auth` by version. Rolling back a consumer is `git revert` plus `npm install` — no schema migration, no irreversible side effects. The legacy `auth-middleware` git dependency stays installable from Bitbucket throughout the fleet migration, so a consumer can revert to legacy at any time.

## Open Questions

- **Q.** Which internal Reltio services outside `public/apps/catalog.json` consume `auth-middleware` today? The 25 customer-facing apps are confirmed consumers; the internal surface is unknown. → To verify before announcing v1 deprecation: grep across the Bitbucket org for `"auth-middleware"` in `package.json` files and surface the full list in the migration story.
- **Q.** Does the Reltio OAuth server return identical response shapes to `/oauth/token` (used in `/callback` and `/refreshToken`) and `/oauth/checkToken` (used in `/checkToken`) as documented in the legacy library? → Verify via a Storybook MSW handler that returns documented shapes; flag any deviation in `tasks.md`.
- **Q.** Should `@reltio/auth` declare `express` and `next` as `optionalPeerDependencies` so consumers using only one framework don't get warnings about the other? → Default position: yes, both optional peer dependencies. To be confirmed during `package.json` task.
