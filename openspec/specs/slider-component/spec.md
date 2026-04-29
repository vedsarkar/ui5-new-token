# slider-component Specification

## Purpose

SAP Fiori Slider — a single-value range input with a custom rounded-rectangle handle, dual-layer track, end dots, optional tooltip, and tickmarks with labels.

SAP equivalent: `ui5-slider`. Reference: https://www.sap.com/design-system/fiori-design-web/ui-elements/slider-web-component/

## Requirements

### Requirement: Controlled Value

The Slider SHALL operate in controlled mode. `value` sets the current position; `onChange(event, numericValue)` notifies the parent.

### Requirement: Range Configuration

#### Scenario: Default range
- **WHEN** no range props are set
- **THEN** min=0, max=100, step=1

#### Scenario: Custom range
- **WHEN** `min`, `max`, and `step` are provided
- **THEN** the slider operates within the specified range

### Requirement: Track Design

The Slider SHALL render a dual-layer track: inactive track (full width) overlaid with an active track (0% to value%).

#### Scenario: Inactive track
- **THEN** a 4px bar in `--sapSlider_Background` with `--sapSlider_BorderColor` border
- **AND** 8x8px end dots at both ends

#### Scenario: Active track
- **THEN** a 2px bar in `--sapSlider_Selected_Background` with `--sapSlider_Selected_BorderColor` border
- **AND** width corresponds to the current value percentage

#### Scenario: End dots
- **THEN** left dot: `--sapSlider_Selected_Background` with `--sapContent_Selected_MeasureIndicatorColor` border
- **AND** right dot: `--sapContent_MeasureIndicatorColor`

### Requirement: Handle

The Slider SHALL render a custom 32x24px rounded-rectangle handle (8px radius) with bidirectional arrow icon.

#### Scenario: Handle styling
- **THEN** default: `--sapSlider_HandleBackground`, `--sapSlider_HandleBorderColor`
- **AND** hover: `--sapSlider_Hover_HandleBackground`, `--sapSlider_Hover_HandleBorderColor`
- **AND** active: `--sapSlider_Active_HandleBackground`, `--sapSlider_Active_HandleBorderColor`

#### Scenario: Focus
- **WHEN** the native input receives keyboard focus
- **THEN** 2px outline in `--sapContent_FocusColor` with 2px offset on the handle

### Requirement: Tooltip

#### Scenario: Tooltip display
- **WHEN** `showTooltip` is `true` and the user is dragging or focusing
- **THEN** a tooltip showing the current numeric value appears above the handle
- **AND** tooltip uses `--sapSlider_Selected_Background` background and `--sapButton_Emphasized_TextColor` text

### Requirement: Tickmarks

#### Scenario: Tickmarks display
- **WHEN** `showTickmarks` is `true`
- **THEN** vertical tick lines render along the track at each step position
- **AND** active ticks use `--sapSlider_Selected_BorderColor`
- **AND** inactive ticks use `--sapContent_MeasureIndicatorColor`

#### Scenario: Label interval
- **WHEN** `labelInterval` is set (e.g., 2)
- **THEN** every Nth tick shows a numeric label below the track in `--sapContent_LabelColor`

### Requirement: Disabled State

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.4`, `pointer-events: none`

### Requirement: Invisible Native Input

The Slider SHALL use an invisible `<input type="range">` overlaid on the track for native interaction (drag, keyboard arrows, accessibility).

### Requirement: TypeScript Types

Props SHALL be defined as `SliderProps = HtmlProps<"div", { value, onChange, min, max, step, disabled, showTooltip, showTickmarks, labelInterval, "aria-label" }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapSlider_Selected_Background`, `--sapSlider_Selected_BorderColor`, `--sapContent_Selected_MeasureIndicatorColor`, `--sapContent_MeasureIndicatorColor`, `--sapSlider_Background`, `--sapSlider_BorderColor`, `--sapSlider_HandleBackground`, `--sapSlider_HandleBorderColor`, `--sapSlider_Hover_HandleBackground`, `--sapSlider_Hover_HandleBorderColor`, `--sapSlider_Active_HandleBackground`, `--sapSlider_Active_HandleBorderColor`, `--sapContent_FocusColor`, `--sapButton_Emphasized_TextColor`, `--sapContent_LabelColor`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default, WithTooltip, WithTickmarks, WithTickmarksAndLabels, CustomRange, Disabled
