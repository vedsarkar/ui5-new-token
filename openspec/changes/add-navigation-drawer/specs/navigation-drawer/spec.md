## ADDED Requirements

### Requirement: Component export

The `NavigationDrawer` component SHALL be exported from `@reltio/design/components` as a named export, together with its `NavigationDrawerProps` and `NavigationDrawerItem` types.

#### Scenario: Public import

- **WHEN** a consumer writes `import { NavigationDrawer, type NavigationDrawerProps, type NavigationDrawerItem } from "@reltio/design/components"`
- **THEN** module resolution succeeds and all three symbols are available with TypeScript types

### Requirement: Controlled open state

The component SHALL be fully controlled — `open: boolean` and `onOpenChange: (open: boolean) => void` are REQUIRED props with no defaults. The component SHALL NOT hold internal `open` state. Every state transition (trigger click, backdrop click, ESC key, item click) SHALL be expressed via a call to `onOpenChange` with the new desired state value.

#### Scenario: Trigger button click requests open

- **WHEN** the component is rendered with `open={false}` and the user clicks the trigger (hamburger) button
- **THEN** `onOpenChange(true)` is called exactly once

#### Scenario: Backdrop click requests close

- **WHEN** the component is rendered with `open={true}` and the user clicks the backdrop (outside the panel)
- **THEN** `onOpenChange(false)` is called exactly once

#### Scenario: ESC key requests close

- **WHEN** the component is rendered with `open={true}` and the user presses the `Escape` key while focus is inside the panel
- **THEN** `onOpenChange(false)` is called exactly once

#### Scenario: Open state is not auto-toggled

- **WHEN** the component is rendered with `open={false}` and the consumer's `onOpenChange` does NOT update the parent state in response to a trigger click
- **THEN** the drawer panel remains closed (component does not toggle its own state)

### Requirement: Grouped items

The component SHALL accept `items: NavigationDrawerItem[]` where each item has the shape `{ label: string, href: string, icon?: string, group?: string }`. Items SHALL be grouped by their `group` field, preserving the input order within each group. The order of groups in the rendered panel SHALL match the order in which each `group` value first appears in the input array. Items with no `group` field SHALL form an implicit leading group rendered without a header label.

#### Scenario: Items rendered in flat-array order

- **WHEN** the component is rendered with `items=[{label: "A", href: "/a"}, {label: "B", href: "/b"}, {label: "C", href: "/c"}]` (no groups) and `open={true}`
- **THEN** the panel renders A, B, C in that order under an implicit ungrouped section

#### Scenario: Items grouped by group field

- **WHEN** the component is rendered with `items=[{label: "A", href: "/a", group: "G1"}, {label: "B", href: "/b", group: "G2"}, {label: "C", href: "/c", group: "G1"}]` and `open={true}`
- **THEN** the panel renders group `G1` first (with items A, C in that order) followed by group `G2` (with item B); the group headers `G1` and `G2` are visible

#### Scenario: Mixed grouped and ungrouped items

- **WHEN** the component is rendered with `items=[{label: "X", href: "/x"}, {label: "A", href: "/a", group: "G1"}, {label: "Y", href: "/y"}]` and `open={true}`
- **THEN** items X and Y appear first under the implicit ungrouped section (in that order), followed by group `G1` containing A

### Requirement: Active-item highlighting

The component SHALL accept an optional `activeHref?: string` prop. When supplied, the item whose `href` matches `activeHref` exactly (case-sensitive string equality) SHALL render as visually selected (using the SAP Fiori "selected" treatment exposed by `SideNavigation`). When `activeHref` is omitted or does not match any item's `href`, no item is marked as selected.

#### Scenario: Matching item is selected

- **WHEN** the component is rendered with `items=[{label: "Home", href: "/"}, {label: "Settings", href: "/settings"}]`, `activeHref="/settings"`, and `open={true}`
- **THEN** the rendered `Settings` item has the selected/active visual state; the `Home` item does not

#### Scenario: Non-matching activeHref selects nothing

- **WHEN** the component is rendered with `items=[{label: "Home", href: "/"}]`, `activeHref="/nope"`, and `open={true}`
- **THEN** no item carries the selected visual state

#### Scenario: activeHref is omitted

- **WHEN** the component is rendered with valid `items` and `open={true}` and no `activeHref` prop
- **THEN** no item carries the selected visual state

### Requirement: Close on item click

When the user clicks a navigation item, the component SHALL invoke `onItemClick(item, event)` (if provided) and then SHALL call `onOpenChange(false)` regardless of whether the consumer called `event.preventDefault()` inside `onItemClick`. The order is: `onItemClick` fires first, `onOpenChange(false)` fires second.

#### Scenario: Item click invokes callback and closes

- **WHEN** the component is rendered with `open={true}`, valid `items`, an `onItemClick` callback, and the user clicks an item
- **THEN** `onItemClick` is called with the clicked `NavigationDrawerItem` and the click `MouseEvent`, AND `onOpenChange(false)` is called immediately after

#### Scenario: Item click closes even without onItemClick

- **WHEN** the component is rendered with `open={true}`, valid `items`, no `onItemClick`, and the user clicks an item
- **THEN** the default `<a href>` navigation proceeds AND `onOpenChange(false)` is called

#### Scenario: preventDefault still triggers close

- **WHEN** the user clicks an item AND the `onItemClick` callback calls `event.preventDefault()`
- **THEN** the default `<a href>` navigation is suppressed AND `onOpenChange(false)` is still called

### Requirement: Overlay and focus management

When `open` is `true`, the component SHALL render a backdrop element behind the panel that dims the rest of the page and intercepts clicks (clicking the backdrop calls `onOpenChange(false)`). The panel SHALL render `role="dialog"` and `aria-modal="true"`. Focus SHALL move into the panel when `open` transitions from `false` to `true`, and SHALL return to the trigger button when `open` transitions from `true` to `false`. While `open` is `true`, focus SHALL be trapped inside the panel (Tab/Shift+Tab cycle within the panel, do not escape into the background).

#### Scenario: Focus moves into panel on open

- **WHEN** the component transitions from `open={false}` to `open={true}`
- **THEN** focus moves to the first focusable element inside the panel (the first navigation item)

#### Scenario: Focus returns to trigger on close

- **WHEN** the component transitions from `open={true}` to `open={false}`
- **THEN** focus returns to the trigger (hamburger) button

#### Scenario: Tab cycles inside the panel

- **WHEN** the panel is open and focus is on the LAST focusable element inside the panel and the user presses `Tab`
- **THEN** focus moves to the FIRST focusable element inside the panel (not to elements behind the backdrop)

#### Scenario: Backdrop click closes the drawer

- **WHEN** the panel is open and the user clicks the backdrop (any point outside the panel)
- **THEN** `onOpenChange(false)` is called

### Requirement: Trigger renders into ShellBar startButton slot

The component SHALL render a hamburger trigger button with the UI5 `slot="startButton"` attribute so that when the element is supplied to `ShellBar`'s `navigationDrawer` slot, UI5's slot routing mounts the trigger in the canonical left position of the ShellBar.

#### Scenario: Trigger uses startButton slot attribute

- **WHEN** the component is rendered inside a ShellBar via `<ShellBar navigationDrawer={<NavigationDrawer …/>} />`
- **THEN** the rendered trigger button carries the `slot="startButton"` attribute AND appears in the left position of the ShellBar's host element
