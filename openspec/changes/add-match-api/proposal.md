## Why

The developer portal's Operate module exposes a "Match" group with 28 endpoints spanning the entire matching lifecycle — finding/searching/explaining matches, marking pairs as "match" or "not match" (single and bulk), inspecting match tokens and documents, and a set of low-level matching tools (comparator classes, token classes, token comparison and explanation). The Storybook docs site has no page for them yet — this is one of Reltio's core APIs and the missing reference is significant.

Operate-only API; no Ingest counterpart.

## What Changes

- Create `openApi/Match/Match.spec.json` — an OpenAPI 3.1 spec containing the 28 endpoints tagged `Match` in `openApi/operation.json`, organized into four logical groups:
  - **Search & Explain** — `_matches`, `_scoredmatches`, `_verifyMatches`, `_verifyUnmerge`, `findMatchCandidates`, `matchedEntities`, `_matches` (entity-scoped), `_transitiveMatches`, `matchedEntities` (entity-scoped)
  - **Mark Match / Not Match** — `_setAMatch` (GET/POST/DELETE), `_notMatch` (GET/POST/DELETE), `matches/_bulkNotMatch`
  - **Match Tokens & Documents** — `matchDocument`, `matchTokens`, `matchTokensDetailed`
  - **Matching Tools** (under `/services/reltio/tools/matching/...`) — `comparatorClasses`, `compare`, `compare/multi`, `fixGroupingMatchesState`, `matchTokenClasses`, `matchTokenIntersections`, `matchTokens` (POST), `matchTokens/multi`, `tokensExplanation`
- Create `openApi/Match/Match.stories.tsx` — one Storybook story per endpoint with `urlControls` and realistic sample bodies
- Generate `openApi/Match/Match.story.mdx` via `npm run build-api-docs`
- Sidebar title: `API/Match`
- Server URL: `https://{environment}.reltio.com` — the Match API spans BOTH the standard `/services/reltio/api/{tenantId}/...` root AND the `/services/reltio/tools/matching/...` tools root, so the server URL stays at the top level and paths keep their full prefixes

## Capabilities

### New Capabilities
- `match-api`: Storybook API documentation for the unified Match API — search/explain matches, mark match/not-match pairs (single + bulk), inspect match tokens/documents, and a set of low-level matching tools

### Modified Capabilities

## Impact

- New directory: `openApi/Match/`. Additive only.
- Adds 28 stories — second largest API page after Export.
- Server URL stays at root (no prefix stripping) because the API spans two URL roots. Documented in design.md.
