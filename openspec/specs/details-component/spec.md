# details-component Specification

## Purpose

Provides an enhanced collapsible details block with consistent design system styling, icon indicators, and accessibility support for rendering expandable content sections.

## Requirements

### Requirement: Details Block Rendering

The Details component SHALL render a native `<details>` HTML element with a collapsible content block, managing its open/closed state internally while syncing with the `open` prop.

#### Scenario: Details block renders with summary from children
- **WHEN** Details component receives children containing a `<summary>` element
- **THEN** the summary content is extracted and displayed in the custom summary layout
- **AND** all non-summary children are rendered as expandable content
- **AND** the details block is initially closed (unless `open` prop is `true`)

#### Scenario: Details block renders with default summary
- **WHEN** Details component receives children without a `<summary>` element
- **THEN** a default fallback label "Details" is displayed in the summary area
- **AND** all children are rendered as expandable content

#### Scenario: Open/close toggle via user interaction
- **WHEN** user clicks on the summary element
- **THEN** the details block toggles between open and closed states via `onToggle` handler
- **AND** internal state is synced with the native `<details>` element's open state

#### Scenario: Open prop syncs with internal state
- **WHEN** the `open` prop changes externally
- **THEN** the internal `isOpen` state is updated via `useEffect`
- **AND** the UI reflects the new state

### Requirement: Summary Extraction

The Details component SHALL extract the `<summary>` node from its children using `React.Children.forEach`, displaying it as the title when present or showing a default fallback.

#### Scenario: Summary element is extracted from children
- **WHEN** Details receives children containing a `<summary>` element
- **THEN** the summary element is identified by checking `child.type === "summary"`
- **AND** its inner content (children of the summary) is used as the title text
- **AND** the summary element is not duplicated in the expandable content area

#### Scenario: Default summary is provided when missing
- **WHEN** Details receives children without a `<summary>` element
- **THEN** the fallback label "Details" is displayed
- **AND** all provided children are rendered as expandable content

### Requirement: Icon Indicators

The Details component SHALL display a CodeBrackets icon to the left of the summary text and ExpandLess/ExpandMore icons on the right to indicate the expandable state.

#### Scenario: Leading icon (left of summary)
- **WHEN** Details component is rendered
- **THEN** a `CodeBrackets` icon with `size="small"` is displayed to the left of the summary text
- **AND** the icon is wrapped in a `span` with `aria-hidden="true"`

#### Scenario: Expand/collapse icon displays based on state
- **WHEN** details block is closed (isOpen is false)
- **THEN** `ExpandMore` icon with `size="small"` is displayed on the right
- **WHEN** details block is open (isOpen is true)
- **THEN** `ExpandLess` icon with `size="small"` is displayed on the right
- **AND** icons have `aria-hidden="true"`

#### Scenario: Chevron styling changes on open
- **WHEN** details block state changes
- **THEN** the chevron wrapper applies `styles.chevronOpen` class when open
- **AND** CSS transitions handle the visual change

### Requirement: Native Details Props Support

The Details component SHALL support passing through native `<details>` HTML attributes via rest props, in addition to `open`, `children`, `className`, and `style`.

#### Scenario: Open prop sets initial state
- **WHEN** Details receives `open` prop set to `true`
- **THEN** the native `<details>` element has `open` attribute set
- **AND** expandable content is visible by default
- **AND** the `ExpandLess` icon is displayed

#### Scenario: Native attributes are passed through
- **WHEN** Details receives additional HTML attributes (e.g., `id`, `data-*`)
- **THEN** attributes are spread onto the underlying `<details>` element via `...rest`

### Requirement: CSS Custom Properties Customization

The Details component SHALL define all design tokens as CSS custom properties on the `.root` class with `--reltio-details-` prefix, enabling external customization.

#### Scenario: All CSS variables defined on root
- **WHEN** Details component is rendered
- **THEN** CSS custom properties are defined on `.root` class
- **AND** variables use `--reltio-details-` prefix
- **AND** variables cover: background-color, border-color, border-radius, border-width, font-family, font-size, summary text/hover/padding/gap, title font-weight, chevron size/color, transition duration/ease, content text-color/line-height/padding, code colors

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** Details applies custom values
- **AND** example: `<Details style={{ "--reltio-details-border-color": "#0066cc" }}>`

### Requirement: className Utility Usage

The Details component SHALL use the `classNames` utility from `utils/classNames.ts` for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** Details component is rendered
- **THEN** `classNames` utility combines `styles.root` with custom className
- **AND** chevron classes are composed with conditional `styles.chevronOpen`

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are appended to the root element
- **AND** CSS module classes are preserved

### Requirement: TypeScript Type Safety

The Details component SHALL be fully typed with TypeScript in strict mode, with all types in a separate `Details.types.ts` file using the `type` keyword.

#### Scenario: Component props fully typed
- **WHEN** developer uses Details component
- **THEN** `open` is typed as optional boolean (default false)
- **AND** `children` is typed as `React.ReactNode`
- **AND** `className` is typed as optional string
- **AND** `style` is typed as `React.CSSProperties & DetailsStyleVars`
- **AND** additional details attributes are typed via `Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "open" | "className" | "style" | "children">`

#### Scenario: DetailsStyleVars type defines CSS custom properties
- **WHEN** developer overrides styles
- **THEN** `DetailsStyleVars` type provides autocomplete for all `--reltio-details-*` CSS variables
- **AND** all properties are typed as optional string

#### Scenario: Types exported alongside component
- **WHEN** developer imports Details
- **THEN** `DetailsProps` and `DetailsStyleVars` types can be imported
- **AND** types are in `Details.types.ts`

### Requirement: Storybook Documentation

The Details component SHALL have comprehensive Storybook stories demonstrating all use cases, with each story showing only ONE variant.

#### Scenario: Stories for summary handling
- **WHEN** viewing Storybook
- **THEN** separate story exists for default summary fallback
- **AND** separate story exists for custom summary via `<summary>` child

#### Scenario: Stories for state management
- **WHEN** viewing Storybook
- **THEN** story exists for initially open state
- **AND** story exists for initially closed state

#### Scenario: Stories for content types
- **WHEN** viewing Storybook
- **THEN** story exists for nested content inside details
- **AND** stories demonstrate various content types (text, lists, code)

### Requirement: Accessibility

The Details component SHALL be accessible via keyboard navigation and screen readers, leveraging native `<details>` and `<summary>` semantics.

#### Scenario: Keyboard navigation works
- **WHEN** user navigates to summary element using keyboard (Tab)
- **THEN** summary element receives focus
- **WHEN** user presses Enter or Space while focused on summary
- **THEN** details block toggles open/closed state

#### Scenario: Screen reader compatibility
- **WHEN** screen reader encounters details block
- **THEN** native `<details>`/`<summary>` semantics are used
- **AND** summary text is announced
- **AND** expandable state is communicated by the browser natively
