# design-adoption-skill Specification

## Purpose
Define the portable `adopt-reltio-design` agent skill that guides AI agents (Cursor, Claude, Codex) through migrating arbitrary UI primitives (MUI of any version, bespoke components, other libraries, or raw HTML) to standardized `@reltio/design` components. The skill encodes an application-independent inventory→match→deep-dive→migrate→verify workflow, semantic matching against the live component inventory, portable web-component and styling rules, canonical import-path enforcement, and small reviewable increments.
## Requirements
### Requirement: Portable cross-agent skill definition

The system SHALL provide an agent skill named `adopt-reltio-design` consisting of a
`SKILL.md` (with Agent Skills standard YAML frontmatter: `name`, `description`) and
a `playbook.md`, authored as plain markdown so it is usable by Cursor, Claude, and
Codex without agent-specific syntax.

The skill source files SHALL be authored as package assets under
`packages/skills/skills/adopt-reltio-design/` (in the dedicated `@reltio/skills`
package) and SHALL be the single source of truth for the skill body (consumed
verbatim by the published package payload and by the Storybook how-to guide). The
skill SHALL NOT be authored under the platform repository's `.agents/skills/` or
`.claude/skills/` directories.

#### Scenario: Skill is discoverable by its description

- **WHEN** an agent scans available skills in a consumer repo where the skill is installed
- **THEN** the skill's `description` triggers on intents such as "migrate to Reltio Design", "replace MUI components", "adopt @reltio/design components", or "standardize UI primitives"

#### Scenario: Skill contains no agent-specific or app-specific bindings

- **WHEN** the skill files are read
- **THEN** they reference no single application by name and use only portable markdown plus `@reltio/design` CLI commands and the public `reltio.design` endpoints

#### Scenario: Skill is not active inside the platform repo

- **WHEN** an agent working in the `reltio-design` platform repository scans active skills
- **THEN** `adopt-reltio-design` is absent, because its source lives under `packages/skills/skills/` and is never placed in this repo's `.agents/skills/` or `.claude/skills/`

### Requirement: Generic primitive-to-component migration workflow

The skill SHALL define a repeatable, application-independent workflow with the
ordered steps: inventory, match, deep-dive, migrate, verify — applicable to any
source primitive (MUI of any version, bespoke components, other libraries, or raw
HTML).

#### Scenario: Agent follows the ordered workflow

- **WHEN** an agent is asked to adopt Reltio Design components in a target set of files
- **THEN** it first inventories candidate primitives, then matches each to a standardized component via live discovery, then fetches the exact API, then migrates, then verifies compilation and tests

#### Scenario: No standardized equivalent exists

- **WHEN** a primitive has no clear `@reltio/design/components` equivalent
- **THEN** the skill instructs the agent to mark it for manual review and NOT fabricate a replacement

### Requirement: Semantic matching without a curated mapping table

The skill SHALL instruct the agent to classify each primitive by its UI intent and
match it against the live component inventory, rather than relying on any
hand-curated source-to-target mapping table.

#### Scenario: Matching a button-like primitive

- **WHEN** the agent encounters a button primitive from any source
- **THEN** it classifies it as a button, locates the standardized component in the live inventory, and adopts it without consulting a static mapping file

### Requirement: Generic web-component and styling migration rules

The skill SHALL document portable rules for migrating to the UI5-based surface:
text passed via `children` (not a `label` prop), native event handling,
`sx`/`styled`/`makeStyles` converted to CSS Modules with `--sap*` color tokens,
theme palette replaced by `data-theme`, and icons imported from
`@ui5/webcomponents-icons` as side-effect imports.

#### Scenario: Converting MUI styling

- **WHEN** the agent migrates a component that used `sx` or a theme palette color
- **THEN** it converts colors to `--sap*` tokens and switches theming to the `data-theme` attribute per the documented rules

### Requirement: Canonical import path enforcement

The skill SHALL require all generated imports to use the `@reltio/design/components`
subpath and never the bare `@reltio/design` specifier.

#### Scenario: Generated import uses the subpath

- **WHEN** the agent writes an import for an adopted component
- **THEN** the import statement targets `@reltio/design/components`

### Requirement: Iterative, reviewable pull requests

The skill SHALL mandate small, incremental changes: an upper bound of approximately
1000 changed lines per pull request, beyond which the agent MUST stop and propose a
split (per component or per screen/module); each increment MUST compile and pass
tests; and the agent MUST propose a split plan before any bulk replacement.

#### Scenario: Change would exceed the size ceiling

- **WHEN** a requested migration would change more than ~1000 lines
- **THEN** the agent stops and proposes an incremental split plan instead of producing one large change

#### Scenario: Each increment is independently valid

- **WHEN** the agent completes a migration increment
- **THEN** that increment compiles and passes the consumer's tests before the agent proceeds to the next
