# progress-indicator-component Specification

## Purpose
TBD - created by archiving change add-progress-indicator. Update Purpose after archive.
## Requirements
### Requirement: Value

The ProgressIndicator SHALL accept a `value` prop (number, default 0) representing the completion percentage. Values are clamped to 0–100.

#### Scenario: Value determines bar width
- **WHEN** `value` is set to N (0–100)
- **THEN** the filled bar width is N% of the total track width

#### Scenario: Value clamping
- **WHEN** `value` is less than 0
- **THEN** the bar width is 0%
- **WHEN** `value` is greater than 100
- **THEN** the bar width is 100%

### Requirement: Value State

The ProgressIndicator SHALL support a `valueState` prop (ValueState type: None/Error/Warning/Success/Information, default None) affecting bar color, track color, and icon display.

#### Scenario: None state (default)
- **WHEN** `valueState` is `"None"` or not set
- **THEN** bar uses `--sapProgress_Value_Background`, track uses `--sapProgress_Background`
- **AND** no state icon is displayed

#### Scenario: Error state
- **WHEN** `valueState` is `"Error"`
- **THEN** bar uses `--sapProgress_Value_NegativeBackground`, track uses `--sapProgress_NegativeBackground`
- **AND** an error icon displays in `--sapProgress_Value_NegativeTextColor`

#### Scenario: Warning state
- **WHEN** `valueState` is `"Warning"`
- **THEN** bar uses `--sapProgress_Value_CriticalBackground`, track uses `--sapProgress_CriticalBackground`
- **AND** a warning icon displays in `--sapProgress_Value_CriticalTextColor`

#### Scenario: Success state
- **WHEN** `valueState` is `"Success"`
- **THEN** bar uses `--sapProgress_Value_PositiveBackground`, track uses `--sapProgress_PositiveBackground`
- **AND** a success icon displays in `--sapProgress_Value_PositiveTextColor`

#### Scenario: Information state
- **WHEN** `valueState` is `"Information"`
- **THEN** bar uses `--sapProgress_Value_InformationBackground`, track uses `--sapProgress_InformationBackground`
- **AND** an information icon displays in `--sapProgress_Value_InformationTextColor`

### Requirement: Display Value

The ProgressIndicator SHALL support a `displayValue` prop (string) for custom text. When not provided, defaults to `"{value}%"`.

#### Scenario: Custom display value
- **WHEN** `displayValue` is `"3 of 10"`
- **THEN** the text "3 of 10" renders instead of the percentage

#### Scenario: Default percentage display
- **WHEN** `displayValue` is not provided
- **THEN** the text shows `"{value}%"` (e.g., "75%")

### Requirement: Hide Value

The ProgressIndicator SHALL support a `hideValue` prop (boolean, default false) that hides the text label entirely.

#### Scenario: Hidden value
- **WHEN** `hideValue` is `true`
- **THEN** no text label is rendered above the bar

### Requirement: Horizon Visual Design

The ProgressIndicator SHALL follow the SAP Horizon "pill on rail" design pattern.

#### Scenario: Track and bar dimensions
- **THEN** track (remaining bar) height: 6px with 4px border-radius
- **AND** bar (filled portion) height: 10px with 8px border-radius — taller than the track
- **AND** side dots (4x4px circles) at track start and end via ::before/::after pseudo-elements
- **AND** value text positioned absolutely above the bar
- **AND** state icon positioned absolutely to the right of the bar end

#### Scenario: Value text placement
- **WHEN** `value` is greater than 50
- **THEN** the text label renders inside/above the filled bar area
- **WHEN** `value` is 50 or less
- **THEN** the text label renders in the remaining (unfilled) area

### Requirement: Animated Transitions

The ProgressIndicator SHALL animate the bar width when the value changes.

#### Scenario: Proportional animation
- **WHEN** `value` changes from A to B
- **THEN** the bar width transitions with duration proportional to `|A - B| * 20` ms
- **AND** timing function is `linear`

### Requirement: Accessibility

The ProgressIndicator SHALL be accessible to screen readers.

#### Scenario: ARIA attributes
- **THEN** root element has `role="progressbar"`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow={value}`
- **AND** `aria-valuetext` includes percentage and state label (e.g., "75% Success")

### Requirement: TypeScript Types

The component props SHALL be defined in `ProgressIndicator.types.ts`.

#### Scenario: Props definition
- **THEN** `ProgressIndicatorProps = HtmlProps<"div", { value, valueState, displayValue, hideValue }>`

### Requirement: CSS Styling

The component SHALL use CSS Modules with `classNames()` and SAP Horizon progress tokens.

#### Scenario: Token usage
- **THEN** uses `--sapProgress_Background`, `--sapProgress_Value_Background`, `--sapProgress_TextColor`
- **AND** state-specific: `--sapProgress_Value_{Negative|Critical|Positive|Information}Background`, `--sapProgress_{Negative|Critical|Positive|Information}Background`
- **AND** state icon colors: `--sapProgress_Value_{Negative|Critical|Positive|Information}TextColor`
- **AND** no hardcoded colors, no component-level CSS custom properties

### Requirement: Storybook Stories

Each story SHALL demonstrate one variant.

#### Scenario: Stories
- Default (50%), Empty (0%), Full (100%)
- ValueStateError, ValueStateWarning, ValueStateSuccess, ValueStateInformation
- CustomDisplayValue (text override)
- HiddenValue (no text)
- AnimatedTransition (interactive value control)

