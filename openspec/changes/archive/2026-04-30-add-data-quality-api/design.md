## Context

The developer portal's Operate module exposes a single "Data Quality" endpoint:

`POST /{tenant}/entityType/{entityTypeID}/ml/dataQuality/v1/attributeLevel/timeSeries/`

(verbatim from `openApi/operation.json`, including the trailing slash and the `{tenant}` placeholder name). This is an ML-backed analytics endpoint — it returns attribute-level data quality measurements as a time series, scoped to a tenant + entity type.

Unlike every other Operate-tagged endpoint, this path does NOT begin with `/services/reltio/api/...`. It's served from a separate ML / DQ subsystem with its own routing, so the prior server-URL strategy (`https://{environment}.reltio.com/reltio/api` + `/{tenantId}/...`) doesn't fit.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Data Quality` documenting the endpoint
- Server URL `https://{environment}.reltio.com` (root) so the verbatim path can be preserved
- Per-story `urlControls` exposing `tenantId` and `entityTypeID`

**Non-Goals:**
- Documenting the time-series response schema in detail — `operation.json` doesn't ship one
- Refreshing `operation.json` from the portal

## Decisions

**1. Server URL stays at the root.** Because the path doesn't go through `/reltio/api`, `servers[0].url` is `https://{environment}.reltio.com` and the path keeps its full prefix `/{tenantId}/entityType/{entityTypeID}/ml/dataQuality/v1/attributeLevel/timeSeries/`.

**2. Normalize `{tenant}` → `{tenantId}`.** Every other API page in this docs site uses `{tenantId}` as the canonical placeholder. `operation.json` uses `{tenant}` here only — almost certainly a portal-side typo. Cosmetic correction, not a behaviour change. Documented in proposal.md so reviewers don't flag the divergence from `operation.json`.

**3. Schemas: minimal `DataQualityTimeSeriesRequest` and `DataQualityTimeSeriesResponse`.** Request: `attributes[]`, `from`, `to`. Response: array of `{ attribute, points: [{ timestamp, score }] }`. Best-effort interpretation of the endpoint name; can be enriched when the upstream schema lands.

**4. Trailing slash preserved.** The portal's path has a trailing `/`. We keep it because Reltio routing may differentiate slashed/unslashed variants and we want the docs to match what the portal serves.

**5. Sample body.** A small request: `{ attributes: ["FirstName", "LastName"], from: 1730000000000, to: 1730800000000 }`.

## Risks / Trade-offs

- **Schema is invented from the endpoint name** → If/when Reltio publishes the upstream schema, refresh both schemas. Stories won't break — they only depend on `args.request`.
- **Path stands out as the only `/services/reltio/api`-free entry in the docs site** → Acceptable: it really is served from a different subsystem. Documenting it here keeps the doc page structure consistent with the portal grouping.
