# crosswalks-api Specification

## Purpose

Crosswalks Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Crosswalks
The system SHALL provide `openApi/Crosswalks/Crosswalks.spec.json` containing the four endpoints tagged `Crosswalks` in `openApi/operation.json`.

#### Scenario: Spec includes all four endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `POST /{tenantId}/{objectType}/{objectId}/crosswalks`, `PUT /{tenantId}/{objectType}/{objectId}/crosswalks/{id}`, `PUT /{tenantId}/{objectType}/{objectId}/crosswalks/{id}/{attribute}`, and `POST /{tenantId}/entities/{objectId}/crosswalks/{id}/_endDateAndMoveRelatedRelationXws`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `Crosswalk` (with `type`, `value`, `sourceTable`, `createDate`, `updateDate`)

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/Crosswalks/Crosswalks.stories.tsx` exporting one story per endpoint, with `urlControls()` spread before `args` so each story shows only the URL placeholders used in its own URL template, and including a sample `args.request.body` for write methods.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 4 stories

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Crosswalks` with the title `"API/Crosswalks"`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Crosswalks/Crosswalks.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Crosswalks/Crosswalks.story.mdx` SHALL exist
