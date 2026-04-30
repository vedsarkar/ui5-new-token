## 1. OpenAPI Spec

- [x] 1.1 Create `openApi/Match/` directory and scaffold `Match.spec.json` (`info`, `servers` with `https://{environment}.reltio.com` (root), `components.schemas` with `MatchResult`, `MatchTokens`, `MatchExplanation`, `ComparatorClass`)
- [x] 1.2 Add the 19 entity-scoped `Match`-tagged path/methods under `/services/reltio/api/{tenantId}/...` (keep the full prefix in paths)
- [x] 1.3 Add the 9 matching-tools `Match`-tagged path/methods under `/services/reltio/tools/matching/...`

## 2. Storybook Stories

- [x] 2.1 Create `openApi/Match/Match.stories.tsx` with `apiMetaConfig({ spec })` and `meta` title `API/Match`
- [x] 2.2 Export 28 stories with `...urlControls(url)`, sample bodies for the write methods (entity URI pairs for setAMatch / notMatch / bulkNotMatch; sample comparator name + values for compare / matchTokens). Add section comments (`// --- Search & Explain ---`, `// --- Mark Match / Not Match ---`, `// --- Tokens & Documents ---`, `// --- Matching Tools ---`)

## 3. Docs Generation

- [x] 3.1 Run `npm run build-api-docs` to generate `Match.story.mdx`, then `npm run format` and `npm run lint`
