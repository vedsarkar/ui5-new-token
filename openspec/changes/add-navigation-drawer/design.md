## Context

UI5 `@ui5/webcomponents-react/SideNavigation` provides the inner content rendering (item list with icons, groups, selected state, keyboard nav) but ships in two layout modes:

- **Standalone rail** — always-visible left column, takes layout space, fixed width.
- **Inside a `NavigationLayout`** — UI5's own header+side+content shell that manages collapsing.

Neither matches the Reltio requirement: an **overlay drawer** that opens above the page content on demand and closes after a click. We need a thin Reltio wrapper that:

1. Hosts `SideNavigation` for the item rendering.
2. Adds an overlay/backdrop layer with the open/close lifecycle.
3. Exposes a trigger button that lives in the `ShellBar` `startButton` slot.

This is one of six `ShellBar`-related changes. The other five (`add-shellbar-notifications-href`, `add-shellbar-app-selector-slot`, `add-tenant-selector`, `add-customer-selector`, `add-user-menu`) follow the same slot-prop-on-ShellBar pattern.

## Goals / Non-Goals

**Goals:**

- A single self-contained Reltio component that bundles trigger + overlay panel + open-state plumbing.
- Controlled component — apps own the `open` state (consistent with the controlled-everywhere decision made during exploration).
- Items are a flat array with optional `group`; the component renders group dividers automatically.
- Active-item highlighting via `activeHref`-vs-item-href string comparison; works with any router (no router dependency).
- Overlay UX: backdrop, ESC closes, click-outside closes, click-an-item closes, focus trap, focus restoration.

**Non-Goals:**

- Router integration. We render plain `<a href>` links; consumers wire SPA routing via `onItemClick + event.preventDefault()`.
- Persistent rail mode (always-visible left column). Decided in exploration: this component is overlay-only. If a persistent rail is needed in the future, it would be a separate `NavigationLayout` business component.
- Nested item hierarchies (sub-items, expandable groups). The screenshot shows a single level of items grouped by category — that is all we ship in v1.
- Customizable backdrop styling or animation curve. Both come from `--sap*` tokens / fixed values; consumers cannot override.
- Persisting `open` state across reloads. The consumer owns persistence if needed.

## Decisions

### Decision 1 — Self-contained component vs split Provider/Trigger/Drawer

Both options were explored. We chose **self-contained**: one `<NavigationDrawer>` component renders BOTH the trigger button AND the overlay panel, with the consumer passing the whole element to `ShellBar`'s `navigationDrawer` slot:

```tsx
<ShellBar
  navigationDrawer={
    <NavigationDrawer
      items={navItems}
      open={navOpen}
      onOpenChange={setNavOpen}
      activeHref={pathname}
    />
  }
/>
```

**Why:** the user explicitly rejected provider-based compound APIs ("я ожидаю простое и минималистичное апи: передал нужный компонент в children/props - и всё работает"). The slot-prop convention matches UI5's own pattern (`profile={<Avatar />}`).

**Alternative considered:** `NavigationDrawer.Provider` + `NavigationDrawer.Trigger` + `NavigationDrawer.Drawer`. Rejected — adds DOM-tree-discovery complexity (trigger needs to know about drawer state through context), introduces a provider wrapper around the whole AppShell, and is inconsistent with the slot-prop direction of the other five sibling changes.

### Decision 2 — Trigger lives in ShellBar startButton slot

`NavigationDrawer` internally renders a `<Button icon="menu2">` with the `slot="startButton"` attribute. When `ShellBar` consumes `navigationDrawer`, it passes the element through; UI5's slot routing reads the `slot` attribute on the Button child and mounts it in the canonical hamburger position. The overlay panel renders as a sibling React element (no DOM portal needed — UI5 ShellBar is in the light DOM and the panel uses `position: fixed`).

```tsx
// inside NavigationDrawer.tsx
return (
  <>
    <Button
      slot="startButton"
      icon="menu2"
      accessibleName="Open navigation"
      onClick={() => onOpenChange(true)}
      ref={triggerRef}
    />
    {open && (
      <div className={styles.backdrop} onClick={() => onOpenChange(false)}>
        <FocusTrap>
          <aside className={styles.panel} role="dialog" aria-modal="true">
            <SideNavigation>
              {…items grouped and rendered…}
            </SideNavigation>
          </aside>
        </FocusTrap>
      </div>
    )}
  </>
);
```

The `<>` Fragment lets both children flow through React; the slot attribute on the Button is what UI5 reads.

**Risk** (covered in Risks below): UI5's slot-routing behavior on Fragment children may need verification — fall back to `Children.toArray + slot=` per child if Fragment doesn't survive UI5's cloning.

### Decision 3 — Controlled state, no `defaultOpen`, no internal state

`open` is required. `onOpenChange` is required. There is no `defaultOpen` or uncontrolled mode. This matches the project-wide decision (made during exploration) that all new Reltio sub-components are fully controlled and never hold hidden state.

**Why:** consistency across the six new sub-components. The router-derived `activeHref` and the persistence-derived `open` both belong in app state, not component state.

### Decision 4 — Flat items array with optional `group` field

```ts
type NavigationDrawerItem = {
  label: string;
  href: string;
  icon?: string;       // UI5 icon name
  group?: string;      // group label, e.g. "Configuration"
};
```

The component groups items by `group` while preserving the input order within each group. Items without `group` form an implicit first group with no header. Groups are rendered in the order they first appear in the input array.

**Why:** matches the Reltio Console screenshot (items partitioned into CONFIGURATION / TENANT MANAGEMENT / SECURITY). A nested `{ group, items[] }[]` structure was considered but rejected — flat arrays are easier to compose dynamically (e.g. filtering by user role), and grouping is a presentation concern that the component owns.

### Decision 5 — `activeHref` via string equality

Active-item resolution: `item.href === activeHref` (exact match, no path-prefix matching). The consumer is expected to pass the canonical href value, typically `location.pathname` or a router-derived selected key.

**Why:** zero ambiguity. Path-prefix matching would tie us to a routing convention; consumers that need it can compute the resolved key themselves before passing it as `activeHref`.

### Decision 6 — Close on item click, before navigation

When the consumer clicks an item:

1. `onItemClick(item, event)` fires (if provided).
2. The consumer may call `event.preventDefault()` to suppress the default `<a href>` navigation and use SPA routing instead.
3. The drawer ALWAYS calls `onOpenChange(false)` after the item click, regardless of `event.preventDefault()`. The close happens synchronously inside the click handler.

**Why:** matches the user's explicit choice during exploration ("Close on item click"). The close-always behavior is intentional — even when SPA routing is used, the act of navigating implies the drawer's job is done.

### Decision 7 — Focus management

When `open` transitions `false → true`:

- Focus moves to the first focusable element in the panel (the first nav item, typically).
- A `FocusTrap` keeps `Tab`/`Shift+Tab` cycling inside the panel.

When `open` transitions `true → false`:

- Focus returns to the trigger button (`triggerRef.current?.focus()`).

We do NOT implement our own focus-trap from scratch — we rely on UI5's `<Dialog>` semantics OR pull in a small primitive (`focus-trap-react` if needed). Final choice is made during implementation; if UI5's dialog primitives are usable directly we prefer that.

**Open Question** — see below.

## Risks / Trade-offs

- [Risk] UI5 React's slot-attribute routing may NOT survive a React Fragment containing a `<Button slot="startButton">` + a sibling `<div>` when the whole Fragment is passed via a slot prop on ShellBar. → Mitigation: smoke-test during implementation. If broken, fall back to `React.Children.toArray + slot=` per child, OR use `cloneElement` inside `ShellBar` to relabel slots. Document the constraint either way.
- [Risk] Two `NavigationDrawer` instances mounted at once (e.g. a debug story and a normal one) would create competing focus traps. → Mitigation: the component is conceptually a singleton in an app; the README documents that. We do not add runtime detection because that adds complexity for a non-issue in production code.
- [Risk] The overlay backdrop may collide with the page's existing `Dialog`/`Popover` z-index. → Mitigation: use UI5's `--sapZIndex_Drawer` token (or the closest equivalent) so the value tracks UI5's own layering. Document the chosen z-index in the README.
- [Trade-off] We do not ship a `defaultOpen` or uncontrolled mode. → Acceptable: project-wide policy is controlled-everywhere. Consumers that want "open once on mount" wrap with their own `useState(true)`.
- [Trade-off] No nested items in v1. → Acceptable: the canonical Reltio Console layout has none. Adding nesting later is additive.

## Migration Plan

None — purely additive. New component, new slot prop. Existing apps continue to work. Follow-up cleanup PRs (in each app repo) can switch from their local SideNavigation rolls to `<NavigationDrawer>` once the component ships.

## Open Questions

- Whether to depend on `focus-trap-react` (small, well-maintained) or to implement focus-trap inline with `tabindex` management. Resolved during implementation; not a spec-level concern.
- Whether `SideNavigation` exposes a clean React API for "render this group divider as a labeled separator" or whether we render groups using plain `<ul>`+`<li>` directly. Verified during implementation against the installed UI5 version.
- Whether to expose the trigger button's `accessibleName` as a prop (currently hard-coded to "Open navigation"). Probably yes — leave it as a follow-up minor bump if i18n needs arise.
