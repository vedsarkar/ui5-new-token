# component-discovery Specification

## Purpose
Make the endorsed `@reltio/design` component surface discoverable offline and version-matched, so consumers and AI agents can enumerate available components and inspect their exact prop APIs straight from the installed package — without network access or a separately maintained catalog. This is delivered through bundled per-component `*.schema.json` files, a generated `components.index.json`, and the `npx @reltio/design components [Name]` CLI.
## Requirements
### Requirement: Bundled component schemas in the published package

The published `@reltio/design` package SHALL include the per-component
`*.schema.json` files in its `dist/` output so consumers can read resolved prop
schemas offline and version-matched, without network access or a separately
maintained catalog.

#### Scenario: Schemas present after build

- **WHEN** `@reltio/design` is built and packed
- **THEN** the package payload contains a resolved prop schema for each endorsed component that has generated docs (a `*.schema.json`)

#### Scenario: Schema matches the installed version

- **WHEN** a consumer reads a component schema from `node_modules/@reltio/design`
- **THEN** the schema reflects the exact component API of the installed package version

### Requirement: Flat component index

The package SHALL include a generated `components.index.json` mapping each
component name to its canonical import path, a one-line description, and a flag
indicating whether a prop schema is bundled for it (`hasSchema`). The schema
itself is resolved by convention at `schemas/<Name>.schema.json`. This index is a
documented, versioned contract.

#### Scenario: Index enumerates the endorsed surface

- **WHEN** a consumer agent reads `components.index.json`
- **THEN** it can enumerate every endorsed component with its `@reltio/design/components` import path and one-line description

### Requirement: Component discovery CLI

The package SHALL expose a single command-line entry, registered so that
`npx @reltio/design <subcommand>` resolves (i.e. one `bin` keyed to the package's
unscoped name `design` that dispatches subcommands), providing a `components
[Name]` subcommand. `npx @reltio/design components` prints the component inventory;
`npx @reltio/design components <Name>` prints that component's resolved props —
both reading from the bundled index and schemas.

#### Scenario: List the inventory

- **WHEN** a user runs `npx @reltio/design components`
- **THEN** the command prints the list of endorsed components with their import paths and one-line descriptions

#### Scenario: Inspect one component

- **WHEN** a user runs `npx @reltio/design components Button`
- **THEN** the command prints `Button`'s resolved props from the bundled schema

#### Scenario: Unknown component name

- **WHEN** a user runs the bin with a name that is not in the index
- **THEN** the command reports that the component is unknown and exits non-zero
