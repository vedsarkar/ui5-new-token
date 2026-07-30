# @reltio/app

## 0.6.0

### Minor Changes

- 093b0e8: Split `TenantSelector` environment into display name and machine id, with backward-compatible fallbacks.

  - `TenantEntry` gains optional `environmentName` (column, filters, search, trigger) and `environmentId` (row key / selection match), aligned with `customerName` / `tenantName`
  - Deprecated `TenantEntry.environment` is kept: when the new fields are omitted, it is used for both display and identity
  - `selectedEnvironmentId` is preferred; deprecated `selectedEnvironment` is still accepted as a fallback
  - App template `useTenants` returns `TenantEntry[]` with both new fields; the separate `TenantOption` enrichment wrapper is removed

  **Migration (recommended):** set `environmentName` and `environmentId` instead of `environment`, and rename `selectedEnvironment` to `selectedEnvironmentId`. Legacy callers that only pass `environment` / `selectedEnvironment` keep working without changes.

## 0.5.1

### Patch Changes

- Exclude generated CSS Module artifacts (`*.module.css.ts`, `*.module.css.json`) from the scaffolded app template.

  These Vite/Storybook-generated files could leak into the published package and collide with the real `*.module.css` files in a newly created app, breaking its build. The CLI build now skips them when staging the template.

## 0.5.0

### Minor Changes

- Add Storybook to app-template for local development, testing, and documentation.

  **Storybook setup** (`@storybook/react-vite` + Vite):

  - Visual testing via Chromatic (private)
  - Accessibility testing via `@storybook/addon-a11y` (todo mode)
  - Interaction testing via `@storybook/addon-vitest` + Playwright (headless Chromium)
  - Code coverage via `@vitest/coverage-v8`
  - API mocking via MSW + `msw-storybook-addon`
  - Next.js module mocks (`next/navigation`, `next/link`, `next/image`, `next/headers`)

  **AppShell decorator**: every story is wrapped in the full app chrome (header, sidebar, navigation) by default. Configurable per-story via `parameters.appShell` (pathname, tenant, env). Uses React Context for isolated navigation state — multiple stories on the Docs page render correctly.

  **Structured API mocks** (`.storybook/mocks/`):

  - `auth.ts` — `checkTokenSuccess`, `checkTokenUnauthorized`, `checkTokenNetworkError`
  - `config.ts` — `adminToolsConfigSuccess`/`Empty`/`Error`, `consoleAppsSuccess`/`Error`, `commonSuccess`/`Error`
  - `tenants.ts` — `tenantsSuccess`, `tenantsEmpty`, `tenantsError`
  - `index.ts` — `handlers()` composer with per-endpoint overrides
  - All mock data generated with `@faker-js/faker` (seeded for deterministic snapshots)

  **MDX documentation** (`page.story.mdx`): example docs page with embedded Canvas blocks showing different page states, and a guide for writing page stories.

  **authFetch**: target URL added as a query parameter on proxy requests (`/proxy?reltio-target-url=...`) alongside the header — visible in DevTools and matchable by MSW without header inspection.

  **Scripts**: `storybook`, `build-storybook`, `test`, `coverage`, `chromatic`.

## 0.4.0

### Minor Changes

- Show the selected tenant's business configuration on the scaffolded Entities and Relationships pages, with in-memory caching for configuration reads.

  - New `useTenantConfiguration` hook fetches the selected tenant's data-model configuration (`GET {apiPath}/api/{tenantId}/configuration`) and returns the full payload; pages pick the slice they render.
  - The `Entities` and `Relationships` pages now render the tenant's `entityTypes` / `relationTypes` as a pretty-printed JSON block (via a shared `ConfigurationJson` view) instead of placeholders.
  - `useConfig` and `useTenantConfiguration` memoize results per URL in a browser in-memory cache, so navigating between pages reuses the loaded configuration instead of refetching it. `useFetch` accepts `url = null` to skip a request entirely (used for cache hits and while a dependency isn't ready).
  - `useTenants` now tolerates a non-array `enhancedTenants` response for a single environment (folding it into that environment's error slice) instead of crashing the whole tenant list.

- Add client-side navigation and context-preserving links to the scaffolded app template.

  - In-app links — including the ones UI5 renders in its Shadow DOM (`SideNavigation`, `ShellBar`, …) — now route through the Next.js router instead of triggering a full-page reload, via a single `useLinks` interceptor mounted in `AppShell`.
  - The working context (`env`/`tenant`/`customer`) is carried across navigation automatically; a new `useHref` helper also bakes it into hrefs so it survives cases that bypass the interceptor (open in new tab, copy link). Opt out per link with `data-no-context`, or skip client-side routing entirely with `data-native-link`.
  - Add example `Entities` and `Relationships` pages wired into the side navigation to demonstrate page transitions.

## 0.3.0

### Minor Changes

- Add a config-service proxy and split auth/API credentials in the scaffolded template.

  - Add `GET /api/config/service/<path>` — a same-origin, read-only BFF proxy to the Reltio configuration service. It authenticates as the app's **API client** (`client_credentials` service token) rather than the signed-in user's token, is gated behind a valid session, and streams the upstream response without buffering.
  - Add `getServiceToken()` to `lib/auth`, which mints an API-client access token via the OAuth `client_credentials` grant.
  - Split the OAuth secrets into two clients: `AUTH_CLIENT_ID` / `AUTH_CLIENT_SECRET` (interactive login) and `API_CLIENT_ID` / `API_CLIENT_SECRET` (service-to-service calls). Renames the previous `CLIENT_ID` / `CLIENT_SECRET`.
  - Rename the start-time config selector `APP_ENV` to `APP_CONFIG` (env var and `config/index.ts`).
  - Rework `AppShell` around a CSS Grid layout (`AppShell.module.css`) with `TenantSelector` and `AppNavigation`, and reshape the `useConfig` / `useTenants` hooks accordingly.
  - Remove the standalone `Tenants`, `Config`, and `Environments` pages in favor of the tenant/app navigation in `AppShell`.

  **Note:** existing scaffolds must rename `APP_ENV` → `APP_CONFIG` and `CLIENT_ID` / `CLIENT_SECRET` → `AUTH_CLIENT_ID` / `AUTH_CLIENT_SECRET`, and add `API_CLIENT_ID` / `API_CLIENT_SECRET` to use the config-service proxy. Freshly created apps (`npx @reltio/app create`) need no changes.

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
