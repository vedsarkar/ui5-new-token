# merge-and-unmerge-api Specification

## Purpose

Merge And Unmerge Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Merge & Unmerge
The system SHALL provide `openApi/MergeAndUnmerge/MergeAndUnmerge.spec.json` containing the two endpoints tagged `Merge & Unmerge` in `openApi/operation.json`.

#### Scenario: Spec includes both endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `POST /{tenantId}/entities/{id}/_sameAs` and `POST /{tenantId}/entities/{id}/_unmerge`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `MergeRequest` and `UnmergeRequest`

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/MergeAndUnmerge/MergeAndUnmerge.stories.tsx` exporting 2 stories.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 2 stories and the sidebar SHALL show `API > Merge & Unmerge`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/MergeAndUnmerge/MergeAndUnmerge.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/MergeAndUnmerge/MergeAndUnmerge.story.mdx` SHALL exist
