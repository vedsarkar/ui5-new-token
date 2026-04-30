## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/DataChangeRequests/` directory and scaffold `DataChangeRequests.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `ChangeRequest`, `ChangeItem`, `ChangeRequestList`)
- [x] 1.2 Add the 12 `Workflow`-tagged path/methods, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/DataChangeRequests/DataChangeRequests.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Data Change Requests`
- [x] 2.2 Export 12 stories with `...urlControls(url)` and sample bodies for the write methods. Add section comments (`// --- Search ---`, `// --- CRUD ---`, `// --- Lifecycle ---`, `// --- External Info ---`, `// --- Change Items ---`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `DataChangeRequests.story.mdx`, then `npm run format` and `npm run lint`
