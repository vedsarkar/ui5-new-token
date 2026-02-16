## ADDED Requirements

### Requirement: Global color token definitions
The system SHALL define all shared color tokens as CSS custom properties on `:root` in `public/variables.css`. Tokens SHALL use the naming convention `--reltio-color-{role}`.

The following semantic tokens SHALL be defined:

**Text**: `--reltio-color-text`, `--reltio-color-text-secondary`, `--reltio-color-text-muted`
**Surfaces**: `--reltio-color-surface`, `--reltio-color-surface-raised`
**Borders**: `--reltio-color-border`
**Primary**: `--reltio-color-primary`, `--reltio-color-primary-hover`, `--reltio-color-primary-focus`, `--reltio-color-on-primary`
**Error**: `--reltio-color-error`, `--reltio-color-error-text`, `--reltio-color-error-surface`, `--reltio-color-error-border`
**Accent**: `--reltio-color-accent`
**Effects**: `--reltio-color-overlay`, `--reltio-color-shadow`

#### Scenario: Light theme values defined on :root
- **WHEN** no `data-theme` attribute is set
- **THEN** all `--reltio-color-*` tokens resolve to light theme values defined on `:root`

#### Scenario: Token naming follows semantic convention
- **WHEN** a developer inspects `public/variables.css`
- **THEN** every color token uses the `--reltio-color-{role}` naming pattern with no visual/primitive names (e.g. no `--reltio-blue-600`)

### Requirement: Dark theme overrides
The system SHALL define a `[data-theme="dark"]` block in `public/variables.css` that overrides every `--reltio-color-*` token with dark theme values.

#### Scenario: Dark theme activates via data attribute
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** all `--reltio-color-*` tokens resolve to dark theme values

#### Scenario: All tokens have dark overrides
- **WHEN** the `[data-theme="dark"]` block is defined
- **THEN** every token defined on `:root` SHALL have a corresponding override in the dark block with no tokens missing

### Requirement: No hardcoded colors in variables.css outside token blocks
The `public/variables.css` file SHALL contain only `:root` and `[data-theme="dark"]` token definitions. No component-specific styles SHALL be in this file.

#### Scenario: File contains only token definitions
- **WHEN** a developer reads `public/variables.css`
- **THEN** the file contains only `:root { ... }` and `[data-theme="dark"] { ... }` blocks with `--reltio-color-*` custom properties
