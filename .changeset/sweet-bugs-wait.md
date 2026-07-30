---
"@reltio/design": minor
"@reltio/app": minor
---

Split `TenantSelector` environment into display name and machine id, with backward-compatible fallbacks.

- `TenantEntry` gains optional `environmentName` (column, filters, search, trigger) and `environmentId` (row key / selection match), aligned with `customerName` / `tenantName`
- Deprecated `TenantEntry.environment` is kept: when the new fields are omitted, it is used for both display and identity
- `selectedEnvironmentId` is preferred; deprecated `selectedEnvironment` is still accepted as a fallback
- App template `useTenants` returns `TenantEntry[]` with both new fields; the separate `TenantOption` enrichment wrapper is removed

**Migration (recommended):** set `environmentName` and `environmentId` instead of `environment`, and rename `selectedEnvironment` to `selectedEnvironmentId`. Legacy callers that only pass `environment` / `selectedEnvironment` keep working without changes.
