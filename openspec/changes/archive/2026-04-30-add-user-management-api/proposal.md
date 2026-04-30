## Why

The developer portal's Manage module exposes a "User Management" group with 21 endpoints used to manage users in a Reltio customer — list/get/create/update/delete users, manage their group membership, run the multi-factor authentication enrollment lifecycle (TOTP/QRCode and email), and revoke tokens. The Storybook docs site has no page for them yet — admin tooling integrators have no first-class reference.

This is the user-side counterpart to the existing `API/Client Management` page (which manages OAuth application clients). Both live under the `/oauth` subsystem.

## What Changes

- Create `openApi/UserManagement/UserManagement.spec.json` — an OpenAPI 3.1 spec containing the 21 endpoints tagged `User Management` in `openApi/management.json`, organized into four logical groups:
  - **Users CRUD** — `GET /users`, `POST /users`, `GET /users/{username}`, `PUT /users/{username}`, `DELETE /users/{username}`
  - **Group Membership** — `GET /users/groups/{groupId}`, `GET /users/{username}/groups`, `PUT /users/{username}/groups`, `GET /users/tenants/{tenantId}` (lookup by tenant)
  - **MFA Enrollment** — 9 endpoints under `/users/mfa/...` and `/users/{username}/mfa/...` (associate / enroll / verify / reset for QRCode and Email; with and without state_token; self vs admin-initiated)
  - **Token Revocation** — `PUT /users/{username}/revoketokens`
- Create `openApi/UserManagement/UserManagement.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies for write methods, organized via section comments
- Generate `openApi/UserManagement/UserManagement.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/User Management`
- Server URL: `https://{environment}.reltio.com/oauth` (matches the existing `API/Client Management` convention); paths start with `/users/...`

## Capabilities

### New Capabilities
- `user-management-api`: Storybook API documentation for the User Management API — users CRUD, group membership, MFA enrollment lifecycle (TOTP/QRCode + email, with and without state_token, self + admin), token revocation

### Modified Capabilities

## Impact

- New directory: `openApi/UserManagement/`. Additive only.
- Adds 21 stories.
- Server URL convention matches `ClientManagement` (`/oauth` prefix absorbed into `servers[0].url`); paths in this docs site differ from the verbatim `/services/oauth/users/...` shown in `management.json` because `services/oauth` is internal routing — the actual production endpoint lives at `/oauth/users/...`. Documented in design.md.
