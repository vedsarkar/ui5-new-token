## Why

The current `openApi/ReferenceDataManagement` Storybook page covers RDM tenant configuration (`/configuration/{tenantId}`) and code generators (`/generators/{tenantId}/...`) but is missing the **lookups** and **unmapped values** write endpoints that the developer portal documents under the Ingest module's "Reference Data Management" group. Those five POST/PUT endpoints are how customers actually load lookup data into RDM, so the page is incomplete without them.

## What Changes

- Extend `openApi/ReferenceDataManagement/ReferenceDataManagement.spec.json` with five new endpoints currently visible only in the developer portal's Ingest module:
  - `POST /lookups/{tenantId}` — Saves lookups
  - `POST /lookups/{tenantId}/{type}` — Saves lookups for the specified lookup type
  - `PUT  /lookups/{tenantId}/{type}/{code}` — Saves a lookup for the specified lookup type and specified code
  - `POST /unmapped/{tenantId}` — Saves lookup values that are not mapped to a canonical value
  - `POST /unmapped/{tenantId}/{type}` — Saves lookup values that are not mapped to a canonical value for the specified lookup type
- Extend `openApi/ReferenceDataManagement/ReferenceDataManagement.stories.tsx` with one story per new endpoint, using `urlControls` for path placeholders
- Regenerate `openApi/ReferenceDataManagement/ReferenceDataManagement.story.mdx` via `npm run build-api-docs`
- Add a `Lookup` schema to `components.schemas` so request/response bodies can `$ref` it
- Strip the `/services/` prefix shown in the portal (consistent with the convention adopted in `add-entities-api` and `add-interactions-api`); the existing RDM spec already uses `https://{environment}.reltio.com` as the server with unprefixed paths

## Capabilities

### New Capabilities

### Modified Capabilities
- `reference-data-management-api`: adds five lookup/unmapped write endpoints (POST /lookups, POST /lookups/{type}, PUT /lookups/{type}/{code}, POST /unmapped, POST /unmapped/{type}) plus a shared `Lookup` schema, taking the page from 6 to 11 stories

## Impact

- Existing files modified: `openApi/ReferenceDataManagement/ReferenceDataManagement.spec.json`, `openApi/ReferenceDataManagement/ReferenceDataManagement.stories.tsx`, `openApi/ReferenceDataManagement/ReferenceDataManagement.story.mdx` (regenerated). No file deletions, no structural reorganization.
- All five endpoints are documented from the developer portal screenshot — they are absent from `openApi/operation.json`, `openApi/ingest.json`, and the other local spec snapshots. Their schemas are minimal and will need to be re-validated when the upstream snapshots are refreshed (same caveat as the portal-only POST creators in `add-entities-api` and `add-interactions-api`).
