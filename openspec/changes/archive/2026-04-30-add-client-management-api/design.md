## Context

The Reltio Developer Portal groups Configuration API endpoints into domain categories: Client Management, Customer Management, Data Model, etc. Our Storybook currently organizes API docs by source spec file (e.g. `api/Metadata/`), not by the portal's grouping. We need to extract Client Management endpoints from the monolithic `api/configuration.json` into a standalone OpenAPI 3.1 spec and Storybook stories.

Existing pattern: `api/Metadata/` has `metadata.spec.json` + `Metadata.stories.tsx` + auto-generated `Metadata.story.mdx`. The Client Management group follows the same pattern.

The 7 endpoints in this group all live under `/services/oauth/customers/{customerId}/clients` and use the `ClientDetailsWrapper`, `ClientMultitokenStats`, `OperationStatus` schemas from `api/configuration.json`.

## Goals / Non-Goals

**Goals:**
- Create `api/ClientManagement/` directory with spec, stories, and auto-generated docs
- Exactly match the developer portal's Client Management group (7 endpoints, 4 paths)
- Use OpenAPI 3.1 format with proper `$ref` schemas for Data Models rendering
- Title as `API/Configuration/Client Management` to establish the new hierarchy

**Non-Goals:**
- Removing or modifying the existing `api/configuration.json` — it remains the source of truth
- Migrating other Configuration groups (Customer Management, Data Model, etc.) in this change
- Adding new endpoints not present in the developer portal's Client Management group

## Decisions

**1. Server URL template**: Use `https://{environment}.reltio.com/reltio` as the base, with `{environment}` as a server variable. The Client Management endpoints use `/services/oauth/...` paths (not `/api/{tenantId}/...`), so the server URL differs from entity-based APIs. The `customerId` is a path parameter, not a server variable.

**2. Schema extraction**: Copy only the schemas referenced by Client Management endpoints (`ClientDetailsWrapper`, `AuthClientDetails`, `ReltioUserPermissions`, `ClientMultitokenStats`, `OperationStatus`) into the new spec. This keeps the spec self-contained. Descriptions are enhanced for clarity in the Data Models section.

**3. Storybook title hierarchy**: `API/Client Management` — flat, one level under API, matching the developer portal's group list. Future groups will follow the same pattern: `API/Customer Management`, `API/Data Model`, etc.

**4. Story per endpoint**: 7 stories matching the developer portal screenshot — one for each HTTP method + path combination.

## Risks / Trade-offs

- **Schema drift** — Schemas copied from `configuration.json` may diverge over time. Mitigation: the source spec is already a static snapshot; when updated, Client Management spec should be updated too.
- **Dual maintenance** — Both `configuration.json` and `clientmanagement.spec.json` describe the same endpoints. Mitigation: `configuration.json` is the canonical upstream; the new spec is a curated subset for docs.
