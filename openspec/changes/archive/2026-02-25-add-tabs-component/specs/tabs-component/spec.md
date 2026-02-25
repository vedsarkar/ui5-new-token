## ADDED Requirements

### Requirement: Tab List Rendering

The Tabs component SHALL render a horizontal list of tab items using semantic HTML with `role="tablist"` on the container and `role="tab"` on each tab item. The component accepts an array of tab items and renders them as clickable elements.

#### Scenario: Default rendering with items
- **WHEN** the Tabs component is rendered with an array of tab items
- **THEN** a container element with `role="tablist"` is rendered
- **AND** each tab item renders as a `<button>` element with `role="tab"`
- **AND** tabs are displayed in a horizontal row using flexbox layout

#### Scenario: Tab item displays label text
- **WHEN** a tab item has a `label` property
- **THEN** the label text is rendered as the tab button content
- **AND** the text is visible and accessible to screen readers

### Requirement: Controlled Selection

The Tabs component SHALL support controlled mode where the active tab is determined by a `value` prop and changes are communicated via an `onChange` callback.

#### Scenario: Active tab matches value prop
- **WHEN** the `value` prop is set to a specific tab value
- **THEN** the corresponding tab has `aria-selected="true"`
- **AND** the active indicator is visible on that tab
- **AND** the tab text color is `var(--reltio-tabs-color-active, #0000cc)`

#### Scenario: onChange fires on tab click
- **WHEN** a user clicks an inactive tab
- **THEN** the `onChange` callback is called with the clicked tab's value
- **AND** the component does not update its own state (controlled by parent)

### Requirement: Uncontrolled Selection

The Tabs component SHALL support uncontrolled mode using a `defaultValue` prop for initial selection with internal state management.

#### Scenario: Initial selection from defaultValue
- **WHEN** `defaultValue` is provided without a `value` prop
- **THEN** the tab matching `defaultValue` is initially selected
- **AND** clicking another tab updates the internal state
- **AND** the active indicator moves to the newly selected tab

#### Scenario: First tab selected by default
- **WHEN** neither `value` nor `defaultValue` is provided
- **THEN** the first tab item is selected by default
- **AND** the active indicator is visible on the first tab

### Requirement: Active Indicator

The Tabs component SHALL display a 2px bottom border indicator on the active tab using a `::after` pseudo-element with a scaleX animation for smooth visual transitions.

#### Scenario: Indicator visible on active tab
- **WHEN** a tab is active (selected)
- **THEN** a 2px bottom indicator appears in `var(--reltio-tabs-indicator-color, #0000cc)`
- **AND** the indicator spans the full width of the tab
- **AND** the indicator has `border-radius: var(--reltio-tabs-indicator-border-radius, 1px)`

#### Scenario: Indicator animates on tab change
- **WHEN** the active tab changes
- **THEN** the previous tab indicator scales down via `transform: scaleX(0)`
- **AND** the new tab indicator scales up via `transform: scaleX(1)`
- **AND** the indicator uses `transform-origin: center` for expand-from-center animation
- **AND** the transition duration is `var(--reltio-tabs-transition-duration, 200ms)`
- **AND** the transition timing is `var(--reltio-tabs-transition-timing, cubic-bezier(0.4, 0, 0.2, 1))`

### Requirement: Tab List Border

The Tabs component SHALL render a subtle bottom border on the tab list container to visually separate tabs from content below.

#### Scenario: Tab list has bottom border
- **WHEN** the Tabs component is rendered
- **THEN** the tab list has a bottom border via `box-shadow: inset 0 -1px 0 var(--reltio-tabs-border-color, #e5e5e5)`
- **AND** the border width is `var(--reltio-tabs-border-width, 1px)`

### Requirement: Hover State

The Tabs component SHALL provide hover feedback on all non-disabled tabs with a subtle background color change, text color transition, and rounded top corners on the hover background.

#### Scenario: Inactive tab hover
- **WHEN** a user hovers over an inactive tab
- **THEN** the tab background changes to `var(--reltio-tabs-hover-background, rgba(0, 0, 204, 0.04))`
- **AND** the text color transitions to `var(--reltio-tabs-color-hover, #000033)`
- **AND** the hover background has `border-radius: var(--reltio-tabs-hover-border-radius, 4px)` on top corners and 0 on bottom
- **AND** the transition uses `var(--reltio-tabs-transition-duration, 200ms)` with `var(--reltio-tabs-transition-timing, cubic-bezier(0.4, 0, 0.2, 1))`

#### Scenario: Active tab hover
- **WHEN** a user hovers over the active tab
- **THEN** the tab background changes to `var(--reltio-tabs-active-hover-background, rgba(0, 0, 204, 0.08))`
- **AND** the text color remains `var(--reltio-tabs-color-active)`
- **AND** the active indicator remains visible

#### Scenario: Press feedback
- **WHEN** a user presses (mousedown/active) on a non-disabled tab
- **THEN** the tab background changes to `var(--reltio-tabs-pressed-background, rgba(0, 0, 204, 0.1))`
- **AND** this approximates Material Design 3 ripple feedback via CSS

### Requirement: Disabled Tab State

The Tabs component SHALL support disabling individual tabs, preventing interaction and providing clear visual feedback.

#### Scenario: Disabled tab prevents interaction
- **WHEN** a tab item has `disabled: true`
- **THEN** the tab button has `aria-disabled="true"`
- **AND** the tab has `pointer-events: none`
- **AND** the cursor displays as `var(--reltio-tabs-disabled-cursor, not-allowed)`

#### Scenario: Disabled tab visual appearance
- **WHEN** a tab item is disabled
- **THEN** the text color is `var(--reltio-tabs-color-disabled, #7c7c7c)`
- **AND** the opacity is `var(--reltio-tabs-disabled-opacity, 0.38)`
- **AND** no hover or focus effects apply

#### Scenario: Disabled tab skipped in keyboard navigation
- **WHEN** a user navigates tabs with arrow keys
- **AND** the next tab in sequence is disabled
- **THEN** that tab is skipped
- **AND** focus moves to the next enabled tab

### Requirement: Keyboard Navigation

The Tabs component SHALL implement the WAI-ARIA Tabs pattern with roving tabindex for keyboard navigation, supporting ArrowLeft, ArrowRight, Home, and End keys.

#### Scenario: Tab key enters tab list
- **WHEN** a user presses Tab to focus the tab list
- **THEN** the currently active tab receives focus
- **AND** a visible focus indicator appears

#### Scenario: ArrowRight moves to next tab
- **WHEN** a tab has focus
- **AND** the user presses ArrowRight
- **THEN** focus moves to the next enabled tab
- **AND** if at the last tab, focus wraps to the first enabled tab

#### Scenario: ArrowLeft moves to previous tab
- **WHEN** a tab has focus
- **AND** the user presses ArrowLeft
- **THEN** focus moves to the previous enabled tab
- **AND** if at the first tab, focus wraps to the last enabled tab

#### Scenario: Home key moves to first tab
- **WHEN** a tab has focus
- **AND** the user presses Home
- **THEN** focus moves to the first enabled tab

#### Scenario: End key moves to last tab
- **WHEN** a tab has focus
- **AND** the user presses End
- **THEN** focus moves to the last enabled tab

#### Scenario: Enter or Space activates focused tab
- **WHEN** a tab has keyboard focus
- **AND** the user presses Enter or Space
- **THEN** the focused tab becomes the active tab
- **AND** the `onChange` callback is called with the tab's value

### Requirement: Focus Visible State

The Tabs component SHALL display a visible focus indicator when tabs receive keyboard focus, following the focus-visible pattern to avoid showing focus on mouse clicks.

#### Scenario: Focus visible outline on keyboard focus
- **WHEN** a tab receives focus via keyboard navigation
- **THEN** an outline of `2px solid var(--reltio-tabs-color-focus-ring, #0000cc)` appears
- **AND** the outline-offset is `-2px` (inset)
- **AND** the outline has `border-radius: 4px`

#### Scenario: No focus outline on mouse click
- **WHEN** a tab is clicked with a mouse
- **THEN** no focus outline is visible
- **AND** the tab becomes active with indicator visible

### Requirement: Screen Reader Support

The Tabs component SHALL provide proper ARIA attributes for screen reader compatibility following the WAI-ARIA Tabs pattern.

#### Scenario: Tab list has accessible label
- **WHEN** an `aria-label` prop is provided to the Tabs component
- **THEN** the tab list container has the `aria-label` attribute
- **AND** screen readers announce the label when entering the tab list

#### Scenario: Active tab announced
- **WHEN** a tab is active
- **THEN** it has `aria-selected="true"`
- **AND** inactive tabs have `aria-selected="false"`
- **AND** screen readers announce the selection state

#### Scenario: Tab count announced
- **WHEN** a user focuses a tab
- **THEN** screen readers announce the tab position (e.g., "tab 1 of 3")

### Requirement: CSS Custom Properties Customization

The Tabs component SHALL define all design tokens as CSS custom properties on the `.root` element with `--reltio-tabs-` prefix, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** the Tabs component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class
- **AND** variables use the `--reltio-tabs-` prefix
- **AND** all variables include fallback values

#### Scenario: Typography variables
- **WHEN** the Tabs component is rendered
- **THEN** `--reltio-tabs-font-family` defaults to `var(--reltio-font-family-body, "Libre Franklin", sans-serif)`
- **AND** `--reltio-tabs-font-size` defaults to `var(--reltio-font-size-sm, 14px)`
- **AND** `--reltio-tabs-font-weight` defaults to `var(--reltio-font-weight-body, 500)`
- **AND** `--reltio-tabs-line-height` defaults to `var(--reltio-line-height-body, 1.5)`
- **AND** `--reltio-tabs-letter-spacing` defaults to `var(--reltio-letter-spacing-label, 0.1px)`

#### Scenario: Color variables
- **WHEN** the Tabs component is rendered
- **THEN** `--reltio-tabs-color-active` defaults to `var(--reltio-color-primary, #0000cc)`
- **AND** `--reltio-tabs-color-inactive` defaults to `var(--reltio-color-text-secondary, #7c7c7c)`
- **AND** `--reltio-tabs-color-hover` defaults to `var(--reltio-color-text, #000033)`
- **AND** `--reltio-tabs-color-disabled` defaults to `var(--reltio-color-text-disabled, #7c7c7c)`

#### Scenario: Indicator variables
- **WHEN** the Tabs component is rendered
- **THEN** `--reltio-tabs-indicator-height` defaults to `2px`
- **AND** `--reltio-tabs-indicator-color` defaults to `var(--reltio-color-primary, #0000cc)`
- **AND** `--reltio-tabs-indicator-border-radius` defaults to `1px`

#### Scenario: Spacing variables
- **WHEN** the Tabs component is rendered
- **THEN** `--reltio-tabs-padding-x` defaults to `var(--reltio-spacing-md, 16px)`
- **AND** `--reltio-tabs-padding-y` defaults to `var(--reltio-spacing-xs, 8px)`
- **AND** `--reltio-tabs-min-height` defaults to `var(--reltio-spacing-2xl, 48px)`
- **AND** `--reltio-tabs-gap` defaults to `0px`

#### Scenario: Interaction variables
- **WHEN** the Tabs component is rendered
- **THEN** `--reltio-tabs-hover-background` defaults to `rgba(0, 0, 204, 0.04)`
- **AND** `--reltio-tabs-active-hover-background` defaults to `rgba(0, 0, 204, 0.08)`
- **AND** `--reltio-tabs-pressed-background` defaults to `rgba(0, 0, 204, 0.1)`
- **AND** `--reltio-tabs-hover-border-radius` defaults to `4px`

#### Scenario: External customization via inline styles
- **WHEN** a developer provides a `style` prop with CSS variables
- **THEN** the Tabs component applies the custom values
- **AND** example: `<Tabs style={{ "--reltio-tabs-color-active": "red" }} />`

### Requirement: classNames Utility Usage

The Tabs component SHALL use the `classNames` utility from `@/utils/classNames` for all className composition.

#### Scenario: classNames composes CSS module classes
- **WHEN** the Tabs component is rendered
- **THEN** the `classNames` utility combines all applicable CSS module classes
- **AND** filters out falsy values
- **AND** supports additional className prop from consumers

### Requirement: TypeScript Type Safety

The Tabs component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate `Tabs.types.ts` file using the `type` keyword.

#### Scenario: Component props fully typed
- **WHEN** a developer uses the Tabs component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete for `value`, `items`, `onChange`, etc.
- **AND** `TabItem` and `TabsProps` types are exported

#### Scenario: Types use type keyword only
- **WHEN** inspecting `Tabs.types.ts`
- **THEN** all type definitions use the `type` keyword
- **AND** no `interface` keyword is used

### Requirement: Storybook Documentation

The Tabs component SHALL have comprehensive Storybook stories demonstrating all variants, states, and use cases, with each story showing only ONE variant.

#### Scenario: Default story
- **WHEN** viewing Storybook
- **THEN** a Default story shows basic tab usage with three tabs
- **AND** the first tab is selected by default

#### Scenario: Controlled story
- **WHEN** viewing Storybook
- **THEN** a Controlled story demonstrates value + onChange pattern
- **AND** tab selection is managed by parent state

#### Scenario: Disabled tab story
- **WHEN** viewing Storybook
- **THEN** a WithDisabledTab story shows a tab list with one disabled tab
- **AND** the disabled tab is visually distinct and non-interactive

#### Scenario: Many tabs story
- **WHEN** viewing Storybook
- **THEN** a ManyTabs story shows behavior with many tab items
- **AND** demonstrates how the component handles overflow

#### Scenario: Custom styled story
- **WHEN** viewing Storybook
- **THEN** a CustomStyled story demonstrates CSS variable overrides
- **AND** shows how to customize colors, spacing, or indicator appearance

#### Scenario: Stories use autodocs
- **WHEN** viewing Storybook
- **THEN** all stories use the "autodocs" tag
- **AND** auto-generated documentation is available
- **AND** stories use `preview.meta()` / `meta.story()` API
