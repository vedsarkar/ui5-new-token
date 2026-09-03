## ADDED Requirements

### Requirement: searchField slot prop

The `ShellBar` component SHALL accept an optional `searchField?: ReactElement` slot prop and render it into the underlying UI5 ShellBar's native `searchField` slot. When the prop is supplied the wrapper SHALL also set `showSearchField` on the underlying component, so the field renders expanded rather than collapsed behind the search button.

The consumer SHALL NOT need to manage `showSearchField`; it is derived from the slot's presence.

#### Scenario: searchField renders expanded

- **WHEN** the component is rendered with `searchField={<Input placeholder="Search" />}`
- **THEN** the underlying UI5 ShellBar receives that element in its `searchField` slot AND `showSearchField` is true

#### Scenario: omitting searchField renders no field

- **WHEN** the component is rendered with no `searchField` prop
- **THEN** the underlying UI5 ShellBar receives no `searchField` slot content AND `showSearchField` is false
