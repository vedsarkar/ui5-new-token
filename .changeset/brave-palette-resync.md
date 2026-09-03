---
"@reltio/design": minor
---

Resync every light-mode colour token with Figma

The Progress Indicator page surfaced seven drifted tokens carrying shifts I had
already fixed three times in other families — positive `#3b9564`→`#30915c`,
critical, neutral. Rather than patch a fourth family, all **853** `sap*` colour
variables in Figma's Horizon collection were diffed against the repo.

**110 light-mode values had drifted.** They are almost entirely one palette
revision propagating through every family that references the semantic colours:

- Positive: `#3b9564`→`#30915c` and `#2a6d47`→`#1e663e` across Accept/Success
  buttons, chart, tab, indication and progress tokens
- Negative: `#b40c0c`→`#ad1414` across Reject buttons, badge, indication and tab
- Critical: `#be520e`→`#b73e0b` and `#f79400`→`#f56200` across Attention and
  Critical buttons, tabs and progress
- Warning: `#ee6611`→`#b65e0c` across chart, indication and shell categories
- Neutral greys: `#9da6c5`→`#637ac5`, `#9ca5c4`→`#5d6892`/`#566189` across
  track, scrollbar, rating and non-interactive icon tokens
- Purple: `#992fda`→`#75339e`; indication blue `#4569f9`→`#3659e2`
- Plus `sapPageFooter_BorderColor` `#ffffff`→`#7e8bc4`

Dark mode was checked family by family throughout and matched every time, so
only light is affected — consistent with light being the mode under active
revision.

Three differences are deliberately not applied. `sapAvatar_Lite_Background` and
`sapAvatar_Lite_BorderColor` are `transparent` here against Figma's `#ffffff00`;
both are fully transparent and the CSS keyword is clearer. `sapBlockLayer_Opacity`
is a unitless number in CSS, which Figma cannot express, so it stores a colour
whose alpha carries the value — not comparable, and worth raising with the
design team.

Thirty-one Figma variables have no repo counterpart (`sapPrimary1`–`7`,
`sapHC_*`, `sapList_Background_Light`/`_Dark`, the text-shadow colours). UI5
does not read them, so there is nothing to add; `sapList_Background_Light` is
already mapped onto `sapList_Background`.

Verified after the sweep: Progress Indicator matches on all five value states,
and Message Strip, Panel, List and the semantic Button designs are unchanged
apart from the corrected values.
