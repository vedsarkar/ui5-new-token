## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for SAML
The system SHALL provide `openApi/SAML/SAML.spec.json` with 4 endpoints on 1 path with `SAMLConfigRequest` and `SAMLConfigResponse` schemas.

#### Scenario: All CRUD methods present
- **WHEN** the spec is loaded
- **THEN** it SHALL contain GET, PUT, POST, DELETE on `/services/api/v1/security/samlconfig/{customerId}/{tenantId}`

### Requirement: 4 Storybook stories
#### Scenario: Controls show customerId and tenantId
- **WHEN** the user opens any story
- **THEN** controls show `environment`, `customerId`, `tenantId`

### Requirement: Auto-generated docs
#### Scenario: Build
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/SAML/SAML.story.mdx` is generated
