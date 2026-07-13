# UserMenuItem

`UserMenuItem` is a menu entry inside a `UserMenu` popover.

`UserMenuItem` is re-exported 1:1 from `@ui5/webcomponents-react/UserMenuItem`; its props, slots, and behavior are exactly the UI5 component's. The Reltio layer adds curation (the endorsed surface), pinned versioning, and documentation.

### Usage

Pass one or more `UserMenuItem` elements as `children` of `UserMenu` for product-specific actions (Settings, Help, and similar). The built-in About item and Sign Out footer remain owned by `UserMenu`. `UserMenuItemGroup` and nested sub-menu trees are not part of the supported children contract for this version.

Handle activation with `UserMenu`'s `onItemClick`. Put identifying metadata on the item via `data-*` attributes and read them from `event.detail.item`.

### See also

- [UI5 React documentation](https://ui5.github.io/webcomponents-react/v2/?path=/docs/modals-popovers-usermenu--docs)
- `UserMenu` — the parent component
