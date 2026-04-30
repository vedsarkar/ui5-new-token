# client-management-api Specification

## Purpose

Client Management Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Client Management
The system SHALL provide an OpenAPI 3.1 JSON spec at `api/ClientManagement/clientmanagement.spec.json` that describes all 7 Client Management endpoints from the developer portal. The spec SHALL define 4 paths covering `/services/oauth/customers/{customerId}/clients`, `/services/oauth/customers/{customerId}/clients/{clientId}`, `/services/oauth/customers/{customerId}/clients/{clientId}/multitokens`, and `/services/oauth/customers/{customerId}/clients/{clientId}/revoketokens`. The spec SHALL include `components.schemas` with `ClientDetailsWrapper`, `AuthClientDetails`, `ReltioUserPermissions`, `ClientMultitokenStats`, and `OperationStatus`.

#### Scenario: Spec file structure
- **WHEN** the spec file is loaded
- **THEN** it SHALL contain `openapi: "3.1.0"`, `info.title: "Client Management API"`, a `servers` array with `{environment}` variable, and all 4 paths with their operations

#### Scenario: Schema references
- **WHEN** an endpoint response or request body references a schema
- **THEN** it SHALL use `$ref` to `#/components/schemas/<Name>` so the OpenApi block renders Data Models

### Requirement: Storybook stories for Client Management endpoints
The system SHALL provide `api/ClientManagement/ClientManagement.stories.tsx` with one exported story per endpoint. The stories file SHALL use `apiMetaConfig` with the spec import and `preview.meta` with title `API/Client Management`.

#### Scenario: Story for GET /clients
- **WHEN** the user opens the "GET /clients" story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}/clients` with method GET

#### Scenario: Story for POST /clients
- **WHEN** the user opens the "POST /clients" story
- **THEN** it SHALL display an interactive curl preview for `POST /services/oauth/customers/{customerId}/clients` with method POST and a sample request body

#### Scenario: Story for GET /clients/{clientId}
- **WHEN** the user opens the "GET /clients/{clientId}" story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}/clients/{clientId}` with method GET

#### Scenario: Story for PUT /clients/{clientId}
- **WHEN** the user opens the "PUT /clients/{clientId}" story
- **THEN** it SHALL display an interactive curl preview for `PUT /services/oauth/customers/{customerId}/clients/{clientId}` with method PUT and a sample request body

#### Scenario: Story for DELETE /clients/{clientId}
- **WHEN** the user opens the "DELETE /clients/{clientId}" story
- **THEN** it SHALL display an interactive curl preview for `DELETE /services/oauth/customers/{customerId}/clients/{clientId}` with method DELETE

#### Scenario: Story for GET /clients/{clientId}/multitokens
- **WHEN** the user opens the "GET /clients/{clientId}/multitokens" story
- **THEN** it SHALL display an interactive curl preview for `GET /services/oauth/customers/{customerId}/clients/{clientId}/multitokens` with method GET

#### Scenario: Story for PUT /clients/{clientId}/revoketokens
- **WHEN** the user opens the "PUT /clients/{clientId}/revoketokens" story
- **THEN** it SHALL display an interactive curl preview for `PUT /services/oauth/customers/{customerId}/clients/{clientId}/revoketokens` with method PUT

### Requirement: Auto-generated docs page
The system SHALL generate `api/ClientManagement/ClientManagement.story.mdx` via `npm run build-api-docs`. The docs page SHALL render the API title, description, server variables, Data Models from the spec schemas, and all interactive stories.

#### Scenario: Docs page generation
- **WHEN** `npm run build-api-docs` is executed
- **THEN** `api/ClientManagement/ClientManagement.story.mdx` SHALL be created with `<OpenApi>` and `<Stories>` blocks

#### Scenario: Storybook sidebar
- **WHEN** the user opens Storybook
- **THEN** the sidebar SHALL show `API > Client Management` with all 7 endpoint stories nested under it
