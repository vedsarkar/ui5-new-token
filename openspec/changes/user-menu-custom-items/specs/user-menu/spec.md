## ADDED Requirements

### Requirement: UserMenuItem export

`UserMenuItem` SHALL be exported from `@reltio/design/components` as a named 1:1 re-export of `@ui5/webcomponents-react/UserMenuItem`. `UserMenuItemProps` SHALL be defined in `components/UserMenuItem/UserMenuItem.types.ts` as `ComponentPropsWithoutRef<typeof UserMenuItem>` (doc-only endorsement; no `index.ts`, matching Button / UserMenuItemGroup).

Consumer-facing documentation (README, generated MDX) SHALL show imports from `@reltio/design/components`. In-repo author stories MAY import UI5 packages directly per monorepo conventions.

#### Scenario: Public component import

- **WHEN** a consumer writes `import { UserMenuItem } from "@reltio/design/components"`
- **THEN** module resolution succeeds and the symbol is available

#### Scenario: Props type exists

- **WHEN** a consumer imports `UserMenuItemProps` from `components/UserMenuItem/UserMenuItem.types.ts` (or an equivalent deep types path)
- **THEN** the type resolves as `ComponentPropsWithoutRef<typeof UserMenuItem>`

### Requirement: Optional children prop for custom menu items

`UserMenu` SHALL accept an optional `children` prop typed as `ReactNode`. JSDoc on the prop SHALL state that consumers should pass one or more `UserMenuItem` elements (after About, before Sign Out), that children are not validated at runtime, and that flat `UserMenuItem`s are the supported contract (`UserMenuItemGroup` and nested sub-menus are out of scope).

When `children` is provided, those nodes SHALL render inside the UI5 `UserMenu` after the built-in About item and before the Sign Out footer. When omitted, popover contents match the prior About + Sign Out behavior.

`UserMenuItemGroup` SHALL NOT be part of the supported `children` contract for this version.

#### Scenario: Custom items render between About and Sign Out

- **WHEN** the component is rendered with `children={<UserMenuItem text="Settings" />}`
- **THEN** the popover menu order is: built-in About item, Settings item, Sign Out footer

#### Scenario: Multiple custom items preserve order

- **WHEN** the component is rendered with `children={[<UserMenuItem text="Settings" />, <UserMenuItem text="Help" />]}`
- **THEN** the popover menu order is: built-in About item, Settings item, Help item, Sign Out footer

#### Scenario: No children preserves legacy popover contents

- **WHEN** the component is rendered without `children`
- **THEN** the popover renders only the built-in About item and Sign Out footer

### Requirement: Optional onItemClick for custom items

`UserMenu` SHALL accept an optional `onItemClick` prop typed as the UI5 `UserMenu` `onItemClick` handler (`ComponentPropsWithoutRef<typeof UserMenu>["onItemClick"]`). The event SHALL expose `detail.item` as the activated `UserMenuItem` host.

When a custom (non-About) item is activated, the component SHALL close the popover and invoke `onItemClick` with that event. When the built-in About item is activated, the component SHALL open the About modal, close the popover, and SHALL NOT invoke consumer `onItemClick`.

The component SHALL NOT interpret consumer `data-*` attributes or perform navigation. Consumers MAY put metadata such as `data-href` on `UserMenuItem` and read it from `event.detail.item` in `onItemClick`. Documentation and the custom-items story SHALL demonstrate the `data-*` / `data-href` convention. The attribute `data-reltio-user-menu` SHALL be reserved for the built-in About item and SHALL NOT be documented for consumer use on custom items.

#### Scenario: Custom item click forwards onItemClick

- **WHEN** the popover is open with `<UserMenuItem text="Settings" data-href="/settings" />` and `onItemClick={handler}`, and the user clicks Settings
- **THEN** the popover closes AND `handler` is called with an event whose `detail.item` is the Settings host AND `detail.item.getAttribute("data-href")` equals `"/settings"` AND the About modal does not open

#### Scenario: About item does not forward onItemClick

- **WHEN** the popover is open with `onItemClick={handler}` and the user clicks the built-in About item
- **THEN** the About modal opens AND the popover closes AND `handler` is not called

#### Scenario: Missing onItemClick still closes popover on custom click

- **WHEN** the popover is open with a custom Settings item and no `onItemClick` prop, and the user clicks Settings
- **THEN** the popover closes AND the About modal does not open

### Requirement: Custom item clicks do not open About modal

Clicking a consumer-provided `UserMenuItem` SHALL close the popover and SHALL NOT open the About modal. The About modal SHALL open only when the built-in About item is activated. Discrimination SHALL use `event.detail.item.getAttribute("data-reltio-user-menu") === "about"` on the built-in About `UserMenuItem`.

#### Scenario: Custom item click closes popover without About modal

- **WHEN** the popover is open with a custom Settings item and the user clicks Settings
- **THEN** the popover closes AND the About modal does not open

#### Scenario: Built-in About item still opens About modal

- **WHEN** the popover is open (with or without custom children) and the user clicks the built-in About item
- **THEN** the About modal opens AND the popover closes

## MODIFIED Requirements

### Requirement: User-menu popover

When the user clicks the avatar trigger, the component SHALL open a UI5 `UserMenu` popover anchored to the avatar. The popover SHALL show:

- A header area displaying `user.username` (primary text) and `user.email` (secondary text).
- A primary menu item with the fixed label `"About"` that opens the About modal when activated.
- Zero or more consumer-provided menu item children (when `children` is supplied), after the built-in About item.
- A footer Sign Out button that closes the popover and invokes `onSignOut()`.

The popover SHALL close when the user activates an item, clicks the backdrop, or presses `Escape`. Popover open/close state SHALL be internal (no `open` / `onOpenChange` props). Activating About SHALL open the About modal; activating custom items SHALL NOT. Activating a custom item SHALL invoke optional `onItemClick` when provided.

#### Scenario: Avatar click opens popover

- **WHEN** the popover is closed and the user clicks the avatar trigger
- **THEN** the user-menu popover opens anchored to the avatar

#### Scenario: Popover shows user name and email

- **WHEN** the popover is open with `user={{username: "Alaina Chevalier", email: "alaina.chevalier@sap.com"}}`
- **THEN** the popover header displays `"Alaina Chevalier"` and `"alaina.chevalier@sap.com"`

#### Scenario: About item uses the fixed label

- **WHEN** the popover is open
- **THEN** the popover renders a menu item with the fixed label `"About"`

#### Scenario: About item click opens About modal and closes popover

- **WHEN** the popover is open and the user clicks the built-in About menu item
- **THEN** the About modal opens AND the popover closes

#### Scenario: Sign Out button click invokes callback and closes popover

- **WHEN** the popover is open and the user clicks the Sign Out button
- **THEN** `onSignOut()` is called exactly once AND the popover closes

#### Scenario: ESC closes popover

- **WHEN** the popover is open and the user presses `Escape`
- **THEN** the popover closes without invoking `onSignOut`

#### Scenario: Backdrop click closes popover

- **WHEN** the popover is open and the user clicks outside the popover
- **THEN** the popover closes without invoking `onSignOut`
