## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/DataQuality/` directory and scaffold `DataQuality.spec.json` (`info`, `servers` with `https://{environment}.reltio.com` (root), `components.schemas` with `DataQualityTimeSeriesRequest` and `DataQualityTimeSeriesResponse`)
- [x] 1.2 Add the single `Data Quality`-tagged endpoint, normalizing `{tenant}` to `{tenantId}` and preserving the trailing slash

## 2. Storybook Stories

- [x] 2.1 Create `openApi/DataQuality/DataQuality.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Data Quality`
- [x] 2.2 Export 1 story with `...urlControls(url)` exposing `environment`, `tenantId`, `entityTypeID` and a sample body (`attributes`, `from`, `to`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `DataQuality.story.mdx`, then `npm run format` and `npm run lint`
