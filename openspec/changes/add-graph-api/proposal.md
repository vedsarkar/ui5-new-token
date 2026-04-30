## Why

The developer portal's Operate module exposes a "Graph" group with one endpoint that returns a single entity's one-hop connections — every entity it relates to via any relation type, in a single graph-traversal call. The Storybook docs site has no page for it yet — developers building entity-graph visualizations have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/Graph/Graph.spec.json` — an OpenAPI 3.1 spec containing the single endpoint tagged `Graph` in `openApi/operation.json`:
  - `POST /entities/{id}/_connections` — get entity one-hop connections
- Create `openApi/Graph/Graph.stories.tsx` — one Storybook story with `urlControls`
- Generate `openApi/Graph/Graph.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Graph`
- Server URL: `https://{environment}.reltio.com/reltio/api`; path starts with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `graph-api`: Storybook API documentation for the Graph API — get one-hop entity connections

### Modified Capabilities

## Impact

- New directory: `openApi/Graph/`. Additive only.
- Adds 1 story.
- Single-endpoint page; could grow if more graph traversal endpoints are added later (n-hop is currently exposed as `_hops` under `Entities` tag).
