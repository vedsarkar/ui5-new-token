# StepInput

`StepInput` is the SAP Fiori discrete-numeric input with `+` / `-` step buttons, re-exported from `@ui5/webcomponents-react/StepInput` as the canonical Reltio entry point. Use it for any precise integer or fractional value the user adjusts by small increments — page size, match thresholds, retry count, source weight, retention days.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/StepInput`. The Reltio layer adds curation (this is the endorsed step-numeric surface), pinned versioning, and Reltio-specific guidance.

### StepInput vs. Slider vs. Input type="Number"

- **`StepInput`** — Discrete numeric value. The user wants the exact number visible and adjusts in increments. Good default for most settings forms.
- **`Slider`** — Continuous value where the visual position matters. The exact number is secondary.
- **`Input type="Number"`** — Pure numeric entry without explicit step controls. The user types the value.

### `min`, `max`, `step`

`min` and `max` constrain the value. Both are inclusive. `step` is the increment applied on `+` / `-` click and on arrow-key presses:

```tsx
<StepInput min={1} max={999} step={1} value={25} accessibleName="Rows per page" />
```

For percentages and ratios, `step={5}` or `step={10}` is usually right; `step={1}` for counts.

### Decimal precision — `valuePrecision`

For fractional values, set `valuePrecision` to the number of decimal places shown:

```tsx
<StepInput min={0} max={10} step={0.25} value={1.5} valuePrecision={2} />
```

Without `valuePrecision`, fractional values display with the platform's default number formatting which can show extra trailing zeros or be locale-dependent.

### Validation — `valueState`

Use `valueState` (`None`, `Information`, `Critical`, `Negative`, `Positive`) and pair with `valueStateMessage` slot for the explanation. The component does not auto-clamp typed input outside `[min, max]` — it surfaces the violation via `valueState`. You must reject the form submission in the app layer.

### Required vs. disabled vs. readonly

- **`required`** — form rejects submission without a value.
- **`disabled`** — field unavailable in this context.
- **`readonly`** — value set; user is told what it is, cannot change it.

### Accessibility

Set `accessibleName` so screen readers announce the field's purpose. UI5 already wires arrow keys and `+` / `-` button labels. The component also exposes the current value as ARIA properties — without an accessible name, the field announcement is anonymous.

### See also

- [SAP Fiori Step Input design guideline](https://experience.sap.com/fiori-design-web/step-input/) — semantic guidance and visual patterns
- [UI5 StepInput web component reference](https://ui5.github.io/webcomponents/components/StepInput/) — full underlying API
- [Slider](?path=/docs/components-slider--docs) — continuous-value alternative
- [Input](?path=/docs/components-input--docs) — bare text/numeric input
