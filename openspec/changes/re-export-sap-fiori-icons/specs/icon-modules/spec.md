## ADDED Requirements

### Requirement: Namespaced publish paths for Reltio and SAP

Reltio custom icons SHALL publish at `@reltio/design/icons/reltio/<kebab-name>`. SAP Fiori icons (default collection) SHALL publish at `@reltio/design/icons/sap/<kebab-name>`. Both families SHALL share the same per-module contract under distinct namespace segments, so kebab-name overlap between families cannot collide at module resolution time.

#### Scenario: Reltio icon resolves under `icons/reltio/`

- **WHEN** a consumer writes `import "@reltio/design/icons/reltio/data-quality"`
- **THEN** module resolution succeeds and the `reltio/data-quality` icon is registered

#### Scenario: SAP icon resolves under `icons/sap/`

- **WHEN** a consumer writes `import "@reltio/design/icons/sap/decline"`
- **THEN** module resolution succeeds without any `@ui5/*` import in consumer code and the `decline` icon is registered

#### Scenario: Overlapping kebab names resolve independently

- **WHEN** the same kebab name exists in both families (e.g. `bar-chart`)
- **THEN** `@reltio/design/icons/sap/bar-chart` and `@reltio/design/icons/reltio/bar-chart` resolve to separate published modules

### Requirement: Registry names vs import paths

Import path namespace (`reltio/` or `sap/` segment) SHALL NOT appear in the UI5 icon registry name for SAP icons. Reltio icons SHALL use the `reltio/<kebab-name>` registry name.

#### Scenario: SAP render name is bare kebab

- **WHEN** a consumer writes `import "@reltio/design/icons/sap/save"` and renders `<Icon name="save" />`
- **THEN** the icon displays correctly

#### Scenario: SAP render name for Button icon prop

- **WHEN** a consumer writes `import "@reltio/design/icons/sap/save"` and renders `<Button icon="save" />`
- **THEN** the button displays the `save` SAP icon

#### Scenario: Reltio render name uses reltio prefix

- **WHEN** a consumer writes `import "@reltio/design/icons/reltio/homepage"` and renders `<Icon name="reltio/homepage" />`
- **THEN** the icon displays correctly

### Requirement: Primary side-effect registration

Every per-icon module SHALL register its icon in UI5's global registry when evaluated. A side-effect import alone SHALL be sufficient for use with `<Icon name="…" />` and UI5 `icon` props.

#### Scenario: Reltio side-effect import

- **WHEN** a consumer writes `import "@reltio/design/icons/reltio/compare"` and renders `<Icon name="reltio/compare" />`
- **THEN** the icon displays correctly

#### Scenario: SAP side-effect import

- **WHEN** a consumer writes `import "@reltio/design/icons/sap/decline"` and renders `<Icon name="decline" />`
- **THEN** the DOM contains a UI5 icon for the `decline` SAP icon name

#### Scenario: Tree-shaking excludes unimported modules

- **WHEN** a consumer bundle imports only `@reltio/design/icons/sap/decline` and no other per-icon module
- **THEN** the build output does not include registration data for other icons

### Requirement: PascalCase React component export on every icon module

Every per-icon module SHALL export a PascalCase named React component from the **same path** as the side-effect import. SAP modules SHALL use the kebab-derived name (e.g. `decline` → `Decline`). Reltio modules SHALL use a `Reltio` prefix (e.g. `data-quality` → `ReltioDataQuality`). The component SHALL render the endorsed `Icon` from `@reltio/design/components` with the correct fixed `name` (`reltio/<kebab-name>` for Reltio, `<kebab-name>` for SAP). Importing the named export SHALL register the icon (same module evaluation as the side-effect import).

#### Scenario: Reltio named export

- **WHEN** a consumer renders `<ReltioDataQuality />` after `import { ReltioDataQuality } from "@reltio/design/icons/reltio/data-quality"`
- **THEN** the DOM contains a UI5 icon for `reltio/data-quality`

#### Scenario: SAP named export

- **WHEN** a consumer renders `<Decline />` after `import { Decline } from "@reltio/design/icons/sap/decline"`
- **THEN** the DOM contains a UI5 icon for the `decline` SAP icon name

#### Scenario: Icon props are forwarded

- **WHEN** a consumer renders `<Decline design="Negative" accessibleName="Close" />`
- **THEN** the underlying `Icon` receives `design="Negative"` and `accessibleName="Close"`; the `name` prop is not overridable by the consumer

#### Scenario: Named and side-effect imports share one path

- **WHEN** a consumer imports from `@reltio/design/icons/sap/decline` (whether as side-effect or `import { Decline } from "…"`)
- **THEN** both forms resolve to the same published module

### Requirement: Reltio aggregate entry

Importing `@reltio/design/icons/reltio` (aggregate) SHALL register every `reltio/*` custom icon. The aggregate SHALL NOT pull in SAP icon modules. There SHALL be no published aggregate at `@reltio/design/icons/sap` or bare `@reltio/design/icons`. Per-icon modules live only under the `sap/` and `reltio/` subtrees.

#### Scenario: Reltio aggregate import

- **WHEN** a consumer writes `import "@reltio/design/icons/reltio"`
- **THEN** all `reltio/*` custom icons are registered

### Requirement: Consumer documentation reflects both families

Documentation SHALL describe the side-effect import as primary for each family, with optional PascalCase component from the same path. SAP examples SHALL not instruct `@ui5/webcomponents-icons` imports in application code. SAP icon discovery SHALL point to the UI5 Icons explorer for the full default collection.

#### Scenario: Icon library guide shows Reltio and SAP import paths

- **WHEN** a developer reads the Icon Library guide
- **THEN** Reltio examples use `import "@reltio/design/icons/reltio/<kebab-name>"` and SAP examples use `import "@reltio/design/icons/sap/<kebab-name>"`

#### Scenario: Icon library guide documents component export for both families

- **WHEN** a developer reads the optional JSX shortcut section
- **THEN** examples include `import { ReltioDataQuality } from "@reltio/design/icons/reltio/data-quality"` and `import { Decline } from "@reltio/design/icons/sap/decline"`
