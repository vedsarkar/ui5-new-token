## 1. OpenAPI Spec

- [x] 1.1 Add a `Lookup` schema to `components.schemas` in `openApi/ReferenceDataManagement/ReferenceDataManagement.spec.json` (`code`, `value`, `description`, `source`, `parent`)
- [x] 1.2 Add the three lookup write endpoints (`POST /lookups/{tenantId}`, `POST /lookups/{tenantId}/{type}`, `PUT /lookups/{tenantId}/{type}/{code}`) with proper path parameters and request body schemas
- [x] 1.3 Add the two unmapped-value write endpoints (`POST /unmapped/{tenantId}`, `POST /unmapped/{tenantId}/{type}`) with array-of-strings request bodies

## 2. Storybook Stories

- [x] 2.1 Add five new exported stories to `openApi/ReferenceDataManagement/ReferenceDataManagement.stories.tsx` — one per new endpoint — using `...urlControls(url)` and a small sample `args.request.body`
- [x] 2.2 Add light section comments (`// --- Lookups ---`, `// --- Unmapped Values ---`) so the file stays scannable at 11 stories

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to regenerate `ReferenceDataManagement.story.mdx`, then `npm run format` and `npm run lint`
