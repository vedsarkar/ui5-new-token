## Why

The developer portal's Operate module exposes an "Attribute Verification" group with three POST endpoints used to validate email and phone attributes — one entity-scoped verifier (`/entities/{id}/attributeVerification/_verify`) and two batch verifiers (`/verification/email/_batchVerify`, `/verification/phone/_batchVerify`). The Storybook docs site has no page for them yet — developers integrating data quality have no first-class reference.

Unlike the previously documented APIs (Entities, Interactions, Relationships, Segments), Attribute Verification is **Operate-only** — there is no Ingest-module counterpart to merge in.

## What Changes

- Create `openApi/AttributeVerification/AttributeVerification.spec.json` — an OpenAPI 3.1 spec containing the three endpoints tagged `Attribute Verification` in `openApi/operation.json`:
  - `POST /entities/{id}/attributeVerification/_verify` — runs verifiers on email/phone attributes of a single entity (with `forceVerify` and `clientFilter` controls)
  - `POST /verification/email/_batchVerify` — batch-verifies an array of `{ email }` objects
  - `POST /verification/phone/_batchVerify` — batch-verifies an array of `{ phone, ctry? }` objects (E.164 or national format)
- Create `openApi/AttributeVerification/AttributeVerification.stories.tsx` — one Storybook story per endpoint with `urlControls` for path placeholders and realistic sample bodies
- Generate `openApi/AttributeVerification/AttributeVerification.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Attribute Verification`
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths start with `/{tenantId}/...` (matching the convention from `add-entities-api` and successors)

## Capabilities

### New Capabilities
- `attribute-verification-api`: Storybook API documentation for the Attribute Verification API — entity-level verification (`POST /entities/{id}/attributeVerification/_verify`) and the batch verifiers for email (`POST /verification/email/_batchVerify`) and phone (`POST /verification/phone/_batchVerify`)

### Modified Capabilities

## Impact

- New directory: `openApi/AttributeVerification/`. Additive only — no existing files change.
- Adds 3 stories. All three endpoints exist in `openApi/operation.json` so no screenshot-only authoring this time.
- No spec hygiene fixes required.
