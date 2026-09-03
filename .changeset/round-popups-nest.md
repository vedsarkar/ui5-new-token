---
"@reltio/design": patch
---

Give nested popovers the design's corner radius, and revert the picker icon colour

**Nested popover radius**

`variables.css` already re-points `--_ui5_popup_border_radius` at
`sapPopover_BorderCornerRadius` for `ui5-popover` and `ui5-responsive-popover`,
because UI5's Horizon theme hardcodes `0.5rem`. That rule is a document selector,
so it only matches popovers in the document. A popover UI5 renders **inside
another component's shadow root** never matched it — a limitation the original
change called out explicitly — so the Date Time Picker's dropdown rendered at 8px
against the design's 16.

Re-declaring the variable on `:host` from inside the popover's own shadow root,
through `addCustomCSS`, covers both cases. The document rule stays in place so
the common case still works without the JS. The Date Time Picker's dropdown now
matches the design at 16px, 641px wide, filled `#fcfeff`.

**Revert: the date pickers' icon colour**

The previous release coloured the date pickers' trailing icon
`sapButton_IconColor`, on the strength of the design's Date (Range) Picker
variants showing a blue icon. That was wrong, and this reverts it.

Every variant on that page has its calendar popover visible — they document the
**open** state. The Date Time Picker page separates the two explicitly, with
`Dropdown=False` showing a near-black icon and `Dropdown=True` showing the blue
one. UI5 already implements exactly that: `--_ui5_input_icon_color` is
`sapField_TextColor` at rest and `--_ui5_input_icon_pressed_color` is
`sapButton_Active_TextColor` (`#3254ec`) while open, which was confirmed by
opening the picker and measuring the icon. So the resting icon was correct before
and the override made it wrong.

**Everything else on the page matched**

The Cozy input at 251x36 with a 4px radius and the `sapField_Background` fill,
the 16x16 trailing icon, and the dropdown's `#fcfeff` fill and 641px width.
