## Context

The developer portal exposes segment-related endpoints across two Swagger pages:

- **Ingest module → "Segments"** group: only the one POST endpoint used to create segments (`POST /segments` "Creates a collection of segments in a tenant").
- **Operate module → "Segments"** group: 6 endpoints tagged `Segments` covering search/list (`GET /segments`), retrieval (`GET /segments/{id}`), deletion (`DELETE /segments/{id}`), enable/disable (`PUT /segments/{id}/enable`, `PUT /segments/{id}/disable`), and the entity-scoped read (`GET /entities/{id}/segments` — "search for segments an entity belongs to").

The local snapshot files mirror this split: `openApi/operation.json` contains the Operate-side endpoints (tag `Segments`), while the POST creation endpoint from the Ingest page is absent from `openApi/ingest.json` (which only contains DataLoader endpoints). Same precedent as `add-entities-api`, `add-interactions-api`, and `add-relationships-api`.

A segment in Reltio is a saved query — a named, persistable definition of a set of entities that match given criteria. It has a stable URI, a name/description, an entity type scope, a filter expression, and a status flag (enabled/disabled). The portal exposes both definition-level operations (CRUD + enable/disable on `/segments`) and reads of the segment's entity contents (`/segments/{id}/entities*`). The latter belong to `API/Entities`.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Segments` that documents the full segment definition lifecycle in a single page
- Match the portal's selection criterion: include exactly the endpoints tagged `Segments` in `operation.json`, plus the one Ingest-module POST creation endpoint
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (consistent with `add-entities-api` / `add-interactions-api` / `add-relationships-api`)
- One story per endpoint, with `urlControls` so each story shows only the placeholders used in its URL

**Non-Goals:**
- Re-documenting `/segments/{id}/entities*` reads — those carry the `Entities` tag and already live under `API/Entities`. Duplicating them would split the entity-side reads across two pages
- Refreshing `openApi/ingest.json` or `openApi/operation.json` from the portal — the local snapshots are read-only inputs

## Decisions

**1. Single stories file.** With only 7 endpoints, one file is obviously right.

**2. Portal-only POST inlined into the spec.** `POST /segments` is documented from the portal screenshot even though it is missing from `openApi/operation.json` and `openApi/ingest.json`. Same precedent as `add-entities-api`, `add-interactions-api`, `add-relationships-api`, and `add-data-load-job-api`.

**3. Inclusion rule = "Segments" tag.** We include endpoints whose `tags` array contains `Segments` in `operation.json`, plus the one creation endpoint from the Ingest page. The portal's "Search for segments entity belongs to" (`GET /entities/{id}/segments`) IS tagged `Segments`, so it lives here — even though its URL is rooted at `/entities/{id}/...`.

**4. `/segments/{id}/entities*` stays in `API/Entities`.** Already shipped there as part of `add-entities-api` because they carry the `Entities` tag in `operation.json`. Documented as a Non-Goal to avoid the temptation to duplicate.

**5. Schemas: minimal but realistic.** Define `Segment` and `SegmentList` in `components.schemas`. `Segment` carries `uri`, `name`, `description`, `objectType`, `condition` (the filter expression), `status` (`ENABLED` / `DISABLED`), and timestamps. `condition` matches the portal's filter syntax (e.g. `equals(type,'configuration/entityTypes/Individual')`).

**6. POST sample body.** The `POST /segments` story includes a small but realistic body — an array with one segment definition (name, objectType, condition) — so the curl preview is meaningful.

**7. Enable/disable use PUT with no body.** The portal documents both as PUT with no request body. We follow that — `args.request` includes `method: "PUT"` and `url`, but no `body`. Storybook's curl preview will produce a bodyless PUT, which is correct.

## Risks / Trade-offs

- **Portal-only POST can drift** → Reconciled when `operation.json` / `ingest.json` are refreshed; the proposal's Impact section flags this.
- **Schema is minimal** → Acceptable trade-off: useful for curl preview and Send-button testing; can be enriched later without breaking existing stories.
- **`GET /entities/{id}/segments` is a cross-cutting read** → It reads segments but is rooted at `/entities/{id}/...`. We surface it under `API/Segments` because it carries the `Segments` tag, mirroring the portal. This is consistent with how `add-interactions-api` placed `GET /entities/{id}/_interactions` under Interactions.
