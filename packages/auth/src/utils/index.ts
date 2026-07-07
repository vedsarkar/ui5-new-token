/**
 * Public entry for `@reltio/auth/utils`.
 *
 * Exports framework-agnostic helpers needed by BFF code that runs
 * alongside the auth router (proxy handlers, telemetry middleware) but
 * does not go through the router itself:
 *
 *   import { getAccessToken } from "@reltio/auth/utils";
 *
 *   const token = getAccessToken(req);
 *
 * The per-session Auth-server routing resolver is NOT exported here.
 * It lives on the value returned by the framework adapters —
 * `createNextAuth(config).resolveAuthPath` and
 * `createExpressAuth(config).resolveAuthPath` — so the multiauth allowlist
 * is built exactly once, alongside the router, and the resolver shares it.
 *
 * v1 intentionally does NOT export a `createSigningHandler` /
 * `signingHandler` middleware. The legacy middleware mutated the incoming
 * request's `Authorization` header — an anti-pattern. Use `getAccessToken`
 * to read the token, then set the header on the OUTGOING request you
 * proxy or fetch.
 *
 * Everything under `utils/` is public API. Private implementation
 * (the JWT primitives `decodeAccessToken`, `base64url`, the allowlist
 * routing resolver, the OAuth calls, …) lives in `src/core/`, which has no
 * public subpath — see the package `AGENTS.md` for the boundary rule. Do
 * NOT place private code here unexported; put it in `core/`.
 */

export * from "./cookies";
export * from "./errors";
export * from "./getAccessToken";
export * from "./getBasicToken";
export * from "./getRefreshToken";
export * from "./readHeader";
export * from "./resolveRedirectParams";
export * from "./state";
