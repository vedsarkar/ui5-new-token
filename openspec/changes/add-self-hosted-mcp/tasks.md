## 1. Dependencies

- [x] 1.1 Add `@storybook/mcp` as a direct dependency in `package.json` (version `0.6.1` matching current transitive)

## 2. Serverless Function

- [x] 2.1 Create `api/mcp.ts` with `createStorybookMcpHandler` and a `manifestProvider` that fetches from `VERCEL_URL`
- [x] 2.2 Implement singleton handler caching to avoid re-initialization across invocations

## 3. Vercel Configuration

- [x] 3.1 Create `vercel.json` with rewrite rule `/mcp` → `/api/mcp`

## 4. Verification

- [x] 4.1 Build Storybook locally and verify `storybook-static/manifests/components.json` exists
- [ ] 4.2 Deploy to Vercel and verify `/mcp` endpoint responds to MCP `tools/list` request
- [ ] 4.3 Verify `list-all-documentation` returns all 18 components
- [ ] 4.4 Verify `get-documentation` returns props and stories for a specific component
