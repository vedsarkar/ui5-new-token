## Why

The developer portal's Operate module exposes a "Merge & Unmerge" group with two POST endpoints used to manually merge two entities together (`_sameAs`) and to manually unmerge a part of a previously-merged entity (`_unmerge`). These are core entity-resolution operations and the Storybook docs site has no page for them yet. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/MergeAndUnmerge/MergeAndUnmerge.spec.json` — an OpenAPI 3.1 spec containing the two endpoints tagged `Merge & Unmerge` in `openApi/operation.json`:
  - `POST /entities/{id}/_sameAs` — manually merge two entities
  - `POST /entities/{id}/_unmerge` — unmerge a part of an entity
- Create `openApi/MergeAndUnmerge/MergeAndUnmerge.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies
- Generate `openApi/MergeAndUnmerge/MergeAndUnmerge.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Merge & Unmerge`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `merge-and-unmerge-api`: Storybook API documentation for the Merge & Unmerge API — manual merge of two entities and unmerge of part of a merged entity

### Modified Capabilities

## Impact

- New directory: `openApi/MergeAndUnmerge/`. Additive only.
- Adds 2 stories.
