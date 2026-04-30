## Context

The Data Model group has 12 endpoints across 11 paths spread over three different base URL prefixes:
- `/services/reltio/api/{tenantId}/configuration/...` — main configuration endpoints
- `/services/reltio/tenants/{tenantId}/cleanse` — cleanse configuration
- `/services/reltio/tools/matching/{tenantId}/...` — matching tools

All share `{tenantId}` as a path parameter. Some add `{objectType}`, `{typeName}`, or `{entityType}`.

## Goals / Non-Goals

**Goals:**
- Create `openApi/DataModel/` with spec, stories, and auto-generated docs
- Match the developer portal's Data Model group exactly (12 endpoints)
- Use `urlControls()` per story for dynamic URL controls
- Title as `API/Data Model` (flat hierarchy)

**Non-Goals:**
- Including the full Configuration schema (too large) — reference key types only
- Modifying existing `openApi/configuration.json`

## Decisions

**1. Base URL pattern**: Unlike Client/Customer Management (single base URL), Data Model endpoints span three different URL prefixes. Each story provides its full URL via `request.url`. No shared base URL needed beyond what the spec defines.

**2. Server URL**: `https://{environment}.reltio.com` as the server base. Paths include the full service prefix (e.g. `/reltio/api/{tenantId}/configuration`).

**3. Schema scope**: Include lightweight schemas for response types — `OperationStatus` for simple responses. The full Configuration schema is too large; reference it as a generic object with key top-level properties.

## Risks / Trade-offs

- **Multiple URL prefixes** — 3 different base paths under one API group. Acceptable — matches the portal grouping.
- **Configuration schema simplification** — Full L3 config is thousands of lines. A simplified version with top-level properties is sufficient for docs.
