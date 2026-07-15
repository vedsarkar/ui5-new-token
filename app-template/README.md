# Reltio App

A Reltio application starter built with
[`@reltio/design`](https://www.npmjs.com/package/@reltio/design) and
[`@reltio/auth`](https://www.npmjs.com/package/@reltio/auth), scaffolded with
`npx @reltio/app create`.

## Getting started

1. Install dependencies (if you skipped it during scaffolding):

   ```bash
   npm install
   ```

2. Configure your Reltio OAuth client:

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in the auth-service secrets `AUTH_CLIENT_ID` and `AUTH_CLIENT_SECRET`
   (the OAuth client for the interactive login flow) and the API-service
   secrets `API_CLIENT_ID` and `API_CLIENT_SECRET` (a separate `client_credentials`
   client the app uses to call internal Reltio services on its own behalf — see
   [Config-service proxy](#config-service-proxy)). Set `BASE_PATH` (the
   sub-path this app is served under, e.g. `/my-app`), and pick `APP_CONFIG`
   (`dev` or `prod`). Keep `SECURE=false` for local http development. The app
   will not start until the required variables are set.

   Runtime, non-secret settings (`oauthPath`, `loginPath`, ...) live in
   `config/*.json`, not in `.env`. `config/<APP_CONFIG>.json` is deep-merged over
   `config/default.json` at startup — see [Configuration](#configuration).

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You'll be redirected to
   your `BASE_PATH` and then to the Reltio Login Page; after signing in you land
   on a protected page showing your user and tenants.

## Configuration

Runtime, non-secret settings live in `config/*.json`, resolved at startup:

- `config/default.json` — settings shared by every environment.
- `config/<APP_CONFIG>.json` (`dev.json` / `prod.json`) — per-environment
  overrides, **deep-merged** over the defaults (objects extend, arrays and
  primitives replace).
- `config/index.ts` — reads `APP_CONFIG`, performs the merge, and exports the
  resolved config as `import config from "@/config"`.

`APP_CONFIG` is a **start-time** variable: build artifacts are identical across
environments and carry no `APP_CONFIG`; the value is injected when the artifact
boots, so one build can be deployed to any environment.

Only settings the browser needs are exposed — the `GET /api/config` route
returns a curated public subset (see `app/api/config/route.ts`), consumed on the
client via `useConfig()` (`lib/useConfig.ts`).

Note the split: **secrets and the build-time `BASE_PATH` stay in the
environment**, while `config/*.json` is for runtime, non-secret settings only.

## Base path

The app is served under `BASE_PATH` (Next.js [`basePath`](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)),
so it can be mounted behind a platform's path rewrite. Next prefixes routing,
`<Link>`, navigation, and static assets automatically; `proxy.ts` and the auth
route keep the login round-trip inside the sub-path. Visiting the origin root
(`/`) redirects to `BASE_PATH`.

Because Next bakes `basePath` into the build (it cannot change at runtime), it
is an **environment variable**, not part of the runtime-resolved `@/config`.
`next.config.mjs` reads and validates it, so an invalid or missing value stops
the server with a clear message.

## What's inside

- `lib/auth.ts` — the `@reltio/auth` router; `oauthPath` / `loginPath` from
  `@/config`, secrets from the environment.
- `app/auth/[...auth]/route.ts` — mounts `/auth/login`, `/auth/logout`,
  `/auth/callback`, `/auth/refreshToken`, `/auth/checkToken`.
- `lib/session.ts` — server helpers `getUser()` / `requireUser()` that
  introspect the current token.
- `proxy.ts` — Next.js Proxy (formerly Middleware) that redirects
  unauthenticated visitors straight to the Reltio Login Page via `/auth/login`.
- `app/layout.tsx` — root layout; renders the app chrome once around every page,
  so pages only render their own content.
- `app/AppShell.tsx` — the `@reltio/design` `ShellBar` + `UserMenu` chrome
  mounted by the layout; the user menu's Sign Out delegates to `/auth/logout`.
- `app/page.tsx` — protected page showing the signed-in user and tenants.
- `lib/auth.ts` — also exports `getServiceToken()`, which mints an API-client
  access token via the OAuth `client_credentials` grant (defaults to
  `config.oauthPath` + `API_CLIENT_ID`/`API_CLIENT_SECRET`).
- `app/api/config/service/[...path]/route.ts` — the config-service proxy (below).

## Config-service proxy

`GET /api/config/service/<path>` is a same-origin BFF proxy to the internal
Reltio **configuration service**, where shared configurations live. It forwards
to `${configServicePath}/<path>` (configured per environment in `config/*.json`),
so `/api/config/service/adminToolsConfig?tenant=default&environment=default`
reaches the config service's `/service/adminToolsConfig?...`.

Unlike `/auth/proxy` — which forwards the **user's** session token to allow-listed
Reltio APIs — this route authenticates as the app's **API client**: it attaches a
`client_credentials` service token minted from `API_CLIENT_ID` /
`API_CLIENT_SECRET` (`getServiceToken` in `lib/auth`), never the signed-in user's token. The
route is gated behind a valid Reltio session, so only authenticated app users can
reach it; a valid session is enough (no specific role). Tighten `checkToken`
options if you need to gate further.

It is **read-only** and **memory-safe**: the upstream response is streamed
straight back (never buffered) and `cache: "no-store"` keeps Next from buffering
it into the Data Cache, so a very large configuration does not blow up memory.

## Next steps

This starter focuses on authentication. From here you can add an application
shell, data pages backed by the Reltio REST APIs, and more — composing
components from `@reltio/design`. See <https://reltio.design>.
