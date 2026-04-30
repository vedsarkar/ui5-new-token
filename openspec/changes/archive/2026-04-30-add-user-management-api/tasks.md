## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/UserManagement/` directory and scaffold `UserManagement.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/oauth`, `components.schemas` with `User`, `UserList`, `UsernameEmailPair`, `MfaDetails`, `MfaEnrollRequest`, `MfaQRCodeResponse`)
- [x] 1.2 Add the 21 `User Management`-tagged path/methods, transforming `/services/oauth/users/...` → `/users/...` so the server URL absorbs the `oauth` prefix (matching `ClientManagement` convention)

## 2. Storybook Stories

- [x] 2.1 Create `openApi/UserManagement/UserManagement.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/User Management`
- [x] 2.2 Export 21 stories with `...urlControls(url)`, sample `User` bodies for the create/update writes, MFA-shape bodies for the enrollment writes, and no body for `PUT /users/{username}/revoketokens`. Add section comments (`// --- Users CRUD ---`, `// --- Group Membership ---`, `// --- MFA Enrollment ---`, `// --- Token Revocation ---`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `UserManagement.story.mdx`, then `npm run format` and `npm run lint`
