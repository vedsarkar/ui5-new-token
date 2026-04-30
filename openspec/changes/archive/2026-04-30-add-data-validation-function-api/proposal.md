## Why

Next step in API docs reorganization matching the developer portal. The Data Validation Function group covers CRUD on validation functions that enforce data quality rules at the tenant, entity type, and relation type level.

## What Changes

- Create `openApi/DataValidationFunction/DataValidationFunction.spec.json` — 7 endpoints, 3 paths
- Create `openApi/DataValidationFunction/DataValidationFunction.stories.tsx` — 7 stories with `urlControls`
- Run `npm run build-api-docs` to generate the MDX docs page
- Title: `API/Data Validation Function`

## Capabilities

### New Capabilities
- `data-validation-function-api`: Storybook API docs for Data Validation Function group — tenant functions, per-function CRUD, per-object-type CRUD (7 endpoints)

### Modified Capabilities

## Impact

- New directory: `openApi/DataValidationFunction/` with 3 files
- Additive only, follows established pattern
