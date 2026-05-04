# Tasks: Modernize Icon Library

## 1. Move SVG Sources to icons/_source/

- [x] 1.1 Create `icons/_source/` directory.
- [x] 1.2 Move every file from `public/icons/*.svg` into `icons/_source/` with `git mv`.
- [x] 1.3 Delete the now-empty `public/icons/` directory.

## 2. Build Script Retargeting

- [x] 2.1 Update `scripts/build-icons.mjs` `ICONS_SOURCE_DIR` constant from `"public/icons"` to `"icons/_source"`.
- [x] 2.2 Confirm the existing component generator and `index.ts` generator still produce identical output (checksums on a sample component).
- [x] 2.3 Update the unified-stories generator to emit a 2-row light/dark matrix per icon, mirroring `illustrations/Illustrations.stories.tsx`. Each row uses `data-theme="horizon-light"` / `data-theme="horizon-dark"`.

## 3. Stories CSS

- [x] 3.1 Update `icons/IconStories.module.css` so `.story` becomes a vertical column with gap, and add a new `.row` class with horizontal flex, gap, padding, `background: var(--sapBackgroundColor)`, and `border-radius: 12px` (mirrors the illustration stories CSS).

## 4. Regenerate Icon Stories

- [x] 4.1 Run `npm run build-icons`.
- [x] 4.2 Verify `icons/Icons.stories.tsx` was regenerated with the new matrix and that the per-icon component files are byte-identical (formatter-aside) to the previous output.
- [x] 4.3 Open Storybook (`npm run dev`) and spot-check three icons (e.g. `Search`, `CheckCircle`, `Warning`) to confirm both light and dark rows render correctly.

## 5. Storybook Icon Library Block

- [x] 5.1 Update `.storybook/blocks/IconLibrary.tsx` to remove the URL cell, the `path` field on each icon entry, the `url` constant, and the `url-${icon.name}` copy state. The table now has two columns (preview, import snippet).
- [x] 5.2 Update `.storybook/blocks/IconLibrary.module.css` to remove styles that only applied to the dropped URL cell (none expected beyond the existing classes; keep `.iconCell`, `.copyCell`, `.codeCopied`).
- [x] 5.3 Spot-check the Docs page in Storybook to confirm the catalog still renders all icons with the import snippet and copy-on-click works.

## 6. Documentation Guide

- [x] 6.1 Edit `guides/icon-library.story.mdx`:
  - Remove the **Direct URL Access (CDN)** section.
  - Remove the "Dual Access" row from the principles table.
  - Replace "Access Patterns" prose with single React-component pattern (mirroring the illustration guide's tone).
  - Add a short rationale paragraph explaining why the URL surface was retired.
  - Keep the props, sizing, color, accessibility, and contribution workflow content intact.
  - Update the contribution workflow to refer to `icons/_source/` instead of `public/icons/`.
  - Add or extend the **Sources and References** section to link to the illustration guide for the matching pattern.

## 7. Spec Update

- [x] 7.1 Update `openspec/changes/modernize-icon-library/specs/icon-library/spec.md` (delta) to:
  - REMOVE the `Dual Access Patterns` requirement.
  - MODIFY the `SVG Source Management` requirement to reference `icons/_source/` and drop the URL accessibility scenario.
  - MODIFY the `React Component Generation` requirement to reference `icons/_source/`.
  - ADD a `React component as the single access path` requirement.
  - ADD a `Per-icon stories render the full theme × size matrix` requirement.
- [x] 7.2 Validate the change with `openspec validate modernize-icon-library --strict`.

## 8. Validation and Quality Gates

- [x] 8.1 Run `npm run lint` and fix any issues introduced in `icons/`, `scripts/`, `.storybook/blocks/`, and `guides/`.
- [x] 8.2 Run `npm run format` to apply Biome formatting across all touched files.
- [x] 8.3 Run `npm run dev` and visually verify the Icons Storybook page renders every icon under both themes.
- [x] 8.4 Confirm raw SVG paths are NOT served publicly: `curl http://localhost:6006/icons/search.svg` MUST return 404.
- [x] 8.5 Verify the React component import path still resolves: `import { Search } from "@reltio/design/icons"` (no change expected).

## 9. Pre-Archive Checklist

- [x] 9.1 Confirm every requirement scenario in the updated `specs/icon-library/spec.md` is covered by either a generator behavior, a Storybook story, or a documented user flow.
- [x] 9.2 All linter and formatter gates pass on a clean tree.
- [x] 9.3 Guide is reviewable in Storybook under "Guides → Icon Library" and matches the illustration guide's structure.
- [x] 9.4 Confirm no internal consumer references `https://reltio.design/icons/` or `/icons/*.svg` anywhere in the repository (excluding archived openspec change artifacts).
