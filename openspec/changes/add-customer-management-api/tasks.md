## 1. OpenAPI Spec

- [x] 1.1 Create `api/CustomerManagement/` directory
- [x] 1.2 Create `api/CustomerManagement/customermanagement.spec.json` with OpenAPI 3.1 spec containing all 7 paths (14 endpoints) and referenced schemas (`Customer`, `PasswordPolicy`, `MFAConfig`, `RolesPermissions`, `ReltioServiceResourcePermissions`, `OperationStatus`)

## 2. Storybook Stories

- [x] 2.1 Create `api/CustomerManagement/CustomerManagement.stories.tsx` with `apiMetaConfig`, `preview.meta` (title: `API/Customer Management`), and 14 exported stories

## 3. Docs Generation & Verification

- [x] 3.1 Run `npm run build-api-docs` to generate `api/CustomerManagement/CustomerManagement.story.mdx`
- [x] 3.2 Run `npm run format` and `npm run lint` to verify code passes
