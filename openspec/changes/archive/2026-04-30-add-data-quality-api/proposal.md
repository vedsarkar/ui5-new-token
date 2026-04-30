## Why

The developer portal's Operate module exposes a "Data Quality" group with a single endpoint that returns ML-driven attribute-level data quality time-series for a given entity type. The Storybook docs site has no page for it yet — developers integrating data quality dashboards have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/DataQuality/DataQuality.spec.json` — an OpenAPI 3.1 spec containing the single endpoint tagged `Data Quality` in `openApi/operation.json`:
  - `POST /{tenantId}/entityType/{entityTypeID}/ml/dataQuality/v1/attributeLevel/timeSeries/` — returns attribute-level data quality time series
- Create `openApi/DataQuality/DataQuality.stories.tsx` — one Storybook story with `urlControls` and a realistic sample body
- Generate `openApi/DataQuality/DataQuality.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Data Quality`
- Server URL: `https://{environment}.reltio.com`; the path is kept verbatim from `operation.json` because it does NOT live under the standard `/services/reltio/api/{tenantId}/...` root
- Normalize the `{tenant}` placeholder in `operation.json` to `{tenantId}` for consistency with every other API page in the docs site

## Capabilities

### New Capabilities
- `data-quality-api`: Storybook API documentation for the Data Quality API — ML-driven attribute-level data quality time series

### Modified Capabilities

## Impact

- New directory: `openApi/DataQuality/`. Additive only.
- Adds 1 story.
- One spec hygiene fix: `{tenant}` → `{tenantId}`. Recorded in design.md.
- This API uses a non-standard root path (it does not live under `/services/reltio/api/...`). Server URL and path strategy differ from the other Operate APIs and are documented in design.md.
