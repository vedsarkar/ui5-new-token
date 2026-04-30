## Context

The developer portal's Manage module exposes "Databricks Share Management" — seven POST endpoints, all under the same prefix:

`/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share/{action}`

where `{action}` is one of: `catalog`, `catalog-schema`, `complete-share`, `grant`, `recipient`, `schema`, `share`.

The endpoints provision Databricks Unity Catalog artifacts for a Reltio tenant through an adapter. The shared workflow is: create a catalog → create a schema → create a share → create a recipient → grant the recipient access to the share. The `complete-share` endpoint is a convenience that does the recipient + share + grant in one call.

All seven carry the `Databricks Share Management` tag in `openApi/management.json`. Manage-only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Databricks Share Management` documenting all 7 endpoints
- Server URL absorbs the long shared prefix so per-story paths read as `/catalog`, `/share`, etc.
- Per-story `urlControls` for `environment` + `tenantId` + `adapterName` (the only placeholders, all served by the server URL template)

**Non-Goals:**
- Documenting Databricks-side Unity Catalog object schemas in detail — out of scope
- Refreshing `management.json` from the portal

## Decisions

**1. Server URL = `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share`.** All 7 endpoints share this exact prefix, so absorbing it into `servers[0].url` means per-story paths become single segments (`/catalog`, `/share`, `/grant`). Same precedent as `Export` (which absorbed `/services/jobs`). The `{tenantId}` and `{adapterName}` server variables get default `{tenantId}` / `{adapterName}` placeholders so the URL template is recognizable in the docs.

**2. Inclusion rule = "Databricks Share Management" tag.** All 7 endpoints carry exactly this tag in `management.json`.

**3. Schemas: minimal but typed.** Define request and response schemas for each endpoint based on the Databricks Unity Catalog object names — `CatalogRequest` (`{ catalogName, comment }`), `SchemaRequest` (`{ schemaName, comment }`), `RecipientRequest` (`{ recipientName, sharingIdentifier }`), `ShareRequest` (`{ shareName, comment }`), `GrantRequest` (`{ shareName, recipientName, privileges: [string] }`), `CompleteShareRequest` (combines recipient + share + grant fields). Single response schema `DatabricksOperationResult` with `{ status, resourceName, message }`.

**4. Sample bodies.** A small but realistic body per story so the curl preview is meaningful. The complete-share story shows the full convenience body.

## Risks / Trade-offs

- **Schemas are inferred from common Unity Catalog patterns** → If/when the portal publishes authoritative schemas, refresh. Stories won't break.
- **Server URL has two server variables (`tenantId` and `adapterName`)** → Both must be set by the consumer. The server-variables block in the spec captures both with sensible defaults.
