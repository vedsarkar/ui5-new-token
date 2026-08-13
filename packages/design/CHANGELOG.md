# @reltio/design

## 2.0.0

### Major Changes

- e79b21a: **`<ShellBar>`**: added native product-switch integration driven by the new `apps` / `env` / `tenant` props; several existing composition props now route into UI5's protected native slots instead of the default children cluster.

  **Behaviour changes (visual regressions for consumers who rely on the previous DOM shape)**

  - `<ShellBar>` now maps `userMenu` onto UI5's native `profile` slot (protected, never in overflow) instead of rendering `<UserMenu>` as a default-children slot child. The avatar moves to the far-right actions cluster; UI5 wraps profile-slot content in its own `<Button data-profile-btn>` with a built-in click handler, so `<ShellBar>` also clones the supplied `<UserMenu>` into controlled mode (see below) — the inner avatar becomes a static picture, keyboard/pointer activation flows through UI5's wrapping button, and popover open/close is owned by `<ShellBar>`.
  - `<ShellBar>` now maps `notificationsUrl` onto UI5's native notifications button (`showNotifications` + `notifications-click`) instead of a custom `<Button>` in the default children cluster.
  - `<AppSelector>`'s trigger changed from a UI5 `<Button>` to a `<ShellBarItem>`. That is the shape UI5 expects in its `DefaultSlot<ShellBarItem>` and the correct home for `AppSelector` when routed through `<ShellBar>`. Consequences per UI5's `ShellBarItem` template: the item is icon-only in the main bar, and the `label` prop now surfaces as the button's accessible name, its hover tooltip, and its label inside the "…" overflow menu — it is no longer rendered as visible text next to the icon. The `AppSelectorProps` type explicitly `Omit`s `icon` / `text` / `id` / `onClick` (previously the wrapper silently overwrote them).

  Consumers do not need to touch call-sites, but any screenshot / DOM-snapshot / precise-selector tests will need to be re-baselined.

  **Additions**

  - New `apps` / `env` / `tenant` props on `<ShellBar>` enable UI5's native product-switch button (grid icon) in the right actions cluster and mount the app-catalog popover anchored to it. The button is protected — UI5 never places it into the overflow group — so the app switcher stays reachable at any viewport width.
  - `<UserMenu>`: added controlled-mode props `open?: boolean` and `onOpenChange?: (open: boolean) => void`. When `open` is provided, the trigger avatar renders as a non-interactive picture and popover open/close is driven by the consumer through `onOpenChange`. Omitting the props keeps the current uncontrolled behavior (interactive avatar, internal state). No changes required for standalone consumers.
  - `<SideNavigation>`: added `defaultCollapsed?: boolean` prop. When paired with `collapsable`, the menu starts collapsed on mount and the built-in toggle owns the state from that point on. Ignored when `collapsable` is `false`.

  **Deprecated**

  - `appSelector` prop on `<ShellBar>`. It is redundant — the same "grid icon in the actions cluster" affordance can be produced either by passing a `<ShellBarItem>` directly as a child of `<ShellBar>` (as the app-template `AppShell` already does), or by using the new `apps` / `env` / `tenant` props for a fully managed product-switch button + app-catalog popover. The legacy path keeps working for backwards compatibility and is scheduled for removal in a future major.

  **RP-194777 (overflow-loop bug) — scope of the fix**: the fix reaches consumers only on the new API path. To preserve the current visual order (avatar to the left of the app selector), the deprecated `appSelector` branch keeps `<UserMenu>` in UI5's default children slot next to the app selector. UI5's default slot is typed `DefaultSlot<ShellBarItem>` and its overflow algorithm targets each child via a `data-ui5-stable` selector; `<ui5-avatar>` is not a `ShellBarItem` and does not carry `stableDomRef`, so the overflow loop still fires on that path at narrow viewports. Consumers on `appSelector` need to migrate to `apps` / `env` / `tenant` to receive the fix — the new path routes `userMenu` into UI5's protected `profile` slot and leaves the default children slot free of non-`ShellBarItem` elements.

  **Migration**

  ```tsx
  // Before
  <ShellBar
    appSelector={<AppSelector apps={apps} env={env} tenant={tenant} />}
    userMenu={<UserMenu ... />}
    notificationsUrl="https://…/notifications"
  />

  // After
  <ShellBar
    apps={apps}
    env={env}
    tenant={tenant}
    userMenu={<UserMenu ... />}
    notificationsUrl="https://…/notifications"
  />
  ```

  Standalone `<AppSelector>` (with its own trigger + popover) remains available. Its trigger is now a `<ShellBarItem>` instead of a `<Button>` — see the behaviour-change bullet above for what changes visually.

  **Wrapping `<UserMenu>`**: `<ShellBar>` clones the supplied `userMenu` element with `open` and `onOpenChange` props in the profile-slot path so the inner avatar can render non-interactive. If you pass a wrapper (e.g. `<AppUserMenu ...>`) instead of `<UserMenu>` directly, that wrapper **must accept and forward `open` and `onOpenChange` down to the underlying `<UserMenu>`** — otherwise `<UserMenu>` stays uncontrolled, the avatar keeps `mode="Interactive"`, and it ends up nested inside UI5's `<Button data-profile-btn>` (dual focus, two accessible names, dead keyboard). The prop type surfaces the requirement (`ReactElement<Pick<UserMenuProps, "open" | "onOpenChange">>`), but TypeScript's `React.JSX.Element` is `ReactElement<any, any>`, so the compile-time check is documentation-in-hover rather than a hard error — forwarding is your responsibility.

### Minor Changes

- caedca4: Add Reltio icons: `reltio/add-document`, `reltio/author-document`, `reltio/combine`, and `reltio/jar`.

  - Import from `@reltio/design/icons/reltio/<name>`

### Patch Changes

- b89211f: Fix `TenantSelector` rendering only a fraction of the dialog viewport on first open when the tenant list is large enough to virtualize. UI5's `TableVirtualizer` measured its `clientHeight` in `onTableAfterRendering`, which fired before the Dialog's flex layout had settled — the reading came back as ~0 and the virtualizer emitted a range wide enough only for overscan (~11 rows), leaving the lower half of the viewport blank until the user scrolled. Now the virtualizer is reset from the Dialog's `open` event (fired after `renderFinished`), so it re-measures against the stable, final viewport and emits a range that fills it (RP-194945).

## 1.16.0

### Minor Changes

- 0c14f89: Add `reltio/add-parent` and `reltio/add-child` icons (RP-186910).

  - New `add-parent` icon: `import addParent from "@reltio/design/icons/reltio/add-parent"` (or the `ReltioAddParent` component)
  - New `add-child` icon: `import addChild from "@reltio/design/icons/reltio/add-child"` (or the `ReltioAddChild` component)
  - Both are monochrome and theme-aware — they inherit `currentColor` and honor the `design` prop, matching the rest of the Reltio icon set

## 1.15.0

### Minor Changes

- 093b0e8: Split `TenantSelector` environment into display name and machine id, with backward-compatible fallbacks.

  - `TenantEntry` gains optional `environmentName` (column, filters, search, trigger) and `environmentId` (row key / selection match), aligned with `customerName` / `tenantName`
  - Deprecated `TenantEntry.environment` is kept: when the new fields are omitted, it is used for both display and identity
  - `selectedEnvironmentId` is preferred; deprecated `selectedEnvironment` is still accepted as a fallback
  - App template `useTenants` returns `TenantEntry[]` with both new fields; the separate `TenantOption` enrichment wrapper is removed

  **Migration (recommended):** set `environmentName` and `environmentId` instead of `environment`, and rename `selectedEnvironment` to `selectedEnvironmentId`. Legacy callers that only pass `environment` / `selectedEnvironment` keep working without changes.

### Patch Changes

- a983474: `TenantSelector`: use SAP UI5 `TableVirtualizer` for the dialog table above 50 filtered rows. Below the threshold rendering is unchanged. Public API is untouched — consumers benefit automatically on upgrade.

## 1.14.0

### Minor Changes

- 50921cf: Expose the `onClick` prop on `SideNavigationItem` for item-level click handlers.
- bba53c1: Add Reltio icons: `return-to-entity`, `agentflow-filled`, `agentflow-outlined`, `bulkmatch`, and `segmentation`.

  - Import from `@reltio/design/icons/reltio/<name>`
  - Also available from `@reltio/design/icons/reltio` as `returnToEntity`, `agentflowFilled`, `agentflowOutlined`, `bulkmatch`, and `segmentation`

### Patch Changes

- c801ae3: Preserve bare CSS imports (`variables.css`, `fonts.css`) under bundler tree-shaking.

  - `sideEffects` is now `["./variables.css", "./fonts.css"]` instead of `false`, so `import "@reltio/design/variables.css"` is no longer dropped
  - JS modules stay tree-shakable; icon bare imports are still dropped unless the name/default export is used

## 1.13.0

### Minor Changes

- 87c9e92: Add `appSelector` to `ShellBar` and disambiguate `TenantSelector` across environments.

  - New optional `appSelector` prop on `ShellBar` for composing `<AppSelector>` into the right actions cluster
  - `AppSelector` trigger forwards UI5 `Button` props; its popover is portaled so ShellBar does not reserve a phantom layout slot
  - New optional `selectedEnvironment` on `TenantSelector` so the same `tenantId` in different environments can be selected uniquely
  - Align `UserMenu` and notifications with SAP Fiori default-slot placement in ShellBar

- f2baea8: Support id and aria-\* attributes on the Form native form wrapper

### Patch Changes

- 6c92cb9: Fix `ShellBar` side navigation sizing.

  - Widen the `ShellBar` collapsible side navigation drawer to 20rem so longer navigation labels fit on one line
  - Drop the `SideNavigation` `min-width` animation styling that caused a content jump during expand/collapse

## 1.12.0

### Minor Changes

- fa4c174: Add `useFetch` hook for reading data on mount with loading, success, and error states.

  - Available from `@reltio/design/hooks`
  - Returns `{ data, error, isLoading }`, generic over the resolved data (`R`) and error (`E`) types
  - Keyed by `url`: requests sharing the same url are deduplicated while in flight
  - `useFetch(url)` issues a minimal GET and parses the JSON body; `useFetch(url, action)` runs a custom read action that receives the `url`
  - Read-only by design — for mutations (POST/PUT triggered by user actions) use native `fetch` directly

### Patch Changes

- 3fde748: Fix the block-layer dimming overlay rendering as fully opaque black.

  - `--sapBlockLayer_Opacity` is now the numeric SAP Horizon default (`0.6`) instead of an invalid color value, so overlays (side navigation drawer, dialogs, busy indicators) dim the content behind them with proper translucency instead of covering it with solid black.

## 1.11.0

### Minor Changes

- da2c4eb: Make the package fully tree-shakable (`sideEffects: false`) and expose each icon's name as a tree-shakable export.

  **Tree-shaking**

  - Declared `sideEffects: false`, so consumer bundlers drop everything you don't import: pulling a few components from `@reltio/design/components` no longer bundles the whole catalog (`Chat`, `Details`, `Table`, `Calendar`, `Tree`, ...), and unused icons are dropped too.
  - CSS Modules keep working — they're consumed through their default export (the hashed class map), so a bundler keeps each one exactly when its component is kept.

  **Icons — registration through consumed exports**

  - Every per-icon module now default-exports its registry name: `import name from "@reltio/design/icons/sap/save"` (and `.../icons/reltio/<name>`) returns the name string for `<Icon name={name} />`. SAP modules bind it from the UI5 icon module's own default export; Reltio modules bind it from `registerReltioIcon(...)`, whose return value is the name — so registration is tied to using the name and survives tree-shaking. The PascalCase component export (`Save`, `ReltioDataQuality`, ...) also still registers on use.
  - `@reltio/design/icons/reltio` and `@reltio/design/icons/sap` are now pure barrels of icon-name exports (`export { default as aco } from "./aco"`, `aco === "reltio/aco"`; `accelerated === "accelerated"`). Grab every name at once with a namespace import: `import * as reltioIcons from "@reltio/design/icons/reltio"` / `import * as sapIcons from "@reltio/design/icons/sap"` (iterating registers the whole set).

  **Notes for early adopters of the icon modules** (shipped in 1.10.0)

  - Register an icon by importing its name (default) or component — not a bare `import "@reltio/design/icons/sap/save"`, which `sideEffects: false` may drop. Register-all changes from `import "@reltio/design/icons/reltio"` to `import * as reltioIcons from "@reltio/design/icons/reltio"` (used/iterated).
  - The `@reltio/design/icons/reltio` barrel no longer exports the `reltioIcons` metadata array, the `ReltioIcon` type, or `RELTIO_ICON_COLLECTION` — use the per-icon name exports (or the namespace import); names already carry the `reltio/` prefix.

- f139bdb: Add custom menu items and `onItemClick` to `UserMenu`, and endorse `UserMenuItem`.

  - New optional `children` prop on `UserMenu` (`ReactNode`); document passing one or more `UserMenuItem` elements after About, before Sign Out
  - New optional `onItemClick` prop forwards UI5 `item-click` for custom items; identify the item via `event.detail.item` (e.g. `data-href`)
  - New `UserMenuItem` 1:1 re-export from `@reltio/design/components`
  - About modal opens only when the built-in About item is clicked; consumer `onItemClick` is not called for About

## 1.10.0

### Minor Changes

- 00b27e6: Re-export SAP Fiori icons from `@reltio/design/icons/sap/<kebab-name>` so consumer apps never import `@ui5/webcomponents-icons` directly. Reltio custom icons publish under `@reltio/design/icons/reltio/<kebab-name>` so both families can share kebab names without module collisions.

  Every per-icon module shares the same contract: tree-shakable side-effect registration plus an optional PascalCase React component from the same path (`import { Decline } from "@reltio/design/icons/sap/decline"`, `import { ReltioDataQuality } from "@reltio/design/icons/reltio/data-quality"`). Render SAP icons by bare registry name (`<Icon name="save" />`); Reltio icons by `reltio/<name>`.

  SAP modules compile into `dist/icons/sap/`; Reltio modules compile into `dist/icons/reltio/`. Reltio aggregate: `import "@reltio/design/icons/reltio"` only.

### Patch Changes

- acdb0c7: Drop the stray `dist/packages` directory from the published package.

  `tsc` infers `rootDir` as the common ancestor of every compiled file, which spans both the repo-root code folders (`components/`, `charts/`, …) and the workspace entry files (`packages/design/*.ts`) — so the entry files were emitted into `dist/packages/design/`. Those files only re-export `../../components` (i.e. `dist/components`, which is what `@reltio/design/components` already resolves to) and nothing references them, so they are now pruned during `postbuild`. No public API or import-path change.

## 1.9.1

### Patch Changes

- 7d3ba73: Fix the dark theme rendering incompletely when nested under a light theme.

  - `variables.css` now emits every token that differs from UI5's stock light theme for **both** themes, so a `data-theme="sap-reltio-dark"` subtree no longer inherits light values (e.g. background, text, surface colors) from a light ancestor. This affects nested/sibling theming such as light and dark panels shown side by side.
  - `ShellBar` now swaps to its light logo correctly under the `sap-reltio-dark` theme.

## 1.9.0

### Minor Changes

- eef9f80: Ship `variables.css` as Reltio-only theme deltas; activate the theme via `data-theme`.

  - `variables.css` now contains **only the tokens Reltio customizes** (the delta over stock SAP Horizon), roughly 4× smaller. The full stock token set is already injected at runtime by the UI5 web components, so it is no longer duplicated here.
  - Activate the Reltio palette with `data-theme="sap-reltio-light"` / `data-theme="sap-reltio-dark"` on an ancestor element. The previous `horizon-light` / `horizon-dark` values keep working as a deprecated alias.
  - Reltio token values now reliably win over UI5's runtime-injected defaults: each theme is emitted under both `:root[data-theme="…"]` and `[data-theme="…"]`, so `data-theme` works on `<html>` or any nested element.

  Note: with no `data-theme` ancestor, content now falls back to UI5's stock SAP Horizon values instead of the Reltio light palette. Set `data-theme="sap-reltio-light"` (or `"sap-reltio-dark"`) on `<html>` or `<body>` to opt into the Reltio brand. See the [Design Tokens guide](https://reltio.design/?path=/docs/design-tokens--docs).

- 8bd1e3f: feat: add `notificationsUrl` prop to `ShellBar`

  `ShellBar` now accepts an optional `notificationsUrl` string. When provided, a
  bell icon is rendered in the right actions cluster; clicking it opens the given
  URL in a new browser tab (`target="_blank"`, `noopener,noreferrer`). When
  omitted, no bell icon is shown.

## 1.8.1

### Patch Changes

- 9e2312a: Enrich the `npx @reltio/design components <Name>` output: each prop now shows a compact description, a `[deprecated: …]` marker (with the replacement hint) where applicable, and a footer pointing to the package's TypeScript declarations for the full shape of named types (enums, `*AccessibilityAttributes`, event payloads).

## 1.8.0

### Minor Changes

- 113126e: Add a self-describing component-discovery CLI to `@reltio/design`, and ship the agent skill for adopting those components in the new standalone `@reltio/skills` package.

  - **`npx @reltio/design components [Name]`** — list the endorsed component inventory, or print one component's resolved props and defaults. Reads a bundled `components.index.json` + per-component JSON-Schema prop tables shipped in the package, so discovery is offline and version-matched (no MCP or network required). The published `@reltio/design` package now bundles per-component `*.schema.json`, `components.index.json`, and the CLI under `dist/`.
  - **`@reltio/skills`** (new package) — a tiny CLI that installs portable agent skills:
    - `npx @reltio/skills list` — list the bundled skills.
    - `npx @reltio/skills install [name...]` — install all bundled skills, or only the named ones, into a consumer repo (`.agents/skills/` + `.claude/skills/` link). Non-destructive (never deletes unowned content, never edits `AGENTS.md`/`CLAUDE.md`; `--force` only to replace a conflicting link); cleanly updates an existing install; copy fallback where symlinks are unavailable.
  - The **adopt-reltio-design** skill (Cursor/Claude/Codex) guides replacing ad-hoc UI primitives (MUI of any version, bespoke components, raw HTML) with the standardized components via semantic matching, generic web-component/styling rules, the `@reltio/design/components` subpath, and a small-iterative-PR guardrail. It pairs with the `@reltio/design components` discovery CLI.

  Additive only — no change to component runtime APIs.

## 1.7.0

### Minor Changes

- 17f77b5: Add the Reltio custom icon set (application, entity-type, and product glyphs), registered into UI5's global registry under the `reltio/*` namespace so they work by name in `<Icon name="reltio/<name>" />` and any UI5 `icon` prop. Two import forms, mirroring SAP Fiori icons:

  ```tsx
  // Per icon — tree-shakable, bundles only what you import (recommended)
  import "@reltio/design/icons/data-quality";

  // Whole set — convenience, registers every icon
  import "@reltio/design/icons";

  import { Icon } from "@reltio/design/components";
  <Icon name="reltio/data-quality" />;
  ```

  The same SVGs are also served as static assets at `https://reltio.design/icons/<name>.svg`. Icons are monochrome and inherit `currentColor`, so they honor `design`/`color` and re-theme in light/dark.

- 02de7de: Add `AppNavigation` component — a side-navigation menu for the Reltio application catalog.

  - New `apps` prop accepts the grouped catalog returned by the Reltio Config Service (`{ name, items }[]`); only each app's `name` and `url` are used
  - Each app's icon is resolved internally from the curated Reltio icon set (falling back to `reltio/generic`), so the menu stays visually consistent regardless of the icon URL the backend returns
  - Optional `homeUrl` renders a "Home" entry with the SAP `home` icon as the first item
  - Optional `env` / `tenant` substitute `${environment}` / `${tenant}` placeholders in app URLs
  - Designed to drop into the `ShellBar` `sideNavigation` slot

## 1.6.0

### Minor Changes

- 75ea608: Endorse the SAP Fiori display, color, notification, and upload families from `@reltio/design/components` as 1:1 re-exports (doc-only directories with README, prop-type schema, and variant stories): `Timeline` (+`TimelineItem`, `TimelineGroupItem`), `MediaGallery` (+`MediaGalleryItem`), `ColorPalette` (+`ColorPaletteItem`, `ColorPalettePopover`), `NotificationList` (+`NotificationListItem`, `NotificationListGroupItem`), and `UploadCollection` (+`UploadCollectionItem`). Sub-items are documented on their parent component pages.
- 75ea608: Endorse six SAP Fiori sub-components that extend already-endorsed families, as 1:1 re-exports from `@reltio/design/components`: `AvatarBadge`, `AvatarGroup` (Avatar), `ButtonBadge` (Button), `ShellBarSpacer` (ShellBar), `TabSeparator` (TabContainer), and `UserMenuItemGroup` (UserMenu). They are documented on their parent component pages.
- 75ea608: Endorse 12 SAP Fiori primitives from `@reltio/design/components` as 1:1 re-exports (doc-only directories with README, prop-type schema, and variant stories): `FlexBox`, `Grid`, `Card`, `CardHeader`, `ExpandableText`, `RatingIndicator`, `NumericSideIndicator`, `ToggleButton`, `ColorPicker`, `Page`, `Carousel`, and `DynamicSideContent`. These cover common layout containers, card surfaces, and small display/input controls so apps no longer reach for them via direct UI5 imports.
- 75ea608: Endorse the SAP Fiori menu, toolbar, and breadcrumb families from `@reltio/design/components` as 1:1 re-exports (doc-only directories with README, prop-type schema, and variant stories): `Breadcrumbs` (+`BreadcrumbsItem`), `Menu` (+`MenuItem`, `MenuItemGroup`, `MenuSeparator`), `ActionSheet`, and `Toolbar` (+`ToolbarButton`, `ToolbarItem`, `ToolbarSelect`, `ToolbarSelectOption`, `ToolbarSeparator`, `ToolbarSpacer`). Sub-items are documented on their parent component pages.
- 75ea608: Endorse the SAP Fiori messaging, dialog, and splitter components from `@reltio/design/components` as 1:1 re-exports (doc-only directories with README, prop-type schema, and variant stories): `MessageView` (+`MessageItem`, `MessageViewButton`), `MessageBox`, `SelectDialog`, and `SplitterLayout` (+`Splitter`, `SplitterElement`). Sub-items are documented on their parent component pages.
- 96794a8: Endorse five SAP Fiori content primitives from `@reltio/design/components`: `Text`, `Title`, `Link`, `Tag`, and `ObjectStatus`. Each is a 1:1 re-export of the corresponding `@ui5/webcomponents-react` component — no Reltio wrapping or prop renaming — added as a documentation-only directory with a README, prop-type schema, and stories covering every visual variant. These cover the most common typography and status surfaces (body copy, headings, hyperlinks, classification pills, and inline status text) so apps no longer reach for them via direct UI5 imports.

## 1.5.0

### Minor Changes

- fe6399c: Add endorsed Bar component for header/sub-header/footer toolbar surfaces.
- a492a92: Endorse the SAP Fiori Form floorplan from `@reltio/design/components`, with documentation and stories covering responsive multi-column layout, grouped sections, label placement, and edit/display mode. `FormGroup` and `FormItem` are 1:1 UI5 re-exports. `Form` is a thin Reltio wrapper that renders the UI5 Form inside a native `<form>` and adds an `onSubmit(values, event)` callback — it calls `preventDefault()` and serializes the form-associated UI5 fields (each needs a `name`) into a flat JSON object ready for a JSON API, so apps submit without re-implementing form-data collection. Repeated field names become arrays (multi-value safe); the raw `FormData` is still reachable via `new FormData(event.currentTarget)`. It also ships opinionated layout defaults that diverge from UI5: `layout="S1 M1 L1 XL1"` (single column on every breakpoint) and `labelSpan="S12 M12 L12 XL12"` (labels on top); both remain overridable. Other field behavior is unchanged from UI5.
- 6fd68e0: Add endorsed Label component for form fields.
- 246a435: Re-export Table selection feature components (TableSelectionMulti / TableSelectionSingle, plus TableGrowing / TableRowAction) so consumers can build selectable tables through the endorsed surface.

## 1.4.0

### Minor Changes

- 9c25329: Add endorsed `List` surface for menus and selectable row lists: `List`, a single `ListItem` row entity (backed by SAP Fiori `ListItemStandard`, customised via props and children), and `ListItemGroup` for sectioned lists. UI5's `ListItemCustom` is intentionally not endorsed in favour of one obvious item entity.
- 9c25329: Add endorsed `Tree` surface for hierarchical data: `Tree` and a single `TreeItem` node entity. `TreeItem` is a thin Reltio wrapper that collapses UI5's `TreeItem` / `TreeItemCustom` split into one component — the row label is the `content` prop (a string renders a standard node and keeps `additionalText`; any other `ReactNode` renders as custom row content). It also adds a `loading` prop: when `true`, the node renders three non-interactive skeleton placeholder rows while its children are fetched, the standard lazy-loading affordance. UI5's `TreeItemCustom` is not exposed directly — `TreeItem` selects the right underlying node automatically.
- d3219a4: Endorse the UI5 `SideNavigation` family and add a `sideNavigation` slot on `ShellBar` (DESIGN-78). Application navigation is now built directly from the SAP Fiori side navigation primitives instead of bespoke Reltio wrappers.

  **`SideNavigation` family** — thin Reltio wrappers over the SAP Fiori side-navigation parts, each with a deliberately narrowed API. Deep-customization UI5 props are intentionally hidden across the family and will be re-exposed as dedicated Reltio props on demand.

  - **`SideNavigation`** — public props: `accessibleName`, `children`, `collapsable`, and standard element attributes (`className`, `style`, `id`, `data-*`, `aria-*`, …). Hidden: `header`, `fixedItems`, `onSelectionChange`, `onItemClick`, …. When `collapsable` is set, the component renders a collapse/expand toggle at the bottom and owns its collapsed state internally.
  - **`SideNavigationGroup`** — public props: `text`, `expanded`, `children`, `className`, `style`.
  - **`SideNavigationItem`** — public props: `text`, `icon`, `href`, `target`, `selected`, `disabled`, `expanded`, `design`, `unselectable`, `tooltip`, `children`, `className`, `style`. Hidden: `accessibilityAttributes` and the low-level UI5 `onClick` custom-event handler.
  - **`SideNavigationSubItem`** — public props: `text`, `href`, `target`, `selected`, `disabled`, `design`, `unselectable`, `tooltip`, `className`, `style`. The UI5 `icon` prop is intentionally omitted to enforce the SAP guideline that second-level items do not carry icons.

  Build the menu from `SideNavigationItem` (with `text`, `icon`, `href`, `selected`, `disabled`, `design`, `unselectable`), nest `SideNavigationSubItem` for second-level entries, group entries with `SideNavigationGroup`, and set `collapsable` on `SideNavigation` to add a self-managed collapse/expand toggle for the icon-only rail.

  **`ShellBar`** — gains a `sideNavigation?: ReactElement` slot prop that hosts a `<SideNavigation>` element. When supplied, `ShellBar` renders it as a fully encapsulated left drawer: a full-height panel that slides in from the left over a dimming backdrop covering the viewport. `ShellBar` automatically renders the hamburger toggle, owns the open/closed state, and wires the handlers (hamburger click, backdrop click, and `Escape` all toggle the drawer) — the UI5 `startButton` slot is no longer part of the `ShellBar` public API and the drawer behavior is not customizable. When the hamburger is present, `ShellBar` also tightens its inline gutter from UI5's default `2rem` to `0.875rem 1rem` so the trigger sits snug at the edge.

### Patch Changes

- 9c25329: Fix `Skeleton` being invisible in the light theme. The shimmer and base bar both resolved to `--sapBackgroundColor` / `--sapNeutralBackground` (identical `#f5f5fa` in light Horizon), so the loading animation had no contrast. The bars now use a translucent neutral grey that darkens light surfaces and lightens dark ones, keeping the skeleton visible on any background in both themes without being overly prominent.

## 1.3.0

### Minor Changes

- ff7d05b: Add `UserMenu` component and a `userMenu` slot on `ShellBar`.

  - `UserMenu` bundles the trigger avatar (image or derived initials), the UI5 user-menu popover (name + email, About item, Sign Out), and the About modal (copyright, version, optional legal links).
  - Required `user`, `about`, and `onSignOut` props; popover and About-modal open/close state is internal. `onSignOut` is fire-and-forget — the component performs no navigation.
  - `ShellBar` gains an additive `userMenu?: ReactElement` slot routed into the UI5 ShellBar `profile` slot; an explicit `profile` prop takes precedence.

- c9c4303: Ship the **SAP Reltio** (light) and **SAP Reltio Dark** themes — a Reltio-branded customization of SAP Horizon. The published `variables.css` now carries Reltio-tuned values for selected `--sap*` tokens (brand, links, accents, and more).

  Token **names, casing, and structure are unchanged** and remain 1:1 with SAP Horizon, so the themes stay fully compatible with the UI5 web components — no migration required. Technical identifiers also stay the same: `data-theme="horizon-light"` / `horizon-dark`.

## 1.2.0

### Minor Changes

- a3e8b4b: Add `TenantSelector` component and a `tenantSelector` slot on `ShellBar`.

  - `TenantSelector` renders a trigger label (`"customer - tenant - environment"` or a `"Select tenant"` placeholder) that opens a searchable, sortable dialog of tenants.
  - Fully controlled selection via `selectedTenantId` + `onSelect`; the dialog open/close state is internal.
  - Search filters case-insensitively across all four columns; columns are sortable (default `Customer name` ascending); empty states for no data and no search matches.
  - `ShellBar` gains an additive `tenantSelector?: ReactElement` slot rendered into the UI5 ShellBar `children` slot.

### Patch Changes

- 7204356: Fix unreadable chart tooltip text in dark theme.

  - Tooltip now uses `--sapGroup_ContentBackground` and `--sapTextColor` so background and text contrast correctly in both light and dark themes
  - Affects all charts (`BarChart`, `LineChart`, `DonutChart`, `RadarChart`, `SankeyChart`, `GraphChart`, `GeoChart`)

## 1.1.0

### Minor Changes

- cab25ec: Add nine new component families to `@reltio/design/components` (RP-184745).

  **Thin UI5 endorsements** (1:1 re-exports from `@ui5/webcomponents-react@2.21.3`, no Reltio wrapping):

  - `Dialog` — modal overlay for confirmations and blocking interactions
  - `IllustratedMessage` — page-level empty / error / success states with Fiori illustrations
  - `Panel` — collapsible section; SAP equivalent of an accordion item (stack to compose an accordion)
  - `ProgressIndicator` — determinate progress bar with value-state semantics
  - `ResponsivePopover` — adaptive popover that falls back to a dialog on phones
  - `TabContainer` + `Tab` — tab strip and tab item
  - `Table` + `TableHeaderRow` + `TableHeaderCell` + `TableRow` + `TableCell` — tabular data grid
  - `Toast` — transient overlay notification. Semantic variants (info / success / error) are achieved via `--sap*` token overrides on a parent class (see README) — no wrapper needed.
  - `Wizard` + `WizardStep` — multi-step guided flow

  Also re-exports the supporting UI5 ShellBar primitives consumers compose into ShellBar: `ShellBarBranding`, `ShellBarItem`, `ShellBarSearch`.

  **Reltio business component**:

  - `ShellBar` — top navigation chrome that ships a default Reltio brand mark in the new UI5 `branding` slot via a `<picture>` with `horizon-light` / `horizon-dark` variants chosen by the closest `[data-theme]` ancestor. Overridable via `branding?: ReactNode`. All other UI5 ShellBar props pass through. `data-test-id` forwarded to the light-DOM host. OpenSpec change at `openspec/changes/add-shell-bar/`.

  Drawer is tracked separately for a follow-up PR (no direct UI5 source in `2.21.3`; needs a custom Reltio implementation).

## 1.0.2

### Patch Changes

- c8c5afe: Slim down the published dependency tree.

  - Drop the unused `rc-tree` dependency. It lingered from a removed `TreeList` component and was no longer imported anywhere.
  - Drop the unused `@storybook/mcp` dependency. It is only needed in development via the `@storybook/addon-mcp` devDependency and was never used at runtime.
  - Correct `react`/`react-dom` peer ranges from `">=17 <20"` to `"^18 || ^19"` to match the actual requirement of the bundled `@ui5/webcomponents-react@2.21.3`. React 17 never worked in practice — UI5 React 2.x requires React 18 or 19 — so installs now produce an honest peer-dep warning instead of silently failing at runtime.

## 1.0.1

### Patch Changes

- 0c7d5b8: Relicense `@reltio/design` under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0), aligned with the upstream `@ui5/webcomponents-react` license.

  The published bundle now includes:

  - `LICENSE` — the full Apache 2.0 license text
  - `NOTICE` — attribution for the redistributed Apache 2.0 software from SAP SE (`@ui5/webcomponents-react`, `@ui5/webcomponents`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`, and the SAP Horizon design tokens / SAP 72 fonts from `@sap-theming/theming-base-content`)

  The `license` field in `package.json` changes from `UNLICENSED` to `Apache-2.0`. No code, types, runtime behaviour, or public API change — this is a metadata-only release that grants users an explicit, perpetual, royalty-free copyright and patent license to install, use, modify, and redistribute the package. Reltio's trademarks (including the Reltio name and logo) are not granted by this license — see Section 6 of the Apache License for the trademark exclusion.

## 1.0.0

### Major Changes

- 24a0799: First stable release of `@reltio/design` — the single distribution package for every UI surface a Reltio application needs.

  ### `@reltio/design/components`

  A curated UI surface built on [`@ui5/webcomponents-react`](https://sap.github.io/ui5-webcomponents-react/) (pinned to `2.21.3`), themed with SAP Horizon.

  - **Endorsed SAP Fiori (UI5) components.** `Avatar`, `BusyIndicator`, `Button`, `Calendar`, `CalendarDate`, `CalendarDateRange`, `CalendarLegend`, `CalendarLegendItem`, `CheckBox`, `ComboBox`, `ComboBoxItem`, `ComboBoxItemGroup`, `DatePicker`, `DateRangePicker`, `DateTimePicker`, `DynamicDateRange`, `FileUploader`, `Icon`, `Input`, `MessageStrip`, `MultiComboBox`, `MultiComboBoxItem`, `MultiComboBoxItemGroup`, `MultiInput`, `Option`, `OptionCustom`, `Popover`, `RadioButton`, `RangeSlider`, `SegmentedButton`, `SegmentedButtonItem`, `Select`, `Slider`, `SpecialCalendarDate`, `SplitButton`, `StepInput`, `SuggestionItem`, `SuggestionItemCustom`, `SuggestionItemGroup`, `Switch`, `TimePicker`, `Token`.
  - **Reltio MDM components and primitives.** `AppSelector`, `Chat` (with streaming message support and `<Chat.Composer />` subcomponent), `Details`, `ErrorBoundary`, `Markdown`, `Skeleton`, `TextArea`.

  ### `@reltio/design/charts`

  ECharts-powered visualizations for MDM data: `BarChart`, `Diagram` (auto-layout node-and-edge graphs), `DonutChart`, `GaugeChart`, `GeoChart`, `GraphChart`, `LineChart`, `RadarChart`, `SankeyChart`, `SetOverlapChart`.

  ### `@reltio/design/hooks`

  `useTextStream` — accumulates streamed text from SSE endpoints (used internally by `Chat` to render assistant responses token-by-token). Returns the assembled `text`, connection `status`, the latest `event`, and `send` / `abort` controls. Companion types: `StreamFetcher`, `StreamFetcherInput`, `TextStreamEvent`.

  ### `@reltio/design/utils`

  Shared utilities for component authors and consumers: `classNames`, `HtmlProps`, value-state helpers, form-type helpers.

  ### Theme and fonts

  SAP Horizon design tokens (`variables.css`) and SAP 72 fonts (`fonts.css`) ship as static assets and are also hosted at <https://reltio.design/variables.css> and <https://reltio.design/fonts.css>. Activate a theme by setting `data-theme="horizon-light"` or `data-theme="horizon-dark"` on any ancestor element — UI5 web components and Reltio components both pick up the change automatically.

  ### Installation

  ```bash
  npm install @reltio/design
  ```

  `@ui5/webcomponents-react`, `@ui5/webcomponents-icons`, `@ui5/webcomponents-fiori`, ECharts, and the rest of the underlying stack arrive transitively at the exact versions the UI Center of Excellence has tested through Chromatic visual regression, accessibility, and interaction tests.

  ```tsx
  import { Button, Chat, MessageStrip } from "@reltio/design/components";
  import { LineChart } from "@reltio/design/charts";
  import { useTextStream } from "@reltio/design/hooks";
  import "@ui5/webcomponents-icons/dist/save.js";
  ```

  See [reltio.design](https://reltio.design) for the full component catalogue, the [UI Architecture guide](https://reltio.design/?path=/docs/guides-ui-architecture--docs) for the single-entry-point rationale, and the [Release Process guide](https://reltio.design/?path=/docs/guides-release-process--docs) for cadence and migration policy.

  **Migration:** the `0.x` line was an experimental preview built on a different tech stack. Components have been rewritten on UI5 and no automated migration path is provided — install `1.0.0` as a fresh dependency rather than upgrading from `0.x`.
