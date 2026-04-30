## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Entities/` directory and scaffold `Entities.spec.json` (`info`, `servers`, `components.schemas` with `Entity`, `EntityList`, `EntitySearchResponse`)
- [x] 1.2 Add the two Ingest-module creation endpoints (`POST /entities` Save Entities, `POST /entities/_conditional` Search Before Create) authored from the portal screenshot
- [x] 1.3 Copy every `Entities`-tagged path/method from `openApi/operation.json` into the spec, preserving `summary`/`description` and pointing 200 responses at the shared schemas

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Entities/Entities.stories.tsx` with `apiMetaConfig` (title `API/Entities`, defaultPath `/entities`)
- [x] 2.2 Export one story per endpoint with `...urlControls(url)` and `args.request.method`; add `args.request.body` for POST/PUT/PATCH

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Entities.story.mdx`, then `npm run format` and `npm run lint`
