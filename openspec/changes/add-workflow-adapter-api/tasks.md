## 1. Rename existing Workflow to Data Change Requests (already done)

- [x] 1.1 Rename `openApi/Workflow/` directory to `openApi/DataChangeRequests/` — already done out-of-band; folder + 3 files in place
- [x] 1.2 Rename the three files inside: `Workflow.spec.json` → `DataChangeRequests.spec.json`, `Workflow.stories.tsx` → `DataChangeRequests.stories.tsx`, `Workflow.story.mdx` → `DataChangeRequests.story.mdx`
- [x] 1.3 Update the renamed spec: `info.title` is `"Data Change Requests API"`
- [x] 1.4 Update the renamed stories file: imports from `./DataChangeRequests.spec.json`, `meta.title` is `"API/Data Change Requests"`
- [x] 1.5 The original `add-workflow-api` change has been renamed to `add-data-change-requests-api` (capability `data-change-requests-api`); no further history cleanup needed

## 2. New Workflow Adapter spec

- [x] 2.1 Create `openApi/WorkflowAdapter/` directory and scaffold `WorkflowAdapter.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/services/workflow-adapter/workflow`, `components.schemas` with `Deployment`, `ProcessDefinition`, `ProcessInstance`, `Task`, `Job`, `JarDeployment` and list variants)
- [x] 2.2 Add the 47 `Workflow`-tagged path/methods from `openApi/management.json`, with the long shared prefix absorbed into the server URL so paths shrink to `/{tenantId}/...`, `/deployments`, etc.

## 3. New Workflow Adapter stories

- [x] 3.1 Create `openApi/WorkflowAdapter/WorkflowAdapter.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Workflow Adapter`
- [x] 3.2 Export 47 stories with `...urlControls(url)` and realistic sample bodies for write methods. Add 8 section comments grouping the page (Deployments / Process Definitions / Process Instances / Tasks / Group Tasks / Jobs / JAR Deployments / Operations)

## 4. Docs Generation

- [x] 4.1 Run `npm run build-api-docs` to generate both `WorkflowAdapter.story.mdx` AND the renamed `DataChangeRequests.story.mdx` (and ensure the old `Workflow.story.mdx` is removed by the rename), then `npm run format` and `npm run lint`
