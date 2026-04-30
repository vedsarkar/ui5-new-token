# export-api Specification

## Purpose

Export Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: OpenAPI 3.1 spec for Export
The system SHALL provide `openApi/Export/Export.spec.json` containing all 23 endpoints tagged `Export` in `openApi/operation.json`, organized into submitters (under `/export/{tenantId}/...`), global task management (under `/tasks/...`), and tenant-scoped task management (under `/{tenantId}/tasks/...`).

#### Scenario: Spec includes all 23 endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain 6 submitter endpoints (`activities`, `entities`, `entities/_crosswalksTree`, `entities/segments`, `hierarchies`, `relations`), 9 global task endpoints, and 8 tenant-scoped task endpoints — 23 endpoints total

#### Scenario: Server uses the /services/jobs root
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/services/jobs` (NOT `https://{environment}.reltio.com/reltio/api`) because the Export subsystem is rooted at `/services/jobs/...`

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `ExportJobRequest` (with `format`, `filter`, `select`, `notifyEmail`) and `ExportTask` (with `id`, `tenantId`, `type`, `status` enum, `submittedAt`, `completedAt`, `progress`)

### Requirement: One Storybook story per endpoint with per-story urlControls and section grouping
The system SHALL provide `openApi/Export/Export.stories.tsx` exporting 23 stories — one per endpoint — with `urlControls()` spread before `args` so each story shows only the URL placeholders it uses, and including realistic sample bodies for the submitters and no body for the pause/resume/stop PUTs.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 23 stories

#### Scenario: Stories are grouped via section comments
- **WHEN** the file is read
- **THEN** it SHALL contain section comments separating Submitters, Global Tasks, and Tenant Tasks

#### Scenario: Submitter stories carry a sample body
- **WHEN** any submitter story is rendered
- **THEN** `args.request.body` SHALL include at least `format` and `filter`

#### Scenario: Pause/resume/stop have no body
- **WHEN** any of the `_pause`, `_resume`, or `_stop` PUT stories is rendered
- **THEN** `args.request.body` SHALL be omitted

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Export` with the title `"API/Export"`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Export/Export.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Export/Export.story.mdx` SHALL exist
