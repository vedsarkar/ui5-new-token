## ADDED Requirements

### Requirement: Lookup write endpoints in the OpenAPI spec
The system SHALL extend `openApi/ReferenceDataManagement/ReferenceDataManagement.spec.json` with three lookup write endpoints documented in the developer portal's Ingest module: `POST /lookups/{tenantId}`, `POST /lookups/{tenantId}/{type}`, and `PUT /lookups/{tenantId}/{type}/{code}`.

#### Scenario: Lookup endpoints present in spec
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `/lookups/{tenantId}` (POST), `/lookups/{tenantId}/{type}` (POST), and `/lookups/{tenantId}/{type}/{code}` (PUT)

#### Scenario: Bulk lookup writes accept an array
- **WHEN** the request body schema for `POST /lookups/{tenantId}` or `POST /lookups/{tenantId}/{type}` is rendered
- **THEN** it SHALL be `{ type: "array", items: { $ref: "#/components/schemas/Lookup" } }`

#### Scenario: Single lookup PUT accepts one Lookup
- **WHEN** the request body schema for `PUT /lookups/{tenantId}/{type}/{code}` is rendered
- **THEN** it SHALL be `{ $ref: "#/components/schemas/Lookup" }`

### Requirement: Unmapped value write endpoints in the OpenAPI spec
The system SHALL extend the spec with two unmapped-value write endpoints documented in the developer portal's Ingest module: `POST /unmapped/{tenantId}` and `POST /unmapped/{tenantId}/{type}`.

#### Scenario: Unmapped endpoints present in spec
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `/unmapped/{tenantId}` (POST) and `/unmapped/{tenantId}/{type}` (POST)

#### Scenario: Unmapped writes accept an array of strings
- **WHEN** the request body schema for an unmapped POST is rendered
- **THEN** it SHALL be `{ type: "array", items: { type: "string" } }`

### Requirement: Lookup schema in components.schemas
The system SHALL add a `Lookup` schema to `components.schemas` describing the canonical fields shared by all lookup write endpoints.

#### Scenario: Lookup schema fields
- **WHEN** the spec is loaded
- **THEN** `components.schemas.Lookup` SHALL declare at least `code`, `value`, `description`, `source`, and `parent` properties of type `string`

### Requirement: One Storybook story per new endpoint with per-story urlControls
The system SHALL extend `openApi/ReferenceDataManagement/ReferenceDataManagement.stories.tsx` with five new stories — one per added endpoint — each spreading `urlControls(url)` before `args` so the Controls panel only shows the placeholders the story uses, and including a sample `args.request.body` so the curl preview is meaningful.

#### Scenario: Story count grows by five
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 11 stories total (6 existing + 5 added)

#### Scenario: Each new story shows only its own controls
- **WHEN** the user opens `PUT /lookups/{tenantId}/{type}/{code}`
- **THEN** the Controls panel SHALL show `environment`, `tenantId`, `type`, and `code` only

### Requirement: Auto-generated docs page reflects the new stories
The system SHALL regenerate `openApi/ReferenceDataManagement/ReferenceDataManagement.story.mdx` via `npm run build-api-docs` so the page renders the new endpoints in `<OpenApi spec={...} />` and the new stories in `<Stories />`.

#### Scenario: Build refreshes the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/ReferenceDataManagement/ReferenceDataManagement.story.mdx` SHALL be regenerated and `npm run dev` SHALL render the page under `API > Reference Data Management` with all 11 endpoints visible
