## Context

`@reltio/auth` v1 inherited the `Referer`-only model of source resolution from the legacy `auth-middleware`: the `/login` and `/logout` handlers parse `Referer`, take the tenant from its query string, and use the referer URL itself as the post-login return target. That model fits applications whose tenant is encoded in the query (`reltio-react-ui`, `admin-tools`, the rest of the catalog that maps tenant onto a search parameter), but it breaks for any app that encodes the tenant in the **path**. HUB UI's BFF routes look like `/hub/<tenant>/...`; the v1 handlers cannot recover the tenant from such a referer and silently send the user to the Login Page without a tenant, which the Login Page then has to resolve through its own SSO state.

To work around the gap, the HUB UI app ships custom `/login` and `/logout` routes that duplicate the package internals just to read the tenant from `req.url`. The team flagged this during the v1 design review and asked for a more universal mechanism. The fix needs to land in `@reltio/auth` itself so HUB and any future path-based-tenant consumer can drop the custom shim.

Constraints:

- **Backwards compatibility.** Every catalog app currently relying on the `Referer` flow must keep working with no code change. The new mechanism is opt-in by passing query parameters; if neither is passed the handlers fall back to the existing referer pipeline.
- **`/callback` is immutable in v1.** The OAuth server has pre-registered callback URLs per consumer. This change does not touch the `/callback` endpoint at the network level — the new `?returnTo=` query parameter flows through the existing `redirectUrl` query parameter on the callback URL.
- **Web Fetch API core.** Both handlers run inside the framework-agnostic core. Any helper introduced for source resolution must depend only on the Web `Request` type.
- **No new `AuthConfig` keys.** Earlier explore stage considered adding a `resolveTenant?: (ctx) => string | null` callback. Rejected for the reasons in Decision 2 below.

Stakeholders:

- **HUB UI team** — lead consumer of the new mechanism; will drop its custom `/login` / `/logout` shim once the change ships.
- **Design Platform team** — owns `@reltio/auth`, the Storybook stories, and the migration story.
- **Catalog application teams** — passive consumers; the change is non-breaking and requires no migration work from them.

## Goals / Non-Goals

**Goals:**

- Let any consumer supply `?tenant=` and `?returnTo=` as request query parameters on `/login` and `/logout`. When present they take precedence over the values derived from `Referer`.
- Keep `Referer` as a working fallback so existing consumers do not migrate.
- Validate `?returnTo=` (and the `Referer`-sourced equivalent) eagerly via `validateRedirectUrl` so foreign-origin return URLs cannot leak `client_id` into OAuth-server logs through an unnecessary round-trip.
- Anchor the OAuth `redirect_uri` on the BFF's own origin (`request.url`) so split-origin deployments stop emitting an incorrect `redirect_uri` host.

**Non-Goals:**

- Adding new config keys to `AuthConfig` (no `resolveTenant`, no `appOrigin`).
- Renaming or restructuring the five endpoints.
- Removing `Referer` support. The mechanism is **explicit-first, referer-fallback** — not "referer dropped".
- Per-framework helpers. The same source-resolution logic lives in the core and serves both adapters identically.
- A code-mod for HUB UI. Migration is one `<a href>` / URL string edit per consumer; the Migration story shows the pattern.

## Decisions

### 1. Explicit query parameters take precedence over `Referer`

**Decision.** The `/login` and `/logout` handlers resolve `tenant` and `returnTo` from the request query first (`new URL(request.url).searchParams.get("tenant" | "returnTo")`), then fall back to the `Referer` URL's `searchParams.get("tenant")` and `href` respectively. The two sources are independent: a consumer may pass `?returnTo=` without `?tenant=`, or vice versa, and the missing value still falls back to `Referer`.

**Why.** This matches the platform's "explicit over implicit" principle and gives consumers an additive opt-in. There is no scenario where a `Referer`-derived value would be more authoritative than an explicit query parameter the consumer itself just sent. The precedence direction is also the safer one — a consumer that explicitly asks for `tenant=acme` cannot be silently overridden by a leaked `?tenant=evil` left over in the referer of a previous navigation.

**Alternatives considered.**

- *Merge query and referer values* (e.g. union, or referer-first). Confusing precedence rules, no real use case.
- *Reject the request if both query and referer disagree.* Defensive but unfriendly; the consumer is the source of truth here.
- *Read tenant from the BFF's own URL `pathname`.* Couples the auth router to the BFF's URL shape and breaks the "mount anywhere" property.

### 2. No new `AuthConfig` keys — query parameters are the contract

**Decision.** The new contract is expressed entirely through request-level query parameters, not configuration-level callbacks. `AuthConfig` remains unchanged.

**Why.** A `resolveTenant?: (ctx) => string | null` callback on `AuthConfig` would solve HUB's case but introduce a hidden side-channel for tenant resolution that consumers would have to know about to debug. A request-level query parameter is self-documenting at the call site (an AI agent or a human reading the `<a href>` immediately understands what is being requested) and matches the symmetry of the existing `?redirectUrl=` flow on `/callback`. Keeping `AuthConfig` stable also avoids a new public type and a new way for consumers to mis-configure the auth router.

**Alternatives considered.**

- *`resolveTenant` callback in `AuthConfig`.* Hides intent in shared config. Forces every consumer to know what the BFF is doing. Rejected.
- *`tenantPathPattern: string` regex/template in `AuthConfig`.* Less flexible than a callback and still hides intent. Rejected.
- *Make the explicit values per-request **and** also keep an optional callback as a fallback before `Referer`.* Over-engineered for the lone path-based-tenant case HUB represents today. If a third source emerges we can revisit.

### 3. `authCallbackUrl` origin comes from the client (`returnTo` or `Referer`), never from `request.url`

**Decision.** The OAuth `redirect_uri` (the callback URL the OAuth server eventually redirects back to) is built from a **client-supplied** origin plus the **BFF's own pathname**:

- **Explicit path** (`?returnTo=` is present): `origin = new URL(returnTo).origin`
- **Legacy fallback path** (no `?returnTo=`, `Referer` is present): `origin = refererUrl.origin` (today's behaviour, untouched)
- In both paths: `pathname = new URL(request.url).pathname.replace(/login$/, "callback")`

The BFF never reads `new URL(request.url).origin` (i.e. `scheme + host + port`) when building public URLs.

**Why not `request.url.origin`.** The platform's runtime topology places several reverse proxies between the public domain (where the SPA and the browser-visible BFF endpoints live) and the Node.js process that runs the auth router. Each proxy hop rewrites or strips `Host` and `X-Forwarded-*` headers; `Next.js`/`Express` URL reconstruction is brittle behind multiple hops and the BFF effectively sees every incoming request on an internal origin (`http://localhost:3000`, an internal service name, etc.). A `redirect_uri` built from that origin would route the OAuth server back to a URL the browser cannot reach.

The only authoritative source of the public origin from inside the BFF is something the **client** sent — either as the explicit `?returnTo=` (which the SPA constructs from `window.location` or the framework's request URL, so it always reflects the actually-served public origin) or as the `Referer` header (which the browser writes from its own address bar). Both are client-supplied; both reflect the public origin by construction.

**Why `request.url.pathname` is still safe.** Reverse proxies preserve the path because that is how they route — `/api/auth/login` on the public domain has to arrive at the BFF as `/api/auth/login` for the auth router to match it in the first place. The path therefore reflects exactly where the matching `/callback` lives, regardless of how many proxy hops sit in front. This is the same reason the existing legacy code uses `requestUrl.pathname.replace(/login$/, "callback")` — that part of the v1 logic is correct and we keep it.

**What the legacy path keeps doing.** When no `?returnTo=` is supplied, the handler reads `refererUrl.origin` (today's source) and uses it for the callback URL — byte-for-byte identical to v1. Every existing catalog consumer is unaffected.

**Alternatives considered.**

- *Trust `request.url.origin` (the first version of this proposal).* Rejected after review feedback: the topology does not preserve `Host`/scheme into the BFF process. This was the central mistake of the first iteration.
- *Add an `appOrigin: string` config key listing the public origin(s).* Pushes deployment topology into `AuthConfig` and forces every consumer to wire it. Wrong layer; rejected.
- *Reconstruct the public origin from `X-Forwarded-*` headers with a configurable `trustProxy` setting.* Standard pattern, but assumes the entire proxy chain consistently forwards the header — which is exactly the assumption the team has flagged as fragile. Rejected; the client-supplied source eliminates the need for any header trust list.
- *Encode the callback URL entirely on the client and pass it as `?redirect_uri=` (OAuth-native).* Considered during review; cleanest contract from a pure-OAuth point of view. Rejected for this iteration because the team prefers the higher-level `returnTo` abstraction (the BFF still owns the callback path layout) and because the legacy referer-only consumers do not have a clean migration target into a `redirect_uri`-only contract. Can be revisited in a future major bump.

### 4. Validation of explicit `?returnTo=` is cross-source, not BFF-origin-based

**Decision.** When an explicit `?returnTo=` is supplied **and** the `Referer` header is also present, the handler asserts `new URL(returnTo).origin === refererUrl.origin` before redirecting to the Login Page. A mismatch produces `400 returnTo origin does not match Referer origin` immediately, with no OAuth round-trip and no `state` cookie set.

When `?returnTo=` is supplied **alone** (no `Referer`, e.g. under a strict `Referrer-Policy`), the BFF has no second client-supplied origin to compare against and cannot independently validate `returnTo`. The handler forwards the request, relying on the **Reltio OAuth server's `redirect_uri` allowlist** as the authoritative open-redirect protection in this path — the Login Page rejects any `redirect_uri` whose origin/path is not registered for the `client_id`, which is the standard OAuth 2.0 security boundary.

The **legacy referer-only fallback path** keeps the existing v1 behaviour exactly: `validateRedirectUrl(request.url, refererUrl.href)` continues to fire on `/callback`, unchanged. Whatever effective behaviour that check has today is preserved; this change does not touch it.

**Why no eager check against `request.url`.** The first iteration of this design proposed `validateRedirectUrl(request.url, returnTo)` as an eager guard inside `/login`. Per Decision 3, `request.url.origin` is not the public origin in our topology — comparing a client-supplied public origin against it would systematically fail in production, regardless of attacker presence. Cross-source comparison (`returnTo` vs `Referer`) is the only useful invariant the BFF can enforce locally; everything else has to rely on the OAuth server's allowlist.

**Why cross-source check is still worth doing.** The cross-source mismatch is a clear sign of attacker activity (legitimate consumers always send `?returnTo=` and `Referer` from the same origin). Catching it before the OAuth round-trip:

- Avoids logging `client_id` and a never-going-to-succeed `redirect_uri` in the OAuth server's audit trail.
- Avoids setting a `state` cookie that the user would have to clean up.
- Surfaces the bug at the BFF instead of the OAuth server, which gives a clearer error message to the consumer during development.

**`/callback` is unchanged in this iteration.** The existing `validateRedirectUrl(request.url, redirectUrlParam)` check inside `/callback` stays as-is. The same `request.url`-origin concern applies to it, but addressing it requires a separate decision (likely storing the legitimate origin in the `state` cookie at `/login` time, then comparing on `/callback`). That is a deliberate non-goal here — see Decision 9 below.

**Alternatives considered.**

- *Eager `validateRedirectUrl(request.url, returnTo)` (first iteration of this decision).* Rejected after review feedback: `request.url.origin` is the internal origin, not the public one (see Decision 3). The check would either succeed by accident (when something further up the chain happens to put the public origin into `req.url`) or fail systematically. Either way it does not actually enforce the property we want.
- *Allowlist of trusted origins in `AuthConfig`.* Pushes deployment topology into config. Same rejection as Decision 3's `appOrigin` alternative.
- *Always require both `?returnTo=` and `Referer`.* Defeats the purpose of supporting consumers under strict `Referrer-Policy`. Rejected.
- *Sign the `?returnTo=` value with a server-side secret at first hit, validate the signature on subsequent endpoints.* Strong but adds a new public-API surface and a new secret to manage. Out of scope for this iteration; can be considered later as a hardening pass over the whole auth router.

### 5. Soft-fail `Referer` parsing when query parameters cover both sources

**Decision.** The handlers attempt to parse `Referer` only as a fallback. If both `?returnTo=` and `?tenant=` are present on the request (or if only `?returnTo=` is present and `?tenant=` is meant to be absent), a malformed or missing `Referer` is **not** an error. The 400 responses fire only when the resolved `returnTo` is `null` (neither source supplied one) or when `returnTo` fails `validateRedirectUrl`.

**Why.** Some browsers strip `Referer` on cross-origin navigations under stricter `Referrer-Policy` settings. A consumer that knows it operates under such a policy needs a way to drive `/login` without a referer; explicit `?returnTo=` is that way. Failing the request because the (now unused) `Referer` happens to be missing would force the consumer to send a synthetic referer just to satisfy the handler.

**Alternatives considered.**

- *Keep `Referer` mandatory always.* Defeats the purpose of explicit query parameters.
- *Make `Referer` mandatory only when `?returnTo=` is absent.* This is exactly the proposed rule, phrased from the other direction. Same outcome.

### 6. Empty / whitespace `?tenant=` is treated as absent

**Decision.** `?tenant=` is read with `searchParams.get("tenant")` and considered present only if the value is a non-empty trimmed string. An empty `?tenant=` falls through to the `Referer` fallback; if `Referer` also yields no tenant, the redirect omits `tenant` entirely.

**Why.** Some templating layers emit `?tenant=` with an empty string when the local tenant is unknown. The fail-soft behaviour mirrors today's "no tenant" path and avoids breaking such consumers.

### 7. `/logout` mirrors `/login` exactly

**Decision.** Everything above applies symmetrically to `/logout`. The handler resolves `tenant` and `returnTo` from the request query first, then `Referer`. When an explicit `?returnTo=` is supplied alongside `Referer`, the same cross-source origin check applies. The callback URL inside the logout chain (the URL eventually re-entered after the Login Page's logout endpoint) inherits its origin from the resolved return URL — `returnTo` for the explicit path, `refererUrl.origin` for the legacy referer path — never from `request.url`.

**Why.** The two handlers are 95% the same code today; their externally visible contracts should remain symmetric. Asymmetry would be a footgun for consumers wiring both endpoints from the same `<a href>` template.

**Implementation note.** Extract a shared helper (`resolveLoginContext(request)` or similar — the exact name is a tasks-phase concern) so the two handlers stay byte-for-byte equivalent in their source-resolution logic and only diverge on the Login Page URL they build.

### 8. `/callback`'s `validateRedirectUrl` stays untouched in this iteration

**Decision.** The existing `validateRedirectUrl(request.url, redirectUrlParam)` check inside `callbackHandler.ts` is **not** modified by this change. It continues to fire on every `/callback` invocation with the same semantics it has today.

**Why.** The check has the same `request.url`-origin problem flagged in Decision 3, but reworking it cleanly requires either:

1. **Carrying the legitimate origin from `/login` to `/callback` through the `state` cookie** (or a parallel `state_origin` cookie). That changes the cookie schema and the state-validation contract, both of which deserve their own explicit spec delta and migration story.
2. **Removing the BFF-side check entirely** and relying on the OAuth server's `redirect_uri` allowlist plus the `state` cookie. Defensible but a behaviour-removing change that needs its own review (and a migration warning for consumers that rely on the current `400` for foreign-origin `redirectUrl` to detect misconfiguration in tests).

Both options are larger than the explicit-`returnTo` work scope here. Bundling them in would broaden the review surface and slow ratification of the consumer-facing pain point HUB UI raised. They are queued as a follow-up OpenSpec change, scheduled after this one ships.

**What this means in practice.** The new explicit-`?returnTo=` path **does not** go through `validateRedirectUrl` on `/callback` any more strictly than the legacy referer path does. Both paths are equally subject to whatever effective behaviour the current check has in production. The cross-source check in Decision 4 catches the obvious open-redirect attempts at `/login` time before they ever reach `/callback`.

### 9. `request.url.origin` is a hostage of backwards compatibility — planned for breaking removal

**Decision.** `request.url.origin` is treated as **unreliable input** by every new and updated code path in this change. It is kept in two pre-existing locations strictly to preserve v1 behaviour:

1. **`expressToWebRequest`** (`packages/auth/src/express/adapter.ts`) — continues to assemble `Request.url` from `req.protocol` + `req.get("host")` + `req.originalUrl`. The host portion is internal-only behind the platform's reverse-proxy chain, but removing it would change the publicly-observable `Request.url` shape and break the existing `/callback` `validateRedirectUrl(request.url, ...)` check (see Decision 8).
2. **`callbackHandler.ts`'s `validateRedirectUrl(request.url, redirectUrlParam)`** — keeps consuming `request.url.origin` because changing it requires the cookie-shape rework discussed in Decision 8.

Both call sites are documented inline with defensive JSDoc warning that the origin must NOT be trusted by any new code, and a checklist item is added to the review guidelines so future contributors do not regress on this.

**Planned breaking change in a future major.** A subsequent OpenSpec proposal (working title: `auth-trust-only-client-supplied-origins`) is scheduled after this change ships. It will:

- Stop assembling a fake-looking origin in `expressToWebRequest` — either substitute a stable placeholder (`http://internal.bff.local/`) that downstream code cannot mistake for the public origin, or carry the request path through a different shape than `Request.url`.
- Rework `callbackHandler.ts` to derive the legitimate origin from the `state` cookie (set at `/login` time with the resolved `returnTo` origin) instead of from `request.url`.
- Replace `validateRedirectUrl` with a `state-cookie`-based equivalent.

The future change is **expected to be breaking** for any external consumer that has come to rely on the current `request.url.origin` value reaching them (e.g. through the `ssoRedirect` callback's `context.request`). It will land as part of a planned `@reltio/auth@2.0.0` release with a dedicated Migration story.

**Why not bundle that into this change.** Two reasons: (a) HUB UI's pain point — the lead consumer driver for this work — is fully resolved by the explicit `?returnTo=` mechanism alone; doubling the scope would slow ratification; (b) the breaking rework deserves its own design exploration (cookie schema, security review of the OAuth-server-allowlist-only model, consumer migration timing) which is more involved than the current consumer-facing addition.

## Risks / Trade-offs

- **Risk:** An attacker sends `GET /login?returnTo=https://evil.com` from a context where the user agent strips `Referer` (e.g. strict `Referrer-Policy`). The BFF cannot cross-check; the request is forwarded to the OAuth server.
  **Mitigation:** The Reltio OAuth server's `redirect_uri` allowlist refuses any `redirect_uri` whose origin/path is not registered for the `client_id`. The attack cannot complete because the Login Page rejects the `redirect_uri`. This is the standard OAuth 2.0 defence and the platform direction is to lean on it explicitly. The follow-up `/callback` hardening (Decision 8) closes the residual edge case where the OAuth allowlist is permissive on query parameters.

- **Risk:** A legitimate consumer accidentally sends `?returnTo=` with a different origin than its `Referer` (e.g. a mis-typed environment variable in a config template).
  **Mitigation:** The cross-source check (Decision 4) returns `400 returnTo origin does not match Referer origin` immediately. This surfaces the bug at the BFF rather than as a more confusing OAuth-server rejection later, which is the desired developer-experience trade-off.

- **Risk:** Reverse-proxy topology changes in the future (e.g. an internal proxy is added that rewrites `request.url.pathname`) would break the `pathname.replace(/login$/, "callback")` derivation.
  **Mitigation:** The path-preservation property is what reverse proxies are designed to provide; an environment that breaks it would also break the BFF's URL-based routing in general, not just this derivation. The change is a no-op against the realistic threat model.

- **Trade-off:** Cross-source validation cannot run when `Referer` is absent. This is the correct trade-off — refusing to log in under strict `Referrer-Policy` would defeat the purpose of the explicit `?returnTo=` mechanism — but it does mean a portion of the new path's security relies on the OAuth server's allowlist rather than a BFF-side defence. Documented explicitly in the Setup and Migration stories.

- **Trade-off:** No `resolveTenant` callback in `AuthConfig` means consumers with truly exotic tenant locations (e.g. tenant in a cookie set by an upstream proxy) still need a small BFF-side shim. Acceptable: the platform direction is to make the BFF the authority on where tenant lives, and query parameters express that authority at the call site rather than hidden in config.

## Open Questions

- **Parameter name `?returnTo=` vs `?redirectUrl=`.** Internally the flow already uses `redirectUrl` (on `/callback`). Externally, `returnTo` reads more naturally at the consumer's `<a href>` and avoids confusion with the existing internal name. Current proposal goes with `returnTo`; if review prefers `redirectUrl` for consistency we can swap before implementation. Either choice is mechanical and does not change any other decision in this document.
- **Timing of the `/callback` hardening follow-up (Decision 8).** Should it ship in the same `@reltio/auth` minor as this change (bundled but separately reviewed), or as a deliberately later release after HUB UI confirms the new explicit path solves their pain? Current preference is "later": ship the consumer-facing fix now, let HUB UI adopt, then plan the `/callback` cleanup with the OAuth-server team. To be confirmed during review.
