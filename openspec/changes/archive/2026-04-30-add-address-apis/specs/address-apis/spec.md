## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Address APIs
The system SHALL provide `openApi/AddressApis/AddressApis.spec.json` containing the two endpoints tagged `Address APIs` in `openApi/operation.json`: `GET /address/search` and `GET /address/fetch`.

#### Scenario: Spec includes both endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `GET /{tenantId}/address/search` and `GET /{tenantId}/address/fetch`

#### Scenario: search endpoint declares all query parameters
- **WHEN** the spec is loaded
- **THEN** `GET /{tenantId}/address/search` SHALL declare query parameters `Text` (required, string), `Container` (optional, string), `Countries` (optional, string), `Language` (optional, string), and `Limit` (required, integer)

#### Scenario: fetch endpoint declares its query parameter
- **WHEN** the spec is loaded
- **THEN** `GET /{tenantId}/address/fetch` SHALL declare a required query parameter `Id` of type `string`

#### Scenario: Limit uses a valid OpenAPI type
- **WHEN** the spec is loaded
- **THEN** the `Limit` query parameter SHALL have `schema.type: "integer"` (NOT the invalid `"int"` declared in `operation.json`)

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...` (no `/services/reltio/api` prefix)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `AddressCandidate`. `search` SHALL return an array of `AddressCandidate`; `fetch` SHALL return a single `AddressCandidate`

### Requirement: One Storybook story per endpoint with controls for path and query parameters
The system SHALL provide `openApi/AddressApis/AddressApis.stories.tsx` exporting one story per endpoint listed in `AddressApis.spec.json`. Each story SHALL spread `urlControls(url)` for path placeholders AND declare `argTypes` for the endpoint's query parameters so the Controls panel exposes them as text/number inputs.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 2 stories — `SearchAddresses` and `FetchAddress`

#### Scenario: Search story exposes its query parameters
- **WHEN** the user opens the `GET /address/search` story
- **THEN** the Controls panel SHALL show `environment`, `tenantId`, `Text`, `Container`, `Countries`, `Language`, and `Limit`

#### Scenario: Fetch story exposes its query parameter
- **WHEN** the user opens the `GET /address/fetch` story
- **THEN** the Controls panel SHALL show `environment`, `tenantId`, and `Id`

#### Scenario: Final URL includes query string
- **WHEN** the user fills in the query-parameter controls on either story and looks at the curl preview or clicks Send
- **THEN** the request URL SHALL include the supplied query parameters appended as `?Key=Value&Key2=Value2`

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Address APIs` with the title `"API/Address APIs"` from `meta.story()`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/AddressApis/AddressApis.story.mdx` produced by `npm run build-api-docs` that ties together `<OpenApi spec={...} />` and the `<Stories />` block.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/AddressApis/AddressApis.story.mdx` SHALL exist and `npm run dev` SHALL render the page under `API > Address APIs` with the API description, server table, Data Models, and one interactive section per story
