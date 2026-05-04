# Change: Add Illustration Library

## Why

The Reltio Design System has an icon library, but lacks a corresponding library of full-color illustrations for empty states, errors, onboarding, and other empathetic UI moments. Product teams currently improvise with screenshots, third-party graphics, or ad-hoc inline SVGs, leading to inconsistent visual language and missed opportunities to apply the SAP Horizon brand. Adding a dedicated illustration library closes this gap and gives every Reltio product the same set of polished, theme-aware scenes.

## What Changes

- **ADDED** `illustrations/_source/` folder containing **a curated subset of 32 SAP Fiori illustrations** from the upstream [`SAP/ui5-webcomponents`](https://github.com/SAP/ui5-webcomponents/tree/main/packages/fiori/src/illustrations) repository (Apache 2.0). Each illustration ships in three sizes — `<name>-spot.svg`, `<name>-dialog.svg`, `<name>-scene.svg` — for a total of 96 SVG files. These files are build artifacts and are NOT served as a public API
- **ADDED** Curation policy: the build script declares an explicit `ILLUSTRATION_NAMES` allowlist of 32 names that pass design review against the current SAP Horizon Figma kit. Anything not in the list is not built. Adding a name is a single, reviewable diff that must be paired with a corresponding `manifest.json` entry
- **ADDED** `illustrations/` folder with auto-generated React components — one per approved illustration name (e.g. `NoData.tsx`, `Achievement.tsx`, `UserHasSignedUp.tsx`)
- **ADDED** `illustrations/manifest.json` containing default `title` / `description` text per illustration; consumers may override both via props
- **ADDED** `scripts/build-illustrations.mjs` Node.js script that fetches SVGs directly from the SAP GitHub raw endpoint, normalizes filenames to kebab-case, reconciles orphan files from previous builds, validates the inventory, and generates components, the barrel `index.ts`, and unified `Illustrations.stories.tsx`
- **ADDED** `build-illustrations` npm script in `package.json`
- **ADDED** Shared `Illustration` core component with size (`spot` / `dialog` / `scene`), `title`, `description`, `className`, and rest-prop pass-through
- **ADDED** Inline-SVG rendering: each generated wrapper embeds the SVG bodies for all three sizes inside the React component tree, with size selection via CSS classes. This ensures the SAP `--sapContent_Illustrative_Color*` CSS variables defined by `public/variables.css` cascade into the SVGs and drive both light and dark themes automatically
- **ADDED** Per-illustration Storybook stories (one variant per story) covering all three sizes, generated alongside the components. The Docs page uses Storybook's standard autodocs template (props table + story listing) — no custom catalog block
- **ADDED** Guide `guides/illustration-library.story.mdx` documenting the single access pattern (React component), props, theming, accessibility, the upstream sync workflow, and how to edit default copy
- **ADDED** Package exports `./illustrations` and `./illustrations/*` mirroring the icons exports

The library exposes **only one access pattern** — the React component import. Raw SVG files are intentionally not served as a public CDN URL because their fills reference SAP `--sapContent_Illustrative_Color*` variables that resolve only when the SVG is inlined into a host DOM that loads `public/variables.css`. Static URL access would mislead consumers (the file would render unstyled) and add maintenance surface for no real benefit.

## Capabilities

### New Capabilities

- `illustration-library`: full-color, theme-aware illustration assets distributed exclusively as React components, with size variants (Spot / Dialog / Scene) and built-in light/dark theming through the platform's existing SAP `--sapContent_Illustrative_*` token cascade

### Modified Capabilities

<!-- None — this is purely additive. -->

## Impact

- **Affected code**:
  - `illustrations/_source/` — new build-artifact folder (32 curated illustrations × 3 SVG files = 96 files), tracked in version control for reproducibility
  - `illustrations/` — new folder for the shared core, generated React components, manifest, types, CSS module, and stories
  - `scripts/build-illustrations.mjs` — new build script with HTTP fetch from SAP GitHub
  - `package.json` — new `build-illustrations` script, new `./illustrations` export entries
  - `.storybook/main.ts` — `illustrations/**/*.tsx` added to `reactDocgenTypescriptOptions.include` so autodocs can extract the props table for `Illustration`
  - `guides/illustration-library.story.mdx` — new guide
- **Affected APIs**: New public exports under `@reltio/design/illustrations`. No changes to existing icon, component, or hook APIs.
- **Dependencies**: None added. Build script uses Node.js stdlib (`fetch`, `fs/promises`) only, mirroring `scripts/build-icons.mjs`.
- **Distribution**: SVG bodies are inlined into the generated React components and shipped inside the JavaScript bundle. There is no public CDN URL for raw SVGs.
- **Upstream dependency**: SAP/ui5-webcomponents is an actively maintained Apache-2.0 project. The build script pins to a specific git tag (e.g. `v2.21.1`) so fetches are reproducible.
- **Breaking changes**: None.
- **Migration**: None required. Existing components and consumers are unaffected.
