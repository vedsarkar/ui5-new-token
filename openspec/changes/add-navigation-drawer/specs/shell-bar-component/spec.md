## ADDED Requirements

### Requirement: navigationDrawer slot prop

The `ShellBar` component SHALL accept an optional `navigationDrawer?: ReactElement` slot prop. When provided, the wrapper SHALL pass the slot element through to the underlying UI5 ShellBar in a way that lets UI5's slot routing read the `slot="startButton"` attribute on the inner trigger button and mount it in the canonical left (hamburger) position. The drawer overlay panel — rendered as a sibling React element inside the slot element — SHALL render at its own `position: fixed` location and SHALL NOT be confined to the ShellBar's host element.

The slot prop is intended to host a `<NavigationDrawer …/>` element (the Reltio overlay drawer component), but the TypeScript type is `ReactElement` and the wrapper does not enforce the runtime element type.

#### Scenario: navigationDrawer trigger lands in startButton slot

- **WHEN** the component is rendered with `navigationDrawer={<NavigationDrawer items={[…]} open={false} onOpenChange={…} />}`
- **THEN** the underlying UI5 ShellBar receives the slot element AND the rendered DOM contains the trigger (hamburger) button mounted in the `startButton` slot position

#### Scenario: navigationDrawer and consumer startButton are mutually exclusive

- **WHEN** the component is rendered with BOTH `navigationDrawer={<NavigationDrawer …/>}` AND `startButton={<Button …/>}`
- **THEN** the explicit `startButton` prop SHALL win — UI5 ShellBar receives the consumer's `startButton` and the `NavigationDrawer` trigger does NOT render. The drawer panel still renders if the consumer keeps `open={true}`, but the trigger is replaced. (Document this precedence in the ShellBar README.)

#### Scenario: omitting navigationDrawer renders nothing extra

- **WHEN** the component is rendered with no `navigationDrawer` prop
- **THEN** no overlay drawer is rendered and the underlying UI5 ShellBar's `startButton` slot is filled only by whatever the consumer passes via `startButton`, if anything
