## Why

In the developer portal Swagger UI the Interactions API is split across two modules: **Ingest** (just two POST creation endpoints — `POST /interactions` "Creates a collection of interactions" and `POST /rawInteractions` "Creates a raw collection of interactions") and **Operate** (search, get-by-id, get-by-group-key, totals, batch and single delete, plus the entity-scoped read `GET /entities/{id}/_interactions`). Developers have to flip between two pages to see the full lifecycle. Following the precedent set by `add-entities-api`, we want a single `API/Interactions` Storybook section that documents the complete CRUD lifecycle in one place.

## What Changes

- Create `openApi/Interactions/Interactions.spec.json` — a single OpenAPI 3.1 spec that merges all endpoints tagged `Interactions` from `openApi/operation.json` together with the two POST creation endpoints currently shown only in the portal's Ingest module (`POST /interactions`, `POST /rawInteractions`)
- Create `openApi/Interactions/Interactions.stories.tsx` — one Storybook story per endpoint with `urlControls` for path placeholders
- Generate `openApi/Interactions/Interactions.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Interactions`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (matching the convention adopted in `add-entities-api`)
- Normalize the `DELETE /interactions/**` path matcher in `operation.json` to `DELETE /interactions/{id}` (which is how the portal documents it)

## Capabilities

### New Capabilities
- `interactions-api`: Storybook API documentation for the unified Interactions API — interaction creation (collection + raw), retrieval (by id, raw by id, by entity), search and counts (`GET /interactions`, `_byGroupKey`, `_total`), and deletion (single by id, batch by URIs)

### Modified Capabilities

## Impact

- New directory: `openApi/Interactions/`. Additive only — no existing files change.
- Adds ~10 stories. Two of them (`POST /interactions`, `POST /rawInteractions`) document endpoints that are visible on the developer portal but absent from `operation.json` and `ingest.json`; their schemas in `Interactions.spec.json` are authored from the portal screenshot and will need to be re-validated when the local specs are refreshed.
