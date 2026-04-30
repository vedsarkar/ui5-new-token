# life-cycle-actions-api Specification

## Purpose

Life Cycle Actions Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Life Cycle Actions
The system SHALL provide `openApi/LifeCycleActions/LifeCycleActions.spec.json` with 6 endpoints across 4 paths.

#### Scenario: All endpoints present
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `/actions`, `/actions/{name}`, `/actions/{name}/{hookName}`, `/execute/{hook}`

### Requirement: 6 Storybook stories with per-story urlControls
The system SHALL provide stories for: GET /actions, POST /actions, GET /actions/{name}, DELETE /actions/{name}, POST /actions/{name}/{hookName}, POST /execute/{hook}.

#### Scenario: Each story shows correct controls
- **WHEN** the user opens any story
- **THEN** only the URL variables used in that story's URL appear as controls

### Requirement: Auto-generated docs page
The system SHALL satisfy the "Auto-generated docs page" requirement as defined by the scenarios below.

#### Scenario: Build
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/LifeCycleActions/LifeCycleActions.story.mdx` is generated
