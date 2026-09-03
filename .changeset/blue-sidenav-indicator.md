---
"@reltio/design": patch
---

Colour the Side Navigation selection indicator from the design's token

The design's 3px bar at the inline start of a selected navigation item binds
`sapList_HighlightColor`. UI5 already draws exactly that bar — same geometry,
same background-gradient technique, so it is clipped by the item's corners for
free — but reads `sapHighlightColor` (`#0000cc`) instead of the design's
`#3254ec`.

`sapList_HighlightColor` is new to the token files (`#3254ec` light,
`#4db1ff` dark); it was one of the Figma variables with no repo counterpart,
because nothing in UI5 consumes it. `global.css` restates the selected and
selected-hover background shorthands so both indicators read it.

Both shorthands are restated in full rather than remapping `sapHighlightColor`
on the item, which would inherit into everything nested inside it. The
trade-off is that the geometry is pinned in `global.css`, so those two entries
need re-checking on a UI5 upgrade.
