---
"@reltio/design": patch
---

Remove the drop shadow from dropdown popovers

The Multi ComboBox design page gives its dropdown a Glass effect and no drop
shadow, which answers the question the menu correction left open — dropdowns do
follow the same treatment as the card, dialog and menu. UI5 elevated them with
`sapContent_Shadow1`.

The override names the popover's class, because `Suggestions.css` and
`Select.css` set `box-shadow` on it directly rather than through the popover's
`--_ui5_popover_*_box_shadow` variables, so overriding those has no effect.
Each host renders its popover in its own shadow root, hence one entry per tag
in `utils/applyComponentCorrections.ts`.

`.ui5-suggestions-popover` is genuinely shared — ComboBox and Input carry the
identical class — so this is one surface rather than four separate decisions.
Confirmed against the Menu and Multi ComboBox pages; ComboBox, Input, Multi
Input and Select follow because they are the same surface, not because their
own pages were checked.

Everything else on the page already matched: the 36px field on
`sapField_Background` at radius 4, the focused fill with its 2px
`sapField_Active_BorderColor` ring, 26px tokens at radius 6 with a 1px
`sapButton_TokenBorderColor` border, and the popover's radius 16 on
`sapGroup_ContentBackground`.
