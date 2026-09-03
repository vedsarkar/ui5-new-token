---
"@reltio/design": patch
---

Remove the bottom indicator bar from input fields

The seven `sapField_*BackgroundStyle` tokens each carried a CSS `background`
shorthand that painted a bar along the bottom edge of a field — 1px at rest,
on hover and (dashed) when read-only, and 2px for each value state. The design
has no such bar in any state, so all seven are now `none`.

Two things made these tokens stale rather than merely different. Their colours
had never been through the Reltio customisation pass, so they rendered SAP's
stock palette inside Reltio-themed fields — `#e90b0b` where Reltio's invalid
colour is `#ec2525`, and a bright `#0070f2` where the information colour is
`#0000cc`. And the platform's own hand-written `TextArea` already ignored them,
styling value states with the background-colour tokens alone.

UI5 applies the shorthand and then re-applies `background-color`, so the tint
survives: every field keeps its fill (`#f0f5f9` at rest, `#ffe5f3` invalid,
`#fff5cc` critical, `#f7ffe5` positive, `#e3faff` information, `#e3eaf4`
read-only) and value states keep their 1px inset ring, which already matched
the design's effect styles exactly. Affects Input, ComboBox, DatePicker,
Select and MultiInput, which share UI5's field styles.
