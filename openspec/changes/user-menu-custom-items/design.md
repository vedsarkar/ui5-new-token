## Context

`UserMenu` bundles the Shell Bar profile avatar, UI5 `UserMenu` popover, and About modal. Custom items are accepted as `children`. Click actions follow UI5: the parent fires `item-click` with `detail.item` (the activated `ui5-user-menu-item` host). Per-item `onClick` is not the recommended public action API for this version.

## Goals / Non-Goals

**Goals:**

- Optional `children` (`ReactNode`) for one or more `UserMenuItem` elements; docs constrain the supported shape.
- Optional `onItemClick` on Reltio `UserMenu` that forwards UI5's event for custom items.
- Render order: built-in About → `{children}` → Sign Out footer.
- About modal only for the built-in About item (reserved `data-reltio-user-menu="about"` on the host).
- Endorse `UserMenuItem` (value + `UserMenuItemProps`).
- Document `data-*` on items (story/demo uses `data-href`) as the way to identify actions in `onItemClick`.

**Non-Goals:**

- `UserMenuItemGroup` in the supported children contract.
- Nested sub-menu trees as a supported children contract.
- Custom About content, legal links, or Sign Out behavior.
- Runtime validation of `children` or `data-*`.
- Per-item `onClick` as the recommended public action API.
- A compile-time-only `UserMenuItemElement` contract (over-promises vs React children).

## Decisions

### Decision 1 — `children` as `ReactNode` with documented contract

`UserMenu.types.ts` declares:

```ts
children?: ReactNode;
```

JSDoc: *"Additional popover menu items. Pass one or more `UserMenuItem` elements (after About, before Sign Out). Not validated at runtime — supported contract is flat `UserMenuItem`s only; `UserMenuItemGroup` and nested sub-menus are out of scope."*

Do **not** use a `ReactElement`-only / `UserMenuItemElement` type — it looks stricter than React or runtime can enforce (fragments, conditionals, `map`).

### Decision 2 — Render order

```tsx
<Ui5UserMenu …>
  <UserMenuItem text="About" icon="hint" data-reltio-user-menu="about" />
  {children}
</Ui5UserMenu>
```

Sign Out remains UI5's built-in footer (`onSignOutClick`).

### Decision 3 — Click handling: attribute discrimination + consumer forward

```ts
onItemClick={(event) => {
  setOpen(false);
  if (event.detail.item.getAttribute("data-reltio-user-menu") === "about") {
    setAboutOpen(true);
    return;
  }
  onItemClick?.(event);
}}
```

Same identification model as consumers (`data-*` on the host). `data-reltio-user-menu` is **reserved** for the built-in About item — consumers must not reuse it.

Consumers read their own metadata from the host:

```tsx
onItemClick={(e) => {
  const href = e.detail.item.getAttribute("data-href");
  if (href) navigate(href);
}}
```

`data-*` attributes land on the UI5 React host via `HTMLAttributes` / `CommonProps`.

**Rejected:** ref identity on About; recommended public per-item `onClick`; auto-navigation inside `UserMenu`.

### Decision 4 — `onItemClick` typing

```ts
onItemClick?: Ui5UserMenuProps["onItemClick"];
```

where `Ui5UserMenuProps = ComponentPropsWithoutRef<typeof UserMenu>` from `@ui5/webcomponents-react/UserMenu`. JSDoc: fired for custom (non-About) items; use `event.detail.item` (e.g. `data-href`); not called for About.

### Decision 5 — `UserMenuItem` endorsement (doc-only, 1:1)

Match Button / `UserMenuItemGroup`:

- `UserMenuItem.types.ts` — `UserMenuItemProps` only (`ComponentPropsWithoutRef<typeof UserMenuItem>`)
- No `index.ts` (doc-only peers do not ship one)
- `README.md`, `UserMenuItem.stories.tsx` (`tags: ["doc-only"]`)
- `components/index.ts` — `export { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem"`
- Generated `UserMenuItem.schema.json` / `.story.mdx` via `build-component-docs`

### Decision 6 — Documentation and Storybook

- README: `children`, `onItemClick`, `data-*` identification, reserved About marker, locked About / Sign Out.
- `WithCustomMenuItems`: Settings + Help with `data-href`, `onItemClick: fn()`; icons via `icon` props; in-repo story imports `UserMenuItem` from `@ui5/webcomponents-react/UserMenuItem`.
- Consumer-facing README / generated MDX import path: `@reltio/design/components`.

## Risks / Trade-offs

- [Risk] Consumer reuses `data-reltio-user-menu` → Mitigation: README / JSDoc reserved; documented as internal.
- [Trade-off] Convention-only consumer `data-*` → Accepted.
- [Trade-off] No `UserMenuItemGroup` in supported children → Accepted.
- [Trade-off] `ReactNode` does not enforce Item-only at compile time → Accepted; docs + JSDoc own the contract.

## Migration Plan

Purely additive. Existing usages need no changes.

## Open Questions

_None._
