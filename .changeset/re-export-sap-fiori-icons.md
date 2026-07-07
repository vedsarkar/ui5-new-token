---
"@reltio/design": minor
---

Re-export SAP Fiori icons from `@reltio/design/icons/sap/<kebab-name>` so consumer apps never import `@ui5/webcomponents-icons` directly. Reltio custom icons publish under `@reltio/design/icons/reltio/<kebab-name>` so both families can share kebab names without module collisions.

Every per-icon module shares the same contract: tree-shakable side-effect registration plus an optional PascalCase React component from the same path (`import { Decline } from "@reltio/design/icons/sap/decline"`, `import { ReltioDataQuality } from "@reltio/design/icons/reltio/data-quality"`). Render SAP icons by bare registry name (`<Icon name="save" />`); Reltio icons by `reltio/<name>`.

SAP modules compile into `dist/icons/sap/`; Reltio modules compile into `dist/icons/reltio/`. Reltio aggregate: `import "@reltio/design/icons/reltio"` only.
