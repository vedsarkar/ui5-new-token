# Change: Typography Foundation — SAP 72 as Default Font

## Why

The Reltio Design Platform already declares **SAP Fiori / UI5 Web Components as the primary design reference** (see [`design-package-v1` proposal](../archive/2026-04-13-design-package-v1/proposal.md), section "Design References"). SAP **72** is the native typeface of SAP Fiori, so adopting it as the default system font is the logical next step in that strategy and unblocks future visual alignment with UI5 Web Components.

Beyond strategic alignment, today's typography is in a broken state:

- `public/global.css` declares `font-family: "Inter"` on `:root` with `!important`.
- However, **15 component CSS files override that root** with a mix of `"Libre Franklin"` (9 components), `"Roboto Flex"` (3), `"Roboto"` (2), `system-ui` (1), and various `monospace` stacks.
- Inter is loaded from the Google Fonts CDN (third-party network dependency).
- None of the override fonts (Libre Franklin, Roboto Flex, Roboto) are actually loaded — components silently fall back to whatever the OS provides.

The result: the platform claims `Inter` but renders OS defaults inconsistently across components.

## What Changes

### 1. Self-host SAP 72 (`@font-face`)

Add `public/fonts.css` that declares `@font-face` rules for SAP 72 (six weights) and 72 Mono (two weights). Each weight is declared twice with different `unicode-range` values so the browser only downloads what it needs:

- The Latin subset (e.g. `72-Regular.woff2`) is fetched for typical English UI.
- The extended `-full` subset (e.g. `72-Regular-full.woff2`) covers Cyrillic, CJK, Arabic, Greek, and the rest of the Basic Multilingual Plane; downloaded on demand when non-Latin characters appear on the page.

All 16 assets live directly in `public/fonts/` as a flat list of `.woff2` files (no subdirectories, no legacy `.woff`), so consumers can self-host by copying the entire directory in one step.

### 2. Make 72 the default `:root` font

Update `public/global.css` so `:root` uses `"72"` followed by a system fallback stack. Remove the Google Fonts CDN `<link>` from `.storybook/preview-head.html` and load `fonts.css` instead.

### 3. Remove per-component `font-family` overrides

Delete `font-family` declarations from 15 component CSS files (Avatar, Banner, Breadcrumbs, Button, Checkbox, Chip, Details, Markdown, Radio, Switch, Tabs, TextArea, TextField, TreeList, MarkdownNode chart). Components inherit `"72"` from `:root`. Form controls (`<input>`, `<textarea>`) keep `font-family: inherit` to defeat the browser default.

### 4. Wire 72 Mono into all monospace contexts

Replace bare `monospace` declarations with `"72 Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` in Markdown code blocks, Details JSON viewer, and the Storybook Fetcher block.

### 5. Update non-CSS font references

- `Welcome.story.mdx` — replace `-apple-system, BlinkMacSystemFont, ...` with `"72", -apple-system, ...`.
- `charts/SetOverlapChart/helpers.ts` — replace canvas font `"Inter"` with `"72"`.

### 6. Document typography

Add `guides/typography.story.mdx` describing available weights, the Mono stack, and the rule "components MUST NOT declare `font-family`; they inherit from `:root`".

## Scope

### In scope
- `public/fonts.css` with `@font-face` declarations for 6 + 2 weights
- Hybrid `unicode-range` strategy (Latin subset + extended `-full` subset)
- Cleanup of 15 component CSS files
- Mono stack in 3 monospace contexts
- Welcome story and SetOverlapChart canvas font
- Typography guide
- Drop `.woff` assets, dedupe stray `72Mono-Bold-full` files
- New capability spec `typography-foundation`

### Out of scope
- **Typography tokens (size/line-height) as CSS custom properties.** [`AGENTS.md`](../../../AGENTS.md) explicitly mandates plain CSS values for typography.
- **Additional weights** (Black, Condensed, CondensedBold, SemiboldDuplex). Can be added in a follow-up if needed.
- **Bundling fonts in the published `@reltio/design` npm package.** Requires separate decisions on package layout and license redistribution.
- **SAP theming or token compatibility.** Already declared out of scope by `design-package-v1`.

## Impact

- **Affected specs:** 1 new capability spec (`typography-foundation`).
- **Affected code:**
  - `public/fonts.css` — new file.
  - `public/global.css` — `:root` font-family changed.
  - `public/fonts/` — 16 new self-hosted `.woff2` files in a single flat directory (12 for `"72"` family × 2 subsets, 4 for `"72 Mono"`); SAP-original file names preserved.
  - `.storybook/preview-head.html` — Google Fonts removed, `fonts.css` added.
  - 15 component `.module.css` files — `font-family` overrides removed.
  - 3 `.module.css` files (Markdown, Details, Fetcher) — `monospace` replaced with 72 Mono stack.
  - `Welcome.story.mdx`, `charts/SetOverlapChart/helpers.ts` — font stack updated.
  - `guides/typography.story.mdx` — new file.
- **Dependencies:** No npm changes. SAP 72 is licensed by SAP for use in SAP-related products and consumer-facing materials; assets are shipped as static files in this repository (license to be confirmed by the project owner before publishing the design package).
- **Breaking changes:** Visual — applications consuming the design system will render text in 72 instead of the OS default. No API changes.
