---
"@reltio/design": patch
---

Correct the panel header separator colour

The design binds the panel header's bottom border to
`sapGroup_ContentBorderColor` (`#ffffff`, invisible against the panel's own
fill). UI5 resolves it to `sapGroup_TitleBorderColor` instead — which, after
that token was corrected to `#8f8fcc` on the List page, made the panel draw a
distinct purple-grey line the design does not have.

The correction sits in `utils/applyComponentCorrections.ts` and overrides only
the colour. It repeats UI5's own three selectors because the collapsed and
fixed rules hardcode the token while the default rule reads
`--_ui5_panel_default_header_border`, and because
`:host([collapsed]) .ui5-panel-header` outranks a bare `.ui5-panel-header` — a
shorter rule would lose even though addCustomCSS appends after UI5's styles.
Scoping it this way avoids remapping `sapGroup_TitleBorderColor` on the host,
which would inherit into everything nested inside a panel.

Everything else already matched: radius 24 from `sapElement_BorderCornerRadius`,
the `sapGroup_TitleBackground` fill, no drop shadow (the panel was already flat,
unlike the card, dialog, menu and dropdowns), and a bold 16px title on
`sapGroup_TitleTextColor`.

One 1px residual remains: the collapsed panel measures 45 against the design's
44, because the expand/collapse button forces the header's content box to 44
and the border adds the last pixel. The fixed-header variant, which has no
toggle, already lands on 44. With the separator now white the difference is not
visible, so it is left as is rather than shrinking the button.
