## Context

The developer portal exposes interactions-related endpoints across two Swagger pages:

- **Ingest module → "Interactions"** group: only the two POST endpoints used to create interactions (`POST /interactions` "Creates a collection of interactions in a tenant", `POST /rawInteractions` "Creates a raw collection of interactions in a tenant").
- **Operate module → "Interactions"** group: 8 endpoints tagged `Interactions` covering search (`GET /interactions`, `_byGroupKey`, `_total`), retrieval (`GET /interactions/{id}`, `GET /rawInteractions/{id}`, the entity-scoped `GET /entities/{id}/_interactions`), and deletion (`DELETE /interactions/**` for single delete, `POST /interactions/_deleteByUris` for batch).

The local snapshot files mirror this split: `openApi/operation.json` contains the Operate-side endpoints (tag `Interactions`), while the two POST creation endpoints from the Ingest page are absent from `openApi/ingest.json` (which only contains DataLoader endpoints). This matches the precedent set by `add-entities-api` and `add-data-load-job-api`, which authored portal-only endpoints from screenshots.

All endpoints share the same base `/reltio/api/{tenantId}/...` (tenantId server-style path prefix), and add only one extra placeholder, `{id}`. The entity-scoped read also takes `{id}` (interpreted as the entity URI by the route).

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Interactions` that documents the full interaction CRUD lifecycle in a single page
- Match the portal's selection criterion: include exactly the endpoints tagged `Interactions` in `operation.json`, plus the two Ingest-module POST creation endpoints
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (consistent with `add-entities-api`, with the `/services/reltio/api` segment dropped)
- One story per endpoint, with `urlControls` so each story shows only the placeholders used in its URL
- Normalize `DELETE /interactions/**` to `DELETE /interactions/{id}` to match the portal's docs and avoid the wildcard syntax that doesn't match OpenAPI's path templating

**Non-Goals:**
- Documenting interaction-adjacent endpoints that carry a non-Interactions tag (e.g. interaction-related entries inside Lineage, Match, Export). Those keep their own Storybook sections in future proposals
- Refreshing `openApi/ingest.json` or `openApi/operation.json` from the portal — the local snapshots are read-only inputs

## Decisions

**1. Single stories file.** The portal's "Interactions" tag has 8 entries plus 2 portal-only creators — small enough that one file is obviously right and matches the proposal's stated goal.

**2. Portal-only endpoints inlined into the spec.** `POST /interactions` and `POST /rawInteractions` are documented from the portal screenshot even though they are missing from `openApi/operation.json` and `openApi/ingest.json`. This matches `add-entities-api` and `add-data-load-job-api`, and is recorded in the proposal's Impact section so future spec refreshes can reconcile them.

**3. Inclusion rule = "Interactions" tag.** We include endpoints whose `tags` array contains `Interactions` in `operation.json`, plus the two creation endpoints from the Ingest page. Unambiguous, matches the portal's grouping.

**4. `GET /entities/{id}/_interactions` belongs here.** Tagged `Interactions` in `operation.json`, not `Entities`. Reading interactions for an entity is fundamentally an interactions-side operation, so it stays under `API/Interactions` rather than being duplicated under `API/Entities`.

**5. Normalize the wildcard delete path.** `operation.json` declares the single-interaction delete as `DELETE /services/reltio/api/{tenantId}/interactions/**`. This `**` is a Spring routing pattern, not OpenAPI path templating. The portal documents the same endpoint as `DELETE /interactions/{id}`. Our spec uses `DELETE /{tenantId}/interactions/{id}` — clearer, matches the portal, and produces a sensible `urlControls` placeholder.

**6. Schemas: minimal.** Define `Interaction`, `InteractionList`, and `RawInteraction` in `components.schemas` with the most relevant top-level fields (`uri`, `type`, `attributes`, `members`, `crosswalks`). Endpoint responses use `$ref` to one of these. Same trade-off as `add-entities-api`.

**7. URL template per story.** All URLs are built from `https://{environment}.reltio.com/reltio/api/{tenantId}/<path>`. Stories that touch sub-resources spread `urlControls()` for the additional `{id}` placeholder so the Controls panel shows only what the story uses.

## Risks / Trade-offs

- **Portal-only endpoints can drift** → Reconciled when `operation.json` / `ingest.json` are refreshed; the proposal's Impact section flags this.
- **Wildcard delete normalized** → If a future portal refresh keeps the `**` syntax, our spec will look inconsistent with `operation.json`. Acceptable: the portal already shows it as `{id}`, and OpenAPI path templating doesn't support `**`.
- **Simplified schemas hide nuance** → Acceptable for a one-shot docs page; can be enriched later without breaking existing stories.
