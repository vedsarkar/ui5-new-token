# data-validation-function-api Specification

## Purpose

Data Validation Function Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Data Validation Function
The system SHALL provide `openApi/DataValidationFunction/DataValidationFunction.spec.json` describing 7 endpoints across 3 paths with `TenantFunctions`, `ObjectFunctions`, and `Function` schemas.

#### Scenario: All endpoints present
- **WHEN** the spec is loaded
- **THEN** it SHALL contain paths for `/dataValidationFunctions`, `/dataValidationFunctions/{functionURI}`, and `/dataValidationFunctions/{objectType}/{object}`

### Requirement: Storybook stories with per-story urlControls
The system SHALL provide 7 stories in `openApi/DataValidationFunction/DataValidationFunction.stories.tsx` with title `API/Data Validation Function`.

#### Scenario: GET /dataValidationFunctions
- **WHEN** the user opens the story
- **THEN** controls show `environment`, `tenantId`

#### Scenario: GET /dataValidationFunctions/{functionURI}
- **WHEN** the user opens the story
- **THEN** controls show `environment`, `tenantId`, `functionURI`

#### Scenario: PUT /dataValidationFunctions/{functionURI}
- **WHEN** the user opens the story
- **THEN** controls show `environment`, `tenantId`, `functionURI` with sample body

#### Scenario: DELETE /dataValidationFunctions/{functionURI}
- **WHEN** the user opens the story
- **THEN** controls show `environment`, `tenantId`, `functionURI`

#### Scenario: GET /dataValidationFunctions/{objectType}/{object}
- **WHEN** the user opens the story
- **THEN** controls show `environment`, `tenantId`, `objectType`, `object`

#### Scenario: POST /dataValidationFunctions/{objectType}/{object}
- **WHEN** the user opens the story
- **THEN** controls show `environment`, `tenantId`, `objectType`, `object` with sample body

#### Scenario: DELETE /dataValidationFunctions/{objectType}/{object}
- **WHEN** the user opens the story
- **THEN** controls show `environment`, `tenantId`, `objectType`, `object`

### Requirement: Auto-generated docs page
The system SHALL satisfy the "Auto-generated docs page" requirement as defined by the scenarios below.

#### Scenario: Build and sidebar
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/DataValidationFunction/DataValidationFunction.story.mdx` is generated and sidebar shows `API > Data Validation Function`
