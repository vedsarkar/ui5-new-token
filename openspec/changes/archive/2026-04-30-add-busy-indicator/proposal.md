## Why

The design system needs a loading/busy state indicator for use across Reltio applications. Currently there is no standard component for showing indeterminate loading — teams use ad-hoc solutions or the existing Skeleton component (which is for content placeholders, not action feedback).

The SAP Fiori BusyIndicator (`ui5-busy-indicator`) is the standard pattern: three animated dots that pulse in sequence, with optional text label and an overlay mode that dims wrapped content during loading.

## What Changes

Add a new `BusyIndicator` component to `components/BusyIndicator/`.

**Component behavior:**
- Three circular dots animated in a staggered pulsing wave (`scale(0.5)` → `scale(1)` → `scale(0.5)`)
- Three size variants: S (8px dots), M (16px dots, default), L (32px dots)
- `active` prop controls visibility
- `delay` prop (default 1000ms) prevents flash-of-loading for fast operations
- Optional `text` label below the dots
- **Overlay mode:** when `children` are provided, the indicator overlays them with reduced opacity during loading

**Visual spec (from UI5 source, Horizon theme):**
- Dot color: `--sapContent_BusyColor`
- Animation: `1.6s cubic-bezier(0.32, 0.06, 0.85, 1.11) infinite` with 200ms stagger between dots
- Overlay opacity: `--sapContent_DisabledOpacity`
- Focus outline: `--sapContent_FocusColor`

**Accessibility:**
- `role="progressbar"` with `aria-valuetext="Busy"`
- Focus trap during busy state (Tab doesn't reach dimmed content)
- `title="Please wait"` for screen reader announcement

## Capabilities

### New Capabilities
- `busy-indicator-component`: Defines the BusyIndicator component — an indeterminate loading indicator with three animated dots, size variants, delay mechanism, optional text label, and overlay mode for wrapping content.

## Impact

- **Affected code:** New `components/BusyIndicator/` directory with standard component structure
- **Affected systems:** None — new leaf component with no dependencies beyond icons
- **Dependencies:** None (pure CSS animation, no external libraries)
- **Public API:** New `BusyIndicator` component and `BusyIndicatorProps` type exported from `@reltio/design`

## Out of scope

- Determinate loading (use ProgressIndicator instead)
- Skeleton/shimmer loading (existing Skeleton component)
- Global page-level loading overlay (compose BusyIndicator with layout)
- `textPlacement` prop (SAP supports Top/Bottom, but Bottom-only is sufficient for v1)
