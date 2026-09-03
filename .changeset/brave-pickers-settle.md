---
"@reltio/design": minor
---

Add `applyComponentCorrections()` — reach the divergences a stylesheet cannot

Two design divergences were previously unfixable, both for the same reason: the
value sits on a **nested** component that UI5 renders inside another component's
shadow root, where no document selector reaches it and `::part()` does not apply
because the part is not re-exported. Confirmed by injecting the overrides at
document level and measuring no change.

UI5 publishes `addCustomCSS(tag, css)` for exactly this — it registers CSS
against a tag name and UI5 appends it to that component's shadow root after its
own styles, so an equal-specificity rule wins. The new
`applyComponentCorrections()` wraps the two entries we need.

```ts
import { applyComponentCorrections } from "@reltio/design/utils";

applyComponentCorrections(); // once, at app startup
```

**What it fixes**

- **Calendar** — UI5 gives every day cell a 2px margin, widening the grid to
  8x38 against the design's flush 8x36, and caps the weekday row at 2rem instead
  of matching the 46px day rows. Both are UI5's own `:host` variables, so they
  are re-declared rather than targeting internal class names. With the grid at
  its intended 288px the card can finally take the design's dimensions, so
  `global.css` now also sets the width, height, padding and header height:
  **304x382**, down from 320x392.
- **Breadcrumbs** — the row is 24px against the design's 16px, from 4px of
  vertical link padding applied through `::part(root)` inside the Breadcrumbs
  shadow root, plus two line-box effects: the separator span inheriting 16px, and
  the link row's own inherited font setting a taller line box than its 14px
  content. The row is now exactly 16px, and the compensating
  `margin-block: -0.25rem` that used to approximate it is removed — with the
  padding actually gone it would have pulled the footprint below 16px.

Note the Breadcrumbs fix trades the link's click target down from 24px to 16px,
which is below the usual minimum target size. Acceptable where visual fidelity
to the design is the goal; revisit before production.

**Also**

`@ui5/webcomponents-base` is now a direct dependency, pinned to `2.21.1` to match
the other `@ui5/*` pins, since the package imports from it directly rather than
relying on it transitively.

Every entry in `applyComponentCorrections.ts` depends on UI5-private names
(`--_ui5_*`, internal class names) that semver does not cover — re-check the file
on a UI5 upgrade. `AGENTS.md` documents this as the third and last-resort styling
mechanism, after tokens and CSS Parts.
