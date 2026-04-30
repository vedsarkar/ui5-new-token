## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Interactions/` directory and scaffold `Interactions.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `Interaction`, `InteractionList`, `RawInteraction`)
- [x] 1.2 Add the two Ingest-module creation endpoints (`POST /interactions`, `POST /rawInteractions`) authored from the portal screenshot
- [x] 1.3 Copy every `Interactions`-tagged path/method from `openApi/operation.json` into the spec, stripping the `/services/reltio/api` prefix and normalizing `DELETE /interactions/**` to `DELETE /interactions/{id}`

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Interactions/Interactions.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Interactions`
- [x] 2.2 Export one story per endpoint with `...urlControls(url)` and `args.request.method`; add `args.request.body` for POST methods

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Interactions.story.mdx`, then `npm run format` and `npm run lint`
