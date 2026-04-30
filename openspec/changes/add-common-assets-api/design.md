## Context

The developer portal's Operate module exposes "Common Assets" — six endpoints under `/services/reltio/api/{tenantId}/assets/...` and one under `/{tenantId}/entities/{id}/assets`. All carry the `Common Assets` tag in `openApi/operation.json`. Operate-only — no Ingest-module counterpart.

A "common asset" in Reltio is an asset (e.g. an attachment) that is shared/linked across multiple entities. The portal exposes endpoints to check whether a given asset is common, count common assets, mark/unmark assets as common, force a synchronization between the match-asset and common-asset stores, and list common assets for a particular entity.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Common Assets` documenting all 6 endpoints
- Server URL `https://{environment}.reltio.com/reltio/api`, paths `/{tenantId}/...` — consistent with the convention from `add-entities-api` and successors
- Per-story `urlControls` and realistic sample bodies for the write/check endpoints

**Non-Goals:**
- Documenting the underlying asset object model in detail — `operation.json` doesn't ship one. Use a minimal `AssetReference` schema.
- Refreshing `operation.json` from the portal.

## Decisions

**1. Single stories file with 6 stories.**

**2. Strip the `/services/reltio/api` prefix.** Same convention as `add-entities-api` and successors.

**3. Inclusion rule = "Common Assets" tag.** All six endpoints carry this tag.

**4. Schemas: minimal `AssetReference` and `AssetStatusUpdate`.** `AssetReference` has `entityURI`, `attributePath`, `crosswalk` — the typical addressing for a Reltio asset. `AssetStatusUpdate` extends it with a boolean `isCommon`.

**5. Sample bodies.** `_get` / `status/check`: an `AssetReference`. `status` PUT: an `AssetStatusUpdate`. `synchronize` PUT: an `AssetReference`. `_total`: `{}` (no required body). `GET /entities/{id}/assets`: no body.

## Risks / Trade-offs

- **Asset object model is invented from common patterns** → If/when Reltio publishes an authoritative schema, refresh `AssetReference`. Stories won't break — they only depend on `args.request`.
