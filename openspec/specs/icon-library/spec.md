# icon-library Specification

## Purpose

SAP Fiori Icon Library — a collection of SVG icons sourced from the SAP `theming-base-content` repository, automatically converted to React components via a build script. Provides dual access: direct SVG URLs and tree-shakeable npm imports.

Icon source: SAP `theming-base-content` repository (https://github.com/SAP/theming-base-content). Icons are downloaded as SVG files to `public/icons/`, then generated into React components via `npm run build-icons`.

## Requirements

### Requirement: SVG Source Management

#### Scenario: SVG files stored in public/icons
- **WHEN** a developer uploads an SVG file to `public/icons/`
- **THEN** the file is accessible via direct URL at `/icons/{filename}.svg`
- **AND** available for React component generation

#### Scenario: SVG file naming convention
- **WHEN** naming an SVG file
- **THEN** use kebab-case (e.g., `chevron-down.svg`, `arrow-right.svg`)
- **AND** the build script normalizes filenames to kebab-case automatically

### Requirement: SAP Icon Set

The icon set SHALL use SAP Fiori icons from the SAP `theming-base-content` repository for visual consistency with the SAP Horizon design system.

#### Scenario: SAP icons as source
- **WHEN** selecting icons for the library
- **THEN** icons MUST be downloaded from the SAP theming-base-content repository
- **AND** hardcoded fill colors are stripped (except white `#fff` / `#d9d9d9` which are preserved)
- **AND** icons use `currentColor` via `fill="currentColor"` on the root `<svg>`

### Requirement: React Component Generation

The `npm run build-icons` script SHALL convert SVG files to React components in `icons/`.

#### Scenario: Component generation
- **WHEN** `npm run build-icons` is executed
- **THEN** each SVG in `public/icons/` becomes a PascalCase React component in `icons/`
- **AND** a barrel `icons/index.ts` is generated with all exports
- **AND** a unified `Icons.stories.tsx` is generated for Storybook
- **AND** `npm run format` is applied to all generated files

#### Scenario: Generated component structure
- **WHEN** a component is generated
- **THEN** it imports `classNames` from `@/utils/classNames`
- **AND** imports shared `Icon.module.css` and `Icon.types.ts`
- **AND** accepts `{ size, color, className, ...props }: IconProps`
- **AND** renders an `<svg>` with `fill="currentColor"` and `aria-hidden="true"`

### Requirement: Icon Component Props

#### Scenario: Size prop
- **WHEN** `size` is `"small"` → 16x16px
- **WHEN** `size` is `"medium"` (default) → 24x24px
- **WHEN** `size` is `"large"` → 32x32px
- **WHEN** `size` is `"xlarge"` → 48x48px

#### Scenario: Color prop
- **WHEN** `color` is `"inherited"` (default) → `color: inherit` (uses `currentColor`)
- **WHEN** `color` is `"primary"` → `--sapBrandColor`
- **WHEN** `color` is `"secondary"` → `--sapNeutralColor`
- **WHEN** `color` is `"success"` → `--sapPositiveColor`
- **WHEN** `color` is `"warning"` → `--sapCriticalColor`
- **WHEN** `color` is `"error"` → `--sapNegativeColor`

### Requirement: Icon Accessibility

#### Scenario: Decorative icon
- **WHEN** no `aria-label` is provided
- **THEN** icon has `aria-hidden="true"` (default)

#### Scenario: Meaningful icon
- **WHEN** `aria-label` is provided
- **THEN** icon should have `role="img"` and the label announced by screen readers

### Requirement: Dual Access Patterns

#### Scenario: NPM import
- **WHEN** `import { ChevronDown } from "@reltio/design/icons"`
- **THEN** the React component is available

#### Scenario: Direct URL
- **WHEN** navigating to `reltio.design/icons/chevron-down.svg`
- **THEN** the original SVG file is served

#### Scenario: Icon map
- **WHEN** `import { iconMap } from "@reltio/design/icons"`
- **THEN** a `Record<string, ComponentType<IconProps>>` is available for dynamic icon rendering

### Requirement: Storybook Icon Library Page

#### Scenario: Icon grid with search
- **THEN** all icons display in a responsive grid with name labels
- **AND** search input filters icons by name (case-insensitive, partial match)
- **AND** click copies the import statement to clipboard

### Requirement: TypeScript Types

Shared types in `Icon.types.ts`: `IconProps = HtmlProps<"svg", { size, color }>`. Exported types: `IconSize`, `IconColor`, `IconProps`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapBrandColor` (primary), `--sapNeutralColor` (secondary), `--sapPositiveColor` (success), `--sapCriticalColor` (warning), `--sapNegativeColor` (error).
