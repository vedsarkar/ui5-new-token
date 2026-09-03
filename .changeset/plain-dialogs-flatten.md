---
"@reltio/design": patch
---

Flatten the dialog to match the design — no shadow, no separators, 44px footer

The Dialog had only ever received the popup-radius remap, never a full pass.
Four corrections, all cases where UI5 adds chrome the design does not have.

**Drop shadow** — the design gives the dialog a Figma *Glass* effect and no drop
shadow, as the card does. UI5 applies `sapContent_Shadow3` on `:host`; a document
rule on the host beats that without touching the token, which other components
still use. The dialog sits over a block layer that already separates it from the
page, so it loses less depth here than a card would.

**Header shadow** — UI5 shadows the header with `sapContent_HeaderShadow`, whose
two halves draw a 1px `#d9d9d9` line across the header's bottom edge and a soft
falloff below it. The design has no rule between the title and the content. This
was the last of four separate sources of one hairline, and the only one that
`getComputedStyle` on borders and pseudo-elements did not reveal — it took
sampling the rendered pixels to identify the gradient as a shadow rather than a
border.

**Header separator** — a 1px `#dedee6` `::before`, also absent from the design.
`#dedee6` is a real separator colour the design uses elsewhere (the vertical
divider in the Date Time dropdown), so this is about the dialog specifically.

**Footer height** — the design's footer is 44px with no stroke. UI5's
`border-top: 1px solid sapPageFooter_BorderColor` sits outside the 44px content
box and makes the row 45, the same off-by-the-border the Bar footer had. It
resolves to `#ffffff` on a `#fcfeff` dialog, so dropping it costs nothing
visually. Note `box-sizing: border-box` does not help: the footer has no declared
height, so its 45 is content plus border rather than a fixed box.

Header and footer fills are also set transparent, matching the design, where UI5
gives both a 50%-alpha `#fcfeff` over the dialog's opaque `#fcfeff`.

**Already correct**

The 24px radius — the earlier remap does reach `ui5-dialog`, since it is a
document-level element — the `#fcfeff` fill, the absent border, the 44px header,
the 16px content padding, and the footer's pill buttons at
`#0000cc` and transparent with `#3254ec` text.
