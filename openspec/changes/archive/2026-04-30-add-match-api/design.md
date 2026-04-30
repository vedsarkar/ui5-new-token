## Context

The developer portal's Operate module exposes "Match" — 28 endpoints spread across two URL roots:

- 19 endpoints under `/services/reltio/api/{tenantId}/...` — the entity-scoped match operations
- 9 endpoints under `/services/reltio/tools/matching/...` — low-level matching tools (comparator classes, token classes, comparison/explanation utilities). These are global (no `{tenantId}`) and live at a different root entirely

All 28 carry the `Match` tag in `openApi/operation.json`. Operate-only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Match` covering all 28 endpoints across both URL roots
- Per-story `urlControls` and realistic sample bodies for write methods
- Section comments grouping the page into Search & Explain / Mark Match-NotMatch / Tokens & Documents / Matching Tools

**Non-Goals:**
- Splitting Match across two pages (e.g. one for entity-scoped, one for tools) — the portal groups them as one section, mirroring is the right move
- Refreshing `operation.json` from the portal

## Decisions

**1. Server URL stays at the root.** Because the API spans `/services/reltio/api/...` AND `/services/reltio/tools/matching/...`, no single sub-prefix can be absorbed into the server URL. `servers[0].url` is `https://{environment}.reltio.com` and the paths keep their full prefixes. Trade-off acknowledged: paths in this spec read longer than in the prior Operate APIs (Entities/Interactions/etc. that had `/services/reltio/api` stripped).

**2. Single stories file with 28 stories, grouped via section comments.** Same approach as `add-data-load-job-api` and `add-export-api`.

**3. Inclusion rule = "Match" tag.**

**4. Schemas: minimal but useful.**
   - `MatchResult` — `{ uri, score, matchedAttributes: [string] }`
   - `MatchTokens` — `{ tokens: [{ class, value }] }`
   - `MatchExplanation` — generic object describing why a pair matched/didn't
   - `ComparatorClass` — `{ name, description }` (for the tools endpoints)

**5. Sample bodies.** Use entity URIs that look real (`entities/abc123`, `entities/def456`) so the curl preview is meaningful. For tools endpoints (compare, etc.), provide a small comparator-name + value pair.

**6. Mark/unmark stories use the same path with different methods.** `_setAMatch` and `_notMatch` each have GET/POST/DELETE variants. We export 3 separate stories per endpoint family — they appear as siblings in the page.

## Risks / Trade-offs

- **28 stories on one page** → Manageable per `add-data-load-job-api` (~40), `add-entities-api` (27), `add-export-api` (23) precedent.
- **Two URL roots** → Visible in path strings; section comments make the split obvious.
- **Tools endpoints have no `{tenantId}`** → Their `urlControls` will not include `tenantId`. Stories will document each accordingly.
