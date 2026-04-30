## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Common Assets
The system SHALL provide `openApi/CommonAssets/CommonAssets.spec.json` containing the six endpoints tagged `Common Assets` in `openApi/operation.json`.

#### Scenario: Spec includes all six endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `POST /{tenantId}/assets/_get`, `POST /{tenantId}/assets/_total`, `PUT /{tenantId}/assets/status`, `POST /{tenantId}/assets/status/check`, `PUT /{tenantId}/assets/synchronize`, and `GET /{tenantId}/entities/{id}/assets`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...` (no `/services/reltio/api` prefix)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `AssetReference` (with `entityURI`, `attributePath`, `crosswalk`) and `AssetStatusUpdate` (extending it with a boolean `isCommon`)

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/CommonAssets/CommonAssets.stories.tsx` exporting one story per endpoint listed in `CommonAssets.spec.json`, with `urlControls()` spread before `args` so each story shows only the URL placeholders used in its own URL template, and including a sample `args.request.body` for write methods.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 6 stories — one per `(path, method)` pair

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Common Assets` with the title `"API/Common Assets"` from `meta.story()`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/CommonAssets/CommonAssets.story.mdx` produced by `npm run build-api-docs` that ties together `<OpenApi spec={...} />` and the `<Stories />` block.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/CommonAssets/CommonAssets.story.mdx` SHALL exist
