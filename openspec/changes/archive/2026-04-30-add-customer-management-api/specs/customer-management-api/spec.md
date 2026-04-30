## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Customer Management
The system SHALL provide an OpenAPI 3.1 JSON spec at `api/CustomerManagement/customermanagement.spec.json` describing all 14 Customer Management endpoints. The spec SHALL define 7 paths and include `components.schemas` with `Customer`, `PasswordPolicy`, `MFAConfig`, `RolesPermissions`, `ReltioServiceResourcePermissions`, and `OperationStatus`.

#### Scenario: Spec file structure
- **WHEN** the spec file is loaded
- **THEN** it SHALL contain `openapi: "3.1.0"`, `info.title: "Customer Management API"`, a `servers` array with `{environment}` variable, and all 7 paths with their operations

#### Scenario: Schema references
- **WHEN** an endpoint response or request body references a schema
- **THEN** it SHALL use `$ref` to `#/components/schemas/<Name>` so the OpenApi block renders Data Models

### Requirement: Storybook stories for Customer Management endpoints
The system SHALL provide `api/CustomerManagement/CustomerManagement.stories.tsx` with one exported story per endpoint (14 total). The stories file SHALL use `apiMetaConfig` with the spec import and `preview.meta` with title `API/Customer Management`.

#### Scenario: Story for GET /{customerId}
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}`

#### Scenario: Story for PUT /{customerId}
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `PUT /services/oauth/customers/{customerId}` with a sample request body

#### Scenario: Story for GET /{customerId}/mfa
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}/mfa`

#### Scenario: Story for PUT /{customerId}/mfa
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `PUT /services/oauth/customers/{customerId}/mfa` with a sample request body

#### Scenario: Story for GET /{customerId}/passwordPolicy
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}/passwordPolicy`

#### Scenario: Story for PUT /{customerId}/passwordPolicy
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `PUT /services/oauth/customers/{customerId}/passwordPolicy` with a sample request body

#### Scenario: Story for GET /{customerId}/roles
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}/roles`

#### Scenario: Story for PUT /{customerId}/roles
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `PUT /services/oauth/customers/{customerId}/roles` with a sample request body

#### Scenario: Story for POST /{customerId}/roles
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `POST /services/oauth/customers/{customerId}/roles` with a sample request body

#### Scenario: Story for POST /{customerId}/roles/permissions
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `POST /services/oauth/customers/{customerId}/roles/permissions` with a sample request body

#### Scenario: Story for GET /{customerId}/roles/permissions/{roleName}
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}/roles/permissions/{roleName}`

#### Scenario: Story for PUT /{customerId}/roles/permissions/{roleName}
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `PUT /services/oauth/customers/{customerId}/roles/permissions/{roleName}` with a sample request body

#### Scenario: Story for DELETE /{customerId}/roles/permissions/{roleName}
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `DELETE /services/oauth/customers/{customerId}/roles/permissions/{roleName}`

#### Scenario: Story for GET /roles/permissions/{roleName} (system)
- **WHEN** the user opens the story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/roles/permissions/{roleName}`

### Requirement: Auto-generated docs page
The system SHALL generate `api/CustomerManagement/CustomerManagement.story.mdx` via `npm run build-api-docs`.

#### Scenario: Docs page generation
- **WHEN** `npm run build-api-docs` is executed
- **THEN** `api/CustomerManagement/CustomerManagement.story.mdx` SHALL be created with `<OpenApi>` and `<Stories>` blocks

#### Scenario: Storybook sidebar
- **WHEN** the user opens Storybook
- **THEN** the sidebar SHALL show `API > Customer Management` with all 14 endpoint stories nested under it
