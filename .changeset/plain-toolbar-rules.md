---
"@reltio/design": patch
---

Correct the Toolbar's fill, bottom rule and button corners

UI5's Toolbar reads a different pair of tokens than the design binds, and both
diverge:

- **Fill** — the design uses `sapGroup_TitleBackground` (opaque `#fcfeff`); UI5
  uses `sapList_HeaderBackground` (`#fcfeff80`), so the toolbar rendered
  see-through.
- **Bottom rule** — the design uses `sapGroup_TitleBorderColor` (`#8f8fcc`); UI5
  uses `sapGroup_ContentBorderColor` (`#ffffff`), so the rule was invisible.

This is the mirror image of the Panel header correction: there the design wanted
`sapGroup_ContentBorderColor` where UI5 used `sapGroup_TitleBorderColor`. The two
components have the pair swapped, so neither can be fixed by changing a token
value — both need a component-scoped rule. `public/global.css` now sets the two
properties on `ui5-toolbar` directly rather than remapping UI5's tokens inside
it, since `sapList_HeaderBackground` means something to a list header and a
table nested in a toolbar would inherit the remap.

Toolbar buttons are also pills in the design but rendered at the stock 0.5rem.
`ui5-toolbar-button` renders its `ui5-button` in its own shadow root, out of
reach of the document-level remap, so the radius is set from inside that root in
`utils/applyComponentCorrections.ts` — the third instance of this pattern after
the Message Strip close button and the Time Picker.

The separator's `sapToolbar_SeparatorColor`, the 44px height, the absent shadow,
and the buttons' own fills, borders and label families already matched.
