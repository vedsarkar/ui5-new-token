## Why

The developer portal's Operate module exposes a "Saved Search" group with six endpoints used to manage per-user saved searches — list shared/all, list/create the current user's, find by criteria, update, and delete. The Storybook docs site has no page for them yet — developers building search-heavy UIs have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/SavedSearch/SavedSearch.spec.json` — an OpenAPI 3.1 spec containing the six endpoints tagged `Saved Search` in `openApi/operation.json`:
  - `GET /personal/allSavedSearches` — get shared saved searches for all users
  - `POST /personal/findSavedSearches` — find saved searches by filter/order/page parameters
  - `GET /personal/savedSearches` — get saved searches for the current user
  - `POST /personal/savedSearches` — create a saved search
  - `PUT /personal/savedSearches/{id}` — update a saved search
  - `DELETE /personal/savedSearches/{id}` — delete a saved search
- Create `openApi/SavedSearch/SavedSearch.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies for the writes
- Generate `openApi/SavedSearch/SavedSearch.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Saved Search`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `saved-search-api`: Storybook API documentation for the Saved Search API — list shared/own, find by criteria, create, update, delete

### Modified Capabilities

## Impact

- New directory: `openApi/SavedSearch/`. Additive only.
- Adds 6 stories.
