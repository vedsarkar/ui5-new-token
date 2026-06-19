# RatingIndicator

`RatingIndicator` is the SAP Fiori rating control, re-exported from `@ui5/webcomponents-react/RatingIndicator` as the canonical Reltio entry point. Use it to display or capture a discrete score on a fixed scale — a data-quality or match-confidence rating, a review score, a survey answer.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/RatingIndicator`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Editable vs read-only

- **Editable** (default) — the user clicks to set `value`; handle `onChange`.
- **`readonly`** — display a score the user cannot change (the common case for showing a computed rating).
- **`disabled`** — inactive and dimmed; the control is not currently applicable.

### Scale and size

- **`value`** / **`max`** — current score and scale size (default `max` is 5).
- **`size`** — `S`, `M` (default), or `L`.

### Accessibility

Always set `accessibleName` to describe what the rating measures (e.g. "Data quality score"), since the stars alone don't convey the metric.

### See also

- [UI5 RatingIndicator reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/inputs-ratingindicator--docs) — full underlying API
- `ObjectStatus` — for non-numeric status · `ProgressIndicator` — for percentage completion
