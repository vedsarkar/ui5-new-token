## Context

Reltio Design Platform builds Storybook to Vercel as static files (`storybook-static/`). Since Storybook 10.3, the build automatically generates component manifests at `manifests/components.json` and `manifests/docs.json`. These manifests contain full component metadata: props (via react-docgen-typescript), stories with code snippets, and MDX documentation.

The `@storybook/mcp` package provides `createStorybookMcpHandler` — a standalone MCP handler that exposes the docs toolset over HTTP, reading from these manifest files. It requires no running Storybook instance.

Current Vercel deployment serves only static files. Adding a serverless function creates a live MCP endpoint alongside the static Storybook.

## Goals / Non-Goals

**Goals:**
- Expose an MCP endpoint at `/mcp` on the existing Vercel deployment
- Zero changes to existing build pipeline or Storybook configuration
- Consumer setup is one line in their agent's MCP config

**Non-Goals:**
- Authentication or access control (future iteration)
- Response caching or manifest preloading (future iteration)
- Custom domain `mcp.reltio.design` (can be added later via Vercel domain settings, no code changes)
- Custom MCP instructions or additional tools beyond what `@storybook/mcp` provides
- Replacing Chromatic MCP — both can coexist

## Decisions

### Vercel serverless function over Edge function
Serverless function (`api/mcp.ts`) uses Node.js runtime which is compatible with `@storybook/mcp` and its dependencies (`tmcp`, `valibot`). Edge functions have restricted APIs that may not support the full MCP HTTP transport. Serverless is the safer choice for a first iteration.

### Manifest fetched via HTTP from same deployment
The `manifestProvider` fetches manifests from the deployment's own static files (`https://<deployment-url>/manifests/components.json`). Alternative: bundle manifest files into the function using `includeFiles` in `vercel.json`. HTTP fetch was chosen because it requires no build-time file copying and the manifests are already served as static assets. The latency overhead is negligible since the fetch stays within Vercel's network.

### Singleton handler pattern
The MCP handler is created once and cached across invocations (standard Vercel serverless pattern). Avoids re-initializing the MCP server on every request.

### `@storybook/mcp` as direct dependency
Currently `@storybook/mcp@0.6.1` is only a transitive dependency via `@storybook/addon-mcp`. Adding it as a direct dependency makes the serverless function's imports explicit and version-controlled.

## Risks / Trade-offs

- **[Cold start latency]** → First request to the serverless function after idle period will have ~1-2s cold start. Acceptable for MCP tool calls which are not latency-sensitive. Can be mitigated later with Vercel cron warming if needed.
- **[No auth]** → MCP endpoint is publicly accessible. Manifest data is component documentation, not sensitive. Auth can be added in a future iteration.
- **[Self-referencing fetch]** → The serverless function fetches manifests from its own deployment URL. If `VERCEL_URL` is incorrect or the static files aren't deployed yet, the function will fail. Mitigated by VERCEL_URL being reliably set by Vercel.
- **[Version coupling]** → `@storybook/mcp` version must stay compatible with the manifest format produced by the Storybook build. Both packages are from the Storybook ecosystem and versioned together.
