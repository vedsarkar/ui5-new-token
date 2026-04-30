## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Segments/` directory and scaffold `Segments.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `Segment`, `SegmentList`)
- [x] 1.2 Add the Ingest-module creation endpoint (`POST /segments` Creates a collection of segments) authored from the portal screenshot
- [x] 1.3 Copy the six `Segments`-tagged path/methods from `openApi/operation.json` into the spec, stripping the `/services/reltio/api` prefix

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Segments/Segments.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Segments`
- [x] 2.2 Export 7 stories with `...urlControls(url)` and `args.request.method`; the `POST /segments` story includes a sample body with `name`, `objectType`, and `condition`; the enable/disable stories omit `body`

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Segments.story.mdx`, then `npm run format` and `npm run lint`
