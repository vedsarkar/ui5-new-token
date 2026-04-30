## Context

The developer portal's Operate module exposes "Workflow" — 12 endpoints under `/services/reltio/api/{tenantId}/changeRequests/...` that manage Data Change Requests (DCRs). A DCR is a draft set of mutations to entities/relations; it goes through an approval flow (apply or reject) before its changes hit production data.

All 12 carry the `Workflow` tag. Operate-only.

The 12 endpoints split into five logical groups:

- Search: `GET /changeRequests` (filter by user/uri), `POST /changeRequests/_byUris`
- CRUD: `POST /changeRequests` (create empty), `GET /changeRequests/{id}`, `DELETE /changeRequests/{id}`
- Lifecycle: `POST /changeRequests/{id}/_apply`, `POST /changeRequests/{id}/_reject`
- External Info: `GET`/`POST`/`DELETE /changeRequests/{id}/_externalInfo`
- Change Items: `GET`/`DELETE /changeRequests/{id}/changes/{changeItemId}`

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Data Change Requests` covering all 12 endpoints
- Server URL `https://{environment}.reltio.com/reltio/api`, paths `/{tenantId}/...`
- Section comments grouping the page (Search / CRUD / Lifecycle / External Info / Change Items)

**Non-Goals:**
- Refreshing `operation.json` from the portal

## Decisions

**1. Strip the `/services/reltio/api` prefix.**

**2. Inclusion rule = "Workflow" tag.**

**3. Schemas: minimal but useful.**
   - `ChangeRequest`: `id`, `status` enum (`DRAFT` / `PENDING` / `APPROVED` / `REJECTED` / `APPLIED`), `userId`, `affectedUris[]`, `changes[]` (array of change items), `externalInfo` (free-form object), `createdTime`, `updatedTime`
   - `ChangeItem`: `id`, `objectURI`, `operation` (`ADD` / `UPDATE` / `DELETE`), `attribute`, `oldValue`, `newValue`
   - `ChangeRequestList`: array of `ChangeRequest`

**4. Sample bodies.** Create POST: `{}` (creates an empty DCR — body really is empty per the portal description). Apply/reject: optional comment field. External Info POST: free-form `{ "ticket": "JIRA-123", "approver": "alice" }`.

**5. Section comments.** Add `// --- Search ---`, `// --- CRUD ---`, etc. to keep the file scannable.

## Risks / Trade-offs

- **`ChangeRequest` schema is inferred** → Best-effort; can be enriched when the upstream schema is published.
- **`_externalInfo` is free-form** → Use a generic `additionalProperties: true` object so users can put anything.
