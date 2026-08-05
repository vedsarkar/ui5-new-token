---
"@reltio/design": minor
---

Add `reltio/add-parent` and `reltio/add-child` icons (RP-186910).

- New `add-parent` icon: `import addParent from "@reltio/design/icons/reltio/add-parent"` (or the `ReltioAddParent` component)
- New `add-child` icon: `import addChild from "@reltio/design/icons/reltio/add-child"` (or the `ReltioAddChild` component)
- Both are monochrome and theme-aware — they inherit `currentColor` and honor the `design` prop, matching the rest of the Reltio icon set
