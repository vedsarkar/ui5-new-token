# MarkdownDetails Component Specification

## Purpose

The MarkdownDetails component renders GitHub Flavored Markdown (GFM) `<details>` blocks with enhanced visual design, icon indicators, and improved accessibility. It manages its own open/closed state and extracts summary content from its children, providing a consistent and accessible collapsible content experience within Markdown-rendered content.

## ADDED Requirements

### Requirement: Details Block Rendering

The MarkdownDetails component SHALL render a collapsible details block that displays a summary and expandable content, managing its open/closed state internally.

#### Scenario: Details block renders with summary
- **WHEN** MarkdownDetails component receives children containing a `<summary>` element
- **THEN** the summary content is extracted and displayed in the summary element
- **AND** all non-summary children are rendered as expandable content
- **AND** the details block is initially closed (unless open prop is provided)

#### Scenario: Details block renders with default summary
- **WHEN** MarkdownDetails component receives children without a `<summary>` element
- **THEN** a default fallback label is displayed in the summary element
- **AND** all children are rendered as expandable content
- **AND** the default label is clearly visible and accessible

#### Scenario: Details block manages open/closed state
- **WHEN** user clicks on the summary element
- **THEN** the details block toggles between open and closed states
- **AND** the expandable content is shown when open and hidden when closed
- **AND** the state change is visually indicated (icon rotation, animation)

### Requirement: Summary Extraction

The MarkdownDetails component SHALL extract the `<summary>` node from its children, using it as the title when present, or providing a default fallback when absent.

#### Scenario: Summary element is extracted from children
- **WHEN** MarkdownDetails receives children containing a `<summary>` element
- **THEN** the summary element is identified and extracted
- **AND** its content is used as the details block title
- **AND** the summary element itself is not rendered in the expandable content area

#### Scenario: Default summary is provided when missing
- **WHEN** MarkdownDetails receives children without a `<summary>` element
- **THEN** a default fallback label is displayed (e.g., "Details" or "Click to expand")
- **AND** the fallback label is clearly visible and indicates the collapsible nature
- **AND** all provided children are rendered as expandable content

#### Scenario: Multiple summary elements handled correctly
- **WHEN** MarkdownDetails receives children containing multiple `<summary>` elements
- **THEN** only the first summary element is used as the title
- **AND** subsequent summary elements are rendered as part of the expandable content

### Requirement: Icon Indicators

The MarkdownDetails component SHALL display icons: a CodeBrackets icon to the left of the summary text, and ExpandLess/ExpandMore icons on the right to indicate the expandable state.

#### Scenario: Leading icon (left of summary)
- **WHEN** MarkdownDetails component is rendered
- **THEN** a CodeBrackets icon is displayed to the left of the summary text
- **AND** the leading icon uses the same size and color conventions as the expand icon
- **AND** the leading icon is decorative (aria-hidden) so screen readers announce only the summary text

#### Scenario: Expand/collapse icon displays based on state
- **WHEN** details block is closed
- **THEN** ExpandMore icon is displayed on the right
- **WHEN** details block is open
- **THEN** ExpandLess icon is displayed on the right
- **AND** icon transitions smoothly between states

#### Scenario: Expand icon animation on state change
- **WHEN** details block state changes from closed to open (or vice versa)
- **THEN** the expand/collapse icon (right) transitions smoothly
- **AND** animation duration is appropriate (typically 200-300ms)
- **AND** animation does not interfere with accessibility

### Requirement: Native Details Props Support

The MarkdownDetails component SHALL support passing through native `<details>` HTML attributes, including the `open` attribute for initial state.

#### Scenario: Open prop sets initial state
- **WHEN** MarkdownDetails receives `open` prop set to `true`
- **THEN** details block is initially rendered in open state
- **AND** expandable content is visible by default
- **AND** appropriate icon (ExpandLess) is displayed

#### Scenario: Native attributes are passed through
- **WHEN** MarkdownDetails receives native HTML attributes (e.g., `id`, `className`, `data-*` attributes)
- **THEN** attributes are passed through to the underlying `<details>` element
- **AND** attributes do not interfere with component functionality

### Requirement: CSS Modules Styling

The MarkdownDetails component SHALL apply all styling via CSS Modules classes only, with no global styles or tag-based selectors.

#### Scenario: All styling via CSS Modules
- **WHEN** MarkdownDetails component is rendered
- **THEN** all styling is applied through CSS Modules classes
- **AND** no global CSS rules target details or summary elements
- **AND** no element selectors (e.g., `details {}`, `summary {}`) are used in global stylesheets

#### Scenario: CSS custom properties defined on root
- **WHEN** MarkdownDetails component is rendered
- **THEN** all CSS custom properties are defined on `.root` class
- **AND** variables use `--reltio-markdown-details-` prefix
- **AND** all variables include fallback values
- **AND** internal elements use only CSS variables, never direct values

#### Scenario: External customization via CSS variables
- **WHEN** developer provides style prop with CSS variables
- **THEN** MarkdownDetails applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<MarkdownDetails style={{ "--reltio-markdown-details-border-color": "#0066cc" }}>`

### Requirement: TypeScript Type Safety

The MarkdownDetails component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate MarkdownDetails.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses MarkdownDetails component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Children prop type
- **WHEN** children prop is provided
- **THEN** children accepts React.ReactNode type
- **AND** type supports both single and multiple children
- **AND** type is clearly documented

#### Scenario: Types exported alongside component
- **WHEN** developer imports MarkdownDetails
- **THEN** MarkdownDetailsProps type can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The MarkdownDetails component SHALL have comprehensive Storybook stories demonstrating all use cases, with each story showing only ONE variant.

#### Scenario: Stories for summary handling
- **WHEN** viewing Storybook
- **THEN** separate story exists for default summary fallback
- **AND** separate story exists for custom summary
- **AND** each story clearly demonstrates the difference

#### Scenario: Stories for state management
- **WHEN** viewing Storybook
- **THEN** story exists for initially open state
- **AND** story exists for initially closed state
- **AND** story exists demonstrating open/close interaction

#### Scenario: Stories for content types
- **WHEN** viewing Storybook
- **THEN** story exists for nested Markdown content inside details
- **AND** story exists for multiple details blocks
- **AND** stories demonstrate various content types (text, lists, code, etc.)

#### Scenario: Stories for accessibility features
- **WHEN** viewing Storybook
- **THEN** stories demonstrate keyboard navigation
- **AND** a11y addon shows no violations
- **AND** screen reader compatibility is demonstrated

### Requirement: Accessibility

The MarkdownDetails component SHALL be accessible via keyboard navigation and screen readers, following WCAG 2.1 Level AA standards.

#### Scenario: Keyboard navigation works
- **WHEN** user navigates to summary element using keyboard (Tab)
- **THEN** summary element receives focus
- **AND** focus indicator is clearly visible
- **WHEN** user presses Enter or Space while focused on summary
- **THEN** details block toggles open/closed state
- **AND** focus remains on summary element

#### Scenario: Screen reader compatibility
- **WHEN** screen reader encounters details block
- **THEN** summary text is announced
- **AND** expandable state is communicated (aria-expanded attribute)
- **AND** content is accessible when expanded

#### Scenario: ARIA attributes are correct
- **WHEN** MarkdownDetails component is rendered
- **THEN** summary element has appropriate ARIA attributes
- **AND** aria-expanded reflects current state
- **AND** aria-controls is used if needed for content association
