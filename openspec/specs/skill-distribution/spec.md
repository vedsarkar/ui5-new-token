# skill-distribution Specification

## Purpose
Distribute the `adopt-reltio-design` skill to external consumers through the dedicated `@reltio/skills` package — versioned independently of `@reltio/design` — while keeping it inactive inside the platform repository itself. This covers bundling the skill in the package payload, the non-destructive `npx @reltio/skills install [name...]` / `list` CLI, and a Storybook how-to guide rendered from the same single source as the skill body.
## Requirements
### Requirement: Skill bundled in the package

The published `@reltio/skills` package SHALL include the `adopt-reltio-design`
skill files (copied from the `packages/skills/skills/` source assets) in its
`dist/` output, so the skill is distributed and versioned independently of the
`@reltio/design` component package.

#### Scenario: Skill files present after build

- **WHEN** `@reltio/skills` is built and packed
- **THEN** the package payload contains the `adopt-reltio-design` skill (`SKILL.md` + `playbook.md`) under a `dist/skills/` location

### Requirement: Skill inactive within the platform repository

The platform repository SHALL NOT register `adopt-reltio-design` as an active
skill for its own developers. The skill source SHALL live only under
`packages/skills/skills/` and SHALL NOT be added to the platform repo's
`.agents/skills/` or symlinked into `.claude/skills/`.

#### Scenario: Platform developers are not offered the skill

- **WHEN** a developer or agent works inside the `reltio-design` repository
- **THEN** the `adopt-reltio-design` skill does not appear among active skills and does not interfere with platform development

### Requirement: Skill installation CLI

The `@reltio/skills` package SHALL provide an `install` subcommand on its single
CLI entry (so `npx @reltio/skills install` resolves) that copies the bundled
skill(s) into the consumer repo's `.agents/skills/<name>/` directory and creates
the corresponding `.claude/skills/<name>` symlink, per the Agent Skills standard,
creating any missing parent directories. The subcommand SHALL accept zero or more
skill names as positional arguments: with no name it installs every bundled skill,
and with one or more names it installs only those. The package SHALL also provide a
`list` subcommand that prints the bundled skills and their descriptions. The
installer SHALL be non-destructive: it SHALL NOT delete or overwrite content it
does not own, SHALL NOT modify the consumer's existing `AGENTS.md` or `CLAUDE.md`
(it prints a suggested one-line pointer instead), and SHALL resolve
`.claude/skills/<name>` conflicts safely.

#### Scenario: Install into a consumer repo

- **WHEN** a user runs `npx @reltio/skills install` at a consumer repo root
- **THEN** every bundled skill is written under `.agents/skills/`, any missing `.claude/skills/` parent directory is created, and each `.claude/skills/<name>` is linked to it

#### Scenario: Install selected skills by name

- **WHEN** a user runs `npx @reltio/skills install <name> [<name> …]`
- **THEN** only the named skills are installed; an unknown name causes the command to print the available skill names and exit non-zero without installing anything

#### Scenario: Re-running the installer is safe (our own link)

- **WHEN** the installer runs and `.claude/skills/<name>` already exists as a symlink to the installed `.agents/skills/<name>`
- **THEN** the command refreshes the skill files idempotently and leaves the existing symlink intact

#### Scenario: A conflicting non-symlink entry already exists

- **WHEN** `.claude/skills/<name>` already exists as a real directory or file (not a symlink the installer owns), or as a symlink pointing elsewhere
- **THEN** the command does NOT delete or overwrite it; it warns about the conflict and instructs the user to resolve it or re-run with `--force`

#### Scenario: Forced overwrite of a conflicting link

- **WHEN** the user re-runs with `--force` and a conflicting `.claude/skills/<name>` exists
- **THEN** the command replaces it with the correct symlink, only removing the conflicting entry itself and never recursing into unrelated content

#### Scenario: Symlinks unavailable on the platform

- **WHEN** the environment cannot create a symlink (e.g. Windows without privilege)
- **THEN** the installer falls back to copying the skill files into `.claude/skills/<name>` and prints a note that updates require re-running `npx @reltio/skills install`

#### Scenario: Installer reports next steps without editing consumer config

- **WHEN** installation completes
- **THEN** the command prints a suggested pointer line for `AGENTS.md`/`CLAUDE.md`, without modifying those files

### Requirement: Storybook how-to guide rendered from the single source

The platform Storybook SHALL include a guide page that demonstrates and explains
how external consumers adopt `@reltio/design` components with the skill (install
via `@reltio/skills`, discovery via the `@reltio/design components` bin, and the
migration workflow). The guide SHALL render the skill body from the same
`packages/skills/skills/` source files (e.g. via a raw import) rather than
duplicating the text by copy-paste.

#### Scenario: Guide content stays in sync with the skill

- **WHEN** the `adopt-reltio-design` `SKILL.md` or `playbook.md` source is edited
- **THEN** the Storybook guide reflects the change without any manual copy of the text, because it renders the same source files

#### Scenario: Guide explains the consumer onboarding path

- **WHEN** a consumer opens the guide page in Storybook
- **THEN** it shows the `npx @reltio/skills install` step, the `npx @reltio/design components` discovery command, and the inventory→match→deep-dive→migrate→verify workflow
