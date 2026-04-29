# avatar-component Specification

## Purpose

SAP Fiori Avatar — displays a user image, initials, or icon placeholder with 5 size variants, 2 shapes, and 10 accent color schemes.

SAP equivalent: `ui5-avatar`. Reference: https://experience.sap.com/fiori-design-web/avatar/

## Requirements

### Requirement: Content Fallback Chain

The Avatar SHALL display content in a 3-level fallback: image (via `src`) → custom content (via `children`) → default Person icon.

#### Scenario: Image display
- **WHEN** `src` is provided and loads successfully
- **THEN** the image fills the avatar with `object-fit: cover`

#### Scenario: Image error fallback
- **WHEN** `src` is provided but fails to load
- **THEN** falls back to `children` (if provided) or the default Person icon

#### Scenario: Initials display
- **WHEN** `src` is not provided and `children` is text
- **THEN** text renders centered with `text-transform: uppercase` and `font-weight: 500`

#### Scenario: Custom icon display
- **WHEN** `src` is not provided and `children` is a React element
- **THEN** the element renders centered at 50% of avatar dimensions

#### Scenario: Default icon
- **WHEN** neither `src` nor `children` is provided
- **THEN** a Person icon renders at 50% of avatar dimensions

### Requirement: Size Variants

The Avatar SHALL support 5 sizes: `"xs"` | `"s"` | `"m"` | `"l"` | `"xl"`. Default: `"m"`.

#### Scenario: Size dimensions
- **WHEN** `size` is set
- **THEN** xs=2rem, s=3rem, m=4rem, l=5rem, xl=7rem
- **AND** font-size scales proportionally: xs=12px, s=16px, m=20px, l=28px, xl=36px

### Requirement: Shape Variants

The Avatar SHALL support 2 shapes: `"circle"` | `"square"`. Default: `"circle"`.

#### Scenario: Circle shape
- **WHEN** `shape` is `"circle"` or not set
- **THEN** `border-radius: 50%`

#### Scenario: Square shape
- **WHEN** `shape` is `"square"`
- **THEN** `border-radius: var(--sapElement_BorderCornerRadius)`

### Requirement: Color Schemes

The Avatar SHALL support 10 accent color schemes (1-10) via the `colorScheme` prop. Each maps to `--sapAvatar_{N}_Background`, `--sapAvatar_{N}_TextColor`, `--sapAvatar_{N}_BorderColor`.

#### Scenario: Color scheme applied
- **WHEN** `colorScheme` is set to N (1-10)
- **THEN** background, text, and border use `--sapAvatar_{N}_*` tokens

#### Scenario: Default color (no colorScheme)
- **WHEN** `colorScheme` is not set
- **THEN** uses `--sapAvatar_10_*` tokens as the default neutral scheme

### Requirement: Accessibility

#### Scenario: Image role
- **WHEN** the avatar renders
- **THEN** the root element has `role="img"` and `aria-label` from the `alt` prop

### Requirement: TypeScript Types

Props SHALL be defined as `AvatarProps = HtmlProps<"span", { src, alt, children, size, shape, colorScheme }>`. Exported types: `AvatarSize`, `AvatarShape`, `AvatarColorScheme`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapAvatar_{1-10}_Background`, `--sapAvatar_{1-10}_TextColor`, `--sapAvatar_{1-10}_BorderColor`, `--sapElement_BorderCornerRadius`, `--sapFontFamily`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default (image), Initials, WithIcon
- SizeXS, SizeS, SizeM, SizeL, SizeXL
- Square
- ColorSchemes (all 10 in a row)
- Fallback (broken image URL)
