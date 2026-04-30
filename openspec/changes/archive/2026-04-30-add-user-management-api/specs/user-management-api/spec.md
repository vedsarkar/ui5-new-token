## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for User Management
The system SHALL provide `openApi/UserManagement/UserManagement.spec.json` containing the 21 endpoints tagged `User Management` in `openApi/management.json`.

#### Scenario: Spec includes all 21 endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain all 21 `(path, method)` pairs tagged `User Management` in `management.json`, transformed from `/services/oauth/users/...` to `/users/...` so the server URL absorbs the `oauth` prefix

#### Scenario: Server uses the /oauth root
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/oauth` (matching the `ClientManagement` convention) and paths SHALL start with `/users/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `User`, `UserList`, `UsernameEmailPair`, `MfaDetails`, `MfaEnrollRequest`, and `MfaQRCodeResponse`

### Requirement: One Storybook story per endpoint with section grouping
The system SHALL provide `openApi/UserManagement/UserManagement.stories.tsx` exporting 21 stories with `urlControls()` and realistic sample bodies for write methods.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 21 stories and the sidebar SHALL show `API > User Management`

#### Scenario: Stories are grouped via section comments
- **WHEN** the file is read
- **THEN** it SHALL contain section comments separating Users CRUD, Group Membership, MFA Enrollment, and Token Revocation

#### Scenario: Token revocation has no body
- **WHEN** the `PUT /users/{username}/revoketokens` story is rendered
- **THEN** `args.request.body` SHALL be omitted

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/UserManagement/UserManagement.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/UserManagement/UserManagement.story.mdx` SHALL exist
