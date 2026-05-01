## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Data Pipelines
The system SHALL provide `openApi/DataPipelines/DataPipelines.spec.json` containing all 32 endpoints whose tag in `openApi/management.json` starts with `DPH ` (covers all 12 DPH sub-tags: Adapter Action, Adapter Status, Adapter Validation, DLT Observability, Fetch Adapter Script, Fetch auth info, Monitoring, Reindex Jobs, Secrets Management, Tenant Status, Workspace Management, Writeback Config).

#### Scenario: Spec includes all 32 endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain every `(path, method)` pair in `management.json` whose tag starts with `DPH `

#### Scenario: Server is the bare environment URL
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com` (NOT `https://{environment}.reltio.com/services/...` or any other prefix-absorbing variant)

#### Scenario: All paths have /services/ stripped
- **WHEN** any path in the spec is inspected
- **THEN** it SHALL NOT begin with `/services/` and SHALL begin with one of `/api/`, `/reltio/api/`, `/status/`, or `/config/` (matching the four sub-roots present in the source)

#### Scenario: region placeholder is normalized
- **WHEN** the spec is loaded
- **THEN** the Fabric resources path SHALL use `{region}` (NOT `{{region}}` as in `management.json`)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `AdapterAction`, `AdapterStatus`, `Secret`, `Pipeline`, `PipelineEvent`, `MonitoringEvent`, `Workspace`, `Lakehouse`, `ShareLink`, `ReindexJobResponse`, `TenantQueueDetails`, and `WritebackConfig`

### Requirement: One Storybook story per endpoint with 7-section grouping
The system SHALL provide `openApi/DataPipelines/DataPipelines.stories.tsx` exporting 32 stories with `urlControls()` and realistic sample bodies for write methods, organized into 7 functional sections via `// --- ... ---` comments.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 32 stories and the sidebar SHALL show `API > Data Pipelines`

#### Scenario: Stories are grouped via section comments
- **WHEN** the file is read
- **THEN** it SHALL contain section comments separating Adapters, Workspace, DLT Pipelines, Monitoring & Status, Secrets, Reindex, and Writeback

#### Scenario: meta.title is exactly the user-requested name
- **WHEN** the stories file is read
- **THEN** the `meta` definition SHALL set `title: "API/Data Pipelines"`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/DataPipelines/DataPipelines.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/DataPipelines/DataPipelines.story.mdx` SHALL exist
