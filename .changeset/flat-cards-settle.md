---
"@reltio/design": patch
---

Remove the card's drop shadow — the design specifies none in either state

The design gives the card no drop shadow. Resting carries a Figma **Glass**
effect (`sapGlass_Background`, radius 55) and hover carries no effect at all,
just a 50%-alpha fill. UI5 instead applies `sapContent_Shadow0` at rest and the
heavier `sapContent_Shadow2` on hover.

Figma's `GLASS` effect type has no CSS equivalent, and the resting fill is opaque
so a `backdrop-filter` would render nothing — which leaves matching the design's
*absence* of a shadow as the closest achievable result. The card reads its
elevation through its own `--_ui5_card_box_shadow` and
`--_ui5_card_hover_box_shadow` rather than the shadow token directly, so this
stays scoped to the card: `sapContent_Shadow0` keeps working everywhere else,
which was verified.

**The design system has introduced a Glass effect family**

Alongside the four standard `sapContent_Shadow*` elevations, the library now has
three glass styles — `sapGlass_Background`, `sapContent_Glass_Button` and
`sapContent_Glass_Avatar`. None of them exist in our token files, and nothing in
the repo references them. They have no web representation today; when they get
one, the `ui5-card` rule in `global.css` is the place to revisit.

**Everything else on the card already matched**

Radius 16, fill `#fcfeff`, transparent border, 16px header padding, and the
title, subtitle and counter colours. All 25 card and tile tokens compared against
Figma matched with no drift — the earlier palette shift had already carried
`sapTile_TextColor` to `#5d6892`.

**Not matched, for want of a component**

UI5 ships only `Card` and `CardHeader`. The design's Card Footer, Media Block,
Card Badge (21 colour variants), Numeric Header, Extended Header and Banner have
no counterpart in the endorsed set and would need building as Reltio business
components.

One narrower difference is left in place: on hover the design makes the whole
card 50%-alpha, where UI5 keeps the card opaque and tints the header
`sapTile_Hover_Background`. The two read very similarly against the page tint, so
it is recorded rather than corrected.
