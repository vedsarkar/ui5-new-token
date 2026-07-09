---
"@reltio/design": minor
---

Add custom menu items and `onItemClick` to `UserMenu`, and endorse `UserMenuItem`.

- New optional `children` prop on `UserMenu` (`ReactNode`); document passing one or more `UserMenuItem` elements after About, before Sign Out
- New optional `onItemClick` prop forwards UI5 `item-click` for custom items; identify the item via `event.detail.item` (e.g. `data-href`)
- New `UserMenuItem` 1:1 re-export from `@reltio/design/components`
- About modal opens only when the built-in About item is clicked; consumer `onItemClick` is not called for About
