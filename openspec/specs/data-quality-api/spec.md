# data-quality-api Specification

## Purpose

Data Quality Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Data Quality
The system SHALL provide `openApi/DataQuality/DataQuality.spec.json` containing the single endpoint tagged `Data Quality` in `openApi/operation.json`.

#### Scenario: Spec includes the endpoint
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `POST /{tenantId}/entityType/{entityTypeID}/ml/dataQuality/v1/attributeLevel/timeSeries/` (with the trailing slash preserved)

#### Scenario: Server uses the root URL
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com` (NOT `https://{environment}.reltio.com/reltio/api`) because the endpoint does not live under the `/reltio/api` root

#### Scenario: tenant placeholder is normalized
- **WHEN** the spec is loaded
- **THEN** the path SHALL use `{tenantId}` (NOT `{tenant}` as in `operation.json`)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include `DataQualityTimeSeriesRequest` and `DataQualityTimeSeriesResponse`

### Requirement: Storybook story
The system SHALL provide `openApi/DataQuality/DataQuality.stories.tsx` exporting one story for the endpoint, with `urlControls()` exposing `environment`, `tenantId`, and `entityTypeID` controls, and a sample request body.

#### Scenario: Story count and controls
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export exactly 1 story whose Controls panel shows `environment`, `tenantId`, and `entityTypeID`

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Data Quality`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/DataQuality/DataQuality.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/DataQuality/DataQuality.story.mdx` SHALL exist
