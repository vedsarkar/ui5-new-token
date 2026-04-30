## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/MergeAndUnmerge/` directory and scaffold `MergeAndUnmerge.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `MergeRequest`, `UnmergeRequest`)
- [x] 1.2 Add the two `Merge & Unmerge`-tagged path/methods, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/MergeAndUnmerge/MergeAndUnmerge.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Merge & Unmerge`
- [x] 2.2 Export 2 stories with `...urlControls(url)` and sample `MergeRequest` / `UnmergeRequest` bodies

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `MergeAndUnmerge.story.mdx`, then `npm run format` and `npm run lint`
