## 1. Endorse UserMenuItem

- [x] 1.1 Create `components/UserMenuItem/UserMenuItem.types.ts` with `UserMenuItemProps` (`ComponentPropsWithoutRef<typeof UserMenuItem>` only — no `UserMenuItemElement`).
- [x] 1.2 Create `components/UserMenuItem/README.md` (1:1 re-export pattern) documenting `UserMenu` `children` + `onItemClick` / `data-*` usage.
- [x] 1.3 Create `components/UserMenuItem/UserMenuItem.stories.tsx` (`tags: ["doc-only"]`, minimal demo).
- [x] 1.4 Do **not** add `components/UserMenuItem/index.ts` (match Button / UserMenuItemGroup doc-only peers).
- [x] 1.5 Add `export { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem"` to `components/index.ts`.
- [x] 1.6 Keep `UserMenuItemGroup.stories.tsx` importing `UserMenuItem` from `@ui5/webcomponents-react/UserMenuItem` (in-repo author convention).
- [x] 1.7 Run `npm run build-component-docs` for generated `UserMenuItem.story.mdx` + `UserMenuItem.schema.json`.

## 2. UserMenu types

- [x] 2.1 Type `children` as `ReactNode` (not `UserMenuItemElement | UserMenuItemElement[]`).
- [x] 2.2 JSDoc on `children`: pass one or more `UserMenuItem` elements; not validated at runtime; flat items only; groups/nested out of scope.
- [x] 2.3 Add optional `onItemClick` as `ComponentPropsWithoutRef<typeof UserMenu>["onItemClick"]` (UI5 `UserMenu`).
- [x] 2.4 JSDoc on `onItemClick`: custom items only; use `event.detail.item` (e.g. `data-href`); not called for About.

## 3. UserMenu implementation

- [x] 3.1 Destructure `children` and `onItemClick` in `UserMenu.tsx`.
- [x] 3.2 Mark built-in About with reserved `data-reltio-user-menu="about"` (no ref).
- [x] 3.3 Render `{children}` after the built-in About item.
- [x] 3.4 Handler: always `setOpen(false)`; if About marker → `setAboutOpen(true)` and return; else `onItemClick?.(event)`.

## 4. Documentation and Storybook

- [x] 4.1 Update `UserMenu` README: `children`, `onItemClick`, `data-*` identification, reserved About marker, locked About / Sign Out.
- [x] 4.2 `WithCustomMenuItems` story: `data-href` items + `onItemClick: fn()`; import `UserMenuItem` from `@ui5/webcomponents-react/UserMenuItem`.
- [x] 4.3 Regenerate `UserMenu.story.mdx` and `UserMenu.schema.json`.

## 5. Quality and release

- [x] 5.1 Format/lint touched files.
- [x] 5.2 Minor changeset: `children`, `onItemClick`, `UserMenuItem` endorsement, About isolation.
