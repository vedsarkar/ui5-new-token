# Specification Delta: icon-library

## REMOVED Requirements

### Requirement: Dual Access Patterns

**Reason:** The icon library is unifying on a single React-component access path, mirroring the illustration library. Raw SVG files are no longer served via a public URL. Consumers must import the React component instead.

The previous requirement bundled three scenarios (NPM import, Direct URL, Icon map) into one. The NPM import and Icon map scenarios are preserved verbatim under the new single-access-path requirement below.

## MODIFIED Requirements

### Requirement: SVG Source Management

The icon library SHALL store SVG sources in `icons/_source/` as private build artifacts. The folder MUST NOT be served by Storybook or any deployed CDN — it exists solely as input to `npm run build-icons`.

#### Scenario: SVG files stored in icons/_source
- **WHEN** a developer adds an SVG file to `icons/_source/`
- **THEN** the file is available for React component generation by `npm run build-icons`
- **AND** the file is NOT served at any public URL — `icons/_source/` is a build-artifact folder excluded from the published asset pipeline

#### Scenario: SVG file naming convention
- **WHEN** naming an SVG file
- **THEN** use kebab-case (e.g., `chevron-down.svg`, `arrow-right.svg`)
- **AND** the build script normalizes filenames to kebab-case automatically

### Requirement: React Component Generation

The `npm run build-icons` script SHALL convert SVG files in `icons/_source/` to React components in `icons/`.

#### Scenario: Component generation
- **WHEN** `npm run build-icons` is executed
- **THEN** each SVG in `icons/_source/` becomes a PascalCase React component in `icons/`
- **AND** a barrel `icons/index.ts` is generated with all exports
- **AND** a unified `Icons.stories.tsx` is generated for Storybook
- **AND** `npm run format` is applied to all generated files

#### Scenario: Generated component structure
- **WHEN** a component is generated
- **THEN** it imports `classNames` from `@/utils/classNames`
- **AND** imports shared `Icon.module.css` and `Icon.types.ts`
- **AND** accepts `{ size, color, className, ...props }: IconProps`
- **AND** renders an `<svg>` with `fill="currentColor"` and `aria-hidden="true"`

### Requirement: Storybook Icon Library Page

The Storybook Docs page for the `Icons` group SHALL render every icon in a catalog table along with a copyable React import snippet. The catalog MUST NOT expose a raw SVG URL — only the React component import path is shown.

#### Scenario: Icon catalog with import snippets
- **THEN** all icons display in a table with name labels, an icon preview, and a copyable React import snippet
- **AND** click copies the import statement to clipboard
- **AND** no public URL is shown — the catalog exposes only the React import path

## ADDED Requirements

### Requirement: React component as the single access path

The icon library SHALL expose every icon exclusively as a named React component imported from `@reltio/design/icons`. The library MUST NOT publish raw SVG files at any public URL, CDN endpoint, or static asset path.

- Component names use PascalCase derived from the kebab-case source name (`chevron-down` → `ChevronDown`).
- Components are tree-shakable: importing one component MUST NOT pull in any other icon's component or SVG content.
- Components inline the SVG body directly into the React DOM and use `fill="currentColor"` so the host's `color` cascade drives the icon color.
- Raw SVGs are stored under `icons/_source/` as build artifacts only; they are NOT served by Storybook or any public CDN, and they are NOT exposed via the npm package's `exports` field for direct import.

#### Scenario: Importing a single icon
- **WHEN** application code writes `import { Search } from "@reltio/design/icons"` and renders `<Search />`
- **THEN** the application receives a React element that displays the `search` icon at the default `medium` size with `currentColor` fill

#### Scenario: Tree-shaking unused icons
- **WHEN** an application bundles only one icon component
- **THEN** the production JavaScript bundle MUST NOT contain modules or SVG content for any other icon

#### Scenario: No public SVG URL
- **WHEN** a consumer requests `https://reltio.design/icons/<name>.svg` or any other public path purporting to serve a raw icon SVG
- **THEN** the platform returns HTTP 404 — raw SVGs are not part of the public surface

#### Scenario: Icon map for dynamic rendering
- **WHEN** `import { iconMap } from "@reltio/design/icons"`
- **THEN** a `Record<string, ComponentType<IconProps>>` is available for dynamic icon rendering

#### Scenario: Source files are not importable
- **WHEN** a consumer attempts to import a raw SVG path such as `@reltio/design/icons/_source/search.svg`
- **THEN** the import fails because the package `exports` field's `*.tsx` glob does not match SVG files

### Requirement: Per-icon stories render the full theme × size matrix

Every per-icon Story SHALL render a 2-row matrix containing the existing size/color preview combinations (small/success, medium/inherited, large/error) under both light and dark themes simultaneously. The two rows MUST force their theme via explicit `data-theme="horizon-light"` and `data-theme="horizon-dark"` wrappers so the snapshot is deterministic regardless of the active Storybook toolbar theme. Each row MUST use `background: var(--sapBackgroundColor)` so the theme context is visually obvious.

This makes every Storybook story a self-contained visual regression case for both themes — Chromatic captures both light and dark output in a single snapshot per icon.

#### Scenario: Story renders both themes
- **WHEN** a user opens any icon story
- **THEN** the canvas displays a light-theme row above a dark-theme row, each containing the same three size/color preview combinations and each backed by `var(--sapBackgroundColor)`

#### Scenario: Snapshot is deterministic across toolbar selections
- **WHEN** the Storybook toolbar theme is changed (light, dark, auto) and a story is re-rendered
- **THEN** the rendered output for the matrix MUST remain identical because each row's `data-theme` overrides the toolbar-set ancestor
