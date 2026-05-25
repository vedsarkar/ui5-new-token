---
"@reltio/design": minor
---

Add nine new component families to `@reltio/design/components` (RP-184745).

**Thin UI5 endorsements** (1:1 re-exports from `@ui5/webcomponents-react@2.21.3`, no Reltio wrapping):

- `Dialog` — modal overlay for confirmations and blocking interactions
- `IllustratedMessage` — page-level empty / error / success states with Fiori illustrations
- `Panel` — collapsible section; SAP equivalent of an accordion item (stack to compose an accordion)
- `ProgressIndicator` — determinate progress bar with value-state semantics
- `ResponsivePopover` — adaptive popover that falls back to a dialog on phones
- `TabContainer` + `Tab` — tab strip and tab item
- `Table` + `TableHeaderRow` + `TableHeaderCell` + `TableRow` + `TableCell` — tabular data grid
- `Toast` — transient overlay notification. Semantic variants (info / success / error) are achieved via `--sap*` token overrides on a parent class (see README) — no wrapper needed.
- `Wizard` + `WizardStep` — multi-step guided flow

Also re-exports the supporting UI5 ShellBar primitives consumers compose into ShellBar: `ShellBarBranding`, `ShellBarItem`, `ShellBarSearch`.

**Reltio business component**:

- `ShellBar` — top navigation chrome that ships a default Reltio brand mark in the new UI5 `branding` slot via a `<picture>` with `horizon-light` / `horizon-dark` variants chosen by the closest `[data-theme]` ancestor. Overridable via `branding?: ReactNode`. All other UI5 ShellBar props pass through. `data-test-id` forwarded to the light-DOM host. OpenSpec change at `openspec/changes/add-shell-bar/`.

Drawer is tracked separately for a follow-up PR (no direct UI5 source in `2.21.3`; needs a custom Reltio implementation).
