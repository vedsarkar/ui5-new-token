## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/DatabricksShareManagement/` directory and scaffold `DatabricksShareManagement.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share` and three server variables, `components.schemas` with `CatalogRequest`, `SchemaRequest`, `RecipientRequest`, `ShareRequest`, `GrantRequest`, `CompleteShareRequest`, `DatabricksOperationResult`)
- [x] 1.2 Add the 7 `Databricks Share Management`-tagged path/methods from `openApi/management.json`, with the long shared prefix absorbed into the server URL so paths shrink to single segments (`/catalog`, `/catalog-schema`, `/complete-share`, `/grant`, `/recipient`, `/schema`, `/share`)

## 2. Storybook Stories

- [x] 2.1 Create `openApi/DatabricksShareManagement/DatabricksShareManagement.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Databricks Share Management`
- [x] 2.2 Export 7 stories with `...urlControls(url)` exposing `environment` + `tenantId` + `adapterName`, and realistic Unity Catalog sample bodies per endpoint (catalog/schema/recipient/share/grant references)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `DatabricksShareManagement.story.mdx`, then `npm run format` and `npm run lint`
