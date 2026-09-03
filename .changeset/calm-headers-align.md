---
"@reltio/design": patch
---

Align the calendar header row with the design

The design's header row is a 36px arrow, a 96px month button, a 96px year
button and a 36px arrow, with 8px gaps. UI5's middle button is `6.25rem` (100px),
which pushed the total over the available width and squeezed the arrows to 32.

Narrowing the middle button to the design's `6rem` lets the freed space fall back
to the arrows, so a single value corrects both — arrows land on 36, buttons on 96
and the gaps on 8, without touching the flex basis. Verified by measuring each
element and the gaps between them.

With this the calendar matches the design on every dimension checked: card
**304x382**, header **44**, arrows **36**, month and year buttons **96**, weekday
row and week rows **288x46**.

Colours were re-verified in the same pass, after the 59-token palette shift
landed earlier: header buttons and arrows now read `#3254ec`
(`sapButton_Lite_TextColor`), weekday names and week numbers `#566189`, the
current-date ring `#8809c7`, the selected day `#dbe7ee`, and a selected range
`#ecf1fb` with a `#0000cc` edge. All 59 calendar and legend tokens compared
against Figma matched with no drift.
