## Context

The developer portal's Operate module exposes one "File Based Search" endpoint:

`POST /services/reltio/api/{tenantId}/valueList` — uploads a file with a list of values to a private bucket. The uploaded list can subsequently be referenced in entity searches (the typical use case is "search for entities whose `externalId` matches any value in this 10,000-item list").

Tagged `File Based Search` in `openApi/operation.json`. Operate-only.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/File Based Search` documenting the endpoint
- Server URL `https://{environment}.reltio.com/reltio/api`, path `/{tenantId}/valueList`
- Per-story `urlControls` exposing `environment` and `tenantId`

**Non-Goals:**
- Documenting the upload format in detail (likely multipart) — the portal description is terse
- Refreshing `operation.json` from the portal

## Decisions

**1. Strip the `/services/reltio/api` prefix.** Same convention.

**2. Inclusion rule = "File Based Search" tag.**

**3. Schema: minimal `ValueListUploadResponse` with `id`, `filename`, `valueCount`.** Best-effort — the actual response schema is not in `operation.json`.

**4. Sample body.** Since the endpoint takes a file upload (multipart/form-data in practice), we document a JSON body as a placeholder: `{ "values": ["v1", "v2", "v3"] }`. The Send button won't actually upload a file from Storybook, but the curl preview teaches the shape.

## Risks / Trade-offs

- **Real upload is multipart** → Documented JSON body is a teaching aid, not a working request. Acceptable given Storybook's role as a docs surface, not a file picker.
