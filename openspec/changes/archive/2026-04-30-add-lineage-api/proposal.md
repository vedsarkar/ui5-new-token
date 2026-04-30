## Why

The developer portal's Operate module exposes a "Lineage" group with three endpoints that read and delete the change history of an entity. The Storybook docs site has no page for them yet — developers integrating audit/compliance tooling have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/Lineage/Lineage.spec.json` — an OpenAPI 3.1 spec containing the three endpoints tagged `Lineage` in `openApi/operation.json`:
  - `GET /entities/{id}/_changes` — retrieve the history of the specified entity
  - `GET /entities/{id}/_changesWithTotal` — retrieve the history along with the total count of changes
  - `POST /entities/_deleteHistory` — delete the history of an entity
- Create `openApi/Lineage/Lineage.stories.tsx` — one Storybook story per endpoint with `urlControls`
- Generate `openApi/Lineage/Lineage.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Lineage`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `lineage-api`: Storybook API documentation for the Lineage API — read entity history (with or without total count) and delete entity history

### Modified Capabilities

## Impact

- New directory: `openApi/Lineage/`. Additive only.
- Adds 3 stories.
