## Why

The developer portal's Operate module exposes a "Crosswalks" group with four POST/PUT endpoints used to add, update, and end-date crosswalks (the source-system contributions attached to entities and their relations). The Storybook docs site has no page for them yet — developers integrating source-system data have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/Crosswalks/Crosswalks.spec.json` — an OpenAPI 3.1 spec containing the four endpoints tagged `Crosswalks` in `openApi/operation.json`:
  - `POST /{objectType}/{objectId}/crosswalks` — adds crosswalks to an object
  - `PUT /{objectType}/{objectId}/crosswalks/{id}` — updates the value of a selected crosswalk
  - `PUT /{objectType}/{objectId}/crosswalks/{id}/{attribute}` — updates the value of a crosswalk date attribute
  - `POST /entities/{objectId}/crosswalks/{id}/_endDateAndMoveRelatedRelationXws` — sets a delete date and moves related relation crosswalks to a new contributor
- Create `openApi/Crosswalks/Crosswalks.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies
- Generate `openApi/Crosswalks/Crosswalks.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Crosswalks`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `crosswalks-api`: Storybook API documentation for the Crosswalks API — add, update, update-date-attribute, end-date-and-reattribute

### Modified Capabilities

## Impact

- New directory: `openApi/Crosswalks/`. Additive only.
- Adds 4 stories. All endpoints exist in `operation.json`.
- Three of the four endpoints take a generic `{objectType}` placeholder (`entities`, `relations`, etc.) — controls will let users fill that in directly.
