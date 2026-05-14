# @reltio/auth

**@reltio/auth** is the BFF authentication package for Reltio applications — Express and Next.js App Router adapters over a framework-agnostic Web Fetch API core.

It implements the Reltio OAuth Authorization Code flow used by every customer-facing Reltio application: login redirect to the central Reltio Login Page, callback exchange, refresh token rotation, and token introspection against `/oauth/checkToken`. It is the modern replacement for the legacy `auth-middleware` git-installed package.

- Single npm package, dual runtime (ESM + CJS), Node ≥20.
- First-class TypeScript types, full `.d.ts` shipped.
- Native `fetch` and Web Crypto — no `node-fetch`, no `node:crypto`.
- Same `ssoRedirect` callback signature in Express and Next.js — write the callback once, deploy it on any Web Fetch runtime.

## Installation

```bash
npm install @reltio/auth
```

Express applications also need `express` itself as a peer dependency; Next.js App Router applications need `next >=13`. Both peer dependencies are marked optional — you install only the one your application uses.

## Usage — Next.js App Router (canonical)

Create a catch-all route file at `app/auth/[...auth]/route.ts`:

```ts
import { createNextAuth } from "@reltio/auth/next";

export const { GET, POST } = createNextAuth({
	oauthPath: process.env.OAUTH_PATH!,
	loginPath: process.env.LOGIN_PATH!,
	clientId: process.env.CLIENT_ID!,
	clientSecret: process.env.CLIENT_SECRET!,
}).handlers;
```

That's all. The five endpoints (`/auth/login`, `/auth/logout`, `/auth/callback`, `/auth/refreshToken`, `/auth/checkToken`) are now live.

The `[...auth]` catch-all parameter name is arbitrary — `@reltio/auth` dispatches by the last URL segment, not by Next.js's `params`. Name it `[...slug]`, `[...path]`, or anything else; the only requirement is that the LAST URL segment matches one of the five reserved names above.

## Usage — Express (legacy / hybrid Next.js + custom server)

```ts
import express from "express";
import { createExpressAuth } from "@reltio/auth/express";

const app = express();
app.use(
	"/auth",
	createExpressAuth({
		oauthPath: process.env.OAUTH_PATH!,
		loginPath: process.env.LOGIN_PATH!,
		clientId: process.env.CLIENT_ID!,
		clientSecret: process.env.CLIENT_SECRET!,
	}),
);
```

The router is mount-point agnostic — `/auth`, `/api/auth`, or any other path works the same.

## Subpath exports

`@reltio/auth` has no bare entry point — every import goes through a named subpath. This matches the platform convention enforced by `@reltio/design`.

| Subpath | What's in it |
|---|---|
| `@reltio/auth/types` | TypeScript type declarations: `AuthConfig`, `SsoRedirect`, `SsoRedirectContext`, `TokenResponse`, `CheckTokenResponse`. Use these to type your callback and config objects. No runtime code. |
| `@reltio/auth/express` | `createExpressAuth(config)` — Express `Router` factory. |
| `@reltio/auth/next` | `createNextAuth(config)` — returns `{ handlers: { GET, POST } }` for Next.js App Router. |
| `@reltio/auth/utils` | Framework-agnostic helpers: `getAccessToken(req)`, `getRefreshToken(req)`, `getBasicToken(clientId, clientSecret)`. Accepts Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly. |

> **Always use a subpath.** `import x from "@reltio/auth"` (no subpath) deliberately fails — there is no `main`/`exports` target for the bare package name.

## Customising the post-login redirect (`ssoRedirect`)

The optional `ssoRedirect` callback runs at the end of a successful `/callback` exchange. It receives a context object with the tokens and the requested redirect URL, and returns a Web `Response`:

```ts
import type { SsoRedirect } from "@reltio/auth/types";

export const ssoRedirect: SsoRedirect = ({ redirectUrl, request }) => {
	const url = new URL(redirectUrl);
	const tenant = new URL(request.url).searchParams.get("tenant");
	if (tenant) {
		url.searchParams.set("tenant", tenant);
	}
	return Response.redirect(url.href, 302);
};
```

The same signature works in both Express and Next.js — no framework-specific adapter for the callback shape.

## Configuration

```ts
type AuthConfig = {
	/** URL of the Reltio OAuth server, e.g. `https://auth-stg.reltio.com/oauth`. */
	oauthPath: string;
	/** URL of the Reltio Login Page, e.g. `https://login-stg.reltio.com`. */
	loginPath: string;
	/** OAuth client id registered with the Reltio OAuth server. */
	clientId: string;
	/** OAuth client secret registered with the Reltio OAuth server. */
	clientSecret: string;
	/** Post-callback hook returning a Web `Response`. */
	ssoRedirect?: SsoRedirect;
	/** Set cookies with the `Secure` flag and force `https` in redirect URLs. Default `true`. */
	secure?: boolean;
	/** Append `notenant=true` to the Login Page URL. Default `false`. */
	notenant?: boolean;
};
```

All four required keys (`oauthPath`, `loginPath`, `clientId`, `clientSecret`) are enforced at compile time by TypeScript. Consumers reading config from environment variables, JSON files, or other untyped sources are responsible for their own validation at the boundary.

## Reading the access token in your own routes

Need the access token in a BFF endpoint that proxies to Reltio API? Read it explicitly — never let middleware mutate the request:

```ts
import { getAccessToken } from "@reltio/auth/utils";

app.get("/api/profile", async (req, res, next) => {
	const token = getAccessToken(req);
	if (!token) {
		res.sendStatus(401);
		return;
	}
	const profile = await fetch("https://reltio.com/api/.../profile", {
		headers: { Authorization: `Bearer ${token}` },
	}).then((r) => r.json());
	res.json(profile);
});
```

`getAccessToken` accepts Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly, reads from `Authorization: Bearer` first then the `access_token` cookie, and **never mutates** the request argument.

## Storybook documentation

- [Setup → Express](?path=/docs/guides-auth-setup-express--docs) — full walkthrough including config object, router mount, and error handling.
- [Setup → Next.js App Router](?path=/docs/guides-auth-setup-next-js-app-router--docs) — full walkthrough for `app/auth/[...auth]/route.ts`.
- [Migration → From auth-middleware](?path=/docs/guides-auth-migration-from-auth-middleware--docs) — import-path mapping, before/after code, breaking changes.

## License

Licensed under the [Apache License, Version 2.0](./LICENSE). See [`NOTICE`](./NOTICE) for attribution.
