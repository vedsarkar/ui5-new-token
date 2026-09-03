---
"@reltio/design": patch
---

Remove the extra space above a stacked form-item label

When a form item's label sits above its field, UI5 padded the label
`0.625rem 0.25rem 0 0.25rem`. The 10px above it pushed the label's grid row to
28px and the whole item to 72px, against the design's 62px.

`global.css` now zeroes the vertical padding, so the label's own line box
supplies the height: the label row lands on 18px and the item on 62px, matching
the design exactly. Horizontal layouts are untouched — the grid centres the
label in its row, so it never relied on this padding for alignment, and those
items stay at 44px with the 4:8 column ratio intact.
