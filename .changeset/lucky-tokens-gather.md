---
"@reltio/design": minor
---

Sync the full SAP Reltio token surface with the Hybrid Design System Figma library

Diffed all 925 colour and numeric `sap*` variables in the Figma **Horizon**
collection (Morning Horizon / Evening Horizon modes) against both token files.
Token **names** are unchanged, so no code migration is needed, but the visual
result changes across most components.

**SAP Reltio (light) — 87 tokens**

- **Translucent surfaces.** Roughly 55 tokens move from opaque white to a
  50%-alpha near-white (`#fff` → `#fcfeff80`), letting the page tint show
  through. This covers field focus/hover/help backgrounds, every
  `sapIndicationColor_*` active and selected background, infobar, list header and
  footer, object header, page header and footer, shell and shell navigation,
  slider handles, tab, tile overlays, toolbar, and the legend working background.
- **Corner radii.** `sapGroup_BorderCornerRadius` `.75rem` → `1.5rem` and
  `sapPopover_BorderCornerRadius` `.5rem` → `1rem`, in both themes. Panels,
  cards, groups and popovers get noticeably rounder.
- **Critical amber.** `sapCriticalColor`, `sapProgress_Value_Critical*` and
  `sapTab_Critical_*` shift from burnt orange (`#e76500` / `#ee6611`) to amber
  `#f79400`, matching the button `Critical` change.
- **Page and block-layer surfaces.** `sapBackgroundColor` `#f5f5fa` → `#f1f9ff`,
  `sapShell_Background` gains alpha (`#f5f5facc`), and `sapBlockLayer_Background`
  moves from opaque black to a translucent slate `#12517533`, so modal overlays
  now tint rather than black out.
- **White separators.** `sapList_BorderColor`, `sapGroup_ContentBorderColor` and
  the page header/footer border colours become `#ffffff`, reading as light
  dividers against the new tinted backgrounds.
- **Charts.** `sapChart_OrderedColor_1`–`4` re-tuned for contrast.

**SAP Reltio Dark — 5 tokens**

`sapChart_OrderedColor_1`–`3` re-tuned, plus the two shared radii above. Every
other dark token already matched the Evening Horizon mode.

**Not mapped**

22 Figma variables have no counterpart in the UI5 theming contract and are
deliberately left out rather than emitted as CSS nobody reads — `sapPrimary1`–`7`,
`sapBackgroundColorDefault`, `sapBaseColor_Background`,
`sapGroup_ContentBackground_Surface`, `sapList_Background_Dark` / `_Light`,
`sapList_HighlightColor`, `sapField_BorderCornerRadius_Max`,
`sapBlockLayer_BackgroundBlur`, `sapContent_LineHeight_*Text`,
`sapContent_TextShadowColor*`, and `sapShell_BackgroundPatternColor`. Several
belong to the newer AI, Joule and Wizard pages, which were out of scope for this
sync.

Font-family and font-weight variables were also excluded: Figma models them as
separate family/style values that do not map onto the CSS font-stack strings the
token files carry.
