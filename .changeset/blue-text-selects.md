---
"@reltio/design": patch
---

Style text selection to match the design

The design's Text page specifies a selected-text highlight —
`sapSelectedColor` behind `sapContent_ContrastTextColor` — and nothing in the
platform implemented it. There were no `::selection` rules anywhere in the
document, adopted stylesheets, or any shadow root, so selection fell through to
the browser default.

`public/global.css` now carries one unscoped `::selection` rule. Both tokens are
theme-aware, so light (`#0000cc` on white) and dark (`#4db1ff` on `#1d232a`)
follow without a second rule. Verified that highlight styles inherit through the
shadow boundary, so selection inside UI5 components — an Input's inner field,
for example — picks it up too.

Declared unscoped because selection is a document-wide affordance rather than a
component's; SAP defines these two tokens for exactly this purpose. Note that
this changes selection appearance across a consuming app, not just within
`@reltio/design` components.

The base Text itself needed no change: 14px Regular in `sapTextColor` at a 16px
line box already matched.
