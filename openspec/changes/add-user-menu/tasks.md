## 1. Scaffold UserMenu component

- [x] 1.1 Create `components/UserMenu/` with the canonical Reltio component layout: `UserMenu.tsx`, `UserMenu.types.ts`, `UserMenu.module.css`, `UserMenu.stories.tsx`, `README.md`, `index.ts`.
- [x] 1.2 Add side-effect imports for any UI5 icons used in the popover (e.g. log-off icon for Sign Out if UI5 doesn't auto-include it).

## 2. Types

- [x] 2.1 In `UserMenu.types.ts`, declare `UserMenuUser = { name: string; email: string; initials?: string; avatarUrl?: string }`, `UserMenuLegalLink = { label: string; href: string }`, and `UserMenuAbout = { title: string; copyright: string; version: string; legalLinks?: UserMenuLegalLink[] }`. Per-field JSDoc on every field.
- [x] 2.2 Declare `UserMenuProps` with required `user`, `about`, `onSignOut`. Per-field JSDoc.

## 3. Avatar trigger implementation

- [x] 3.1 Render a UI5 `Avatar` with `slot="profile"` and a stable `id` (use `useId` to generate). When `avatarUrl` is provided, render the image; otherwise render initials.
- [x] 3.2 Derive initials from `user.initials` (if provided) OR from `user.name` (first letter of each space-separated word, up to two characters).
- [x] 3.3 Pick the canonical `colorScheme` (e.g. `Accent4`) — match the existing Console default. Document the choice in the README.
- [x] 3.4 Wire the avatar `onClick` to toggle the popover open state.

## 4. User-menu popover implementation

- [x] 4.1 Render a UI5 `UserMenu` (from `@ui5/webcomponents-react`) with `opener={avatarId}` and `open` bound to the popover open state.
- [x] 4.2 Inside the UserMenu, render a `<UserMenuAccount>` (or equivalent UI5 child) showing `user.name` and `user.email`.
- [x] 4.3 Render a `<UserMenuItem>` with the label `about.title`; clicking it sets the About-modal open state and closes the popover.
- [x] 4.4 Render the footer Sign Out button (UI5's UserMenu typically renders this via a slot or built-in action — verify the API and wire it). Clicking Sign Out calls `onSignOut()` then closes the popover.
- [x] 4.5 Wire ESC and backdrop click to close the popover (UI5 default behavior — verify and document).

## 5. About modal implementation

- [x] 5.1 Render a UI5 `Dialog` (anchored to `<body>` via UI5's default mounting) with `open` bound to the About-modal open state.
- [x] 5.2 Header: render `about.title`.
- [x] 5.3 Body: render `about.copyright` as a paragraph; render `about.version` as a labelled value (e.g. `<strong>Version:</strong> {version}`); when `about.legalLinks` is present and non-empty, render a horizontal list of `<a target="_blank" rel="noopener noreferrer">` anchors.
- [x] 5.4 Footer: render a `Close` button that closes the modal.
- [x] 5.5 Wire ESC and backdrop click to close the modal (UI5 default — verify).

## 6. Styles

- [x] 6.1 In `UserMenu.module.css`, style the popover header (name + email layout), the About item, the modal body layout (copyright, version, legal-links list), and the legal-links list — using `--sap*` tokens for colors and plain values for spacing/sizing.
- [x] 6.2 No `@media` queries.

## 7. ShellBar integration

- [x] 7.1 Add `userMenu?: ReactElement` to `ShellBarProps` in `components/ShellBar/ShellBar.types.ts` with JSDoc pointing to `<UserMenu>` as the canonical fill.
- [x] 7.2 In `components/ShellBar/ShellBar.tsx`, render the `userMenu` slot element next to the host so the avatar's `slot="profile"` attribute is read by UI5's slot routing.
- [x] 7.3 If passing both `userMenu` and an explicit `profile`, document (in README and JSDoc) that `profile` wins.

## 8. Stories

- [x] 8.1 Write `UserMenu.stories.tsx`: closed (just avatar visible), popover open, popover with avatar image, popover open showing About item, About modal open, About modal with legalLinks, About modal without legalLinks, dark theme decorator. Use `fn()` from `storybook/test` for `onSignOut`.
- [x] 8.2 Add a `WithUserMenu` story to `components/ShellBar/ShellBar.stories.tsx`.

## 9. Documentation

- [x] 9.1 Write `components/UserMenu/README.md` following the AppSelector README structure: H1, intro, props (user/about/onSignOut), avatar derivation rules, popover/modal close paths, accessibility notes, SAP Fiori references (link to UI5 UserMenu reference).
- [x] 9.2 Update `components/ShellBar/README.md` with a `### User menu slot` section explaining the slot precedence (explicit `profile` wins over `userMenu`).
- [x] 9.3 Add `export * from "./UserMenu"` to `components/index.ts`.

## 10. Build and verify

- [x] 10.1 Run `npm run build-component-docs`.
- [x] 10.2 Run `npm run format && npm run lint`.
- [x] 10.3 Visually verify in Storybook: avatar mounts in the ShellBar profile slot; popover opens/closes via all paths; About modal opens from the popover, shows correct content, closes via all paths; Sign Out invokes the callback and closes the popover.
- [x] 10.4 Smoke-test the slot routing: avatar mounts in `profile` when `<UserMenu>` is passed via `ShellBar.userMenu`. If UI5's slot routing does NOT survive Fragment indirection, fall back to `cloneElement` inside `ShellBar`.

## 11. Release

- [x] 11.1 Add a changeset (minor bump of `@reltio/design`) noting the new `UserMenu` component and the `userMenu` slot prop on `ShellBar`.
