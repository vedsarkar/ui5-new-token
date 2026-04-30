## Context

`openApi/ReferenceDataManagement/` already documents 6 RDM endpoints (configuration GET/PUT plus generators CRUD + generate-next). Server URL is `https://{environment}.reltio.com`, paths are unprefixed (`/configuration/{tenantId}`, `/generators/{tenantId}/{name}`).

The developer portal's **Ingest module → "Reference Data Management"** group exposes five additional write endpoints under `/services/lookups/...` and `/services/unmapped/...`. None of them appear in `openApi/operation.json`, `openApi/ingest.json`, `openApi/configuration.json`, `openApi/integration.json`, or `openApi/management.json`. They are portal-only — exactly the same situation as the POST creators we already authored from screenshots in `add-entities-api` and `add-interactions-api`.

The five endpoints, as labelled in the portal:

- `POST /services/lookups/{tenantId}` — "Saves lookups"
- `POST /services/lookups/{tenantId}/{type}` — "Saves lookups for the specified lookup type"
- `PUT  /services/lookups/{tenantId}/{type}/{code}` — "Saves lookups for the specified lookup type and specified code"
- `POST /services/unmapped/{tenantId}` — "Save lookup values that are not mapped to a canonical value"
- `POST /services/unmapped/{tenantId}/{type}` — "Save lookup values that are not mapped to a canonical value for the specified lookup type"

## Goals / Non-Goals

**Goals:**
- One Storybook section, `API/Reference Data Management`, that documents the existing 6 endpoints AND the 5 new lookup/unmapped writes — 11 stories total
- Extend the existing spec/stories/mdx in place, no new directory
- Match the existing RDM convention: server `https://{environment}.reltio.com`, paths starting with the resource name (no `/services/` prefix), per-story `urlControls`

**Non-Goals:**
- Adding GET/DELETE for lookups or unmapped values — the portal's Ingest page only documents the five write operations, and our scope is parity with what the portal already shows
- Refreshing `operation.json`/`ingest.json` from the portal — they are read-only inputs

## Decisions

**1. MODIFIED capability, not new.** The existing `reference-data-management-api` capability lives in `openspec/changes/add-reference-data-management-api/specs/` (the original change is still active and not yet archived). To keep both deltas mergeable at archive time, this proposal adds new requirements under the same capability name as **ADDED Requirements**, not as a `MODIFIED` block. We are extending behaviour, not changing existing behaviour. (Per the OpenSpec authoring rules: "If adding new concerns without changing existing behavior, use ADDED instead.")

**2. Strip the `/services/` prefix.** The portal shows `/services/lookups/...` and `/services/unmapped/...`. Our existing RDM spec already drops `/services/` from `configuration` and `generators`, and we adopted the same convention for `add-entities-api` and `add-interactions-api`. Doing the same for lookups/unmapped keeps the page internally consistent.

**3. One shared `Lookup` schema.** Add a single `Lookup` to `components.schemas` with the canonical fields the portal documents (`code`, `value`, `description`, `parent`, `source`). All five new endpoints `$ref` it. `POST /lookups/{tenantId}` and `POST /lookups/{tenantId}/{type}` accept arrays of `Lookup`. `PUT /lookups/{tenantId}/{type}/{code}` accepts a single `Lookup`. `unmapped` endpoints accept arrays of strings (the unmapped values themselves).

**4. Sample bodies for stories.** Each new POST/PUT story includes a small but realistic request body so the curl preview is meaningful — e.g. one or two `Lookup` objects with `code`, `value`, `description`. Same approach as `add-entities-api` and `add-interactions-api`.

**5. Page grouping.** Add a section comment block before the new stories (e.g. `// --- Lookups ---`, `// --- Unmapped Values ---`) so the file stays scannable when it doubles in size. Match the existing comment-free style if the file currently has no section comments — but at 11 stories, light grouping helps.

## Risks / Trade-offs

- **Portal-only endpoints can drift** → Reconciled when `operation.json` / `ingest.json` are refreshed; the proposal's Impact section flags this. Same caveat as `add-entities-api`/`add-interactions-api`.
- **Schema is minimal** → Acceptable trade-off: the docs page is still useful for curl previews and Send-button testing; can be enriched without breaking existing stories.
- **Extending in place rather than splitting** → A future "Lookups API" page is conceivable, but the portal groups all of these under one "Reference Data Management" tab, so we mirror that.
