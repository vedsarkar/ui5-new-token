## Context

Second step in reorganizing API docs to match the developer portal. Follows the pattern established by `api/ClientManagement/`. The Customer Management group has 14 endpoints across 7 paths — significantly larger than Client Management (7 endpoints, 4 paths).

Key schemas: `Customer`, `PasswordPolicy`, `MFAConfig`, `RolesPermissions`, `ReltioServiceResourcePermissions`, `OperationStatus`. The `Customer` schema references `PasswordPolicy`, `MFAConfig`, and `ExternalProviderConfig` — all included for completeness.

## Goals / Non-Goals

**Goals:**
- Create `api/CustomerManagement/` with spec, stories, and auto-generated docs
- Match the developer portal's Customer Management group exactly (14 endpoints)
- Include all referenced schemas for Data Models rendering
- Title as `API/Customer Management` (flat hierarchy)

**Non-Goals:**
- Modifying the existing `api/configuration.json`
- Migrating other groups in this change
- Including password rule sub-schemas (too granular for docs; PasswordPolicy is sufficient)

## Decisions

**1. Server URL**: Same as Client Management — `https://{environment}.reltio.com/reltio` with `{environment}` variable. One path (`/services/oauth/roles/permissions/{roleName}`) doesn't include `{customerId}` — it's a system-level endpoint but still grouped under Customer Management per the portal.

**2. Schema scope**: Include `Customer`, `PasswordPolicy`, `MFAConfig`, `RolesPermissions`, `ReltioServiceResourcePermissions`, and `OperationStatus`. Skip deep password rule sub-schemas (`HistoryPRule`, `LengthPRule`, etc.) — represent `passwordRules` as a generic array. Skip `ExternalProviderConfig` internals — represent as a simplified object.

**3. Story naming**: Use short path names matching the portal display (e.g. `GET /{customerId}`, `PUT /roles/permissions/{roleName}`).

## Risks / Trade-offs

- **Large endpoint count** — 14 stories is many, but matches the portal 1:1. No way to reduce without diverging.
- **Schema simplification** — Password rule sub-types and ExternalProviderConfig details are omitted. Acceptable for docs overview; full detail lives in `configuration.json`.
