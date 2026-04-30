# segments-api Specification

## Purpose

Segments Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: Unified OpenAPI 3.1 spec for Segments
The system SHALL provide `openApi/Segments/Segments.spec.json` that combines, into a single OpenAPI 3.1 document, every endpoint tagged `Segments` in `openApi/operation.json` together with the one POST creation endpoint documented in the developer portal's Ingest module (`POST /segments`).

#### Scenario: Spec includes the Ingest creation endpoint
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `POST /{tenantId}/segments` ("Creates a collection of segments in a tenant")

#### Scenario: Spec includes all "Segments" tagged endpoints from operation.json
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `GET /{tenantId}/segments`, `GET /{tenantId}/segments/{id}`, `DELETE /{tenantId}/segments/{id}`, `PUT /{tenantId}/segments/{id}/enable`, `PUT /{tenantId}/segments/{id}/disable`, and `GET /{tenantId}/entities/{id}/segments`

#### Scenario: Spec excludes /segments/{id}/entities* endpoints
- **WHEN** the spec is loaded
- **THEN** it SHALL NOT contain `GET /{tenantId}/segments/{id}/entities`, `POST /{tenantId}/segments/{id}/entities/scan`, or `GET /{tenantId}/segments/{id}/entities/total` (those carry the `Entities` tag and live in `openApi/Entities`)

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...` (no `/services/reltio/api` prefix)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `Segment` and `SegmentList`. `Segment` SHALL declare at minimum `uri`, `name`, `description`, `objectType`, `condition`, and `status` (enum `ENABLED` / `DISABLED`)

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/Segments/Segments.stories.tsx` exporting one story per endpoint listed in `Segments.spec.json`, with `urlControls()` spread before `args` so each story shows only the URL placeholders used in its own URL template.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 7 stories, one per `(path, method)` pair in `Segments.spec.json`

#### Scenario: Each story shows only its own controls
- **WHEN** the user opens the `GET /segments` story
- **THEN** the Controls panel SHALL show `environment` and `tenantId` only — and SHALL NOT show `{id}`

#### Scenario: POST has a sample body
- **WHEN** the `POST /segments` story is rendered
- **THEN** `args.request.body` SHALL be set to an array containing at least one segment object with `name`, `objectType`, and `condition` so the curl preview is meaningful

#### Scenario: Enable/disable have no body
- **WHEN** the `PUT /segments/{id}/enable` or `PUT /segments/{id}/disable` story is rendered
- **THEN** `args.request.method` SHALL be `"PUT"` and `args.request.body` SHALL be omitted

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Segments` with the title `"API/Segments"` from `meta.story()`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Segments/Segments.story.mdx` produced by `npm run build-api-docs` that ties together `<OpenApi spec={...} />` and the `<Stories />` block.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Segments/Segments.story.mdx` SHALL exist and `npm run dev` SHALL render the page under `API > Segments` with the API description, server table, Data Models, and one interactive section per story
