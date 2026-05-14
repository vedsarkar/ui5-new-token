/**
 * Public entry for `@reltio/auth/utils`.
 *
 * Exports the three framework-agnostic helpers needed by BFF code that
 * runs alongside the auth router (proxy handlers, telemetry middleware,
 * etc.) but does not go through the router itself:
 *
 *   import { getAccessToken } from "@reltio/auth/utils";
 *   const token = getAccessToken(req);
 *
 * v1 intentionally does NOT export a `createSigningHandler` /
 * `signingHandler` middleware. The legacy middleware mutated the incoming
 * request's `Authorization` header — an anti-pattern. Use `getAccessToken`
 * to read the token, then set the header on the OUTGOING request you
 * proxy or fetch.
 *
 * Other files in this folder (`cookies.ts`, `state.ts`,
 * `validateRedirectUrl.ts`, `readHeader.ts`) are internal utilities used
 * by the router and the adapter layer. They are intentionally NOT
 * re-exported here.
 */

export * from "./getAccessToken";
export * from "./getBasicToken";
export * from "./getRefreshToken";
