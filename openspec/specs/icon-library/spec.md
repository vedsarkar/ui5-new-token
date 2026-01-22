# icon-library Specification

## Purpose
Provide a standardized icon library system with SVG source management, automatic React component generation, and dual access patterns (direct URL and npm import) for consistent icon usage across the design system.
## Requirements
### Requirement: SVG Source Management

The system SHALL provide a dedicated folder for source SVG files that are manually uploaded and served as static assets.

#### Scenario: SVG files stored in public/icons folder
- **WHEN** a developer uploads an SVG file to `public/icons/`
- **THEN** the file is accessible via direct URL at `/icons/{filename}.svg`
- **AND** the file is available for React component generation

#### Scenario: Illustrations stored in subfolder
- **WHEN** a developer uploads a larger graphic (empty state, error state, etc.)
- **THEN** the file should be placed in `public/icons/illustrations/`
- **AND** accessible via `/icons/illustrations/{filename}.svg`

#### Scenario: SVG file naming convention
- **WHEN** naming an SVG file
- **THEN** use kebab-case (e.g., `chevron-down.svg`, `arrow-right.svg`)
- **AND** name should be descriptive of the icon's purpose

### Requirement: Initial Icon Set

The system SHALL use Material Design 3 icons from [Google Fonts](https://fonts.google.com/icons) as the initial icon set to ensure consistency, quality, and comprehensive coverage.

#### Scenario: Material Design 3 icons as source
- **WHEN** selecting icons for the initial set
- **THEN** icons MUST be downloaded from Material Symbols (https://fonts.google.com/icons)
- **AND** icons MUST use the "Outlined" style for visual consistency
- **AND** icons MUST be downloaded as SVG files

#### Scenario: Icon download configuration
- **WHEN** downloading icons from Material Design 3
- **THEN** use weight 400 (regular)
- **AND** use optical size 24 (default)
- **AND** use grade 0 (default)
- **AND** ensure fill is set to 0 (outlined style)

#### Scenario: Core icon categories included
- **WHEN** building the initial icon set
- **THEN** include icons from essential categories:
  - Navigation: `arrow-back`, `arrow-forward`, `chevron-left`, `chevron-right`, `chevron-down`, `chevron-up`, `menu`, `close`, `expand-more`, `expand-less`
  - Actions: `search`, `add`, `remove`, `edit`, `delete`, `save`, `refresh`, `download`, `upload`, `share`
  - Status: `check`, `check-circle`, `error`, `warning`, `info`, `help`
  - Content: `content-copy`, `content-paste`, `filter-list`, `sort`, `visibility`, `visibility-off`
  - Communication: `email`, `notifications`, `chat`, `comment`
  - File: `folder`, `file-present`, `description`, `attachment`
  - User: `person`, `people`, `account-circle`, `settings`, `logout`

#### Scenario: Custom icons supplement Material Design
- **WHEN** a required icon is not available in Material Design 3
- **THEN** custom icons MAY be created following Material Design 3 guidelines
- **AND** custom icons MUST maintain visual consistency with Material Design 3 style
- **AND** custom icons MUST use 24x24 viewBox

### Requirement: React Component Generation

The system SHALL automatically convert SVG files to React components via an npm script, following all project conventions.

#### Scenario: Generate icons script creates React components
- **WHEN** developer runs `npm run generate-icons`
- **THEN** each SVG in `public/icons/` is converted to a React component in `icons/`
- **AND** component name is PascalCase derived from filename (e.g., `chevron-down.svg` → `ChevronDown.tsx`)

#### Scenario: Generated components use project conventions
- **WHEN** a React component is generated
- **THEN** component uses `classNames` utility from `@/utils/classNames`
- **AND** component imports from shared `Icon.types.ts` and `Icon.module.css`
- **AND** component follows TypeScript strict mode

#### Scenario: Generate script creates barrel export
- **WHEN** `npm run generate-icons` completes
- **THEN** `icons/index.ts` is updated with exports for all icons
- **AND** icons are importable via `import { IconName } from "@reltio/design/icons"`

#### Scenario: Generate script creates Storybook stories
- **WHEN** `npm run generate-icons` completes
- **THEN** each icon has a generated `{IconName}.stories.tsx` file
- **AND** stories include variations for size and color

### Requirement: Icon Component Props

Each icon component SHALL support customization via standardized props and CSS custom properties.

#### Scenario: Size prop controls icon dimensions
- **WHEN** size prop is set to "small"
- **THEN** icon renders at 16x16 pixels
- **WHEN** size prop is set to "medium" (default)
- **THEN** icon renders at 24x24 pixels
- **WHEN** size prop is set to "large"
- **THEN** icon renders at 32x32 pixels
- **WHEN** size prop is set to "xlarge"
- **THEN** icon renders at 48x48 pixels

#### Scenario: Color prop controls icon fill
- **WHEN** color prop is set to "inherited" (default)
- **THEN** icon uses `currentColor` for fill
- **WHEN** color prop is set to "primary"
- **THEN** icon uses design system primary color
- **WHEN** color prop is set to semantic color (success, warning, error)
- **THEN** icon uses corresponding semantic color

#### Scenario: Custom CSS variable override
- **WHEN** developer provides `--reltio-icon-size` via style prop
- **THEN** icon uses custom size value
- **WHEN** developer provides `--reltio-icon-color` via style prop
- **THEN** icon uses custom color value

#### Scenario: className prop for custom styling
- **WHEN** className prop is provided
- **THEN** custom classes are added alongside module classes
- **AND** icon styling can be extended externally

### Requirement: Icon Accessibility

Icon components SHALL be accessible and support screen readers appropriately.

#### Scenario: Decorative icon is hidden from screen readers
- **WHEN** no aria-label prop is provided
- **THEN** icon has `aria-hidden="true"`
- **AND** icon is not announced by screen readers

#### Scenario: Meaningful icon is announced to screen readers
- **WHEN** aria-label prop is provided
- **THEN** icon has `role="img"`
- **AND** icon has `aria-label` attribute with provided value
- **AND** screen readers announce the label

### Requirement: CSS Custom Properties

Icon styles SHALL define all design tokens as CSS custom properties on the root element.

#### Scenario: All CSS variables defined on root class
- **WHEN** icon component is rendered
- **THEN** all CSS custom properties are defined on `.root` class
- **AND** variables use `--reltio-icon-` prefix
- **AND** all variables include fallback values

#### Scenario: Size variables defined
- **WHEN** icon is rendered
- **THEN** `--reltio-icon-size-small`, `--reltio-icon-size-medium`, `--reltio-icon-size-large`, `--reltio-icon-size-xlarge` are defined
- **AND** values are 16px, 24px, 32px, 48px respectively

#### Scenario: Color variables defined
- **WHEN** icon is rendered
- **THEN** semantic color variables are defined with `--reltio-icon-color-` prefix
- **AND** `inherited` uses `currentColor`
- **AND** `primary` uses design system primary color variable

### Requirement: Dual Access Patterns

Icons SHALL be accessible via both direct public URL and npm package import.

#### Scenario: Direct URL access for SVG files
- **WHEN** user navigates to `reltio.design/icons/icon-name.svg`
- **THEN** the original SVG file is served
- **AND** file can be downloaded or embedded directly

#### Scenario: NPM package import for React components
- **WHEN** developer imports `import { ChevronDown } from "@reltio/design/icons"`
- **THEN** the React component is imported
- **AND** component can be used in React applications

#### Scenario: Individual icon import for tree-shaking
- **WHEN** developer imports `import { ChevronDown } from "@reltio/design/icons/ChevronDown"`
- **THEN** only the specific icon is bundled
- **AND** bundle size is optimized

### Requirement: Storybook Icon Library Page

The system SHALL provide a Storybook documentation page listing all available icons with search and copy functionality.

#### Scenario: Icon grid displays all icons
- **WHEN** user navigates to Icon Library page in Storybook
- **THEN** all available icons are displayed in a responsive grid
- **AND** each icon shows its name below

#### Scenario: Search filters icons by name
- **WHEN** user types in search input
- **THEN** icon grid is filtered to show only matching icons
- **AND** search is case-insensitive
- **AND** partial matches are included

#### Scenario: Copy URL button copies public URL
- **WHEN** user clicks "Copy URL" for an icon
- **THEN** the public URL (e.g., `/icons/chevron-down.svg`) is copied to clipboard
- **AND** user receives visual feedback (toast or button state change)

#### Scenario: Copy Import button copies import statement
- **WHEN** user clicks "Copy Import" for an icon
- **THEN** the import statement (e.g., `import { ChevronDown } from "@reltio/design/icons"`) is copied to clipboard
- **AND** user receives visual feedback

#### Scenario: Icon links to individual story
- **WHEN** user clicks on an icon in the grid
- **THEN** user is navigated to the individual Storybook story for that icon
- **AND** story shows all size and color variations

### Requirement: Individual Icon Stories

Each icon SHALL have its own Storybook story demonstrating all variants.

#### Scenario: Story shows size variations
- **WHEN** viewing individual icon story
- **THEN** separate stories exist for Small, Medium, Large, XLarge sizes
- **AND** each story shows only ONE size variant

#### Scenario: Story shows color variations
- **WHEN** viewing individual icon story
- **THEN** separate stories exist for different color options
- **AND** each story shows only ONE color variant

#### Scenario: Default story shows icon at default settings
- **WHEN** viewing individual icon story
- **THEN** Default story shows icon at medium size with inherited color

### Requirement: Type Definitions

Icon components SHALL have TypeScript type definitions in a shared types file.

#### Scenario: Shared IconProps type exported
- **WHEN** developer imports icon types
- **THEN** `IconProps` type is available from `@reltio/design/icons`
- **AND** type includes size, color, className, style, aria-label props

#### Scenario: IconSize and IconColor types exported
- **WHEN** developer needs specific type unions
- **THEN** `IconSize` type (`"small" | "medium" | "large" | "xlarge"`) is available
- **AND** `IconColor` type (`"inherited" | "primary" | ...`) is available

#### Scenario: Individual icon prop types
- **WHEN** developer uses specific icon component
- **THEN** component has properly typed props extending IconProps

