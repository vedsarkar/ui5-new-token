---
"@reltio/auth": minor
---

Add a transparent, streaming `/proxy` endpoint that forwards browser requests to allow-listed Reltio services with the session's access token attached server-side as `Authorization: Bearer …` — the browser never sees the token.

- Mounted alongside the existing endpoints; accepts every HTTP method and forwards to the URL in the `reltio-target-url` request header.
- Request and response bodies are streamed through with constant memory — large uploads/downloads, chunked transfers, and Server-Sent Events pass through without buffering or a size cap.
- Enabled via the optional `proxy.allowedTargets` key on `AuthConfig`. Patterns use a wildcard DSL (`*` = one host label, `**` = any number of labels, trailing `/*` = any path under the prefix) and are validated at `createAuth()` construction time — malformed entries throw immediately. Omitting `proxy` leaves `/proxy` unmounted (a normal 404).
- The Next.js App Router adapter now exports `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS` alongside `GET`/`POST`, so a single `app/api/auth/[...auth]/route.ts` can re-export them all.

Note for Express: mount `createExpressAuth()` **before** any body-parser middleware (`express.json()`, …). The proxy streams the raw request body, so a parser that has already consumed the stream leaves nothing to forward.
