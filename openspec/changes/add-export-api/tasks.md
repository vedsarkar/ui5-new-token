## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Export/` directory and scaffold `Export.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/services/jobs`, `components.schemas` with `ExportJobRequest` and `ExportTask`)
- [x] 1.2 Add the 6 submitter endpoints under `/export/{tenantId}/...` with `ExportJobRequest` request bodies and `ExportTask` 200 responses
- [x] 1.3 Add the 9 global task management endpoints under `/tasks/...` (list, total, history, history total, get, manifest, pause, resume, stop)
- [x] 1.4 Add the 8 tenant-scoped task management endpoints under `/{tenantId}/tasks/...` (list, total, history, history total, get, pause, resume, stop)

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Export/Export.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Export`
- [x] 2.2 Export 23 stories with `...urlControls(url)`, sample `ExportJobRequest` bodies for submitters, and no body for pause/resume/stop. Add section comments (`// --- Submitters ---`, `// --- Global Tasks ---`, `// --- Tenant Tasks ---`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Export.story.mdx`, then `npm run format` and `npm run lint`
