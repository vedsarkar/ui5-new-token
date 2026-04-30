# workflow-adapter-api Specification

## Purpose

Workflow Adapter Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Workflow Adapter
The system SHALL provide `openApi/WorkflowAdapter/WorkflowAdapter.spec.json` containing all 47 endpoints tagged `Workflow` in `openApi/management.json`, with the long shared prefix absorbed into the server URL.

#### Scenario: Spec includes all 47 endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain every `(path, method)` pair tagged `Workflow` in `management.json`

#### Scenario: Server absorbs the long shared prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/services/workflow-adapter/workflow` and per-story paths SHALL begin with `/{tenantId}/...` or `/deployments` (no `/services/workflow-adapter/workflow` prefix in paths)

#### Scenario: Spec is distinct from the Data Change Requests spec
- **WHEN** the spec is loaded
- **THEN** it SHALL NOT contain any of the 12 endpoints from the renamed `openApi/DataChangeRequests/DataChangeRequests.spec.json` (those live at `/changeRequests/...` and are part of a different API)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `Deployment`, `ProcessDefinition`, `ProcessInstance`, `Task`, `Job`, and `JarDeployment` (plus list variants where appropriate)

### Requirement: One Storybook story per endpoint with section grouping
The system SHALL provide `openApi/WorkflowAdapter/WorkflowAdapter.stories.tsx` exporting 47 stories with `urlControls()` and realistic sample bodies for write methods.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 47 stories and the sidebar SHALL show `API > Workflow Adapter`

#### Scenario: Stories are grouped via section comments
- **WHEN** the file is read
- **THEN** it SHALL contain section comments separating Deployments, Process Definitions, Process Instances, Tasks, Group Tasks, Jobs, JAR Deployments, and Operations

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/WorkflowAdapter/WorkflowAdapter.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/WorkflowAdapter/WorkflowAdapter.story.mdx` SHALL exist
