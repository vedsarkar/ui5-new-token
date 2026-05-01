## Context

The Data Pipelines Hub (DPH) surface in `openApi/management.json` is split across 12 separate Swagger tags — but they're all part of the same subsystem, just sliced by sub-feature for tagging convenience on the portal. Endpoint distribution:

| Tag | Endpoints |
|---|---:|
| DPH Workspace Management | 11 |
| DPH DLT Observability | 4 |
| DPH Monitoring | 4 |
| DPH Secrets Management | 4 |
| DPH Adapter Action | 2 |
| DPH Adapter Status | 1 |
| DPH Adapter Validation | 1 |
| DPH Fetch Adapter Script | 1 |
| DPH Fetch auth info | 1 |
| DPH Reindex Jobs | 1 |
| DPH Tenant Status | 1 |
| DPH Writeback Config | 1 |
| **Total** | **32** |

Path distribution:

- `/services/api/tenants/{tenantId}/...` — 28 endpoints (the bulk; adapter ops, workspace ops, monitoring, DLT, secrets, fetch info)
- `/services/reltio/api/{tenantId}/syncToDataPipeline` — 1 endpoint (Reindex Jobs; reuses the `/reltio/api` root)
- `/services/status/tenant/{tenantId}/details` — 1 endpoint (Tenant Status)
- `/services/config/{tenantId}/writeback` — 1 endpoint (Writeback Config)

Tagged 12 different ways but functionally one API. Manage-only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Data Pipelines` covering all 32 endpoints across the 12 DPH tags
- Server URL `https://{environment}.reltio.com` with `/services/` stripped from all paths (per user requirement)
- Per-story `urlControls` and realistic sample bodies for write methods
- Section comments grouping the page into 7 functional buckets so a reader can scan it quickly

**Non-Goals:**
- Splitting DPH into 12 separate pages — explicitly rejected per the user's "сгруппируй все эндпоинты DPH в одном stories файле" request
- Refreshing `management.json` from the portal — read-only input
- Unifying server URL roots — three of the 32 endpoints live at `/reltio/api/...`, `/status/...`, `/config/...` instead of `/api/tenants/...`. Trying to absorb a single common prefix would force two of them into "weird path" territory. Cleaner to keep server at `https://{environment}.reltio.com` and let each path declare its own root.

## Decisions

**1. Single stories file with 32 stories, 7 section comments.** Same approach as `add-data-load-job-api` (~40), `add-export-api` (23), `add-match-api` (28), `add-workflow-adapter-api` (48). The 7 functional sections:
   - **Adapters** (5): Action (2), Status (1), Validation (1), Fetch Script (1), Fetch Auth Info (1)
   - **Workspace** (11): all 11 Workspace Management endpoints
   - **DLT Pipelines** (4): all 4 DLT Observability endpoints
   - **Monitoring & Status** (5): Monitoring (4) + Tenant Status (1) — both report on the running pipelines
   - **Secrets** (4): all 4 Secrets Management endpoints (CRUD)
   - **Reindex** (1): Reindex Jobs
   - **Writeback** (1): Writeback Config

**2. Strip `/services/` prefix from all paths.** Server URL stays at `https://{environment}.reltio.com` (root). The 4 different sub-roots (`/api/...`, `/reltio/api/...`, `/status/...`, `/config/...`) remain visible in each path, which is honest about the underlying routing without forcing a fake unified prefix.

**3. Inclusion rule = any tag starting with `DPH `.** Catches all 12 sub-tags in one filter. If new DPH tags appear in `management.json` later, they'll automatically join this page on the next regeneration.

**4. Fix the `{{region}}` typo.** `management.json` declares one path as `/services/api/tenants/{tenantId}/adapters/{adapterName}/fabricResources/region/{{region}}`. The double braces are not valid OpenAPI path templating — almost certainly a copy-paste error in the upstream spec. Normalize to `{region}` so `urlControls` recognizes it as a placeholder.

**5. Schemas: minimal but typed.** Define a small set of shared types in `components.schemas`:
   - `AdapterAction` — `{ type, name, description }`
   - `AdapterStatus` — `{ adapterName, status, lastUpdated, message }`
   - `Secret` — `{ name, value? }` (value omitted on GET)
   - `Pipeline` — `{ pipelineId, name, status, lastEventTime }`
   - `PipelineEvent` — `{ timestamp, level, message, eventCode }`
   - `MonitoringEvent` — `{ timestamp, eventType, status, count, details }`
   - `WorkspaceConnectionString` — `{ connectionString, expiresAt }`
   - `Lakehouse` — `{ name, region, schema, tables: [string] }`
   - `Workspace` — `{ id, name, region, lakehouseId }`
   - `ShareLink` — `{ id, url, expiresAt, recipientEmail }`
   - `ReindexJobResponse` — `{ jobId, status, submittedAt }`
   - `TenantQueueDetails` — `{ queueLength, lastProcessedAt, throughput }`
   - `WritebackConfig` — `{ enabled, schedule, target }`

   Most write endpoints use a generic `{ ... }` body since the upstream spec doesn't ship typed schemas; we'll enrich post-hoc when they do.

**6. Sample bodies.** Realistic-looking adapter names (`databricks`, `fabric`), sample pipeline ids, sample secrets shapes. The `region` placeholder gets a default of `eastus` in the URL template via the server-variables mechanism (since `{region}` is path-only, it'll appear as a Storybook control).

## Risks / Trade-offs

- **32 stories on one page** → On par with prior precedents; section comments make it scannable.
- **Schemas are inferred** → Best-effort given the upstream spec is sparse on bodies. Stories rely only on `args.request`, so refreshing schemas later won't break them.
- **Mixed path roots stay visible** → Acceptable; honest about the underlying routing. If Reltio consolidates DPH endpoints under one root later, the spec can be regenerated to absorb the prefix.
- **Spec hygiene fix `{{region}}` → `{region}`** is a divergence from `management.json`. Documented in proposal.md so reviewers know to expect it.
