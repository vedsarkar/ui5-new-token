# ResponsivePopover

`ResponsivePopover` is the SAP Fiori adaptive overlay, re-exported from `@ui5/webcomponents-react/ResponsivePopover` as the canonical Reltio entry point. It renders as a `Popover` anchored to a trigger on desktop and falls back to a `Dialog` on phones — use it for menus, pickers, contextual filters, and lightweight forms that must work on both form factors with a single API.

There is no Reltio wrapping around the underlying UI5 component: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/ResponsivePopover`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Opener reference

Like `Popover`, `ResponsivePopover` needs a reference to the trigger element via the `opener` prop. Capture the trigger DOM node with a ref and pass it once it exists:

```tsx
const openerRef = useRef<HTMLElement | null>(null);
const [open, setOpen] = useState(false);

<Button ref={(node) => (openerRef.current = node)} onClick={() => setOpen(true)}>
  Open
</Button>
<ResponsivePopover open={open} opener={openerRef.current ?? undefined} onClose={() => setOpen(false)}>
  ...
</ResponsivePopover>
```

### When to use ResponsivePopover vs Popover vs Dialog

- **ResponsivePopover** — contextual content (menu, picker, mini form) that must adapt to phone layouts.
- **Popover** — contextual content for desktop-only flows. No phone fallback.
- **Dialog** — modal that always blocks the page on every form factor.

### Placement

`placement="Bottom" | "Top" | "Start" | "End"` controls anchoring relative to the trigger. The popover automatically flips when there is not enough room on the chosen side.

### See also

- [SAP Fiori ResponsivePopover guideline](https://experience.sap.com/fiori-design-web/responsive-popover/)
- [UI5 ResponsivePopover reference](https://ui5.github.io/webcomponents/components/main/ResponsivePopover/)
