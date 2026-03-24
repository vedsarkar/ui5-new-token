## ADDED Requirements

### Requirement: MCP endpoint serves docs toolset
The Vercel deployment SHALL expose an MCP endpoint at the `/mcp` path that handles MCP protocol requests (HTTP POST with JSON-RPC) using `@storybook/mcp`.

#### Scenario: MCP tools/list returns available tools
- **WHEN** an MCP client sends a `tools/list` request to `/mcp`
- **THEN** the server responds with three tools: `list-all-documentation`, `get-documentation`, `get-documentation-for-story`

#### Scenario: Non-MCP request to /mcp
- **WHEN** a browser sends a GET request to `/mcp`
- **THEN** the server responds (no 404), allowing basic connectivity verification

### Requirement: list-all-documentation returns component index
The MCP endpoint SHALL return a summary of all components and docs entries from the deployed Storybook manifest when the `list-all-documentation` tool is called.

#### Scenario: List components
- **WHEN** an agent calls `list-all-documentation`
- **THEN** the response contains all components from `manifests/components.json` with their names, IDs, and summaries

#### Scenario: List with story IDs
- **WHEN** an agent calls `list-all-documentation` with `withStoryIds: true`
- **THEN** the response includes story IDs nested under each component

### Requirement: get-documentation returns component details
The MCP endpoint SHALL return full documentation for a component when `get-documentation` is called with a valid component ID.

#### Scenario: Get existing component
- **WHEN** an agent calls `get-documentation` with `id: "components-button"`
- **THEN** the response contains the component's description, up to 3 stories with code snippets, and TypeScript props definition

#### Scenario: Get non-existent component
- **WHEN** an agent calls `get-documentation` with an ID that does not exist in the manifest
- **THEN** the response contains an error message suggesting to use `list-all-documentation`

### Requirement: Manifest provider reads from same deployment
The serverless function SHALL read manifests from the same Vercel deployment's static files using the `VERCEL_URL` environment variable.

#### Scenario: Manifests available
- **WHEN** the serverless function starts and manifests are deployed at `/manifests/components.json`
- **THEN** the MCP handler successfully reads and serves component data

### Requirement: Vercel routing configuration
A `vercel.json` file SHALL rewrite requests from `/mcp` to the serverless function at `/api/mcp`.

#### Scenario: Rewrite rule
- **WHEN** a request is sent to `https://<deployment>/mcp`
- **THEN** Vercel routes it to the `api/mcp.ts` serverless function

### Requirement: Direct dependency on @storybook/mcp
The `@storybook/mcp` package SHALL be added as a direct dependency in `package.json`.

#### Scenario: Package listed
- **WHEN** inspecting `package.json` dependencies
- **THEN** `@storybook/mcp` is listed with the version matching the one currently installed transitively
