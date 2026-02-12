# Skeleton Component Specification

## Purpose

The Skeleton component provides a loading placeholder that displays a configurable number of rectangular bars with a shimmer (moving gradient) animation. It is used to reserve space and indicate loading state while content is being fetched, improving perceived performance and layout stability.

## ADDED Requirements

### Requirement: Row Placeholders

The Skeleton component SHALL accept a `rows` prop and render the corresponding number of rectangular placeholder bars.

#### Scenario: Renders number of rows from prop
- **WHEN** Skeleton is rendered with rows prop set to N (N ≥ 1)
- **THEN** exactly N rectangular placeholder bars are displayed
- **AND** each bar is a distinct rectangular element

#### Scenario: Default rows when not specified
- **WHEN** Skeleton is rendered without rows prop
- **THEN** a default number of placeholder bars are displayed
- **AND** the default is a positive integer (e.g. 1 or 3)

#### Scenario: Single row placeholder
- **WHEN** rows is 1
- **THEN** one rectangular placeholder bar is displayed
- **AND** it is full width within the Skeleton container

### Requirement: Size (Number) Affects Line Height and Line Gap

The Skeleton component SHALL accept a `size` prop of type number that is passed to styles and affects the line height and line gap of placeholder bars.

#### Scenario: Size passed to styles
- **WHEN** Skeleton is rendered with size set to a number (e.g. 12, 16, 20)
- **THEN** the value is passed to styles (e.g. via CSS custom properties)
- **AND** line height of placeholder bars reflects the size
- **AND** line gap (spacing between rows) reflects the size or a derived value

#### Scenario: Default size when not specified
- **WHEN** Skeleton is rendered without size prop
- **THEN** a default numeric size is used for line height and line gap
- **AND** the appearance is consistent with the default

#### Scenario: Larger size increases dimensions
- **WHEN** size is increased (e.g. from 12 to 20)
- **THEN** line height increases
- **AND** line gap increases (or is derived from size) so spacing scales appropriately

### Requirement: Shimmer Animation

The Skeleton component SHALL apply a typical skeleton loading animation with a moving (shimmer) gradient to each placeholder bar.

#### Scenario: Shimmer gradient moves across placeholders
- **WHEN** Skeleton is rendered
- **THEN** each placeholder bar displays a shimmer (moving gradient) animation
- **AND** the animation is continuous and smooth
- **AND** the effect is visually recognizable as a loading skeleton

#### Scenario: Animation is performant
- **WHEN** Skeleton is rendered with multiple rows
- **THEN** the shimmer animation runs without noticeable jank
- **AND** the animation does not cause layout thrashing

### Requirement: Full Width Layout

The Skeleton component SHALL have a width of 100% so it fills its container.

#### Scenario: Skeleton spans container width
- **WHEN** Skeleton is rendered inside a container
- **THEN** the Skeleton root element has width 100%
- **AND** placeholder bars extend across the available width (subject to CSS variables)
- **AND** the component is suitable for use in full-width content areas

### Requirement: Accessibility

The Skeleton component SHALL expose loading placeholder state to assistive technologies so screen readers can announce that content is loading.

#### Scenario: Loading state announced to screen readers
- **WHEN** Skeleton is rendered
- **THEN** the component has aria-busy="true" or equivalent to indicate loading
- **AND** an aria-label (or default) describes the loading placeholder
- **AND** screen readers can announce that content is loading

#### Scenario: Decorative animation does not disrupt accessibility
- **WHEN** Skeleton is rendered
- **THEN** the shimmer animation is decorative (e.g. aria-hidden on animated parts if needed)
- **AND** focus and screen reader flow are not disrupted by the animation

### Requirement: CSS Custom Properties Customization

The Skeleton component SHALL define all design tokens as CSS custom properties on the root element with the `--reltio-skeleton-` prefix, enabling external customization.

#### Scenario: All CSS variables defined on root
- **WHEN** Skeleton component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-skeleton- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** a developer provides style prop with CSS variables (e.g. --reltio-skeleton-row-height)
- **THEN** Skeleton applies the custom values
- **AND** other styling and behavior are preserved

### Requirement: className Utility Usage

The Skeleton component SHALL use the classNames utility from utils/classNames.ts for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** Skeleton component is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** base classes for BEM-like naming are applied where relevant
- **AND** falsy values are filtered out

#### Scenario: Custom className support
- **WHEN** a developer provides className prop
- **THEN** custom classes are appended to the root element
- **AND** CSS module classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The Skeleton component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate Skeleton.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** a developer uses the Skeleton component
- **THEN** all props have proper TypeScript types
- **AND** the rows prop type is number with a sensible default
- **AND** the size prop type is number with a sensible default
- **AND** SkeletonProps (or equivalent) is exported for consumers

#### Scenario: Types exported alongside component
- **WHEN** a developer imports Skeleton
- **THEN** SkeletonProps type can be imported from the same entry
- **AND** types are in Skeleton.types.ts

### Requirement: Storybook Documentation

The Skeleton component SHALL have Storybook stories demonstrating row variants and customization, with each story showing only ONE variant.

#### Scenario: Stories for row counts and size
- **WHEN** viewing Storybook
- **THEN** at least one story shows Skeleton with a single row
- **AND** at least one story shows Skeleton with multiple rows (e.g. 3 or 5)
- **AND** at least one story demonstrates size (number) affecting line height and gap
- **AND** each story shows a single variant

#### Scenario: Stories for customization and accessibility
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization where relevant
- **AND** a11y addon shows no violations for Skeleton stories
- **AND** loading placeholder behavior is visible and documented
