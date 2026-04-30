## Why

Data Load Job is the largest API group in the Ingest module on the developer portal. It covers mappings, custom buckets, job definitions (projects), data sources, job lifecycle (create, run, pause, resume, stop, delete), error/source file downloads, and storage account management.

## What Changes

- Create `openApi/DataLoadJob/DataLoadJob.spec.json` — ~40 endpoints from the portal's Data Load Job group
- Create `openApi/DataLoadJob/DataLoadJob.stories.tsx` — one story per endpoint with `urlControls`
- Generate docs. Title: `API/Data Load Job`
- Base URL: `https://{environment}.reltio.com/dataloader/api/{tenantId}/...`

## Capabilities

### New Capabilities
- `data-load-job-api`: Storybook API docs for Data Load Job — mappings, custom buckets, projects, data sources, jobs, job control, storage accounts, file upload/download (~40 endpoints)

### Modified Capabilities

## Impact

- New directory: `openApi/DataLoadJob/`. Additive only. Largest single API group.
