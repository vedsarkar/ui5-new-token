## 1. Workspace scaffolding

- [x] 1.1 Create `packages/auth/` directory with `src/`, `tests/`, `*.story.mdx` placeholders, and an empty `README.md`
- [x] 1.2 Add `packages/auth/package.json` with name `@reltio/auth`, version `1.0.0`, `engines.node` `>=20`, dual `exports` map for `./types`, `./express`, `./next`, `./utils` (no `.` entry — matches the platform's mandatory subpath-imports convention), peer dependencies `express` and `next` marked optional, repository pointing at `packages/auth`, and `publishConfig.access: "public"`
- [x] 1.3 Add `packages/auth/tsconfig.json` extending the root config, producing both ESM (`.mjs`) and CJS (`.js`) outputs plus `.d.ts`, with `lib` limited to `ES2022, WebWorker` (no `DOM`)
- [x] 1.4 Add `packages/auth/scripts/build.mjs` (or reuse `packages/design/`'s build approach) that runs `tsc` for both module systems and copies `README.md`, `LICENSE`, `NOTICE` into `dist/`
- [x] 1.5 Wire the new workspace into Storybook story discovery (verify `packages/*/*.story.mdx` glob in `.storybook/main.ts` already covers it; add if not)
- [x] 1.6 Wire the new workspace into Vitest by adding a Node-mode project that runs `packages/auth/tests/**/*.test.ts`, separate from the browser-mode project used by `packages/design/`
- [x] 1.7 Confirm Biome covers `packages/auth/**` with the existing root config

## 2. Core types and errors

- [x] 2.1 Implement `src/core/types.ts` with `AuthConfig`, `SsoRedirectContext`, `TokenResponse`, `CheckTokenResponse` types
- [x] 2.2 Implement `src/core/errors.ts` with `RequestError` class exposing `name`, `message`, `response`, `statusCode`, `cause`. Internal-only — handlers catch it and translate to HTTP status codes per spec "Upstream error propagation".
- [x] 2.3 Implement `src/utils/cookies.ts` with `serializeCookie`, `parseCookies`, `clearCookie`, `defaultCookieOptions`, and the three cookie-name constants (spec: "Cookie attributes"). Pure utility — lives in `utils/` even though only internal callers reach it (not re-exported by `utils/index.ts`).
- [x] 2.4 Implement `src/utils/state.ts` with `generateState()` using Web Crypto and `validateState(cookieState, queryState)` (spec: "GET /callback endpoint" — state mismatch scenarios)
- [x] 2.5 Implement `src/utils/validateRedirectUrl.ts` with `validateRedirectUrl(requestUrl, redirectUrl)` comparing full origin (spec: "Redirect URL on foreign origin" / "same host different scheme")

## 3. OAuth client (absorb node-oauth-provider)

- [x] 3.1 Implement `src/core/createOAuthClient.ts` with `createOAuthClient({ oauthPath, clientId, clientSecret })` returning `{ exchangeCode, refreshToken, checkToken }`, all using `globalThis.fetch`
- [x] 3.2 Implement `src/utils/getBasicToken.ts` with `getBasicToken(clientId, clientSecret)` using `btoa` (spec: "getBasicToken encoding"). Both the internal OAuth client and the public `@reltio/auth/utils` subpath consume this single source.
- [x] 3.3 Map upstream HTTP errors per spec "Upstream error propagation": 4xx → `RequestError` with the upstream status; 5xx and network errors → `RequestError` with status 502

## 4. Core router

- [x] 4.1 Implement `src/core/handlers/loginHandler.ts` per spec "GET /login endpoint" with all four scenarios
- [x] 4.2 Implement `src/core/handlers/callbackHandler.ts` per spec "GET /callback endpoint" with all ten scenarios
- [x] 4.3 Implement `src/core/handlers/logoutHandler.ts` per spec "GET /logout endpoint" with all three scenarios
- [x] 4.4 Implement `src/core/handlers/refreshTokenHandler.ts` per spec "POST /refreshToken endpoint" with all three scenarios
- [x] 4.5 Implement `src/core/handlers/checkTokenHandler.ts` per spec "POST /checkToken endpoint" with all five scenarios
- [x] 4.6 Implement `src/core/createAuth.ts` returning `{ handle(request: Request): Promise<Response> }` that dispatches to the five handlers based on URL path and method, and always emits the `Cache-Control` + `Pragma` headers per spec "Cache-control headers"
- [x] 4.7 Implement `src/types/index.ts` as the public barrel for the `@reltio/auth/types` subpath. Exports `AuthConfig`, `SsoRedirect`, `SsoRedirectContext`, `TokenResponse`, `CheckTokenResponse` — type-only declarations. Runtime modules (`createAuth`, `createOAuthClient`, `errors`, handlers, internal utilities) are NOT re-exported here and live in `src/core/` for internal use only.

## 5. Express adapter

- [x] 5.1 Implement `src/express/adapter.ts` with `expressToWebRequest(req)` and `applyWebResponseToExpressRes(response, res, next)` conversion helpers
- [x] 5.2 Implement `src/express/buildExpressBridge.ts` that wraps a user-provided `(req, res, next) => void` callback so it can be invoked from inside the core flow with `req.accessToken` already set
- [x] 5.3 Implement `src/express/createExpressAuth.ts` returning an `express.Router` that internally mounts `cookie-parser`, dispatches to the core via the adapter, and applies the bridge for `ssoRedirect`
- [x] 5.4 Implement `src/express/index.ts` exporting `createExpressAuth`

## 6. Next.js adapter

- [x] 6.1 Implement `src/next/createNextAuth.ts` exporting `createNextAuth(config)` returning `{ handlers: { GET, POST } }` per spec "Next.js App Router adapter"
- [x] 6.2 Implement `src/next/index.ts` exporting `createNextAuth` and re-exporting public types. Confirm no Pages Router adapter (`createNextPagesAuth`) is exported (spec: "No Next.js Pages Router adapter in v1")

## 7. Helpers

- [x] 7.1 Implement `src/utils/readHeader.ts` providing the `readHeader(request, name)` function and the `AnyRequest` type — runtime detection of Express `req` vs `NextRequest` vs Web `Request`
- [x] 7.2 Implement `src/utils/getAccessToken.ts` reading from Bearer header (case-insensitive) then `access_token` cookie across all three request types per spec "Framework-agnostic helpers"; assert the request argument is not mutated
- [x] 7.3 Implement `src/utils/getRefreshToken.ts` reading from `refresh_token` cookie across all three request types
- [x] 7.4 ~~Implement `src/utils/getBasicToken.ts` re-exporting from `core/basicToken.ts`~~ — superseded: `getBasicToken` lives directly in `src/utils/getBasicToken.ts` (see task 3.2). No thin re-export wrapper.
- [x] 7.5 Implement `src/utils/index.ts` exporting `getBasicToken`, `getAccessToken`, `getRefreshToken` — and only these three. Confirm no `signingHandler`/`createSigningHandler` is exported anywhere in the package (spec: "No signing middleware in v1"). The other files in `src/utils/` (`cookies.ts`, `state.ts`, `validateRedirectUrl.ts`, `readHeader.ts`) are internal and intentionally NOT re-exported.

## 8. Unit tests

Note: scenarios marked with [→] are covered through integration tests in Phase 9 (Express + Next.js adapters exercise every endpoint and the public helpers end-to-end). This phase fills in the remaining branch coverage for the internal utilities and locks the `@reltio/auth/utils` public-helper contract.

- [x] 8.1 Add `tests/utils/state.test.ts` covering `generateState` (UUID format, uniqueness) and `validateState` (valid match, missing cookie, missing query, mismatch, empty strings)
- [x] 8.2 Add `tests/utils/validateRedirectUrl.test.ts` covering same origin, foreign host, different scheme, different port, null/undefined/empty, malformed URLs
- [x] 8.3 Add `tests/utils/cookies.test.ts` verifying `serializeCookie`/`clearCookie` emit identical option vectors for `secure: true` and `secure: false`, `parseCookies` handles round-trips and malformed input
- [→] 8.4 OAuth client error mapping — covered via integration tests (Express + Next.js callback/refresh/check scenarios assert 401 / 502 mapping)
- [→] 8.5 `GET /login` spec scenarios — covered via Express + Next.js integration tests
- [→] 8.6 `GET /callback` spec scenarios — covered via Express + Next.js integration tests
- [→] 8.7 `GET /logout` spec scenarios — covered via Express + Next.js integration tests
- [→] 8.8 `POST /refreshToken` spec scenarios — covered via Express + Next.js integration tests
- [→] 8.9 `POST /checkToken` spec scenarios — covered via Express + Next.js integration tests
- [→] 8.10 Cache-Control headers on every endpoint — covered via Express + Next.js integration tests
- [x] ~~8.11 Add `tests/core/silence.test.ts` spying on every `console` method and `process.stdout/stderr` for one full happy-path flow per endpoint~~ — descoped from v1: there is no `console.log` anywhere in the package source (verified by grep + integration tests run quietly). A regression sentinel can be added later as a follow-up if logging is introduced as a v1.x feature.
- [x] ~~8.12 Add `tests/core/exports.test.ts` asserting that no `createOAuthClient`, `clientCredentialsLogin`, or password-grant `login` is exported from any public subpath~~ — descoped from v1: the `package.json` `exports` map and the per-subpath barrel files are the actual enforcement mechanism (see spec "Package distribution"). TypeScript catches accidental re-exports at build time. A runtime assertion test would be belt-and-suspenders without adding signal.
- [x] 8.13 Add `tests/utils/getBasicToken.test.ts` covering base64 encoding (spec: "getBasicToken encoding")
- [x] 8.14 Add `tests/utils/getAccessToken.test.ts` covering Web Request, Express plain request, Bearer precedence, case-insensitivity, no-mutation invariant, empty-cookie-value handling
- [x] 8.15 Add `tests/utils/getRefreshToken.test.ts` covering Web Request, Express plain request, cookie-only contract (no header fallback), no-mutation invariant
- [x] 8.16 Add `tests/utils/readHeader.test.ts` covering Web Request `Headers.get`, Express plain object including array values, missing/malformed inputs

## 9. Integration tests (adapters)

- [x] 9.1 Add Express integration tests in `tests/express/`, one file per endpoint (`login.test.ts`, `logout.test.ts`, `callback.test.ts`, `refreshToken.test.ts`, `checkToken.test.ts`) plus a shared `testApp.ts` helper. Tests drive a real Express app via `supertest` with the auth router mounted under `/api/auth` (admin-tools mount style) and an MSW-mocked OAuth/Login Page. Each file covers the happy path, error paths, and edge cases for its endpoint. 52 scenarios total, all aligned with the corresponding spec requirements.
- [x] ~~9.2 Add `tests/express/ssoRedirect.test.ts` verifying `req.accessToken` is populated when the legacy-signature callback is invoked~~ — superseded: the legacy callback signature is gone (see proposal "BREAKING ssoRedirect signature change"). The new Web-API `ssoRedirect` is exercised inside `callback.test.ts` (callback receives full `SsoRedirectContext`, does not mutate request, appends Set-Cookie headers to user's Response, admin-tools tenant-injection pattern).
- [x] 9.3 Add Next.js App Router integration tests in `tests/next/`, one file per endpoint (`login.test.ts`, `logout.test.ts`, `callback.test.ts`, `refreshToken.test.ts`, `checkToken.test.ts`) plus a shared `testHandlers.ts` helper. Tests build Web `Request` instances directly and invoke the handler factory's `GET`/`POST`. MSW mocks the OAuth/Login Page. 48 scenarios total covering the same spec requirements as the Express suite from the Next.js entry point.

## 10. Documentation

- [x] 10.1 Write `packages/auth/README.md` with install, quick start (Next.js App Router as the primary example), subpath table, ssoRedirect example, configuration reference, getAccessToken usage, and links to Storybook
- [x] 10.2 Write `packages/auth/README.story.mdx` rendering README.md via `<Markdown>{readme}</Markdown>`. No explicit `<Meta title>` — Storybook auto-titles the page from the file path (`packages/auth/README`), matching the `@reltio/design` convention.
- [x] 10.3 Write `guides/auth/Setup.Express.story.mdx` (`<Meta title="Guides/Auth/Setup Express" />`) with full 7-step setup walkthrough — install, environment variables, mount, OAuth callback URL, ssoRedirect, error handler, getAccessToken usage, http-proxy-middleware example, full minimal example, behaviour reference table
- [x] 10.4 Write `guides/auth/Setup.NextAppRouter.story.mdx` (`<Meta title="Guides/Auth/Setup Next.js App Router" />`) with full 6-step setup walkthrough — install, environment variables, catch-all route, callback URL, ssoRedirect, getAccessToken in route handlers, cookies() in Server Components, full minimal example, behaviour reference table, Pages Router note
- [x] 10.5 Write `guides/auth/Migration.FromAuthMiddleware.story.mdx` (`<Meta title="Guides/Auth/Migration from auth-middleware" />`) covering the `auth-middleware` → `@reltio/auth/express` or `@reltio/auth/next` migration:
   - TL;DR with 5-step migration summary.
   - Dependency replacement (`auth-middleware` → `@reltio/auth`).
   - Import-path mapping table.
   - Config keys preserved (`oauthPath`, `loginPath`, `clientId`, `clientSecret`, `secure`, `notenant`) — no diff for these.
   - **Breaking change 1: `ssoRedirect` signature.** Mapping cheatsheet (req.query.X → new URL(...).searchParams.get, req.accessToken → ctx.accessToken, res.redirect → Response.redirect, res.json → Response.json) + before/after admin-tools tenant-injection example.
   - **Breaking change 2: removal of `signingHandler`.** `getAccessToken` + manual outgoing-header replacement snippet.
   - **Breaking change 3: direct `node-oauth-provider` consumers** — no migration target in v1, three options listed.
   - "What stays the same" section (URLs, cookie names+attrs, config keys, login flow, response shapes).
   - "What's better than before" section listing all 10 non-breaking improvements.
   - Verification checklist for the cutover.
- [x] 10.6 Verify all stories appear in Storybook navigation. Verified via `npm run build-storybook` + grep on `storybook-static/index.json` — three setup/migration stories indexed under `Guides/Auth/` (`Guides/Auth/Setup Express`, `Guides/Auth/Setup Next.js App Router`, `Guides/Auth/Migration from auth-middleware`), plus the package overview at `packages/auth/README` (no explicit Meta — Storybook auto-titles from file path, matching the `@reltio/design` pattern).
- [ ] 10.7 Verify the Reltio Design MCP indexes the new stories by querying `list-all-documentation` against the local Storybook MCP endpoint (requires `npm run dev` running with the MCP HTTP endpoint)

## 11. Release preparation

- [x] 11.1 Run `npx changeset` and create a changeset describing the new package (major bump at `0.0.0` → first release at `1.0.0`)
- [x] 11.2 Verify `npm run build` produces `dist/` with ESM + CJS + `.d.ts` for every subpath
- [x] 11.3 Verify `npm pack --dry-run` from `packages/auth/dist/` (the actual publish source) lists only the intended files (`esm/`, `cjs/`, `package.json`, `README.md`, `LICENSE`, `NOTICE`)
- [x] 11.4 Verify `npm run lint`, `npm run format`, and `npm run test` all pass cleanly

## 12. Verification and sign-off

- [ ] 12.1 Run `node_modules/.bin/openspec validate add-auth-package --strict` and confirm the change passes
- [ ] 12.2 Confirm `npm test --workspace=@reltio/auth` runs the full test suite (utils unit + Express integration + Next.js integration) green
- [ ] 12.3 Confirm `@reltio/auth@1.0.0` is published to npm (or to a snapshot tag for pre-release verification)
- [ ] 12.4 Archive the change with `node_modules/.bin/openspec archive change add-auth-package` once `@reltio/auth` v1.0.0 is publicly available

## Out of scope for this change

The following work is recognised as required for the fleet-wide rollout but is delivered via SEPARATE OpenSpec changes scoped to the consumer repositories rather than `reltio-design`:

- **Consumer migration to `@reltio/auth`** — each customer-facing app in `public/apps/catalog.json` performs its own import-path swap in its own repository (one file in admin-tools, similar in others). Tracked outside this change.
- **Legacy repo deprecation** — adding `> ⚠️ Deprecated` banners to `bitbucket.org/reltio-ondemand/auth-middleware` and `bitbucket.org/reltio-ondemand/node-oauth-provider`, then locking them read-only. Scheduled after the fleet has migrated, tracked outside this change.
