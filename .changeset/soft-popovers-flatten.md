---
"@reltio/design": patch
---

Remove the drop shadow from popovers

The Popover page gives the card a Glass effect and no drop shadow, confirming
directly what the dropdown correction had to infer from a shared surface. UI5
elevated the plain popover with `sapContent_Shadow2`.

Here the shadow really does come from `--_ui5_popover_box_shadow` and
`--_ui5_popover_no_arrow_box_shadow`, so clearing those two on `:host` is
enough — and because the arrow's `::after` reads the same variables, the arrow
flattens with it. This is added to the existing popover entry in
`utils/applyComponentCorrections.ts` alongside the radius re-declaration.

The dropdown and menu entries are still required: those components set
`box-shadow` on the popover's class directly, at a specificity these variables
cannot reach. Verified that Multi ComboBox and Select stay flat.

Radius 16 and the `sapGroup_ContentBackground` fill already matched.
