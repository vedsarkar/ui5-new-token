## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/SavedSearch/` directory and scaffold `SavedSearch.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `SavedSearch`, `SavedSearchList`)
- [x] 1.2 Add the six `Saved Search`-tagged path/methods, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/SavedSearch/SavedSearch.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Saved Search`
- [x] 2.2 Export 6 stories with `...urlControls(url)` and sample `SavedSearch` bodies for the write methods

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `SavedSearch.story.mdx`, then `npm run format` and `npm run lint`
