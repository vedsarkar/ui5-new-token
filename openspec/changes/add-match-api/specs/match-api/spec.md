## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Match
The system SHALL provide `openApi/Match/Match.spec.json` containing all 28 endpoints tagged `Match` in `openApi/operation.json`, spanning the entity-scoped match operations under `/services/reltio/api/{tenantId}/...` and the matching tools under `/services/reltio/tools/matching/...`.

#### Scenario: Spec includes all 28 endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain every `(path, method)` pair tagged `Match` in `operation.json`

#### Scenario: Server uses the root URL
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com` and paths SHALL keep their full prefixes (`/services/reltio/api/...` and `/services/reltio/tools/matching/...`) because the API spans two URL roots

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `MatchResult`, `MatchTokens`, `MatchExplanation`, and `ComparatorClass`

### Requirement: One Storybook story per endpoint with section grouping
The system SHALL provide `openApi/Match/Match.stories.tsx` exporting 28 stories — one per endpoint — with `urlControls()` and realistic sample bodies for write methods.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 28 stories

#### Scenario: Stories are grouped via section comments
- **WHEN** the file is read
- **THEN** it SHALL contain section comments separating Search & Explain, Mark Match / Not Match, Tokens & Documents, and Matching Tools

#### Scenario: Tools stories omit tenantId from controls
- **WHEN** the user opens any story under `/services/reltio/tools/matching/...`
- **THEN** the Controls panel SHALL NOT include `tenantId` (because those endpoints are global)

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Match` with the title `"API/Match"`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Match/Match.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Match/Match.story.mdx` SHALL exist
