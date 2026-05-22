## 1. Source-resolution helper

- [x] 1.1 Add `packages/auth/src/core/handlers/resolveLoginContext.ts` exporting `resolveLoginContext(request: Request): { tenant: string | null; returnTo: string; refererOrigin: string | null } | { error: Response }`. The helper parses `request.url`'s query parameters first, then attempts to parse `Referer`. It returns `error` with a `400` response for three terminal failure cases: (a) missing return URL (no `?returnTo=` and no `Referer`); (b) malformed `Referer` when no `?returnTo=` is supplied; (c) explicit `?returnTo=` whose origin does not match `refererUrl.origin` when both are present. The returned `refererOrigin` is non-null when `Referer` was parsed successfully; the legacy fallback path uses it as the origin source, the explicit path uses `new URL(returnTo).origin`. The helper is internal — not exported from any public subpath, not re-exported in `src/utils/index.ts` or any other barrel.
- [x] 1.2 Add `tests/core/resolveLoginContext.test.ts` (Vitest, Node mode) covering: query-only resolution, referer-only fallback, query overrides referer, empty `?tenant=` falls back, missing return URL → 400, malformed `Referer` without `?returnTo=` → 400, malformed `Referer` with `?returnTo=` → soft-fail, cross-source mismatch between explicit `?returnTo=` and `Referer` origins → 400, trimming of whitespace-only `?tenant=`.

## 2. /login handler rewrite

- [x] 2.1 Rewrite `packages/auth/src/core/handlers/loginHandler.ts` to delegate source resolution to `resolveLoginContext`. After resolution, when both `?returnTo=` and `Referer` are present, assert `new URL(returnTo).origin === refererUrl.origin` and return `400 returnTo origin does not match Referer origin` on mismatch. Build the OAuth `authCallbackUrl` with origin from `new URL(returnTo).origin` (explicit path) or `refererUrl.origin` (legacy fallback path), and pathname from `new URL(request.url).pathname.replace(/login$/, "callback")` in both paths. Do NOT use `new URL(request.url).origin` anywhere — the platform's reverse-proxy chain makes it unreliable. Apply the `secure: true` HTTPS upgrade to `returnTo`'s protocol only.
- [x] 2.2 Update the inline JSDoc at the top of `loginHandler.ts` to reflect the new contract: explicit `?tenant=` / `?returnTo=` first, `Referer` as fallback, cross-source origin check when both are present, client-supplied origin for `redirect_uri`, single-source `?returnTo=` forwarded without BFF-side same-origin check (relies on OAuth-server allowlist).

## 3. /logout handler rewrite

- [x] 3.1 Rewrite `packages/auth/src/core/handlers/logoutHandler.ts` to delegate source resolution to the same `resolveLoginContext` helper. The validation and `authCallbackUrl` origin rules from task 2.1 apply symmetrically.
- [x] 3.2 Update the inline JSDoc at the top of `logoutHandler.ts` to match the new contract (mirror the `/login` change).
- [x] 3.3 Verify (and remove if dead) any duplicated source-resolution code in `logoutHandler.ts` so the two handlers share the helper rather than carrying a parallel implementation.

## 4. Express adapter tests

- [x] 4.1 Extend `packages/auth/tests/express/login.test.ts` with new scenarios from `specs/auth/spec.md` § "GET /login endpoint": explicit `?tenant=` query, `?returnTo=` query without `Referer`, explicit `?tenant=` overrides referer tenant, empty `?tenant=` falls back, explicit `?returnTo=` with malformed `Referer`, cross-source 400 when explicit `?returnTo=` origin differs from `Referer` origin, single-source `?returnTo=` forwarded without same-origin check, OAuth `redirect_uri` origin sourced from `returnTo` (explicit path) and from `Referer` (legacy fallback path). Keep every existing referer-only scenario green to lock backwards compatibility.
- [x] 4.2 Extend `packages/auth/tests/express/logout.test.ts` with the matching `/logout` scenarios from § "GET /logout endpoint".

## 5. Next.js adapter tests

- [x] 5.1 Extend `packages/auth/tests/next/login.test.ts` with the same explicit-source / fallback / validation scenarios as the Express suite. Use the existing `buildRequest` helper from `tests/next/testHandlers.ts`; extend its options object (`returnTo?: string`, `tenant?: string`) only if it does not already accept arbitrary `query`. Existing referer-only scenarios stay green.
- [x] 5.2 Extend `packages/auth/tests/next/logout.test.ts` with the matching `/logout` scenarios.

## 6. Storybook documentation

- [x] 6.1 Add a "Path-based tenant routing" subsection to `guides/auth/Setup.Express.story.mdx` showing the explicit `?tenant=` + `?returnTo=` pattern from a custom Express server. Use HUB UI's `/hub/<tenant>/...` shape as the worked example.
- [x] 6.2 Add the same "Path-based tenant routing" subsection to `guides/auth/Setup.NextAppRouter.story.mdx` showing the pattern from a Next.js middleware or server action. Same HUB UI worked example.
- [x] 6.3 Extend `guides/auth/Migration.FromAuthMiddleware.story.mdx` with a new entry under the existing migration matrix: "Custom `/login` and `/logout` routes that duplicate the BFF to read tenant from the path → switch the consumer's `<a href>` to `/api/auth/login?tenant=<t>&returnTo=<absolute-url>` and delete the custom routes". Show the before/after code for HUB UI specifically.
- [x] 6.4 Update `packages/auth/README.md` and the auto-rendered `packages/auth/README.story.mdx` to mention the explicit `?tenant=` / `?returnTo=` query parameters in the quick-start examples (one sentence, with a link to the Setup guide for the worked example).

## 7. Release plumbing

- [x] 7.1 Add a Changeset (`npx changeset` or hand-write) for `@reltio/auth` at the `minor` bump level. The Added section lists the new `?tenant=` and `?returnTo=` query parameters and the cross-source origin check; the Changed section is empty (the legacy referer-only path is byte-for-byte untouched).

## 8. Verification

- [x] 8.1 Run `npm run lint` and `npm run format` at the repo root; ensure both pass.
- [x] 8.2 Run `npx vitest run packages/auth` and confirm every test (existing + new) passes.
- [x] 8.3 Run `npm run build-storybook` and confirm the three updated guides render correctly with no MDX errors.
- [x] 8.4 Run `npx openspec validate auth-explicit-tenant-and-return-to --strict` and resolve any reported issues.

## 9. Defensive documentation around the unreliable `request.url.origin`

These tasks add inline warnings at every call site that still touches `request.url.origin`, plus a review checklist item, so future contributors do not regress on Decision 3 / Decision 9. No code behaviour changes — JSDoc and comments only.

- [x] 9.1 Add a JSDoc block to `expressToWebRequest` in `packages/auth/src/express/adapter.ts` explicitly stating: (a) `Request.url`'s origin is assembled from `req.protocol` + `req.get("host")` and is **NOT reliable** behind the platform's reverse-proxy chain — the BFF process sees an internal host, not the public one; (b) only `pathname` and `search` of the resulting `Request.url` are authoritative because reverse proxies preserve them; (c) the assembled `Request.url.origin` is retained **only for backwards compatibility** with v1's `/callback` `validateRedirectUrl` check and the existing `ssoRedirect`-context shape; (d) downstream code MUST treat the origin as unreliable input and use `Referer` or client-supplied query parameters for any public-origin reasoning; (e) the dependency is scheduled for breaking removal in a follow-up proposal (`auth-trust-only-client-supplied-origins`, planned for `@reltio/auth@2.0.0`).
- [x] 9.2 Add the same defensive note (one or two paragraphs, cross-referencing the JSDoc in `expressToWebRequest`) to the module-level JSDoc at the top of `packages/auth/src/next/createNextAuth.ts`. Next.js itself reconstructs `NextRequest.url` from runtime config (`X-Forwarded-Host`, `trustHostHeader`, etc.) and is similarly unreliable behind multi-hop proxies; the note tells consumers and AI agents that the constraint is identical across adapters even though the Next.js adapter does not contain URL-assembly code itself.
- [x] 9.3 Add a defensive JSDoc note at the top of `packages/auth/src/core/createAuth.ts` documenting the **core's contract**: handler code MUST NOT read `request.url.origin`; only `request.url.pathname` and `request.url.searchParams` are trusted. Cross-reference Decision 9 of the OpenSpec change. This is the single point where any future core-level handler change is reviewed, so the warning lives here for maximum visibility.
- [x] 9.4 Add a focused JSDoc warning to the existing `validateRedirectUrl(request.url, redirectUrlParam)` call site inside `packages/auth/src/core/handlers/callbackHandler.ts` flagging the `request.url`-origin dependency as **legacy, scheduled for removal** in the follow-up proposal. Do NOT change behaviour — this is a documentation-only change tied to the deferral decision in Decision 8.
- [x] 9.5 Add a checklist line to the existing `packages/auth/CONTRIBUTING.md` (or create one if it does not exist; the platform convention is a short top-level contributing doc per workspace) under "Before opening a PR": "_New code in `packages/auth/src/core/` MUST NOT read `request.url.origin`. The host portion of `Request.url` is internal-only behind the platform's reverse-proxy chain. Use `Referer` or client-supplied query parameters for any public-origin reasoning. See `openspec/specs/auth/spec.md` § 'GET /login endpoint' for the rationale._"
