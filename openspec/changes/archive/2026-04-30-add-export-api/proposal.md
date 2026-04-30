## Why

The developer portal's Operate module exposes an "Export" group with 23 endpoints — submitters that kick off async export jobs (entities, relations, activities, hierarchies, segments, crosswalk-trees) plus task lifecycle management (list/get/manifest, pause/resume/stop, totals, history) at both the global and tenant-scoped level. The Storybook docs site has no page for them yet — developers integrating data exports have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/Export/Export.spec.json` — an OpenAPI 3.1 spec containing the 23 endpoints tagged `Export` in `openApi/operation.json`, organized into three logical groups:
  - **Submitters** under `/export/{tenantId}/...` — `activities`, `entities`, `entities/_crosswalksTree`, `entities/segments`, `hierarchies`, `relations`
  - **Global task management** under `/tasks/...` — list, total, history, history total, get, manifest, pause, resume, stop
  - **Tenant-scoped task management** under `/{tenantId}/tasks/...` — list, total, history, history total, get, pause, resume, stop
- Create `openApi/Export/Export.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies for the submitters
- Generate `openApi/Export/Export.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Export`
- Server URL: `https://{environment}.reltio.com/services/jobs` — the export subsystem lives at `/services/jobs/...`, NOT `/services/reltio/api/...`, so the server URL differs from every previously-documented Operate API

## Capabilities

### New Capabilities
- `export-api`: Storybook API documentation for the unified Export API — submitters for activities/entities/relations/hierarchies/segments/crosswalk-trees, plus global and tenant-scoped task lifecycle management

### Modified Capabilities

## Impact

- New directory: `openApi/Export/`. Additive only.
- Adds 23 stories — the largest single Operate-side API page so far.
- Server URL is `https://{environment}.reltio.com/services/jobs` — differs from the `/reltio/api` convention used by every other Operate API. Documented in design.md; consistent with the prior decision to let server URLs vary by subsystem (e.g. ClientManagement uses `/oauth`).
