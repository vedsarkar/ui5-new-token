---
"@reltio/auth": minor
---

**Added: `?tenant=` and `?returnTo=` query parameters on `/login` and `/logout`.**

`GET /login` and `GET /logout` now accept two optional query parameters that take precedence over the `Referer` header:

- `?tenant=<non-empty-string>` — sets the `tenant` parameter forwarded to the Reltio Login Page. An empty or whitespace-only value falls back to the referer source.
- `?returnTo=<absolute-url>` — sets the post-login/logout return URL and the origin used to build the OAuth `redirect_uri`. When absent, the handler falls back to the `Referer` header (v1 behaviour, untouched).

**Cross-source origin check:** when both `?returnTo=` and `Referer` are present, the handler asserts `new URL(returnTo).origin === refererUrl.origin` and returns `400 returnTo origin does not match Referer origin` on mismatch. When `?returnTo=` is supplied alone (no `Referer`), no BFF-side check is performed — the Reltio OAuth server's `redirect_uri` allowlist is the authoritative protection in that path.

**Removed: `redirectUrl` origin validation in `/callback`.**

The `validateRedirectUrl` check in `GET /callback` has been removed. `validateRedirectUrl` had a valid purpose originally — it blocked open-redirect attacks by ensuring `redirectUrl` came from the same origin as the BFF. With DESIGN-76, that protection moved upstream: `resolveRedirectParams` now validates the `returnTo` origin at `/login` (before the OAuth flow begins), so the `redirectUrl` that reaches `/callback` has already been vetted at source. The check at `/callback` became redundant. Additionally, the check was broken behind any reverse proxy — it compared `redirectUrl` against `request.url.origin`, which the Express adapter built from `req.get("host")`. Unlike `req.hostname`, `req.get("host")` always returns the raw `Host` header (e.g. `localhost:3000`) regardless of `trust proxy` or `X-Forwarded-Host`, so the origin never matched the public app origin in deployed environments.

**Improved: Express adapter no longer reconstructs the public hostname.**

`expressToWebRequest` previously assembled `request.url` from `req.protocol` and `req.get("host")`, which are unreliable behind reverse proxies. It now uses a fixed IANA-reserved placeholder origin (`http://internal.invalid`) combined with `req.originalUrl`. Handlers only ever read `.pathname` and `.searchParams` from `request.url` — the origin was never meaningful in that context.

**Non-breaking:** all existing consumers relying on `Referer`-only resolution continue to work without any code change. The removed `validateRedirectUrl` behavior is fully covered by upstream protections.
