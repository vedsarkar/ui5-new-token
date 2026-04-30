## Why

Next API docs group from the developer portal. SAML configuration covers full CRUD on SAML SSO settings per customer/tenant.

## What Changes

- Create `openApi/SAML/SAML.spec.json` — 4 endpoints (GET/PUT/POST/DELETE) on 1 path
- Create `openApi/SAML/SAML.stories.tsx` — 4 stories
- Generate docs. Title: `API/SAML`

## Capabilities

### New Capabilities
- `saml-api`: Storybook API docs for SAML — retrieve, update, add, delete SAML configuration (4 endpoints)

### Modified Capabilities

## Impact

- New directory: `openApi/SAML/`. Additive only.
