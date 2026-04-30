## Why

Next API docs group from the developer portal. Reference Data Management (RDM) covers tenant configuration for lookup types and canonical code generators.

## What Changes

- Create `openApi/ReferenceDataManagement/ReferenceDataManagement.spec.json` — 6 endpoints, 4 paths
- Create `openApi/ReferenceDataManagement/ReferenceDataManagement.stories.tsx` — 6 stories
- Generate docs via `npm run build-api-docs`
- Title: `API/Reference Data Management`

## Capabilities

### New Capabilities
- `reference-data-management-api`: Storybook API docs for RDM — tenant config GET/PUT, generators POST/GET/DELETE, generate next value (6 endpoints)

### Modified Capabilities

## Impact

- New directory: `openApi/ReferenceDataManagement/`. Additive only.
