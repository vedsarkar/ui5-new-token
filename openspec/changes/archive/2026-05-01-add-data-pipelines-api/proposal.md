## Why

The developer portal's Manage module exposes a Data Pipelines Hub (DPH) surface split across **12 separate Swagger tags** (`DPH Adapter Action`, `DPH Adapter Status`, `DPH Adapter Validation`, `DPH DLT Observability`, `DPH Fetch Adapter Script`, `DPH Fetch auth info`, `DPH Monitoring`, `DPH Reindex Jobs`, `DPH Secrets Management`, `DPH Tenant Status`, `DPH Workspace Management`, `DPH Writeback Config`) — 32 endpoints in total. Documenting each as its own Storybook page would create 12 tiny pages, half of them with only 1 endpoint, breaking the "one section per coherent API" feel of the docs site. The user wants **one** unified `API/Data Pipelines` page that mirrors how DPH actually behaves: a single integrated subsystem.

## What Changes

- Create `openApi/DataPipelines/DataPipelines.spec.json` — an OpenAPI 3.1 spec containing the 32 endpoints across all 12 `DPH *` tags from `openApi/management.json`
- Create `openApi/DataPipelines/DataPipelines.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies, organized into 7 logical sections via `// --- ... ---` comments (Adapters / Workspace / DLT Pipelines / Monitoring & Status / Secrets / Reindex / Writeback)
- Generate `openApi/DataPipelines/DataPipelines.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Data Pipelines`
- Server URL: `https://{environment}.reltio.com` — paths preserve their varied roots (`/api/tenants/...`, `/reltio/api/...`, `/status/...`, `/config/...`) but the `/services/` segment is stripped per the requirement
- Fix one path typo from `management.json`: `{{region}}` → `{region}` (double braces are not valid OpenAPI path templating)

## Capabilities

### New Capabilities
- `data-pipelines-api`: Storybook API documentation for the unified Data Pipelines Hub API — adapter operations, workspace management (Lakehouse / Fabric / shortcuts / share links), DLT pipeline observability (start/stop/events), monitoring (event status / failed events / aggregated counts), secrets CRUD, reindex jobs, tenant queue status, and writeback config

### Modified Capabilities

## Impact

- New directory: `openApi/DataPipelines/`. Additive only.
- Adds 32 stories — second only to Workflow Adapter (48) and Match (28) on the Manage side.
- Server URL stays at `https://{environment}.reltio.com` because the 32 endpoints span 4 different roots: `/api/tenants/{tenantId}/...` (28 endpoints), `/reltio/api/{tenantId}/...` (1), `/status/tenant/{tenantId}/...` (1), `/config/{tenantId}/...` (1). The `/services/` segment is stripped from all of them per the user's request. Documented in design.md.
- One spec hygiene fix: `{{region}}` → `{region}` in the Fabric resources path.
