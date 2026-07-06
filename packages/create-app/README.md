# @reltio/create-app

Scaffold a **Reltio application starter** — a runnable Next.js App Router app
wired to [`@reltio/design`](https://www.npmjs.com/package/@reltio/design) and
[`@reltio/auth`](https://www.npmjs.com/package/@reltio/auth).

```bash
npm create @reltio/app my-app
# or
npx @reltio/create-app my-app
```

Answer the prompts (dependency install, git init), then:

```bash
cd my-app
cp .env.local.example .env.local   # fill in your Reltio OAuth client
npm run dev
```

## What you get (v1)

The v1 starter focuses on the **authentication flow** so you have a working,
secure foundation to build on:

- Reltio OAuth **login / logout / callback** via `@reltio/auth` mounted at
  `app/auth/[...auth]/route.ts`.
- **Route gating** through `proxy.ts` (Next.js Proxy, formerly Middleware) —
  unauthenticated visitors are sent to the Reltio Login Page.
- A **protected page** that proves the session: it reads the introspected token
  server-side and shows the signed-in user's `username` / `email` and their
  real Reltio `tenants`, plus a Logout button.
- `@reltio/design`'s `variables.css` linked for SAP Horizon base styling
  (`data-theme="sap-reltio-light"`).

Richer UI (application shell, app switcher, a BFF proxy to Reltio REST APIs,
example data pages, theming/dark mode) is intentionally left out of v1 and
added later as separate features.

## Configuration

Set these in `.env.local` (see `.env.local.example`):

<table>
	<thead>
		<tr><th>Variable</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr><td><code>OAUTH_PATH</code></td><td>Reltio OAuth server, e.g. <code>https://auth-stg.reltio.com/oauth</code></td></tr>
		<tr><td><code>LOGIN_PATH</code></td><td>Reltio Login Page, e.g. <code>https://login-stg.reltio.com</code></td></tr>
		<tr><td><code>CLIENT_ID</code></td><td>OAuth client id registered with Reltio</td></tr>
		<tr><td><code>CLIENT_SECRET</code></td><td>OAuth client secret</td></tr>
		<tr><td><code>SECURE</code></td><td><code>false</code> for local http development (cookies not <code>Secure</code>-only)</td></tr>
	</tbody>
</table>

## License

Licensed under the [Apache License, Version 2.0](./LICENSE). See
[`NOTICE`](./NOTICE) for attribution.
