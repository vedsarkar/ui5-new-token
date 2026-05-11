# DatePicker

`DatePicker` is the SAP Fiori inline date input with a calendar popup, re-exported from `@ui5/webcomponents-react/DatePicker` as the canonical Reltio entry point. Use it for any single-date field — entity validity start, audit-log filter, batch-job effective date — where the user should be able to either type the date or open the calendar grid.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/DatePicker`. The Reltio layer adds curation (this is the endorsed single-date input surface), pinned versioning, and Reltio-specific guidance.

### DatePicker vs. Calendar

- **`DatePicker`** — Single date inside a form. The calendar only appears when the user opens it.
- **`Calendar`** — The calendar should stay visible on the surface (date-driven landing pages, schedule overviews).

### `formatPattern` — display vs. value

By default the input uses the locale's medium pattern (e.g. `May 11, 2026` for `en-US`). For machine-readable values pass an explicit `formatPattern`:

```tsx
<DatePicker formatPattern="yyyy-MM-dd" />
```

The same pattern controls both display and the parsing of typed input. **`value`, `minDate`, `maxDate` must match this pattern** — pass them in the format the user sees:

```tsx
<DatePicker
  formatPattern="yyyy-MM-dd"
  value="2026-05-11"
  minDate="2026-01-01"
  maxDate="2026-12-31"
/>
```

For mixed-locale tenants, prefer ISO `yyyy-MM-dd` so the persisted form value never depends on the rendering locale.

### `minDate` / `maxDate` constraints

Both bounds are inclusive. When the user types or picks a date outside the window, UI5 sets `valueState="Negative"` automatically. To trigger that error on submit, also check `value` in the form layer — the user can submit the form before opening the calendar.

### Validation — `valueState`

Use `valueState` (`None`, `Information`, `Critical`, `Negative`, `Positive`) and pair with `valueStateMessage` slot for the explanation. Without a message, the color alone is meaningless to screen readers.

### Required vs. readonly vs. disabled

- **`required`** — the form will reject submission without a value; pair with a visible asterisk in the label.
- **`disabled`** — the field is unavailable in this context; usually paired with an explanation elsewhere.
- **`readonly`** — the value is set and the user is told what it is, but cannot change it.

### Accessibility

Set `accessibleName` (or `accessibleNameRef`) so screen readers announce the field's purpose. Without it, the field is announced as just "date input", which is meaningless in a multi-date form.

### See also

- [SAP Fiori Date Picker design guideline](https://experience.sap.com/fiori-design-web/date-picker/) — semantic guidance and visual patterns
- [UI5 DatePicker web component reference](https://ui5.github.io/webcomponents/components/DatePicker/) — full underlying API
- [DateRangePicker](?path=/docs/components-daterangepicker--docs) — two-date range variant
- [DateTimePicker](?path=/docs/components-datetimepicker--docs) — date + time variant
- [Calendar](?path=/docs/components-calendar--docs) — standalone calendar grid
