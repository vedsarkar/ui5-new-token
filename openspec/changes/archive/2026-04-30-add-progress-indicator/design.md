## Approach

Native React implementation of the SAP Horizon ProgressIndicator. The Horizon theme uses a distinctive "pill on rail" layout where the filled bar is visually taller than the track, creating a layered depth effect with rounded side dots.

## Key Decisions

### "Pill on Rail" Layout

The track (remaining bar) is 6px tall. The filled bar is 10px tall with larger border-radius, centered vertically over the track. This creates the Horizon-specific visual where the bar "sits on top of" the rail. Both elements use `position: relative`/`absolute` to layer correctly.

### Value Text Positioning

When `value > 50`, the text renders above the filled bar (left-aligned on the bar). When `value <= 50`, the text renders in the remaining area (right of the bar end). This prevents text from overflowing a narrow bar. Position is controlled via a CSS class toggle, not JS measurement.

### State Icon

When `valueState` is not None, an icon renders to the right of the track. Icons reuse the existing icon components (ErrorCircle, Warning, CheckCircle, Info) with color matching the state's text color token.

### Animation

Bar width transitions use inline `transition-duration` calculated as `|prevValue - newValue| * 20` ms. A `useRef` tracks the previous value. This gives proportional animation speed — small changes are quick, large jumps take longer (max 2s for 0→100).

### No Disabled State

SAP's ProgressIndicator has no disabled state. It's a display-only component — no user interaction to disable.

## Token Mapping

| Element | None | Error | Warning | Success | Information |
|---------|------|-------|---------|---------|-------------|
| Bar bg | `--sapProgress_Value_Background` | `--sapProgress_Value_NegativeBackground` | `--sapProgress_Value_CriticalBackground` | `--sapProgress_Value_PositiveBackground` | `--sapProgress_Value_InformationBackground` |
| Track bg | `--sapProgress_Background` | `--sapProgress_NegativeBackground` | `--sapProgress_CriticalBackground` | `--sapProgress_PositiveBackground` | `--sapProgress_InformationBackground` |
| Icon color | — | `--sapProgress_Value_NegativeTextColor` | `--sapProgress_Value_CriticalTextColor` | `--sapProgress_Value_PositiveTextColor` | `--sapProgress_Value_InformationTextColor` |
| Text | `--sapProgress_TextColor` | same | same | same | same |
