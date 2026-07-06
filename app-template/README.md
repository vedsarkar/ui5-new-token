# Reltio App

A Reltio application starter built with
[`@reltio/design`](https://www.npmjs.com/package/@reltio/design) and
[`@reltio/auth`](https://www.npmjs.com/package/@reltio/auth), scaffolded with
`npm create @reltio/app`.

## Getting started

1. Install dependencies (if you skipped it during scaffolding):

   ```bash
   npm install
   ```

2. Configure your Reltio OAuth client:

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in `OAUTH_PATH`, `LOGIN_PATH`, `CLIENT_ID`, `CLIENT_SECRET`. Keep
   `SECURE=false` for local http development.

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You'll be redirected to
   the Reltio Login Page; after signing in you land on a protected page showing
   your user and tenants.

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
