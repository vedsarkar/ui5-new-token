## Why

The design system needs a determinate progress indicator for operations where completion percentage is known (file uploads, data processing, multi-step workflows). The existing BusyIndicator covers indeterminate loading; this component fills the determinate gap.

The SAP Fiori ProgressIndicator (`ui5-progress-indicator`) is a horizontal bar showing 0–100% progress with value state coloring and optional text display.

## What Changes

Add a new `ProgressIndicator` component to `components/ProgressIndicator/`.

**Component behavior:**
- Horizontal progress bar with a filled portion (0–100%) and a remaining track
- Horizon theme "pill on rail" visual: bar is 10px tall on a 6px track with rounded ends and side dots
- 5 value states: None, Error, Warning, Success, Information — each with distinct bar/track/icon colors
- `displayValue` prop for custom text (e.g., "3 of 10"), defaults to `"{value}%"`
- `hideValue` prop to hide the text entirely
- Animated width transitions proportional to value change
- Value text positioned above the bar; state icon to the right of the bar

**Visual spec (from UI5 source, Horizon theme):**
- Track: 6px height, `--sapProgress_Background`, 4px radius, side dots 4x4px
- Bar: 10px height, `--sapProgress_Value_Background`, 8px radius (taller than track — "pill on rail")
- State colors: `--sapProgress_Value_{state}Background` for bar, `--sapProgress_{state}Background` for track
- Text: `--sapProgress_TextColor`, positioned absolutely above bar
- Icon: semantic state icons (error, warning, check, info) in corresponding state color

**Accessibility:**
- `role="progressbar"` with `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow`
- `aria-valuetext` includes both percentage and state label (e.g., "75% Success")

## Capabilities

### New Capabilities
- `progress-indicator-component`: Defines the ProgressIndicator component — a horizontal determinate progress bar with value state coloring, custom display text, animated transitions, and the SAP Horizon "pill on rail" visual.

## Impact

- **Affected code:** New `components/ProgressIndicator/` directory with standard component structure
- **Dependencies:** ValueState type from `utils/valueState.ts` (existing shared infrastructure)
- **Public API:** New `ProgressIndicator` component and `ProgressIndicatorProps` type

## Out of scope

- Indeterminate progress (use BusyIndicator)
- Circular progress indicator variant
- Disabled state (SAP doesn't define one for ProgressIndicator)
