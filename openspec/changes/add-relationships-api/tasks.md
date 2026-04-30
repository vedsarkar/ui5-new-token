## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Relationships/` directory and scaffold `Relationships.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `Relation`, `RelationList`, `Crosswalk`)
- [x] 1.2 Add the Ingest-module creation endpoint (`POST /relations` Save Relationships) authored from the portal screenshot
- [x] 1.3 Copy the three `Relationships`-tagged path/methods from `openApi/operation.json` into the spec, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Relationships/Relationships.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Relationships`
- [x] 2.2 Export 4 stories with `...urlControls(url)` and `args.request.method`; the `POST /relations` story includes a sample body with `type`, `startObject`, and `endObject`

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Relationships.story.mdx`, then `npm run format` and `npm run lint`
