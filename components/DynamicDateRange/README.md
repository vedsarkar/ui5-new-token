# DynamicDateRange

`DynamicDateRange` is the SAP Fiori semantic date-range picker, re-exported from `@ui5/webcomponents-react/DynamicDateRange` as the canonical Reltio entry point. Use it for filter bars where the user thinks in terms of business-meaningful ranges — "Today", "Yesterday", "Last 7 days", "Next 30 days" — and only occasionally needs to pick an absolute date.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/DynamicDateRange`. The Reltio layer adds curation (this is the endorsed semantic-range surface), pinned versioning, and Reltio-specific guidance.

### When to use DynamicDateRange vs. DateRangePicker

- **`DynamicDateRange`** — Reporting, audit logs, dashboards. The user thinks in named ranges; the absolute dates are derived. The selected range is **dynamic** — "Last 7 days" means "the 7 days before the moment the query runs", not a fixed window.
- **`DateRangePicker`** — Persisted business data (entity validity windows). The user picks a fixed start and end and the system stores those dates literally.

### Registering options — side-effect imports

Options must be registered via side-effect imports **at the app entry point**, not inside the component file (so the registration happens once and stays alive across renders):

```tsx
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";
```

Without the matching side-effect import, the operator string in `options` is ignored.

### `options` — comma-separated capitalised string

`options` is a single comma-separated string in capital case:

```tsx
<DynamicDateRange options="TODAY, YESTERDAY, LASTDAYS, DATERANGE" />
```

Available standard operators (each has its own side-effect import):

- **`TODAY`** — The current date.
- **`YESTERDAY`** — The day before today.
- **`TOMORROW`** — The day after today.
- **`DATE`** — A single absolute date.
- **`DATERANGE`** — An absolute date range.
- **`DATETIMERANGE`** — An absolute datetime range.
- **`FROMDATETIME`** — Open-ended range from a datetime to "now".
- **`TODATETIME`** — Open-ended range from "the past" to a datetime.
- **`LASTDAYS` / `LASTWEEKS` / `LASTMONTHS` / `LASTQUARTERS` / `LASTYEARS`** — Last X period from today (parameterized).
- **`NEXTDAYS` / `NEXTWEEKS` / `NEXTMONTHS` / `NEXTQUARTERS` / `NEXTYEARS`** — Next X period from today (parameterized).

`LASTOPTIONS` and `NEXTOPTIONS` share a single side-effect import file (`LastOptions.js`, `NextOptions.js`).

### `value` — operator + values

The current selection is a structured object, not a string:

```tsx
// Static range
<DynamicDateRange value={{ operator: "TODAY" }} />

// Parameterized range
<DynamicDateRange value={{ operator: "LASTDAYS", values: [7] }} />

// Absolute range
<DynamicDateRange value={{ operator: "DATERANGE", values: [new Date("2026-05-01"), new Date("2026-05-31")] }} />
```

The `values` array is operator-specific: `LASTDAYS` expects `[number]`, `DATERANGE` expects `[Date, Date]`, `TODAY` expects nothing.

### Converting `value` to concrete dates

UI5 exposes a `toDates` instance method on the component DOM ref to resolve the dynamic value to a concrete `[Date, Date]` pair at query time:

```tsx
const ref = useRef<DynamicDateRangeDomRef>(null);
const [from, to] = ref.current?.toDates(value) ?? [];
```

Call this **at the moment you run the query**, not on render — otherwise "Last 7 days" will be evaluated against the render timestamp, not the user-visible "now".

### See also

- [UI5 DynamicDateRange web component reference](https://ui5.github.io/webcomponents/components/DynamicDateRange/) — full underlying API, including how to register custom operators
- [DateRangePicker](?path=/docs/components-daterangepicker--docs) — absolute date-range variant
- [DateTimePicker](?path=/docs/components-datetimepicker--docs) — single datetime variant
