---
"@reltio/design": patch
---

Give list surfaces their translucent background and fix the group-title border

Two light-mode token corrections found while checking the List page.

`sapList_Background` was `#fff` where the design's list rows are the translucent
`#fcfeff80`. The design binds `sapList_Background_Light`, which has no
unsuffixed counterpart in Figma — but the two do map to each other: the dark
values were already identical (`#1d232a`), so only light had been missed. List
rows, group headers and the calendar card now all read the design's value.

This also retires the scoped `--sapList_Background` override that the calendar
carried. That override deliberately left open whether lists should follow the
same value; the List page settles it, since list rows bind the same variable.
Table rows share UI5's list background and pick the value up too, which is
consistent with the shared token though not separately checked against the
Table page.

`sapGroup_TitleBorderColor` was `#babade` against the design's `#8f8fcc`; dark
already matched.
