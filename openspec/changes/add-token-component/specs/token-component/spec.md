## ADDED Requirements

### Requirement: Text Content

The Token SHALL display text via a `text` prop (string). No arbitrary ReactNode children — tokens show text only.

#### Scenario: Text rendering
- **WHEN** `text` is provided
- **THEN** the text renders centered in the token pill with `--sapTextColor` at `--sapFontSize`

### Requirement: Selected State

The Token SHALL support a `selected` prop (boolean, default false) that visually highlights the token.

#### Scenario: Selected visual
- **WHEN** `selected` is `true`
- **THEN** background: `--sapButton_Selected_Background`, border: `--sapButton_Selected_BorderColor`, text: `--sapButton_Selected_TextColor`
- **AND** font-family changes to `--sapFontSemiboldDuplexFamily`
- **AND** `aria-selected="true"` is set

#### Scenario: Default (not selected)
- **WHEN** `selected` is `false` or not set
- **THEN** background: `--sapButton_TokenBackground`, border: `--sapButton_TokenBorderColor`, text: `--sapTextColor`

### Requirement: ReadOnly State

The Token SHALL support a `readOnly` prop (boolean, default false) that prevents deletion and hides the close icon.

#### Scenario: ReadOnly visual
- **WHEN** `readOnly` is `true`
- **THEN** border: `--sapField_ReadOnly_BorderColor`, text: `--sapContent_LabelColor`
- **AND** close icon is not rendered
- **AND** token cannot be deleted via keyboard

### Requirement: Close / Delete Button

The Token SHALL show a close icon when not readonly, enabling deletion.

#### Scenario: Close icon visible
- **WHEN** `readOnly` is `false` (default)
- **THEN** a Close icon (12px) renders at the trailing end of the token
- **AND** clicking it fires `onDelete`

#### Scenario: Close icon hidden in readonly
- **WHEN** `readOnly` is `true`
- **THEN** no close icon is rendered

### Requirement: Events

The Token SHALL fire `onSelect` when clicked or Space is pressed, and `onDelete` when the close icon is clicked or Delete/Backspace is pressed.

#### Scenario: Select event
- **WHEN** the user clicks the token or presses Space
- **THEN** `onSelect` callback is called

#### Scenario: Delete event via icon
- **WHEN** the user clicks the close icon
- **THEN** `onDelete` callback is called

#### Scenario: Delete event via keyboard
- **WHEN** the token has focus and the user presses Delete or Backspace
- **AND** `readOnly` is `false`
- **THEN** `onDelete` callback is called

### Requirement: Disabled State

The Token SHALL support a `disabled` prop that prevents all interaction.

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.4`, `pointer-events: none`

### Requirement: Hover State

The Token SHALL provide visual hover feedback when not disabled.

#### Scenario: Hover (not readonly, not selected)
- **WHEN** the user hovers over the token
- **THEN** background changes to `--sapButton_Hover_Background`

#### Scenario: Hover (selected)
- **WHEN** the user hovers over a selected token
- **THEN** background changes to `--sapButton_Selected_Hover_Background`

### Requirement: Dimensions

The Token SHALL follow SAP Horizon Cozy sizing.

#### Scenario: Token dimensions
- **THEN** height: 26px, border-radius: 6px
- **AND** padding: 0 5px (with close icon visible) or `4px 5px` (readonly)
- **AND** border: `--sapButton_BorderWidth` solid
- **AND** close icon: 12px with `4px 8px` padding area

### Requirement: Accessibility

The Token SHALL be accessible to keyboard and screen reader users.

#### Scenario: ARIA attributes
- **THEN** root element has `role="option"` and `aria-selected` reflecting the selected state
- **AND** close icon has accessible name "Delete"

#### Scenario: Focus styling
- **WHEN** the token receives keyboard focus
- **THEN** a focus ring in `--sapContent_FocusColor` with `--sapContent_FocusStyle` appears

### Requirement: TypeScript Types

The component props SHALL be defined in `Token.types.ts`.

#### Scenario: Props definition
- **THEN** `TokenProps = HtmlProps<"div", { text, selected, readOnly, disabled, onSelect, onDelete }>`

### Requirement: CSS Styling

The component SHALL use CSS Modules with `classNames()` and SAP Horizon token tokens.

#### Scenario: Token usage
- **THEN** uses `--sapButton_TokenBackground`, `--sapButton_TokenBorderColor`, `--sapTextColor`, `--sapButton_Selected_Background`, `--sapButton_Selected_BorderColor`, `--sapButton_Selected_TextColor`, `--sapButton_Hover_Background`, `--sapButton_Selected_Hover_Background`, `--sapField_ReadOnly_BorderColor`, `--sapContent_LabelColor`, `--sapContent_FocusColor`, `--sapFontFamily`, `--sapFontSemiboldDuplexFamily`, `--sapFontSize`, `--sapButton_BorderWidth`

### Requirement: Storybook Stories

Each story SHALL demonstrate one variant.

#### Scenario: Stories
- Default, Selected, ReadOnly, ReadOnlySelected
- WithDeleteButton (onDelete handler)
- Disabled
- Hover (interactive demo)
