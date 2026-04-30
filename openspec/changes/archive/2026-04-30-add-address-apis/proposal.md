## Why

The developer portal's Operate module exposes an "Address APIs" group with two GET endpoints used to look up real-world postal addresses through Reltio's address provider integration. The Storybook docs site has no page for them yet — developers integrating address lookup currently have no first-class reference.

Unlike the previously documented APIs (Entities, Interactions, Relationships, Segments), Address APIs are **Operate-only** — there is no Ingest-module counterpart to merge in.

## What Changes

- Create `openApi/AddressApis/AddressApis.spec.json` — an OpenAPI 3.1 spec containing the two endpoints tagged `Address APIs` in `openApi/operation.json`:
  - `GET /address/search` — search for possible addresses matching a given text (with optional `Container`, `Countries`, `Language` filters and a required `Limit`)
  - `GET /address/fetch` — retrieve the full details for a single address by its provider-specific id
- Create `openApi/AddressApis/AddressApis.stories.tsx` — one Storybook story per endpoint with `urlControls` for `{tenantId}` and `argTypes` for the query parameters
- Generate `openApi/AddressApis/AddressApis.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Address APIs`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (matching the convention from `add-entities-api` / `add-interactions-api` / `add-relationships-api` / `add-segments-api`)

## Capabilities

### New Capabilities
- `address-apis`: Storybook API documentation for the Address APIs — text-based address search (`GET /address/search`) and single-address fetch (`GET /address/fetch`) used to integrate Reltio with an external address provider

### Modified Capabilities

## Impact

- New directory: `openApi/AddressApis/`. Additive only — no existing files change.
- Adds 2 stories. Both endpoints exist in `openApi/operation.json`, so no portal-only endpoints needing screenshot-only authoring this time.
- Minor spec hygiene: `operation.json` declares `Limit` as `type: "int"`, which is not a valid OpenAPI type. The new spec uses `type: "integer"` instead.
