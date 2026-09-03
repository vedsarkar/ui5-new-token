---
"@reltio/design": patch
---

Round Side Navigation items to the design's 8px

The design rounds navigation items, sub-items and groups to 8px. UI5's Horizon
theme sets `--_ui5_side_navigation_item_border_radius` to `0.375rem` (6px), so
`global.css` re-points it at `0.5rem`.

Everything else on the page already matched: the 256px expanded rail on
`sapList_Background`, 44px items, the hover, pressed, selected and
selected-hover fills, nav-item text in `72-SemiboldDuplex` against child items
in the regular face, and group titles on `sapContent_LabelColor`.
