## Why

Continuing the API documentation reorganization to match the Reltio Developer Portal. The Customer Management group is the second group from the portal's Configuration module, covering customer CRUD, MFA configuration, password policies, roles management, and role permissions.

## What Changes

- Extract all 14 Customer Management endpoints (7 paths) from `api/configuration.json` into a dedicated OpenAPI 3.1 spec at `api/CustomerManagement/customermanagement.spec.json`
- Create `api/CustomerManagement/CustomerManagement.stories.tsx` with one story per endpoint
- Run `npm run build-api-docs` to generate `api/CustomerManagement/CustomerManagement.story.mdx`
- Title the Storybook section `API/Customer Management` (flat, matching the portal)

## Capabilities

### New Capabilities
- `customer-management-api`: Storybook API documentation section for the Customer Management group, covering customer details, MFA, password policy, roles, and role permissions (14 endpoints)

### Modified Capabilities

## Impact

- New directory: `api/CustomerManagement/` with 3 files (spec, stories, auto-generated mdx)
- No changes to existing API docs — additive only
- Follows the same pattern established by `api/ClientManagement/`
