---
"@reltio/design": patch
---

Correct Tag height and large-size text to match the design

`public/global.css` now overrides three of UI5's internal Tag variables.

**Height.** The design's chip is 22px tall, 28px at `size="L"`; UI5 rendered 24
and 30. Both agree on 3px vertical padding around the line box — the difference
is the border model. Figma's 1px stroke sits inside the frame, a CSS `border`
adds outside the padding box, so identical numbers total 22 there and 24 here.
Trading 1px of internal padding for the correct outer height, since outer height
is what neighbouring content sees.

**Large text.** `size="L"` now renders 22px instead of 20px. The 24px line box
is unchanged, so this does not affect the height above.

Every colour already matched, including three values from the recent palette
sweep — `sapNeutralBorderColor`, `sapButton_Critical_Background` and
`sapButton_Success_Background`. Verified across the base, hover, active,
Positive, Negative, Critical and Information states plus both sizes.
