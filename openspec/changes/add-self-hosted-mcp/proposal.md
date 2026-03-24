## Why

Reltio Design Platform generates a full component manifest (18 components, 330+ stories, 41 MDX docs) that is already published to Chromatic. However, Chromatic requires OAuth and a Chromatic account for every consumer. A self-hosted MCP endpoint on Vercel gives any Reltio team (HUB UI, Console, RDM, etc.) zero-friction access to design system knowledge through their coding agents — with a stable URL, no third-party auth dependency, and the ability to extend with custom instructions in the future.

## What Changes

- Add a Vercel serverless function at `api/mcp.ts` that uses `@storybook/mcp` to serve the docs MCP toolset (list-all-documentation, get-documentation, get-documentation-for-story)
- Add `vercel.json` with a rewrite from `/mcp` to the serverless function
- Add `@storybook/mcp` as a dependency (currently only a transitive dep of addon-mcp)
- No authentication, no caching — simplest possible first iteration
- No changes to existing Storybook build, pipeline, or component code

## Capabilities

### New Capabilities
- `self-hosted-mcp`: Vercel serverless function serving the Storybook MCP docs toolset, reading component manifests from the same deployment's static files

### Modified Capabilities
<!-- None — this is a new endpoint alongside existing Storybook static output. No existing specs are affected. -->

## Impact

- **New files**: `api/mcp.ts`, `vercel.json`
- **Dependencies**: `@storybook/mcp` added as a direct dependency
- **Infrastructure**: Uses existing Vercel project (`reltio-design`); no new projects or services
- **Pipeline**: No changes — `vercel build` automatically picks up `api/` directory
- **Consumers**: Any Reltio project can add the MCP URL to their `.cursor/mcp.json` or equivalent agent config
