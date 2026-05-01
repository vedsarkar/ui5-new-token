## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/DataPipelines/` directory and scaffold `DataPipelines.spec.json` (`info`, `servers` with `https://{environment}.reltio.com` (root), `components.schemas` with `AdapterAction`, `AdapterStatus`, `Secret`, `Pipeline`, `PipelineEvent`, `MonitoringEvent`, `Workspace`, `Lakehouse`, `ShareLink`, `ReindexJobResponse`, `TenantQueueDetails`, `WritebackConfig`)
- [x] 1.2 Add the 32 endpoints whose tag in `openApi/management.json` starts with `DPH ` (covers all 12 sub-tags), stripping the `/services/` prefix from every path so paths begin with `/api/`, `/reltio/api/`, `/status/`, or `/config/`. Normalize the `{{region}}` typo to `{region}` in the Fabric resources path.

## 2. Storybook Stories

- [x] 2.1 Create `openApi/DataPipelines/DataPipelines.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Data Pipelines`
- [x] 2.2 Export 32 stories with `...urlControls(url)` and realistic sample bodies for write methods. Add 7 section comments (`// --- Adapters ---`, `// --- Workspace ---`, `// --- DLT Pipelines ---`, `// --- Monitoring & Status ---`, `// --- Secrets ---`, `// --- Reindex ---`, `// --- Writeback ---`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `DataPipelines.story.mdx`, then `npm run format` and `npm run lint`
