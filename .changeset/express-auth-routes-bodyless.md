---
"@reltio/auth": patch
---

Fix `@reltio/auth/express`: restore the five auth endpoints' independence from body-parser middleware order.

`1.6.0` introduced `/proxy`, which forwards the request body upstream. To make that possible the Express adapter began attaching the raw Node request stream to the Web `Request` for **every** non-`GET`/`HEAD` route — including `POST /checkToken` and `POST /refreshToken`, and regardless of whether `config.proxy` was set at all. Apps that mount `express.json()` before the auth router (the common middleware order) then hit a `TypeError: Response body object should not be disturbed or locked` inside the adapter, surfaced as a `500`, as soon as the parser matched the request's `Content-Type` and drained the stream. Upgrading from `1.3.x` broke `/checkToken` and `/refreshToken` for those apps.

The raw stream is now attached only on `/proxy`, the one route that reads a body. The five auth endpoints read nothing but headers, cookies, and the query string, so they work at any position in the middleware chain again — no mount-order change, no `express.json()` relocation.

- **No consumer action required** if you do not use `/proxy`. Restores `1.3.x`/`1.5.x` behaviour.
- **If you enable `proxy`**, mounting `createExpressAuth()` **before** `express.json()` / `express.urlencoded()` / `express.raw()` remains required — `/proxy` streams the raw body, and a parser that already consumed it leaves nothing to forward. A misconfiguration fails loudly with a `500` rather than silently forwarding an empty body upstream.
- `expressToWebRequest(req)` takes an optional second argument (`{ streamBody?: boolean }`, default `false`). Existing calls are unaffected.
- The Next.js adapter was never affected: it passes the native `Request` straight to the core with no reconstruction.
