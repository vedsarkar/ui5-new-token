---
"@reltio/design": patch
---

Dim disabled Tree and Menu items to SAP's own disabled opacity

UI5 dims disabled list-family items to 0.5 through a private
`--_ui5-listitembase_disabled_opacity`, hardcoded in its base theme. SAP's
public `sapContent_DisabledOpacity` is 0.4, and every other component reads it —
Avatar, Button, Link and RadioButton all do — so UI5's list items are the
outlier against its own token.

The design agrees with the token: all six disabled variants on the Tree page and
both on the Menu page sit at 0.4. `public/global.css` now points the private
variable at the public token for `ui5-tree-item` and `ui5-menu-item`.

Scoped to those two tags because they are the ones the design models.
`ListItemBase.css` backs plain list items too, so `ui5-li` and friends still dim
to 0.5 — the List page has no disabled variant to check against, and this is one
line to extend if it gains one.

Everything else on the Tree page already matched, including two things worth
recording: level-1 rows take `sapList_Background_Light` while level 2 and deeper
take `sapList_AlternatingBackground`, and UI5 already does that tint by depth
rather than by row parity. Row height, the 16px title, the white separator, and
the hover, active, selected and selected-hover fills were all correct.
