## Why

The current API documentation grouping in Storybook does not match the official Reltio Developer Portal (developer.reltio.com). The portal groups endpoints by domain (Client Management, Customer Management, Data Model, etc.), while our Storybook uses a flat structure by source spec file. This makes it hard for developers to cross-reference between the portal and our interactive docs. Aligning the grouping improves discoverability and consistency. Starting with the **Client Management** group as the first step.

## What Changes

- Extract all 7 Client Management endpoints from `api/configuration.json` into a dedicated OpenAPI 3.1 spec at `api/ClientManagement/clientmanagement.spec.json`
- Create `api/ClientManagement/ClientManagement.stories.tsx` with one story per endpoint (GET/POST/GET/PUT/DELETE clients, GET multitokens, PUT revoketokens)
- Run `npm run build-api-docs` to generate `api/ClientManagement/ClientManagement.story.mdx`
- Title the Storybook section `API/Client Management` to match the portal's flat group list

## Capabilities

### New Capabilities
- `client-management-api`: Storybook API documentation section for the Client Management group, covering CRUD operations on OAuth clients, multitoken status, and token revocation

### Modified Capabilities

## Impact

- New directory: `api/ClientManagement/` with 3 files (spec, stories, auto-generated mdx)
- No changes to existing API docs — this is additive
- Sets the pattern for migrating remaining Configuration groups (Customer Management, Data Model, etc.)
