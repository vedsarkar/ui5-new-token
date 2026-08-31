---
"@reltio/design": patch
---

Correct the Calendar surface and the Card header padding

Two component corrections in `global.css`, both cases where UI5's `sap_horizon`
theme diverges from the design and no `--sap*` token reaches the result.

**Calendar** — the card and its other-month cells render opaque white where the
design uses the translucent `#fcfeff80`. This is an unmapped pair rather than a
stale token: the design binds `sapList_Background_Light`, which has no
counterpart in UI5's theming contract, while UI5 reads `sapList_Background`,
which has no counterpart in the Figma collection. The remap is scoped to
`ui5-calendar` deliberately — `sapList_Background` also backs lists, tables and
radio buttons, and whether those follow is a design-system decision. It reaches
the other-month cells too, since DayPicker derives their background from the
same token.

**Card header** — two corrections. The design pads the header 16px on all four
sides; UI5's base theme agrees at a uniform `1rem`, but `sap_horizon` overrides
the shorthand to `1rem 1rem 0.75rem 1rem`, shaving the bottom to 12px and sitting
the content 4px high in its box. Restoring the base value fixes it.

The counter is also a step darker in the design — `sapContent_LabelColor`
(`#566189`) against the subtitle's `sapTile_TextColor` (`#646e97`). UI5 gives
both the same token, so a remap would move the subtitle too, and it already
matches. The counter's element sits in the shadow root but UI5 exposes it as the
`additional-text` part, so a document rule reaches it. This is the CSS Part
fallback rather than a preference: the token layer cannot separate the two.

**Known remaining gap**

The Calendar card is 320x392 against the design's 304x382. UI5 gives every day
cell a 2px margin, making the grid 8x38 where the design is a flush 8x36, and its
weekday row is 32 tall against 46. Both values live on the nested
`ui5-daypicker`'s `:host`, which no document selector reaches — verified by
injecting both overrides with no effect — so this cannot be corrected from the
stylesheet layer. Everything else on the Calendar already matches: 36x46 cells,
`#111727` days, `#eef1f4` weekends, `#566189` labels at 12px, and the `#8809c7`
current-date ring.
