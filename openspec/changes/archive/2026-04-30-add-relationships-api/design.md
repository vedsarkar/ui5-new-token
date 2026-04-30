## Context

The developer portal exposes relations-related endpoints across two Swagger pages:

- **Ingest module → "Relationships"** group: only the one POST endpoint used to create relations (`POST /relations` "Save Relationships API creates relationships").
- **Operate module → "Relationships"** group: 3 endpoints tagged `Relationships` covering search/list (`GET /relations`), retrieval (`GET /relations/{id}`), and deletion (`DELETE /relations/{id}`).

The local snapshot files mirror this split: `openApi/operation.json` contains the Operate-side endpoints (tag `Relationships`), while the POST creation endpoint from the Ingest page is absent from `openApi/ingest.json` (which only contains DataLoader endpoints). This matches the precedent set by `add-entities-api`, `add-interactions-api`, and `add-data-load-job-api`.

A relation in Reltio always links two entities (the `startObject` and `endObject`), carries a relation `type` URI (e.g. `configuration/relationTypes/HasAddress`), can have its own attributes, and tracks source-system contributions via crosswalks — the same structural pattern as entities and interactions.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Relationships` that documents the full relation CRUD lifecycle in a single page
- Match the portal's selection criterion: include exactly the endpoints tagged `Relationships` in `operation.json`, plus the one Ingest-module POST creation endpoint
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (consistent with `add-entities-api` and `add-interactions-api`, with the `/services/reltio/api` segment dropped)
- One story per endpoint, with `urlControls` so each story shows only the placeholders used in its URL

**Non-Goals:**
- Documenting endpoints that touch relations but carry a different tag (e.g. `Crosswalks` operations on relation crosswalks, `Lineage` for relation history, `Export` for relation export jobs). Those keep their own Storybook sections in future proposals
- Refreshing `openApi/ingest.json` or `openApi/operation.json` from the portal — the local snapshots are read-only inputs

## Decisions

**1. Single stories file.** With only 4 endpoints, this is trivially correct.

**2. Portal-only POST inlined into the spec.** `POST /relations` is documented from the portal screenshot even though it is missing from `openApi/operation.json` and `openApi/ingest.json`. Same precedent as `add-entities-api`, `add-interactions-api`, and `add-data-load-job-api`.

**3. Inclusion rule = "Relationships" tag.** We include endpoints whose `tags` array contains `Relationships` in `operation.json`, plus the one creation endpoint from the Ingest page.

**4. Schemas: minimal but realistic.** Define `Relation`, `RelationList`, and `Crosswalk` in `components.schemas`. `Relation` carries `uri`, `type`, `startObject`, `endObject`, `attributes`, `crosswalks`, and timestamps. The two endpoint-linking fields (`startObject`, `endObject`) are essential to convey what a relation is and produce useful sample bodies/curl previews.

**5. Sample body.** The `POST /relations` story includes a small but realistic body — an array with one relation that links two entity URIs by a relation type — so the curl preview is meaningful.

**6. URL template per story.** All URLs are built from `https://{environment}.reltio.com/reltio/api/{tenantId}/<path>`. The id-bound stories spread `urlControls()` for the additional `{id}` placeholder so the Controls panel shows only what the story uses.

## Risks / Trade-offs

- **Portal-only endpoint can drift** → Reconciled when `operation.json` / `ingest.json` are refreshed; the proposal's Impact section flags this.
- **Schema is minimal** → Acceptable trade-off: useful for curl preview and Send-button testing; can be enriched later without breaking existing stories.
- **Small surface area** → The page is small (4 stories) but it still earns its own section because Relationships is a top-level concern and the portal already groups it as one.
