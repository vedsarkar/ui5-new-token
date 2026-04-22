# Tasks

## 1. Font assets cleanup
- [x] Delete all `.woff` files (keep only `.woff2`)
- [x] Drop unused weights (Black, Condensed, CondensedBold, SemiboldDuplex) — only the 6 ship weights + 2 mono are kept
- [x] Flatten everything into a single `public/fonts/` directory with 16 files (12 for `"72"` family × 2 subsets, 4 for `"72 Mono"`). No subdirectories. File names follow SAP's original convention (`72-Regular.woff2`, `72-Regular-full.woff2`, `72Mono-Bold.woff2`, ...) so consumers can copy the whole directory in one step

## 2. `public/fonts.css`
- [x] Create `public/fonts.css`
- [x] Add 12 `@font-face` blocks for SAP 72: 6 weights (Light 300, Regular 400, Italic 400i, Semibold 600, Bold 700, BoldItalic 700i) × 2 (Latin subset + extended `-full` subset)
- [x] Add 4 `@font-face` blocks for 72 Mono: Regular + Bold × (subset + `-full`)
- [x] All declarations use `font-display: swap`, `format("woff2")`, and absolute CDN URLs like `url("https://reltio.design/fonts/72-Regular.woff2")` so the same file works both on the Storybook origin and when shipped via npm (`import "@reltio/design/fonts.css"`) without a transformation step

## 3. Global CSS and Storybook head
- [x] Update `public/global.css` `:root` to `font-family: "72", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;`
- [x] Remove the three Google Fonts `<link>` tags from `.storybook/preview-head.html`
- [x] Add `<link rel="stylesheet" href="/fonts.css" />` to `.storybook/preview-head.html` before `global.css`

## 4. Remove per-component `font-family` overrides
- [x] `components/Avatar/Avatar.module.css`
- [x] `components/Banner/Banner.module.css`
- [x] `components/Breadcrumbs/Breadcrumbs.module.css`
- [x] `components/Button/Button.module.css`
- [x] `components/Checkbox/Checkbox.module.css`
- [x] `components/Chip/Chip.module.css`
- [x] `components/Details/Details.module.css` (only the `.root` declaration; mono stays — see task 5)
- [x] `components/Markdown/Markdown.module.css` (only `Roboto Flex` / `Libre Franklin`; mono stays)
- [x] `components/Radio/Radio.module.css`
- [x] `components/Switch/Switch.module.css`
- [x] `components/Tabs/Tabs.module.css`
- [x] `components/TextArea/TextArea.module.css` (replace all four `Roboto` references with `font-family: inherit`)
- [x] `components/TextField/TextField.module.css` (drop the `Libre Franklin` override; keep `font-family: inherit` on the `<input>`)
- [x] `components/TreeList/TreeList.module.css`
- [x] `charts/Diagram/components/MarkdownNode/MarkdownNode.module.css`

## 5. 72 Mono in monospace contexts
- [x] `components/Markdown/Markdown.module.css` (`code`/`pre`)
- [x] `components/Details/Details.module.css` (JSON viewer)
- [x] `.storybook/blocks/Fetcher.module.css` (request + response blocks)

All three set `font-family: "72 Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;`

## 6. Welcome story and chart canvas
- [x] `Welcome.story.mdx` — replace the system-font stack on `.welcome` with `"72", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- [x] `charts/SetOverlapChart/helpers.ts` — replace `"Inter", sans-serif` with `"72", sans-serif` for the canvas font

## 7. Typography guide
- [x] Create `guides/typography.story.mdx` documenting:
  - Default font is SAP 72; available weights (300/400/400i/600/700/700i)
  - Mono stack: `"72 Mono", ui-monospace, ...`
  - Rule: components MUST NOT declare `font-family`; inherit from `:root`
  - Note for consumers: copy `public/fonts/` and load `public/fonts.css` early
  - How `unicode-range` automatically selects the right subset

## 8. Verification
- [x] `npm run dev` — Storybook boots without errors
- [x] DevTools → Network on a Latin-only Storybook page: only Latin-subset `.woff2` files load (the ones without the `-full` suffix); no requests to `fonts.gstatic.com`
- [x] DevTools → Network on a page rendering Cyrillic data (e.g. paste Russian text into a TextField story): the corresponding `-full` `.woff2` weight downloads on demand
- [x] `rg "font-family" components/ charts/` returns only `font-family: inherit` (form controls) and the 72 Mono stack (3 files)
- [x] `npm run lint` passes
- [x] `npm run format` produces no diff
- [x] `openspec validate add-typography-foundation --strict` passes
