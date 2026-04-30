## ADDED Requirements

### Requirement: Unified OpenAPI 3.1 spec for Relationships
The system SHALL provide `openApi/Relationships/Relationships.spec.json` that combines, into a single OpenAPI 3.1 document, every endpoint tagged `Relationships` in `openApi/operation.json` together with the one POST creation endpoint documented in the developer portal's Ingest module (`POST /relations`).

#### Scenario: Spec includes the Ingest creation endpoint
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `POST /{tenantId}/relations` ("Save Relationships API creates relationships")

#### Scenario: Spec includes all "Relationships" tagged endpoints from operation.json
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `GET /{tenantId}/relations`, `GET /{tenantId}/relations/{id}`, and `DELETE /{tenantId}/relations/{id}`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...` (no `/services/reltio/api` prefix)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `Relation` and `RelationList`, and successful responses SHALL `$ref` one of them. `Relation` SHALL declare at minimum `uri`, `type`, `startObject`, `endObject`, `attributes`, and `crosswalks` properties

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/Relationships/Relationships.stories.tsx` exporting one story per endpoint listed in `Relationships.spec.json`, with `urlControls()` spread before `args` so each story shows only the URL placeholders used in its own URL template.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 4 stories, one per `(path, method)` pair in `Relationships.spec.json`

#### Scenario: Each story shows only its own controls
- **WHEN** the user opens a story whose URL is `https://{environment}.reltio.com/reltio/api/{tenantId}/relations`
- **THEN** the Controls panel SHALL show `environment` and `tenantId` only — and SHALL NOT show `{id}`

#### Scenario: POST has a sample body
- **WHEN** the `POST /relations` story is rendered
- **THEN** `args.request.body` SHALL be set to an array containing at least one relation object with `type`, `startObject`, and `endObject` so the curl preview is meaningful

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Relationships` with the title `"API/Relationships"` from `meta.story()`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Relationships/Relationships.story.mdx` produced by `npm run build-api-docs` that ties together `<OpenApi spec={...} />` and the `<Stories />` block.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Relationships/Relationships.story.mdx` SHALL exist and `npm run dev` SHALL render the page under `API > Relationships` with the API description, server table, Data Models, and one interactive section per story
