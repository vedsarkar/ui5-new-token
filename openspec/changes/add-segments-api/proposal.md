## Why

In the developer portal Swagger UI the Segments API is split across two modules: **Ingest** (just one POST creation endpoint — `Creates a collection of segments in a tenant`) and **Operate** (search/list, get-by-id, delete, enable/disable, plus the entity-scoped read `GET /entities/{id}/segments`). Following the precedent set by `add-entities-api`, `add-interactions-api`, and `add-relationships-api`, we want a single `API/Segments` Storybook section that documents the full segment lifecycle in one place.

## What Changes

- Create `openApi/Segments/Segments.spec.json` — a single OpenAPI 3.1 spec that merges all endpoints tagged `Segments` from `openApi/operation.json` together with the one POST creation endpoint currently shown only in the portal's Ingest module (`POST /segments`)
- Create `openApi/Segments/Segments.stories.tsx` — one Storybook story per endpoint with `urlControls` for path placeholders
- Generate `openApi/Segments/Segments.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Segments`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (matching the convention from `add-entities-api` / `add-interactions-api` / `add-relationships-api`)

## Capabilities

### New Capabilities
- `segments-api`: Storybook API documentation for the unified Segments API — segment creation (`POST /segments`), search/list (`GET /segments`), retrieval by id (`GET /segments/{id}`), deletion (`DELETE /segments/{id}`), enable/disable (`PUT /segments/{id}/enable`, `PUT /segments/{id}/disable`), and the entity-scoped read (`GET /entities/{id}/segments`)

### Modified Capabilities

## Impact

- New directory: `openApi/Segments/`. Additive only — no existing files change.
- Adds 7 stories. One of them (`POST /segments`) documents an endpoint that is visible on the developer portal but absent from `openApi/operation.json` and `openApi/ingest.json`; its schema in `Segments.spec.json` is authored from the portal screenshot and will need to be re-validated when the local specs are refreshed (same caveat as the portal-only POST creators in earlier proposals).
- The three `/segments/{id}/entities*` reads stay in `API/Entities` (they carry the `Entities` tag, not `Segments`). Recorded in design.md so the decision is explicit.
