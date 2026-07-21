---
"@reltio/design": patch
---

Fix `ShellBar` side navigation sizing.

- Widen the `ShellBar` collapsible side navigation drawer to 20rem so longer navigation labels fit on one line
- Drop the `SideNavigation` `min-width` animation styling that caused a content jump during expand/collapse
