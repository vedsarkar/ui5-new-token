## Why

Consumer applications must today register SAP Fiori icons through direct `@ui5/webcomponents-icons` side-effect imports, which violates the platform contract that apps import only from `@reltio/design`, never `@ui5/*`. Custom Reltio icons already ship as tree-shakeable side-effect modules, but the standard SAP icon set does not — and `guides/icon-library.story.mdx` still documents the `@ui5` import path. Closing this gap completes the single-distribution-package rule for iconography.

## What Changes

- Add `scripts/build-sap-icons.mjs` — one tree-shakeable module per SAP Fiori icon from the default `@ui5/webcomponents-icons` collection (v1: not `tnt` or `business-suite`).
- **Extend `scripts/build-icons.mjs`** — emit custom `reltio/*` modules under `icons/reltio/` using the same module shape as SAP (registration + optional PascalCase export).
- **Two publish namespaces** (no kebab-path collisions):
  - **SAP Fiori:** `@reltio/design/icons/sap/<kebab-name>` → `<Icon name="<kebab-name>" />`
  - **Reltio custom:** `@reltio/design/icons/reltio/<kebab-name>` → `<Icon name="reltio/<kebab-name>" />`
- **Shared module contract** (both families): side-effect import registers the icon; optional PascalCase React component from the **same** path (`Decline` for SAP, `ReltioDataQuality` for Reltio).
- Aggregate: `@reltio/design/icons/reltio` registers every custom icon (no SAP aggregate).
- Update docs (`guides/icon-library.story.mdx`, UI Architecture, `Icon` stories, README) and Storybook for both icon families.
- **Minor** changeset for `@reltio/design` (additive SAP modules + unified module contract + namespaced publish paths).

## Capabilities

### New Capabilities

- `icon-modules`: Per-icon module contract — side-effect registration plus optional PascalCase React component — for Reltio custom (`icons/reltio/*`) and SAP Fiori (`icons/sap/*`).
- `sap-fiori-icons`: Generate SAP modules from pinned `@ui5/webcomponents-icons` into `icons/sap/` so consumer apps never import `@ui5/*` for standard SAP icons.

### Modified Capabilities

- _(none at `openspec/specs/` level — custom icons are extended in-repo via `build-icons.mjs`, covered by `icon-modules`)_

## Impact

- **New:** `scripts/build-sap-icons.mjs`, `icons/sap/` generated modules, `icons/reltio/` generated modules.
- **Modified:** `scripts/build-icons.mjs`, `scripts/icon-module-codegen.mjs`, docs and Storybook (`icons/`).
- **Release:** `.changeset/` — **minor** bump of `@reltio/design`.
- **Consumers:** SAP apps migrate off `@ui5/webcomponents-icons`; Reltio custom icons import from `@reltio/design/icons/reltio/<kebab-name>`.
