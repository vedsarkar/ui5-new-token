---
"@reltio/design": minor
---

Endorse the UI5 `SideNavigation` family and add a `sideNavigation` slot on `ShellBar` (DESIGN-78). Application navigation is now built directly from the SAP Fiori side navigation primitives instead of bespoke Reltio wrappers.

**`SideNavigation` family** — thin Reltio wrappers over the SAP Fiori side-navigation parts, each with a deliberately narrowed API. Deep-customization UI5 props are intentionally hidden across the family and will be re-exposed as dedicated Reltio props on demand.

- **`SideNavigation`** — public props: `accessibleName`, `children`, `collapsable`, and standard element attributes (`className`, `style`, `id`, `data-*`, `aria-*`, …). Hidden: `header`, `fixedItems`, `onSelectionChange`, `onItemClick`, …. When `collapsable` is set, the component renders a collapse/expand toggle at the bottom and owns its collapsed state internally.
- **`SideNavigationGroup`** — public props: `text`, `expanded`, `children`, `className`, `style`.
- **`SideNavigationItem`** — public props: `text`, `icon`, `href`, `target`, `selected`, `disabled`, `expanded`, `design`, `unselectable`, `tooltip`, `children`, `className`, `style`. Hidden: `accessibilityAttributes` and the low-level UI5 `onClick` custom-event handler.
- **`SideNavigationSubItem`** — public props: `text`, `href`, `target`, `selected`, `disabled`, `design`, `unselectable`, `tooltip`, `className`, `style`. The UI5 `icon` prop is intentionally omitted to enforce the SAP guideline that second-level items do not carry icons.

Build the menu from `SideNavigationItem` (with `text`, `icon`, `href`, `selected`, `disabled`, `design`, `unselectable`), nest `SideNavigationSubItem` for second-level entries, group entries with `SideNavigationGroup`, and set `collapsable` on `SideNavigation` to add a self-managed collapse/expand toggle for the icon-only rail.

**`ShellBar`** — gains a `sideNavigation?: ReactElement` slot prop that hosts a `<SideNavigation>` element. When supplied, `ShellBar` renders it as a fully encapsulated left drawer: a full-height panel that slides in from the left over a dimming backdrop covering the viewport. `ShellBar` automatically renders the hamburger toggle, owns the open/closed state, and wires the handlers (hamburger click, backdrop click, and `Escape` all toggle the drawer) — the UI5 `startButton` slot is no longer part of the `ShellBar` public API and the drawer behavior is not customizable. When the hamburger is present, `ShellBar` also tightens its inline gutter from UI5's default `2rem` to `0.875rem 1rem` so the trigger sits snug at the edge.
