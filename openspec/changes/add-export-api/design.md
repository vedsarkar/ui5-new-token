## Context

The developer portal's Operate module exposes "Export" — 23 endpoints rooted at `/services/jobs/...` (NOT `/services/reltio/api/...`). They split into three logical groups:

- **Submitters** under `/services/jobs/export/{tenantId}/...` (6 endpoints) — POST endpoints that submit an async export job for activities, entities (and variants: `_crosswalksTree`, `segments`), hierarchies, or relations.
- **Global task management** under `/services/jobs/tasks/...` (9 endpoints) — list active tasks across all tenants, totals, history (and totals), get a task by id, get its manifest, and lifecycle controls (pause/resume/stop).
- **Tenant-scoped task management** under `/services/jobs/{tenantId}/tasks/...` (8 endpoints) — same shape as global except scoped to a single tenant; no manifest endpoint at this level.

All 23 carry the `Export` tag in `openApi/operation.json`. Operate-only — no Ingest-module counterpart.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Export` covering all 23 endpoints
- Server URL `https://{environment}.reltio.com/services/jobs` — paths shrink to `/export/{tenantId}/...`, `/tasks/...`, `/{tenantId}/tasks/...`
- Per-story `urlControls` so each story shows only the placeholders it uses (`tenantId`, `taskId`, etc.)
- Realistic sample bodies for the submitters (filter expressions, target format)

**Non-Goals:**
- Documenting the export job result schema (output file format) in detail — provider-side concern
- Refreshing `operation.json` from the portal

## Decisions

**1. Single stories file with 23 stories, grouped via section comments.** Section comments (`// --- Submitters ---`, `// --- Global Tasks ---`, `// --- Tenant Tasks ---`) so the file stays scannable. Same approach as `add-data-load-job-api`.

**2. Server URL = `https://{environment}.reltio.com/services/jobs`.** The Export subsystem really does live at `/services/jobs/...`, not `/reltio/api/...`. Setting the server URL to absorb the `/services/jobs` prefix lets the paths read naturally as `/export/{tenantId}/entities`, `/tasks/{taskId}`, `/{tenantId}/tasks/{taskId}/_pause`, etc. Precedent: `ClientManagement.spec.json` already sets a per-subsystem server URL (`/oauth`).

**3. Path layout keeps the three logical groups visible:**
   - `/export/{tenantId}/activities`, `/export/{tenantId}/entities`, etc. (submitters)
   - `/tasks`, `/tasks/{taskId}`, etc. (global)
   - `/{tenantId}/tasks`, `/{tenantId}/tasks/{taskId}`, etc. (tenant-scoped)

**4. Inclusion rule = "Export" tag.**

**5. Schemas: minimal `ExportJobRequest` and `ExportTask`.**
   - `ExportJobRequest`: `format` (`CSV` / `JSON` / `XLSX`), `filter` (string filter expression), `select` (optional array of fields), `notifyEmail` (optional). Used as the request body for the submitter endpoints.
   - `ExportTask`: `id`, `tenantId`, `type` (e.g. `entities`, `relations`), `status` (`SUBMITTED` / `RUNNING` / `PAUSED` / `STOPPED` / `COMPLETED` / `FAILED`), `submittedAt`, `completedAt`, `progress` (0-100). Used in `200` responses for task management endpoints.

**6. Sample bodies for submitters.** A realistic small request: `{ format: "CSV", filter: "equals(type,'configuration/entityTypes/Individual')" }`. Not every submitter takes a body in the same shape (segments-based export references a `segmentId`), but the minimal `format`+`filter` covers the common case.

**7. Pause/resume/stop PUTs have no body.** Same approach as Segments enable/disable.

## Risks / Trade-offs

- **23 stories in one file** → Manageable per the `add-data-load-job-api` precedent (~40). Section comments keep it scannable.
- **Server URL diverges from the `/reltio/api` convention** → Acceptable: the API really is hosted at a different root. Documented prominently.
- **Submitter request body schemas vary** → We use one minimal shared schema. If/when the portal publishes per-submitter bodies, they can be enriched without breaking stories.
