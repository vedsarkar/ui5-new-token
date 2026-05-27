## Why

Most Reltio applications need a left-side navigation surface that opens by clicking the hamburger button in the header. The Reltio Console screenshot used during exploration shows the canonical pattern: grouped link items (CONFIGURATION, TENANT MANAGEMENT, SECURITY), each with an icon, label, and route, and a visual "active" marker for the current location. Today every consuming app rolls its own version on top of UI5 `SideNavigation` + a custom open/close state holder, and the visual rhythm drifts between apps (spacing, group dividers, focus styles, escape-to-close behavior).

This proposal ships a single endorsed Reltio `NavigationDrawer` business component that wraps `@ui5/webcomponents-react/SideNavigation` plus the overlay/backdrop/focus-trap concerns, and surfaces it as a typed slot on `ShellBar`.

## What Changes

- Add a new `NavigationDrawer` Reltio business component under `components/NavigationDrawer/`. The component is a self-contained overlay-style drawer that includes its own hamburger trigger button (rendered into the host slot) AND the overlay panel (rendered as a sibling to the host). Both surfaces use the controlled `open` / `onOpenChange` props — the consumer owns the state.
- API:
  - `items: NavigationDrawerItem[]` — flat array of `{ label, icon?, href, group? }` entries. The component groups items by `item.group` for visual section separation; items with no `group` go into a default group rendered first.
  - `open: boolean` — controlled open state (no default; no internal state).
  - `onOpenChange: (open: boolean) => void` — fired when the drawer wants to open/close (trigger click, backdrop click, ESC key, item click).
  - `activeHref?: string` — when set, the item whose `href` matches is rendered as visually selected.
  - `onItemClick?: (item: NavigationDrawerItem, event: MouseEvent) => void` — fires before navigation. Consumers can call `event.preventDefault()` to swap default `<a href>` navigation for an SPA router push. The drawer always calls `onOpenChange(false)` after an item click, even if `event.preventDefault()` is called.
- Behavior:
  - Overlay-style: when `open=true`, the drawer panel slides in from the left, covering the page content; a backdrop dims the rest of the page.
  - ESC closes the drawer (`onOpenChange(false)`).
  - Click outside the panel (backdrop) closes the drawer.
  - Clicking a navigation item triggers `onItemClick` (if provided) AND closes the drawer.
  - Focus is trapped inside the panel while open. Closing the drawer returns focus to the trigger button.
- Add a corresponding `navigationDrawer?: ReactElement` slot prop to `ShellBar`. When supplied, `ShellBar` renders the slot element next to the host so the trigger button anchors to the `startButton` UI5 slot and the panel renders as a sibling.
- Export the new component and its types from `@reltio/design/components`.

## Capabilities

### New Capabilities

- `navigation-drawer`: Reltio overlay navigation drawer with grouped link items, controlled open state, active-item highlighting, and close-on-item-click behavior.

### Modified Capabilities

- `shell-bar-component`: gains a `navigationDrawer?: ReactElement` slot prop that hosts the new component in the canonical header position.

## Impact

- New directory `components/NavigationDrawer/` with the canonical 6-file Reltio component layout (`.tsx`, `.types.ts`, `.module.css`, `.stories.tsx`, `README.md`, `index.ts`).
- `components/ShellBar/ShellBar.types.ts` — add `navigationDrawer?: ReactElement`.
- `components/ShellBar/ShellBar.tsx` — pipe the slot element through.
- `components/ShellBar/README.md` — document the slot.
- `components/index.ts` — re-export `NavigationDrawer` and its types.
- `packages/design/components.ts` — implicit via `export * from "@/components"`.
- One changeset entry — **minor** bump of `@reltio/design` (additive component + additive slot prop).
