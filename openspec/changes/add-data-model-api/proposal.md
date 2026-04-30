## Why

Third step in reorganizing API docs to match the Reltio Developer Portal. The Data Model group covers tenant configuration CRUD, entity/relation types, sources, cleanse configuration, and matching tools — the core data model management surface.

## What Changes

- Create `openApi/DataModel/DataModel.spec.json` with OpenAPI 3.1 spec containing 12 endpoints across 11 paths
- Create `openApi/DataModel/DataModel.stories.tsx` with one story per endpoint using `urlControls`
- Run `npm run build-api-docs` to generate `openApi/DataModel/DataModel.story.mdx`
- Title: `API/Data Model` (flat, matching the portal)

## Capabilities

### New Capabilities
- `data-model-api`: Storybook API documentation for the Data Model group — configuration CRUD, entity types, relation types, sources, cleanse, matching tools (12 endpoints)

### Modified Capabilities

## Impact

- New directory: `openApi/DataModel/` with 3 files (spec, stories, auto-generated mdx)
- Additive only, follows established pattern from ClientManagement/CustomerManagement
