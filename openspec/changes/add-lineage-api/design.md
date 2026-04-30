## Context

The developer portal's Operate module exposes "Lineage" — three endpoints that read and delete entity change history:

- `GET /{tenantId}/entities/{id}/_changes` — paginated change history for one entity
- `GET /{tenantId}/entities/{id}/_changesWithTotal` — same plus a `total` count
- `POST /{tenantId}/entities/_deleteHistory` — bulk-delete history for entities matching a filter or list of URIs

All three carry the `Lineage` tag. Operate-only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Lineage` documenting all 3 endpoints
- Server URL `https://{environment}.reltio.com/reltio/api`, paths `/{tenantId}/...`

**Non-Goals:**
- Refreshing `operation.json` from the portal

## Decisions

**1. Strip the `/services/reltio/api` prefix.**

**2. Inclusion rule = "Lineage" tag.**

**3. Schemas: minimal `ChangeEntry` and `ChangesWithTotalResponse`.** `ChangeEntry`: `timestamp`, `userId`, `operation` (`CREATE`/`UPDATE`/`DELETE`), `attribute`, `oldValue`, `newValue`. `ChangesWithTotalResponse`: `{ total: integer, changes: ChangeEntry[] }`.

**4. Sample body for delete.** `{ "filter": "equals(type,'configuration/entityTypes/Test')" }` — bulk delete by filter.

## Risks / Trade-offs

- **History schema is inferred** → Best-effort; can be enriched later.
