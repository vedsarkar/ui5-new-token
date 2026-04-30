# graph-api Specification

## Purpose

Graph Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Graph
The system SHALL provide `openApi/Graph/Graph.spec.json` containing the single endpoint tagged `Graph` in `openApi/operation.json`.

#### Scenario: Spec includes the endpoint
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `POST /{tenantId}/entities/{id}/_connections`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and the path SHALL start with `/{tenantId}/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `ConnectionsResponse` with a `connections` array of `{ uri, relationType, direction }` items

### Requirement: Storybook story
The system SHALL provide `openApi/Graph/Graph.stories.tsx` exporting one story with `urlControls()` exposing `environment`, `tenantId`, `id` and a sample body.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 1 story and the sidebar SHALL show `API > Graph`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Graph/Graph.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Graph/Graph.story.mdx` SHALL exist
