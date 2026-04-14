# badge-component Specification

## Purpose
TBD - created by archiving change design-package-v1. Update Purpose after archive.
## Requirements
### Requirement: Wrapper with Overlay Indicator

The Badge component SHALL wrap its `children` (the anchored element) and render an indicator at the top-right corner. The root element uses `position: relative` and the indicator uses `position: absolute`.

#### Scenario: Badge wraps child element
- **WHEN** children prop is provided (e.g. an icon or avatar)
- **THEN** the children render as the primary content
- **AND** the badge indicator renders at the top-right corner of the children

#### Scenario: Badge without children
- **WHEN** children prop is not provided
- **THEN** the badge indicator renders standalone as an inline element

### Requirement: Indicator Content

The Badge component SHALL support a `content` prop for the indicator. When `content` is omitted, the indicator renders as a small dot.

#### Scenario: Standard badge with count
- **WHEN** `content` prop is provided (e.g. a number)
- **THEN** the indicator renders as a pill-shaped element displaying the content
- **AND** the indicator has horizontal padding to accommodate the text

#### Scenario: Dot badge without content
- **WHEN** `content` prop is omitted
- **THEN** the indicator renders as a small circular dot (8px)

### Requirement: Max Count

The Badge component SHALL cap displayed numbers at a configurable maximum, appending "+" when exceeded.

#### Scenario: Count within max
- **WHEN** `content` is a number less than or equal to `max` (default 99)
- **THEN** the indicator displays the number as-is

#### Scenario: Count exceeds max
- **WHEN** `content` is a number greater than `max`
- **THEN** the indicator displays "{max}+" (e.g. "99+")

#### Scenario: Non-numeric content ignores max
- **WHEN** `content` is not a number
- **THEN** the indicator displays content as-is

### Requirement: Color

The Badge component SHALL support a `color` prop. Default is `"error"` (red, matching the Figma design where the default badge is red).

#### Scenario: Error color (default)
- **WHEN** `color` is `"error"` or not provided
- **THEN** the indicator background uses `var(--reltio-color-error)`

#### Scenario: Primary color
- **WHEN** `color` is `"primary"`
- **THEN** the indicator background uses `var(--reltio-color-primary)`

### Requirement: Rest Props Forwarded to Root Element

All rest props (`...rest`) SHALL be forwarded to the root wrapper `<span>` element. See MDN reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span.

#### Scenario: HTML attributes forwarded
- **WHEN** props like `data-testid`, `aria-label`, `className`, `style` are provided
- **THEN** they are set on the root wrapper `<span>`

### Requirement: CSS Styling

The Badge component SHALL use CSS Modules with the `classNames()` utility. All color values use global `--reltio-color-*` tokens.

#### Scenario: Root wrapper is positioned
- **WHEN** the badge is rendered with children
- **THEN** the root `<span>` has `position: relative` and `display: inline-flex`
- **AND** the indicator `<span>` has `position: absolute`, `top: 0`, `right: 0`, translated to overlap the corner

#### Scenario: Indicator styling
- **WHEN** the indicator renders with content
- **THEN** it has min-width 20px, height 20px, border-radius 10px (pill shape)
- **AND** white text on colored background, font-size 12px, font-weight 500

#### Scenario: Dot styling
- **WHEN** the indicator renders as a dot
- **THEN** it has width 8px, height 8px, border-radius 50%

### Requirement: TypeScript Type Safety

All types SHALL be in `Badge.types.ts` using the `type` keyword.

#### Scenario: Props use HtmlProps
- **WHEN** developer uses Badge
- **THEN** BadgeProps extends `HtmlProps<"span", CustomBadgeProps>`
- **AND** custom props: `content` (ReactNode), `color`, `max` (number), `children` (ReactNode)

### Requirement: Storybook Documentation

The Badge component SHALL have Storybook stories demonstrating all variants with interaction tests.

#### Scenario: Stories cover all states
- **WHEN** viewing Storybook
- **THEN** a **Default** story shows a Badge with count=3 wrapping a notification icon
- **AND** a **Dot** story shows a Badge without content (dot indicator) wrapping an icon
- **AND** a **MaxCount** story shows content={150} displaying "99+"
- **AND** a **Primary** story shows a Badge with color="primary"
- **AND** a **Standalone** story shows a Badge without children (inline indicator only)

