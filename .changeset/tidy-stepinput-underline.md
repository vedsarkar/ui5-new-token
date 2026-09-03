---
"@reltio/design": patch
---

Restore the Step Input underline

Every field component in Figma carries an `Underline` element. On Input, Multi
Input, Multi ComboBox and Select it is hidden — which is why the seven
`sapField_*BackgroundStyle` bar tokens were cleared globally in an earlier
pass. On **Step Input** it is visible, so that pass left it without an edge.

`global.css` restores it as a bottom border, per state and in the design's
colours: 1px `sapField_BorderColor` at rest, 1px `sapField_Hover_BorderColor`
on hover, 1px `sapField_ReadOnly_BorderColor` when read-only, 2px
`sapField_InvalidColor`, 2px `sapField_WarningColor`, 1px
`sapField_SuccessColor` and 2px `sapField_InformationColor` for the value
states — keeping SAP's width convention, which the design also follows.

A border rather than restoring the bar tokens: UI5 applies those to the host
only for read-only and the value states, because the regular and hover bars
live in `Input.css` and `TextArea.css`, which Step Input does not import. The
token route would have covered four states and needed explicit rules for the
other three. A border covers all seven uniformly, follows the 4px radius, and
does not compete with the `background` shorthands the value-state rules set.
UI5's Horizon theme sets `--_ui5_step_input_border_style: none`, so the host
has no border of its own to conflict with.

Active is deliberately excluded: the design replaces the underline with a full
2px `sapField_Active_BorderColor` ring, which UI5 already draws on focus.

Verified that Input, ComboBox and Select remain underline-free, and the 36px
height is unchanged because the host is `border-box`.
