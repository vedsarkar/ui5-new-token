## 1. Source SAP token JSON files into the repository

- [x] 1.1 Download `sap_horizon/variables.json` from `https://raw.githubusercontent.com/SAP/theming-base-content/master/content/Base/baseLib/sap_horizon/variables.json` and place it at `tokens/sap_horizon.tokens.json` (verbatim content, renamed from upstream `variables.json` to match the project's `*.tokens.json` convention)
- [x] 1.2 Download `sap_horizon_dark/variables.json` from `https://raw.githubusercontent.com/SAP/theming-base-content/master/content/Base/baseLib/sap_horizon_dark/variables.json` and place it at `tokens/sap_horizon_dark.tokens.json` (verbatim content, same renaming)
- [x] 1.3 Verify both files parse as valid JSON and each `root` object has the same set of keys (sanity diff)
- [x] 1.4 Create `tokens/README.md` documenting upstream URLs, license (Apache 2.0), date or commit SHA of this initial fetch, and the manual sync procedure for future updates (also covers the new font files in section 2)

## 2. Source the new SAP font files

- [x] 2.1 Download `72-SemiboldDuplex.woff2` and `72-SemiboldDuplex-full.woff2` from SAP `theming-base-content/content/Base/baseLib/baseTheme/fonts/` and place them in `public/fonts/`
- [x] 2.2 Download `72-Black.woff2` and `72-Black-full.woff2` from the same upstream directory and place them in `public/fonts/`
- [x] 2.3 Verify all four files are valid `.woff2` (load successfully in a browser via a quick test page) — verified via WOFF2 magic-byte check (`wOF2`); sizes 24-66 KB are consistent with peer files
- [x] 2.4 Update `tokens/README.md` to record the upstream font URLs and the date or commit SHA at which they were fetched

## 3. Remove the legacy Reltio token pipeline

- [x] 3.1 Delete `tokens/Light.tokens.json`
- [x] 3.2 Delete `tokens/Dark.tokens.json`
- [x] 3.3 Delete `tokens/token-map.json`
- [x] 3.4 Delete `public/variables.css` (it will not be regenerated)
- [x] 3.5 Confirm no other code references the deleted files (grep for `Light.tokens.json`, `Dark.tokens.json`, `token-map.json`, `variables.css` across the repo and remove dangling imports/scripts) — the live import in `tokens/ColorTokens.tsx` (`import tokenMap from "./token-map.json"`) was neutralised with a temporary stub component; the file is fully rewritten in section 9. Remaining references in `packages/design/package.json` (postbuild copy), `.storybook/preview-head.html` (link), `AGENTS.md` / `CLAUDE.md` / `components/AGENTS.md` / `packages/design/README.md` / `guides/component-customization.story.mdx` / `tokens/colors.story.mdx` (documentation) are scheduled for sections 8, 9, 11, and 12.

## 4. Rewrite the build script

- [x] 4.1 Replace the contents of `scripts/build-tokens.mjs` with a transformer that reads the two SAP JSON files and emits one CSS file per theme into `public/themes/`
- [x] 4.2 Each per-theme CSS file emits a single `:root { ... }` block with one declaration per JSON key, formatted as `--<key>: <value>;` (verbatim, no transformation)
- [x] 4.3 Each per-theme CSS file begins with a comment header: auto-generated marker, the regeneration command (`npm run build-tokens`), and the source JSON file name
- [x] 4.4 Use tabs for indentation, end each file with a trailing newline, match repo formatting
- [x] 4.5 Extend the same script (or a sibling script invoked by the same `npm run build-tokens`) to regenerate `public/fonts.css` with `@font-face` rules for all 10 SAP 72 face variants × 2 unicode subsets = 20 declarations, with `src` URLs pointing at `https://reltio.design/fonts/<basename>.woff2`
- [x] 4.6 Print a one-line summary on success: number of tokens emitted per theme block plus the number of `@font-face` rules emitted in fonts.css
- [x] 4.7 Verify the script is under 80 lines of executable code (excluding comments and blank lines) — measured 78 lines via `grep -cvE '^\s*(//|/\*|\*|$)'`
- [x] 4.8 Run `npm run build-tokens` and confirm `public/themes/horizon-light.theme.css`, `public/themes/horizon-dark.theme.css`, and `public/fonts.css` all regenerate without errors
- [x] 4.9 Run `npm run build-tokens` a second time and confirm the output is byte-identical to the first run (`git diff` shows no changes) — verified via `diff -q` on all three generated files

## 5. Validate the generated per-theme CSS files and fonts.css

- [x] 5.1 Confirm each per-theme CSS file contains exactly one CSS rule block (selector `:root`) plus a leading comment header
- [x] 5.2 Confirm the count of declarations under `:root` in `horizon-light.theme.css` matches the number of keys in `tokens/sap_horizon.tokens.json` (`root` object); same check for the dark file against the dark JSON — both 1536/1536
- [x] 5.3 Confirm `--reltio-color-` does not appear anywhere in the generated CSS files
- [x] 5.4 Confirm `[data-theme` does not appear anywhere in the generated CSS files
- [x] 5.5 Confirm every declared property name in the per-theme files starts with `--sap`
- [x] 5.6 Spot-check a handful of values against the source JSON (e.g., `--sapBrandColor`, `--sapElement_BorderCornerRadius`, `--sapContent_Shadow0`, `--sapTextColor`) to confirm verbatim emission
- [x] 5.7 Confirm `public/fonts.css` contains 20 `@font-face` rules covering all 10 face variants × 2 unicode subsets
- [x] 5.8 Confirm every `@font-face` rule in the regenerated `fonts.css` includes `font-display: swap`
- [x] 5.9 Confirm every `@font-face` `src` URL in the regenerated `fonts.css` points at `https://reltio.design/fonts/<basename>.woff2`

## 6. Implement the `ThemeProvider` React component

- [x] 6.1 Create `components/ThemeProvider/ThemeProvider.types.ts` with type declarations for the props (`defaultTheme`, `themeUrls`, `themeBaseUrl`, `fontUrls`, `fontBaseUrl`, `children`) and the `useTheme` return shape (`theme`, `resolved`, `setTheme`)
- [x] 6.2 Create `components/ThemeProvider/ThemeProvider.tsx` implementing the component:
  - Internal `useState` for the user's selected theme (`"auto" | "horizon-light" | "horizon-dark"`)
  - Internal computed `resolved` state derived from selection plus `prefers-color-scheme` (when selection is `"auto"`)
  - `useEffect` listening to `matchMedia('(prefers-color-scheme: dark)')` change events when in `"auto"` mode
  - `useEffect` managing a single `<link rel="stylesheet">` element in `<head>`: insert on mount, swap `href` on resolved change, remove on unmount
  - `useEffect` managing a single `<style>` element in `<head>` containing 20 `@font-face` rules for SAP 72: insert on mount, regenerate on font URL prop change, remove on unmount
  - URL resolution helper: `themeUrls[name] ?? (themeBaseUrl ? \`\${themeBaseUrl}/\${name}.theme.css\` : \`https://reltio.design/themes/\${name}.theme.css\`)`
  - Same fall-through pattern for fonts: `fontUrls[basename] ?? (fontBaseUrl ? \`\${fontBaseUrl}/\${basename}.woff2\` : \`https://reltio.design/fonts/\${basename}.woff2\`)`
  - Context provider exposing `{ theme, resolved, setTheme }` to descendants
- [x] 6.3 Implement `useTheme()` hook in the same file (or a co-located file) that consumes the context and throws an explanatory Error when used outside a `ThemeProvider`
- [x] 6.4 Create `components/ThemeProvider/index.ts` exporting both `ThemeProvider` and `useTheme` (and also added to `components/index.ts` barrel)
- [x] 6.5 Confirm the component does not produce any DOM markup of its own (renders `props.children` directly via `<ThemeContext.Provider>`)

## 7. Stories and tests for `ThemeProvider`

- [x] 7.1 Create `components/ThemeProvider/ThemeProvider.stories.tsx`
- [x] 7.2 Add a story `Default` (CDN, `defaultTheme="auto"`) showing default behaviour
- [x] 7.3 Add a story `ExplicitLight` (`defaultTheme="horizon-light"`) and `ExplicitDark` (`defaultTheme="horizon-dark"`)
- [x] 7.4 Add a story `CustomThemeBaseUrl` demonstrating `themeBaseUrl` override (also `CustomThemeUrls` for per-file map)
- [x] 7.5 Add a story `CustomFontBaseUrl` demonstrating `fontBaseUrl` override (also `CustomFontUrls` for per-file map)
- [x] 7.6 Add a story or sub-story showing the `useTheme` hook in action (e.g., a button that calls `setTheme("horizon-dark")`) — covered by `SwitchAtRuntime` and `InlineConsumer`
- [x] 7.7 Add unit tests (Vitest) covering: default theme resolution, auto-mode reaction to system preference, explicit `setTheme`, URL fall-through chain (themeUrls > themeBaseUrl > CDN), font URL fall-through, cleanup on unmount, hook throws outside provider — implemented as `play()` functions across the stories above (project pattern; no separate `*.test.tsx` per `vitest.config.ts` storybook-only setup). Stories that must escape the global decorator set `parameters.skipThemeProvider: true`, which Section 8 will honour.

## 8. Wire `ThemeProvider` into Storybook with a toolbar control

- [x] 8.1 Update `.storybook/preview.tsx` to wrap every story in `<ThemeProvider>` (decorator respects `parameters.skipThemeProvider` for the few stories that intentionally test the unwrapped state)
- [x] 8.2 Remove the previous `data-theme` attribute manipulation from the preview file (`withThemeByDataAttribute` decorator removed; `@storybook/addon-themes` removed from `.storybook/main.ts` addons list. The npm dependency in `package.json` is left in place — pruning unused deps is outside Phase 0 scope.) Also updated `.storybook/preview-head.html` to drop the `<link href="/variables.css">` and `<link href="/fonts.css">` declarations (per the modified typography-foundation spec).
- [x] 8.3 Add a Storybook toolbar control labelled "Theme" with options `auto`, `horizon-light`, `horizon-dark` (via `globalTypes.theme` in preview.tsx)
- [x] 8.4 Wire the toolbar control to call `useTheme().setTheme(...)` so theme switching does not remount the iframe (via inner `<ThemeSyncer>` component that calls `setTheme` in a `useEffect` whenever the global changes — no remount)
- [ ] 8.5 Verify in `npm run dev` that switching the toolbar updates the active theme without iframe reload — **deferred to user** (requires interactive browser verification)
- [ ] 8.6 Verify that no `data-theme` attribute is set anywhere in the Storybook iframe DOM after this change — **deferred to user** (requires interactive browser inspection). Static check confirmed: no decorator code in `.storybook/preview.tsx` sets `data-theme` anywhere; component CSS files that still match `[data-theme="dark"]` are waiting for Phase 2 component-rewrite changes and will be addressed there.

## 9. Rewrite the Storybook design-tokens documentation

- [x] 9.1 Rename the story title from "Colors" to a name reflecting the broader scope ("Design Tokens" or equivalent) in the renamed `tokens/tokens.story.mdx` (file moved from `tokens/colors.story.mdx`)
- [x] 9.2 ~~Rewrite `tokens/Tokens.tsx`~~ — superseded: extend `scripts/build-tokens.mjs` to emit `tokens/tokens.story.mdx` directly from `tokens/sap_horizon.tokens.json` and `tokens/sap_horizon_dark.tokens.json` (no React token table component)
- [x] 9.3 Group tokens by their natural prefix using a derivation rule (e.g., split on the first `_` or before the first lowercase-to-uppercase transition after the `sap` prefix). Render each group as its own section. — uses `^([A-Z][a-z]+)` extraction after stripping `sap`, producing groups like `sapBrand*`, `sapButton*`, `sapField*`, `sapAccent*` etc.
- [x] 9.4 For each token, detect whether the value is a CSS color (hex / rgb / rgba / hsl / named color); if so emit a JSX swatch (`<span style={{ background: "…", … }}>` — object `style`, not a string) with overlaid contrasting text, otherwise emit `<code>` in the table cell; groups use HTML `<table>` / `<tr>` / `<td>`, not markdown pipe-tables
- [x] 9.5 For color tokens render both the light and dark value side-by-side so the theme contrast is visible at a glance
- [x] 9.6 ~~Adapt `tokens/Tokens.module.css`~~ — not applicable: styling is inlined on generated swatch `<span>` elements; no separate CSS module for the token table
- [x] 9.7 Update copy in the renamed `tokens/tokens.story.mdx` to point readers at the [SAP Horizon design system](https://www.sap.com/design-system/) for canonical semantic guidance, and explain the local files as a generated, browsable reference
- [ ] 9.8 Verify the story renders without errors in `npm run dev` Storybook and that all SAP prefix groups appear — **deferred to user** (interactive Storybook check); static lints pass and the generated MDX is syntactically well-formed

## 10. Set up CDN delivery for themes and new fonts

- [x] 10.1 Update `vercel.json` to serve `/themes/*` from the deployed `public/themes/` directory — Vercel serves static directories from `outputDirectory` (`storybook-static`); Storybook copies `public/themes/` into the build output, so `/themes/*` is reachable at the deployed origin without additional `rewrites`
- [x] 10.2 Add the same CORS and cache headers to `/themes/*` that are currently configured for `/fonts/*`
- [x] 10.3 Verify the new font files in `public/fonts/` (`72-SemiboldDuplex*`, `72-Black*`) are served by the existing `/fonts/*` configuration without additional rules — confirmed: `vercel.json` rule already targets `/fonts/(.*)`, which matches all `.woff2` files in that directory
- [ ] 10.4 Smoke-test (after deploy or locally with `vercel dev`) that `https://reltio.design/themes/horizon-light.theme.css` and `https://reltio.design/themes/horizon-dark.theme.css` return 200 with appropriate CORS headers — **deferred to user** (requires deployment or `vercel dev` invocation)
- [ ] 10.5 Smoke-test that `https://reltio.design/fonts/72-SemiboldDuplex.woff2`, `72-SemiboldDuplex-full.woff2`, `72-Black.woff2`, `72-Black-full.woff2` return 200 — **deferred to user** (same reason)

## 11. Expose the dual access model via package exports

- [x] 11.1 Update `package.json` `exports` field to publish `./themes/*` resolving to `./public/themes/*` (so `import "@reltio/design/themes/horizon-light.css"` works) — `packages/design/package.json` does not declare an `exports` field; subpath imports resolve by file-system layout under `dist/`. Added `cp -R ../../public/themes dist/themes` to the postbuild so the per-theme files ship at `dist/themes/horizon-{light,dark}.theme.css`. Subpath imports `import "@reltio/design/themes/horizon-light.theme.css"` work via npm default subpath resolution.
- [x] 11.2 Update `package.json` `exports` field to publish `./fonts.css` resolving to `./public/fonts.css` (this likely already exists; verify) — verified: postbuild already copies `fonts.css` into `dist/`, and `import "@reltio/design/fonts.css"` works via the same default subpath resolution. The deleted `cp ../../public/variables.css` step was removed.
- [x] 11.3 Update `package.json` `exports` field to publish `./components/ThemeProvider` resolving to the new component's `index.ts` — `ThemeProvider` is exported from the existing `components/index.ts` barrel and re-exported by `packages/design/components.ts`. No new exports field needed; `import { ThemeProvider, useTheme } from "@reltio/design/components"` works via the same default subpath resolution as every other component.
- [ ] 11.4 Verify with a smoke test (e.g., a small consumer project or `npm pack`) that all three export paths resolve correctly after a fresh build — **partially deferred to user**. Static verification: `cp -R public/themes /tmp/.../dist/themes` works as expected, producing `dist/themes/horizon-{light,dark}.theme.css`. Full `npm pack` smoke test cannot complete in this session because `packages/design/npm run build` has pre-existing TypeScript errors (`Cannot find module './Icon.module.css'`) on `main` unrelated to this change. Recommended user follow-up: address the icon CSS-module typings issue, then run `npm pack` to confirm the published tarball includes `themes/horizon-light.theme.css`, `themes/horizon-dark.theme.css`, and `fonts.css`.

## 12. Update AI-agent guidance and developer documentation

- [x] 12.1 Update `AGENTS.md`:
  - Rewrite the "CSS Styling", "Global Color Tokens", and "Figma-to-Code Workflow" sections to reference `--sap*` tokens, the per-theme CSS file structure, and the `ThemeProvider` activation mechanism
  - Remove all `--reltio-color-*` references
  - Remove all `[data-theme="dark"]` references
  - Remove references to `Light.tokens.json`, `Dark.tokens.json`, `token-map.json`, and `public/variables.css`
  - Update the Pre-Commit Checklist to reference SAP-named tokens
- [x] 12.2 Apply identical edits to `CLAUDE.md` (mirrors `AGENTS.md` in this repo) — `CLAUDE.md` is a symlink to `AGENTS.md`, so the edits in 12.1 propagate automatically
- [x] 12.3 Update `components/AGENTS.md`: rewrite "CSS Styling" and any other sections that reference `--reltio-color-*`, the old token files, or `data-theme`
- [x] 12.4 Update `guides/typography.story.mdx`: rewrite around the `ThemeProvider` API as the recommended setup, keep the dual access model section showing the raw `<link>` / `import "@reltio/design/fonts.css"` paths for non-React consumers
- [x] 12.5 Verify by grep that no documentation file under the project root still references `--reltio-color-`, `Light.tokens.json`, `Dark.tokens.json`, `token-map.json`, `public/variables.css`, or `[data-theme="dark"]` — verified for the doc files in scope of Phase 0: `AGENTS.md` / `CLAUDE.md` / `components/AGENTS.md` / `guides/*.mdx` / `Welcome.story.mdx` / `packages/design/README.md`. Also updated `charts/AGENTS.md` to point at SAP tokens, with explicit notes that legacy chart implementations (`charts/Chart/theme.ts`, chart CSS modules) still consume `--reltio-color-*` until the Phase 2 chart rewrite — these explanatory mentions of the legacy namespace remain in the doc as historical context. Component capability specs under `openspec/specs/*-component/spec.md` keep their `--reltio-color-*` and `data-theme` scenarios because they describe **current** component implementations that have not yet been rewritten; those specs are scheduled for modification in the Phase 2 component-rewrite changes (one delta spec per component).

## 13. Final validation and acceptance

- [x] 13.1 Run `npm run build-tokens` and confirm clean output across all generated files — outputs `Generated: public/themes/horizon-light.theme.css (1536 tokens), public/themes/horizon-dark.theme.css (1536 tokens), public/fonts.css (20 @font-face rules)` deterministically
- [x] 13.2 Run `npm run lint` and confirm no new lint errors are introduced (existing component CSS errors due to missing `--reltio-color-*` are expected and out of scope) — `biome check .` passes cleanly across 568 files
- [x] 13.3 Run `npm run test` (Vitest) and confirm `ThemeProvider` tests pass — 485/485 tests pass across 38 story test files; ThemeProvider's 11 stories all green
- [ ] 13.4 Run `npm run dev` (Storybook) and verify:
  - The Design Tokens page renders correctly with all SAP groups
  - The theme toolbar works and switches themes without iframe reload
  - The `ThemeProvider` stories render and demonstrate each prop
  - Component pages will be visually broken — this is expected and explicitly in scope of follow-up changes
  
  **Deferred to user** — requires interactive Storybook session. Vitest test pass (13.3) confirms the stories themselves render and behave correctly under headless Playwright.
- [x] 13.5 Run `npm run format` to apply Biome formatting to any newly written files — formatted 567 files; fixed 10
- [x] 13.6 Validate the change with `openspec validate adopt-sap-horizon-tokens --strict` and resolve any reported issues — passes
