---
"@reltio/auth": minor
---

**Added: Dynamic OAuth cluster routing via the signed `reltio_aurl` cookie.**

`POST /checkToken` and `POST /refreshToken` now route the upstream call per session to the Reltio Auth Server cluster that issued the user's access token, instead of always hitting the static `oauthPath` from config. This supports Reltio's multi-environment Auth Service topology (`auth.reltio.com`, `auth-idev-02.reltio.com`, `auth-test.reltio.com`, …) where tokens are issued and validated by a specific cluster.

The cluster URL travels inside the access token as an `aurl` claim. At `/callback` time, the handler decodes the claim, signs it with HMAC-SHA256 (key derived from the existing `clientSecret`), and writes a third `HttpOnly` + `Secure` + `SameSite=Lax` + `Path=/` cookie named `reltio_aurl`. Every subsequent `/checkToken` and `/refreshToken` reads the cookie, verifies the MAC, and forwards the upstream call to that exact cluster. `/refreshToken` re-mints (or clears) the cookie after a successful refresh; `/logout` clears it alongside the existing three cookies.

**Non-breaking.** No new config field is added; `AuthConfig` is unchanged from v1.1.0. The `createExpressAuth(config)` / `createNextAuth(config)` return values gain an additive `resolveAuthPath` member (see below) — a method on the returned `Router` for Express, a field next to `handlers` for Next.js — so existing mount lines and destructures keep working. Existing single-cluster deployments are unaffected at runtime — when no `reltio_aurl` cookie is present, or when verification fails for any reason (tampered, signed by a different key, malformed), the router falls back fail-closed to `AuthConfig.oauthPath`. No log, no throw, no response code change.

**New API: `resolveAuthPath` on the adapter return value.**

`createExpressAuth(config)` and `createNextAuth(config)` now expose a `resolveAuthPath(request)` function for application code that calls the Auth server directly — bypassing the auth router's `/checkToken` and `/refreshToken` endpoints (e.g. proxy handlers, telemetry middleware, custom refresh flows). It is the same resolver the router uses internally, so the HMAC key is derived exactly once — alongside the router — and reused on every call. It accepts Express `Request`, Next.js `NextRequest`, or Web `Request` uniformly, reads the signed `reltio_aurl` cookie, and falls back to the static `oauthPath` when no valid cookie is present.

```ts
import { createExpressAuth } from "@reltio/auth/express";
import { getAccessToken } from "@reltio/auth/utils";

const auth = createExpressAuth({
  oauthPath: process.env.OAUTH_PATH!,
  loginPath: process.env.LOGIN_PATH!,
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
});
app.use("/auth", auth);

app.post("/api/internal/checkToken", async (req, res) => {
  const token = getAccessToken(req);
  if (!token) return res.sendStatus(401);

  const oauthPath = await auth.resolveAuthPath(req);
  const upstream = await fetch(`${oauthPath}/checkToken?token=${token}`, { /* ... */ });
  res.status(upstream.status).json(await upstream.json());
});
```

For Next.js, destructure it alongside the handlers: `const { handlers, resolveAuthPath } = createNextAuth(config);`. The Express adapter attaches `resolveAuthPath` to the returned `Router`, so the existing `app.use(path, createExpressAuth(...))` usage is unchanged.

**New runtime dependency: `fzstd@^0.1.1`** (pure-JS zstd decompression, Web-Crypto-compatible). Used only by the internal `decodeAurl` utility that extracts the `aurl` claim from Reltio JWT access tokens.

**Behaviour change:** `oauthPath` is now validated as a URL at factory construction — an invalid value throws `TypeError: Invalid URL` at server boot instead of failing later on the first upstream call.

See the [Dynamic OAuth Routing](?path=/docs/guides-auth-dynamic-oauth-routing--docs) guide for the full conceptual model, security rationale, and runtime examples (Express, Next.js Route Handler, Next.js Edge Middleware).
