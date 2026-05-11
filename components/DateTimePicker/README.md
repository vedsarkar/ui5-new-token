# DateTimePicker

`DateTimePicker` is the SAP Fiori inline date + time input, re-exported from `@ui5/webcomponents-react/DateTimePicker` as the canonical Reltio entry point. Use it whenever a field combines a calendar day and a wall-clock time — scheduled batch-job kickoff, entity change-effective-at timestamps, audit events with precise time, SLA deadlines.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/DateTimePicker`. The Reltio layer adds curation (this is the endorsed datetime input surface), pinned versioning, and Reltio-specific guidance.

### When to use DateTimePicker vs. DatePicker + TimePicker

- **`DateTimePicker`** — The date and time form one concept (a single moment). The popup shows both pickers and enforces validity together.
- **`DatePicker` + `TimePicker`** — The date is the primary value; time is a secondary, often-optional refinement. Users can fill them independently.

### `formatPattern` — display, parsing, and value

The pattern controls both display and the parsing of typed input. **Always set `formatPattern` explicitly** — the default uses the locale's medium pattern, which makes `value` locale-dependent. For mixed-locale tenants and persisted timestamps, prefer ISO-like:

```tsx
<DateTimePicker formatPattern="yyyy-MM-dd HH:mm:ss" value="2026-05-11 14:30:00" />
```

`value`, `minDate`, and `maxDate` must all match this pattern.

### 12-hour vs. 24-hour

Use the pattern's hour tokens to control the clock:

- **`HH`** — 24-hour (`00`–`23`). Default for ISO-like patterns.
- **`H`** — 24-hour, no zero-pad (`0`–`23`). Rare.
- **`hh`** — 12-hour zero-padded (`01`–`12`). Always pair with `a` (`AM`/`PM`).
- **`h`** — 12-hour, no zero-pad (`1`–`12`). Always pair with `a`.

For US-locale tenants, `MMM d, yyyy h:mm a` is the most readable; for everything else `yyyy-MM-dd HH:mm` is the safest default.

### Time zones — UI5 does NOT convert

`DateTimePicker` operates in the browser's local time. It does not show or convert across time zones. If your data is stored in UTC (Reltio API timestamps usually are):

1. Convert UTC → user-local before passing to `value`.
2. Convert user-local → UTC before persisting `onChange` output.
3. Display the user's time zone label next to the field so they know which clock they're picking against.

For multi-time-zone workflows (a tenant administrator scheduling a run in a different region's time zone), pair the field with a separate time-zone selector and convert in your form layer.

### Required vs. disabled vs. readonly

Same semantics as the other date / time fields:
- **`required`** — form rejects submission without a value.
- **`disabled`** — field unavailable in this context.
- **`readonly`** — value set; user is told what it is, cannot change it.

### Validation — `valueState`

Use `valueState` (`None`, `Information`, `Critical`, `Negative`, `Positive`) and pair with `valueStateMessage` slot for the explanation.

### See also

- [SAP Fiori Date/Time Picker design guideline](https://experience.sap.com/fiori-design-web/date-time-picker/) — semantic guidance and visual patterns
- [UI5 DateTimePicker web component reference](https://ui5.github.io/webcomponents/components/DateTimePicker/) — full underlying API
- [DatePicker](?path=/docs/components-datepicker--docs) — date-only variant
- [TimePicker](?path=/docs/components-timepicker--docs) — time-only variant
