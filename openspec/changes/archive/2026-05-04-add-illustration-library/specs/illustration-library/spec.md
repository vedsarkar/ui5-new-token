# Specification: illustration-library

## ADDED Requirements

### Requirement: Curated subset of upstream SAP illustrations

The library SHALL ship a curated subset of the illustrations available in the upstream `SAP/ui5-webcomponents` repository, not the full set. Curation is expressed through a single explicit allowlist constant `ILLUSTRATION_NAMES` in `scripts/build-illustrations.mjs`. Anything not present in the list is not built — there is no parallel rejected-list. The list is maintained against the current SAP Horizon Figma kit; visually outdated upstream illustrations are simply omitted.

Adding a name MUST be paired with a corresponding default-copy entry in `illustrations/manifest.json`.

#### Scenario: Listed name builds successfully

- **WHEN** an illustration name is present in `ILLUSTRATION_NAMES` and exists upstream at the pinned `SAP_REF`
- **THEN** the build script downloads its three size variants and emits a corresponding React wrapper

#### Scenario: Unlisted name is not built

- **WHEN** an illustration name exists upstream at the pinned `SAP_REF` but is NOT in `ILLUSTRATION_NAMES`
- **THEN** the build script does NOT download or emit any artifact for that name, and `illustrations/index.ts` does NOT export a wrapper for it

### Requirement: React component as the single access path

The illustration library SHALL expose every illustration exclusively as a named React component imported from `@reltio/design/illustrations`. The library MUST NOT publish raw SVG files at any public URL, CDN endpoint, or static asset path.

- Component names use PascalCase derived from the kebab-case source name (`no-data` → `NoData`).
- Components are tree-shakable: importing one component MUST NOT pull in any other illustration's wrapper, SVG content, or default copy.
- Components delegate layout, ARIA, and prop pass-through to a single shared `Illustration` core component.
- Components inline the SVG bodies directly into the React DOM (NOT via `background-image`, `<img src>`, `<object>`, or any other mechanism that isolates the SVG from the host CSS cascade), so the SAP `--sapContent_Illustrative_Color*` variables resolve through the host page's stylesheet.
- Raw SVGs are stored under `illustrations/_source/` as build artifacts only; they are NOT served by Storybook or any public CDN, and they are NOT exposed via the npm package's `exports` field for direct import.

#### Scenario: Importing a single illustration

- **WHEN** application code imports `import { NoData } from "@reltio/design/illustrations"` and renders `<NoData />`
- **THEN** the application receives a React element that displays the `no-data` illustration in the default `dialog` size with the default `title` and `description` from the manifest, and the SAP `--sapContent_Illustrative_*` variables resolve through the host CSS cascade

#### Scenario: Tree-shaking unused illustrations

- **WHEN** an application bundles only one illustration component
- **THEN** the production JavaScript bundle MUST NOT contain wrapper modules, inline SVG content, or default copy for any other illustration

#### Scenario: No public SVG URL

- **WHEN** a consumer requests `https://reltio.design/illustrations/<name>-<size>.svg` or any other public path purporting to serve a raw illustration SVG
- **THEN** the platform returns HTTP 404 — raw SVGs are not part of the public surface

### Requirement: Size variants Spot, Dialog, Scene

Every illustration component SHALL accept a `size` prop with one of three values: `"spot"`, `"dialog"`, `"scene"`. The default is `"dialog"`.

The `size` value selects:

1. The physical dimensions rendered on screen (Spot 128×128, Dialog 240×160, Scene 320×220).
2. Which inline `<svg>` element is visible — each size is a distinct art piece sourced verbatim from `sapIllus-<Size>-<Name>.svg`. Changing the `size` prop MUST result in a different SVG being displayed.

The component MAY embed all three SVG bodies in the DOM concurrently and toggle visibility via CSS classes. Browsers MUST NOT incur paint cost for hidden sizes (i.e. `display: none` or equivalent).

#### Scenario: Default size

- **WHEN** an illustration component is rendered without a `size` prop
- **THEN** it renders at 240×160 px and displays the inline SVG sourced from `sapIllus-Dialog-<Name>.svg`

#### Scenario: Switching to Spot

- **WHEN** the consumer renders `<NoData size="spot" />`
- **THEN** the rendered element measures 128×128 px and displays the inline SVG sourced from `sapIllus-Spot-NoData.svg`

#### Scenario: Switching to Scene

- **WHEN** the consumer renders `<NoData size="scene" />`
- **THEN** the rendered element measures 320×220 px and displays the inline SVG sourced from `sapIllus-Scene-NoData.svg`

#### Scenario: Runtime size change

- **WHEN** a parent component changes the `size` prop from `"dialog"` to `"scene"` on the next render
- **THEN** the component swaps to the Scene SVG and resizes to 320×220 px without unmounting

### Requirement: Theme-aware rendering via SAP token cascade

Illustrations SHALL automatically display the dark variant when an ancestor element has the attribute `data-theme="horizon-dark"`, and the light variant otherwise. Theme switching MUST happen via the existing SAP `--sapContent_Illustrative_Color*` token cascade defined in `public/variables.css`. The illustration components MUST NOT carry their own theme-detection logic, theme-state subscriptions, or alternate dark-only assets.

#### Scenario: Default light theme

- **WHEN** an illustration is rendered with no `data-theme` ancestor or with `data-theme="horizon-light"`
- **THEN** the inline SVG fills resolve to the light values defined in `:root` of `public/variables.css`

#### Scenario: Dark theme via ancestor attribute

- **WHEN** the illustration is nested inside an element with `data-theme="horizon-dark"`
- **THEN** the inline SVG fills resolve to the dark values defined in the `[data-theme="horizon-dark"]` block of `public/variables.css`

#### Scenario: Toggling the theme at runtime

- **WHEN** an ancestor's `data-theme` attribute changes from `horizon-light` to `horizon-dark` while an illustration is mounted
- **THEN** the browser repaints the same inline SVG with the new variable values without React re-rendering the illustration component

#### Scenario: Nested theming

- **WHEN** an illustration sits inside a subtree with its own `data-theme` attribute that differs from the document root
- **THEN** the illustration follows the nearest `data-theme` ancestor

#### Scenario: Custom palette override

- **WHEN** a consumer overrides `--sapContent_Illustrative_Color*` variables in their own CSS scope
- **THEN** illustrations within that scope render with the consumer-supplied palette

### Requirement: Title and description props with defaults

Every illustration component SHALL accept optional `title` and `description` string props. Each component MUST ship with default values sourced from `illustrations/manifest.json`. Consumer-supplied values override the defaults.

- `title` becomes the `aria-label` on the root element.
- `description` is rendered into a visually hidden span that screen readers announce after the label.
- Passing an empty string to either prop is honored as-is.

#### Scenario: Default title and description

- **WHEN** the consumer renders `<NoData />` with no `title` or `description` props
- **THEN** the root element has `aria-label="No data"` (or whatever the manifest defines) and contains a screen-reader-only span with the manifest's default description

#### Scenario: Overriding title

- **WHEN** the consumer renders `<NoData title="No customers found" />`
- **THEN** the root element has `aria-label="No customers found"` and the description remains the manifest default

#### Scenario: Overriding description

- **WHEN** the consumer renders `<NoData description="Try clearing filters." />`
- **THEN** the screen-reader-only span text is `"Try clearing filters."` and the title remains the manifest default

#### Scenario: Clearing title

- **WHEN** the consumer renders `<NoData title="" />`
- **THEN** the root element has no `aria-label` and instead carries `aria-hidden="true"`

### Requirement: Accessible inline SVG

Each illustration component SHALL render the inner `<svg>` elements with `aria-hidden="true"` so assistive technology sees a single `role="img"` landmark on the wrapper `<div>` with its accessible name and description, rather than an exposed SVG subtree.

#### Scenario: Inline SVG aria-hidden

- **WHEN** an illustration is rendered
- **THEN** every nested `<svg>` element has `aria-hidden="true"` and the parent `<div role="img">` carries the accessible name from the `title` prop

### Requirement: HTML props pass-through

Each illustration component SHALL accept all standard HTML `<div>` attributes via rest props and apply them to the root element. The `className` prop MUST be merged with internal styles via the platform's `classNames()` utility.

#### Scenario: Custom className

- **WHEN** the consumer renders `<NoData className="my-custom-class" />`
- **THEN** the root element's class list contains `my-custom-class` plus the internal style classes

#### Scenario: Custom data attributes

- **WHEN** the consumer renders `<NoData data-testid="no-data-empty-state" />`
- **THEN** the root element has `data-testid="no-data-empty-state"`

#### Scenario: Custom inline style

- **WHEN** the consumer renders `<NoData style={{ marginTop: 16 }} />`
- **THEN** the root element's inline style includes `margin-top: 16px`

### Requirement: Generator script downloads from upstream SAP

The platform SHALL provide a single command, `npm run build-illustrations`, that downloads a curated subset of SAP illustrations from the upstream `SAP/ui5-webcomponents` repository, normalizes them into `illustrations/_source/`, and generates all derived files in `illustrations/`.

The generator MUST:

1. Maintain an explicit `ILLUSTRATION_NAMES` allowlist constant of names to build.
2. Pin a specific upstream git ref (tag or commit) in a documented `SAP_REF` constant for reproducibility.
3. Run a reconcile pass that deletes orphan files in `illustrations/_source/` (`*.svg`) and `illustrations/` (`*.tsx` other than core files like `Illustration.tsx`, `IllustrationDoc.tsx`, `Illustrations.stories.tsx`) when their names are not present in `ILLUSTRATION_NAMES`.
4. For each listed `(name, size)` pair where `size ∈ {Spot, Dialog, Scene}`, fetch `https://raw.githubusercontent.com/UI5/webcomponents/<SAP_REF>/packages/fiori/src/illustrations/sapIllus-<Size>-<Name>.svg`.
5. Limit fetch concurrency (≤ 8 parallel requests) and retry with exponential backoff on transient failures.
6. Write each fetched SVG to `illustrations/_source/<name>-<size>.svg` in kebab-case (e.g. `sapIllus-Dialog-NoData.svg` → `no-data-dialog.svg`).
7. Validate that every listed base name yields exactly three SVGs covering `spot`, `dialog`, and `scene`. Fail with a clear error listing missing variants.
8. Validate that every fetched SVG references only `var(--sap...)` variables that exist in `public/variables.css`. Fail with a clear error if any unknown variables are referenced.
9. Read `illustrations/manifest.json` (optional). For each illustration, look up `title` and `description`. When the manifest is missing or omits an entry, fall back to a humanized version of the kebab-case name as the title and an empty string as the description.
10. Generate `illustrations/<PascalName>.tsx` for each listed illustration as a thin wrapper that inlines the three SVG bodies (extracting inner content and `viewBox` from each fetched file) and provides default `title` / `description`.
11. Generate `illustrations/index.ts` exporting every wrapper plus an `illustrationMap` object keyed by component name.
12. Generate `illustrations/Illustrations.stories.tsx` with one Storybook story per illustration showing all three sizes.
13. Run `npm run format` after generation.
14. NOT modify the SVG content (no fill rewriting, no theme patching) — illustrations are inlined verbatim.

#### Scenario: Successful generation against pinned ref

- **WHEN** a developer runs `npm run build-illustrations` and the upstream SAP repo at `SAP_REF` has every listed name × 3-size combination available
- **THEN** the script populates `illustrations/_source/` with one SVG per listed `(name, size)` pair, generates one wrapper TSX per listed name, updates `illustrations/index.ts` and `illustrations/Illustrations.stories.tsx`, and exits with status 0

#### Scenario: Bumping the upstream ref

- **WHEN** a maintainer changes `SAP_REF` to a newer tag and re-runs the script
- **THEN** the script overwrites `illustrations/_source/*.svg` and `illustrations/*.tsx` from the new ref, surfacing diffs cleanly in version control

#### Scenario: Removing an illustration from the allowlist

- **WHEN** a maintainer removes a name from `ILLUSTRATION_NAMES` and re-runs the script
- **THEN** the reconcile pass deletes the corresponding `_source/<name>-<size>.svg` files and the `<PascalName>.tsx` wrapper, and the regenerated `index.ts` no longer exports the wrapper

#### Scenario: Missing variants upstream

- **WHEN** the upstream repository is missing one or more SVGs for a listed name at the pinned ref
- **THEN** the script exits with a non-zero status and prints the missing `(name, size)` pairs

#### Scenario: Unknown SAP variable

- **WHEN** a fetched SVG references `var(--sapContent_Illustrative_ColorNN)` that is not present in `public/variables.css`
- **THEN** the script exits with a non-zero status and prints the missing variable name and the affected illustration

#### Scenario: Manifest fallback

- **WHEN** an illustration has no entry in `manifest.json`
- **THEN** the generated wrapper uses a humanized title (e.g. `"no-data"` → `"No data"`) and an empty default description

### Requirement: Storybook Docs page uses standard autodocs

The Storybook Docs page for the `Illustrations` group SHALL be rendered by Storybook's standard autodocs template (no custom `parameters.docs.page` override and no custom catalog block). The page MUST display the component title, the JSDoc-derived description, the props table for `IllustrationProps`, and a list of every illustration story with a live preview.

To enable the props table, `illustrations/**/*.tsx` MUST be present in the `reactDocgenTypescriptOptions.include` configuration in `.storybook/main.ts`.

#### Scenario: Browsing the Illustrations Docs page

- **WHEN** a user opens the `Illustrations` Docs page in Storybook
- **THEN** the page displays the title, JSDoc description, an auto-generated props table for `IllustrationProps`, and the full list of illustration stories each with a rendered preview

#### Scenario: Story sidebar lists every illustration

- **WHEN** a user expands the `Illustrations` group in the Storybook sidebar
- **THEN** every illustration appears as a story link with its PascalCase name converted to title case (e.g. `NoData` → `No Data`)

### Requirement: Each story renders the full theme × size matrix

Every per-illustration Story SHALL render a 2-row × 3-column matrix containing all three sizes (Spot, Dialog, Scene) under both light and dark themes simultaneously. The two rows MUST force their theme via explicit `data-theme="horizon-light"` and `data-theme="horizon-dark"` wrappers so the snapshot is deterministic regardless of the active Storybook toolbar theme. Each row MUST use `background: var(--sapBackgroundColor)` so the theme context is visually obvious.

This makes every Storybook story a self-contained visual regression case for both themes — Chromatic captures both light and dark output in a single snapshot per illustration.

#### Scenario: Story renders both themes

- **WHEN** a user opens any illustration story
- **THEN** the canvas displays a light-theme row (Spot, Dialog, Scene) above a dark-theme row (Spot, Dialog, Scene), each with the corresponding `var(--sapBackgroundColor)` background

#### Scenario: Snapshot is deterministic across toolbar selections

- **WHEN** the Storybook toolbar theme is changed (light, dark, auto) and a story is re-rendered
- **THEN** the rendered output for the matrix MUST remain identical because each row's `data-theme` overrides the toolbar-set ancestor

### Requirement: Documentation guide

The platform SHALL ship a guide at `guides/illustration-library.story.mdx` covering the React component access pattern, all props, theming behavior, accessibility guidance, the contribution / upstream-bump workflow, and how to edit default copy in the manifest. The guide MUST follow the conventions in `guides/AGENTS.md`, document that the React component is the single supported access path, and include attribution to the upstream `SAP/ui5-webcomponents` project (Apache 2.0).

#### Scenario: Discovering the guide

- **WHEN** a user opens Storybook and navigates to "Guides → Illustration Library"
- **THEN** the guide is rendered with sections covering usage, props, theming, accessibility, the upstream sync workflow, manifest editing, tree-shaking, and SAP attribution

### Requirement: Package exports

The npm package's `package.json` SHALL declare `"./illustrations": "./illustrations/index.ts"` and `"./illustrations/*": "./illustrations/*.tsx"` so consumers can import via the barrel or by path. The `*.tsx` glob deliberately excludes `_source/*.svg` and `manifest.json` from the public import surface.

#### Scenario: Barrel import

- **WHEN** a consumer writes `import { NoData } from "@reltio/design/illustrations"`
- **THEN** TypeScript resolves it via the `./illustrations` export and the bundler resolves to `illustrations/index.ts`

#### Scenario: Direct path import

- **WHEN** a consumer writes `import { NoData } from "@reltio/design/illustrations/NoData"`
- **THEN** TypeScript resolves it via the `./illustrations/*` export and the bundler resolves to `illustrations/NoData.tsx`

#### Scenario: Source files are not importable

- **WHEN** a consumer attempts to import a raw SVG path such as `@reltio/design/illustrations/_source/no-data-dialog.svg`
- **THEN** the import fails because the package `exports` field's `*.tsx` glob does not match SVG files
