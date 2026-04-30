## Context

The developer portal's Operate module exposes "Address APIs" — two GET endpoints used to look up real-world postal addresses through Reltio's address provider integration:

- `GET /services/reltio/api/{tenantId}/address/search` — full-text address search returning a paginated list of candidate addresses. Required: `Text`, `Limit`. Optional: `Container` (continuation token for pagination through a previous candidate), `Countries` (comma-separated ISO codes to scope the search), `Language`.
- `GET /services/reltio/api/{tenantId}/address/fetch` — fetch the full details for a single candidate address by its provider-specific `Id` (typically the value returned in a `search` result).

Both are tagged `Address APIs` in `openApi/operation.json`. There is no Ingest-module counterpart — Address APIs are read-only callouts to an external provider, not a place where data is written into Reltio.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Address APIs` documenting both endpoints
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths `/{tenantId}/...` — consistent with the convention adopted in `add-entities-api` and successors
- Real, useful query parameter controls: each story exposes its own query parameters via `argTypes` so users can fill them in the Storybook Controls panel and hit Send

**Non-Goals:**
- Documenting the upstream provider's response schema in detail — the portal doesn't ship one and we don't have authoritative information. Use a minimal `AddressCandidate` schema as a starting point that can be enriched later.
- Refreshing `openApi/operation.json` from the portal — the local snapshot is a read-only input.

## Decisions

**1. Single stories file with 2 stories.** Trivially correct.

**2. Strip the `/services/reltio/api` prefix.** Same convention as `add-entities-api` / `add-interactions-api` / `add-relationships-api` / `add-segments-api`. Server URL absorbs the prefix.

**3. Inclusion rule = "Address APIs" tag.** Both endpoints in scope are explicitly tagged `Address APIs` — straightforward selection.

**4. Fix invalid `type: "int"`.** `operation.json` declares the `Limit` query parameter as `type: "int"`, which is not a valid OpenAPI 3.1 type. The new spec uses `type: "integer"` (with `format: "int32"` if we want to be precise about width). This is a cosmetic correction, not a behaviour change.

**5. Query parameters become Storybook controls.** The existing apiMetaConfig + urlControls pipeline only handles path placeholders `{like-this}`. For the query parameters, we add explicit `argTypes` to each story so they appear in the Controls panel — `Text`, `Container`, `Countries`, `Language`, `Limit` for `search`; `Id` for `fetch`. Then the story builds the final URL by appending the user-provided values as a query string. This mirrors how a developer would actually try the API.

**6. Schemas: minimal `AddressCandidate`.** Define a single `AddressCandidate` schema in `components.schemas` covering the fields the search/fetch result is most likely to return — `id`, `text`, `description`, `type`, `countryCode`, `address` (street/city/region/postalCode), `latitude`, `longitude`. Returning `200` references it (`search` returns an array, `fetch` returns one). Same minimal-schema trade-off as earlier proposals.

## Risks / Trade-offs

- **Provider response schema is invented from common patterns** → If/when Reltio publishes the upstream schema, refresh `AddressCandidate`. Stories won't break — they only depend on `args.request`.
- **Query-parameter handling pattern is new in this repo** → Other API stories so far have only had path placeholders. We're introducing a small but explicit "build a query string from args" snippet inside each story. Acceptable: keeps the change self-contained and doesn't require changes to `apiMetaConfig` or `urlControls`. If the pattern repeats across future APIs (Workflow, Saved Search, etc.), we can promote it to a shared util in a follow-up.
- **`type: "int"` quietly fixed** → Not a behaviour change, but worth noting in the proposal so reviewers don't flag the divergence from `operation.json`.
