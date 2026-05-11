# SplitButton

`SplitButton` is the SAP Fiori dual-action button — a main click target plus a small arrow that opens a related menu — re-exported from `@ui5/webcomponents-react/SplitButton` as the canonical Reltio entry point. Use it when one action is clearly primary but secondary variants should be discoverable without crowding the toolbar — "Save / Save as draft / Save and continue", "Approve / Approve with note / Approve later".

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/SplitButton`. The Reltio layer adds curation (this is the endorsed split-action surface), pinned versioning, and Reltio-specific guidance.

### SplitButton vs. Button vs. Menu

- **`SplitButton`** — One primary action with several closely-related variants. Clicking the main half performs the primary action; clicking the arrow opens the menu.
- **`Button`** — Single action with no variants.
- **`Menu` on a `Button` (kebab / overflow)** — Several actions of similar importance; the menu opens on any click.

If the secondary actions are not variants of the same primary action (e.g. "Save" and "Cancel"), they belong in separate buttons — not as menu items of a `SplitButton`.

### Two handlers — `onClick` vs. `onArrowClick`

```tsx
<SplitButton
  icon="save"
  onClick={() => save()}              // main half — perform the primary action
  onArrowClick={() => openMenu()}     // arrow half — open the variant menu
>
  Save
</SplitButton>
```

The `onClick` handler only fires on the main label half. The `onArrowClick` handler only fires on the small arrow. Wire both.

### Pairing with `Menu` for the dropdown

UI5 does not auto-render the menu — you pass `onArrowClick`, manage the menu's `open` state, and attach a `Menu` with the split button as `opener`:

```tsx
const splitRef = useRef<HTMLElement>(null);
const [open, setOpen] = useState(false);

<SplitButton ref={splitRef} onArrowClick={() => setOpen(true)}>
  Save
</SplitButton>
<Menu
  opener={splitRef.current ?? undefined}
  open={open}
  onClose={() => setOpen(false)}
>
  <MenuItem text="Save" />
  <MenuItem text="Save and continue" />
  <MenuItem text="Save as draft" />
</Menu>
```

Place the primary action **first** in the menu, even though the user can already trigger it from the main half — keyboard users and screen-reader users navigate the menu independently and expect the primary action to be reachable.

### `design` — semantic + style

Same vocabulary as `Button`: `Default`, `Emphasized`, `Positive`, `Negative`, `Attention`, `Transparent`. Use `Emphasized` for the single primary action of a form or dialog; reserve `Negative` for destructive primary actions (Delete and variants).

### Accessibility

Set `accessibleName` (or rely on the text content) so screen readers announce the primary action. UI5 already handles the arrow's accessible name (e.g. "More actions"). For icon-only main half, set `accessibleName` explicitly.

### See also

- [SAP Fiori Split Button design guideline](https://experience.sap.com/fiori-design-web/split-button/) — semantic guidance and visual patterns
- [UI5 SplitButton web component reference](https://ui5.github.io/webcomponents/components/SplitButton/) — full underlying API
- [Button](?path=/docs/components-button--docs) — single-action variant
