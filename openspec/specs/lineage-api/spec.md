# lineage-api Specification

## Purpose

Lineage Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Lineage
The system SHALL provide `openApi/Lineage/Lineage.spec.json` containing the three endpoints tagged `Lineage` in `openApi/operation.json`.

#### Scenario: Spec includes all three endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `GET /{tenantId}/entities/{id}/_changes`, `GET /{tenantId}/entities/{id}/_changesWithTotal`, and `POST /{tenantId}/entities/_deleteHistory`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `ChangeEntry` and `ChangesWithTotalResponse`

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/Lineage/Lineage.stories.tsx` exporting 3 stories.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 3 stories and the sidebar SHALL show `API > Lineage`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Lineage/Lineage.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Lineage/Lineage.story.mdx` SHALL exist
