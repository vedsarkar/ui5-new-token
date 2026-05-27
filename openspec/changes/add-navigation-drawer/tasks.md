## 1. Scaffold NavigationDrawer component

- [ ] 1.1 Create `components/NavigationDrawer/` with the canonical Reltio component layout: `NavigationDrawer.tsx`, `NavigationDrawer.types.ts`, `NavigationDrawer.module.css`, `NavigationDrawer.stories.tsx`, `README.md`, `index.ts`.
- [ ] 1.2 Add the side-effect icon import `@ui5/webcomponents-icons/dist/menu2.js` to the implementation file.

## 2. Types

- [ ] 2.1 In `NavigationDrawer.types.ts`, declare `NavigationDrawerItem = { label: string; href: string; icon?: string; group?: string }` with per-field JSDoc.
- [ ] 2.2 Declare `NavigationDrawerProps` using `HtmlProps<"aside", …>` (or the closest equivalent root tag) — fields: `items`, `open`, `onOpenChange`, `activeHref?`, `onItemClick?`. Per-field JSDoc on every prop.

## 3. Implementation

- [ ] 3.1 Render a `<Button slot="startButton" icon="menu2" accessibleName="Open navigation" />` as the trigger; the click handler calls `onOpenChange(true)` and stores a ref for focus return.
- [ ] 3.2 When `open === true`, render the backdrop `<div>` with click-to-close, and the panel `<aside role="dialog" aria-modal="true">` containing a UI5 `SideNavigation` filled with grouped items.
- [ ] 3.3 Group items by their `group` field in input order; items without `group` form an implicit leading section with no header.
- [ ] 3.4 When `activeHref` matches an item's `href` (string equality), mark that item as selected in `SideNavigation`.
- [ ] 3.5 Wire item click: invoke `onItemClick?.(item, event)` first, then `onOpenChange(false)` regardless of `event.preventDefault()`.
- [ ] 3.6 Add ESC-to-close keyboard handling on the panel.
- [ ] 3.7 Add focus management: move focus into the panel on open, return focus to the trigger on close. Use a focus trap (UI5 Dialog primitives or `focus-trap-react` — verify during implementation).

## 4. Styles

- [ ] 4.1 In `NavigationDrawer.module.css`, style the backdrop (`position: fixed; inset: 0;`, dim background via `--sapContent_*` or a transparent overlay token), the panel (`position: fixed; left: 0; top: 0; height: 100vh; width: <fixed width per design>;`), and the panel background using `--sap*` tokens only — no hex values.
- [ ] 4.2 Use the appropriate `--sapZIndex_*` token for the backdrop and panel z-index so the drawer layers correctly with Popovers and Dialogs.
- [ ] 4.3 No `@media` queries — desktop-only per the platform CSS policy.

## 5. ShellBar integration

- [ ] 5.1 Add `navigationDrawer?: ReactElement` to `ShellBarProps` in `components/ShellBar/ShellBar.types.ts` with JSDoc pointing to `<NavigationDrawer>` as the canonical fill.
- [ ] 5.2 In `components/ShellBar/ShellBar.tsx`, render the `navigationDrawer` slot element next to the host so the trigger button's `slot="startButton"` attribute is read by UI5's slot routing.
- [ ] 5.3 If passing both `navigationDrawer` and an explicit `startButton`, document (in README and JSDoc) that `startButton` wins — the wrapper does NOT attempt to merge.

## 6. Stories

- [ ] 6.1 Write `NavigationDrawer.stories.tsx`: closed (default), open with full grouped items, open with active item, open with empty items list (graceful empty state), dark theme decorator story. Use `fn()` from `storybook/test` for `onOpenChange` and `onItemClick`.
- [ ] 6.2 Add a `WithNavigationDrawer` story to `components/ShellBar/ShellBar.stories.tsx` showing the slot integration.

## 7. Documentation

- [ ] 7.1 Write `components/NavigationDrawer/README.md` (H1, intro, sections for controlled state, grouping, active highlighting, accessibility, SAP Fiori references — follow the AppSelector README structure).
- [ ] 7.2 Update `components/ShellBar/README.md` with a new `### Navigation drawer slot` section.
- [ ] 7.3 Add `export * from "./NavigationDrawer"` to `components/index.ts`.

## 8. Build and verify

- [ ] 8.1 Run `npm run build-component-docs` to regenerate `NavigationDrawer.story.mdx` + `NavigationDrawer.schema.json` and refresh `ShellBar.story.mdx` + `ShellBar.schema.json`.
- [ ] 8.2 Run `npm run format && npm run lint` — both must pass with no errors.
- [ ] 8.3 Visually verify in Storybook (`npm run dev`): the drawer opens, closes via backdrop/ESC/item-click, items render in the right groups, active highlighting works, focus moves correctly.
- [ ] 8.4 Smoke-test the slot routing: when `<NavigationDrawer>` is passed via `ShellBar.navigationDrawer`, the trigger button mounts in the hamburger position. If UI5's slot routing does NOT survive the Fragment indirection, fall back to `React.Children.toArray` + per-child `slot=` injection inside `ShellBar`.

## 9. Release

- [ ] 9.1 Add a changeset under `.changeset/` (minor bump of `@reltio/design`) noting the new `NavigationDrawer` component and the `navigationDrawer` slot prop on `ShellBar`.
