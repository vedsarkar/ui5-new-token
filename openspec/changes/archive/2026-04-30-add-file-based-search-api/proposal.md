## Why

The developer portal's Operate module exposes a "File Based Search" group with one endpoint that uploads a list of values to a private bucket so they can be used as the input to subsequent searches against entity attributes. The Storybook docs site has no page for it yet — developers integrating bulk search have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/FileBasedSearch/FileBasedSearch.spec.json` — an OpenAPI 3.1 spec containing the single endpoint tagged `File Based Search` in `openApi/operation.json`:
  - `POST /valueList` — uploads a file with a list of values to a private bucket
- Create `openApi/FileBasedSearch/FileBasedSearch.stories.tsx` — one Storybook story with `urlControls`
- Generate `openApi/FileBasedSearch/FileBasedSearch.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/File Based Search`
- Server URL: `https://{environment}.reltio.com/reltio/api`; path starts with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `file-based-search-api`: Storybook API documentation for the File Based Search API — upload a list of values to a private bucket for later use as a search input

### Modified Capabilities

## Impact

- New directory: `openApi/FileBasedSearch/`. Additive only.
- Adds 1 story.
