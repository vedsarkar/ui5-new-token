## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Databricks Share Management
The system SHALL provide `openApi/DatabricksShareManagement/DatabricksShareManagement.spec.json` containing the seven endpoints tagged `Databricks Share Management` in `openApi/management.json`.

#### Scenario: Spec includes all seven endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `POST /catalog`, `POST /catalog-schema`, `POST /complete-share`, `POST /grant`, `POST /recipient`, `POST /schema`, and `POST /share` (with the long shared prefix absorbed into the server URL)

#### Scenario: Server absorbs the long shared prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/services/api/tenants/{tenantId}/adapters/{adapterName}/databricks-share` and SHALL declare `environment`, `tenantId`, and `adapterName` server variables

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `CatalogRequest`, `SchemaRequest`, `RecipientRequest`, `ShareRequest`, `GrantRequest`, `CompleteShareRequest`, and `DatabricksOperationResult`

### Requirement: One Storybook story per endpoint with realistic sample bodies
The system SHALL provide `openApi/DatabricksShareManagement/DatabricksShareManagement.stories.tsx` exporting 7 stories with sample bodies that demonstrate the Unity Catalog object names being created.

#### Scenario: Story count and grouping
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 7 stories and the sidebar SHALL show `API > Databricks Share Management`

#### Scenario: Sample bodies are present
- **WHEN** any of the 7 stories is rendered
- **THEN** `args.request.body` SHALL be set to a realistic small object referencing the right Unity Catalog object names (catalog/schema/share/recipient/grant)

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/DatabricksShareManagement/DatabricksShareManagement.story.mdx` produced by `npm run build-api-docs`.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/DatabricksShareManagement/DatabricksShareManagement.story.mdx` SHALL exist
