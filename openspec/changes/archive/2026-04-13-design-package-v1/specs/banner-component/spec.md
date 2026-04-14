# Banner Component Specification

## Purpose

The Banner component is a static inline notification strip for displaying informational, success, warning, or error messages within a page. It is always visible in the document flow and optionally dismissible. Banner is NOT a toast, snackbar, or overlay notification — those are separate L2 components. It wraps content inside a `<div role="alert">` for screen reader announcement. It follows all Reltio Design Platform constitution principles including CSS Modules, classNames utility, TypeScript strict typing, and accessibility standards.

## ADDED Requirements

### Requirement: Title and Description

The Banner component SHALL support a `title` prop for the primary heading and `children` for the description text. Both are optional, but at least one should be provided.

#### Scenario: Title and description rendered
- **WHEN** `title` and `children` are both provided
- **THEN** the title renders as bold text on the first line
- **AND** the description renders below the title in normal weight
- **AND** both use the appropriate text color for the current color variant

#### Scenario: Title only
- **WHEN** `title` is provided but `children` is not
- **THEN** only the title renders as bold text

#### Scenario: Description only
- **WHEN** `children` is provided but `title` is not
- **THEN** only the description renders in normal weight

### Requirement: Color Variants

The Banner component SHALL support a `color` prop that determines the visual style and default icon. The default value is `"info"`.

#### Scenario: Info color (default)
- **WHEN** `color` prop is `"info"` or not provided
- **THEN** the banner has a blue tint background and blue border
- **AND** the default icon is an Info icon
- **AND** colors use `--reltio-color-info` and related tokens

#### Scenario: Success color
- **WHEN** `color` prop is `"success"`
- **THEN** the banner has a green tint background and green border
- **AND** the default icon is a Check icon
- **AND** colors use `--reltio-color-positive` and related tokens

#### Scenario: Warning color
- **WHEN** `color` prop is `"warning"`
- **THEN** the banner has an amber tint background and amber border
- **AND** the default icon is a Warning icon
- **AND** colors use `--reltio-color-critical` and related tokens

#### Scenario: Error color
- **WHEN** `color` prop is `"error"`
- **THEN** the banner has a red tint background and red border
- **AND** the default icon is an Error icon
- **AND** colors use `--reltio-color-negative` and related tokens

### Requirement: Dismissible

The Banner component SHALL support a `dismissible` prop that shows a close button. The default value is `false`.

#### Scenario: Dismissible banner shows close button
- **WHEN** `dismissible` prop is `true`
- **THEN** a close (X) button renders at the trailing end of the banner
- **AND** the close button has `aria-label="Dismiss"`

#### Scenario: Non-dismissible banner has no close button
- **WHEN** `dismissible` prop is `false` or not provided
- **THEN** no close button is rendered

#### Scenario: Clicking close button fires onDismiss
- **WHEN** the user clicks the close button
- **THEN** the `onDismiss` callback is invoked
- **AND** the banner remains rendered (parent controls visibility)

#### Scenario: Close button is keyboard accessible
- **WHEN** `dismissible` is `true`
- **THEN** the close button is focusable via Tab
- **AND** pressing Enter or Space triggers `onDismiss`

### Requirement: Custom Icon Override

The Banner component SHALL support an `icon` prop that overrides the default color-based icon.

#### Scenario: Custom icon replaces default
- **WHEN** `icon` prop is provided with a ReactNode
- **THEN** the custom icon renders instead of the default icon for the current color

#### Scenario: Icon hidden when set to null
- **WHEN** `icon` prop is explicitly set to `null`
- **THEN** no icon is rendered
- **AND** the message content takes the available space

#### Scenario: Default icon when icon prop is not provided
- **WHEN** `icon` prop is not provided (undefined)
- **THEN** the default icon for the current color variant is rendered

### Requirement: Rest Props Forwarded to Root Element

The Banner component SHALL forward all rest props (`...rest`) to the underlying `<div role="alert">` element. This includes standard HTML div attributes such as `id`, `aria-label`, `aria-describedby`, `data-testid`, event handlers, etc. See MDN reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div.

#### Scenario: Data and ARIA attributes are forwarded
- **WHEN** props like `data-testid`, `aria-label`, `aria-describedby` are provided
- **THEN** they are set on the root `<div role="alert">` element

#### Scenario: Event handlers are forwarded
- **WHEN** props like `onClick`, `onMouseEnter` are provided
- **THEN** they are attached to the root `<div role="alert">` element

### Requirement: Screen Reader Support

The Banner component SHALL use `role="alert"` on the root `<div>` element to ensure screen readers announce the banner content when it appears.

#### Scenario: Role alert is set
- **WHEN** the banner is rendered
- **THEN** the root element has `role="alert"`
- **AND** screen readers announce the banner content

### Requirement: CSS Styling

The Banner component SHALL use CSS Modules with the `classNames()` utility for all className composition. All color values SHALL use global `--reltio-color-*` tokens. Typography, spacing, and sizing use plain CSS values. No component-level CSS custom properties.

#### Scenario: Colors use global tokens
- **WHEN** the banner is rendered
- **THEN** background tints, border colors, and icon colors use `--reltio-color-*` tokens
- **AND** no hardcoded hex color values exist in the CSS

#### Scenario: Layout uses flexbox
- **WHEN** the banner is rendered
- **THEN** the root uses `display: flex` with `align-items: flex-start`
- **AND** icon, content area (title + description), and close button are laid out horizontally with appropriate gap
- **AND** the content area uses `flex: 1` to fill available space

#### Scenario: Stable CSS classes for external customization
- **WHEN** the banner is rendered
- **THEN** classNames utility provides stable prefixed classes (e.g. `reltio_Banner_root`, `reltio_Banner_icon`, `reltio_Banner_content`)

#### Scenario: Custom className and style support
- **WHEN** a developer provides `className` or `style` props
- **THEN** they are applied to the root `<div role="alert">` element

### Requirement: TypeScript Type Safety

All types SHALL be defined in `Banner.types.ts` using the `type` keyword. The component props SHALL use `HtmlProps<"div", CustomProps>` from `@/utils/types`.

#### Scenario: BannerProps uses HtmlProps
- **WHEN** a developer imports `BannerProps`
- **THEN** it extends native `<div>` attributes via `HtmlProps<"div", CustomProps>`
- **AND** custom props: `title`, `children`, `color`, `dismissible`, `onDismiss`, `icon`, `className`, `style`
- **AND** rest props are forwarded to the root div

### Requirement: Storybook Documentation

The Banner component SHALL have Storybook stories demonstrating all variants. Each story shows ONE variant. Stories use the "autodocs" tag.

#### Scenario: Core stories
- **WHEN** viewing Storybook
- **THEN** a **Default** story shows an info banner with title, description, and default icon
- **AND** a **Success** story shows a success banner with green styling
- **AND** a **Warning** story shows a warning banner with amber styling
- **AND** an **Error** story shows an error banner with red styling
- **AND** a **Dismissible** story shows a banner with a close button
- **AND** a **CustomIcon** story shows a banner with a custom icon override
- **AND** a **NoIcon** story shows a banner with `icon={null}` and no icon rendered

#### Scenario: Dismissible story has play function
- **WHEN** the Dismissible story runs its play function
- **THEN** the close button is clicked
- **AND** the `onDismiss` callback is verified to have been called
