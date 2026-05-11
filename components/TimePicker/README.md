# TimePicker

`TimePicker` is the SAP Fiori inline time input with a clock popup, re-exported from `@ui5/webcomponents-react/TimePicker` as the canonical Reltio entry point. Use it for time-of-day fields that are independent of a date — daily-job cutoff times, business-hours boundaries, SLA deadlines expressed as time-of-day, recurring-schedule slots.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/TimePicker`. The Reltio layer adds curation (this is the endorsed time-only input surface), pinned versioning, and Reltio-specific guidance.

### TimePicker vs. DateTimePicker

- **`TimePicker`** — The value is a time of day with no associated date ("every day at 9:00 AM").
- **`DateTimePicker`** — The value is a specific moment (date + time).

If your business logic stores a date alongside the time, use `DateTimePicker` even if the user only changes the time portion most of the time — keeping value and storage consistent avoids edge cases around DST and time zones.

### `formatPattern` — display, parsing, and value

The pattern controls both display and the parsing of typed input. **Always set `formatPattern` explicitly** — the default uses the locale's medium pattern, which makes `value` locale-dependent.

- **`HH:mm:ss`** — `14:30:00`. Persistence, mixed-locale tenants.
- **`HH:mm`** — `14:30`. Minute precision is enough; persistence.
- **`h:mm a`** — `2:30 PM`. US-locale tenants; readable display.
- **`hh:mm a`** — `02:30 PM`. Same but zero-padded.

`value` must match `formatPattern` — pass it in the format the user sees.

### 12-hour vs. 24-hour

Use the pattern's hour tokens to control the clock:

- **`HH`** — 24-hour (`00`–`23`). Default for ISO-like patterns.
- **`H`** — 24-hour, no zero-pad (`0`–`23`). Rare.
- **`hh`** — 12-hour zero-padded (`01`–`12`). Always pair with `a` (`AM`/`PM`).
- **`h`** — 12-hour, no zero-pad (`1`–`12`). Always pair with `a`.

### Time zones — UI5 does NOT convert

`TimePicker` operates in the browser's local time (no concept of time zone). Reltio API timestamps are typically stored in UTC — if the time has a date attached, convert in your form layer. For pure time-of-day fields (daily cutoffs, business hours), the value is usually tenant-local and no conversion is needed.

### Validation — `valueState`

Use `valueState` (`None`, `Information`, `Critical`, `Negative`, `Positive`) and pair with `valueStateMessage` slot for the explanation.

### Required vs. disabled vs. readonly

Same semantics as the other date / time fields:
- **`required`** — form rejects submission without a value.
- **`disabled`** — field unavailable in this context.
- **`readonly`** — value set; user is told what it is, cannot change it.

### Accessibility

Set `accessibleName` so screen readers announce the field's purpose. Without it, the field is announced as just "time input", which is meaningless in a form with several time pickers.

### See also

- [SAP Fiori Time Picker design guideline](https://experience.sap.com/fiori-design-web/time-picker/) — semantic guidance and visual patterns
- [UI5 TimePicker web component reference](https://ui5.github.io/webcomponents/components/TimePicker/) — full underlying API
- [DateTimePicker](?path=/docs/components-datetimepicker--docs) — date + time variant
- [DatePicker](?path=/docs/components-datepicker--docs) — date-only variant
