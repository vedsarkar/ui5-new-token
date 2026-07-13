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

   Fill in `OAUTH_PATH`, `LOGIN_PATH`, `CLIENT_ID`, `CLIENT_SECRET`, and
   `BASE_PATH` (the sub-path this app is served under, e.g. `/my-app`). Keep
   `SECURE=false` for local http development. The app will not start until every
   required variable is set.

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You'll be redirected to
   your `BASE_PATH` and then to the Reltio Login Page; after signing in you land
   on a protected page showing your user and tenants.

## Base path

The app is served under `BASE_PATH` (Next.js [`basePath`](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)),
so it can be mounted behind a platform's path rewrite. Next prefixes routing,
`<Link>`, navigation, and static assets automatically; `proxy.ts` and the auth
route keep the login round-trip inside the sub-path. Visiting the origin root
(`/`) redirects to `BASE_PATH`. It is validated at startup — an invalid or
missing value stops the server with a clear message.

## What's inside

- `lib/auth.ts` — the `@reltio/auth` router, configured from environment
  variables.
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

## Next steps

This starter focuses on authentication. From here you can add an application
shell, data pages backed by the Reltio REST APIs, and more — composing
components from `@reltio/design`. See <https://reltio.design>.
