---
"@reltio/design": minor
---

Add `UserMenu` component and a `userMenu` slot on `ShellBar`.

- `UserMenu` bundles the trigger avatar (image or derived initials), the UI5 user-menu popover (name + email, About item, Sign Out), and the About modal (copyright, version, optional legal links).
- Required `user`, `about`, and `onSignOut` props; popover and About-modal open/close state is internal. `onSignOut` is fire-and-forget — the component performs no navigation.
- `ShellBar` gains an additive `userMenu?: ReactElement` slot routed into the UI5 ShellBar `profile` slot; an explicit `profile` prop takes precedence.
