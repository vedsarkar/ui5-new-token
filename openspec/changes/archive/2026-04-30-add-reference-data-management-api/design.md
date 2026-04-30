## Context

6 endpoints across 4 paths under two service prefixes:
- `/services/configuration/{tenantId}` — RDM tenant config
- `/services/generators/{tenantId}/...` — canonical code generators

URL variables: `{tenantId}`, `{name}`.

## Goals / Non-Goals

**Goals:**
- Match portal's Reference Data Management group exactly
- Server URL: `https://{environment}.reltio.com` (paths include `/services/...`)

**Non-Goals:**
- Documenting lookup type schemas in detail

## Decisions

**1. Server URL**: `https://{environment}.reltio.com` — paths start with `/services/configuration/...` and `/services/generators/...` (different from the `/reltio/api/` pattern used by other groups).
