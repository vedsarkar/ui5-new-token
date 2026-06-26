# Adoption playbook — conversion rules

Detailed, portable rules for converting ad-hoc UI primitives to
`@reltio/design/components`. These rules are generic: they apply whether the
source is MUI, a bespoke component, another library, or raw HTML.

`@reltio/design` re-exports SAP Fiori (UI5) web components (plus Reltio business
components and primitives). Most behavioral differences below come from the fact
that the underlying elements are **web components**, not plain React components.

## 1. Semantic matching

Classify each primitive by intent, then find the standardized component with
`npx @reltio/design components`. Typical intents and where they land:

- button / icon-button → `Button` (icon-only needs `accessibleName` + `tooltip`)
- text field / number field → `Input` (and `TextArea` for multiline)
- select / dropdown → `Select`, or `ComboBox` / `MultiComboBox` when filterable
- checkbox / radio / toggle → `CheckBox`, `RadioButton`, `Switch`
- dialog / modal → `Dialog` (or `Popover` / `ResponsivePopover` for anchored)
- table / data grid → `Table` (+ `TableRow`, `TableCell`, `TableHeaderRow`, …)
- chip / badge / status → `Tag`, `ObjectStatus`
- alert / banner / snackbar → `MessageStrip`, `Toast`
- typography → `Text`, `Title`, `Label`, `Link`
- spinner / progress → `BusyIndicator`, `ProgressIndicator`

Confirm the exact name and props with the CLI; do not assume. If nothing matches
the intent, **stop on that element** and mark it for manual review.

## 2. Web-component prop & event differences

- **Content goes in `children`**, not a `label`/`text` prop. e.g. MUI
  `<Button>Save</Button>` stays as children; a MUI `label` prop becomes children.
- **Booleans are real props** but map to attributes — `disabled`, `required`,
  `readonly` (note: `readonly`, not `readOnly` on some UI5 props — check the CLI).
- **Events differ.** UI5 components emit their own events. `onClick` exists on
  `Button`; for inputs prefer UI5's `onInput` / `onChange` semantics — verify per
  component with the CLI/MCP rather than assuming the MUI signature. Event payloads
  are UI5 events; read values from the event target / `detail`, not from
  `e.target.value` assumptions.
- **Slots.** Some components expose named slots via props (e.g. `Bar`'s
  `startContent` / `endContent`, dialog `header` / `footer`). Map MUI composition
  to the corresponding slot prop.

## 3. Styling — colors via tokens, everything else plain

Do **not** port `sx`, `styled`, `makeStyles`, or theme objects verbatim.

- **Colors → SAP Horizon `--sap*` tokens only.** Never hardcode hex/rgba. Map MUI
  palette references to the matching token, e.g. `theme.palette.primary.main` →
  `var(--sapBrandColor)`, error → `var(--sapNegativeColor)`, text →
  `var(--sapTextColor)`. When unsure of a token, check Storybook → Design Tokens
  on `reltio.design`.
- **Spacing, sizing, typography, radii → plain CSS values** (`padding: 8px 16px`,
  `font-size: 14px`, `border-radius: 12px`). Do not invent CSS custom properties
  for these.
- **Move styles into the consumer app's own styling system** (e.g. CSS Modules)
  rather than inline `sx`. Keep the conversion faithful to the original layout.
- **Restyling UI5 internals** (Shadow DOM) is done via `--sap*` token overrides
  scoped to a parent, or CSS `::part()` — not by reaching into the component.

## 4. Theming

- Replace MUI `ThemeProvider` / `createTheme` palette switching with the
  `data-theme` attribute: `data-theme="horizon-light"` or `"horizon-dark"` on an
  ancestor element. UI5 components and token-based CSS re-theme together.
- The consumer must load `variables.css` + `fonts.css` from `reltio.design`
  (or self-host). If theming looks broken after migration, verify these are loaded.

## 5. Icons

- Replace MUI icon components with SAP Fiori icons referenced **by name** on the
  component (e.g. `<Button icon="save" />`). The icon set ships transitively via
  `@reltio/design` — do **not** add `@ui5/*` to the app's dependencies.
- Each named icon must be **registered once** via a side-effect import so the web
  component can resolve it: `import "@ui5/webcomponents-icons/dist/save.js";`.
  This registration import is the **only** thing ever imported directly from an
  `@ui5/*` package, and only because there is no `@reltio/design` re-export for
  icon registration. Prefer the consumer app's existing icon-loading convention
  if it already has one; never reach into `@ui5/*` for components, hooks, or utils.

## 6. Imports — everything from `@reltio/design`

- **All components, charts, hooks, and utils come from `@reltio/design/*`** —
  `@reltio/design/components`, `/charts`, `/hooks`, `/utils`. Never import a
  component, hook, or util directly from `@ui5/*` or `@sap/*`. The single icon
  registration side-effect import (section 5) is the sole exception.
- All adopted components import from `@reltio/design/components` (charts from
  `@reltio/design/charts`). Never the bare `@reltio/design`.
- Remove the now-unused `@mui/*` (or other) imports as you go, but only for the
  files in the current small batch.

## 7. When there is no equivalent — STOP

If a primitive has no clear standardized counterpart (a specialized widget, a
complex composed component, something product-specific), do **not** force a
mapping and do **not** invent props. Leave the original in place, add a short
note/`TODO` for manual review, and report it in your summary. Correctness and
reviewability beat coverage.

## 8. Verify each increment

After each small batch: run the consumer's type-check, linter, and tests. Fix
what your change introduced. Only then proceed to the next batch. If the batch is
growing past ~1000 changed lines, split it (see the SKILL.md guardrail).
