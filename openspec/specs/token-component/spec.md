# token-component Specification

## Purpose

SAP Fiori Token — a pill-shaped element representing a selected value. Supports selected, read-only, and disabled states with a close/delete button. Used standalone or inside tokenizer/multi-combo patterns.

SAP equivalent: `ui5-token`. Reference: https://experience.sap.com/fiori-design-web/token/

## Requirements

### Requirement: Text Content

The Token SHALL display text via a `text` prop (string).

#### Scenario: Text rendering
- **WHEN** `text` is provided
- **THEN** the text renders centered in the token pill with `--sapTextColor` at `--sapFontSize`

### Requirement: Selected State

The Token SHALL support a `selected` prop (boolean, default false).

#### Scenario: Selected visual
- **WHEN** `selected` is `true`
- **THEN** background: `--sapButton_Selected_Background`, border: `--sapButton_Selected_BorderColor`, text: `--sapButton_Selected_TextColor`
- **AND** font-family changes to `--sapFontSemiboldDuplexFamily`
- **AND** `aria-selected="true"` is set

#### Scenario: Default (not selected)
- **WHEN** `selected` is `false` or not set
- **THEN** background: `--sapButton_TokenBackground`, border: `--sapButton_TokenBorderColor`, text: `--sapTextColor`

### Requirement: ReadOnly State

The Token SHALL support a `readOnly` prop (boolean, default false).

#### Scenario: ReadOnly visual
- **WHEN** `readOnly` is `true`
- **THEN** border: `--sapField_ReadOnly_BorderColor`, text: `--sapContent_LabelColor`
- **AND** close icon is not rendered

### Requirement: Close / Delete Button

The Token SHALL show a close icon when not readonly.

#### Scenario: Close icon visible
- **WHEN** `readOnly` is `false`
- **THEN** a Close icon (12px) renders at the trailing end
- **AND** clicking it fires `onDelete`

#### Scenario: Close icon hidden in readonly
- **WHEN** `readOnly` is `true`
- **THEN** no close icon is rendered

### Requirement: Events

The Token SHALL fire `onSelect` on click/Space and `onDelete` on close icon click or Delete/Backspace key.

#### Scenario: Select event
- **WHEN** the user clicks the token or presses Space
- **THEN** `onSelect` is called

#### Scenario: Delete event via keyboard
- **WHEN** the user presses Delete or Backspace and `readOnly` is `false`
- **THEN** `onDelete` is called

### Requirement: Disabled State

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.4`, `pointer-events: none`

### Requirement: Hover State

The Token SHALL provide visual hover feedback when not disabled.

#### Scenario: Hover (default)
- **WHEN** hovering a non-selected token
- **THEN** background: `--sapButton_Hover_Background`

#### Scenario: Hover (selected)
- **WHEN** hovering a selected token
- **THEN** background: `--sapButton_Selected_Hover_Background`

### Requirement: Dimensions

#### Scenario: Token dimensions
- **THEN** height: 26px, border-radius: 6px, padding: 0 5px, border: `--sapButton_BorderWidth`

### Requirement: Accessibility

#### Scenario: ARIA
- **THEN** `role="option"`, `aria-selected` reflects selected state, close icon has `aria-label="Delete"`

#### Scenario: Focus
- **WHEN** token receives keyboard focus
- **THEN** `--sapContent_FocusColor` outline appears

### Requirement: TypeScript Types

Props SHALL be defined as `TokenProps = HtmlProps<"div", { text, selected, readOnly, disabled, onSelect, onDelete }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapButton_TokenBackground`, `--sapButton_TokenBorderColor`, `--sapTextColor`, `--sapButton_Selected_Background`, `--sapButton_Selected_BorderColor`, `--sapButton_Selected_TextColor`, `--sapButton_Hover_Background`, `--sapButton_Selected_Hover_Background`, `--sapField_ReadOnly_BorderColor`, `--sapContent_LabelColor`, `--sapContent_FocusColor`, `--sapFontFamily`, `--sapFontSemiboldDuplexFamily`, `--sapFontSize`, `--sapButton_BorderWidth`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default, Selected, ReadOnly, ReadOnlySelected, WithDeleteButton, Disabled
