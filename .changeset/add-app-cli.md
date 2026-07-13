---
"@reltio/app": minor
---

Add `@reltio/app` — the Reltio application CLI. A single scoped package with a subcommand dispatcher (like `@reltio/skills`), invoked as `npx @reltio/app <command>`:

- `npx @reltio/app create [name]` — scaffold a runnable Next.js App Router app wired to `@reltio/design` and `@reltio/auth`.
- `npx @reltio/app update` — reserved for in-place refresh of the template-owned files (planned).

The v1 template is a **client-first, fully auth-gated** app with a deliberately thin BFF:

- **Auth served from the Next.js Proxy (middleware).** `proxy.ts` mounts the five `@reltio/auth` endpoints (`login` / `logout` / `callback` / `refreshToken` / `checkToken`) — there is no `app/auth/[...auth]/route.ts`. Running in middleware means `request.url` still carries the base path, so the OAuth callback resolves under the sub-path automatically.
- **Base path aware.** Served under a required `BASE_PATH` (Next.js `basePath`), validated at startup in `next.config.mjs`, so the app can be mounted behind a platform's path rewrite; visiting the origin root redirects to it.
- **Client-first session.** No server actions or server-side data fetching. `AppShell` fetches the session in the browser (`POST /auth/checkToken`) behind a `BusyIndicator` preloader and renders the app only once authenticated.
- **`useFetch` hook** (wrapping `@reltio/design`'s `useFetch`) routes every request through the session lifecycle — `401 → silent refresh → retry → login` — prepends the base path to app-local URLs, and passes a client-set `returnTo` (the browser is the only trustworthy source of the return URL behind a rewrite).
- **Chrome & theming** from `@reltio/design` (`ShellBar` / `UserMenu`), with SAP Horizon `variables.css` / `fonts.css` loaded from the Reltio CDN.

Replaces the earlier `npm create @reltio/app` flow (the separate `@reltio/create-app` package). The package builds to a self-contained `dist/` (CLI + bundled template) and publishes from it, matching the monorepo's release model. A local, in-place preview of the template is available via `npm run app-template`.
