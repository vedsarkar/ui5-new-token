# chip-component Specification

## Purpose

Chip — a compact interactive element for filters, tags, and selections. Supports filled/outlined variants, 5 semantic colors, 2 sizes, optional icon, and remove button.

> **Note:** A future change will align this component to the SAP Fiori Token component (`ui5-token`). The current API (variant, color, size) will be restructured to match SAP Token semantics (text, readOnly, selected, onDelete).

## Requirements

### Requirement: Variant

The Chip SHALL support 2 visual variants: `"filled"` | `"outlined"`. Default: `"filled"`.

#### Scenario: Filled variant
- **WHEN** `variant` is `"filled"` or not set
- **THEN** uses solid background color per the active `color` scheme

#### Scenario: Outlined variant
- **WHEN** `variant` is `"outlined"`
- **THEN** uses transparent background with a colored border

### Requirement: Color

The Chip SHALL support 5 colors: `"default"` | `"primary"` | `"success"` | `"warning"` | `"error"`. Default: `"default"`.

#### Scenario: Default color
- **THEN** background: `--sapNeutralBackground`, text: `--sapTextColor`, hover: `--sapActiveColor`

#### Scenario: Primary color
- **THEN** text: `--sapInformativeColor`, background: `--sapInformationBackground`

#### Scenario: Success color
- **THEN** text: `--sapPositiveElementColor`, background: `--sapSuccessBackground`

#### Scenario: Warning color
- **THEN** text: `--sapCriticalElementColor`, background: `--sapWarningBackground`

#### Scenario: Error color
- **THEN** text: `--sapNegativeElementColor`, background: `--sapErrorBackground`

### Requirement: Size

The Chip SHALL support 2 sizes: `"small"` | `"medium"`. Default: `"medium"`.

#### Scenario: Medium size
- **THEN** height: 32px, icon: 18px

#### Scenario: Small size
- **THEN** height: 26px, icon: 16px

### Requirement: Icon

#### Scenario: Leading icon
- **WHEN** `icon` is provided
- **THEN** the icon renders before the label content

### Requirement: Remove Button

#### Scenario: Removable chip
- **WHEN** `onRemove` is provided
- **THEN** a close icon button renders after the label
- **AND** clicking it calls `onRemove`

### Requirement: Interactive Chip

#### Scenario: Clickable chip
- **WHEN** `onClick` is provided
- **THEN** the chip renders as an interactive `<button>` with hover/focus states

### Requirement: Disabled State

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.38`, interactions disabled

### Requirement: TypeScript Types

Props SHALL be defined as `ChipProps = HtmlProps<"button", { variant, color, size, icon, onRemove, onClick, disabled }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapNeutralBackground`, `--sapTextColor`, `--sapActiveColor`, `--sapInformationBackground`, `--sapInformativeColor`, `--sapSuccessBackground`, `--sapPositiveElementColor`, `--sapWarningBackground`, `--sapCriticalElementColor`, `--sapErrorBackground`, `--sapNegativeElementColor`, `--sapField_BorderColor`, `--sapContent_Shadow0`, `--sapContent_FocusColor`.
