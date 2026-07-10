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

## Path-based tenant routing

`GET /login` and `GET /logout` (or `/auth/login` / `/api/auth/login` depending on your mount path) accept two optional query parameters — `?tenant=` and `?returnTo=` — that take precedence over the `Referer` header. This lets consumers whose tenant lives in the URL path (e.g. `/ui/<tenant>/...`) drive the auth flow without relying on the browser's `Referer`:

```tsx
// HUB UI pattern — tenant in the URL path, mounted at /
const returnTo = `${window.location.origin}/ui/${tenant}/dashboard`;
const href = `/login?tenant=${tenant}&returnTo=${encodeURIComponent(returnTo)}`;

<a href={href}>Sign in</a>
```

See the [Setup → Express](?path=/docs/guides-auth-setup-express--docs) or [Setup → Next.js App Router](?path=/docs/guides-auth-setup-next-js-app-router--docs) guide for a full worked example using HUB UI's path shape.

## Subpath exports

`@reltio/auth` has no bare entry point — every import goes through a named subpath. This matches the platform convention enforced by `@reltio/design`.

| Subpath | What's in it |
|---|---|
| `@reltio/auth/types` | TypeScript type declarations: `AuthConfig`, `AuthEnvironment`, `SsoRedirect`, `SsoRedirectContext`, `TokenResponse`, `CheckTokenResponse`. Use these to type your callback and config objects. No runtime code. |
| `@reltio/auth/express` | `createExpressAuth(config)` — Express `Router` factory. |
| `@reltio/auth/next` | `createNextAuth(config)` — returns `{ handlers: { GET, POST } }` for Next.js App Router. |
| `@reltio/auth/utils` | The full set of framework-agnostic helpers the router itself uses. Token readers (`getAccessToken`, `getRefreshToken`, `getBasicToken`), cookie plumbing (`parseCookies`, `serializeCookie`, `clearCookie`, `defaultCookieOptions`, the `CookieOptions` type, and the `ACCESS_TOKEN_COOKIE` / `REFRESH_TOKEN_COOKIE` / `STATE_COOKIE` name constants), CSRF-state primitives (`generateState`, `validateState`), the request-shape adapter (`readHeader`, `AnyRequest`), and the redirect-param resolver (`resolveRedirectParams`, `upgradeToHttps`, `RedirectParams`). All accept Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly where applicable. The dynamic Auth-server routing resolver is **not** here — it lives on the adapter return value as `createExpressAuth(config).resolveAuthPath` / `createNextAuth(config).resolveAuthPath` so it shares the router's allowlist, resolving the request's cluster from the access token's `aurl` claim. |

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
/** A Reltio Auth Server environment: the OAuth URL plus the credentials registered with it. */
type AuthEnvironment = {
	/** URL of the Reltio OAuth server, e.g. `https://auth-stg.reltio.com/oauth`. */
	oauthPath: string;
	/** OAuth client id registered with this environment's OAuth server. */
	clientId: string;
	/** OAuth client secret registered with this environment's OAuth server. */
	clientSecret: string;
};

// AuthConfig extends AuthEnvironment: the top-level fields describe the primary
// cluster; authEnvironments lists any additional trusted clusters.
type AuthConfig = AuthEnvironment & {
	/**
	 * URL of the Reltio Login Page, e.g. `https://login-stg.reltio.com`.
	 * Required for the interactive OAuth flow (`/login`, `/logout`, `/callback`);
	 * optional for introspection-only API services (see below).
	 */
	loginPath?: string;
	/** Post-callback hook returning a Web `Response`. */
	ssoRedirect?: SsoRedirect;
	/** Set cookies with the `Secure` flag and force `https` in redirect URLs. Default `true`. */
	secure?: boolean;
	/** Append `notenant=true` to the Login Page URL. Default `false`. */
	notenant?: boolean;
	/**
	 * Allowlist of additional trusted auth environments for multiauth routing.
	 * `/checkToken` and `/refreshToken` route to the environment named by the
	 * access token's `aurl` claim; an `aurl` that is absent, undecodable, or
	 * not in this allowlist falls back to the primary cluster (`oauthPath`).
	 */
	authEnvironments?: AuthEnvironment[];
};
```

The three required keys (`oauthPath`, `clientId`, `clientSecret`) are enforced at compile time by TypeScript. `loginPath` is required for the interactive OAuth flow (`/login`, `/logout`, `/callback`) — those routes respond `500` without it — but may be omitted by introspection-only API services (see below). Consumers reading config from environment variables, JSON files, or other untyped sources are responsible for their own validation at the boundary.

`authEnvironments` is optional: omit it for a single-cluster deployment. When present, every entry's `oauthPath` origin is matched against the access token's `aurl` claim so per-request calls route to the issuing cluster with that cluster's own credentials.

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

## Validating tokens in a standalone API service (`auth.checkToken`)

A **standalone API service** (e.g. `config-service`) has no login flow — it receives an access token directly and must introspect it against the cluster that **issued** it. In a multiauth deployment there are several auth clusters, and the issuing cluster is named by the token's `aurl` claim.

Use the same factory the BFF uses. `auth.checkToken(request)` is the guard helper you call from your own protected endpoints; it reads the token, routes to the issuing cluster from the token's `aurl` claim (matched against the allowlist), and returns the parsed `CheckTokenResponse`. An API service that only introspects can **omit `loginPath`** — the login/logout/callback routes it never mounts are the only thing that needs it:

```ts
import { createExpressAuth } from "@reltio/auth/express";
import { isRequestError } from "@reltio/auth/utils";

// No loginPath — this service never runs the interactive OAuth flow.
const auth = createExpressAuth({
	oauthPath: process.env.OAUTH_PATH!,
	clientId: process.env.CLIENT_ID!,
	clientSecret: process.env.CLIENT_SECRET!,
	authEnvironments: [
		{
			oauthPath: "https://auth-stg.cloud.reltio.com",
			clientId: process.env.ADDITIONAL_0_CLIENT_ID!,
			clientSecret: process.env.ADDITIONAL_0_CLIENT_SECRET!,
		},
	],
});

app.use(async (req, res, next) => {
	try {
		res.locals.auth = await auth.checkToken(req);
		next();
	} catch (error) {
		if (isRequestError(error)) {
			// 401 = token missing/rejected; 502 = auth server unreachable —
			// keep them distinct so an outage is never reported as "unauthorized".
			res.sendStatus(error.statusCode >= 500 ? 502 : 401);
			return;
		}
		next(error);
	}
});
```

You don't have to mount the router (`app.use("/auth", auth)`) to use `checkToken` — call it directly. `createNextAuth(config).checkToken` behaves identically for Next.js services.

How the issuing cluster is chosen:

- The token's `aurl` claim is **decoded** (no signature verification in this version) and matched — by normalized origin, trailing-slash insensitive — against the allowlist (the primary `oauthPath` plus every `authEnvironments[].oauthPath`).
- On a match, the token is introspected against **that cluster's** auth server (its `/checkToken` endpoint), authenticated with **that cluster's** `clientId` / `clientSecret`.
- An `aurl` that is absent, undecodable, or **not in the allowlist** falls back to the primary cluster. An attacker-controlled `aurl` can therefore only ever select a pre-configured cluster — never an arbitrary URL.

`checkToken` resolves the parsed `CheckTokenResponse` on success and signals failure by **throwing `RequestError`**: a missing request token → `statusCode` 401, an upstream 4xx → the upstream status, an upstream 5xx / network failure → 502. Branch on `isRequestError(error)` + `error.statusCode` so an auth-server outage (502) is never collapsed into an authentication failure (401).

> **Scope.** This version trusts `aurl` purely through allowlist membership; it does **not** verify the token signature locally. Local signature verification (to remove the per-service allowlist) is a possible future addition.

## Seeding the CSRF state cookie from a custom pre-login handler

A custom pre-login endpoint (custom error page, tenant picker, MFA challenge) sometimes needs to redirect the user to the Reltio Login Page directly while still letting the packaged `/callback` validate the CSRF `state` parameter. To do that the handler must set the same `state` cookie the packaged `/login` would have set.

Three primitives from `@reltio/auth/utils` are the single source of truth for this contract — consumers MUST NOT replicate the cookie name, the cookie options, or the state token format inline:

```ts
import {
	defaultCookieOptions,
	generateState,
	STATE_COOKIE,
} from "@reltio/auth/utils";

app.get("/error", (req, res) => {
	const state = generateState();
	res.cookie(
		STATE_COOKIE,
		state,
		defaultCookieOptions(process.env.NODE_ENV === "production"),
	);
	const url = new URL("https://login.reltio.com/");
	url.searchParams.set("state", state);
	url.searchParams.set("callbackUrl", "https://app.example.com/auth/callback");
	res.redirect(url.toString());
});
```

- `generateState()` returns a fresh CSRF state token in whatever format `@reltio/auth` currently uses (today a v4 UUID; the format is an internal detail).
- `STATE_COOKIE` is the cookie name the packaged `/callback` reads.
- `defaultCookieOptions(secure)` returns the full option vector applied at set time so the cookie matches what the packaged router would have produced. Pass `secure: true` in production and `secure: false` only when serving over plain HTTP in local development.

The remaining cookie and state helpers (`serializeCookie`, `clearCookie`, `parseCookies`, `validateState`, `ACCESS_TOKEN_COOKIE`, `REFRESH_TOKEN_COOKIE`) are also exported from `@reltio/auth/utils` for adjacent BFF use cases — for example reading and stripping the `access_token` cookie before proxying a request upstream. They are part of the supported public contract; use them instead of carrying the magic-string `"access_token"` around.

## Proxying browser requests to Reltio microservices

`@reltio/auth` ships an opt-in `/proxy` endpoint that browser code calls instead of speaking to Reltio microservices directly. It centralises the BFF proxy pattern that every consuming app used to ship privately — fixing the latent defects (`Set-Cookie` leakage, `Content-Encoding` double-decode, substring-allowlist host spoofing) once.

Add `proxy: { allowedTargets: [...] }` to enable the endpoint:

```ts
import { createNextAuth } from "@reltio/auth/next";

export const { GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS } = createNextAuth({
	oauthPath: process.env.OAUTH_PATH!,
	loginPath: process.env.LOGIN_PATH!,
	clientId: process.env.CLIENT_ID!,
	clientSecret: process.env.CLIENT_SECRET!,
	proxy: { allowedTargets: ["https://**.reltio.com/reltio/"] },
}).handlers;
```

Then call the endpoint from the browser with the upstream URL in the `reltio-target-url` header:

```ts
await fetch("/auth/proxy", {
	method: "GET",
	headers: { "reltio-target-url": "https://tst-01.reltio.com/reltio/api/sumit/entities/123" },
});
```

Request and response bodies are streamed through with constant memory, so large uploads/downloads and streaming responses (Server-Sent Events, chunked transfer) work with no size cap. On Express, mount `createExpressAuth()` **before** any body-parser middleware — the proxy forwards the raw request stream.

The full contract — allowlist DSL (`*` vs `**`), header rewriting rules, error envelope, streaming passthrough, migration from a custom proxy — is documented in the [Proxy guide](?path=/docs/guides-auth-proxy--docs).

## Storybook documentation

- [Setup → Express](?path=/docs/guides-auth-setup-express--docs) — full walkthrough including config object, router mount, and error handling.
- [Setup → Next.js App Router](?path=/docs/guides-auth-setup-next-js-app-router--docs) — full walkthrough for `app/auth/[...auth]/route.ts`.
- [Proxy](?path=/docs/guides-auth-proxy--docs) — `/proxy` endpoint, `reltio-target-url` header, wildcard DSL, header rewriting rules, error envelope, migration from `http-proxy-middleware`.
- [Dynamic OAuth Routing](?path=/docs/guides-auth-dynamic-oauth-routing--docs) — how the access token's `aurl` claim + the configured allowlist route `/checkToken` and `/refreshToken` to the right Auth Server cluster, and how to use the adapter's `resolveAuthPath` in apps that bypass the BFF.
- [Migration → From auth-middleware](?path=/docs/guides-auth-migration-from-auth-middleware--docs) — import-path mapping, before/after code, breaking changes.

## License

Licensed under the [Apache License, Version 2.0](./LICENSE). See [`NOTICE`](./NOTICE) for attribution.
