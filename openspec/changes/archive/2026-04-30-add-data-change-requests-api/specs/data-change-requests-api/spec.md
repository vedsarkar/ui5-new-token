## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Workflow
The system SHALL provide `openApi/DataChangeRequests/DataChangeRequests.spec.json` containing the 12 endpoints tagged `Workflow` in `openApi/operation.json`, all under `/changeRequests/...`.

#### Scenario: Spec includes all 12 endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `GET /{tenantId}/changeRequests`, `POST /{tenantId}/changeRequests`, `POST /{tenantId}/changeRequests/_byUris`, `GET /{tenantId}/changeRequests/{id}`, `DELETE /{tenantId}/changeRequests/{id}`, `POST /{tenantId}/changeRequests/{id}/_apply`, `POST /{tenantId}/changeRequests/{id}/_reject`, `GET`/`POST`/`DELETE /{tenantId}/changeRequests/{id}/_externalInfo`, and `GET`/`DELETE /{tenantId}/changeRequests/{id}/changes/{changeItemId}`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `ChangeRequest` (with `id`, `status` enum, `userId`, `affectedUris`, `changes`, `externalInfo`), `ChangeItem` (with `id`, `objectURI`, `operation`, `attribute`, `oldValue`, `newValue`), and `ChangeRequestList`

### Requirement: One Storybook story per endpoint with section grouping
The system SHALL provide `openApi/DataChangeRequests/DataChangeRequests.stories.tsx` exporting 12 stories with `urlControls()` and sample bodies for write methods.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 12 stories and the sidebar SHALL show `API > Workflow`

#### Scenario: Stories are grouped via section comments
- **WHEN** the file is read
- **THEN** it SHALL contain section comments separating Search, CRUD, Lifecycle, External Info, and Change Items

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/DataChangeRequests/DataChangeRequests.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/DataChangeRequests/DataChangeRequests.story.mdx` SHALL exist
