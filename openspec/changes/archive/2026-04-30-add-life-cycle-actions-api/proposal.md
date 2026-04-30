## Why

Next API docs group from the developer portal. Life Cycle Actions (LCAs) allow tenants to register, execute, and manage custom actions triggered during entity lifecycle events.

## What Changes

- Create `openApi/LifeCycleActions/LifeCycleActions.spec.json` — 6 endpoints, 4 paths
- Create `openApi/LifeCycleActions/LifeCycleActions.stories.tsx` — 6 stories with `urlControls`
- Generate docs via `npm run build-api-docs`
- Title: `API/Life Cycle Actions`

## Capabilities

### New Capabilities
- `life-cycle-actions-api`: Storybook API docs for LCA group — list, register, get details, deregister, execute single, execute batch (6 endpoints)

### Modified Capabilities

## Impact

- New directory: `openApi/LifeCycleActions/` with 3 files. Additive only.
