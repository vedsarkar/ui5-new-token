# avatar-component Specification

## Purpose
TBD - created by archiving change design-package-v1. Update Purpose after archive.
## Requirements
### Requirement: Image Display

The Avatar component SHALL render an `<img>` element when a `src` prop is provided.

#### Scenario: Image renders from src
- **WHEN** `src` prop is provided
- **THEN** an `<img>` element renders inside the root `<span>`
- **AND** the `alt` prop is forwarded to the `<img>` element
- **AND** the image fills the avatar container with `object-fit: cover`

#### Scenario: Alt text defaults to empty string
- **WHEN** `src` is provided but `alt` is not
- **THEN** the `<img>` element has `alt=""`

### Requirement: Fallback Chain

The Avatar component SHALL implement a three-level fallback: image, children content, and a default person icon.

#### Scenario: Image error falls back to children
- **WHEN** `src` is provided but the image fails to load (onError)
- **THEN** the `<img>` element is hidden
- **AND** `children` content is displayed instead

#### Scenario: Children displayed when no src
- **WHEN** `src` is not provided and `children` is provided
- **THEN** the children content renders inside the root `<span>`
- **AND** no `<img>` element is rendered

#### Scenario: Default icon when no src and no children
- **WHEN** neither `src` nor `children` is provided
- **THEN** a generic person icon from `@/icons/Person` renders inside the root `<span>`

#### Scenario: Default icon after image error with no children
- **WHEN** `src` is provided but fails to load and no `children` is provided
- **THEN** the person icon from `@/icons/Person` is displayed

### Requirement: Size Variants

The Avatar component SHALL support five size variants via the `size` prop.

#### Scenario: Default size is "md"
- **WHEN** `size` prop is not provided
- **THEN** the avatar renders at medium size (32px)

#### Scenario: All sizes render correct dimensions
- **WHEN** `size` is `"xs"`
- **THEN** the avatar renders at 20px
- **WHEN** `size` is `"sm"`
- **THEN** the avatar renders at 24px
- **WHEN** `size` is `"md"`
- **THEN** the avatar renders at 32px
- **WHEN** `size` is `"lg"`
- **THEN** the avatar renders at 40px
- **WHEN** `size` is `"xl"`
- **THEN** the avatar renders at 56px

#### Scenario: Font size scales with avatar size
- **WHEN** a size variant is applied and children contain text (initials)
- **THEN** the font size scales proportionally to the avatar size

### Requirement: Shape Variants

The Avatar component SHALL support two shape variants via the `shape` prop.

#### Scenario: Default shape is "circle"
- **WHEN** `shape` prop is not provided
- **THEN** the avatar renders with `border-radius: 50%`

#### Scenario: Square shape
- **WHEN** `shape` is `"square"`
- **THEN** the avatar renders with a small border-radius (4px)

### Requirement: Rest Props Forwarded to Root Element

The Avatar component SHALL forward all rest props (`...rest`) to the root `<span>` element. This covers `aria-label`, `data-testid`, `title`, `role`, and any other valid span attributes.

#### Scenario: ARIA attributes passed via rest
- **WHEN** `aria-label` prop is provided
- **THEN** the root `<span>` receives the `aria-label` attribute

#### Scenario: Data attributes passed via rest
- **WHEN** `data-testid` prop is provided
- **THEN** the root `<span>` receives the `data-testid` attribute

### Requirement: CSS Styling

The Avatar component SHALL use CSS Modules with the `classNames()` utility. Colors reference global `--reltio-color-*` tokens. No component-level CSS custom properties.

#### Scenario: Colors use global tokens
- **WHEN** the avatar is rendered
- **THEN** the default background uses a neutral surface token (e.g. `--reltio-color-surface-3`)
- **AND** the default text/icon color uses `--reltio-color-text-secondary`
- **AND** no hardcoded hex values in CSS

#### Scenario: Stable CSS classes for external customization
- **WHEN** the avatar is rendered
- **THEN** `classNames()` utility provides stable prefixed classes (e.g. `reltio_Avatar_root`, `reltio_Avatar_image`)

#### Scenario: Custom className and style support
- **WHEN** a developer provides `className` or `style` props
- **THEN** they are applied to the root `<span>` element
- **AND** developers can override background and text color via className for custom color schemes

### Requirement: TypeScript Type Safety

All types SHALL be defined in `Avatar.types.ts` using the `type` keyword.

#### Scenario: Props use HtmlProps
- **WHEN** a developer uses Avatar
- **THEN** `AvatarProps` extends `HtmlProps<"span", CustomAvatarProps>`
- **AND** custom props: `src`, `alt`, `children`, `size`, `shape`, `className`, `style`
- **AND** rest props are forwarded to the root `<span>` element

### Requirement: Storybook Documentation

The Avatar component SHALL have Storybook stories demonstrating all variants. Each story shows ONE variant. Stories use the "autodocs" tag.

#### Scenario: Stories cover all variants
- **WHEN** viewing Storybook
- **THEN** a **Default** story shows an avatar with an image (`src` provided)
- **AND** an **Initials** story shows an avatar with text children (e.g. "AB")
- **AND** a **WithIcon** story shows an avatar with a custom icon as children
- **AND** a **Sizes** story shows all five size variants side by side
- **AND** a **Square** story shows a square-shaped avatar
- **AND** a **Fallback** story shows an avatar with a broken `src` that falls back to children or default icon

#### Scenario: Play functions verify behavior
- **WHEN** interaction tests run
- **THEN** **Default** story verifies the `<img>` element is rendered inside the avatar
- **AND** **Fallback** story verifies that after image error, the fallback content is displayed
- **AND** **Sizes** story verifies each avatar has the correct computed dimensions

