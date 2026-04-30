## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/FileBasedSearch/` directory and scaffold `FileBasedSearch.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `ValueListUploadResponse`)
- [x] 1.2 Add `POST /{tenantId}/valueList`

## 2. Storybook Stories

- [x] 2.1 Create `openApi/FileBasedSearch/FileBasedSearch.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/File Based Search`
- [x] 2.2 Export 1 story with `...urlControls(url)` and a sample `{ values: [...] }` body

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `FileBasedSearch.story.mdx`, then `npm run format` and `npm run lint`
