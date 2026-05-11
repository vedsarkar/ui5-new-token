# Popover

`Popover` is the SAP Fiori floating overlay anchored to a target element, re-exported from `@ui5/webcomponents-react/Popover` as the canonical Reltio entry point. Use it for context menus, action sheets, secondary detail panels, filter pickers, and similar lightweight overlays that should appear next to a trigger and disappear when the user clicks away.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Popover`. The Reltio layer adds curation (this is the endorsed anchored-overlay surface), pinned versioning, and Reltio-specific guidance.

### Anchoring — `opener` is required

The popover positions itself relative to a target element passed via `opener`. There are two ways to pass it:

```tsx
// 1. By DOM `id` (most common)
<>
  <Button id="filter-trigger" onClick={() => setOpen(true)}>Filters</Button>
  <Popover open={open} opener="filter-trigger" onClose={() => setOpen(false)}>
    {/* body */}
  </Popover>
</>

// 2. By HTMLElement reference
<Popover open={open} opener={triggerRef.current} onClose={() => setOpen(false)} />
```

Without `opener`, the popover renders at the top-left corner of the viewport. Always set it.

### Modal vs. non-modal

| `modal` | Behavior | Use for |
|---|---|---|
| `false` (default) | A click anywhere outside the popover dismisses it. The page behind stays interactive. | Context menus, quick filter panels, ephemeral previews. |
| `true` | Adds a backdrop, traps focus inside the popover, blocks interaction with the page behind. | Confirmation flows that need explicit acknowledgement, multi-step pickers (entity selection, advanced filter builder). |

For most popovers, leave `modal={false}` — modal popovers feel like dialogs and should usually be promoted to a real `Dialog` (not yet endorsed) instead.

### Placement & alignment

`placement` (`Top`, `Bottom`, `Start`, `End`) and `horizontalAlign` (`Start`, `End`, `Center`, `Stretch`) decide where the popover lands relative to the opener. The Popover automatically flips to the opposite side if there isn't enough viewport space, so `placement="Bottom"` is a reasonable default.

For Reltio MDM screens:
- **Toolbars / page header actions** → `placement="Bottom"` (popover hangs below the action)
- **Side rail / inline-edit triggers** → `placement="End"` (popover appears to the right of a left-rail item, or at the start in RTL)
- **Footer / bottom-pinned actions** → `placement="Top"` (popover floats above the trigger)

### Header & footer slots

Pass `headerText` for a simple title bar, or use the `header` slot for richer content (title + actions). Use the `footer` slot for confirmation buttons (`Apply`, `Cancel`).

```tsx
<Popover open headerText="Filter by source" opener="filter-trigger">
  {/* body */}
  <div slot="footer" style={{ display: "flex", gap: 8, padding: 8 }}>
    <Button design="Transparent">Cancel</Button>
    <Button design="Emphasized">Apply</Button>
  </div>
</Popover>
```

### Initial focus

Set `initialFocus` to the `id` of the element that should receive focus when the popover opens. Especially important for keyboard users — without it, the popover root takes focus and the user has to tab into the body manually.

### Accessibility

- Set `accessibleName` (or `accessibleNameRef`) so screen readers announce the popover purpose when it opens.
- Always wire `onClose` to flip your `open` state — without it, the popover gets stuck open after a click-outside.
- For long popover bodies, ensure scrollable regions are reachable via keyboard (the popover itself handles arrow-key trap correctly by default).

### See also

- [SAP Fiori Popover design guideline](https://experience.sap.com/fiori-design-web/popover/) — semantic guidance and visual patterns
- [UI5 Popover web component reference](https://ui5.github.io/webcomponents/components/Popover/) — full underlying API
