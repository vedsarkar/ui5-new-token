## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Data Load Job
The system SHALL provide `openApi/DataLoadJob/DataLoadJob.spec.json` with ~40 endpoints matching the portal's Data Load Job group under the Ingest module.

#### Scenario: All endpoint groups present
- **WHEN** the spec is loaded
- **THEN** it SHALL contain paths for mappings, custom buckets, projects, data sources, jobs, job control, storage accounts, and file operations

### Requirement: ~40 Storybook stories with per-story urlControls
#### Scenario: Each story shows correct controls
- **WHEN** the user opens any story
- **THEN** only the URL variables used in that story's URL appear as controls

### Requirement: Auto-generated docs page
#### Scenario: Build
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/DataLoadJob/DataLoadJob.story.mdx` is generated and sidebar shows `API > Data Load Job`
