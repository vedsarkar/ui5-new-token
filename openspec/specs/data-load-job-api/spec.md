# data-load-job-api Specification

## Purpose

Data Load Job Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Data Load Job
The system SHALL provide `openApi/DataLoadJob/DataLoadJob.spec.json` with ~40 endpoints matching the portal's Data Load Job group under the Ingest module.

#### Scenario: All endpoint groups present
- **WHEN** the spec is loaded
- **THEN** it SHALL contain paths for mappings, custom buckets, projects, data sources, jobs, job control, storage accounts, and file operations

### Requirement: ~40 Storybook stories with per-story urlControls
The system SHALL satisfy the "~40 Storybook stories with per-story urlControls" requirement as defined by the scenarios below.

#### Scenario: Each story shows correct controls
- **WHEN** the user opens any story
- **THEN** only the URL variables used in that story's URL appear as controls

### Requirement: Auto-generated docs page
The system SHALL satisfy the "Auto-generated docs page" requirement as defined by the scenarios below.

#### Scenario: Build
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/DataLoadJob/DataLoadJob.story.mdx` is generated and sidebar shows `API > Data Load Job`
