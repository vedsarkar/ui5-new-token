## Why

The platform lacks a dialog component. Teams resort to custom modal implementations with inconsistent accessibility, focus management, and dismiss behavior. The native HTML `<dialog>` element now has full cross-browser support and provides modal/non-modal rendering, automatic focus trapping, backdrop, top-layer promotion, and keyboard dismiss — all built into the browser. A thin controlled React wrapper will give teams a consistent, accessible dialog with minimal code.

## What Changes

- New `Dialog` component built on the native `<dialog>` element
- Always renders as a modal dialog (`showModal()`) — centered, with backdrop and focus trap
- Fully controlled API: `open` + `onClose` (React-idiomatic state management)
- Optional `header` and `footer` render props; body content via `children`
- Uses the native `closedby="any"` attribute so every dialog is dismissable via Esc and click outside
- CSS-only open/close animations with graceful degradation (no animation when unsupported)
- Follows all platform standards: `HtmlProps<"dialog">`, `classNames()`, CSS Modules, global color tokens

## Capabilities

### New Capabilities

- `dialog-component`: Controlled React wrapper over the native `<dialog>` element rendering always as a modal dialog, with header/footer slots, CSS animations, and light-dismiss behavior

### Modified Capabilities

_(none)_

## Impact

- **New files:** `components/Dialog/` (component, types, styles, stories, index)
- **Dependencies:** None (uses only native browser APIs)
- **APIs:** New public export `Dialog` and `DialogProps`
- **Existing code:** No changes to existing components
