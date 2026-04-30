## Context

6 endpoints across 4 paths under two base prefixes:
- `/api/{tenantId}/actions/...` — CRUD and single-object execution
- `/api/{tenantId}/execute/{hook}` — batch execution

URL variables: `{tenantId}`, `{name}`, `{hookName}`, `{hook}`.

## Goals / Non-Goals

**Goals:**
- Match developer portal's Life Cycle Actions group exactly
- Server URL: `https://{environment}.reltio.com/reltio`

**Non-Goals:**
- Documenting the LCA JAR file format or S3 setup

## Decisions

**1. Schemas**: Lightweight — LCA objects are flexible JSON. Include a simplified `LifeCycleAction` schema with key fields (name, hooks, jarFile, className).

**2. Execute endpoints**: Two different execute paths — single object (`/actions/{name}/{hookName}`) and batch (`/execute/{hook}`). Both use POST with request bodies.
