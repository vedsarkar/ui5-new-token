## MODIFIED Requirements

### Requirement: Handle and Track Design
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Custom SAP handle replaces native input appearance
- **WHEN** the slider is rendered
- **THEN** the handle is a 32x24px rounded rectangle (8px radius) with bidirectional arrow icon
- **AND** uses `--sapSlider_HandleBackground`, `--sapSlider_HandleBorderColor` for default state
- **AND** hover: `--sapSlider_Hover_HandleBackground`, active: `--sapSlider_Active_HandleBackground`

#### Scenario: Dual-layer track with end dots
- **WHEN** the slider is rendered
- **THEN** inactive track is 4px in `--sapSlider_Background` with `--sapSlider_BorderColor` border
- **AND** active track is 2px in `--sapSlider_Selected_Background`
- **AND** 8x8px end dots render at both track ends

### Requirement: Tickmarks and Tooltip
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Tickmarks with labels
- **WHEN** `showTickmarks` is enabled with a `step` value
- **THEN** tick lines render at each step using `--sapSlider_HandleBorderColor`
- **AND** labels render at specified intervals in `--sapContent_LabelColor`

#### Scenario: Value tooltip on interaction
- **WHEN** the user hovers or drags the handle
- **THEN** a tooltip shows the current value above the handle
- **AND** tooltip uses `--sapSlider_HandleBackground` background
