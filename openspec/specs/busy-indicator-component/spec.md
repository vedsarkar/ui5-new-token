# busy-indicator-component Specification

## Purpose
TBD - created by archiving change add-busy-indicator. Update Purpose after archive.
## Requirements
### Requirement: Active State

The BusyIndicator SHALL display animated dots only when `active` is `true`.

#### Scenario: Inactive (default)
- **WHEN** `active` is `false` or not provided
- **THEN** the dots and text are not rendered
- **AND** if `children` are provided, they render at full opacity without overlay

#### Scenario: Active without delay
- **WHEN** `active` is `true` and the delay period has elapsed
- **THEN** three animated dots render
- **AND** if `children` are provided, they are dimmed with `opacity: var(--sapContent_DisabledOpacity)`

### Requirement: Delay

The BusyIndicator SHALL support a `delay` prop (number, default 1000ms) that prevents flash-of-loading for fast operations.

#### Scenario: Delay prevents flash
- **WHEN** `active` becomes `true`
- **THEN** the dots do not appear immediately
- **AND** the dots appear only after the delay period elapses
- **AND** if `active` becomes `false` before the delay elapses, the dots never appear

### Requirement: Size Variants

The BusyIndicator SHALL support three sizes: `"S"` | `"M"` | `"L"`. Default: `"M"`.

#### Scenario: Size S
- **WHEN** `size` is `"S"`
- **THEN** dots are 8px circles with 1px gap

#### Scenario: Size M (default)
- **WHEN** `size` is `"M"` or not provided
- **THEN** dots are 16px circles with 3px gap

#### Scenario: Size L
- **WHEN** `size` is `"L"`
- **THEN** dots are 32px circles with 4px gap

### Requirement: Dot Animation

The BusyIndicator SHALL animate three dots in a staggered pulsing wave.

#### Scenario: Animation specification
- **THEN** each dot uses a `grow` keyframe: `scale(0.5)` at 0% → `scale(1)` at 25% → `scale(0.5)` at 50% → `scale(0.5)` at 100%
- **AND** animation duration: 1.6s
- **AND** timing function: `cubic-bezier(0.32, 0.06, 0.85, 1.11)`
- **AND** iteration: infinite
- **AND** staggered delays: dot 1 = 0ms, dot 2 = 200ms, dot 3 = 400ms
- **AND** dot color: `--sapContent_BusyColor`

### Requirement: Text Label

The BusyIndicator SHALL support a `text` prop displaying a label below the dots.

#### Scenario: Text renders below dots
- **WHEN** `text` is provided and the indicator is active (after delay)
- **THEN** text renders centered below the dots with 8px top margin
- **AND** text uses `--sapContent_LabelColor` at 14px

#### Scenario: No text
- **WHEN** `text` is not provided
- **THEN** no label is rendered

### Requirement: Overlay Mode

The BusyIndicator SHALL support wrapping children to create a loading overlay.

#### Scenario: Children with active overlay
- **WHEN** `children` are provided and the indicator is active (after delay)
- **THEN** children render with `opacity: var(--sapContent_DisabledOpacity)`
- **AND** the dots and text render centered over the children
- **AND** children are not interactive (pointer-events disabled)

#### Scenario: Children without active state
- **WHEN** `children` are provided and `active` is `false`
- **THEN** children render normally at full opacity
- **AND** no dots or overlay appear

### Requirement: Accessibility

The BusyIndicator SHALL be accessible to screen readers and keyboard users.

#### Scenario: ARIA attributes
- **WHEN** the indicator is active (after delay)
- **THEN** the busy area has `role="progressbar"`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuetext="Busy"`
- **AND** `title="Please wait"` for screen reader announcement
- **AND** if `text` is provided, `aria-labelledby` references the text label element

#### Scenario: Focus management
- **WHEN** the indicator is active with children (overlay mode)
- **THEN** the busy area is focusable (`tabIndex={0}`)
- **AND** focus is visually indicated with `--sapContent_FocusColor` outline

### Requirement: TypeScript Types

The component props SHALL be defined in `BusyIndicator.types.ts`.

#### Scenario: BusyIndicatorProps
- **THEN** `BusyIndicatorProps = HtmlProps<"div", { active, delay, size, text, children }>`
- **AND** `BusyIndicatorSize = "S" | "M" | "L"` is exported

### Requirement: CSS Styling

The component SHALL use CSS Modules with `classNames()` utility and SAP Horizon tokens.

#### Scenario: Token usage
- **THEN** dot color: `--sapContent_BusyColor`
- **AND** overlay opacity: `--sapContent_DisabledOpacity`
- **AND** focus outline: `--sapContent_FocusColor`
- **AND** text color: `--sapContent_LabelColor`
- **AND** no hardcoded colors, no component-level CSS custom properties

### Requirement: Storybook Stories

Each story SHALL demonstrate one variant.

#### Scenario: Stories
- Default (active, size M)
- SizeSmall, SizeLarge
- WithText (text label below dots)
- OverlayMode (wrapping content with loading overlay)
- WithDelay (demonstrating delay before showing)
- Inactive (showing that nothing renders when not active)

