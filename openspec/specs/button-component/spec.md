# button-component Specification

## Purpose

SAP Fiori Button — a flexible, accessible button supporting 7 design variants and polymorphic rendering as `<button>` or `<a>` based on the `href` prop.

SAP equivalent: `ui5-button`. Reference: https://experience.sap.com/fiori-design-web/button/

## Requirements

### Requirement: Design Variants

The Button SHALL support a `design` prop with 7 SAP Fiori variants: `"default"` | `"emphasized"` | `"ghost"` | `"transparent"` | `"positive"` | `"negative"` | `"attention"`. Default: `"default"`.

#### Scenario: Default design
- **WHEN** `design` is `"default"` or not provided
- **THEN** uses `--sapButton_Background`, `--sapButton_BorderColor`, `--sapButton_TextColor`
- **AND** hover: `--sapButton_Hover_Background`, `--sapButton_Hover_BorderColor`
- **AND** active: `--sapButton_Active_Background`, `--sapButton_Active_BorderColor`

#### Scenario: Emphasized design
- **WHEN** `design` is `"emphasized"`
- **THEN** uses `--sapButton_Emphasized_Background`, `--sapButton_Emphasized_TextColor`
- **AND** `font-weight: 700` and `text-shadow: 0 0 var(--sapButton_Emphasized_TextShadow)`

#### Scenario: Ghost design
- **WHEN** `design` is `"ghost"`
- **THEN** transparent background with `--sapButton_BorderColor` border and `--sapButton_TextColor`

#### Scenario: Transparent design
- **WHEN** `design` is `"transparent"`
- **THEN** uses `--sapButton_Lite_Background`, `--sapButton_Lite_BorderColor`, `--sapButton_Lite_TextColor`

#### Scenario: Positive design
- **WHEN** `design` is `"positive"`
- **THEN** uses `--sapButton_Accept_Background`, `--sapButton_Accept_BorderColor`, `--sapButton_Accept_TextColor`

#### Scenario: Negative design
- **WHEN** `design` is `"negative"`
- **THEN** uses `--sapButton_Reject_Background`, `--sapButton_Reject_BorderColor`, `--sapButton_Reject_TextColor`

#### Scenario: Attention design
- **WHEN** `design` is `"attention"`
- **THEN** uses `--sapButton_Attention_Background`, `--sapButton_Attention_BorderColor`, `--sapButton_Attention_TextColor`

### Requirement: Polymorphic Rendering

The Button SHALL render as `<a>` when `href` is provided, otherwise as `<button>`.

#### Scenario: Button element (default)
- **WHEN** `href` is not provided
- **THEN** renders as `<button>` with `type` prop (default: `"button"`)

#### Scenario: Anchor element
- **WHEN** `href` is provided
- **THEN** renders as `<a>` with `href`, `target`, `rel` attributes
- **AND** when disabled, `href` is removed and `aria-disabled="true"` is set

### Requirement: Icon-Only Mode

The Button SHALL automatically detect icon-only mode when `children` is a single React component element.

#### Scenario: Icon-only layout
- **WHEN** children is a single non-string, non-Fragment React element
- **THEN** the button gets `aspect-ratio: 1`, `padding: 0`, `min-width: var(--sapElement_Height)`
- **AND** the icon is centered within the square button

#### Scenario: Icon with text
- **WHEN** children contains both icon elements and text
- **THEN** standard layout with 8px gap between children

### Requirement: Disabled State

#### Scenario: Disabled button
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.4`, `cursor: default`, `pointer-events: none`
- **AND** blurs the button if it was focused when becoming disabled

### Requirement: Full Width

#### Scenario: Full width
- **WHEN** `fullWidth` is `true`
- **THEN** button takes `width: 100%` of its container

### Requirement: Focus and Interaction

#### Scenario: Focus visible
- **WHEN** the button receives keyboard focus
- **THEN** 2px outline in `--sapContent_FocusColor` with -3px offset

### Requirement: TypeScript Types

Props SHALL be defined as a discriminated union: `ButtonElementProps` (no href) | `AnchorElementProps` (with href), both extending `BaseButtonProps = { design, disabled, fullWidth }`.

### Requirement: CSS Styling

**SAP tokens used:** All `--sapButton_*` variant tokens (Background, BorderColor, TextColor, Hover_*, Active_* for each design), `--sapButton_Emphasized_TextShadow`, `--sapButton_BorderWidth`, `--sapButton_BorderCornerRadius`, `--sapButton_Lite_*`, `--sapButton_Accept_*`, `--sapButton_Reject_*`, `--sapButton_Attention_*`, `--sapElement_Height`, `--sapContent_FocusColor`, `--sapFontFamily`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default, Emphasized, Ghost, Transparent, Positive, Negative, Attention
- Disabled, DisabledEmphasized
- FullWidth
- AsLink, AsExternalLink
- WithIcons, IconOnly, IconOnlyEmphasized, IconOnlyTransparent
