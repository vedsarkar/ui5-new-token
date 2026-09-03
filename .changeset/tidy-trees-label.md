---
"@reltio/design": minor
---

`FileTree` nodes gain `endContent`, and `name` accepts any `ReactNode`

Two additive changes to `FileTreeNode`, both driven by real screens:

- **`endContent?: ReactNode`** — trailing content after the label, for a count
  badge, status tag or timestamp. It sits inline next to the name rather than at
  the row's far edge, so it reads as belonging to the label, and it stays whole
  when a long name truncates.
- **`name` widens from `string` to `ReactNode`** — a row label is often
  composite: an attribute's field name beside its value, or a highlighted search
  match. Passing a string still works exactly as before, so this is source
  compatible.
