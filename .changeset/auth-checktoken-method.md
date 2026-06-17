---
"@reltio/auth": minor
---

Expose a `checkToken` introspection method on the value returned by `createExpressAuth` / `createNextAuth`, mirroring how `resolveAuthPath` is attached. BFFs can now introspect the current request's access token server-side — to gate routes by role/permission — without re-implementing the introspection wire contract.

**Added**

- **`checkToken(request, opts?)`** on the `createExpressAuth(config)` / `createNextAuth(config)` return value: `(request: AnyRequest, opts?: { serviceId?: string; tenantId?: string }) => Promise<CheckTokenResponse>`. It reads the access token from the request (`Authorization: Bearer` / `access_token` cookie), routes per session via `resolveAuthPath` (signed `reltio_aurl` cookie, falling back to `oauthPath`), POSTs the introspection call with the once-derived HTTP Basic credential, and resolves to the **parsed** payload (not a `Response`). It reuses the router's once-derived `authHeader` and HMAC key — no extra setup, no per-call key derivation.
- **`CheckTokenResponse`** type (exported from `@reltio/auth/types`) is now enriched from `Record<string, unknown>` to describe the parsed `POST /checkToken` payload (`clientId`, `expiration`, `resourceIds`, `roles`, `scopes`, `user`, plus a permissive index signature). Compile-time convenience only — no runtime schema validation.
- **`RequestError`** and **`isRequestError`** are now exported from `@reltio/auth/utils` (previously internal). `checkToken` throws `RequestError` on failure: missing request token → `statusCode` 401, upstream 4xx → the upstream status, upstream 5xx / network failure → 502.

This release is purely additive — apps that only mount the router are unaffected.

**Acting on this release**

BFFs doing direct introspection (e.g. `reltio-react-ui`, `admin-tools`) can drop their hand-rolled copy of the `checkAccessToken` body and replace it with a single call:

```ts
import { isRequestError } from "@reltio/auth/utils";

try {
	const { roles } = await auth.checkToken(req, { serviceId: "MDM" });
	if (!roles.includes("ROLE_ADMIN")) return res.sendStatus(403);
} catch (error) {
	if (isRequestError(error)) return res.sendStatus(error.statusCode);
	throw error;
}
```
