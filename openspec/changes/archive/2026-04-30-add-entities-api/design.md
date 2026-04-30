## Context

The developer portal exposes entities-related endpoints across two Swagger pages:

- **Ingest module → "Entities"** group: only the two POST endpoints used to create entities (`POST /entities` Save Entities, `POST /entities/_conditional` Search Before Create Aggregated).
- **Operate module → "Entities"** group: ~25 endpoints tagged `Entities` covering search, retrieval, update, clone, hops, cleanse, reverse geocoding, totals, scan, deletion, and segment-bound entity reads.

The local snapshot files mirror this split: `openApi/operation.json` contains the Operate-side endpoints (tag `Entities`), while the two POST creation endpoints from the Ingest page are absent from `openApi/ingest.json` (which only contains DataLoader endpoints). This matches the precedent set by `add-data-load-job-api`, which authored portal-only endpoints from screenshots.

All endpoints share the same base path `/services/reltio/api/{tenantId}/...` (the entities sub-tree), the same `{tenantId}` server variable, and add a few path placeholders: `{id}`, `{reltioId}`, `{crosswalkValue}`. The portal also exposes `/segments/{id}/entities*` endpoints that are tagged `Entities` — they belong here, not in a future Segments section.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Entities` that documents the full entity CRUD lifecycle in a single page
- Match the portal's selection criterion: include exactly the endpoints tagged `Entities` in `operation.json`, plus the two Ingest-module POST creation endpoints
- Server URL: `https://{environment}.reltio.com`; paths start with `/services/reltio/api/{tenantId}/...`
- One story per endpoint, with `urlControls` so each story shows only the placeholders used in its URL

**Non-Goals:**
- Documenting endpoints under `/entities/...` that carry a non-Entities tag (`Match`, `Lineage`, `Merge & Unmerge`, `Crosswalks`, `Graph`, `Interactions`, `Common Assets`, `Attribute Verification`, `Segments`, `Export`). Those will get their own `API/<Group>` sections in follow-up proposals so each Storybook page stays focused
- Full request/response schema fidelity — the Entities group is large, so we follow the `add-data-load-job-api` precedent and ship simplified `Entity` / `EntityList` / `EntitySearchResponse` schemas with the most relevant top-level fields only
- Refreshing `openApi/ingest.json` or `openApi/operation.json` from the portal — the local snapshots are read-only inputs

## Decisions

**1. Single stories file despite ~30 endpoints.** The portal's "Entities" tag has ~25 entries and all of them concern the same resource lifecycle. Splitting them into multiple Storybook pages would defeat the proposal's stated goal of unifying what the portal already split. Precedent: `DataLoadJob.stories.tsx` already groups ~40 endpoints in one file.

**2. Portal-only endpoints inlined into the spec.** `POST /entities` (Save Entities) and `POST /entities/_conditional` (Search Before Create) are documented from the portal screenshot/Swagger UI even though they are missing from `openApi/operation.json` and `openApi/ingest.json`. This matches the `add-data-load-job-api` decision and is recorded in the proposal's Impact section so future spec refreshes can reconcile them.

**3. Inclusion rule = "Entities" tag.** We include endpoints whose `tags` array contains exactly `Entities` in `operation.json`, plus the two creation endpoints from the Ingest page. This is unambiguous, matches the portal's grouping, and avoids debate about whether `Match`/`Lineage`/etc. should be folded in.

**4. `/segments/{id}/entities*` belongs here.** These three endpoints (`GET`, `POST scan`, `GET total`) are tagged `Entities` in `operation.json`. They read entities by segment, so they fit the "Entities" lifecycle, not a future Segments section.

**5. Schemas: minimal.** Define `Entity`, `EntityList`, and a thin `EntitySearchResponse` in `components.schemas` with the most relevant top-level fields (`uri`, `type`, `attributes`, `crosswalks`, `label`). Endpoint responses use `$ref` to one of these. This keeps the spec readable and is enough for the mock-response/Send-button workflow.

**6. URL template per story.** All URLs are built from `https://{environment}.reltio.com/reltio/api/{tenantId}/<path>`. Stories that touch sub-resources spread `urlControls()` for the additional placeholders (`{id}`, `{reltioId}`, `{crosswalkValue}`) so the Controls panel shows only what the story uses.

## Risks / Trade-offs

- **Portal-only endpoints can drift** → Reconciled when `operation.json` / `ingest.json` are refreshed; the proposal's Impact section flags this so reviewers know to re-validate.
- **Simplified schemas hide nuance** → Acceptable trade-off for a large group; the `OpenApi` block still renders the Data Models section and stories can be enriched later without breaking the docs page.
- **Page length** → ~30 stories on one page is long but matches `Data Load Job` (~40) and is exactly what the proposal asks for.
