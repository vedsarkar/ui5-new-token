# @reltio/auth

## 1.3.0

### Minor Changes

- 124724d: **Added: Dynamic OAuth cluster routing via the signed `reltio_aurl` cookie.**

  `POST /checkToken` and `POST /refreshToken` now route the upstream call per session to the Reltio Auth Server cluster that issued the user's access token, instead of always hitting the static `oauthPath` from config. This supports Reltio's multi-environment Auth Service topology (`auth.reltio.com`, `auth-idev-02.reltio.com`, `auth-test.reltio.com`, …) where tokens are issued and validated by a specific cluster.

  The cluster URL travels inside the access token as an `aurl` claim. At `/callback` time, the handler decodes the claim, signs it with HMAC-SHA256 (key derived from the existing `clientSecret`), and writes a third `HttpOnly` + `Secure` + `SameSite=Lax` + `Path=/` cookie named `reltio_aurl`. Every subsequent `/checkToken` and `/refreshToken` reads the cookie, verifies the MAC, and forwards the upstream call to that exact cluster. `/refreshToken` re-mints (or clears) the cookie after a successful refresh; `/logout` clears it alongside the existing three cookies.

  **Non-breaking.** No new config field is added; `AuthConfig` is unchanged from v1.1.0. The `createExpressAuth(config)` / `createNextAuth(config)` return values gain an additive `resolveAuthPath` member (see below) — a method on the returned `Router` for Express, a field next to `handlers` for Next.js — so existing mount lines and destructures keep working. Existing single-cluster deployments are unaffected at runtime — when no `reltio_aurl` cookie is present, or when verification fails for any reason (tampered, signed by a different key, malformed), the router falls back fail-closed to `AuthConfig.oauthPath`. No log, no throw, no response code change.

  **New API: `resolveAuthPath` on the adapter return value.**

  `createExpressAuth(config)` and `createNextAuth(config)` now expose a `resolveAuthPath(request)` function for application code that calls the Auth server directly — bypassing the auth router's `/checkToken` and `/refreshToken` endpoints (e.g. proxy handlers, telemetry middleware, custom refresh flows). It is the same resolver the router uses internally, so the HMAC key is derived exactly once — alongside the router — and reused on every call. It accepts Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly, reads the signed `reltio_aurl` cookie, and falls back to the static `oauthPath` when no valid cookie is present.

  ```ts
  import { createExpressAuth } from "@reltio/auth/express";
  import { getAccessToken } from "@reltio/auth/utils";

  const auth = createExpressAuth({
    oauthPath: process.env.OAUTH_PATH!,
    loginPath: process.env.LOGIN_PATH!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
  });
  app.use("/auth", auth);

  app.post("/api/internal/checkToken", async (req, res) => {
    const token = getAccessToken(req);
    if (!token) return res.sendStatus(401);

    const oauthPath = await auth.resolveAuthPath(req);
    const upstream = await fetch(`${oauthPath}/checkToken?token=${token}`, {
      /* ... */
    });
    res.status(upstream.status).json(await upstream.json());
  });
  ```

  For Next.js, destructure it alongside the handlers: `const { handlers, resolveAuthPath } = createNextAuth(config);`. The Express adapter attaches `resolveAuthPath` to the returned `Router`, so the existing `app.use(path, createExpressAuth(...))` usage is unchanged.

  **New runtime dependency: `fzstd@^0.1.1`** (pure-JS zstd decompression, Web-Crypto-compatible). Used only by the internal `decodeAurl` utility that extracts the `aurl` claim from Reltio JWT access tokens.

  **Behaviour change:** `oauthPath` is now validated as a URL at factory construction — an invalid value throws `TypeError: Invalid URL` at server boot instead of failing later on the first upstream call.

  See the [Dynamic OAuth Routing](?path=/docs/guides-auth-dynamic-oauth-routing--docs) guide for the full conceptual model, security rationale, and runtime examples (Express, Next.js Route Handler, Next.js Edge Middleware).

## 1.2.0

### Minor Changes

- 1ace89b: Export the full `@reltio/auth/utils` surface as supported public API.

  The barrel now `export *`s every helper the router uses, so BFF code can reuse them instead of carrying magic strings. Newly exposed: `parseCookies`, `serializeCookie`, `clearCookie`, the `CookieOptions` type, `ACCESS_TOKEN_COOKIE` / `REFRESH_TOKEN_COOKIE`, `validateState`, `readHeader` / `AnyRequest`, and `resolveRedirectParams` / `upgradeToHttps` / `RedirectParams`. Purely additive — no existing import or behaviour changes.

### Patch Changes

- 1ace89b: Fix subpath imports failing to type-check under TypeScript `moduleResolution: "node"` (classic / `node10`).

  Legacy consumers on the classic resolver hit `TS2305` / `TS2307` on every subpath import because it ignores `exports`. Added a `typesVersions` map pointing each subpath at the same `.d.ts` as `exports.types`; modern resolvers keep using `exports.types`, classic-node falls back to `typesVersions`. Runtime is untouched and no consumer-side tsconfig change is needed.

## 1.1.0

### Minor Changes

- 0c6cf59: **Added: `?tenant=` and `?returnTo=` query parameters on `/login` and `/logout`.**

  `GET /login` and `GET /logout` now accept two optional query parameters that take precedence over the `Referer` header:

  - `?tenant=<non-empty-string>` — sets the `tenant` parameter forwarded to the Reltio Login Page. An empty or whitespace-only value falls back to the referer source.
  - `?returnTo=<absolute-url>` — sets the post-login/logout return URL and the origin used to build the OAuth `redirect_uri`. When absent, the handler falls back to the `Referer` header (v1 behaviour, untouched).

  **Cross-source origin check:** when both `?returnTo=` and `Referer` are present, the handler asserts `new URL(returnTo).origin === refererUrl.origin` and returns `400 returnTo origin does not match Referer origin` on mismatch. When `?returnTo=` is supplied alone (no `Referer`), no BFF-side check is performed — the Reltio OAuth server's `redirect_uri` allowlist is the authoritative protection in that path.

  **Removed: `redirectUrl` origin validation in `/callback`.**

  The `validateRedirectUrl` check in `GET /callback` has been removed. `validateRedirectUrl` had a valid purpose originally — it blocked open-redirect attacks by ensuring `redirectUrl` came from the same origin as the BFF. With DESIGN-76, that protection moved upstream: `resolveRedirectParams` now validates the `returnTo` origin at `/login` (before the OAuth flow begins), so the `redirectUrl` that reaches `/callback` has already been vetted at source. The check at `/callback` became redundant. Additionally, the check was broken behind any reverse proxy — it compared `redirectUrl` against `request.url.origin`, which the Express adapter built from `req.get("host")`. Unlike `req.hostname`, `req.get("host")` always returns the raw `Host` header (e.g. `localhost:3000`) regardless of `trust proxy` or `X-Forwarded-Host`, so the origin never matched the public app origin in deployed environments.

  **Improved: Express adapter no longer reconstructs the public hostname.**

  `expressToWebRequest` previously assembled `request.url` from `req.protocol` and `req.get("host")`, which are unreliable behind reverse proxies. It now uses a fixed IANA-reserved placeholder origin (`http://internal.invalid`) combined with `req.originalUrl`. Handlers only ever read `.pathname` and `.searchParams` from `request.url` — the origin was never meaningful in that context.

  **Non-breaking:** all existing consumers relying on `Referer`-only resolution continue to work without any code change. The removed `validateRedirectUrl` behavior is fully covered by upstream protections.

## 1.0.0

### Major Changes

- 38b3747: First stable release of `@reltio/auth` — the BFF authentication package for Reltio applications, replacing the legacy git-installed [`auth-middleware`](https://bitbucket.org/reltio-ondemand/auth-middleware) library with a published npm package.

  `@reltio/auth` implements the Reltio OAuth Authorization Code flow used by every customer-facing Reltio application: login redirect to the central Reltio Login Page, callback exchange, refresh token rotation, and token introspection against `/oauth/checkToken`. It ships as a framework-agnostic Web Fetch API core with thin Express and Next.js App Router adapters, so the same callback code runs on both runtimes without modification.

  ### Subpath exports

  `@reltio/auth` has no bare entry point — every import goes through a named subpath, matching the convention enforced by `@reltio/design`.

  - **`@reltio/auth/types`** — TypeScript type declarations: `AuthConfig`, `SsoRedirect`, `SsoRedirectContext`, `TokenResponse`, `CheckTokenResponse`. Use these to type callbacks and config objects. No runtime code.
  - **`@reltio/auth/express`** — `createExpressAuth(config)`, an Express `Router` factory for legacy Express apps and Next.js custom-server deployments.
  - **`@reltio/auth/next`** — `createNextAuth(config)`, returning `{ handlers: { GET, POST } }` for a Next.js App Router catch-all route at `app/auth/[...auth]/route.ts`.
  - **`@reltio/auth/utils`** — framework-agnostic helpers: `getAccessToken(req)`, `getRefreshToken(req)`, `getBasicToken(clientId, clientSecret)`. Each accepts Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly.

  ### Endpoints

  All five legacy endpoint paths are preserved at the same URLs, with the same cookie names (`access_token`, `refresh_token`, `state`) and the same `HttpOnly` / `Secure` / `SameSite=Lax` semantics:

  - `GET /login` — redirect to the Reltio Login Page with a CSRF `state` cookie.
  - `POST /logout` — clear authentication cookies.
  - `GET /callback` — exchange the authorization code for tokens, set cookies, and redirect (or invoke the `ssoRedirect` callback).
  - `POST /refreshToken` — rotate the access and refresh tokens.
  - `GET /checkToken` — introspect the current access token against `/oauth/checkToken`.

  ### Installation

  ```bash
  npm install @reltio/auth
  ```

  Express applications also need `express` itself as a peer dependency; Next.js App Router applications need `next >=13`. Both peer dependencies are marked optional — install only the one your application uses.

  ```ts
  // app/auth/[...auth]/route.ts
  import { createNextAuth } from "@reltio/auth/next";

  export const { GET, POST } = createNextAuth({
    oauthPath: process.env.OAUTH_PATH!,
    loginPath: process.env.LOGIN_PATH!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
  }).handlers;
  ```

  See [reltio.design](https://reltio.design) for the full guides — [Setup → Express](https://reltio.design/?path=/docs/guides-auth-setup-express--docs), [Setup → Next.js App Router](https://reltio.design/?path=/docs/guides-auth-setup-next-js-app-router--docs), [Migration → From auth-middleware](https://reltio.design/?path=/docs/guides-auth-migration-from-auth-middleware--docs).

  ### Modernisation over `auth-middleware`

  The on-the-wire contract is preserved, but the implementation has been rewritten from the ground up on a modern stack:

  - **Node ≥20**, dual ESM + CJS builds, `.d.ts` shipped for every subpath.
  - **Native `fetch` and Web Crypto** — no `node-fetch`, no `node:crypto`, no `request`.
  - **Web Fetch API core** — `Request` in, `Response` out. Express and Next.js adapters are thin shims around the same core, so the `ssoRedirect` callback has one signature on both runtimes.
  - **Strict TypeScript** with the `AuthConfig` shape enforced at compile time. Untyped config sources (env vars, JSON) validate at their own boundary.
  - **Vitest + MSW + Supertest** test suite covering all five endpoints on both adapters plus the utility helpers.

  ### Breaking changes vs. legacy `auth-middleware`

  `@reltio/auth` is a fresh package, not a drop-in import swap. Migration is mechanical and documented end-to-end in the [Migration guide](https://reltio.design/?path=/docs/guides-auth-migration-from-auth-middleware--docs), but the following intentional breaks are worth highlighting:

  - **No bare entry point.** `import x from "@reltio/auth"` fails at install. Use one of `/types`, `/express`, `/next`, `/utils`.
  - **`ssoRedirect` adopts a Web API signature.** The callback now receives `{ request, redirectUrl, tokens }` and returns a Web `Response` instead of the legacy `(req, res, next, redirectUrl, tokens)` Express tuple. The same callback runs on both Express and Next.js with no changes.
  - **`createSigningHandler` is removed.** Middleware that mutated `req.headers.authorization` was an anti-pattern. Read the token explicitly in your proxy route with `getAccessToken(req)` from `@reltio/auth/utils`.
  - **Direct `node-oauth-provider` consumption is no longer supported.** All OAuth orchestration goes through `@reltio/auth`. The official guideline (and the Reltio Design MCP) point exclusively at this package.
  - **All access/refresh tokens after upgrade require a fresh login.** Existing token cookies from the legacy middleware will not validate against the new state-cookie format. Reltio's short-lived tokens already force frequent logins and the central Login Page preserves the session, so the user-visible impact is one extra redirect.
