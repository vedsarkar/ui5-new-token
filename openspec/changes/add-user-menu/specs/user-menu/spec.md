## ADDED Requirements

### Requirement: Component export

The `UserMenu` component SHALL be exported from `@reltio/design/components` as a named export, together with its `UserMenuProps` and `UserMenuUser` types. The About-modal title, copyright, and legal links are fixed inside the component and are NOT part of the public API.

#### Scenario: Public import

- **WHEN** a consumer writes `import { UserMenu, type UserMenuProps, type UserMenuUser } from "@reltio/design/components"`
- **THEN** module resolution succeeds and all symbols are available with TypeScript types

### Requirement: Required user, version, and onSignOut props

The component SHALL require three props with no defaults: `user`, `version`, and `onSignOut`. The TypeScript signature SHALL enforce these as required (TypeScript compilation SHALL fail if any are omitted). `version` is the ONLY About-modal field the consumer controls; the modal title, copyright, and legal links are constants inside the component so applications cannot alter Reltio's branding or legal references.

- `user: { name: string; email: string; initials?: string; avatarUrl?: string }`
- `version: string`
- `onSignOut: () => void`

#### Scenario: Missing user is a type error

- **WHEN** a consumer writes `<UserMenu version={…} onSignOut={…} />` (no `user`)
- **THEN** TypeScript compilation fails with a missing-property error on the `user` prop

#### Scenario: Missing version is a type error

- **WHEN** a consumer writes `<UserMenu user={…} onSignOut={…} />` (no `version`)
- **THEN** TypeScript compilation fails with a missing-property error on the `version` prop

#### Scenario: Missing onSignOut is a type error

- **WHEN** a consumer writes `<UserMenu user={…} version={…} />` (no `onSignOut`)
- **THEN** TypeScript compilation fails with a missing-property error on the `onSignOut` prop

### Requirement: Avatar trigger renders into ShellBar profile slot

The component SHALL render a UI5 `Avatar` as the user-menu trigger with the attribute `slot="profile"` so that when supplied to `ShellBar`'s `userMenu` slot, UI5's slot routing mounts the avatar in the canonical profile position. When `avatarUrl` is provided, the avatar SHALL display the image; otherwise it SHALL display initials. The initials SHALL be `user.initials` when provided, otherwise derived from `user.name` (the first letter of each space-separated word, up to two characters).

#### Scenario: avatarUrl renders an image avatar

- **WHEN** the component is rendered with `user={{name: "Alaina Chevalier", email: "alaina.chevalier@sap.com", avatarUrl: "https://example.com/photo.jpg"}}`
- **THEN** the avatar displays the image from `avatarUrl`

#### Scenario: Explicit initials override derived

- **WHEN** the component is rendered with `user={{name: "Andrew Borovin", email: "ab@example.com", initials: "Q"}}`
- **THEN** the avatar displays the initial `"Q"`

#### Scenario: Initials derived from name

- **WHEN** the component is rendered with `user={{name: "Andrew Borovin", email: "ab@example.com"}}` (no `initials`, no `avatarUrl`)
- **THEN** the avatar displays the initials `"AB"`

#### Scenario: Single-word name yields single initial

- **WHEN** the component is rendered with `user={{name: "Yulia", email: "y@example.com"}}`
- **THEN** the avatar displays the initial `"Y"`

#### Scenario: Avatar carries slot="profile"

- **WHEN** the component is rendered inside a ShellBar via `<ShellBar userMenu={<UserMenu …/>} />`
- **THEN** the rendered avatar carries the `slot="profile"` attribute AND appears in the profile position of the ShellBar

### Requirement: User-menu popover

When the user clicks the avatar trigger, the component SHALL open a UI5 `UserMenu` popover anchored to the avatar. The popover SHALL show:

- A header area displaying `user.name` (primary text) and `user.email` (secondary text).
- A primary menu item with the fixed label `"About"` that opens the About modal when activated.
- A footer Sign Out button that closes the popover and invokes `onSignOut()`.

The popover SHALL close when the user activates an item, clicks the backdrop, or presses `Escape`. The popover open/close state SHALL be internal to the component (no `open`/`onOpenChange` props).

#### Scenario: Avatar click opens popover

- **WHEN** the popover is closed and the user clicks the avatar trigger
- **THEN** the user-menu popover opens anchored to the avatar

#### Scenario: Popover shows user name and email

- **WHEN** the popover is open with `user={{name: "Alaina Chevalier", email: "alaina.chevalier@sap.com"}}`
- **THEN** the popover header displays `"Alaina Chevalier"` and `"alaina.chevalier@sap.com"`

#### Scenario: About item uses the fixed label

- **WHEN** the popover is open
- **THEN** the popover renders a menu item with the fixed label `"About"`

#### Scenario: About item click opens About modal and closes popover

- **WHEN** the popover is open and the user clicks the About menu item
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

### Requirement: About modal

The About modal SHALL be a UI5 `Dialog` opened from the popover's About menu item. The modal SHALL render:

1. The fixed heading `"About"`.
2. The body containing a fixed Reltio copyright paragraph.
3. A labelled value rendering the consumer-supplied `version` (e.g. `"Version: 2.21.3"`).
4. A fixed list of legal links (`Privacy Policy`, `Terms of Use`) rendered as anchors with `target="_blank"` and `rel="noopener noreferrer"`.

Only `version` is consumer-controlled; the heading, copyright, and links are constants inside the component. The modal SHALL include a `Close` footer button. The modal SHALL also close on `Escape` and backdrop click. The modal open/close state SHALL be internal to the component (no `aboutOpen`/`onAboutOpenChange` props).

#### Scenario: Modal shows fixed heading and copyright with supplied version

- **WHEN** the modal is open with `version="2.21.3"`
- **THEN** the rendered modal contains the fixed heading `"About"`, a fixed Reltio copyright paragraph, and the labelled value `"Version: 2.21.3"` (or similar formatted label)

#### Scenario: Modal renders the fixed legal links as new-tab anchors

- **WHEN** the modal is open
- **THEN** the rendered modal contains anchors with text `"Privacy Policy"` and `"Terms of Use"`, each carrying `target="_blank"` and `rel="noopener noreferrer"`

#### Scenario: Application cannot override the About branding

- **WHEN** a consumer renders `<UserMenu>` with any props
- **THEN** there is no prop that changes the modal heading, copyright, or legal links — they are constants inside the component

#### Scenario: Close button closes modal

- **WHEN** the modal is open and the user clicks the `Close` footer button
- **THEN** the modal closes

#### Scenario: ESC closes modal

- **WHEN** the modal is open and the user presses `Escape`
- **THEN** the modal closes

#### Scenario: Backdrop click closes modal

- **WHEN** the modal is open and the user clicks outside the modal frame (backdrop)
- **THEN** the modal closes

### Requirement: onSignOut is fire-and-forget

The component SHALL call `onSignOut()` synchronously when the user clicks the Sign Out button and SHALL NOT itself perform any navigation, cookie clearing, or authentication-related side effects. The consumer's app-level auth flow is solely responsible for what happens after `onSignOut()` is invoked.

#### Scenario: onSignOut does not redirect

- **WHEN** the user clicks Sign Out
- **THEN** `onSignOut()` is invoked AND the component does NOT call `window.location.assign`, `window.location.href = …`, `history.pushState`, or any other navigation/cookie API
