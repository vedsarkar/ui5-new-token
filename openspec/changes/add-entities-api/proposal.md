## Why

In the developer portal Swagger UI the Entities API is split across two modules: **Ingest** (just two POST creation endpoints — `Save Entities` and the `_conditional` "Search Before Create" aggregate) and **Operate** (the full read/search/update/delete/clone/cleanse/scan surface). Developers have to jump between two pages to understand the lifecycle of an entity. In our Storybook we want a single `API/Entities` section that documents the complete CRUD lifecycle in one place.

## What Changes

- Create `openApi/Entities/Entities.spec.json` — a single OpenAPI 3.1 spec that merges all endpoints tagged `Entities` from `openApi/operation.json` together with the two POST creation endpoints currently shown only in the portal's Ingest module (`POST /entities`, `POST /entities/_conditional`)
- Create `openApi/Entities/Entities.stories.tsx` — one Storybook story per endpoint with `urlControls` for path placeholders
- Generate `openApi/Entities/Entities.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Entities`
- Base URL: `https://{environment}.reltio.com/reltio/api/{tenantId}/...`
- Out of scope (kept as separate Storybook sections in future proposals): endpoints that live under `/entities/...` but are tagged with other categories — `Match`, `Lineage`, `Merge & Unmerge`, `Crosswalks`, `Graph`, `Interactions`, `Common Assets`, `Attribute Verification`, `Segments`, `Export`. They will get their own `API/<Group>` sections.

## Capabilities

### New Capabilities
- `entities-api`: Storybook API documentation for the unified Entities API — entity creation (Save / Search Before Create), retrieval (single, by URI, by crosswalk, by ReltioID, by URIs, raw, with survivorship rules), search and counts (`_total`, `_segmentation`, `v2/_scan`, `v2/_total`, `_events/_total`), update, clone, hops, cleanse / batchcleanse / recleanse, reverse geocoding, deletion (`DELETE`, `_delete`), and segment-bound entity reads (`/segments/{id}/entities`)

### Modified Capabilities

## Impact

- New directory: `openApi/Entities/`. Additive only — no existing files change.
- Adds ~30 stories. Two of them (`POST /entities`, `POST /entities/_conditional`) document endpoints that are visible on the developer portal but absent from the local `operation.json`/`ingest.json` snapshots; their schemas in `Entities.spec.json` are authored from the portal screenshot and will need to be re-validated when the local specs are refreshed.
