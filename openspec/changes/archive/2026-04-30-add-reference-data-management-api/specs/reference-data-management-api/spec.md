## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Reference Data Management
The system SHALL provide `openApi/ReferenceDataManagement/ReferenceDataManagement.spec.json` with 6 endpoints across 4 paths.

#### Scenario: All endpoints present
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `/services/configuration/{tenantId}`, `/services/generators/{tenantId}`, `/services/generators/{tenantId}/{name}`, `/services/generators/{tenantId}/{name}/generate`

### Requirement: 6 Storybook stories with per-story urlControls
#### Scenario: Each story shows correct controls
- **WHEN** the user opens any story
- **THEN** only the URL variables used in that story's URL appear as controls

### Requirement: Auto-generated docs page
#### Scenario: Build
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/ReferenceDataManagement/ReferenceDataManagement.story.mdx` is generated
