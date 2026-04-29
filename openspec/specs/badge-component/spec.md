# badge-component Specification

## Purpose

Badge indicator — a small visual counter or dot attached to another element, used for notification counts, status indicators, or unread markers.

No direct SAP equivalent (custom Reltio component using SAP Horizon tokens).

## Requirements

### Requirement: Badge Variants

#### Scenario: Count badge
- **WHEN** `content` is provided (number or text)
- **THEN** renders as a pill-shaped indicator with the content centered

#### Scenario: Dot badge
- **WHEN** `content` is not provided
- **THEN** renders as an 8x8px circle (dot indicator)

#### Scenario: Max count
- **WHEN** `max` is provided and numeric content exceeds it
- **THEN** displays `"{max}+"` (e.g., `"99+"`)

### Requirement: Color

The Badge SHALL support a `color` prop: `"primary"` | `"error"`. Default: `"primary"`.

#### Scenario: Primary color
- **WHEN** `color` is `"primary"` or not set
- **THEN** background: `--sapBrandColor`, text: `--sapContent_ContrastTextColor`

#### Scenario: Error color
- **WHEN** `color` is `"error"`
- **THEN** background: `--sapNegativeElementColor`, text: `--sapContent_ContrastTextColor`

### Requirement: Anchor Element

#### Scenario: Attached to children
- **WHEN** `children` is provided
- **THEN** the badge positions absolutely on the top-right corner of the children element

### Requirement: TypeScript Types

Props SHALL be defined as `BadgeProps = HtmlProps<"span", { content, color, max, children }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapBrandColor`, `--sapNegativeElementColor`, `--sapContent_ContrastTextColor`.
