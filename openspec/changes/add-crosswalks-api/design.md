## Context

The developer portal's Operate module exposes "Crosswalks" — four endpoints that mutate the source-system contributions attached to entities and relations:

- `POST /{tenantId}/{objectType}/{objectId}/crosswalks` — adds new crosswalks
- `PUT /{tenantId}/{objectType}/{objectId}/crosswalks/{id}` — updates a single crosswalk's value
- `PUT /{tenantId}/{objectType}/{objectId}/crosswalks/{id}/{attribute}` — updates a date attribute on a crosswalk (e.g. `createDate`, `updateDate`)
- `POST /{tenantId}/entities/{objectId}/crosswalks/{id}/_endDateAndMoveRelatedRelationXws` — convenience endpoint that sets a delete date AND reattributes related relation crosswalks to a new contributor

All four are tagged `Crosswalks` in `openApi/operation.json`. Three use a generic `{objectType}` (e.g. `entities`, `relations`); the end-date-and-move endpoint is specifically scoped to entities.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Crosswalks` documenting all 4 endpoints
- Server URL `https://{environment}.reltio.com/reltio/api`, paths `/{tenantId}/...`
- Per-story `urlControls` with the right placeholders for each endpoint

**Non-Goals:**
- Documenting all valid `{attribute}` names — that depends on the tenant's L3 configuration
- Refreshing `operation.json` from the portal

## Decisions

**1. Single stories file with 4 stories.**

**2. Strip the `/services/reltio/api` prefix.** Same convention.

**3. Inclusion rule = "Crosswalks" tag.**

**4. Schemas: minimal `Crosswalk`.** Same shape used by `Entity` / `Relation` / `Interaction` schemas in the prior changes (`type`, `value`, `sourceTable`, `createDate`, `updateDate`). The two POSTs accept arrays of `Crosswalk`; the two PUTs accept a single `Crosswalk` body.

**5. Sample bodies.** A realistic Reltio source crosswalk (`type: "configuration/sources/Reltio"`, `value: "external-id-1"`).

## Risks / Trade-offs

- **`{objectType}` is free-text** → User must remember the valid values (`entities`, `relations`). Description text mentions both.
