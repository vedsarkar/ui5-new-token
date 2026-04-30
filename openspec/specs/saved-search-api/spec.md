# saved-search-api Specification

## Purpose

Saved Search Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Saved Search
The system SHALL provide `openApi/SavedSearch/SavedSearch.spec.json` containing the six endpoints tagged `Saved Search` in `openApi/operation.json`.

#### Scenario: Spec includes all six endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `GET /{tenantId}/personal/allSavedSearches`, `POST /{tenantId}/personal/findSavedSearches`, `GET /{tenantId}/personal/savedSearches`, `POST /{tenantId}/personal/savedSearches`, `PUT /{tenantId}/personal/savedSearches/{id}`, and `DELETE /{tenantId}/personal/savedSearches/{id}`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `SavedSearch` (with `id`, `name`, `query`, `objectType`, `shared`) and `SavedSearchList`

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/SavedSearch/SavedSearch.stories.tsx` exporting 6 stories with `urlControls()` and sample bodies for the write methods.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 6 stories and the sidebar SHALL show `API > Saved Search`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/SavedSearch/SavedSearch.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/SavedSearch/SavedSearch.story.mdx` SHALL exist
