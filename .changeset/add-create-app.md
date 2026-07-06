---
"@reltio/create-app": minor
---

Add `@reltio/create-app` — a scaffolding CLI that generates a runnable Next.js App Router starter wired to `@reltio/design` and `@reltio/auth`.

Run `npm create @reltio/app my-app` (or `npx @reltio/create-app my-app`). The v1 template (Next.js 16 App Router) focuses on the authentication flow: real Reltio OAuth login/logout/callback via `@reltio/auth`, route gating through `proxy.ts`, a server-side session helper (`checkToken`), and a protected page that shows the signed-in user and their tenants. `@reltio/design`'s `variables.css` is linked for SAP Horizon base styling. A local, in-place preview is available in the monorepo via `npm run app-template`.
