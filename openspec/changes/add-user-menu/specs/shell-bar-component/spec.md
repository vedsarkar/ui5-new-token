## ADDED Requirements

### Requirement: userMenu slot prop

The `ShellBar` component SHALL accept an optional `userMenu?: ReactElement` slot prop. When provided, the wrapper SHALL pass the slot element through to the underlying UI5 ShellBar in a way that lets UI5's slot routing read the `slot="profile"` attribute on the inner avatar element and mount it in the canonical profile (right-most) position. The popover and About modal — rendered as sibling React elements inside the slot element — SHALL render at their own positions (anchored to the avatar's opener id and `position: fixed` respectively) and SHALL NOT be confined to the ShellBar's host element.

The slot prop is intended to host a `<UserMenu …/>` element (the Reltio user-menu component), but the TypeScript type is `ReactElement` and the wrapper does not enforce the runtime element type.

#### Scenario: userMenu avatar lands in profile slot

- **WHEN** the component is rendered with `userMenu={<UserMenu user={{…}} about={{…}} onSignOut={…} />}`
- **THEN** the underlying UI5 ShellBar receives the slot element AND the rendered DOM contains the avatar mounted in the `profile` slot position

#### Scenario: userMenu and consumer profile are mutually exclusive

- **WHEN** the component is rendered with BOTH `userMenu={<UserMenu …/>}` AND `profile={<Avatar …/>}`
- **THEN** the explicit `profile` prop SHALL win — UI5 ShellBar receives the consumer's `profile` and the `<UserMenu>` avatar does NOT render. The popover and About modal stay unrendered because their open state is triggered from the avatar. (Document this precedence in the ShellBar README.)

#### Scenario: omitting userMenu renders nothing extra

- **WHEN** the component is rendered with no `userMenu` prop
- **THEN** no user-menu avatar, popover, or About modal is rendered AND the underlying UI5 ShellBar's `profile` slot is filled only by whatever the consumer passes via `profile`, if anything
