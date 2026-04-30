## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/AttributeVerification/` directory and scaffold `AttributeVerification.spec.json` (`info`, `servers` with `https://{environment}.reltio.com/reltio/api`, `components.schemas` with `VerifyEntityRequest`, `EmailToVerify`, `PhoneToVerify`, `VerificationResult`)
- [x] 1.2 Add `POST /{tenantId}/entities/{id}/attributeVerification/_verify` referencing `VerifyEntityRequest` for the request body
- [x] 1.3 Add `POST /{tenantId}/verification/email/_batchVerify` and `POST /{tenantId}/verification/phone/_batchVerify` with array request bodies referencing `EmailToVerify` / `PhoneToVerify`

## 2. Storybook Stories

- [x] 2.1 Create `openApi/AttributeVerification/AttributeVerification.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Attribute Verification`
- [x] 2.2 Export `VerifyEntity`, `BatchVerifyEmail`, `BatchVerifyPhone` stories with `...urlControls(url)` and realistic sample bodies (`forceVerify: true` + `clientFilter`; 2+ emails; 2+ phones mixing E.164 and national+ctry)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `AttributeVerification.story.mdx`, then `npm run format` and `npm run lint`
