## Why

Reltio's customer-facing applications authenticate users through the legacy `auth-middleware` library — a Node.js/Express middleware distributed as a git dependency from `bitbucket.org/reltio-ondemand/auth-middleware`. The library is ten years of accumulated code with no TypeScript, no npm publication, no Next.js support, several known security and correctness defects, and a hard dependency on a second unpublished package (`node-oauth-provider`). At the same time, most new Reltio apps are migrating to Next.js, and the design platform needs a stable, modern, well-documented BFF auth package as the foundation for ~25 customer-facing applications listed in `public/apps/catalog.json`. This change introduces `@reltio/auth` v1: a clean rewrite of the auth-middleware contracts inside the `reltio-design` monorepo, published to npm, with first-class Next.js and Express adapters.

## What Changes

- Add a new workspace `packages/auth/` publishing `@reltio/auth` v1.0.0 to the npm registry under the same publish flow as `@reltio/design`.
- Implement a framework-agnostic **core** on top of the Web Fetch API (`Request` → `Response`). The same pattern is used by `auth.js`/`next-auth` v5, `Hono`, `Remix`, and is the modern standard for server-side JavaScript libraries that must run across Node.js, Edge, and Workers. The core is INTERNAL — consumers use the two adapters; the core's `createAuth` is not part of the v1 public surface.
- Ship two adapters in v1:
  - `@reltio/auth/express` — Express router factory, drop-in replacement for the legacy `auth(cfg)` call.
  - `@reltio/auth/next` — Next.js App Router handlers. The Pages Router is intentionally not supported by a dedicated adapter in v1; existing Pages Router applications integrate through `@reltio/auth/express` running on their custom Express server (the same path `admin-tools` already takes).
- Ship framework-agnostic helpers under `@reltio/auth/utils` — `getAccessToken`, `getRefreshToken`, `getBasicToken`. Helpers accept Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly.
- Follow the platform's mandatory subpath-imports convention (already enforced by `@reltio/design`). The package's `package.json` `exports` field has no `.` entry — bare `import x from "@reltio/auth"` deliberately fails at resolution time. Consumers always import from a subpath: `@reltio/auth/types` (TypeScript declarations only), `@reltio/auth/express`, `@reltio/auth/next`, `@reltio/auth/utils`.
- **BREAKING** Drop the legacy `signingHandler` middleware entirely. It mutated the incoming request's headers (poor practice) and was documented under an import path that never worked due to the missing `exports` field. Consumers that need to forward the access token to an upstream Reltio API call read it explicitly with `getAccessToken(req)` and set the header on the outgoing request themselves. The migration is a 3-line change documented in the Migration story.
- **BREAKING** Change the `ssoRedirect` callback signature from the legacy Express `(req, res, next) => void` to a Web-API native `(ctx) => Response | Promise<Response>`. The same signature is used in every adapter (Express, Next.js, and any future Web Fetch runtime). The callback no longer mutates the request — it reads everything it needs from a `SsoRedirectContext` argument (`{ request, accessToken, refreshToken, redirectUrl, state }`) and returns a Web `Response`. Migration is ~6 lines per consumer (replace `req.query.X` with `new URL(context.request.url).searchParams.get("X")` and `res.redirect(url)` with `Response.redirect(url, 302)`). The Migration story documents the before/after pattern.
- Reimplement, inside `packages/auth/src/core/createOAuthClient.ts`, the three OAuth HTTP operations the BFF router actually needs (authorization code exchange, refresh token grant, token introspection). Do not reimplement and do not expose `login` (password grant) or `clientCredLogin` (client credentials grant) — those scenarios from the legacy `node-oauth-provider` API are explicitly out of v1 scope. Apps that today install `node-oauth-provider` directly are not given a `@reltio/auth` migration target; they either rework their integration through the BFF router or stay on the deprecated legacy package at their own risk. The duplicate `getBasicToken` implementation across the two legacy packages is collapsed by consolidating it under `@reltio/auth/utils`. No external git dependencies remain in `@reltio/auth`.
- Preserve the public contract that downstream apps depend on:
  - URL paths relative to the mount point: `GET /login`, `GET /logout`, `GET /callback`, `POST /refreshToken`, `POST /checkToken`. The canonical mount point in documentation is `/auth/`, but consumers may mount the router anywhere.
  - Cookie names `access_token`, `refresh_token`, `state` with `HttpOnly`, `Secure`, `SameSite=Lax` attributes.
  - Config keys `oauthPath`, `loginPath`, `clientId`, `clientSecret`, `ssoRedirect`, `secure`, `notenant`.
  - `req.accessToken` exposed inside the `ssoRedirect` callback for the Express adapter.
  - HTTP-level error semantics from admin-tools' perspective: upstream OAuth 4xx surfaces as 401, upstream 5xx as 502, no body leaks. The legacy `RequestError` class is internal-only in v1 — admin-tools' error middleware that read `err.response.json()` is replaced by reading the response status code on the client side (the BFF no longer throws `RequestError` to consumer error handlers).
- Apply the following non-breaking internal improvements in v1:
  1. Drop `node-fetch@2` in favour of native `globalThis.fetch`.
  2. Replace `node:crypto` with the Web Crypto API.
  3. Replace `Buffer.from(...).toString("base64")` with `btoa(...)`.
  4. Bump engine requirement to Node `>=20`.
  5. Convert to TypeScript with full `.d.ts` output.
  6. Ship dual ESM + CJS via `tsc`.
  7. Lock the `exports` field so consumers cannot reach into internal paths.
  8. Pass the same cookie options on `Set-Cookie` and `Clear-Cookie` so logout actually clears in all browsers.
  9. Validate `redirectUrl` by full origin (scheme + host + port), not just hostname.
  10. Apply `Secure` + `SameSite=Lax` to the `state` cookie, matching the token cookies.
  11. Propagate upstream OAuth server failures with their real status code instead of collapsing every error to 401.
  12. Remove the `console.log` side effect from `getAccessToken`.
- Add Storybook stories under `packages/auth/`: `README`, `Setup → Express`, `Setup → Next.js App Router`, `Migration → From auth-middleware`. The stories are the primary delivery channel for AI agents through the Reltio Design MCP, so they contain runnable code snippets and direct instructions — no architectural narrative.
- **BREAKING** for the legacy `auth-middleware` package: it is deprecated. The repository receives a README banner pointing to `@reltio/auth`, and no further releases are made. There is no automated codemod; migration is a documented one-file change in each consumer (admin-tools is the first).
- **Defer to follow-up features (not in v1)**: configurable cookie names, configurable Bearer header name, configurable logger, RFC 7662 token introspection, Edge-runtime token verification helper for Next.js `middleware.ts`, automated migration codemod, zero-config Next.js mounting (`export { GET, POST } from "@reltio/auth/next/route"`).

## Capabilities

### New Capabilities

- `auth`: BFF authentication and OAuth orchestration for Reltio applications. Covers OAuth 2.0 Authorization Code flow with Reltio's Login Page, session cookies, token introspection via Reltio's `/oauth/checkToken`, token refresh, and request signing for downstream Reltio API calls. Includes the framework-agnostic core, the Express and Next.js adapters, the public helper functions, and the consumer-facing documentation.

### Modified Capabilities

None. This is the first OpenSpec capability in the platform.

## Impact

- **New workspace**: `packages/auth/` joins `packages/design/`. The root `package.json` already declares `workspaces: ["packages/*"]`, no config change needed.
- **Monorepo tooling**: Vitest runs in Node mode for `packages/auth/` (browser mode stays for `packages/design/`). Storybook hosts the package overview at `packages/auth/README.story.mdx` and the three guides (setup × 2, migration) at `guides/auth/*.story.mdx`, displayed under the existing `Guides/` sidebar group. Biome, TypeScript, and Changesets are reused as-is.
- **Current consumers** (context, not in-scope work): every one of the 25 customer-facing applications listed in `public/apps/catalog.json` — `Console`, `Data Modeler`, `UI Modeler`, `Workflow Modeler`, `Inbox`, `RDM`, `Hub`, `Data Loader`, `Export`, `Integration Hub`, `User Management`, `SSO Configuration`, `Client Credentials`, `Tenant Management`, `Performance Monitoring`, `Usage Reporting`, `External Match`, `Account Settings`, `Notification Management`, `Data Sharing`, `Quality`, `Agents`, the three Resources entries, and `admin-tools` — currently consumes `auth-middleware` via the git dependency. An unknown set of internal Reltio services consumes it too. A subset of consumers additionally installs `node-oauth-provider` directly. None of these consumers are migrated as part of this change.
- **In-scope deliverable**: the `@reltio/auth@1.0.0` package published to npm, accompanied by Storybook documentation that teams and AI agents follow to migrate their own applications. Each consumer migration is its own subsequent OpenSpec change tracked in the consumer repository (admin-tools is expected to go first as the lead user, then the other 24 catalog apps on their own schedule). Legacy `auth-middleware` / `node-oauth-provider` deprecation (banners + lock to read-only) is similarly tracked outside this change, after the fleet has migrated.
- **Documentation**: a new section in the Storybook sidebar covers `@reltio/auth`. The Reltio Design MCP indexes the stories automatically and exposes them to AI agents through `list-all-documentation` and `get-documentation` tools.
- **Deprecated**: `bitbucket.org/reltio-ondemand/auth-middleware` and `bitbucket.org/reltio-ondemand/node-oauth-provider` repositories. README banners point to `@reltio/auth`.
- **Low production cutover risk**: URL paths, request/response shapes, and (by default) cookie names are preserved. If session cookies were ever invalidated by a future change, the central Reltio Login Page transparently re-authenticates users via its own SSO session, so the worst case is a one-time silent redirect through Login Page — not a credential prompt. Access tokens are short-lived anyway and users re-authenticate often during normal usage.
