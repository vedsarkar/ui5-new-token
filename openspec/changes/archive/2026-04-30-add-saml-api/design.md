## Context

Simple CRUD group. Single path `/services/api/v1/security/samlconfig/{customerId}/{tenantId}` with 4 methods. URL variables: `{customerId}`, `{tenantId}`. Two schemas: `SAMLConfigRequest` (input) and `SAMLConfigResponse` (output with additional fields like acsURL, entityID, metadata).

## Goals / Non-Goals

**Goals:**
- Match portal's SAML group exactly
- Server URL: `https://{environment}.reltio.com`

**Non-Goals:**
- Documenting SAML metadata XML format

## Decisions

**1. Schemas**: Include both `SAMLConfigRequest` and `SAMLConfigResponse` — they differ (request has `metaData`, response has `metadata`, `acsURL`, `entityID`).
