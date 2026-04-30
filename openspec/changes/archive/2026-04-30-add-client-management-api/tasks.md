## 1. OpenAPI Spec

- [x] 1.1 Create `api/ClientManagement/` directory
- [x] 1.2 Create `api/ClientManagement/clientmanagement.spec.json` with OpenAPI 3.1 spec containing all 4 paths (7 endpoints) and referenced schemas (`ClientDetailsWrapper`, `AuthClientDetails`, `ReltioUserPermissions`, `ClientMultitokenStats`, `OperationStatus`)

## 2. Storybook Stories

- [x] 2.1 Create `api/ClientManagement/ClientManagement.stories.tsx` with `apiMetaConfig`, `preview.meta` (title: `API/Configuration/Client Management`), and 7 exported stories (GetClients, CreateClients, GetClient, UpdateClient, DeleteClient, GetMultitokens, RevokeTokens)

## 3. Docs Generation & Verification

- [x] 3.1 Run `npm run build-api-docs` to generate `api/ClientManagement/ClientManagement.story.mdx`
- [x] 3.2 Run `npm run lint` to verify code passes linting
