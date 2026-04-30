## Why

Reltio is being acquired by SAP (announced March 27, 2026; closing Q2/Q3 2026), and the platform will be integrated into SAP Business Data Cloud. Visual alignment with the SAP Fiori / Horizon design language is the first thing the SAP ecosystem will require from our UI. We want to adopt the SAP visual standard while keeping technological independence — implement the rules ourselves inside `@reltio/design`, without pulling in SAP's React libraries, Web Components, or build chain.

This change introduces the foundation: a complete, 1:1 mirror of the SAP Horizon CSS variable system, delivered as per-theme CSS files, plus a React `ThemeProvider` component that encapsulates both theme activation and SAP 72 font loading. Both are exposed through a dual access model (React-first, with raw CSS imports as a fallback for non-React consumers). The change does not yet rewrite components — that comes in subsequent changes. It establishes the new ground on which all visual migration work stands.

## What Changes

- **BREAKING**: Remove the entire `--reltio-color-*` CSS custom property namespace from the public surface. Every component that references those variables will visually break until rewritten in a follow-up change.
- **BREAKING**: Remove `tokens/Light.tokens.json`, `tokens/Dark.tokens.json`, and `tokens/token-map.json`. The Figma-driven Tokens Studio export pipeline is replaced by a direct mirror of SAP's published token files.
- **BREAKING**: Remove `public/variables.css` as the single combined-themes file. Tokens are now delivered as per-theme files at `public/themes/horizon-light.theme.css` and `public/themes/horizon-dark.theme.css`.
- **BREAKING**: Remove `[data-theme="dark"]` as the theme activation mechanism. Themes are activated by loading the corresponding CSS file via `<link rel="stylesheet">`. Scoped (subtree) theming is explicitly unsupported — one theme per page.
- Add `tokens/sap_horizon.tokens.json` and `tokens/sap_horizon_dark.tokens.json` — verbatim copies of the corresponding `variables.json` files from [SAP/theming-base-content](https://github.com/SAP/theming-base-content) (renamed to match the project's `*.tokens.json` naming convention), committed into the repository as the source of truth.
- Add SAP `72-SemiboldDuplex` and `72-Black` font weights to the `public/fonts/` directory and the generated `fonts.css`. These weights are referenced by SAP base tokens (`--sapFontSemiboldDuplexFamily`, `--sapFontBlackFamily`) and required for completeness.
- Rewrite `scripts/build-tokens.mjs` to:
  - read the two SAP JSON files,
  - emit one `:root { ... }`-only CSS file per theme at `public/themes/<theme>.theme.css`, with every key dumped as a `--<key>: <value>;` declaration (preserving SAP's exact camelCase, no transformation),
  - emit a regenerated `public/fonts.css` whose `@font-face src` URLs point at the `https://reltio.design` CDN (matching the current convention),
  - emit `tokens/tokens.story.mdx` — the Storybook "Design Tokens" documentation page (auto-generated; do not edit by hand), with HTML `<table>` layouts for every token group and JSX colour swatches (`<span style={{ ... }}>`) so the same file serves UI readers and AI agents consuming Storybook via MCP.
- Add a new `components/ThemeProvider/` React component:
  - manages `<link rel="stylesheet">` injection for the active theme (`horizon-light` / `horizon-dark` / `auto`),
  - manages `<style>` injection for SAP 72 `@font-face` rules (Variant X — runtime generation),
  - resolves URLs from CDN by default; consumers can override via `themeUrls`, `themeBaseUrl`, `fontUrls`, `fontBaseUrl` props,
  - exposes a `useTheme()` hook returning `{ theme, resolved, setTheme }`.
- Add a dual access model:
  - React consumers use `<ThemeProvider />` (recommended).
  - Non-React consumers (static sites, MDX docs, server-rendered pages without React control over `<head>`) use direct CSS imports: `import "@reltio/design/themes/horizon-light.css"` and `import "@reltio/design/fonts.css"`, or `<link>`-style references to `https://reltio.design/...` URLs.
- Update Storybook to use the `ThemeProvider` and add a toolbar control for switching the active theme. Remove the previous `data-theme` attribute toggle.
- Remove the previous hand-authored Storybook token viewer (`tokens/ColorTokens.tsx`, `tokens/colors.story.mdx`, and their CSS module). The "Design Tokens" page is now entirely generated into `tokens/tokens.story.mdx` by `npm run build-tokens`, grouped by SAP's natural prefixes (`sapBrand*`, `sapField*`, `sapButton*`, etc.).
- Update repository AI guidance (`AGENTS.md`, `CLAUDE.md`, `components/AGENTS.md`) and developer guides (`guides/typography.story.mdx`) to reference the new `--sap*` token names, the per-theme file architecture, the `ThemeProvider` API, and the new sync workflow.
- Add a sidecar `tokens/README.md` documenting the upstream URLs, license (Apache 2.0), the date or SHA at which the JSON and font files were last fetched, and the manual sync procedure for future updates.

## Capabilities

### New Capabilities
- `design-tokens`: Defines how SAP Horizon design tokens (colors, shadows, radii, font metrics, and all other SAP visual primitives) are sourced, generated, and exposed as per-theme CSS files for consumption by components and external applications.
- `theme-management`: Defines the runtime mechanism by which a consuming application activates a theme and loads the SAP 72 font family. Specifies the `ThemeProvider` React component, the `useTheme` hook, the dual access model (React + raw CSS), CDN delivery defaults, consumer URL overrides, and the explicit non-support of scoped (subtree) theming.

### Modified Capabilities
- `typography-foundation`: The font asset set expands from 16 to 20 files (adding `72-SemiboldDuplex` and `72-Black`, both regular and `-full` subsets) and from six text weights to eight. The Storybook preview no longer loads `<link rel="stylesheet" href="/variables.css">` (the file is removed) or `<link rel="stylesheet" href="/fonts.css">` from `preview-head.html` — both are now handled by the `ThemeProvider` decorator. `preview-head.html` retains only the local `/global.css` link.

## Impact

- **Affected code**:
  - `tokens/` directory — full restructure: SAP JSON sources committed (as `sap_horizon{,_dark}.tokens.json`), old Reltio JSON removed, `README.md` added
  - `scripts/build-tokens.mjs` — full rewrite (one pass that emits both per-theme CSS files and `fonts.css`)
  - `public/themes/` directory — new, contains generated per-theme CSS files
  - `public/variables.css` — removed
  - `public/fonts.css` — regenerated to include `72-SemiboldDuplex` and `72-Black` faces
  - `public/fonts/` — two new font weights added (`.woff2` files for `72-SemiboldDuplex` and `72-Black`, both regular and `-full` unicode subsets)
  - `components/ThemeProvider/` — new component (`.tsx`, `.types.ts`, `.stories.tsx`, `index.ts`; no `.module.css` since it renders no markup)
  - `tokens/tokens.story.mdx` — auto-generated by `scripts/build-tokens.mjs` (replaces the former `ColorTokens.tsx` / `colors.story.mdx` approach)
  - `.storybook/preview.tsx` — switched from `data-theme` attribute manipulation to `<ThemeProvider>` wrapping; toolbar control rewired
  - `AGENTS.md`, `CLAUDE.md`, `components/AGENTS.md` — token and theming guidance rewritten
  - `guides/typography.story.mdx` — rewritten around the `ThemeProvider` API
  - `package.json` — `exports` field expanded to publish `./themes/*.css` and `./components/ThemeProvider`
  - `vercel.json` — extended to serve `/themes/*` with appropriate CORS headers (matches existing `/fonts/*` configuration)
- **Affected systems**:
  - All 25 `components/*` and 10 `charts/*` modules currently consume `var(--reltio-color-*)`. They will be visually broken after this change. Their CSS rewrite is scoped out of this proposal and tracked in follow-up changes.
  - The Storybook colors page changes structure entirely.
  - Designers can no longer author tokens through the Reltio Figma → Tokens Studio export. They must reference the SAP Horizon Figma kit instead. Out-of-band coordination required.
- **Dependencies**: No new npm dependencies. SAP JSON files and font files are committed directly into the repository (manual sync from upstream when an update is needed).
- **Public API of `@reltio/design`**:
  - `--reltio-color-*` CSS custom properties are removed.
  - New `<ThemeProvider />` React component and `useTheme()` hook are added under the standard `@reltio/design` import path.
  - New raw-CSS exports under `@reltio/design/themes/<name>.css`.
  - `import "@reltio/design/fonts.css"` continues to work (regenerated content with CDN URLs).
  - The package is currently `0.x` and has no production consumers, so these breaking changes are acceptable without a deprecation cycle.
- **CDN**: New files at `https://reltio.design/themes/<name>.theme.css` (joining the existing `https://reltio.design/fonts.css` and `https://reltio.design/fonts/*.woff2`).
- **Out of scope**: rewriting component CSS modules to use `--sap*` tokens; SAP icon migration; density modes (Cozy/Compact/Condensed); high-contrast themes (HCB / HCW); SSR helpers for `ThemeProvider`. Each is tracked as a separate follow-up change or deferred indefinitely.
