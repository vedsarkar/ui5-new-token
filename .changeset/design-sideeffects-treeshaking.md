---
"@reltio/design": minor
---

Make the package fully tree-shakable (`sideEffects: false`) and expose each icon's name as a tree-shakable export.

**Tree-shaking**

- Declared `sideEffects: false`, so consumer bundlers drop everything you don't import: pulling a few components from `@reltio/design/components` no longer bundles the whole catalog (`Chat`, `Details`, `Table`, `Calendar`, `Tree`, ...), and unused icons are dropped too.
- CSS Modules keep working — they're consumed through their default export (the hashed class map), so a bundler keeps each one exactly when its component is kept.

**Icons — registration through consumed exports**

- Every per-icon module now default-exports its registry name: `import name from "@reltio/design/icons/sap/save"` (and `.../icons/reltio/<name>`) returns the name string for `<Icon name={name} />`. SAP modules bind it from the UI5 icon module's own default export; Reltio modules bind it from `registerReltioIcon(...)`, whose return value is the name — so registration is tied to using the name and survives tree-shaking. The PascalCase component export (`Save`, `ReltioDataQuality`, ...) also still registers on use.
- `@reltio/design/icons/reltio` and `@reltio/design/icons/sap` are now pure barrels of icon-name exports (`export { default as aco } from "./aco"`, `aco === "reltio/aco"`; `accelerated === "accelerated"`). Grab every name at once with a namespace import: `import * as reltioIcons from "@reltio/design/icons/reltio"` / `import * as sapIcons from "@reltio/design/icons/sap"` (iterating registers the whole set).

**Notes for early adopters of the icon modules** (shipped in 1.10.0)

- Register an icon by importing its name (default) or component — not a bare `import "@reltio/design/icons/sap/save"`, which `sideEffects: false` may drop. Register-all changes from `import "@reltio/design/icons/reltio"` to `import * as reltioIcons from "@reltio/design/icons/reltio"` (used/iterated).
- The `@reltio/design/icons/reltio` barrel no longer exports the `reltioIcons` metadata array, the `ReltioIcon` type, or `RELTIO_ICON_COLLECTION` — use the per-icon name exports (or the namespace import); names already carry the `reltio/` prefix.
