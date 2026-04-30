# data-model-api Specification

## Purpose

Data Model Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Data Model
The system SHALL provide `openApi/DataModel/DataModel.spec.json` describing all 12 Data Model endpoints across 11 paths. The spec SHALL include schemas for `Configuration` (simplified), `OperationStatus`, `MatchGroupFactorsSummary`, and `TokenizationScheme`.

#### Scenario: Spec covers all endpoints
- **WHEN** the spec file is loaded
- **THEN** it SHALL contain all 11 paths matching the developer portal's Data Model group

### Requirement: Storybook stories for Data Model endpoints
The system SHALL provide `openApi/DataModel/DataModel.stories.tsx` with 12 stories using `urlControls()` per story. Title: `API/Data Model`.

#### Scenario: Story for GET /configuration
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `GET /reltio/api/{tenantId}/configuration` with `environment` and `tenantId` controls

#### Scenario: Story for PUT /configuration
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `PUT /reltio/api/{tenantId}/configuration` with sample body

#### Scenario: Story for GET /configuration/_noInheritance
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `GET /reltio/api/{tenantId}/configuration/_noInheritance`

#### Scenario: Story for GET /configuration/{objectType}/{typeName}
- **WHEN** the user opens the story
- **THEN** it SHALL show controls for `environment`, `tenantId`, `objectType`, `typeName`

#### Scenario: Story for GET /configuration/entityTypes
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `GET /reltio/api/{tenantId}/configuration/entityTypes`

#### Scenario: Story for GET /configuration/relationTypes
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `GET /reltio/api/{tenantId}/configuration/relationTypes`

#### Scenario: Story for POST /configuration/sources
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `POST /reltio/api/{tenantId}/configuration/sources` with sample body

#### Scenario: Story for PUT /tenants/{tenantId}/cleanse
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `PUT /reltio/tenants/{tenantId}/cleanse` with sample body

#### Scenario: Story for GET /matchGroupFactorsSummary
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `GET /reltio/tools/matching/{tenantId}/matchGroupFactorsSummary`

#### Scenario: Story for GET /tokenizationSchemes/{entityType}
- **WHEN** the user opens the story
- **THEN** it SHALL show controls for `environment`, `tenantId`, `entityType`

#### Scenario: Story for GET /validateRegexpDictionaries
- **WHEN** the user opens the story
- **THEN** it SHALL show curl preview for `GET /reltio/tools/matching/{tenantId}/validateRegexpDictionaries`

### Requirement: Auto-generated docs page
The system SHALL generate `openApi/DataModel/DataModel.story.mdx` via `npm run build-api-docs`.

#### Scenario: Storybook sidebar
- **WHEN** the user opens Storybook
- **THEN** the sidebar SHALL show `API > Data Model` with all 12 endpoint stories
