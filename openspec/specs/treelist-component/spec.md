# TreeList Component Specification

## Purpose

The TreeList component renders hierarchical data with expand/collapse controls, visual tree lines connecting nodes, and optional custom label rendering. It supports both controlled and uncontrolled expansion modes, allowing developers to manage expanded state externally or let the component handle it internally. The component follows all Reltio Design System constitution principles including CSS Modules, CSS custom properties, TypeScript strict typing, and accessibility standards.
## Requirements
### Requirement: Hierarchical Data Rendering

The TreeList component SHALL render hierarchical data structures with nested children, supporting unlimited depth levels.

#### Scenario: Single root tree renders correctly
- **WHEN** data prop contains a single root node with nested children
- **THEN** component renders the complete tree structure
- **AND** each node displays at its correct depth level

#### Scenario: Multiple root trees render correctly
- **WHEN** data prop contains multiple root nodes
- **THEN** component renders all root nodes and their children
- **AND** each root tree is visually independent

#### Scenario: Leaf nodes render without expand control
- **WHEN** a node has no children prop (undefined or null)
- **THEN** node renders as a leaf (no toggle button)
- **AND** empty space is shown where toggle button would be

#### Scenario: Parent nodes render with expand control
- **WHEN** a node has a children prop defined (including an empty array while loading or awaiting data)
- **THEN** node renders with a toggle button (chevron icon)
- **AND** toggle button indicates current expand/collapse state

### Requirement: Expand/Collapse Functionality

The TreeList component SHALL provide expand/collapse functionality for parent nodes, with both controlled and uncontrolled modes.

#### Scenario: Toggle button expands collapsed node
- **WHEN** user clicks toggle button on a collapsed parent node
- **THEN** node expands to show its children
- **AND** toggle icon rotates to indicate expanded state

#### Scenario: Toggle button collapses expanded node
- **WHEN** user clicks toggle button on an expanded parent node
- **THEN** node collapses to hide its children
- **AND** toggle icon rotates to indicate collapsed state

#### Scenario: Uncontrolled mode expands top-level nodes by default
- **WHEN** expandedKeys prop is not provided
- **THEN** component manages expanded state internally
- **AND** top-level nodes are expanded by default
- **AND** nested nodes are collapsed by default

#### Scenario: Controlled mode respects expandedKeys prop
- **WHEN** expandedKeys prop is provided
- **THEN** only nodes with keys in expandedKeys are expanded
- **AND** component does not manage expanded state internally

#### Scenario: onExpand callback fires on state change
- **WHEN** user toggles a node's expanded state
- **THEN** onExpand callback is called with updated keys array and the toggled TreeItem
- **AND** arguments include all currently expanded node keys and the node that triggered the change

### Requirement: Visual Tree Lines

The TreeList component SHALL render visual connecting lines between parent and child nodes to indicate hierarchy relationships.

#### Scenario: Vertical lines connect to children
- **WHEN** a parent node has children
- **THEN** vertical lines extend from parent level to child nodes
- **AND** lines use --reltio-tree-list-line-color CSS variable

#### Scenario: Horizontal lines connect to node content
- **WHEN** a child node is rendered
- **THEN** horizontal connector line extends from vertical line to node
- **AND** connector is positioned at vertical center of node

#### Scenario: Last child node has truncated vertical line
- **WHEN** a node is the last child of its parent
- **THEN** vertical line extends only to the vertical center
- **AND** line does not continue below the last child

#### Scenario: Root nodes have no connecting lines
- **WHEN** a node is at root level (depth 0)
- **THEN** no tree lines are rendered for that node
- **AND** tree lines appear only for nested children

### Requirement: Custom Label Rendering

The TreeList component SHALL support custom label rendering via a LabelComponent prop, allowing developers to customize node appearance.

#### Scenario: Default label renders node.label
- **WHEN** LabelComponent prop is not provided
- **THEN** component renders node.label as plain text
- **AND** text inherits styles from CSS variables

#### Scenario: Custom LabelComponent renders for each node
- **WHEN** LabelComponent prop is provided
- **THEN** LabelComponent is rendered for each node
- **AND** LabelComponent receives { data: TreeItem } prop
- **AND** data prop contains the full node object

#### Scenario: Custom labels support complex content
- **WHEN** LabelComponent returns JSX with multiple elements
- **THEN** all elements render correctly in label area
- **AND** layout preserves tree structure alignment

### Requirement: Indentation and Depth

The TreeList component SHALL indent child nodes based on their depth level, with configurable indent size.

#### Scenario: Nodes indent based on depth
- **WHEN** a node is at depth N
- **THEN** node is indented by N * indent-size pixels
- **AND** indent creates clear visual hierarchy

#### Scenario: Indent size is configurable
- **WHEN** --reltio-tree-list-indent-size CSS variable is set
- **THEN** indentation uses the custom value
- **AND** tree lines adjust to match new indent size

### Requirement: CSS Custom Properties Customization

The TreeList component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** TreeList component is rendered
- **THEN** all CSS custom properties are available on .root class
- **AND** variables use --reltio-tree-list- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer wraps TreeList with custom CSS variables
- **THEN** component applies custom values
- **AND** maintains all other styling and behavior

#### Scenario: CSS variables for typography
- **WHEN** TreeList is rendered
- **THEN** font-family defined as --reltio-tree-list-font-family
- **AND** font-size defined as --reltio-tree-list-font-size
- **AND** text-color defined as --reltio-tree-list-text-color
- **AND** line-height defined as --reltio-tree-list-line-height

#### Scenario: CSS variables for layout
- **WHEN** TreeList is rendered
- **THEN** indent-size defined as --reltio-tree-list-indent-size
- **AND** toggle-size defined as --reltio-tree-list-toggle-size
- **AND** row-padding-block defined as --reltio-tree-list-row-padding-block
- **AND** row-padding-inline defined as --reltio-tree-list-row-padding-inline

#### Scenario: CSS variables for appearance
- **WHEN** TreeList is rendered
- **THEN** background defined as --reltio-tree-list-background
- **AND** border-radius defined as --reltio-tree-list-border-radius
- **AND** toggle-color defined as --reltio-tree-list-toggle-color
- **AND** line-color defined as --reltio-tree-list-line-color

### Requirement: Toggle Button Accessibility

The TreeList component SHALL provide accessible toggle buttons for expand/collapse functionality.

#### Scenario: Toggle button has accessible label
- **WHEN** toggle button is rendered
- **THEN** aria-label is set to "Expand" or "Collapse"
- **AND** label reflects current state (inverse of current)

#### Scenario: Toggle icon is decorative
- **WHEN** chevron icon is rendered in toggle button
- **THEN** icon has aria-hidden="true"
- **AND** screen readers ignore the icon

#### Scenario: Toggle button is keyboard accessible
- **WHEN** user navigates with Tab key
- **THEN** toggle buttons are focusable
- **AND** Enter/Space activates the toggle

### Requirement: Performance Optimization

The TreeList component SHALL use React memoization to prevent unnecessary re-renders.

#### Scenario: Component uses React.memo
- **WHEN** TreeList component is defined
- **THEN** component is wrapped with React.memo
- **AND** re-renders only when props change

#### Scenario: TreeNode uses React.memo
- **WHEN** TreeNode subcomponent is defined
- **THEN** component is wrapped with React.memo
- **AND** re-renders only when node-specific props change

#### Scenario: Callbacks are memoized
- **WHEN** event handlers are defined
- **THEN** useCallback is used to memoize handlers
- **AND** dependencies are correctly specified

### Requirement: TypeScript Type Safety

The TreeList component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate TreeList.types.ts file using the `type` keyword (not `interface`).

#### Scenario: TreeItem type defines node structure
- **WHEN** developer uses TreeList component
- **THEN** TreeItem type specifies id, label, optional children, and optional isLoading flag
- **AND** TypeScript validates data structure

#### Scenario: TreeKey type supports string and number
- **WHEN** developer provides node ids
- **THEN** ids can be strings or numbers
- **AND** expanded keys can be strings or numbers

#### Scenario: TreeListProps type defines component props
- **WHEN** developer uses TreeList component
- **THEN** all props are properly typed
- **AND** TypeScript provides autocomplete

#### Scenario: Types exported alongside component
- **WHEN** developer imports TreeList
- **THEN** TreeItem, TreeKey, TreeListProps types can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The TreeList component SHALL have comprehensive Storybook stories demonstrating all variants and use cases.

#### Scenario: Default story shows basic usage
- **WHEN** viewing Storybook
- **THEN** Default story shows single root tree
- **AND** story is interactive with working expand/collapse

#### Scenario: Multiple roots story shows multiple trees
- **WHEN** viewing Storybook
- **THEN** MultipleRoots story shows multi-root data
- **AND** each root tree is independently expandable

#### Scenario: Custom label story demonstrates customization
- **WHEN** viewing Storybook
- **THEN** CustomLabel story shows LabelComponent usage
- **AND** multiple label variants are demonstrable

#### Scenario: CSS variables story shows theming
- **WHEN** viewing Storybook
- **THEN** WithCustomCssVariables story lists all variables
- **AND** variables are interactive and demonstrable

#### Scenario: Controlled story demonstrates controlled mode
- **WHEN** viewing Storybook
- **THEN** ControlledExpanded story shows external state control
- **AND** onExpand callback is visible in actions panel

## Technical Implementation

### Component Structure
- `TreeList.tsx` - Main component implementation
- `TreeList.types.ts` - TypeScript type definitions (using `type`, not `interface`)
- `TreeList.module.css` - CSS Modules styles with CSS variables on .root
- `TreeList.stories.tsx` - Storybook stories
- `helpers.ts` - Utility functions for tree data transformation
- `index.ts` - Public exports
- `components/TreeNode/` - Internal TreeNode subcomponent
- `components/TreeLevelLines/` - Internal tree line rendering
- `components/ChevronIcon.tsx` - Expand/collapse icon

### Dependencies
- React 19
- TypeScript (strict mode)
- CSS Modules
- classNames utility from utils/classNames.ts
- rc-tree (underlying tree rendering library)

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS custom properties required (no IE11)

### Accessibility Standards
- Toggle buttons are keyboard navigable (Tab)
- Toggle buttons have aria-label for screen readers
- Decorative icons marked with aria-hidden
- Focus indicators visible on interactive elements
