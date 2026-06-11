# @reltio/design

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
