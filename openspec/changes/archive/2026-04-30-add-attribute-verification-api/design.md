## Context

The developer portal's Operate module exposes "Attribute Verification" — three POST endpoints that validate email and phone attributes:

- `POST /services/reltio/api/{tenantId}/entities/{id}/attributeVerification/_verify` — runs the configured verifiers on a single entity. Reuses cached results within `maxVerificationAge` unless `forceVerify` is true. If `clientFilter` is omitted, all applicable verifiers run. Persists verification results on the entity and returns the updated entity.
- `POST /services/reltio/api/{tenantId}/verification/email/_batchVerify` — accepts a JSON array of `{ email }` objects and returns per-email verification status.
- `POST /services/reltio/api/{tenantId}/verification/phone/_batchVerify` — accepts a JSON array of `{ phone, ctry? }` objects. `phone` may be E.164 or national format; `ctry` (optional ISO country code) selects national interpretation, otherwise the number is treated as international.

All three are tagged `Attribute Verification` in `openApi/operation.json`. There is no Ingest-module counterpart — verification is a synchronous validation callout, not a data-write path.

## Goals / Non-Goals

**Goals:**
- One Storybook section `API/Attribute Verification` documenting all three endpoints
- Server URL: `https://{environment}.reltio.com/reltio/api`; paths `/{tenantId}/...` — consistent with the convention from `add-entities-api` and successors
- Realistic sample bodies — the entity-scoped story sends `forceVerify: true` and a `clientFilter`; the batch stories send 2-3 sample emails/phones so the curl preview is meaningful

**Non-Goals:**
- Documenting verification provider response schema in detail — providers are pluggable and the portal doesn't ship a canonical schema. Use a minimal `VerificationResult` covering the most common fields (status, normalizedValue, reason).
- Refreshing `openApi/operation.json` from the portal — the local snapshot is a read-only input.

## Decisions

**1. Single stories file with 3 stories.** Trivially correct.

**2. Strip the `/services/reltio/api` prefix.** Same convention as `add-entities-api` and successors. Server URL absorbs the prefix.

**3. Inclusion rule = "Attribute Verification" tag.** All three endpoints carry the `Attribute Verification` tag in `operation.json` — straightforward selection.

**4. Schemas: minimal but typed.** Define three input schemas (`VerifyEntityRequest`, `EmailToVerify`, `PhoneToVerify`) and one output schema (`VerificationResult`) in `components.schemas`. Inputs are typed because the body shape is well-known and small. The output is generic since per-provider responses vary.

**5. Sample bodies.** Each POST story includes a realistic body so the curl preview is useful out of the box:
   - Entity-scoped verify: `{ "forceVerify": true, "clientFilter": ["Email", "Phone"] }`
   - Email batch: `[ { "email": "alice@example.com" }, { "email": "bob@sample.org" } ]`
   - Phone batch: `[ { "phone": "+14155551234" }, { "phone": "020 7946 0958", "ctry": "GB" } ]` (one E.164 and one national + country code, demonstrating both conventions documented in the description)

**6. URL template per story.** All URLs are built from `https://{environment}.reltio.com/reltio/api/{tenantId}/<path>`. The entity-scoped story spreads `urlControls()` for the additional `{id}` placeholder so the Controls panel shows only what the story uses.

## Risks / Trade-offs

- **Verification provider response schema is generic** → If/when Reltio publishes the upstream schema, refresh `VerificationResult`. Stories won't break — they only depend on `args.request`.
- **Sample data uses public-looking but fake emails/phones** → No real PII; clearly synthetic so users understand they need to substitute.
- **Small page** → 3 stories is on the smaller end, but the portal groups these as one section and they share a single use case (data quality), so a dedicated page is right.
