## ADDED Requirements

### Requirement: OpenAPI 3.1 spec for Attribute Verification
The system SHALL provide `openApi/AttributeVerification/AttributeVerification.spec.json` containing the three endpoints tagged `Attribute Verification` in `openApi/operation.json`.

#### Scenario: Spec includes all three endpoints
- **WHEN** the spec is loaded
- **THEN** `paths` SHALL contain `POST /{tenantId}/entities/{id}/attributeVerification/_verify`, `POST /{tenantId}/verification/email/_batchVerify`, and `POST /{tenantId}/verification/phone/_batchVerify`

#### Scenario: Server uses environment variable and stripped prefix
- **WHEN** the spec is loaded
- **THEN** `servers[0].url` SHALL be `https://{environment}.reltio.com/reltio/api` and `paths` SHALL start with `/{tenantId}/...` (no `/services/reltio/api` prefix)

#### Scenario: Data Models section
- **WHEN** the docs page is rendered
- **THEN** `components.schemas` SHALL include at least `VerifyEntityRequest`, `EmailToVerify`, `PhoneToVerify`, and `VerificationResult`. The two batch endpoints' request bodies SHALL be arrays of `EmailToVerify` and `PhoneToVerify` respectively. `VerifyEntityRequest` SHALL declare at minimum a boolean `forceVerify` and an array `clientFilter`

### Requirement: One Storybook story per endpoint with realistic sample bodies
The system SHALL provide `openApi/AttributeVerification/AttributeVerification.stories.tsx` exporting one story per endpoint listed in `AttributeVerification.spec.json`, with `urlControls()` spread before `args` so each story shows only the URL placeholders used in its own URL template, and including a sample `args.request.body` so the curl preview is meaningful.

#### Scenario: Story count matches spec
- **WHEN** the docs page is rendered
- **THEN** the file SHALL export 3 stories — `VerifyEntity`, `BatchVerifyEmail`, `BatchVerifyPhone`

#### Scenario: Entity-scoped verify exposes the {id} control
- **WHEN** the user opens the `POST /entities/{id}/attributeVerification/_verify` story
- **THEN** the Controls panel SHALL show `environment`, `tenantId`, and `id`

#### Scenario: Batch verify stories do not expose {id}
- **WHEN** the user opens either batch verify story
- **THEN** the Controls panel SHALL show `environment` and `tenantId` only

#### Scenario: Sample bodies are present
- **WHEN** the entity-scoped story is rendered
- **THEN** `args.request.body` SHALL include `forceVerify: true` and a non-empty `clientFilter` array

- **WHEN** the email batch story is rendered
- **THEN** `args.request.body` SHALL be an array of at least 2 `{ email }` objects

- **WHEN** the phone batch story is rendered
- **THEN** `args.request.body` SHALL be an array of at least 2 `{ phone }` (or `{ phone, ctry }`) objects, demonstrating both E.164 and national-with-country-code conventions

#### Scenario: Sidebar grouping
- **WHEN** Storybook loads
- **THEN** the sidebar SHALL show `API > Attribute Verification` with the title `"API/Attribute Verification"` from `meta.story()`

### Requirement: Auto-generated docs page
The system SHALL provide `openApi/AttributeVerification/AttributeVerification.story.mdx` produced by `npm run build-api-docs` that ties together `<OpenApi spec={...} />` and the `<Stories />` block.

#### Scenario: Build produces the MDX
- **WHEN** `npm run build-api-docs` runs
- **THEN** `openApi/AttributeVerification/AttributeVerification.story.mdx` SHALL exist and `npm run dev` SHALL render the page under `API > Attribute Verification` with the API description, server table, Data Models, and one interactive section per story
