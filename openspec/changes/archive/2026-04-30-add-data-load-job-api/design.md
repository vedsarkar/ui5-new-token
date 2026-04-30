## Context

~40 endpoints under `/dataloader/api/{tenantId}/...` organized into sub-groups: mappings, custom buckets, projects, data sources, jobs, job control, storage. All share `{tenantId}`. Additional path params: `{mappingId}`, `{id}`, `{projectId}`, `{jobId}`, `{sourceId}`, `{accountId}`, `{directory}`.

Some endpoints visible on the portal (customBuckets, _pause, _priority, _resume, _facets, job source download) are not in the local `ingest.json` spec — they're documented from the portal screenshot.

## Goals / Non-Goals

**Goals:**
- Match portal's Data Load Job group from the Ingest module
- Server URL: `https://{environment}.reltio.com`
- Paths start with `/dataloader/api/{tenantId}/...`

**Non-Goals:**
- Full request/response schemas — use simplified objects for this large group

## Decisions

**1. Schemas**: Minimal — include key types (`Mapping`, `JobDefinition`, `Job`, `DataSource`, `StorageAccount`) with top-level fields only.

**2. Endpoint grouping**: All under one stories file despite the large count. Portal groups them as one section.

**3. Missing from local spec**: Include endpoints from portal screenshot that aren't in `ingest.json` (customBuckets, _pause, _priority, _resume, _facets, source download).
