# skeleton-component Specification

## Purpose

Displays a configurable number of rectangular placeholder bars with a shimmer animation, used as a loading placeholder to reserve space and indicate that content is loading.

## Requirements

### Requirement: Row Placeholders

The Skeleton component SHALL accept a `rows` prop (number, default 3) and render the corresponding number of rectangular placeholder bars. Invalid or non-positive values are coerced to a minimum of 1.

#### Scenario: Renders number of rows from prop
- **WHEN** Skeleton is rendered with `rows` prop set to N (N >= 1)
- **THEN** exactly N rectangular placeholder bars are displayed
- **AND** each bar is a separate `<div>` element with class `row` and `aria-hidden="true"`

#### Scenario: Default rows when not specified
- **WHEN** Skeleton is rendered without `rows` prop
- **THEN** 3 placeholder bars are displayed (DEFAULT_ROWS = 3)

#### Scenario: Invalid rows values coerced
- **WHEN** `rows` is 0, negative, NaN, or non-integer
- **THEN** the value is coerced via `Math.max(1, Math.floor(Number(rows)) || DEFAULT_ROWS)`
- **AND** at least 1 bar is displayed

### Requirement: Shimmer Animation

The Skeleton component SHALL apply a shimmer (moving gradient) animation to each placeholder bar via CSS.

#### Scenario: Shimmer gradient moves across placeholders
- **WHEN** Skeleton is rendered
- **THEN** each placeholder bar displays a shimmer animation
- **AND** the animation is continuous and smooth

### Requirement: Full Width Layout

The Skeleton component SHALL render at 100% width to fill its container.

#### Scenario: Skeleton spans container width
- **WHEN** Skeleton is rendered inside a container
- **THEN** the root element spans 100% of the container width

### Requirement: Accessibility

The Skeleton component SHALL expose the loading state to assistive technologies.

#### Scenario: Loading state announced to screen readers
- **WHEN** Skeleton is rendered
- **THEN** the root element has `role="status"`
- **AND** has `aria-busy="true"`
- **AND** has `aria-label="Loading content"` (DEFAULT_LABEL)

#### Scenario: Rows hidden from assistive technologies
- **WHEN** Skeleton is rendered
- **THEN** each placeholder bar has `aria-hidden="true"`
- **AND** screen readers only see the root element's status announcement

### Requirement: CSS Custom Properties Customization

The Skeleton component SHALL define design tokens as CSS custom properties with the `--reltio-skeleton-` prefix, enabling external customization.

#### Scenario: CSS variables supported via style prop
- **WHEN** developer provides `style` prop with CSS variables
- **THEN** `--reltio-skeleton-row-height` and `--reltio-skeleton-row-gap` can be customized
- **AND** other CSS custom properties on `.skeletonRoot` apply

### Requirement: className Utility Usage

The Skeleton component SHALL use the `classNames` utility for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** Skeleton component is rendered
- **THEN** `classNames` utility combines `styles.skeletonRoot` with custom className

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are appended to the root element

### Requirement: Props Passthrough

The Skeleton component SHALL accept and pass through standard div HTML attributes (excluding `children`, `className`, and `style`) to the root element.

#### Scenario: Additional HTML attributes passed through
- **WHEN** developer provides additional HTML attributes
- **THEN** attributes are spread onto the root `<div>` element via `...rest`

### Requirement: TypeScript Type Safety

The Skeleton component SHALL be fully typed with TypeScript in strict mode, with all types in a separate `Skeleton.types.ts` file using the `type` keyword.

#### Scenario: Component props fully typed
- **WHEN** developer uses Skeleton component
- **THEN** `rows` is typed as optional number (default 3)
- **AND** `size` is typed as optional number (default 16)
- **AND** `label` is typed as optional string
- **AND** `className` is typed as optional string
- **AND** `style` is typed as `React.CSSProperties & { "--reltio-skeleton-row-height"?: string; "--reltio-skeleton-row-gap"?: string }`
- **AND** additional div attributes are typed via `Omit<React.ComponentPropsWithoutRef<"div">, "children" | "className" | "style">`

#### Scenario: Types exported alongside component
- **WHEN** developer imports Skeleton
- **THEN** `SkeletonProps` type can be imported
- **AND** types are in `Skeleton.types.ts`

### Requirement: Storybook Documentation

The Skeleton component SHALL have Storybook stories demonstrating row variants, with each story showing only ONE variant.

#### Scenario: Stories for row counts
- **WHEN** viewing Storybook
- **THEN** stories exist for different row counts (e.g., 1, 3, 5)
- **AND** each story shows a single variant
