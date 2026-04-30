## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/AddressApis/` directory and scaffold `AddressApis.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `AddressCandidate`)
- [x] 1.2 Add `GET /{tenantId}/address/search` with all five query parameters (`Text` required, `Container`/`Countries`/`Language` optional, `Limit` required `integer` — fix the invalid `int` from `operation.json`)
- [x] 1.3 Add `GET /{tenantId}/address/fetch` with required query parameter `Id`

## 2. Storybook Stories

- [x] 2.1 Create `openApi/AddressApis/AddressApis.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Address APIs`
- [x] 2.2 Export `SearchAddresses` and `FetchAddress` stories. Each spreads `urlControls(urlWithQueryPlaceholders)` so query parameters declared as `?Text={Text}&...` automatically render as Storybook controls and get substituted by the existing apiMetaConfig URL pipeline. (Simpler than the design's per-story query-string assembler — no code changes needed.)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `AddressApis.story.mdx`, then `npm run format` and `npm run lint`
