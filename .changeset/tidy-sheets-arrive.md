---
"@reltio/design": minor
"@reltio/app": minor
---

Publish `global.css` — the component corrections now reach apps, not just Storybook

`public/global.css` holds the fixes for cases where UI5's Horizon CSS diverges
from the Hybrid Design System and no `--sap*` token controls the result. Until
now it was referenced only by `.storybook/preview-head.html`, and the package's
`postbuild` copied just `variables.css` and `fonts.css` into `dist/`. Every
correction in it was therefore **Storybook-only** — the docs site matched the
design while apps installing `@reltio/design` did not.

Affected until this release: the Avatar hover ring, all five Bar corrections
(background and effects, content inset, footer height, end-content alignment,
header title colour) and all three Breadcrumbs corrections (separator and
current-item colour, outer margin, row height). Corrections that went through
`scripts/build-tokens.mjs` into `variables.css` — the Button pill and focus ring,
the Segmented Button pill, and the Popover/Dialog radii — already shipped and are
unaffected.

**What consumers need to do**

Add a third stylesheet, **last**, after the existing two:

```html
<link rel="stylesheet" href="https://reltio.design/variables.css" />
<link rel="stylesheet" href="https://reltio.design/fonts.css" />
<link rel="stylesheet" href="https://reltio.design/global.css" />
```

or, when importing from the package:

```ts
import "@reltio/design/variables.css";
import "@reltio/design/fonts.css";
import "@reltio/design/global.css";
```

Order matters: every rule in `global.css` either remaps a token for one component
or sets a declaration on a component host, so it has to come after the token
layer it builds on. Skipping it is not an error — components still render, they
just keep UI5's defaults where those differ from the design.

`@reltio/app`'s template already loads all three, so newly scaffolded apps need
no change.

**Also in this release**

Two Storybook-only rules moved out of `global.css` into
`.storybook/preview-head.html`, so the published file carries nothing that only
makes sense inside Storybook: the `:root` font-family reset (which needs
`!important` purely to beat Storybook's own rules) and the `#storybook-docs`
table styles. `global.css` stays hand-maintained — unlike `variables.css` and
`fonts.css`, no build step generates it.
