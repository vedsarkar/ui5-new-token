## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Graph/` directory and scaffold `Graph.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `ConnectionsResponse`)
- [x] 1.2 Add `POST /{tenantId}/entities/{id}/_connections`

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Graph/Graph.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Graph`
- [x] 2.2 Export 1 story with `...urlControls(url)` and a sample body (`relationTypes`, `direction`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Graph.story.mdx`, then `npm run format` and `npm run lint`
