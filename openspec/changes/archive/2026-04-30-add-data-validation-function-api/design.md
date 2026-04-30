## Context

Data Validation Function endpoints all share the base URL `https://{environment}.reltio.com/reltio/api/{tenantId}/dataValidationFunctions`. Three paths: root (tenant-level), `/{functionURI}` (single function), `/{objectType}/{object}` (entity/relation type level). 7 endpoints total.

Schemas: `TenantFunctions`, `ObjectFunctions`, `Function` — well-structured with enums for action, validationEvent, applyOn, status.

## Goals / Non-Goals

**Goals:**
- Create spec, stories, docs matching the portal's Data Validation Function group exactly
- Include all 3 schemas (`TenantFunctions`, `ObjectFunctions`, `Function`) for Data Models rendering

**Non-Goals:**
- Modifying existing files

## Decisions

**1. Server URL**: `https://{environment}.reltio.com/reltio` — paths start with `/api/{tenantId}/dataValidationFunctions/...`

**2. URL variables**: `{tenantId}` for all stories, plus `{functionURI}` or `{objectType}`+`{object}` for specific stories. `urlControls()` handles per-story controls.

## Risks / Trade-offs

None significant — straightforward CRUD group following established pattern.
