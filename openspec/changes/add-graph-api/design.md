## Context

The developer portal's Operate module exposes one "Graph" endpoint:

`POST /services/reltio/api/{tenantId}/entities/{id}/_connections` — returns the one-hop neighbours of a given entity. Tagged `Graph` in `openApi/operation.json`. Operate-only.

Note: `_hops` (multi-hop traversal) is tagged `Entities`, not `Graph`, and lives in `add-entities-api`. The single `Graph`-tagged endpoint is the one-hop variant only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Graph` documenting the endpoint
- Server URL `https://{environment}.reltio.com/reltio/api`, path `/{tenantId}/entities/{id}/_connections`

**Non-Goals:**
- Including `_hops` here (it lives under `Entities`)
- Refreshing `operation.json` from the portal

## Decisions

**1. Strip the `/services/reltio/api` prefix.** Same convention.

**2. Inclusion rule = "Graph" tag.** Just the one endpoint.

**3. Schema: minimal `ConnectionsResponse` with `connections: [{ uri, relationType, direction }]`.**

**4. Sample body.** A small POST body with optional filters: `{ "relationTypes": ["configuration/relationTypes/HasAddress"], "direction": "BOTH" }`.

## Risks / Trade-offs

- **Single-endpoint page** → Acceptable: portal groups it as one section. The page can grow if Reltio adds more graph endpoints under this tag.
