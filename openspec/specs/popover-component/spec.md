# Popover Component Specification

## Purpose

The Popover component is an uncontrolled anchored overlay built on the native Popover API and CSS Anchor Positioning. It renders a trigger element that toggles a popover panel positioned relative to it. Features include light dismiss, auto-close on content click, optional header/footer slots, configurable placement via `positionArea`, focus management via `data-autofocus`, and toggle notifications via `onToggle`. No React state is needed for basic usage.

## Requirements

### Requirement: Trigger and Content Rendering

The Popover component SHALL accept a required `trigger` prop (`ReactElement`) and `children` as popover content. Both SHALL be wrapped in a root `<span>` element that handles click-to-toggle and anchor scoping. The trigger SHALL be rendered as-is without prop injection.

#### Scenario: Trigger renders unchanged
- **WHEN** a `trigger` element is provided
- **THEN** it renders inside the wrapper span without any injected props

#### Scenario: Children render as popover content
- **WHEN** `children` are provided
- **THEN** they render inside a `<div>` with `popover="auto"` in a scrollable body area

#### Scenario: Trigger toggles the popover
- **WHEN** the user clicks the trigger
- **THEN** the click bubbles to the wrapper span
- **AND** `togglePopover()` is called on the content element
- **AND** the popover opens if closed, or closes if open

### Requirement: Auto-Close on Content Click

The Popover component SHALL close when any element inside the popover content is clicked, because the click event bubbles to the root wrapper which calls `togglePopover()`. This is the default behavior for menus and action lists. Consumers can prevent auto-close by calling `e.stopPropagation()` on a container element inside the popover.

#### Scenario: Menu item click closes popover
- **WHEN** the popover is open
- **AND** the user clicks a menu item inside the popover
- **THEN** the popover closes

#### Scenario: stopPropagation prevents auto-close
- **WHEN** the popover is open
- **AND** a container inside the popover calls `e.stopPropagation()` on click
- **AND** the user clicks an element inside that container
- **THEN** the popover remains open

### Requirement: Uncontrolled State

The Popover component SHALL be fully uncontrolled. The browser manages open/close state via `togglePopover()`. There is no `open` prop.

#### Scenario: No React state needed
- **WHEN** the Popover component is used
- **THEN** the popover opens and closes without any React state management

#### Scenario: Programmatic control via ref
- **WHEN** a consumer needs programmatic control
- **THEN** they can pass a ref and call `showPopover()` / `hidePopover()` on the popover element

### Requirement: Light Dismiss

The Popover component SHALL use `popover="auto"` on the content element. This provides automatic light dismiss behavior: the popover closes on Esc key press or click outside.

#### Scenario: Popover closes on Esc
- **WHEN** the popover is open
- **AND** the user presses the Esc key
- **THEN** the popover closes

#### Scenario: Popover closes on click outside
- **WHEN** the popover is open
- **AND** the user clicks outside the popover content
- **THEN** the popover closes

#### Scenario: Only one auto popover at a time
- **WHEN** a popover with `popover="auto"` is open
- **AND** another `popover="auto"` element opens
- **THEN** the first popover closes automatically

### Requirement: Anchor Positioning via positionArea

The Popover component SHALL accept an optional `positionArea` string prop that maps to the CSS `position-area` property via inline style. This controls where the popover content appears relative to the trigger. The default value SHALL be `"bottom"`.

#### Scenario: Default positioning below trigger
- **WHEN** no `positionArea` prop is provided
- **THEN** the popover content appears below the trigger

#### Scenario: Custom positioning
- **WHEN** `positionArea` is set to `"bottom end"`
- **THEN** the popover content appears below and to the end side of the trigger

#### Scenario: positionArea accepts any valid CSS value
- **WHEN** `positionArea` is set to any valid `position-area` CSS value (e.g., `"top"`, `"bottom span-right"`, `"end"`)
- **THEN** the popover content is positioned accordingly

### Requirement: Scoped Anchor Names

The Popover component SHALL use CSS `anchor-scope: --trigger` and `anchor-name: --trigger` on the root wrapper element, `position-anchor: --trigger` on the popover content, and `width: fit-content` on the root to prevent stretching in grid/flex layouts. This scopes anchor names within each component instance, preventing conflicts when multiple Popovers exist on the same page.

#### Scenario: Multiple popovers without conflicts
- **WHEN** multiple Popover components render on the same page
- **THEN** each popover positions relative to its own trigger
- **AND** opening one does not affect the positioning of another

#### Scenario: Root does not stretch in grid layouts
- **WHEN** the Popover is placed inside a CSS grid or flex container
- **THEN** the root wrapper sizes to fit the trigger element
- **AND** the popover positions relative to the trigger, not the grid cell

### Requirement: Header Slot

The Popover component SHALL accept an optional `header` prop of type `ReactNode`. When provided, the header content renders in a fixed container at the top of the popover with a bottom border separator. The header does not scroll.

#### Scenario: Header renders when provided
- **WHEN** `header` prop is provided with content
- **THEN** it renders at the top of the popover with a bottom border
- **AND** it remains fixed when body content scrolls

#### Scenario: Header is omitted when not provided
- **WHEN** `header` prop is not provided
- **THEN** no header container is rendered

### Requirement: Footer Slot

The Popover component SHALL accept an optional `footer` prop of type `ReactNode`. When provided, the footer content renders in a fixed container at the bottom of the popover with a top border separator. Footer items are right-aligned by default. The footer does not scroll.

#### Scenario: Footer renders when provided
- **WHEN** `footer` prop is provided with content
- **THEN** it renders at the bottom of the popover with a top border
- **AND** elements are right-aligned by default
- **AND** it remains fixed when body content scrolls

#### Scenario: Footer is omitted when not provided
- **WHEN** `footer` prop is not provided
- **THEN** no footer container is rendered

### Requirement: Focus Management via data-autofocus

After opening, the Popover SHALL search for an element with the `data-autofocus` attribute inside the popover content and focus it. This allows consumers to direct focus to a specific element (e.g., an input field). If no `data-autofocus` element is found, no focus change occurs.

#### Scenario: data-autofocus element receives focus
- **WHEN** the popover opens
- **AND** an element inside the popover has `data-autofocus` attribute
- **THEN** that element receives focus

#### Scenario: No focus change without data-autofocus
- **WHEN** the popover opens
- **AND** no element has `data-autofocus` attribute
- **THEN** no focus change occurs

### Requirement: Toggle Callback

The Popover component SHALL accept an optional `onToggle` callback prop that forwards the native `toggle` event from the popover element. This fires when the popover opens or closes. The `data-autofocus` focus logic runs before `onToggle` is called.

#### Scenario: onToggle fires on open
- **WHEN** the popover opens
- **THEN** the `onToggle` callback is called with `event.newState === "open"`

#### Scenario: onToggle fires on close
- **WHEN** the popover closes
- **THEN** the `onToggle` callback is called with `event.newState === "closed"`

### Requirement: Popover Visibility via :popover-open

The Popover content SHALL use `display: flex` only when open via the `:popover-open` pseudo-class. This prevents overriding the browser's native `display: none` for closed popovers.

#### Scenario: Popover is hidden when closed
- **WHEN** the popover is closed
- **THEN** the browser's native `display: none` applies
- **AND** no component CSS overrides it

#### Scenario: Popover uses flex layout when open
- **WHEN** the popover is open
- **THEN** `display: flex; flex-direction: column` applies via `:popover-open`

### Requirement: Rest Props Forwarding

The Popover component SHALL spread rest props onto the popover content `<div>` element, allowing consumers to pass attributes like `className`, `style`, `aria-label`, `data-*`.

#### Scenario: className is composed with classNames utility
- **WHEN** a `className` prop is provided
- **THEN** it is merged with the component's CSS Module classes via `classNames()`

#### Scenario: Native attributes are forwarded
- **WHEN** props like `aria-label` or `data-testid` are provided
- **THEN** they are set on the popover content element

### Requirement: Global Color Tokens

The Popover component SHALL use global `--reltio-color-*` tokens for all color values. No hardcoded hex color values in component CSS.

#### Scenario: Popover uses color tokens
- **WHEN** the Popover component is rendered
- **THEN** background uses `--reltio-color-surface-1`
- **AND** border uses `--reltio-color-border-2`
- **AND** header/footer borders use `--reltio-color-border-1`
- **AND** shadow uses `--reltio-color-shadow-*` tokens

### Requirement: Storybook Documentation

The Popover component SHALL have Storybook stories demonstrating its usage, including menu content, AI chat with header/footer, form content with stopPropagation, and custom positioning.

#### Scenario: Default story shows basic popover
- **WHEN** viewing the Default story
- **THEN** a trigger button and popover content are displayed

#### Scenario: Story with menu content
- **WHEN** viewing the MenuContent story
- **THEN** the popover contains action items that close the popover on click

#### Scenario: Story with AI chat
- **WHEN** viewing the AiChat story
- **THEN** the popover has header, footer with TextArea, and a scrollable Chat component with messages

#### Scenario: Story with form content
- **WHEN** viewing the WithForm story
- **THEN** the popover contains a TextArea that remains interactive (stopPropagation) with data-autofocus

#### Scenario: Story with all position variants
- **WHEN** viewing the CustomPosition story
- **THEN** a 3x3 grid of triggers demonstrates all 9 position-area values

### Requirement: TypeScript Types

All types SHALL be defined in a separate `Popover.types.ts` file using the `type` keyword.

#### Scenario: PopoverProps type is available
- **WHEN** a developer imports `PopoverProps`
- **THEN** `trigger` (required), `positionArea`, `onToggle`, `header`, `footer`, `children`, and standard div attributes are available
- **AND** TypeScript provides autocomplete for all props
