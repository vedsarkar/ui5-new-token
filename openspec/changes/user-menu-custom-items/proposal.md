## Why

Reltio applications need product-specific profile-menu actions (Settings, Help, and similar) in the Shell Bar user menu. `UserMenu` previously hard-coded About and Sign Out only. Custom items also need a canonical click path — UI5 exposes that as the parent `UserMenu` `item-click` event (`onItemClick`), not as a first-class per-item action API in the pinned UI5 version.

## What Changes

- Optional `children` on `UserMenu` typed as `ReactNode`. Documented contract: pass one or more `UserMenuItem` elements (rendered after built-in About and before Sign Out). Not validated at runtime.
- Optional `onItemClick` on Reltio `UserMenu`: forwards UI5 `item-click` for custom items only. Consumers identify the item via `event.detail.item` (e.g. `data-*` / `data-href`). About does not invoke consumer `onItemClick`.
- Endorse `UserMenuItem` as a 1:1 re-export from `@reltio/design/components`, with `UserMenuItemProps` in `components/UserMenuItem/` (doc-only peer pattern — no `index.ts`).
- Docs + Storybook + minor changeset.

Backward compatible when `children` / `onItemClick` are omitted. `UserMenuItemGroup` stays out of the supported children contract. `UserMenu` does not interpret consumer `data-*` or navigate.

## Capabilities

### New Capabilities

_None — extends existing `user-menu`._

### Modified Capabilities

- `user-menu`: optional `children` + `onItemClick`; `UserMenuItem` endorsement; About click scoped to the built-in item.

## Impact

- `components/UserMenu/` — implementation, types, README, stories, generated docs.
- `components/UserMenuItem/` — doc-only endorsement (`types`, README, stories, generated schema/MDX).
- `components/index.ts` — `UserMenuItem` value re-export.
- `components/UserMenuItemGroup/UserMenuItemGroup.stories.tsx` — companion import stays UI5 (in-repo author convention).
- `.changeset/user-menu-custom-items.md` — minor bump of `@reltio/design`.
