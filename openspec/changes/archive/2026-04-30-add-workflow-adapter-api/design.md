## Context

The developer portal exposes TWO different APIs that both call themselves "Workflow":

1. **operation.json/Workflow** — 12 endpoints under `/services/reltio/api/{tenantId}/changeRequests/...` covering Data Change Requests (DCRs). Already documented as the existing `API/Workflow` page (the `add-workflow-api` change).
2. **management.json/Workflow** — 47 endpoints under `/services/workflow-adapter/workflow/...` covering BPMN-style workflow process management. NOT yet documented.

These two are unrelated systems that happen to share the "workflow" word. To keep the docs site clear we rename the existing page to its more accurate name (`Data Change Requests`) and ship the new BPMN page as `Workflow Adapter` (matching the URL root segment `/workflow-adapter/`).

The 47 management.json/Workflow endpoints split into eight logical groups:

- **Deployments** (3): deploy a workflow definition, get a deployment by id, sync Activiti comments to GBQ
- **Process Definitions** (4): list, get, delete, get history
- **Process Instances** (8): create, terminate (background bulk), search, get/terminate one, suspend, activate, create from search query
- **Tasks (top-level)** (10): retrieve by entity, update, retrieve by filter, validate, update with filter, list assignees, list creators, history, history variables, list variables
- **Tasks (by id)** (5): get, update, action, validate, history (by id)
- **Group Tasks** (2): retrieve, update
- **Jobs** (8): list, get one, sync data variants (3), terminate process instances, update tasks, actions
- **JAR Deployments** (4): list, get, delete, list-jars (RPC-style)
- **Operations & Counts** (3): operations, processCount, listJars

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Workflow Adapter` covering all 47 endpoints
- Server URL `https://{environment}.reltio.com/services/workflow-adapter/workflow` — long shared prefix absorbed
- Section comments grouping the page (Deployments / Process Definitions / Process Instances / Tasks / Group Tasks / Jobs / JAR Deployments / Operations)
- Rename the existing `API/Workflow` page to `API/Data Change Requests` so the two pages don't collide and each name accurately reflects its scope

**Non-Goals:**
- Documenting BPMN concepts in detail — out of scope
- Refreshing `management.json` from the portal

## Decisions

**1. Server URL absorbs the long shared prefix.** All 47 endpoints share `/services/workflow-adapter/workflow/...`. Setting `servers[0].url` to `https://{environment}.reltio.com/services/workflow-adapter/workflow` lets per-story paths read as `/{tenantId}/tasks`, `/deployments`, `/{tenantId}/processInstances`, etc. Same precedent as `Export` (`/services/jobs`) and `Databricks Share Management` (deeply-prefixed shared root).

**2. Inclusion rule = `Workflow` tag in management.json.** Distinct from operation.json's `Workflow` tag.

**3. Single stories file with 47 stories, grouped via 8 section comments.** Same approach as `add-data-load-job-api` (~40), `add-export-api` (23), `add-match-api` (28).

**4. Schemas: typed but minimal.**
   - `Deployment` — `{ id, tenantId, processDefinitionId, deploymentTime, jarName }`
   - `ProcessDefinition` — `{ id, key, name, version, tenantId, processType }`
   - `ProcessInstance` — `{ id, processDefinitionId, businessKey, status, startTime, endTime, variables }`
   - `Task` — `{ id, name, assignee, processInstanceId, dueDate, priority, status }`
   - `Job` — `{ id, status, type, executionTime, errorMessage }`
   - `JarDeployment` — `{ name, version, deployedAt }`
   - List variants for each.

**5. Sample bodies.** Realistic small bodies. Process instance start: `{ processDefinitionKey: "stewardship", businessKey: "entities/abc123", variables: { entityUri: "entities/abc123" } }`. Task action: `{ action: "complete", variables: {...} }`. Search filters use the typical `{ filter, sort, limit, offset }` shape.

**6. Renaming the existing Workflow → Data Change Requests is part of THIS change, not a separate openspec.** Reasoning: the rename is logically inseparable from introducing `API/Workflow Adapter` — without renaming, the two would have a sidebar collision. Doing both in one change keeps the openspec history coherent. The rename touches: `openApi/Workflow/` → `openApi/DataChangeRequests/` (3 files renamed), `info.title` and `meta.title` strings updated, MDX regenerated. No endpoint or schema changes.

## Risks / Trade-offs

- **47 stories on one page** → On par with `add-data-load-job-api` (~40); section comments make it scannable.
- **Two structural changes in one openspec** (the new page + the rename) → Bundled deliberately. Documented in proposal.md and design.md so reviewers know to expect both.
- **Schemas are minimal** → Acceptable; can be enriched without breaking stories.
- **Existing `add-workflow-api` change is not yet archived** → Its proposal/design/specs/tasks files still say "Workflow", which after this rename is misleading. We update those too as part of this change so the openspec history stays accurate.
