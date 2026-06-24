# @reltio/design

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
