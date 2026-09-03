---
"@reltio/design": patch
---

Remove the drop shadow from the menu card

The design gives the menu card a Glass effect and no drop shadow — the same
treatment already applied to the card and the dialog. UI5 elevated it with
`sapContent_Shadow1`.

As with the card, Figma's GLASS type has no CSS equivalent, and the menu's
resting fill is the opaque `sapGroup_ContentBackground`, so a backdrop-filter
would render nothing. Matching the design's absence of a shadow is the closest
achievable result.

The correction lives in `utils/applyComponentCorrections.ts` because `Menu.css`
sets `box-shadow` directly on its popover inside the menu's shadow root, where
no document stylesheet reaches. It is scoped to the menu; whether dropdowns
should lose their shadow is a question for their own design pages.

Everything else on the page already matched: radius 16, the
`sapGroup_ContentBackground` fill, 44px items, and the hover, pressed,
selected and selected-hover fills.
