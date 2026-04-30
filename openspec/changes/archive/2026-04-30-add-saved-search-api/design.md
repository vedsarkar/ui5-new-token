## Context

The developer portal's Operate module exposes "Saved Search" — six endpoints under `/services/reltio/api/{tenantId}/personal/...`:

- `GET /personal/allSavedSearches` — shared saved searches across all users
- `POST /personal/findSavedSearches` — find by filter/order/paging criteria
- `GET /personal/savedSearches` — current user's saved searches
- `POST /personal/savedSearches` — create one
- `PUT /personal/savedSearches/{id}` — update one
- `DELETE /personal/savedSearches/{id}` — delete one

All six carry the `Saved Search` tag. Operate-only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Saved Search` documenting all 6 endpoints
- Server URL `https://{environment}.reltio.com/reltio/api`, paths `/{tenantId}/...`

**Non-Goals:**
- Refreshing `operation.json` from the portal

## Decisions

**1. Strip the `/services/reltio/api` prefix.**

**2. Inclusion rule = "Saved Search" tag.**

**3. Schemas: `SavedSearch` and `SavedSearchList`.** `SavedSearch`: `id`, `name`, `description`, `query` (e.g. `equals(type,'configuration/entityTypes/Individual')`), `objectType`, `shared` (boolean), `owner`, `createdTime`, `updatedTime`. `SavedSearchList` is an array.

**4. Sample bodies.** Create/update: a realistic small `SavedSearch` (`name: "Active Individuals"`, `query: "..."`, `shared: false`). Find: a small filter object.

## Risks / Trade-offs

- **Schema fields are inferred** → Best-effort; can be enriched later.
