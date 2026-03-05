## Context

The platform has no dialog component. The native HTML `<dialog>` element is now Baseline across all major browsers and provides modal rendering, focus trapping, backdrop, top-layer promotion, and Esc dismiss out of the box. The new `closedby` attribute adds light-dismiss (click outside) support natively. Non-modal overlays (dropdowns, tooltips, popovers) will be handled by separate components using the Popover API.

The component must follow all platform conventions: `HtmlProps`, `classNames()`, CSS Modules, global color tokens, one-variant-per-story.

## Goals / Non-Goals

**Goals:**

- Thin controlled wrapper over native `<dialog>` — delegate as much as possible to the browser
- Always render as a modal dialog via `showModal()` — centered, backdrop, focus trap, inert background
- Provide `header` and `footer` as optional ReactNode props; body via `children`
- Close button in header automatically when `header` is provided
- Light-dismiss behavior (Esc + click outside) for all dialogs via `closedby="any"`
- CSS-only open/close animations with graceful degradation
- Full accessibility via native `<dialog>` semantics (no manual ARIA needed)
- Consumer-controlled focus via `data-autofocus` attribute

**Non-Goals:**

- Non-modal rendering (future: separate Popover/Tooltip components using the Popover API)
- Anchored positioning (future: separate Popover/Tooltip components)
- Dialog stacking / nested modals
- Imperative API (`ref.open()` / `ref.close()`) — controlled only
- `returnValue` / `<form method="dialog">` integration
- Responsive / mobile-specific behavior

## Decisions

### 1. Controlled-only API via `open` + `onClose`

**Decision:** Single controlled mode — `open: boolean` drives visibility, `onClose` callback fires on dismiss.

**Why not uncontrolled?** The native `<dialog>` is inherently imperative (`showModal()` / `close()`). An uncontrolled variant would fight React's declarative model and create subtle sync bugs. A single controlled API keeps the mental model simple.

**Bridge pattern:** A `useEffect` syncs the React `open` prop with the imperative native API:

```
open=true  → el.showModal()
open=false → el.close()
```

Guard against redundant calls: check `el.open` before calling `showModal()`, and check `!el.open` before calling `close()`.

### 2. Always modal — no `modal` prop

**Decision:** The Dialog always opens via `showModal()`. There is no `modal` prop.

**Rationale:** Non-modal overlays (dropdowns, context menus, tooltips, inline editors) have fundamentally different semantics, ARIA roles, and focus behavior. They will be implemented as separate Popover/Tooltip components using the Popover API + CSS Anchor Positioning. Mixing modal and non-modal in one component would leak complexity without clear benefit.

### 3. `closedby="any"` hardcoded

**Decision:** Always set `closedby="any"` on the `<dialog>` element. Not exposed as a prop.

**Rationale:** All dialogs in the product should be dismissable via Esc and click outside. This is a UX consistency decision, not a per-dialog choice.

**Browser support caveat:** `closedby` is not yet supported in Safari. For browsers without support, modal dialogs fall back to `closedby="closerequest"` behavior (Esc works, click outside does not). This is acceptable — click-outside support will arrive with Safari adoption.

### 4. Header / Footer as ReactNode props

**Decision:** `header?: ReactNode` and `footer?: ReactNode` rendered in dedicated styled containers on the lavender dialog background. Body content via `children` in a white rounded card.

**Why props, not compound components?** Simpler API for the common case. Compound components (`Dialog.Header`, `Dialog.Body`, `Dialog.Footer`) add complexity without clear benefit at this stage — the user can always compose freely via `children` alone if the slots don't fit.

**Rendering rules:**

- `header` renders in a flex-row container with default typography (16px, bold) and a close button (×) on the right
- `footer` renders in a flex-row container with `justify-content: flex-end` (right-aligned) and gap between elements
- Body (`children`) renders in a white rounded card with `overflow-y: auto`
- If neither header nor footer is provided, only the body card renders

### 5. Close button in header

**Decision:** When `header` is provided, a close button (× icon) is always rendered in the top-right corner. It calls `onClose` on click and has `aria-label="Close"`.

**Rationale:** Every dialog with a header should have a visible close affordance. This is a UX and accessibility standard. Dialogs without a header (custom body only) don't get a close button — the consumer manages their own UI.

### 6. CSS-only animations

**Decision:** Use `@starting-style` + `allow-discrete` transitions for open/close animation.

```css
dialog          → opacity: 0, scale(0.97)  (closed state)
dialog:open     → opacity: 1, scale(1)     (open state)
@starting-style → opacity: 0, scale(0.97)  (entry start)
```

Backdrop fades from transparent to semi-opaque.

**Graceful degradation:** Browsers that don't support `@starting-style` or `allow-discrete` simply show/hide the dialog instantly. No JS fallback needed.

**Pointer-events fix:** During the close animation, `overlay` transition keeps the dialog in the top layer for the animation duration. `pointer-events: none` on the closed state prevents the invisible dialog from blocking clicks on the page below.

**Instant open on initial mount:** When `open={true}` on first render, the dialog appears instantly (no animation) by temporarily applying a `.instant` class that sets `transition: none`. This prevents a jarring animation when navigating directly to a page with an open dialog.

### 7. Focus management via `data-autofocus`

**Decision:** After `showModal()`, the Dialog searches for an element with `[data-autofocus]` attribute and focuses it. If not found, the browser's default behavior applies.

**Why not React's `autoFocus`?** React's `autoFocus` prop does not set the HTML `autofocus` attribute in the DOM on the client — it calls `.focus()` during mount. Since the dialog is `display: none` at mount time, this call silently fails. Then `showModal()` overrides focus to the first focusable element. A custom `data-autofocus` attribute is always rendered in the DOM and reliably found by `querySelector`.

### 8. Handling the `close` and `cancel` events

**Decision:** Listen to the native `onClose` event on `<dialog>` and call the `onClose` prop. The `onCancel` event is not exposed — it fires before `onClose` on Esc, but since we always allow Esc via `closedby="any"`, there's no need for consumers to intercept it.

If a consumer needs to prevent closing (e.g., unsaved changes), they control it via state — simply don't set `open` to `false` and show a confirmation instead.

### 9. No dialog stacking

**Decision:** No special stacking logic. If a consumer opens dialog B while dialog A is open, they manage state themselves (set A's `open` to `false`, B's `open` to `true`). The browser's top-layer handles z-ordering naturally if both happen to be open simultaneously.

### 10. Storybook docs page without inline stories

**Decision:** The Dialog docs page uses a custom `parameters.docs.page` that omits the `<Stories />` block. Modal dialogs cannot render inline on the docs page — all stories would open simultaneously and overlay each other. A text message directs users to view stories individually via sidebar navigation.

## Risks / Trade-offs

- **`closedby` Safari support** → Acceptable degradation: Esc works everywhere, click-outside will work once Safari ships `closedby`. No polyfill needed.
- **`@starting-style` animation support** → Graceful degradation to instant show/hide. No visual breakage.
- **No imperative API** → Consumers who want `ref.open()` must manage state. This is intentional — controlled components are the React convention.
- **No `returnValue`** → Consumers who need form-in-dialog submission results must handle it via their own state. This keeps the Dialog API simple and avoids coupling with form semantics.
- **`data-autofocus` vs `autoFocus`** → Non-standard attribute, but necessary because React's `autoFocus` doesn't work with `showModal()`. Documented in component JSDoc.
