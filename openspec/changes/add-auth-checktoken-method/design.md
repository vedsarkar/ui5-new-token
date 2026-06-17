## Context

`@reltio/auth` v1.3.0 ships a single factory (`createAuth`) that builds one flat `AuthDeps` record at construction time — `config`, `authHeader` (`Basic <base64(clientId:clientSecret)>`), and `keyPromise` (the once-derived HMAC routing key) — and threads it into every handler and internal function via a flat `options` object. The router already exposes `resolveAuthPath` on the adapter return values (`Router & { resolveAuthPath }` for Express; `{ handlers, resolveAuthPath }` for Next.js) so that apps calling the Auth Server directly can resolve the same per-session cluster URL the BFF would use, reusing the once-derived `keyPromise` (see the archived `auth-dynamic-oauth-routing` change).

The package already contains the entire introspection wire contract internally, in `src/core/checkAccessToken.ts`:

```ts
export async function checkAccessToken(options: CheckAccessTokenOptions): Promise<CheckTokenResponse> {
	const { authHeader, accessToken, serviceId, tenantId } = options;
	const authPath = await resolveAuthPath(options); // per-session cluster routing
	const url = new URL(`${authPath}/checkToken`);
	if (serviceId) url.searchParams.set("serviceId", serviceId);
	if (tenantId) url.searchParams.set("tenantId", tenantId);
	const form = new URLSearchParams();
	form.append("token", accessToken);
	const response = await safeFetch({
		url: url.href, method: "POST",
		headers: { Authorization: authHeader }, body: form,
	});
	return (await response.json()) as CheckTokenResponse;
}
```

`CheckAccessTokenOptions = AuthDeps & { request; accessToken; serviceId?; tenantId? }` — a superset of `ResolveAuthPathOptions`. `safeFetch` already applies the package error policy (2xx → `Response`; 4xx → propagate; 5xx/network → `502 RequestError`). Today this function is reachable only through `checkTokenHandler` (the HTTP `POST /checkToken` route), which catches `RequestError` and maps it to a `Response` (200/401/502). Consumer BFFs that want the *parsed* result server-side re-implement this exact body against a hardcoded `oauthPath`, duplicating the security-sensitive wire contract.

Stakeholders: the Reltio UI CoE (owns `@reltio/auth`), and the 20+ consumer BFFs — specifically the subset (reltio-react-ui, admin-tools, …) that gate routes by introspecting the request token server-side.

## Goals / Non-Goals

**Goals:**

1. Expose the already-internal `checkAccessToken` as a `checkToken` member on the value returned by `createExpressAuth(config)` / `createNextAuth(config)`, mirroring `resolveAuthPath` exactly.
2. Reuse the once-derived `AuthDeps` (`authHeader` + `keyPromise` + `config`) — no second key derivation, no `AuthDeps` leaking onto the public surface.
3. Read the access token from the request (`Authorization: Bearer`, then `access_token` cookie) via the existing `getAccessToken`; route per-session via `resolveAuthPath`; POST the introspection; return the parsed, typed payload (not a `Response`).
4. Preserve the existing `RequestError` policy (4xx propagate, 5xx/network → 502) and document it as the public contract.
5. Type the response: enrich the existing public `CheckTokenResponse` type in place, replacing its `Record<string, unknown>` shape.
6. Stay non-breaking and purely additive.

**Non-Goals:**

1. **Changing the `POST /checkToken` HTTP route behaviour.** The router endpoint still returns a `Response` (200/401/502). `checkToken` is the *programmatic* sibling that returns the parsed payload / throws.
2. **A standalone `@reltio/auth/utils` export.** `checkAccessToken` is stateful (needs `authHeader` *and* `keyPromise`), so it cannot live in `utils` — same reasoning that put `resolveAuthPath` on the adapter return.
3. **Exposing `createAuth` or `AuthDeps`.** The member is a bound closure; `AuthDeps` stays internal.
4. **Token signature verification.** Introspection is the Auth Server's job; `checkToken` only relays the request token and returns the server's verdict.
5. **A new config field.** `AuthConfig` is unchanged.

## Decisions

### Decision: Expose `checkToken` on the adapter return, not in `@reltio/auth/utils`

`checkAccessToken` is **stateful** — it consumes both the once-derived `authHeader` (HTTP Basic credential) *and* the once-derived `keyPromise` (via `resolveAuthPath`). Its options type is a strict superset of `ResolveAuthPathOptions`. A bare `@reltio/auth/utils` export would force the consumer to reconstruct `AuthDeps` (re-deriving the HMAC key, re-encoding the Basic header) on every call, or force the package to export `deriveHmacKey` / `getBasicToken` plus a "build deps once" contract — exactly the footgun `resolveAuthPath` was designed to avoid.

The only consistent way to expose stateful, once-derived behaviour is as a **member of the value `createAuth` already returns**, bound to the single `AuthDeps` record. This is the established pattern for `resolveAuthPath`. `checkToken` follows it byte-for-byte:

- Express: `router.checkToken = auth.checkToken;` → `Router & { resolveAuthPath; checkToken }`.
- Next.js: returns `{ handlers, resolveAuthPath, checkToken }`.

**Alternatives rejected:**

- **Standalone `createCheckToken(config)` factory.** Derives the HMAC key a second time at boot, creates a second factory whose `clientSecret` must stay in sync with the router's — the same drawbacks that killed the standalone `createOauthPathResolver` in the prior change.
- **Bare `checkAccessToken` export from `@reltio/auth/utils`.** It needs `AuthDeps`; exporting it would leak `AuthDeps` or push deps construction onto consumers.

### Decision: Public signature `checkToken(request, opts?)`

```ts
checkToken(
	request: AnyRequest,
	opts?: { serviceId?: string; tenantId?: string },
): Promise<CheckTokenResponse>;
```

- `request: AnyRequest` — accepts Express `Request`, Next.js `NextRequest`, and Web `Request` uniformly, identical to `resolveAuthPath` / `getAccessToken`.
- `opts` is an optional flat object carrying the two scope query parameters. Both are optional; omitting them matches today's `POST /checkToken` behaviour when no query params are present.
- Returns the parsed payload, typed as `CheckTokenResponse`. It does NOT return a `Response`.

The adapter member is a thin closure over the once-built `AuthDeps`:

```ts
// inside createAuth, alongside resolveAuthPath
checkToken: async (request, opts) => {
	const accessToken = getAccessToken(request);
	if (!accessToken) {
		throw new RequestError("No access token on request", { statusCode: 401 });
	}
	return checkAccessToken({
		...deps,
		request,
		accessToken,
		serviceId: opts?.serviceId,
		tenantId: opts?.tenantId,
	});
}
```

`getAccessToken` is the existing helper (Bearer header → `access_token` cookie). Sourcing the token inside `checkToken` (rather than asking the caller to pass it) keeps the call site minimal and matches how `checkTokenHandler` already reads it.

**Alternatives rejected:**

- **`checkToken(request, accessToken, opts)` (explicit token).** Redundant — the package already knows how to read the token from the request, and every direct-introspection call site reads the *current request's* token. An explicit token parameter invites callers to pass the wrong one.
- **Positional `serviceId` / `tenantId` arguments.** The options-object pattern keeps the call self-documenting and matches the package's internal convention.

### Decision: Missing-token behaviour throws `RequestError` 401 (not a sentinel)

The router's `checkTokenHandler` returns `401` when `getAccessToken(request)` yields `null`. The programmatic `checkToken` mirrors that boundary by throwing `RequestError` with `statusCode: 401`, so callers have a **single** error channel: `try { await auth.checkToken(req) } catch (e) { if (isRequestError(e)) … }`. This unifies "no token on the request" with "upstream rejected the token" (both 401) and "auth server down" (502), so consumer authZ middleware does one `isRequestError` check and branches on `statusCode`.

**Alternatives rejected:**

- **Return `null` for the missing-token case.** Forces callers to handle two failure shapes (`null` *and* a thrown `RequestError`) for what is semantically one outcome (no valid token → 401).

### Decision: Preserve the `RequestError` policy verbatim and document it

`checkToken` delegates to `checkAccessToken` → `safeFetch`, so the policy is already correct and shared with the router: upstream 4xx propagate their status on `RequestError.statusCode`; upstream 5xx and network failures normalise to 502. `checkToken` adds only the 401 for a missing request token. The contract — "`checkToken` throws `RequestError`; inspect `error.statusCode` (4xx = token rejected, 502 = auth server unreachable/5xx); it never returns a `Response`" — is documented on the requirement and in the Storybook guide. `RequestError` and `isRequestError` are already public via `@reltio/auth` error handling used by consumers.

### Decision: Type the introspection payload as `CheckTokenResponse`

Replace the permissive internal `CheckTokenResponse = Record<string, unknown>` with a public, named type that captures the known Reltio introspection fields while staying open to extra fields:

```ts
export type CheckTokenResponse = {
	clientId: string;
	expiration: number;
	resourceIds: string[];
	roles: string[];
	scopes: string[];
	user: {
		customer: string;
		username: string;
		email: string;
		[key: string]: unknown;
	};
	[key: string]: unknown;
};
```

`checkAccessToken`'s return type is tightened to `CheckTokenResponse` (the existing exported name, enriched in place from `Record<string, unknown>`). The index signatures keep the type permissive — Reltio environments vary — while giving consumers typed access to the fields they actually gate on (`roles`, `scopes`, `user`). Because the parse is a cast (`as CheckTokenResponse`), the type is a compile-time convenience, not a runtime validator; this is called out as a non-goal of runtime validation.

**Alternatives rejected:**

- **Keep `Record<string, unknown>`.** Defeats the point — consumers want `result.roles` typed, not `result["roles"] as string[]`.
- **Strict closed type (no index signature).** Reltio introspection bodies vary by environment; a closed type would break on legitimate extra fields.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| `CheckTokenResponse` drifts from the real Auth Server payload | Index signatures keep the type open; documented as a typed convenience, not a runtime contract. Field set matches the documented Reltio introspection response and can be widened additively (minor bump) as fields are confirmed. |
| Consumers expect `checkToken` to return a `Response` like the route | The requirement and guide state explicitly that `checkToken` returns the parsed payload and throws `RequestError`; the HTTP route (`POST /checkToken`) is the `Response`-returning sibling and is unchanged. |
| Missing-token 401 differs from a `null` return some hand-rolled copies use | Documented in the migration note; the single `isRequestError` + `statusCode` branch is simpler than the previous mixed `null`/throw handling and is the recommended pattern. |
| Forged `aurl` in the request access token steering the introspection call | Routing is sourced exclusively from the HMAC-signed `reltio_aurl` cookie via `resolveAuthPath` (unchanged) — `checkToken` never decodes `aurl` from the request token, so the forged-JWT routing vector stays closed. |
| Adapter return type surface grows | Additive member only (`Router & { resolveAuthPath; checkToken }` / `{ handlers, resolveAuthPath, checkToken }`); no removed members, mount lines unchanged, non-breaking minor. |

## Migration Plan

1. Ship the additive `checkToken` member and `CheckTokenResponse` type as a `minor` `@reltio/auth` release with a changeset.
2. Consumer BFFs doing direct introspection replace their hand-rolled `checkAccessToken` copy with `const result = await auth.checkToken(req, { serviceId })` (where `auth` is the value already returned by `createExpressAuth` / `createNextAuth` to mount the router), and switch error handling to a single `isRequestError(e)` + `e.statusCode` branch.
3. No rollback complexity — apps that don't adopt `checkToken` are unaffected; the member is inert until called.

## Open Questions

None blocking. The exact superset of fields in `CheckTokenResponse` can be widened additively as the IDP team confirms the canonical introspection body; the index signatures make any such widening a non-breaking change.
