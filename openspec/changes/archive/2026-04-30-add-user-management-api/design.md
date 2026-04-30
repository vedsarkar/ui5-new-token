## Context

The developer portal's Manage module exposes "User Management" — 21 endpoints under `/services/oauth/users/...` covering the full user lifecycle plus MFA enrollment. Tagged `User Management` in `openApi/management.json`. Manage-only.

The 21 endpoints break down as:

- **Users CRUD** (5): list all, add list, get one, update one, delete one
- **Group membership** (4): list users in a group, list a user's groups, update a user's groups, look up users by tenant
- **MFA enrollment** (11): associate / enroll / verify / reset, for both TOTP (QRCode) and Email factors, with and without `state_token` (used during the OAuth login flow before a session exists), and both self-service and admin-initiated paths. Plus two MFA detail readers.
- **Token revocation** (1): revoke all tokens for a user

This is a sibling page to the already-shipped `API/Client Management` (which manages OAuth application clients on the same `/oauth` subsystem).

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/User Management` documenting all 21 endpoints
- Server URL `https://{environment}.reltio.com/oauth` (matching `ClientManagement`); paths `/users/...`
- Section comments grouping the page (Users CRUD / Group Membership / MFA Enrollment / Token Revocation)

**Non-Goals:**
- Documenting the OAuth login flow that produces the `state_token` used by half the MFA endpoints — out of scope for an API reference
- Refreshing `management.json` from the portal

## Decisions

**1. Server URL = `https://{environment}.reltio.com/oauth`.** Consistent with the already-shipped `ClientManagement` convention. The verbatim path in `management.json` is `/services/oauth/users/...`, but the `services/oauth` is internal routing — the production-facing endpoint is at `/oauth/users/...`. `ClientManagement` already does this transformation; we follow.

**2. Inclusion rule = "User Management" tag.**

**3. Single stories file, grouped via section comments.** Same approach as `add-export-api` and `add-match-api`. Sections: Users CRUD, Group Membership, MFA Enrollment, Token Revocation.

**4. Schemas: typed but minimal.**
   - `User` — `username`, `email`, `firstName`, `lastName`, `groups: [string]`, `tenants: [string]`, `mfaEnabled: boolean`
   - `UserList` — array of `User`
   - `UsernameEmailPair` — `{ username, email }` for the by-tenant lookup
   - `MfaDetails` — `{ factors: [{ type, status }], requiredAtNextLogin: boolean }`
   - `MfaEnrollRequest` — `{ secret?, otp?, stateToken?, qrCodeId? }` (covers all enroll/verify variants)
   - `MfaQRCodeResponse` — `{ secret, qrCodeImage, qrCodeId }`

**5. Sample bodies.** Realistic-looking usernames, emails, group names. Sample tenant id `myTenant`. MFA bodies show the QRCode + state-token pair so users see how to chain calls during the login flow.

**6. Token revocation has no body.** PUT with empty body — matches the portal docs.

## Risks / Trade-offs

- **MFA endpoint shapes are inferred from the endpoint names** → If/when Reltio publishes authoritative request/response schemas, refresh.
- **Path transformation `/services/oauth/users/...` → `/oauth/users/...`** is consistent with `ClientManagement` but diverges visibly from `management.json`. Documented here so reviewers know to expect it.
