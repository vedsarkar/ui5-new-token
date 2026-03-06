## Why

The platform has no component for anchored overlays — dropdowns, context menus, action menus, and other non-modal popups that appear relative to a trigger element. Teams build custom solutions with manual z-index management, click-outside handlers, and positioning calculations. The native Popover API (Baseline 2024) and CSS Anchor Positioning (Baseline 2026) now provide all of this out of the box — top layer, light dismiss, and element-relative positioning — with zero JavaScript for the common case.

## What Changes

- New `Popover` component built on the native Popover API and CSS Anchor Positioning
- Uncontrolled: toggle via `onClick` on root wrapper + `togglePopover()` — no React state needed
- Required `trigger` prop for the element that toggles the popover; content via `children`
- Optional `header` and `footer` slots with fixed positioning and border separators; only body scrolls
- Positioning relative to trigger via `positionArea` prop (maps to CSS `position-area`)
- Scoped anchor names via CSS `anchor-scope` — multiple Popovers on a page without conflicts, no unique IDs
- Auto-close on content click (default for menus), opt-out via `e.stopPropagation()`
- `onToggle` callback forwarding the native `toggle` event for open/close notifications
- Focus management via `data-autofocus` attribute
- `popover="auto"`: light dismiss (Esc + click outside), one popover at a time
- Follows all platform standards: `classNames()`, CSS Modules, global color tokens

## Capabilities

### New Capabilities

- `popover-component`: Uncontrolled anchored popover using native Popover API and CSS Anchor Positioning, with required trigger, header/footer slots, configurable placement, auto-close behavior, light dismiss, focus management, and toggle notifications

### Modified Capabilities

_(none)_

## Impact

- **New files:** `components/Popover/` (component, types, styles, stories, index)
- **Dependencies:** None (uses only native browser APIs)
- **APIs:** New public export `Popover` and `PopoverProps`
- **Existing code:** No changes to existing components
