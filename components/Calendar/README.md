# Calendar

`Calendar` is the SAP Fiori standalone calendar grid, re-exported from `@ui5/webcomponents-react/Calendar` as the canonical Reltio entry point. Use it when the date selection has to stay visible on the surface — entity validity scheduling, batch-job timing screens, audit-log filters — rather than open from a small input field. For inline-input date pickers prefer `DatePicker`, `DateRangePicker`, or `DateTimePicker`.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Calendar`. The Reltio layer adds curation (this is the endorsed inline-calendar surface), pinned versioning, and Reltio-specific guidance.

### Selection model — single, multiple, range

- **`Single` (default)** — One day at a time. Effective-date pickers, single-event scheduling.
- **`Multiple`** — Several discrete days. Reviewer availability, recurring exception days.
- **`Range`** — Continuous start-to-end range. Validity windows, audit-log time spans, batch-job effective windows.

The selected days are passed as children — `<CalendarDate value="…" />` for `Single`/`Multiple` and `<CalendarDateRange startValue="…" endValue="…" />` for `Range`. Dates must be ISO `yyyy-MM-dd` (unless `formatPattern` is set).

```tsx
<Calendar selectionMode="Range" onSelectionChange={(e) => persist(e.detail.values)}>
  <CalendarDateRange startValue="2026-05-04" endValue="2026-05-15" />
</Calendar>
```

### Bounds — `minDate` / `maxDate`

Constrain selection to a fixed window. Use this to prevent picking dates outside the entity's lifecycle, the active tenant period, or a moderator-defined audit retention window. Both bounds are inclusive and ISO `yyyy-MM-dd`.

### Secondary calendar type

`secondaryCalendarType` overlays a second calendar (Islamic, Buddhist, Japanese, Persian) on top of the Gregorian grid. Useful for tenants whose business workflows span multiple cultures; pair with `primaryCalendarType` if the Gregorian calendar is not the default.

### Highlights vs. selection — special dates and legend

For decoration (holidays, milestones, blocked dates that the user can still see), use `<SpecialCalendarDate type="…" value="…" />` as a child. Pair with `<CalendarLegend>` + `<CalendarLegendItem>` so screen readers and color-blind users can interpret the meaning. Highlights do **not** participate in selection.

### Week numbering

By default the calendar uses the tenant's locale. Force ISO 8601 (week 1 contains the first Thursday of the year) with `calendarWeekNumbering="ISO_8601"` for compliance / reporting screens. Hide the column entirely via `hideWeekNumbers` when it adds noise.

### See also

- [SAP Fiori Calendar design guideline](https://experience.sap.com/fiori-design-web/calendar/) — semantic guidance and visual patterns
- [UI5 Calendar web component reference](https://ui5.github.io/webcomponents/components/Calendar/) — full underlying API
- [DatePicker](?path=/docs/components-datepicker--docs) — inline-input variant when the calendar should hide until the field is focused
- [DateRangePicker](?path=/docs/components-daterangepicker--docs) — inline-input variant for ranges
