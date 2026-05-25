# Dialog

`Dialog` is the SAP Fiori modal overlay, re-exported from `@ui5/webcomponents-react/Dialog` as the canonical Reltio entry point. Use it for interactions that block the rest of the UI until the user takes a decision: confirmations, destructive-action acknowledgements, blocking forms that require focused attention.

There is no Reltio wrapping around the underlying UI5 component: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Dialog`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Open / close lifecycle

`Dialog` is a controlled component. Pass `open` to render it, listen to `onClose` to react to the dismiss event, and reset `open` to `false` from your state. The component handles the focus trap and ESC key automatically; do not race React state against the `onClose` event.

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onClose={() => setOpen(false)} headerText="Confirm">
  ...
</Dialog>
```

### Header, body, footer

- `headerText` — short single-line title. Required for accessibility.
- Children — the dialog body. Provide your own padding.
- `footer` — typically a `<Bar>` with action buttons on the right (`endContent`). The primary action should use `design="Emphasized"`.

### State

Setting `state="Negative"` adds the SAP semantic accent for destructive or error dialogs (delete entity, irreversible merge, hard failure). Pair with a `Negative`-designed primary button so the visual and the button intent match.

### When to use Dialog vs Drawer vs Toast vs MessageStrip

- **Dialog** — blocks interaction, requires acknowledgement. Few per session.
- **Drawer** — non-blocking side panel for long-form content (entity details, attribute editor). Coexists with the main view.
- **Toast** — transient, non-blocking notification ("Saved"). No buttons.
- **MessageStrip** — inline persistent banner inside a page section.

### Accessibility

Focus moves into the Dialog on open and returns to the trigger on close. The `Escape` key closes the dialog. Use `headerText` (not a placeholder `<h1>` inside children) so screen readers announce the dialog title.

### See also

- [SAP Fiori Dialog guideline](https://experience.sap.com/fiori-design-web/dialog/)
- [UI5 Dialog reference](https://ui5.github.io/webcomponents/components/main/Dialog/)
