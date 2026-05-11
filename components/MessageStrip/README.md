# MessageStrip

`MessageStrip` is the SAP Fiori inline notification bar, re-exported from `@ui5/webcomponents-react/MessageStrip` as the canonical Reltio entry point. Use it for context-anchored messages — form validation feedback, MDM workflow status, batch-job result summaries, page-level warnings — that should stay visible inside the page flow rather than appear as a transient toast.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/MessageStrip`. The Reltio layer adds curation (this is the endorsed inline-message surface), pinned versioning, and Reltio-specific guidance.

### When to use which `design`

The `design` prop is **semantic** — it sets both the color and the default icon, and screen readers announce the matching role. Pick by meaning, not by visual preference.

- **`Information` (default)** — Blue. Neutral context, "FYI" messages, non-blocking guidance.
- **`Positive`** — Green. Success outcomes — "Entity saved", "Merge completed", "Validation passed".
- **`Warning`** — Amber. Attention needed but the user can proceed — "3 records pending review", "Source priority differs from default".
- **`Negative`** — Red. Failure or blocker — "Save failed", "Merge conflicts detected", "API unavailable".
- **`ColorSet1`/`ColorSet2`** — Custom palette. Reserved for branding-specific cases; avoid in MDM screens unless a specific guideline applies.

Don't pick `Negative` for "important but not bad" messages — that train screen-reader users to ignore real errors. Use `Warning` for "needs attention", `Negative` only for "something went wrong".

### Inline notification vs. toast vs. dialog

- **`MessageStrip`** — message stays anchored to the relevant page region. User can keep working with surrounding content visible. Ideal for form-field-level validation, section-level status, page-level summaries.
- **Toast** (not in this set) — transient, auto-dismissing notification overlaid in a corner. Use for confirmations of an action that just completed (`"Saved"`, `"Copied to clipboard"`).
- **`MessageBox`** (not yet endorsed) — modal interruption. Use only for hard blockers requiring acknowledgment (delete confirmation, destructive operation).

### Dismissible vs. persistent

By default, `MessageStrip` shows a close button in the top-right and emits `onClose`. Decide intentionally:

- **Persistent** (`hideCloseButton`) — for state that the user cannot dismiss because it represents an ongoing condition (a draft that hasn't been saved, a record that needs validation). Hiding the close button signals "this won't go away until the underlying state changes".
- **Dismissible** (default) — for one-shot notifications the user can acknowledge and move on (success messages, optional warnings).

Always wire `onClose` when dismissible — track the dismissal in app state so the strip doesn't reappear on every render.

### Custom icon

Override the design's default icon via the `icon` slot. Pair with a side-effect import of the icon name. Use sparingly — a custom icon weakens the screen-reader role mapping that `design` provides.

```tsx
import "@ui5/webcomponents-icons/dist/sys-help-2.js";
import { Icon } from "@reltio/design/components";

<MessageStrip design="Information" icon={<Icon name="sys-help-2" />}>
  Need help? Check the documentation.
</MessageStrip>
```

To suppress the default icon entirely (text-only strip), pass `hideIcon`.

### See also

- [SAP Fiori Message Strip design guideline](https://experience.sap.com/fiori-design-web/message-strip/) — semantic guidance and visual patterns
- [UI5 MessageStrip web component reference](https://ui5.github.io/webcomponents/components/MessageStrip/) — full underlying API
