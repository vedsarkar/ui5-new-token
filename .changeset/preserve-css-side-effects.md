---
"@reltio/design": patch
---

Preserve bare CSS imports (`variables.css`, `fonts.css`) under bundler tree-shaking.

- `sideEffects` is now `["./variables.css", "./fonts.css"]` instead of `false`, so `import "@reltio/design/variables.css"` is no longer dropped
- JS modules stay tree-shakable; icon bare imports are still dropped unless the name/default export is used
