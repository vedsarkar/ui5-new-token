---
"@reltio/design": patch
---

Pill the segmented button's inner corners, and correct the Time Picker

**Segmented button (all usages).** Items were pilled on their outer corners
only — 32/8/8/32 on the first item, 8px all round in the middle — because a
segmented item's base radius comes from its own
`sapButton_Segment_BorderCornerRadius`, and the group applies
`sapButton_BorderCornerRadius` to the first and last items' outer corners alone.
Pilling only the latter left every item with one squared-off end. The design
draws the group as one pill outline with the selected item as a complete pill
inside it, so `scripts/build-tokens.mjs` now remaps the base radius too.
Unselected items carry no fill or border, so the selected item is the only
visible change.

**Time Picker.** Three corrections in `utils/applyComponentCorrections.ts`:

- Clock numbers are Bold. UI5 sets `--sapFontFamily` on them; since the SAP 72
  weights ship as separate families rather than weights of one family,
  `font-weight` would do nothing and the family has to be swapped to
  `--sapFontBoldFamily`.
- The hour, minute and second toggles and the AM/PM switch are pills. They
  render inside `ui5-time-selection-clocks`' shadow root, where the
  document-level pill remap cannot match them — the same cause as the Message
  Strip close button.
- OK and Cancel likewise, one shadow root further out in `ui5-time-picker`.

Everything else already matched: the dropdown's 16px radius and absent shadow,
the footer's fill and border colour, the clock's 44px number circles, and the
hover and selected treatments, which UI5 draws from `sapList_Hover_Background`
and the `sapButton_Selected_*` trio — exactly the tokens the design binds.

Scoped rather than declared on every button, because a blanket pill is wrong
elsewhere: the Shell Bar's icon buttons resolve their radius from the same token
and the design asks for 8px there.
