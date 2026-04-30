## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Crosswalks/` directory and scaffold `Crosswalks.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `Crosswalk`)
- [x] 1.2 Add the four `Crosswalks`-tagged path/methods from `openApi/operation.json`, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Crosswalks/Crosswalks.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Crosswalks`
- [x] 2.2 Export 4 stories with `...urlControls(url)` and sample `Crosswalk` bodies for the write methods

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Crosswalks.story.mdx`, then `npm run format` and `npm run lint`
