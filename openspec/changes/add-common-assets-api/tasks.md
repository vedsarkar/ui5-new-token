## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/CommonAssets/` directory and scaffold `CommonAssets.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `AssetReference`, `AssetStatusUpdate`)
- [x] 1.2 Add the six `Common Assets`-tagged path/methods from `openApi/operation.json` into the spec, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/CommonAssets/CommonAssets.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Common Assets`
- [x] 2.2 Export 6 stories with `...urlControls(url)` and sample bodies for the write/check methods (`AssetReference` for `_get`/`status/check`/`synchronize`, `AssetStatusUpdate` for `status`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `CommonAssets.story.mdx`, then `npm run format` and `npm run lint`
