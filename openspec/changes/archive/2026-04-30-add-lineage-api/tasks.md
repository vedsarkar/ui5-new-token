## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Lineage/` directory and scaffold `Lineage.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `ChangeEntry`, `ChangesWithTotalResponse`)
- [x] 1.2 Add the three `Lineage`-tagged path/methods, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Lineage/Lineage.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Lineage`
- [x] 2.2 Export 3 stories with `...urlControls(url)`; the delete-history POST carries a sample `{ filter: "..." }` body

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Lineage.story.mdx`, then `npm run format` and `npm run lint`
