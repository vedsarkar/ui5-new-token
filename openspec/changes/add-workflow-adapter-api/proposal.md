## Why

The developer portal's Manage module exposes a "Workflow" group with 47 endpoints under `/services/workflow-adapter/workflow/...` covering workflow process deployment, process instances (start/suspend/activate/terminate/search), tasks (CRUD, history, validation, group tasks, action handlers), JAR deployments, jobs, and process definitions. This is the BPMN-style workflow engine that powers stewardship/approval automation in Reltio.

Crucially, this is a **completely different API** from the existing `API/Workflow` page (which documents Data Change Requests under `/changeRequests/...` from `operation.json`). To avoid sidebar collision, this proposal both:
1. Adds the new `API/Workflow Adapter` page for the 47 management.json endpoints
2. Renames the existing `API/Workflow` page to `API/Data Change Requests` (more accurate name reflecting its actual scope)

## What Changes

- **NEW** Create `openApi/WorkflowAdapter/WorkflowAdapter.spec.json` — an OpenAPI 3.1 spec containing the 47 endpoints tagged `Workflow` in `openApi/management.json`
- **NEW** Create `openApi/WorkflowAdapter/WorkflowAdapter.stories.tsx` — one Storybook story per endpoint with `urlControls`, sample bodies for write methods, and section comments grouping the page
- **NEW** Generate `openApi/WorkflowAdapter/WorkflowAdapter.story.mdx` via `npm run build-api-docs`
- **NEW** Sidebar title: `API/Workflow Adapter`
- **NEW** Server URL: `https://{environment}.reltio.com/services/workflow-adapter/workflow` — long shared prefix absorbed
- **RENAME** Existing `openApi/Workflow/` → `openApi/DataChangeRequests/` (folder + 3 files renamed); inside the spec change `info.title` "Workflow API" → "Data Change Requests API"; inside the stories file change `meta.title` `"API/Workflow"` → `"API/Data Change Requests"`; regenerate the MDX

## Capabilities

### New Capabilities
- `workflow-adapter-api`: Storybook API documentation for the Workflow Adapter API — BPMN-style workflow engine with deployments, process instances, tasks (CRUD + history + validation + actions), jobs, JAR deployments, and process definitions

### Modified Capabilities
- `workflow-api`: rename to better reflect its actual scope. The existing 12 Data Change Request endpoints stay exactly the same — only the user-facing names (sidebar title, spec title) and the OpenAPI directory name change. The new sidebar entry will be `API/Data Change Requests`. (Note: per OpenSpec conventions this is a name-only change to the existing capability; no requirement-level behaviour changes.)

## Impact

- New directory: `openApi/WorkflowAdapter/`. Adds 47 stories — the largest Manage-side API page so far.
- Renamed directory: `openApi/Workflow/` → `openApi/DataChangeRequests/`. The 12 existing stories keep working — only their titles change.
- Server URL absorbs `/services/workflow-adapter/workflow` so per-story paths stay readable.
- The renamed Workflow page (now `Data Change Requests`) doesn't change any endpoints or schemas — purely a naming refactor.
