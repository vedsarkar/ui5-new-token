# @reltio/design

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
