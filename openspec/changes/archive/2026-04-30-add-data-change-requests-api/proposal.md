## Why

The developer portal's Operate module exposes a "Workflow" group with 12 endpoints used to manage Data Change Requests — proposals to mutate entities/relations that go through an approval workflow before being applied. The Storybook docs site has no page for them yet — developers integrating approval workflows have no first-class reference. Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/DataChangeRequests/DataChangeRequests.spec.json` — an OpenAPI 3.1 spec containing the 12 endpoints tagged `Workflow` in `openApi/operation.json`:
  - **Search** — `GET /changeRequests`, `POST /changeRequests/_byUris`
  - **CRUD** — `POST /changeRequests` (create empty), `GET /changeRequests/{id}`, `DELETE /changeRequests/{id}`
  - **Lifecycle** — `POST /changeRequests/{id}/_apply`, `POST /changeRequests/{id}/_reject`
  - **External Info** — `GET`/`POST`/`DELETE /changeRequests/{id}/_externalInfo`
  - **Change Items** — `GET`/`DELETE /changeRequests/{id}/changes/{changeItemId}`
- Create `openApi/DataChangeRequests/DataChangeRequests.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies for the writes
- Generate `openApi/DataChangeRequests/DataChangeRequests.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Data Change Requests`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...`

## Capabilities

### New Capabilities
- `data-change-requests-api`: Storybook API documentation for the Workflow API — Data Change Requests with search, CRUD, apply/reject lifecycle, external info, and change-item access

### Modified Capabilities

## Impact

- New directory: `openApi/DataChangeRequests/`. Additive only.
- Adds 12 stories.
