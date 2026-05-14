/**
 * Public entry for `@reltio/auth/express`.
 *
 * Consumers on Express (or hybrid setups like a Next.js app with a custom
 * Express server, as `admin-tools` uses) install `@reltio/auth` and import
 * the router factory from this subpath:
 *
 *   import { createExpressAuth } from "@reltio/auth/express";
 *   app.use("/auth", createExpressAuth({ oauthPath, loginPath, ... }));
 *
 * The `config` argument has the same `AuthConfig` shape as the Next.js
 * adapter — see `@reltio/auth/core` for the type. `adapter.ts` is internal
 * infrastructure and is not re-exported.
 */

export * from "./createExpressAuth";
