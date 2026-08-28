---
"@reltio/design": minor
---

Raise the shared element corner radius to `1.5rem`, matching the Hybrid Design System

Syncing the Avatar page of the Hybrid Design System Figma library surfaced a single
token change: `sapElement_BorderCornerRadius` moves from `.75rem` (12px) to
`1.5rem` (24px) in both SAP Reltio and SAP Reltio Dark. All 43 `sapAvatar_*`
colour tokens already matched the Figma values and are unchanged.

**Effect on Avatar**

- `shape="Square"` avatars go from a 12px to a 24px radius.
- At `XS` (32px) and `S` (48px) the radius now meets or exceeds half the avatar,
  so square avatars render as circles at those sizes. `M`, `L` and `XL` stay
  visibly square with softer corners. This mirrors the Figma component.
- `shape="Circle"` is unaffected — UI5 hardcodes `border-radius: 50%` for it.

**Wider effect**

`sapElement_BorderCornerRadius` is SAP's shared "single element radius", so this is
deliberately not scoped to Avatar. `Avatar`, `Bar`, `Panel`, `Slider`,
`TimelineItem`, `Toast` and `Wizard` pick up the new value directly. Figma's
`Dialog` binds the same variable at 24px, confirming the system-wide intent.

Popups are the exception: UI5's Horizon theme hardcodes
`--_ui5_popup_border_radius` to `0.5rem`, so `Dialog`, `Menu` and the popovers
ignore this token. See the popup remap shipped alongside the token sync.

No API change and nothing to migrate — override `--sapElement_BorderCornerRadius`
on an ancestor to opt a subtree out.
