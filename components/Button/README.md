# Button

`Button` is the SAP Fiori push-button, re-exported from `@ui5/webcomponents-react/Button` as the canonical Reltio entry point. Use it for every clickable action in Reltio applications — primary form submission, confirmations, destructive actions, secondary controls, and icon-only utilities.

There is no Reltio wrapping or default override around the underlying UI5 component: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Button`. The Reltio layer adds curation (this is the endorsed surface for product apps), pinned versioning (a single Reltio release pins the matching UI5 version), and richer documentation (the stories on this page cover edge cases the SAP-side library leaves uncovered).

### When to use which `design`

- `Default` — neutral action that does not stand out. Cancel, secondary toolbar buttons.
- `Emphasized` — the single primary action of a form, dialog, or page. There should be at most one per visible surface.
- `Positive` — a confirmation that completes a positive workflow (Approve, Accept, Activate).
- `Negative` — a destructive action (Delete entity, Reject merge). Always pair with a confirmation dialog for irreversible operations.
- `Attention` — a non-destructive action that needs the user's attention (Review changes, Resolve conflicts).
- `Transparent` — a low-emphasis action used inside toolbars or composite controls where chrome should stay minimal.

### Icon-only buttons require an accessible name

When `text` (children) is omitted and only `icon` is set, you **must** provide both `accessibleName` and `tooltip`. Without `accessibleName` the button is unreadable to screen readers; without `tooltip` sighted users cannot discover the action. The `IconOnly` story below demonstrates the correct pattern.

### Loading state

Set `loading` to display the spinner. Use `loadingDelay` (default `1000`ms) only if you want to suppress the indicator for very fast operations. For Reltio MDM workflows where the button performs a server roundtrip, prefer `loadingDelay={0}` so the user sees immediate feedback.

### Form submission

`type="Submit"` makes the button submit the closest enclosing `<form>` (or, with `form="formId"`, a form anywhere in the document). Use this instead of attaching `onClick` handlers when the action represents the form's primary submit, so native form validation and accessibility behaviors apply.

### See also

- [SAP Fiori Button design guideline](https://experience.sap.com/fiori-design-web/button/) — semantic guidance for choosing variants
- [UI5 Button web component reference](https://ui5.github.io/webcomponents/components/Button/) — full underlying API
