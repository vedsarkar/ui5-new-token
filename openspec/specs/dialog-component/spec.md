# Dialog Component Specification

## Purpose

The Dialog component is a controlled modal dialog built on the native HTML `<dialog>` element. It opens via `showModal()`, providing backdrop, focus trapping, Esc dismiss, click-outside dismiss, and top-layer promotion automatically. It supports optional header (with close button) and footer slots, with body content via children rendered in a white card on a lavender background. Focus can be directed to a specific element using the `data-autofocus` attribute.

## Requirements

### Requirement: Controlled Visibility

The Dialog component SHALL be fully controlled via an `open` boolean prop. When `open` is `true`, the dialog opens via the native `showModal()` method. When `open` is `false`, the dialog closes via the native `close()` method. The component SHALL guard against redundant calls by checking the element's `open` state before invoking `showModal()` or `close()`.

#### Scenario: Dialog opens when open prop becomes true
- **WHEN** `open` prop changes from `false` to `true`
- **THEN** the native `showModal()` method is called on the `<dialog>` element
- **AND** the dialog is promoted to the browser's top layer
- **AND** a backdrop is rendered behind the dialog
- **AND** background content becomes inert

#### Scenario: Dialog closes when open prop becomes false
- **WHEN** `open` prop changes from `true` to `false`
- **THEN** the native `close()` method is called on the `<dialog>` element
- **AND** the dialog is removed from the top layer
- **AND** background content is no longer inert

#### Scenario: Redundant showModal is not called
- **WHEN** `open` prop is `true`
- **AND** the native `<dialog>` element is already open
- **THEN** `showModal()` SHALL NOT be called again

#### Scenario: Redundant close is not called
- **WHEN** `open` prop is `false`
- **AND** the native `<dialog>` element is already closed
- **THEN** `close()` SHALL NOT be called again

### Requirement: Close Callback

The Dialog component SHALL accept an `onClose` callback prop that fires whenever the dialog is dismissed, regardless of the dismiss method (Esc key, click outside, close button, or programmatic close).

#### Scenario: onClose fires on Esc key
- **WHEN** the dialog is open
- **AND** the user presses the Esc key
- **THEN** the `onClose` callback is called

#### Scenario: onClose fires on click outside
- **WHEN** the dialog is open
- **AND** the user clicks the backdrop area outside the dialog
- **THEN** the `onClose` callback is called

#### Scenario: onClose fires on close button click
- **WHEN** the dialog is open with a `header` prop
- **AND** the user clicks the close button in the header
- **THEN** the `onClose` callback is called

#### Scenario: onClose fires on native close event
- **WHEN** the dialog is open
- **AND** the native `close` event fires on the `<dialog>` element
- **THEN** the `onClose` callback is called

### Requirement: Light Dismiss via closedby

The Dialog component SHALL always set the `closedby="any"` attribute on the native `<dialog>` element. This attribute SHALL NOT be configurable via props. All dialogs are dismissable via Esc key and click outside.

#### Scenario: closedby attribute is always set
- **WHEN** the Dialog component renders
- **THEN** the `<dialog>` element has `closedby="any"` attribute

#### Scenario: Graceful degradation without closedby support
- **WHEN** the browser does not support the `closedby` attribute
- **THEN** modal dialogs fall back to default behavior (Esc key works, click outside does not)
- **AND** no JavaScript error occurs

### Requirement: Header Slot

The Dialog component SHALL accept an optional `header` prop of type `ReactNode`. When provided, the header content renders in a styled container at the top of the dialog on the lavender background. The header container SHALL have default typography (16px, font-weight 600) and flex row layout with gap for multiple elements. When `header` is provided, a close button with a × icon SHALL be rendered in the top-right corner of the header.

#### Scenario: Header renders when provided
- **WHEN** `header` prop is provided with content
- **THEN** the content renders inside a `<div>` at the top of the dialog
- **AND** a close button with × icon appears to the right
- **AND** the header has default typography (16px, bold)

#### Scenario: Close button calls onClose
- **WHEN** the user clicks the close button in the header
- **THEN** the `onClose` callback is called

#### Scenario: Close button is accessible
- **WHEN** the close button renders
- **THEN** it has `aria-label="Close"`
- **AND** it is focusable and keyboard-activatable

#### Scenario: Header is omitted when not provided
- **WHEN** `header` prop is not provided
- **THEN** no header container and no close button are rendered

### Requirement: Footer Slot

The Dialog component SHALL accept an optional `footer` prop of type `ReactNode`. When provided, the footer content renders in a styled container at the bottom of the dialog on the lavender background. The footer container SHALL use flex row layout with items right-aligned by default (`justify-content: flex-end`) and gap between elements.

#### Scenario: Footer renders when provided
- **WHEN** `footer` prop is provided with content
- **THEN** the content renders inside a `<div>` at the bottom of the dialog
- **AND** elements are right-aligned by default

#### Scenario: Footer is omitted when not provided
- **WHEN** `footer` prop is not provided
- **THEN** no footer container is rendered

### Requirement: Body Content via Children

The Dialog component SHALL render its `children` as the main body content between the header and footer slots. The body area SHALL have a white background with rounded corners, creating a card-like appearance within the lavender dialog. The body area SHALL be scrollable when content overflows.

#### Scenario: Children render as body content
- **WHEN** `children` are provided
- **THEN** they render in a white rounded card between the header and footer

#### Scenario: Body scrolls on overflow
- **WHEN** body content exceeds the available height
- **THEN** the body area scrolls independently
- **AND** header and footer remain fixed in position

### Requirement: Focus Management via data-autofocus

After opening, the Dialog SHALL search for an element with the `data-autofocus` attribute inside the dialog and focus it. This allows consumers to control which element receives initial focus. If no `data-autofocus` element is found, the browser's default `showModal()` focus behavior applies (first focusable element).

#### Scenario: data-autofocus element receives focus
- **WHEN** the dialog opens
- **AND** an element inside the dialog has `data-autofocus` attribute
- **THEN** that element receives focus after `showModal()`

#### Scenario: Default focus without data-autofocus
- **WHEN** the dialog opens
- **AND** no element has `data-autofocus` attribute
- **THEN** the browser's default `showModal()` focus behavior applies

### Requirement: Native dialog Semantics

The Dialog component SHALL render as a native `<dialog>` HTML element and always open via `showModal()`. The browser provides modal semantics automatically: `role="dialog"`, `aria-modal="true"`, focus trapping, and inert background.

#### Scenario: Renders as native dialog element
- **WHEN** the Dialog component is rendered
- **THEN** the root element is a `<dialog>` HTML element

#### Scenario: Focus is trapped inside modal
- **WHEN** the dialog is open
- **AND** user presses Tab
- **THEN** focus cycles through focusable elements inside the dialog
- **AND** focus does not leave the dialog

#### Scenario: Focus returns on close
- **WHEN** the dialog closes
- **THEN** focus returns to the element that was focused before the dialog opened

### Requirement: CSS Animations

The Dialog component SHALL use CSS-only transitions for open and close animations using `@starting-style` and `allow-discrete`. Browsers that do not support these features SHALL display the dialog instantly without animation. During the close animation, `pointer-events: none` SHALL be set on the dialog and backdrop to prevent blocking clicks on the page below.

#### Scenario: Dialog animates on open
- **WHEN** the dialog opens
- **AND** the browser supports `@starting-style`
- **THEN** the dialog transitions from `opacity: 0` and `scale(0.97)` to `opacity: 1` and `scale(1)`
- **AND** the backdrop transitions from transparent to semi-opaque

#### Scenario: Dialog animates on close
- **WHEN** the dialog closes
- **AND** the browser supports `allow-discrete` transitions
- **THEN** the dialog transitions from `opacity: 1` to `opacity: 0`
- **AND** the backdrop fades out
- **AND** `pointer-events: none` prevents click blocking during animation

#### Scenario: No animation on initial open
- **WHEN** the dialog is initially open on page load (`open={true}` on mount)
- **THEN** the dialog appears instantly without animation
- **AND** subsequent open/close cycles animate normally

#### Scenario: Graceful degradation without animation support
- **WHEN** the browser does not support `@starting-style` or `allow-discrete`
- **THEN** the dialog appears and disappears instantly
- **AND** no visual breakage or JavaScript error occurs

### Requirement: Rest Props Forwarding

The Dialog component SHALL spread all rest props onto the native `<dialog>` element, allowing consumers to pass any native HTML dialog attributes (e.g., `className`, `style`, `id`, `aria-label`, `data-*`).

#### Scenario: className is composed with classNames utility
- **WHEN** a `className` prop is provided
- **THEN** it is merged with the component's CSS Module classes via `classNames()`

#### Scenario: Native attributes are forwarded
- **WHEN** props like `id`, `aria-label`, or `data-testid` are provided
- **THEN** they are set on the native `<dialog>` element

### Requirement: Global Color Tokens

The Dialog component SHALL use global `--reltio-color-*` tokens for all color values. No hardcoded hex color values in component CSS.

#### Scenario: Dialog uses color tokens
- **WHEN** the Dialog component is rendered
- **THEN** dialog background uses `--reltio-color-surface-2` (lavender)
- **AND** body card uses `--reltio-color-surface-1` (white)
- **AND** border uses a `--reltio-color-border-*` token
- **AND** backdrop uses `--reltio-color-bg-modal`

### Requirement: Storybook Documentation

The Dialog component SHALL have Storybook stories demonstrating its usage. Stories SHALL use the `cssClasses` parameter and open the dialog by default (`useState(true)`) for Chromatic visual testing. The docs page SHALL not render stories inline (since modal overlays conflict) and instead display a message directing users to the sidebar navigation.

#### Scenario: Default story shows basic dialog
- **WHEN** viewing the Default story
- **THEN** a dialog with body content is open

#### Scenario: Story with header and footer
- **WHEN** viewing the WithHeaderAndFooter story
- **THEN** a dialog with `header`, `footer`, and close button is open

#### Scenario: Story with custom body
- **WHEN** viewing the CustomBody story
- **THEN** a dialog with custom content (title, description, form inputs, action buttons) is open

#### Scenario: Story with scrollable content
- **WHEN** viewing the ScrollableContent story
- **THEN** a dialog with overflowing body content is open and scrollable

#### Scenario: Docs page does not render stories inline
- **WHEN** viewing the Dialog docs page
- **THEN** Props and CSS classes are displayed
- **AND** a message explains that stories must be viewed individually via sidebar

### Requirement: TypeScript Types

All types SHALL be defined in a separate `Dialog.types.ts` file using the `type` keyword. The component props SHALL use `HtmlProps<"dialog", CustomProps>` from `@/utils/types`.

#### Scenario: DialogProps uses HtmlProps
- **WHEN** a developer imports `DialogProps`
- **THEN** it extends native `<dialog>` attributes via `HtmlProps`
- **AND** custom props (`open`, `onClose`, `header`, `footer`) are available
- **AND** TypeScript provides autocomplete for all props
