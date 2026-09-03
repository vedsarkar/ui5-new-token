---
"@reltio/design": patch
---

Give the Shell Bar its bottom border and stop over-pilling nested buttons

**Shell Bar bottom edge.** The design draws a 1px bottom border in
`sapShell_BorderColor` (`#e3e3f2`). UI5 draws the same inset line but reads
`sapPageHeader_BorderColor`, which is `#ffffff` here, so the bar had no visible
edge against the page. `global.css` re-declares the shadow with the design's
token rather than remapping `sapPageHeader_BorderColor`, which would inherit
into any page header rendered below the bar.

**Narrowed the nested-button pill radius.** The Message Strip correction
declared `--sapButton_BorderCornerRadius: _Max` on every button's `:host`,
which reached buttons whose owning component sets a deliberately different
radius. The Shell Bar's icon buttons resolve
`--_ui5_shellbar_button_border_radius` from that same token and the design
specifies 8px for them, so the blanket rule turned them into capsules. The
correction is now scoped to `.ui5-message-strip-close-button`, which was the
only case it was added for.

Verified after the change: shell icon buttons are back to 8px, the shell image
button keeps its circular 50%, the Message Strip close button is still a pill,
and top-level buttons are unaffected.

Everything else on the page already matched: the 52px bar on `sapShellColor`,
the hover/active/toggled shell-button fills, the search field on
`sapShell_InteractiveBackground` at radius 18 with its italic placeholder, and
the branding text on `sapShell_SubBrand_TextColor`.
