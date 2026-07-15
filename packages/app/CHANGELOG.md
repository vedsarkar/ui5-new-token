# @reltio/app

## 0.2.0

### Minor Changes

- Update the scaffolded template with an environment-aware configuration system.

  - Add `config/*.json` (`default`, `dev`, `prod`) resolved at startup by `APP_ENV`, deep-merged over the defaults (`config/deepMerge.ts`, `config/index.ts`) and consumed server-side via `import config from "@/config"`.
  - Add a `GET /api/config` route that exposes a curated public config subset, consumed on the client through the new `useConfig()` hook.
  - Add `Tenants`, `Config`, and `Environments` pages, plus an `authFetch` helper and a `useTenants` hook.
  - Wire `lib/auth.ts` to read `oauthPath` / `loginPath` from `@/config`; the environment now holds only secrets (`CLIENT_ID`, `CLIENT_SECRET`) and the build-time `BASE_PATH`. `OAUTH_PATH` / `LOGIN_PATH` env vars are removed in favor of `config/*.json`.
  - Bump the template's bundled `@reltio/auth` dependency to `^1.6.0`.

## 0.1.0

### Minor Changes

- d5b91a9: Add `@reltio/app` — the Reltio application CLI. A single scoped package with a subcommand dispatcher (like `@reltio/skills`), invoked as `npx @reltio/app <command>`:

  - `npx @reltio/app create [name]` — scaffold a runnable Next.js App Router app wired to `@reltio/design` and `@reltio/auth`.
  - `npx @reltio/app update` — reserved for in-place refresh of the template-owned files (planned).

  The v1 template is a **client-first, fully auth-gated** app with a deliberately thin BFF:

  - **Auth served from the Next.js Proxy (middleware).** `proxy.ts` mounts the five `@reltio/auth` endpoints (`login` / `logout` / `callback` / `refreshToken` / `checkToken`) — there is no `app/auth/[...auth]/route.ts`. Running in middleware means `request.url` still carries the base path, so the OAuth callback resolves under the sub-path automatically.
  - **Base path aware.** Served under a required `BASE_PATH` (Next.js `basePath`), validated at startup in `next.config.mjs`, so the app can be mounted behind a platform's path rewrite; visiting the origin root redirects to it.
  - **Client-first session.** No server actions or server-side data fetching. `AppShell` fetches the session in the browser (`POST /auth/checkToken`) behind a `BusyIndicator` preloader and renders the app only once authenticated.
  - **`useFetch` hook** (wrapping `@reltio/design`'s `useFetch`) routes every request through the session lifecycle — `401 → silent refresh → retry → login` — prepends the base path to app-local URLs, and passes a client-set `returnTo` (the browser is the only trustworthy source of the return URL behind a rewrite).
  - **Chrome & theming** from `@reltio/design` (`ShellBar` / `UserMenu`), with SAP Horizon `variables.css` / `fonts.css` loaded from the Reltio CDN.

  Replaces the earlier `npm create @reltio/app` flow (the separate `@reltio/create-app` package). The package builds to a self-contained `dist/` (CLI + bundled template) and publishes from it, matching the monorepo's release model. A local, in-place preview of the template is available via `npm run app-template`.
