---
"@reltio/auth": minor
---

Export the full `@reltio/auth/utils` surface as supported public API.

The barrel now `export *`s every helper the router uses, so BFF code can reuse them instead of carrying magic strings. Newly exposed: `parseCookies`, `serializeCookie`, `clearCookie`, the `CookieOptions` type, `ACCESS_TOKEN_COOKIE` / `REFRESH_TOKEN_COOKIE`, `validateState`, `readHeader` / `AnyRequest`, and `resolveRedirectParams` / `upgradeToHttps` / `RedirectParams`. Purely additive — no existing import or behaviour changes.
