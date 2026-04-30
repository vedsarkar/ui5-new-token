## Why

The developer portal's Manage module exposes a "Databricks Share Management" group with seven POST endpoints used to provision Databricks Unity Catalog artifacts (catalogs, schemas, recipients, shares, grants) for a Reltio tenant via a configured adapter. The Storybook docs site has no page for them yet — partners and customers integrating Databricks Delta Sharing have no first-class reference. Manage-only API; no Operate or Ingest counterpart.

## What Changes

- Create `openApi/DatabricksShareManagement/DatabricksShareManagement.spec.json` — an OpenAPI 3.1 spec containing the seven endpoints tagged `Databricks Share Management` in `openApi/management.json`:
  - `POST /catalog` — create a catalog for a tenant
  - `POST /catalog-schema` — create a catalog and schema in one call
  - `POST /complete-share` — create recipient, share, and grant access in one operation (the convenience endpoint)
  - `POST /grant` — grant access to a share for a tenant-specific recipient
  - `POST /recipient` — create a recipient
  - `POST /schema` — create a schema
  - `POST /share` — create a share
- Create `openApi/DatabricksShareManagement/DatabricksShareManagement.stories.tsx` — one Storybook story per endpoint with `urlControls` for `{tenantId}` + `{adapterName}` and realistic sample bodies
- Generate `openApi/DatabricksShareManagement/DatabricksShareManagement.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Databricks Share Management`
- Server URL: `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share` — the deepest path-prefix that's stable across all 7 endpoints, so per-story paths shrink to `/catalog`, `/share`, etc.

## Capabilities

### New Capabilities
- `databricks-share-management-api`: Storybook API documentation for the Databricks Share Management API — provision Unity Catalog artifacts (catalog, schema, recipient, share, grant) for a tenant through an adapter, with a complete-share convenience endpoint that does everything in one call

### Modified Capabilities

## Impact

- New directory: `openApi/DatabricksShareManagement/`. Additive only.
- Adds 7 stories. All endpoints exist in `management.json`.
- Server URL absorbs both `{tenantId}` AND `{adapterName}` because all 7 endpoints share the same prefix. Documented in design.md.
