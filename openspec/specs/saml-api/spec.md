# saml-api Specification

## Purpose

Saml Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for SAML
The system SHALL provide `openApi/SAML/SAML.spec.json` with 4 endpoints on 1 path with `SAMLConfigRequest` and `SAMLConfigResponse` schemas.

#### Scenario: All CRUD methods present
- **WHEN** the spec is loaded
- **THEN** it SHALL contain GET, PUT, POST, DELETE on `/services/api/v1/security/samlconfig/{customerId}/{tenantId}`

### Requirement: 4 Storybook stories
The system SHALL satisfy the "4 Storybook stories" requirement as defined by the scenarios below.

#### Scenario: Controls show customerId and tenantId
- **WHEN** the user opens any story
- **THEN** controls show `environment`, `customerId`, `tenantId`

### Requirement: Auto-generated docs
The system SHALL satisfy the "Auto-generated docs" requirement as defined by the scenarios below.

#### Scenario: Build
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/SAML/SAML.story.mdx` is generated
