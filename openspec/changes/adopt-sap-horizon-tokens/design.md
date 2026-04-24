## Context

Reltio Design Platform currently maintains its own design-token pipeline:
- `tokens/Light.tokens.json` and `tokens/Dark.tokens.json` are exported from a Reltio Figma file via the Tokens Studio plugin (~2,700 lines each, structured by Figma group / token name).
- `tokens/token-map.json` maps Figma names (e.g., `"Primary/Base"`) to compact CSS variable names (e.g., `"primary"`).
- `scripts/build-tokens.mjs` reads both, applies the mapping, and writes a single `public/variables.css` containing `:root { ... }` (light) and `[data-theme="dark"] { ... }` (dark) blocks with ~102 `--reltio-color-*` declarations each.
- All 25 components and 10 charts consume these variables directly. There are no tokens for spacing, sizing, radii, typography metrics, or shadow strings — by project convention, those are plain CSS values inside component modules.
- Theme switching is performed by toggling the `data-theme` attribute on an ancestor element. Subtree (scoped) theming is supported by virtue of CSS-variable inheritance.
- SAP 72 fonts are loaded via `public/fonts.css`, which hardcodes absolute URLs to the `reltio.design` CDN inside its `@font-face src` rules. The font face set covers six text weights (Light/Regular/Italic/Semibold/Bold/BoldItalic) and two monospace weights (Regular/Bold), each split into a Latin subset and a `-full` extended-coverage variant — 16 `.woff2` files in total.

The acquisition of Reltio by SAP requires alignment with the SAP Horizon visual language. SAP publishes its complete design-token system under Apache 2.0 in the [SAP/theming-base-content](https://github.com/SAP/theming-base-content) repository, including raw JSON sources in `content/Base/baseLib/sap_horizon/variables.json` and `content/Base/baseLib/sap_horizon_dark/variables.json`. Each file contains 1,536 keys covering colors, semantic states, typography metrics, shadow strings, border radii, focus styles, and component-specific tokens for ~30 SAP control families. SAP's Horizon font set additionally requires `72-SemiboldDuplex` and `72-Black` weights, both referenced by base tokens (`--sapFontSemiboldDuplexFamily`, `--sapFontBlackFamily`).

This change replaces the Reltio token pipeline with a verbatim mirror of those SAP files, splits output into per-theme CSS files, and introduces a React `ThemeProvider` component as the primary runtime API for activating a theme and loading SAP 72. A dual access model preserves direct CSS imports for non-React consumers.

Stakeholders: Reltio platform engineers (consume), Reltio designers (will switch to SAP Figma kit out-of-band), downstream Reltio product teams (will see broken visuals on next package update until follow-up component-rewrite changes ship; the new `ThemeProvider` API replaces their current `data-theme` toggling).

## Goals / Non-Goals

**Goals:**
- Adopt SAP Horizon as the single source of truth for design tokens in `@reltio/design`.
- Mirror SAP's published JSON files 1:1 into per-theme CSS files with zero transformation.
- Preserve SAP's exact token names (camelCase, underscore separators) so that any developer familiar with the SAP design system recognises every variable on sight, and so that future syncs from upstream are mechanical.
- Keep the build pipeline auditable — `scripts/build-tokens.mjs` remains a single-file Node script with no external dependencies beyond Node's built-ins, even if it grows beyond the original ~80-line sketch as it also emits Storybook documentation.
- Keep the JSON source files committed in-repo for reproducible builds, visible diffs in PRs, and offline reliability.
- Provide a single React `ThemeProvider` that encapsulates both theme activation (via `<link>`) and SAP 72 loading (via runtime-injected `<style>` carrying `@font-face` rules).
- Default to CDN-served files at `reltio.design`; allow consumers to fully self-host via per-file or base-URL props.
- Preserve a non-React access path (`import "@reltio/design/themes/<name>.css"`, `import "@reltio/design/fonts.css"`) for static sites and MDX docs.
- Replace the Storybook colors documentation (formerly `tokens/colors.story.mdx`, `tokens/ColorTokens.tsx`) with a single auto-generated `tokens/tokens.story.mdx` page produced by `scripts/build-tokens.mjs` — no hand-authored MDX body and no separate React table component. The page introspects the SAP JSON sources and groups tokens by their natural prefixes.
- Update all AI-agent guidance files (`AGENTS.md`, `CLAUDE.md`, `components/AGENTS.md`) and developer guides so that future code generation references `--sap*` and the `ThemeProvider` API correctly.

**Non-Goals:**
- Rewriting any component or chart CSS module to consume `--sap*` tokens. Every component will visually break after this change ships and will be repaired in subsequent change proposals.
- Introducing density modes (Cozy / Compact / Condensed). The relevant SAP tokens (`sapElement_Compact_Height`, `sapElement_Condensed_Height`) will be present in the per-theme CSS files as a side-effect of the dump, but no component consumes them and no `data-density` switching is wired.
- Adding high-contrast themes (Horizon HCB, Horizon HCW). Only Morning Horizon (light) and Evening Horizon (dark) are wired.
- Migrating iconography. The current Material Design 3 icon set under `icons/` is untouched.
- Adding any 3-level token hierarchy (reference / base / component). SAP's structure is flat in the JSON; we mirror it flat.
- Coordinating the Reltio Figma file changes. Designer workflow is changing, but the Figma side is out-of-band.
- Setting up automated upstream sync from SAP. Manual file copy is acceptable for v1.
- Providing SSR helpers for `ThemeProvider`. The component is client-only for v1; SSR support can be added in a follow-up change without breaking the client API.
- Supporting scoped (subtree) theming. The previous `data-theme` attribute mechanism allowed `<div data-theme="light">` islands inside a dark page; this is intentionally not preserved (see Decision 9).

## Decisions

### Decision 1: Source SAP tokens from `variables.json`, not `css_variables.css`

SAP publishes both formats under the same upstream directory. We use the JSON because:
- It is pure data — no `@font-face` declarations, no theming metadata comments, no CSS-syntax noise.
- It is trivially parseable in 1 line of Node.js.
- The CSS file mixes declarations from multiple SAP "engines" with `/*!SAP_POSTPROCESS_REDUCE_START*/` markers and inlined font-face rules that we already handle independently.

**Alternatives considered:**
- Use `css_variables.css` directly and `@import` it — rejected: brings in the noise above and ties our output format to SAP's CSS authoring choices.
- Install `@sap-theming/theming-base-content` as an npm dependency — rejected for v1: the package is ~90 MB (carries fonts, SVGs, multiple themes including legacy ones we don't want), pulling in Watson-style asset weight just to read two JSON files.

### Decision 2: Commit SAP JSON files verbatim into `tokens/`, sync manually

The two JSON files (~77 KB each) are committed directly into the repo at `tokens/sap_horizon.tokens.json` and `tokens/sap_horizon_dark.tokens.json` — renamed from SAP's upstream filename `variables.json` to match the project's `*.tokens.json` convention. Updates from upstream are performed by hand (`curl` from raw.githubusercontent.com, then commit) when needed.

**Why:**
- Reproducible builds — no network dependency at build time.
- Visible diff in PRs — when SAP changes a token value, the diff appears in the JSON file and downstream the diff appears in the per-theme CSS files. Reviewers can see exactly what changed.
- Lock-in to a known SAP version is implicit (whatever was last committed). No need for `package.json` pinning.

The same logic applies to the new font files (`72-SemiboldDuplex*.woff2`, `72-Black*.woff2`) — committed directly to `public/fonts/`, sourced manually from SAP `theming-base-content/content/Base/baseLib/baseTheme/fonts/`.

**Alternatives considered:**
- npm dependency on `@sap-theming/theming-base-content` — rejected for the size reason above.
- Build-time `curl` — rejected: builds become network-dependent, and there is no version pin.
- Submodule of the upstream repo — rejected: brings in the entire 200+ MB asset directory for two JSON files and four font files.

### Decision 3: Dump every SAP key 1:1 with a `--` prefix, preserve camelCase

Output format:
```css
:root {
	--sapBrandColor: #0070f2;
	--sapContent_Shadow0: 0 0 0.125rem 0 rgba(34,53,72,0.2), 0 0.125rem 0.25rem 0 rgba(34,53,72,0.2);
	--sapElement_BorderCornerRadius: 0.75rem;
	/* ... 1533 more ... */
}
```

camelCase is unusual for CSS variable conventions but matches SAP exactly. Any developer who has ever read SAP UI5, Fundamental Library Styles, or SAP Web Components source recognises every variable on sight. Search-and-paste from SAP documentation works without translation.

**Alternatives considered:**
- Convert to kebab-case (`--sap-brand-color`) — rejected: requires a transformation step (potential for collisions: `sapButton_Hover` and `sap-button-hover` both have to round-trip safely), removes the "drop-in 1:1" property, and creates ongoing translation cost when reading SAP docs.
- Drop the `sap` prefix and rename to `--reltio-*` — rejected: defeats the entire point of adopting the SAP standard.

### Decision 4: Do not filter tokens — ship all 1,536 per theme

Most components today use ~30 unique tokens. SAP exposes 1,536. The temptation is to ship only the subset we currently consume. We reject that. Instead we ship every key from the JSON.

**Why:**
- Future components and bug fixes get whatever SAP token they need with zero pipeline change.
- A `--sapTile_Background` variable is "free dead weight" today but is exactly the right answer the day someone implements a Tile component.
- Filtering creates an editorial decision the build script has no business making. Sync from upstream stays mechanical.
- ~80 KB of CSS variable declarations per theme parses in single-digit milliseconds in any modern browser. The cost is negligible.

**Trade-off:** DevTools "Computed" panel becomes noisy. Acceptable; developers who want to see only the variables a particular element actually uses can use the "Inspector" panel instead.

### Decision 5: Per-theme CSS files (one file per theme), `:root` selector only

Output is split: one CSS file per theme, each containing a single `:root { ... }` block.

```
public/themes/horizon-light.theme.css     ← 1536 vars on :root
public/themes/horizon-dark.theme.css      ← 1536 vars on :root
```

Themes are mutually exclusive at runtime. Only one is loaded into the page at a time (by `<link>` insertion, see Decision 8). Switching themes is a `<link>` href swap; the inactive theme's CSS is unloaded and its `:root` declarations are gone.

**Why:**
- Browser holds only the active theme's tokens in memory.
- Future themes (Horizon HCB, Horizon HCW, density variants) become additional files, not selector blocks bloating one monolith.
- No `[data-theme="dark"]` selector appears anywhere — the activation mechanism is file-level, not selector-level.
- Each per-theme file is self-contained. Embedding a single theme in an external page is a one-line `<link>` reference.

**Trade-off:** Switching themes requires fetching a new CSS file (FOUC potential on the first switch). Mitigated by HTTP cache after the first load — subsequent switches in the same session are instant.

**Alternatives considered:**
- Single combined file with `:root { ... }` and `[data-theme="dark"] { ... }` — original design from earlier proposal draft. Rejected because it does not scale to 4+ themes (HCB/HCW/density combinations) without bloating to ~600 KB and because it forces inactive-theme tokens into the cascade unnecessarily.
- "Disable" trick (load all themes, toggle `<link>.disabled`) — rejected: defeats the load-only-active goal.
- `prefers-color-scheme` media-link split — rejected: browsers fetch all media-matched stylesheets regardless of the media query (no real bandwidth saving), and the mechanism does not allow user override of the system preference.

### Decision 6: Generated CSS is checked in, not gitignored

`public/themes/*.theme.css` and `public/fonts.css` are regenerated from sources on every `npm run build-tokens` and committed to the repository. This matches the current convention for `public/variables.css` (auto-generated, committed). Visible diff in PRs lets reviewers see exactly what SAP token values changed.

### Decision 7: Generate `tokens/tokens.story.mdx` from `build-tokens` (no `Tokens.tsx`)

The Storybook design-tokens page is emitted as `tokens/tokens.story.mdx` by `scripts/build-tokens.mjs` alongside the per-theme CSS files. The generator reads `tokens/sap_horizon.tokens.json` and `tokens/sap_horizon_dark.tokens.json`, groups every key by its natural prefix (`sapBrand*`, `sapContent_*`, `sapButton_*`, etc.), and writes HTML `<table>` blocks (markdown pipe-tables are avoided — they do not reliably render in MDX when interleaved with JSX) where:
- colour values render as JSX `<span style={{ ... }}>` swatches with the raw value text overlaid in a contrasting colour (computed at generation time from the light / dark colour string),
- non-colour values render as monospace inline code.

**Why:** One file is the single source of truth for humans *and* for AI agents that read Storybook docs as raw MDX via MCP — a React-only table is invisible to those tools. The trade-off is losing interactive affordances (e.g., click-to-copy) that only a dedicated React component could provide.

The story title is "Design Tokens" (formerly "Colors"). It links out to the [SAP Horizon design system](https://www.sap.com/design-system/) for canonical documentation rather than re-explaining SAP's semantics in our docs.

### Decision 8: `ThemeProvider` is the primary runtime API for theme + font activation

A new React component, `<ThemeProvider />`, is the recommended way to activate a theme and load SAP 72 in a Reltio application. It is the single coordinated entry point for both concerns — they are tightly coupled in practice (a theme without its font is incomplete, and Reltio's "theme" is, by design, "SAP Horizon visual identity").

**API:**

```tsx
<ThemeProvider
  defaultTheme="auto"            // "auto" | "horizon-light" | "horizon-dark"
  themeUrls={{                   // optional per-file override; defaults from CDN
    "horizon-light": "/static/themes/horizon-light.css",
  }}
  themeBaseUrl="/static/themes"  // optional shortcut: constructs URLs as `${base}/<name>.theme.css`
  fontUrls={{                    // optional per-file override
    "72-Regular": "/static/fonts/72-Regular.woff2",
  }}
  fontBaseUrl="/static/fonts"    // optional shortcut: constructs URLs as `${base}/<name>.woff2`
>
  <App />
</ThemeProvider>
```

**Behaviour:**
- Manages a `<link rel="stylesheet">` element in `<head>` for the active theme. On mount, inserts the link with the resolved URL. On theme change, swaps the `href`. On unmount, removes the link.
- Manages a `<style>` element in `<head>` containing `@font-face` rules for the SAP 72 family (Variant X — runtime generation). The element is inserted once on mount and removed on unmount; URLs come from `fontUrls` / `fontBaseUrl` / CDN default.
- Resolves the active theme from `defaultTheme`, the `useTheme().setTheme()` API, and (when `defaultTheme="auto"`) the `prefers-color-scheme` media query.
- Provides a `useTheme()` hook returning `{ theme, resolved, setTheme }`:
  - `theme`: the user's selection (`"auto" | "horizon-light" | "horizon-dark"`).
  - `resolved`: what is actually active (`"horizon-light" | "horizon-dark"`).
  - `setTheme(next)`: change the user's selection; in `"auto"` mode, listens to `prefers-color-scheme` changes.

**Convenience wrapper:** Not introduced. A combined `<DesignSystem>` wrapper was considered and dropped — `ThemeProvider` already encapsulates both responsibilities, so a wrapper around it would be a no-op alias.

### Decision 9: Scoped (subtree) theming is explicitly unsupported

The previous `data-theme` attribute mechanism allowed mixing themes in a single page (e.g., a `<div data-theme="light">` island inside a dark dashboard). This change drops that capability. **One theme per page.**

**Why:**
- Aligns with SAP UI5 / Fundamental Library Styles practice (one theme per shell, no nested theming).
- Eliminates a class of consistency bugs where developers accidentally apply `data-theme` overrides to subtrees, producing visually fragmented UIs.
- Components that legitimately need to render in a different visual mode (e.g., a code editor with a dark syntax theme inside a light page) should expose that as their own component-level prop, not piggyback on the global theme system.
- Simplifies the per-theme CSS files to a single `:root` selector each — no specificity gymnastics.

**Edge case — Storybook docs that compare themes side-by-side:** Side-by-side comparison is implemented by spawning multiple iframes (each with its own `ThemeProvider`), not by nesting themes in the same DOM. Default Storybook behaviour is "one theme at a time, switched via toolbar".

### Decision 10: Dual access model — React API primary, raw CSS imports preserved

The package exposes two coexisting access paths:

1. **React API (recommended):** `<ThemeProvider />` and `useTheme()` from the main `@reltio/design` import. This is the documented and supported path for SPAs.
2. **Raw CSS imports / CDN URLs (preserved for non-React consumers):**
   - `import "@reltio/design/themes/horizon-light.css"` — resolves to the per-theme CSS file via package exports.
   - `import "@reltio/design/fonts.css"` — resolves to the regenerated `fonts.css` with CDN URLs baked in (matches current pattern).
   - Same files are reachable directly via `<link rel="stylesheet" href="https://reltio.design/themes/horizon-light.theme.css">` and `<link rel="stylesheet" href="https://reltio.design/fonts.css">`.

**Why:**
- Static sites, server-rendered pages without React control over `<head>`, and Storybook MDX docs need a stylesheet-only path.
- The React API is a wrapper over the same artefacts — no duplication, just a different consumption mechanism.

**Trade-off:** Two access paths means two ways to hold the API wrong. Mitigated by clear documentation: `ThemeProvider` is the recommended path; raw CSS is for the scenarios where React control over `<head>` is impractical.

### Decision 11: CDN delivery at `reltio.design`, with consumer URL overrides

By default, both per-theme CSS files and the SAP 72 font files are served from `https://reltio.design/themes/<name>.theme.css` and `https://reltio.design/fonts/<name>.woff2`, mirroring the existing `https://reltio.design/fonts.css` distribution. The CDN config (`vercel.json`) is extended to add `/themes/*` with the same CORS headers as the existing `/fonts/*` route.

`ThemeProvider` accepts four props for consumer-side override:
- `themeUrls` — per-theme URL map (highest priority).
- `themeBaseUrl` — base URL; the provider constructs `<base>/<name>.theme.css` for each theme not overridden in `themeUrls`.
- `fontUrls` — per-font-file URL map.
- `fontBaseUrl` — base URL; constructs `<base>/<name>.woff2` for each font file not overridden in `fontUrls`.

The fall-through chain for any single URL is: `*Urls[name]` → `*BaseUrl + name` → CDN default. Consumers who want to fully self-host set `themeBaseUrl` and `fontBaseUrl` to their own static paths and copy our files (or generate them) into those locations.

**Why:**
- Default UX is one line — `<ThemeProvider />`. No bundler wiring required.
- Self-host UX accommodates teams that want to pin the design-system version and avoid runtime CDN pulls (a real concern raised by downstream Reltio teams).
- Per-file override allows the rare case of partial self-hosting (one customised theme + CDN for the rest, or one font weight from an alternate source).

**Alternatives considered:**
- Bundler-import URLs only (`?url` import) — rejected: bundler-specific, requires every consumer to configure CSS-as-asset handling.
- Consumer-only URLs (no CDN default) — rejected: forces every consumer to host static assets just to get started.

### Decision 12: Font handling via runtime `<style>` injection (Variant X)

`ThemeProvider` injects SAP 72 `@font-face` rules into a runtime-created `<style>` element in `<head>`. The rules cover all 10 font face variants (Light, Regular, Italic, Semibold, SemiboldDuplex, Bold, BoldItalic, Black, Mono Regular, Mono Bold), each with a Latin and `-full` extended-coverage subset (20 `@font-face` rules total). URLs come from `fontUrls` / `fontBaseUrl` / CDN default.

**Why:**
- Runtime URLs respect the consumer's override props without requiring a build step on the consumer side.
- All `@font-face` rules in one place, generated from a single source of URLs.
- Browser `font-display: swap` ensures fallback fonts appear during the brief window before `ThemeProvider` mounts and the SAP 72 files load — no blank text.

**For non-React consumers:** the regenerated `public/fonts.css` (CDN URLs baked in) provides the same `@font-face` rules statically. They are byte-equivalent in default configuration; the runtime path simply lets consumers parameterise the URLs.

**Alternatives considered:**
- Build-time generation of a parameterised `fonts.css` from a CLI utility — rejected as redundant: consumers who want full self-hosting can write their own `fonts.css` (since they already need to host the `.woff2` files), and the runtime override via `fontUrls` covers the same ground without an extra build step.
- Single `<link>` to a parameterised `fonts.css` with `?baseUrl=...` query — rejected: requires server-side processing of the query, breaking the static-CDN model.

### Decision 13: Add `72-SemiboldDuplex` and `72-Black` weights for SAP completeness

The current `fonts.css` covers six text weights and two monospace weights. SAP Horizon adds two more text weights: `72-SemiboldDuplex` (used for interactive-affordance text without width jumps) and `72-Black` (900, used for major headers in Horizon). Both are referenced by SAP base tokens (`--sapFontSemiboldDuplexFamily`, `--sapFontBlackFamily`) and would otherwise fall through to system fallbacks in any component that uses them.

We add four new `.woff2` files (`72-SemiboldDuplex.woff2`, `72-SemiboldDuplex-full.woff2`, `72-Black.woff2`, `72-Black-full.woff2`) and corresponding `@font-face` rules to the generated `fonts.css`.

**Out of scope:** `72-Condensed` and `72-CondensedBold` (used for `font-stretch: condensed` in dense table contexts). Adding them is a small follow-up if components ever need that variant.

### Decision 14: Non-rendering React component, no `.module.css`

`ThemeProvider` renders only `props.children` — it has no markup of its own; all its work is in `useEffect` side effects on `<head>`. Per the project's component structure rule (`components/AGENTS.md`), the `.module.css` file is therefore omitted. Files: `ThemeProvider.tsx`, `ThemeProvider.types.ts`, `ThemeProvider.stories.tsx`, `index.ts`.

The `useTheme` hook lives alongside as a co-export.

## Risks / Trade-offs

[**Risk 1: Massive visual breakage of all 25 components and 10 charts on the next package version**] → Mitigation: Phase 2 component CSS rewrite ships in a follow-up change proposal before any consumer upgrades. The package is `0.x` and currently has no production consumers; internal consumers are aware that breaking changes are expected. Coordination is via release notes on the next minor bump.

[**Risk 2: First theme switch shows brief unstyled flash (FOUC)**] → Mitigation: Browser HTTP cache eliminates the flash on subsequent switches in the same session. For first-load, the default `defaultTheme="auto"` resolves immediately via `prefers-color-scheme` so most users never see a switch at all. Teams that want to eliminate the first-switch flash entirely can preload the alternate theme via `<link rel="preload" as="style">` (out of scope to wire automatically).

[**Risk 3: Storybook design-tokens page becomes stale or malformed if `build-tokens` is not run after JSON updates**] → Mitigation: `tokens/tokens.story.mdx` is regenerated on every `npm run build-tokens` (same command as the theme CSS files). PRs that touch the JSON sources must include the regenerated MDX in the diff. CI / pre-commit can enforce this with a simple `git diff --exit-code` check if needed.

[**Risk 4: Designers continuing to author tokens in the Reltio Figma will see no effect**] → Mitigation: The designer-facing Figma workflow change is communicated by the project owner before this change merges. This proposal explicitly puts that communication out of scope.

[**Risk 5: SAP changes a token in upstream, breaking us silently because we have no automated sync**] → Mitigation: Upstream changes are infrequent (Horizon is post-1.0 and stable); manual sync gives us a chance to review the diff. If frequency increases, switching to npm dependency (Decision 2 alternative) is straightforward.

[**Risk 6: Per-theme files mean two CDN deployments need to land before the package is usable from CDN**] → Mitigation: CDN deployment is part of this change's task list. The npm package consumers using `themeBaseUrl` for self-hosting are unaffected.

[**Risk 7: `ThemeProvider` is a single point of failure for both theming and font loading**] → Mitigation: Both responsibilities are tightly coupled in practice (a Reltio theme implies SAP 72), and combining them in one provider eliminates the boilerplate of always wiring two providers together. If the coupling becomes painful in the future, splitting is a non-breaking refactor (the new `<FontProvider>` could be exposed alongside, with `ThemeProvider` continuing to manage fonts unless one is found in context).

[**Risk 8: The Variant X runtime `@font-face` injection means text initially renders in fallback fonts before `ThemeProvider` mounts**] → Mitigation: `font-display: swap` is set on every `@font-face` rule; browsers render fallback immediately and swap to SAP 72 once the font file loads. The visual impact is identical to the current `fonts.css`-via-`<link>` approach, where the same swap behaviour applies during the initial font fetch.

[**Risk 9: Token files plus generated CSS plus font files together exceed 600 KB in the repository**] → Mitigation: ~150 KB of JSON + ~160 KB of generated CSS + ~80 KB of new font files (compressed `.woff2`). Total ~390 KB added. Acceptable for a design-system repository; nothing is on the critical path of the published npm package's runtime size beyond what's already shipped (CDN-served files don't count toward bundle size).

## Migration Plan

1. **Pre-merge**:
   - Project owner confirms Reltio designers have been informed of the Figma workflow change.
   - SAP JSON files downloaded and committed.
   - SAP font files (`72-SemiboldDuplex*.woff2`, `72-Black*.woff2`) downloaded and committed to `public/fonts/`.
   - CDN deployment (Vercel) extended to serve `/themes/*` with appropriate CORS headers.
2. **Merge**: This change ships in a single PR. After merge, `npm run build-tokens` regenerates `public/themes/*.theme.css` and `public/fonts.css`. All components are visually broken on the next Storybook reload — this is expected and explicitly in scope of follow-up changes.
3. **Immediate follow-up**: Phase 1 (visual primitives) and Phase 2 (component CSS rewrite) change proposals begin. Until at least Phase 2 is partially landed, the Storybook is intentionally in a broken visual state. This is acceptable because Storybook serves as the dev/integration environment, not a production surface.
4. **Rollback**: Reverting this change restores the previous token pipeline and the previous `fonts.css`. The `--reltio-color-*` namespace can be brought back wholesale via `git revert`. CDN files for `/themes/*` can be left in place (they cause no harm). No data migration, no consumer compatibility window.

## Open Questions

- **Q1 (resolved)**: How are SAP JSON sources kept in sync? — Manually committed via `curl`. The directory `tokens/README.md` records the upstream URLs, license, and last-fetched date.
- **Q2 (deferred)**: When Phase 2 components start consuming `--sap*` tokens, do we want to introduce a thin set of project-specific *semantic* aliases (e.g., `--reltio-content-radius: var(--sapElement_BorderCornerRadius)` for places where we want one knob to override several uses)? Out of scope for this change; raise in Phase 1 if needed.
- **Q3 (resolved)**: Does `tokens/ColorTokens.module.css` survive the rewrite of `ColorTokens.tsx`? — Superseded: the Storybook token table is fully generated into `tokens/tokens.story.mdx`; dedicated `Tokens.tsx` / `Tokens.module.css` files are not used.
- **Q4 (deferred)**: Should `ThemeProvider` persist the user's theme selection to `localStorage`? Most consumers will want this; some (privacy-strict deployments) will not. Default for v1: do not persist (simpler, no storage permission concerns); document `useTheme().setTheme()` as the integration point for consumer-side persistence. Revisit if this is a frequent ask.
- **Q5 (deferred)**: Should `ThemeProvider` accept a render-prop or `onThemeChange` callback for consumers that want to mirror the resolved theme into other styling layers (e.g., chart libraries that need to know the active theme)? Default for v1: no — `useTheme()` already exposes everything via subscription. Revisit if needed.
