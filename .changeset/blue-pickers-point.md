---
"@reltio/design": patch
---

Colour the date pickers' calendar icon with the design's interactive blue

The design draws the trailing calendar icon in `sapButton_IconColor`
(`#3254ec`). UI5 binds it to `sapField_TextColor`, the near-black used for the
field's own text, so it reads as static content rather than something you can
click.

`--_ui5_input_icon_color` resolves on the picker host, but overriding it from the
document has no effect — measured, not assumed — and the icon element lives in
the picker's shadow root where no document selector reaches it. Corrected through
`addCustomCSS` in `utils/applyComponentCorrections.ts`, whose rule lands inside
that shadow root and matches `.inputIcon` directly.

Scoped to `ui5-date-picker` and `ui5-daterange-picker` rather than every
`.inputIcon` consumer: Input, Select, ComboBox and the other pickers share the
class, and whether the design wants the blue on all of them belongs with those
pages.

**Everything else on the page already matched**

The Cozy input at 36px tall with a 4px radius, the `sapField_Background` fill,
the absence of a border — the design specifies no stroke, and UI5 has none on any
element or pseudo-element — and the italic placeholder in
`sapField_PlaceholderTextColor`. The icon geometry agrees too, at 16x16 with a
14x16 glyph.

The calendar popover inside the picker is 304x382 with 288x46 rows and a 36/96/96/36
header, all matching, because it is the same Calendar corrected earlier.

**Not matched, for want of a capability**

The design offers **Two-Month** pickers in horizontal and vertical orientations.
UI5's `DatePicker`, `DateRangePicker` and `Calendar` expose no month-count
property, so there is nothing to configure — this is a capability gap rather than
a styling one, and would need a Reltio component to close.
