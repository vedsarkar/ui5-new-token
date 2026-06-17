## 1. Public type — CheckTokenResponse

- [x] 1.1 Add an exported `CheckTokenResponse` type to `packages/auth/src/types/index.ts` with the known Reltio introspection fields (`clientId: string`, `expiration: number`, `resourceIds: string[]`, `roles: string[]`, `scopes: string[]`, and a `user` object typed with at least `customer`, `username`, `email` plus an index signature) and a top-level index signature for additional fields. Document it as the parsed `POST /checkToken` payload and a compile-time convenience (no runtime validation). Cross-reference the `checkToken introspection method` requirement.
- [x] 1.2 Enrich the existing `CheckTokenResponse` type in place — replace its `Record<string, unknown>` shape with the structured introspection fields above. Keep the exported name `CheckTokenResponse`; internal callers reference it directly.

## 2. Core — tighten checkAccessToken return type

- [x] 2.1 Change the return type of `checkAccessToken` in `packages/auth/src/core/checkAccessToken.ts` from `Promise<CheckTokenResponse>` to `Promise<CheckTokenResponse>` (the cast becomes `as CheckTokenResponse`). No behavioural change — the wire contract (form-encoded `token`, Basic header, `serviceId`/`tenantId`, `resolveAuthPath` routing, `safeFetch` error policy) is unchanged.

## 3. Core — bind checkToken onto the AuthHandler

- [x] 3.1 Extend the `AuthHandler` type in `packages/auth/src/core/createAuth.ts` to add `checkToken: (request: AnyRequest, opts?: { serviceId?: string; tenantId?: string }) => Promise<CheckTokenResponse>` alongside `handle` and `resolveAuthPath`. Document it (JSDoc) as the programmatic sibling of the `POST /checkToken` route that returns the parsed payload and throws `RequestError` (4xx propagate, 5xx/network → 502, missing token → 401).
- [x] 3.2 In `createAuth`, implement `checkToken` as an `async` closure over the once-built `deps` (`AuthDeps`): read the token via `getAccessToken(request)`; when `null`, throw `new RequestError("...", { statusCode: 401 })` with no upstream call (the `async` form turns the throw into a rejected promise so callers can `await`/`catch`); otherwise return `checkAccessToken({ ...deps, request, accessToken, serviceId: opts?.serviceId, tenantId: opts?.tenantId })`. Import `getAccessToken` from `../utils/getAccessToken` and `RequestError` from `../utils/errors` at the top of the file (no inline imports).
- [x] 3.3 Verify `config.clientSecret` is not referenced on the `checkToken` per-request path — only the once-derived `deps.authHeader` and `deps.keyPromise` (via `resolveAuthPath` inside `checkAccessToken`).
- [x] 3.4 Make `RequestError` / `isRequestError` public: move `errors.ts` from `src/core/` to `src/utils/`, re-export it from `src/utils/index.ts`, and update the internal importers (`core/createAuth.ts`, `core/safeFetch.ts`, `core/handlers/{callback,checkToken,refreshToken}Handler.ts`) to the new path. Required so the documented `isRequestError(error)` + `error.statusCode` failure contract is satisfiable from a public subpath.

## 4. Adapters — expose checkToken on the return values

- [x] 4.1 Update `packages/auth/src/express/createExpressAuth.ts`: extend `ExpressAuthRouter` to `Router & { resolveAuthPath: ...; checkToken: ... }` and assign `router.checkToken = auth.checkToken;` next to the existing `router.resolveAuthPath` assignment. Update the file JSDoc to mention the additive `checkToken` member. The `app.use(path, createExpressAuth(...))` usage stays unchanged.
- [x] 4.2 Update `packages/auth/src/next/createNextAuth.ts`: add `checkToken` to the declared return type (alongside `handlers` and `resolveAuthPath`) and return `checkToken: auth.checkToken` in the object. Update the file JSDoc to mention the additive member.

## 5. Tests — Express adapter

- [x] 5.1 Extend `packages/auth/tests/express/checkToken.test.ts` to drive the adapter-exposed `auth.checkToken` member through the public boundary (msw upstream). Scenarios: returns the parsed `CheckTokenResponse` payload on a 200 upstream (assert `result.roles` / `result.scopes` / `result.user` accessible); throws `RequestError` `401` when the request has no access token (and asserts no upstream `fetch` via `vi.spyOn`); throws `RequestError` with the upstream status when upstream returns 4xx; throws `RequestError` `502` on upstream 500 and on network error.
- [x] 5.2 Add routing assertions: with a valid `reltio_aurl` cookie, `auth.checkToken(req)` POSTs to `${verifiedAurl}/oauth/checkToken`; with no cookie, to `${config.oauthPath}/checkToken`; `serviceId`/`tenantId` from `opts` are appended as query params.
- [x] 5.3 Add a "shares the router's once-derived key" assertion: `vi.spyOn(crypto.subtle, "importKey")`, construct the adapter once, invoke `checkToken` multiple times, assert `importKey` called exactly once.
- [x] 5.4 Add a non-mutation assertion: the request's headers/cookies are unchanged after `checkToken` returns.

## 6. Tests — Next.js adapter

- [x] 6.1 Mirror the §5 scenarios in `packages/auth/tests/next/checkToken.test.ts` against the `createNextAuth(config).checkToken` member (parity convention: every adapter has its own suite).

## 7. Tests — type-level and negative imports

- [x] 7.1 Add a public-surface test (`packages/auth/tests/utils/publicSurface.test.ts`) confirming `import type { CheckTokenResponse } from "@reltio/auth/types"` resolves (via `expectTypeOf`), that `RequestError` / `isRequestError` ARE importable from `@reltio/auth/utils`, and that `checkAccessToken` is NOT importable from `@reltio/auth/utils`, `@reltio/auth/types`, or either adapter return value.

## 8. Documentation

- [x] 8.1 Extend `guides/auth/dynamic-oauth-routing.story.mdx` with a "Gating routes with `checkToken`" section: per-runtime usage (Express middleware, Next.js Route Handler), the `RequestError` policy (HTML table: 401 missing/rejected token, 4xx propagated, 502 Auth Server unreachable), the `isRequestError(error)` + `error.statusCode` branch, and a note that `checkToken` returns the parsed `CheckTokenResponse` (not a `Response`). Use HTML tables per the platform MDX rule.

## 9. Release plumbing

- [x] 9.1 Add a Changeset for `@reltio/auth` at the `minor` bump level. Body sections — **Added**: the `checkToken` introspection member on the `createExpressAuth` / `createNextAuth` return values, the public `CheckTokenResponse` type in `@reltio/auth/types`, and the now-public `RequestError` / `isRequestError` exports in `@reltio/auth/utils`; **Acting on this release**: BFFs doing direct introspection replace their hand-rolled `checkAccessToken` copy with `await auth.checkToken(req, opts)` and switch to a single `isRequestError(e)` + `e.statusCode` error branch.

## 10. Verification

- [x] 10.1 Run `npm run lint` and `npm run format` at the repo root; both SHALL pass.
- [x] 10.2 Run `npx vitest run --project=auth`; every test (existing + new) SHALL pass.
- [x] 10.3 Run `npm run test:coverage -w @reltio/auth`; confirm every reachable public scenario for `checkToken` is covered (per the package `AGENTS.md` coverage rule).
- [x] 10.4 Run `npm run build-storybook`; the updated guide SHALL render with no MDX errors and HTML tables intact.
- [x] 10.5 Run `npx openspec validate add-auth-checktoken-method --strict` and resolve any reported issues.
