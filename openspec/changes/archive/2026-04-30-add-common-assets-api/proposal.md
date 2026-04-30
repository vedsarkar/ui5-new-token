## Why

The developer portal's Operate module exposes a "Common Assets" group with six endpoints used to mark, query, and synchronize assets that are shared across multiple entities ("common" assets, in Reltio terminology). The Storybook docs site has no page for them yet — developers integrating asset-sharing have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/CommonAssets/CommonAssets.spec.json` — an OpenAPI 3.1 spec containing the six endpoints tagged `Common Assets` in `openApi/operation.json`:
  - `POST /assets/_get` — check whether a provided asset is a common asset
  - `POST /assets/_total` — total count of common assets
  - `PUT /assets/status` — mark or unmark an asset as common
  - `POST /assets/status/check` — check the common-asset status of a provided asset
  - `PUT /assets/synchronize` — synchronize a specific asset between MATCH_ASSETS and COMMON_ASSETS
  - `GET /entities/{id}/assets` — get common assets for an entity
- Create `openApi/CommonAssets/CommonAssets.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies
- Generate `openApi/CommonAssets/CommonAssets.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Common Assets`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `common-assets-api`: Storybook API documentation for the Common Assets API — query (get/total/check), mutate (status/synchronize), and entity-scoped read

### Modified Capabilities

## Impact

- New directory: `openApi/CommonAssets/`. Additive only.
- Adds 6 stories. All endpoints exist in `operation.json`, no portal-only authoring required.
