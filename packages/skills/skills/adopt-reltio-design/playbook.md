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
  `data-theme` attribute: `data-theme="sap-reltio-light"` or `"sap-reltio-dark"`
  on an ancestor element (the legacy `horizon-light` / `horizon-dark` values still
  resolve to the same tokens but are deprecated — prefer the `sap-reltio-*` names).
  UI5 components and token-based CSS re-theme together.
- The consumer must load `variables.css` + `fonts.css` + `global.css` from
  `reltio.design` (or self-host), in that order — `global.css` carries the
  component corrections that the tokens alone cannot express, so it comes last.
  If theming looks broken after migration, verify all three are loaded.

## 5. Icons

The icon set ships transitively via `@reltio/design` — do **not** add `@ui5/*`
to the app's dependencies. Each icon module exports two things: a **PascalCase
component** (named export, e.g. `Save`) and the icon's **registry name** (default
export, a string). Because `@reltio/design` is `sideEffects: false`, a bare
`import "@reltio/design/icons/sap/save"` is dropped by the bundler — always
import one of these bindings and use it, so the icon registration is retained.

- **Standalone icon → prefer the PascalCase component.** Replace a MUI icon
  element (`<SaveIcon />`) with the matching icon component:
  `import { Save } from "@reltio/design/icons/sap/save";` → `<Save />`. It renders
  the SAP Fiori glyph and forwards `Icon` props (`design`, `accessibleName`,
  `mode`, …). This is the recommended default for rendering an icon on its own.
- **A component's `icon` prop → import the name.** When a component takes an icon
  by name (e.g. `Button`), import the **default** binding and pass it:
  `import saveIcon from "@reltio/design/icons/sap/save";` →
  `<Button icon={saveIcon} />`. The default export is the icon's name string and
  keeps the registration side effect.
- Reltio custom glyphs come from `@reltio/design/icons/reltio/<kebab-name>` (same
  two exports, e.g. `import { ReltioDataQuality } from ".../data-quality"`). Never
  reach into `@ui5/*` for icons, components, hooks, or utils.
- **Discover which icon names exist** (offline, version-matched to the installed
  package) by listing the icon modules:
  `ls node_modules/@reltio/design/icons/sap` and
  `ls node_modules/@reltio/design/icons/reltio` — each file is one icon; its
  base name (minus `.js`) is the kebab-name to import. For a visual browser, use
  the Icon Gallery on `https://reltio.design` (Storybook → Icons) or the Reltio
  Design MCP. Do not guess names from memory — confirm the module exists before
  importing it.

## 6. Imports — everything from `@reltio/design`

- **All components, charts, hooks, and utils come from `@reltio/design/*`** —
  `@reltio/design/components`, `/charts`, `/hooks`, `/utils`. Never import a
  component, hook, util, or icon directly from `@ui5/*` or `@sap/*` — icons are
  registered through `@reltio/design/icons/sap/*` too (see section 5).
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
