## Context

The developer portal's Operate module exposes "Merge & Unmerge" — two POST endpoints under `/services/reltio/api/{tenantId}/entities/{id}/...`:

- `_sameAs` — manually merges the entity at `{id}` with another entity (the body specifies which)
- `_unmerge` — unmerges a part of the entity at `{id}` (body specifies which contributor/crosswalk to extract back into a separate entity)

Both carry the `Merge & Unmerge` tag. Operate-only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Merge & Unmerge` documenting both endpoints
- Server URL `https://{environment}.reltio.com/reltio/api`, paths `/{tenantId}/...`

**Non-Goals:**
- Refreshing `operation.json` from the portal

## Decisions

**1. Strip the `/services/reltio/api` prefix.**

**2. Inclusion rule = "Merge & Unmerge" tag.**

**3. Schemas: minimal `MergeRequest` and `UnmergeRequest`.**
   - `MergeRequest`: `{ uri }` — URI of the entity to merge into the path-supplied entity.
   - `UnmergeRequest`: `{ contributor }` — crosswalk/contributor identifier of the part to extract.

**4. Sample bodies.** Realistic Reltio entity URIs (`entities/abc123`, `entities/def456`) for merge; a sample crosswalk reference for unmerge.

## Risks / Trade-offs

- **Schemas are inferred from common Reltio shapes** → If the actual portal documentation publishes richer fields, refresh.
