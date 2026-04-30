# entities-api Specification

## Purpose

Entities Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: Unified OpenAPI 3.1 spec for Entities
The system SHALL provide `openApi/Entities/Entities.spec.json` that combines, into a single OpenAPI 3.1 document, every endpoint tagged `Entities` in `openApi/operation.json` together with the two POST creation endpoints documented in the developer portal's Ingest module (`POST /services/reltio/api/{tenantId}/entities` and `POST /services/reltio/api/{tenantId}/entities/_conditional`).

#### Scenario: Spec includes the Ingest creation endpoints
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `POST /services/reltio/api/{tenantId}/entities` ("Save Entities") and `POST /services/reltio/api/{tenantId}/entities/_conditional` ("Search Before Create Aggregated")

#### Scenario: Spec includes all "Entities" tagged endpoints from operation.json
- **WHEN** the spec is loaded
- **THEN** it SHALL contain every path/method pair tagged `Entities` in `openApi/operation.json`, including the `/segments/{id}/entities*` reads

#### Scenario: Spec excludes non-Entities tagged endpoints
- **WHEN** the spec is loaded
- **THEN** it SHALL NOT contain endpoints whose only tag in `openApi/operation.json` is `Match`, `Lineage`, `Merge & Unmerge`, `Crosswalks`, `Graph`, `Interactions`, `Common Assets`, `Attribute Verification`, `Segments`, or `Export`

#### Scenario: Server uses environment + tenantId variables
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com` and `paths` SHALL start with `/services/reltio/api/{tenantId}/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `Entity`, `EntityList`, and `EntitySearchResponse`, and successful responses SHALL `$ref` one of them

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/Entities/Entities.stories.tsx` exporting one story per endpoint listed in `Entities.spec.json`, with `urlControls()` spread before `args` so each story shows only the URL placeholders used in its own URL template.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the number of exported stories SHALL equal the number of `(path, method)` pairs in `Entities.spec.json`

#### Scenario: Each story shows only its own controls
- **WHEN** the user opens a story whose URL is `https://{environment}.reltio.com/reltio/api/{tenantId}/entities`
- **THEN** the Controls panel SHALL show `environment` and `tenantId` only — and SHALL NOT show `{id}`, `{reltioId}`, or `{crosswalkValue}`

#### Scenario: Body present for write methods
- **WHEN** a story's `args.request.method` is `POST`, `PUT`, or `PATCH`
- **THEN** `args.request.body` SHALL be set so the curl preview and Send button include a request body

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Entities` with the title `"API/Entities"` from `meta.story()`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Entities/Entities.story.mdx` produced by `npm run build-api-docs` that ties together `<OpenApi spec={...} />` and the `<Stories />` block.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Entities/Entities.story.mdx` SHALL exist and `npm run dev` SHALL render the page under `API > Entities` with the API description, server table, Data Models, and one interactive section per story
