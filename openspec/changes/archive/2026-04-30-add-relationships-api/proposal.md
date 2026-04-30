## Why

In the developer portal Swagger UI the Relationships API is split across two modules: **Ingest** (just one POST creation endpoint — `Save Relationships API creates relationships`) and **Operate** (the read/get-by-id/delete endpoints). Following the precedent set by `add-entities-api` and `add-interactions-api`, we want a single `API/Relationships` Storybook section that documents the complete CRUD lifecycle of relations between entities in one place.

## What Changes

- Create `openApi/Relationships/Relationships.spec.json` — a single OpenAPI 3.1 spec that merges all endpoints tagged `Relationships` from `openApi/operation.json` together with the one POST creation endpoint currently shown only in the portal's Ingest module (`POST /relations`)
- Create `openApi/Relationships/Relationships.stories.tsx` — one Storybook story per endpoint with `urlControls` for path placeholders
- Generate `openApi/Relationships/Relationships.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Relationships`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (matching the convention from `add-entities-api` / `add-interactions-api`)

## Capabilities

### New Capabilities
- `relationships-api`: Storybook API documentation for the unified Relationships API — relation creation (`POST /relations`), search/list (`GET /relations`), retrieval by id (`GET /relations/{id}`), and deletion (`DELETE /relations/{id}`)

### Modified Capabilities

## Impact

- New directory: `openApi/Relationships/`. Additive only — no existing files change.
- Adds 4 stories. One of them (`POST /relations`) documents an endpoint that is visible on the developer portal but absent from `openApi/operation.json` and `openApi/ingest.json`; its schema in `Relationships.spec.json` is authored from the portal screenshot and will need to be re-validated when the local specs are refreshed (same caveat as `add-entities-api` and `add-interactions-api`).
