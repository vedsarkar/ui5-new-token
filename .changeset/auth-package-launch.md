---
"@reltio/auth": major
---

First stable release of `@reltio/auth` — the BFF authentication package for Reltio applications, replacing the legacy git-installed [`auth-middleware`](https://bitbucket.org/reltio-ondemand/auth-middleware) library with a published npm package.

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
