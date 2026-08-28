---
"@reltio/design": minor
---

Sync SAP Reltio button design tokens with the Hybrid Design System Figma library

Refreshes the `--sapButton_*` token values in `variables.css` to match the Horizon
variable collection (Morning Horizon / Evening Horizon modes). Token **names** are
unchanged, so this needs no code migration — but the change is visible, and every
button in a consuming app picks it up on upgrade.

**SAP Reltio (light) — 28 tokens**

- Pressed and selected surfaces move from opaque white to a 50%-alpha white
  (`#fff` → `#fcfeff80`) across the Standard, Emphasized, Lite, Accept, Reject,
  Attention, Negative, Critical, Success, Neutral, and Information variants. The
  underlying surface now shows through while a button is held.
- `Emphasized` hover is re-tinted: background `#0047ac` → `#1039b6`, border
  `#4563ed` → `#455eed`.
- `Critical` background and border shift from burnt orange to amber
  (`#e76500` / `#ee6611` → `#f79400`).
- Token (chip) surfaces follow the same alpha treatment, and the switch
  handle backgrounds move to `#fcfeff80`.

**SAP Reltio Dark (dark) — 1 token**

- `sapButton_Selected_TokenBorderWidth` `.0625rem` → `.125rem`, matching light.
  Every other dark button token already matched the Evening Horizon mode.

**New token — `sapButton_BorderCornerRadius_Max` (`2rem`, both themes)**

Buttons are now pill-shaped. The Hybrid Design System expresses this with a new
`sapButton_BorderCornerRadius_Max` variable rather than by re-valuing
`sapButton_BorderCornerRadius`, because UI5 shares that token with
`SegmentedButton`, `Token`, `Tag` and the `TabContainer` expand button — all of
which stay at their existing `.5rem` / `.375rem` radii.

`variables.css` therefore ships the new token plus a rule that re-points the
shared token on the button hosts only:

```css
ui5-button,
ui5-toggle-button {
	--sapButton_BorderCornerRadius: var(--sapButton_BorderCornerRadius_Max, 2rem);
}
```

To opt a subtree out of the pill, override `--sapButton_BorderCornerRadius_Max`
on an ancestor — `sapButton_BorderCornerRadius` itself is unchanged at `.5rem`.
