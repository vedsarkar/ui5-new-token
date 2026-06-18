# ObjectStatus

`ObjectStatus` is the SAP Fiori status element, re-exported from `@ui5/webcomponents-react/ObjectStatus` as the canonical Reltio entry point. Use it to show the state of a record or process as text — optionally with a leading icon — colored by semantic meaning: a sync result, a validation outcome, a job status, a data-quality verdict. Unlike `Tag` (a pill), `ObjectStatus` reads as inline status text, so it fits naturally in key/value pairs, table cells, and object headers.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/ObjectStatus`. The Reltio layer adds curation (this is the endorsed status-text surface), pinned versioning, and richer documentation.

### Semantic `state`

`state` colors the status and selects its default icon: `None` (default, neutral), `Information`, `Positive`, `Critical`, `Negative`. Always map the value to real meaning — `Negative` for failures and errors, `Critical` for warnings or items needing attention, `Positive` for success. The SAP `IndicationColor` values (`Indication01`–`Indication08`) are also accepted for non-standard palettes, but prefer the semantic states so status stays consistent across applications.

### Don't rely on color alone

Color is not an accessible signal by itself. Either set `showDefaultIcon` so each state carries its standard icon, or make the text itself unambiguous (e.g. "Sync failed" rather than a bare "Failed" with red color). For a fully custom icon, pass the `icon` slot — but keep it decorative so the text remains the source of truth.

### `ObjectStatus` vs `Tag` vs `MessageStrip`

- **`ObjectStatus`** — inline status text for a record/process, often in a header or table cell.
- **`Tag`** — a compact pill for classification or removable filter chips.
- **`MessageStrip`** — a full-width inline message about the page or an action, not a per-record status.

### Empty and large variants

Set `emptyIndicator` to render a placeholder dash when there is no value, keeping data-driven rows aligned. Use `large` for prominent placement (object page headers); the default size suits table cells and dense lists.

### See also

- [SAP Fiori Object Status design guideline](https://experience.sap.com/fiori-design-web/object-status/) — semantic state guidance
- [UI5 ObjectStatus web component reference](https://ui5.github.io/webcomponents-react/?path=/docs/data-display-objectstatus--docs) — full underlying API
- `Tag` — for classification pills · `MessageStrip` — for inline messages
