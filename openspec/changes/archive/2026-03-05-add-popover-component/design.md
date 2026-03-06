## Context

The platform has a Dialog component (modal, centered, `<dialog>` element) but no component for anchored non-modal overlays. The native Popover API (Baseline 2024) and CSS Anchor Positioning + `anchor-scope` (Baseline 2026) now provide top-layer rendering, light dismiss, and element-relative positioning natively. This component complements Dialog — Dialog for modal interactions, Popover for anchored non-modal overlays.

## Goals / Non-Goals

**Goals:**

- Thin uncontrolled wrapper over native Popover API + CSS Anchor Positioning
- Required `trigger` prop — always rendered inside a root wrapper `<span>`
- Toggle via `onClick` on root wrapper + `togglePopover()` — no IDs, no `cloneElement`, no `popovertarget`
- Configurable placement via `positionArea` prop (maps to CSS `position-area`)
- Scoped anchor names via CSS `anchor-scope` — no conflicts, no unique IDs
- Light dismiss (Esc + click outside) by default via `popover="auto"`
- Auto-close on content click (default for menus), opt-out via `stopPropagation`
- `header` and `footer` slots with fixed positioning and border separators
- `onToggle` callback for open/close notifications
- Focus management via `data-autofocus` attribute

**Non-Goals:**

- Controlled mode (`open` prop) — not needed for initial version
- External triggers via `popovertarget` + `id` (YAGNI — can be added later by making `trigger` optional)
- Tooltip / hover-triggered popover (separate component, `popover="hint"`)
- Nested popovers / submenus
- Fallback positioning for browsers without Anchor Positioning
- Custom animations (instant show/hide is acceptable initially)

## Decisions

### 1. Uncontrolled — no React state needed

**Decision:** The Popover is fully uncontrolled. The browser manages open/close state. No `open` prop, no `useState`.

**Why not controlled?** Unlike `<dialog>` which requires `showModal()` (imperative), the Popover API can be toggled with a simple `togglePopover()` call. Adding React state on top would be redundant complexity for the common case. Consumers who need to know the state can use `onToggle`.

### 2. Required `trigger` prop — single way to use the component

**Decision:** `trigger` is required. The popover always renders inside a root `<span>` wrapper with the trigger and content as siblings.

**Why not optional?** Making `trigger` optional would enable a second usage pattern (external buttons via `popovertarget` + `id`) that has different behavior (no auto-close, implicit anchor instead of `anchor-scope`). Two patterns in one component creates confusion. If external triggers are ever needed, `trigger` can be made optional in a backward-compatible change.

### 3. Root `<span>` with `onClick` — auto-close by default

**Decision:** The root `<span>` wrapper has `onClick={() => togglePopover())`. Any click anywhere inside the component — trigger or popover content — bubbles to the root and toggles the popover.

**Why auto-close on content click?** The most common use case for popovers is menus and action lists, where clicking an item should close the popover. Making this the default means zero configuration for the common case.

**Opting out for interactive content:** For inputs, textareas, or forms inside the popover, the consumer calls `e.stopPropagation()` on a container element to prevent the click from reaching the root toggle handler. This is a standard DOM pattern.

### 4. CSS Anchor Positioning with `anchor-scope`

**Decision:** Use static CSS classes for anchor setup. The wrapper element gets `anchor-scope: --trigger`, `anchor-name: --trigger`, and `width: fit-content`. The popover content gets `position-anchor: --trigger`. No unique CSS values or inline styles needed.

Each `anchor-scope` creates an isolated namespace — same `--trigger` name across all instances, zero conflicts. `width: fit-content` ensures the wrapper doesn't stretch in grid/flex layouts, keeping the anchor tightly around the trigger.

### 5. `positionArea` prop maps to CSS `position-area`

**Decision:** A `positionArea` string prop passed as an inline style on the popover content. Accepts any valid `position-area` value (e.g., `"bottom"`, `"bottom span-right"`, `"top"`, `"end"`).

**Default:** `"bottom"` — popover appears below the trigger.

### 6. Header / Footer slots with fixed positioning

**Decision:** Optional `header` and `footer` props rendered in fixed containers with border separators (`border-bottom` / `border-top` using `--reltio-color-border-1`). Footer is right-aligned by default. Body content (`children`) scrolls independently. Uses `:popover-open` pseudo-class for `display: flex` to avoid overriding the browser's `display: none` for closed popovers.

### 7. `onToggle` callback and `data-autofocus`

**Decision:** The native `toggle` event is intercepted internally. On open, the component searches for `[data-autofocus]` and focuses it. Then the event is forwarded to the consumer's `onToggle` callback.

**Why `data-autofocus` instead of React's `autoFocus`?** Same reason as Dialog — React's `autoFocus` calls `.focus()` during mount, not when the popover opens. A `data-autofocus` attribute is always in the DOM and can be found by `querySelector` at the right moment.

### 8. `popover="auto"` hardcoded

**Decision:** Always set `popover="auto"`. Not configurable via props.

**Rationale:** `auto` gives light dismiss (click outside, Esc) and auto-closes other popovers — the expected behavior for dropdowns and menus. `manual` is for persistent overlays (toasts, notifications) which are a different pattern. `hint` is for tooltips — a future separate component.

## Risks / Trade-offs

- **`anchor-scope` is new (Baseline Jan 2026)** → Same support level as Anchor Positioning itself. If one works, both work.
- **Wrapper `<span>` adds a DOM element** → Minimal impact. `display: inline-flex; width: fit-content` makes it transparent for layout. Required for `anchor-scope`.
- **Auto-close default may surprise** → Developers putting forms inside popover must know to use `stopPropagation`. Documented in JSDoc with examples.
- **No controlled mode** → Consumers needing programmatic control use refs directly. Controlled mode can be added later without breaking changes.
- **No fallback positioning** → Browsers without Anchor Positioning get a popover in the top layer but without anchor-relative positioning. Acceptable for our browser support targets.
- **`:popover-open` for flex layout** → Required because setting `display: flex` directly overrides the browser's `display: none` for closed popovers, making them always visible.
