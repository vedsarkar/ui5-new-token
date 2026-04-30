# interactions-api Specification

## Purpose

Interactions Api capability — Storybook API documentation page generated from `openApi/<Name>/<Name>.spec.json`, exporting one Storybook story per endpoint and an auto-generated MDX page.

## Requirements

### Requirement: Unified OpenAPI 3.1 spec for Interactions
The system SHALL provide `openApi/Interactions/Interactions.spec.json` that combines, into a single OpenAPI 3.1 document, every endpoint tagged `Interactions` in `openApi/operation.json` together with the two POST creation endpoints documented in the developer portal's Ingest module (`POST /interactions` and `POST /rawInteractions`).

#### Scenario: Spec includes the Ingest creation endpoints
- **WHEN** the spec is loaded
- **THEN** it SHALL contain `POST /{tenantId}/interactions` ("Creates a collection of interactions in a tenant") and `POST /{tenantId}/rawInteractions` ("Creates a raw collection of interactions in a tenant")

#### Scenario: Spec includes all "Interactions" tagged endpoints from operation.json
- **WHEN** the spec is loaded
- **THEN** it SHALL contain every path/method pair tagged `Interactions` in `openApi/operation.json`, including the entity-scoped read `GET /{tenantId}/entities/{id}/_interactions` and the raw read `GET /{tenantId}/rawInteractions/{id}`

#### Scenario: Wildcard delete path is normalized
- **WHEN** the spec is loaded
- **THEN** the single-interaction delete SHALL be expressed as `DELETE /{tenantId}/interactions/{id}` (not the `interactions/**` wildcard pattern used in `operation.json`)

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...` (no `/services/reltio/api` prefix)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `Interaction`, `InteractionList`, and `RawInteraction`, and successful responses SHALL `$ref` one of them

### Requirement: One Storybook story per endpoint with per-story urlControls
The system SHALL provide `openApi/Interactions/Interactions.stories.tsx` exporting one story per endpoint listed in `Interactions.spec.json`, with `urlControls()` spread before `args` so each story shows only the URL placeholders used in its own URL template.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the number of exported stories SHALL equal the number of `(path, method)` pairs in `Interactions.spec.json`

#### Scenario: Each story shows only its own controls
- **WHEN** the user opens a story whose URL is `https://{environment}.reltio.com/reltio/api/{tenantId}/interactions`
- **THEN** the Controls panel SHALL show `environment` and `tenantId` only — and SHALL NOT show `{id}`

#### Scenario: Body present for write methods
- **WHEN** a story's `args.request.method` is `POST`, `PUT`, or `PATCH`
- **THEN** `args.request.body` SHALL be set so the curl preview and Send button include a request body

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Interactions` with the title `"API/Interactions"` from `meta.story()`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/Interactions/Interactions.story.mdx` produced by `npm run build-api-docs` that ties together `<OpenApi spec={...} />` and the `<Stories />` block.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/Interactions/Interactions.story.mdx` SHALL exist and `npm run dev` SHALL render the page under `API > Interactions` with the API description, server table, Data Models, and one interactive section per story
