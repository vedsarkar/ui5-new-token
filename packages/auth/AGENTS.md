# AGENTS.md — `@reltio/auth`

Package-specific rules. Read with the repo-root `AGENTS.md` (module conventions).

## 1. `core/` is private; everything else is public

`src/core/` has no `package.json` `exports` subpath, so consumers cannot import it. Change it freely (`patch`, even a full rewrite) as long as public behaviour holds. `src/types|express|next|utils` are public — each fronted by an `index.ts` barrel mapped to an `exports` subpath; changes follow semver + a changeset.

## 2. Privacy is by location, not by `index.ts` omission

A file under a public directory ships in the bundle and is reachable — leaving it out of `index.ts` does NOT make it private. Private code goes in `core/`.

**❌ Don't** — "private" file parked in a public dir, unexported:

```text
src/utils/signAurl.ts   // absent from utils/index.ts, but still public surface
```

**✅ Do** — private code in `core/`:

```text
src/core/signAurl.ts    // unreachable by consumers
```

## 3. Public exports are curated through the barrel

If something is public, put it in a public directory AND re-export it from that directory's `index.ts`.

**✅ Do:** `export * from "./getAccessToken";` in `utils/index.ts`.

**❌ Don't:** rely on a deep path (`@reltio/auth/utils/getAccessToken`) as the contract.

## 4. Minimize the public API

Every public export is a permanent contract. If a thing is only used inside the package, it belongs in `core/`.

**✅ Do:** expose the routing resolver as `createExpressAuth(config).resolveAuthPath` (no new surface, key stays internal).

**❌ Don't:** add a standalone `createOauthPathResolver` to `utils` "just in case".

## 5. Where new code goes

| Situation | Location | Re-export? | Changeset? |
|---|---|---|---|
| Internal helper | `core/` | no | no |
| Supported consumer helper | a public dir | yes | yes |
| New framework adapter | `src/<framework>/` (+ `exports` subpath) | yes | yes |
| New public type | `types/` | yes | yes |

When in doubt, start in `core/`. Promoting to public later is a non-breaking `minor`; demoting to `core/` is a breaking `major`.

## 6. Runtime constraint

Web Crypto (`globalThis.crypto.subtle`) and native `fetch` only — no `node:crypto`, `node-forge`, or `jose` — so the package runs on Node, Bun, Deno, and Edge.

## 7. Testing: only through the public API

Tests live in `tests/` and drive the package **only** through its public subpaths (`@reltio/auth/express`, `/next`, `/utils`, `/types`). `core/` is private and free to change — a core refactor must never break a test unless it breaks public behaviour.

**Never import `src/core/*` in a test.** If a test needs a `core` symbol, you are testing the wrong layer.

```ts
// ❌ pins a private internal — breaks on any core refactor
import { signAurl } from "../../src/core/aurlCookie";
const cookie = await signAurl(url, key);

// ✅ mint through the public callback round-trip; read via the public resolver
const cookie = await mintAurlCookie(app, TOKEN_WITH_AURL);
const { resolveAuthPath } = createExpressAuth(config);
```

**Cover every state an external actor can construct at the public boundary** — the boundary is the HTTP request (headers, cookies, query) **and** the upstream response. That explicitly includes negative/adversarial paths: tampered cookies, bomb tokens, malformed upstream `200` bodies, unreachable upstream. Reachability — not "positive vs negative" — is the test.

```ts
// ✅ adversarial upstream is part of the public boundary — test it
http.post(`${OAUTH}/oauth/checkToken`, () => new HttpResponse("<<not json>>", { status: 200 }));
expect(res.statusCode).toBe(500); // propagates, never a fake 200/401/502
```

**Do NOT test states the boundary cannot produce.** A branch reachable only by holding the signing key (forged HMAC), by violating a TS type, or only after a constant changes is defence-in-depth, not a public contract — leave it uncovered rather than reaching into `core` or asserting an impossible scenario.

```ts
// ❌ only reachable with the secret → not a public test, just delete the urge
// verifyAurl's non-UTF-8 branch, signAurl's .catch, shadowed size gates …
```

**Close every large change with `npm run test:coverage -w @reltio/auth`.** All tests must pass, and every reachable public scenario must be covered. For each remaining uncovered line, do one of two things — never leave it unexamined:

1. **Delete it** if it is dead code (no caller, an unused capability/overload).
2. **Document it as unreachable** with a one-line comment saying why the public boundary cannot reach it (defence-in-depth against forged HMAC, a TS-forbidden state, a constant-shadowed gate, …).

## Discovering the public surface

There is no hand-maintained list — **the file tree is the source of truth.** Everything under `src/` except `src/core/` is public; each public directory's `index.ts` is its curated surface. To see the whole current API:

```bash
ls -R packages/auth/src | grep -v -E '^.*core'   # or just read the index.ts barrels
```

No bare `@reltio/auth` and no `@reltio/auth/core` entry exist — both resolve to nothing by design.
