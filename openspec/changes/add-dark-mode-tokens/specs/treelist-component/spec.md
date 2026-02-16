## ADDED Requirements

### Requirement: Dark mode rendering
The TreeList component and its subcomponents (TreeNode, TreeLevelLines) SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: TreeList renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** TreeList text, background, toggle, and tree line colors adapt to the dark theme via global color tokens

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-tree-list-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values. Non-color variables (indent-size, toggle-size, padding, border-radius) SHALL retain fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the TreeList component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class with `--reltio-tree-list-` prefix
- **AND** color variables reference global tokens without hardcoded hex fallbacks

#### Scenario: CSS variables for appearance
- **WHEN** the TreeList component is rendered
- **THEN** the following color variables are defined: `--reltio-tree-list-background`, `--reltio-tree-list-toggle-color`, `--reltio-tree-list-line-color`, `--reltio-tree-list-text-color`
- **AND** each references a global `--reltio-color-*` token

#### Scenario: Indent size is configurable
- **WHEN** `--reltio-tree-list-indent-size` CSS variable is set
- **THEN** tree lines adjust to match the new indent size
