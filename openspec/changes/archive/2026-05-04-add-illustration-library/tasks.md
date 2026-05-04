# Tasks: Add Illustration Library

## 1. Infrastructure Setup

- [x] 1.1 Create `illustrations/_source/` directory in the repo (initially empty; populated by the build script). Sources are NOT served as public assets
- [x] 1.2 Create `illustrations/` directory at the repo root for generated React output
- [x] 1.3 Add `"./illustrations": "./illustrations/index.ts"` and `"./illustrations/*": "./illustrations/*.tsx"` entries to the `exports` field in `package.json`
- [x] 1.4 Add `"build-illustrations": "node scripts/build-illustrations.mjs"` to the `scripts` section of `package.json`

## 2. Core Component and Types

- [x] 2.1 Create `illustrations/Illustration.types.ts` exporting `IllustrationSize` (`"spot" | "dialog" | "scene"`), `IllustrationProps` built from `HtmlProps<"div", { size?, title?, description? }>`, and `IllustrationCoreProps` (extends `IllustrationProps` with `children?: React.ReactNode`)
- [x] 2.2 Create `illustrations/Illustration.module.css` with `.root` (display, position, flex-shrink), `.spot` / `.dialog` / `.scene` size classes (physical dimensions), `.svg` class with `display: none` and `width: 100% / height: 100%`, compound selectors `.spot .svgSpot`, `.dialog .svgDialog`, `.scene .svgScene` flipping `display: block`, and a `.srOnly` screen-reader-only utility
- [x] 2.3 Create `illustrations/Illustration.tsx` rendering a `<div>` with `role="img"`, `aria-label={title}`, `classNames(styles.root, styles[size], className)`, the optional `description` rendered into a `<span class={styles.srOnly}>`, the `children` (inlined `<svg>` elements) passed through, and rest props spread to the root
- [x] 2.4 Implement the empty-`title` branch in `Illustration.tsx`: when `title === ""`, omit `aria-label` and add `aria-hidden="true"` instead
- [x] 2.5 Create `illustrations/IllustrationDoc.tsx` (type-only doc component used by Storybook autodocs, mirrors `icons/IconDoc.tsx`)
- [x] 2.6 Create `illustrations/IllustrationStories.module.css` with the shared story layout (mirrors `icons/IconStories.module.css`)

## 3. Generator Script

- [x] 3.1 Create `scripts/build-illustrations.mjs` by cloning `scripts/build-icons.mjs` as a starting point
- [x] 3.2 Define a constant `SAP_REF` (default `"main"`) at the top of the file with a header comment documenting how to bump it
- [x] 3.3 Define an `ILLUSTRATION_NAMES` allowlist constant of 32 names that pass design review against the current SAP Horizon Figma kit. Add a header comment documenting the curation rationale and the workflow to add a new name (validate → review → list → manifest → rebuild)
- [x] 3.4 Implement an HTTP fetch helper that downloads `https://raw.githubusercontent.com/UI5/webcomponents/<SAP_REF>/packages/fiori/src/illustrations/sapIllus-<Size>-<Name>.svg`, with a configurable concurrency cap (default 8) and exponential-backoff retries on transient failures (HTTP 5xx, network errors)
- [x] 3.5 For each `(name, size)` pair, write the fetched SVG to `illustrations/_source/<kebab-name>-<size>.svg` (kebab-cased base name, lowercase size token)
- [x] 3.6 Implement inventory validation: confirm exactly three SVGs per listed name (spot/dialog/scene) are present; on mismatch print missing combinations and exit non-zero. Implement a reconcile pass that deletes orphan `_source/*.svg` and `illustrations/*.tsx` files when their names are no longer in `ILLUSTRATION_NAMES`
- [x] 3.7 Implement variable validation: scan every downloaded SVG for `var(--sap...)` references and assert each variable name exists in `public/variables.css`; fail the build with a clear message if any are missing
- [x] 3.8 Add manifest loading: read `illustrations/manifest.json` if present; for each base name, look up `title` and `description`; fall back to humanized title (kebab to title case) and empty description
- [x] 3.9 Implement SVG inlining: for each illustration, parse the three SVG files, extract the inner content (everything between the outer `<svg>` tags) and the `viewBox` attribute, preserving all child elements verbatim including `var(--sap...)` references
- [x] 3.10 Implement the wrapper-component template that emits `<PascalName>.tsx` containing three inline `<svg>` elements (one per size) wrapped in `<Illustration>`, with default `size = "dialog"`, `title`, `description` from the manifest, and rest-spread to the core
- [x] 3.11 Implement `index.ts` generation: emit `import` lines for every wrapper, an `export { ... }` block, and an `illustrationMap: Record<string, React.ComponentType<IllustrationProps>>` keyed by component name; also re-export `IllustrationProps`, `IllustrationSize`, and the `Illustration` core
- [x] 3.12 Implement unified `Illustrations.stories.tsx` generation: one `Story` per illustration that renders a 2-row × 3-column matrix — light-theme row (Spot/Dialog/Scene) over dark-theme row (Spot/Dialog/Scene), each row wrapped in an explicit `data-theme` div with `background: var(--sapBackgroundColor)`. Meta points to `IllustrationDoc.tsx` and inherits `tags: ["autodocs"]` from the global preview so the standard Storybook Docs page is used
- [x] 3.13 Invoke `npm run format` at the end of the script via `execSync`, mirroring `build-icons.mjs`

## 4. Initial Asset Population

- [x] 4.1 Run `npm run build-illustrations` against the default `SAP_REF` and confirm all 96 SVGs (32 approved × 3 sizes) land in `illustrations/_source/`
- [x] 4.2 Verify the variable-validation step passes against the current `public/variables.css` (no missing `--sapContent_Illustrative_*` tokens)
- [x] 4.3 Author `illustrations/manifest.json` mapping each illustration name to a default `title` and `description` (English copy aligned with the corresponding empty/error/success state semantics; reference SAP's i18n bundles for inspiration)
- [x] 4.4 Re-run `npm run build-illustrations` so the manifest defaults flow into the generated wrappers
- [ ] 4.5 Commit the downloaded SVGs alongside the generated TSX so subsequent CI builds do not need to fetch from GitHub

## 5. Storybook Docs Page (Standard Autodocs)

- [x] 5.1 In the unified `Illustrations.stories.tsx` generator output, set `meta.component` to `IllustrationDoc` and rely on Storybook's built-in autodocs (title + description + props table + story list) — do NOT register a `parameters.docs.page` override
- [x] 5.2 Add `illustrations/**/*.tsx` to `reactDocgenTypescriptOptions.include` in `.storybook/main.ts` so autodocs can extract the prop types for the Illustrations Docs page

## 6. Documentation Guide

- [x] 6.1 Create `guides/illustration-library.story.mdx` with the standard `<Meta title="Guides/Illustration Library" />` header
- [x] 6.2 Document the React component as the single access path with concrete code samples; explicitly explain why raw SVG URLs are not exposed (SAP variable references require inline DOM cascade)
- [x] 6.3 Document all props (`size`, `title`, `description`, `className`, `style`, rest) with a table per the existing icon-library guide style
- [x] 6.4 Document the theme-switching mechanism: ancestor `data-theme="horizon-dark"` swaps the `--sapContent_Illustrative_*` token values, which the inline SVG variables resolve from automatically
- [x] 6.5 Explain the rationale for the single access path (SAP `var(--sap...)` fills in source SVGs are scoped to inline-DOM rendering only)
- [x] 6.6 Document accessibility: `role="img"` + `aria-label` on the wrapper, screen-reader-only description, `aria-hidden` on inner SVGs, opt-out via `title=""`
- [x] 6.7 Document the upstream sync workflow: bump `SAP_REF`, run `npm run build-illustrations`, review the diff, commit
- [x] 6.8 Document the custom-palette override pattern: redefining `--sapContent_Illustrative_Color*` in a CSS scope re-tints every illustration in that scope
- [x] 6.9 Add SAP attribution (Apache 2.0, link to `SAP/ui5-webcomponents`) and a "Sources and References" section linking to the SAP design-system illustration documentation

## 7. Validation and Quality Gates

- [x] 7.1 Run `npm run lint` and fix any issues introduced in `illustrations/`, `scripts/`, `.storybook/blocks/`, and `guides/`
- [x] 7.2 Run `npm run format` to apply Biome formatting across all touched files
- [x] 7.3 Run `npm run dev` and visually verify the Illustrations Storybook page renders every illustration with all three sizes and that copy-to-clipboard works for both columns
- [x] 7.4 In Storybook, toggle the theme to `horizon-dark` (via the existing theme addon) and verify all illustrations switch palette correctly without remount
- [x] 7.5 Confirm raw SVG paths are NOT served publicly: `curl http://localhost:6006/illustrations/<any>.svg` MUST return 404
- [x] 7.6 Verify barrel and per-path imports both resolve via TypeScript: spot-check `import { NoData } from "@reltio/design/illustrations"` and `import { NoData } from "@reltio/design/illustrations/NoData"`
- [x] 7.7 Run the Storybook a11y addon on at least one illustration story and confirm no violations
- [x] 7.8 Confirm tree-shaking: build a minimal Storybook story importing only one illustration and inspect the bundle to confirm other illustration wrappers and SVG bodies are absent

## 8. Pre-Archive Checklist

- [x] 8.1 Confirm every requirement scenario in `specs/illustration-library/spec.md` is covered by either a generator behavior, a Storybook story, or a documented user flow
- [x] 8.2 `package.json` exports verified end-to-end (build, types resolve, runtime imports succeed)
- [x] 8.3 All linter and formatter gates pass on a clean tree
- [x] 8.4 Guide is reviewable in Storybook under "Guides → Illustration Library" and includes SAP attribution
- [x] 8.5 `SAP_REF` is documented and pinned to a specific tag/commit (not a moving branch) for the first release
