## Why

`AppSelector` already exists as a Reltio business component — it renders the 3×3 ProductSwitch grid + popover triggered by the canonical SAP Fiori grid icon. Today consumers wire it into `ShellBar` by hand: they pass `<AppSelector …/>` as a regular `children` member of `ShellBar`, which places it in the right cluster alongside other `<ShellBarItem>` actions. There is no compile-time signal that "this is THE Reltio app-selector slot, not a random ShellBar action item", and the consumer has to know which position in the children array yields the canonical layout.

This proposal adds a dedicated `appSelector?: ReactElement` slot prop to `ShellBar` so the placement is documented as a first-class concern, mirrors UI5's slot-prop convention (`profile`, `startButton`, `searchField`, …), and lines up symmetrically with the four other slot props introduced by sibling changes (`sideNavigation`, `tenantSelector`, `customerSelector`, `userMenu`).

`AppSelector` itself does NOT change. This is purely a ShellBar wiring change.

## What Changes

- Add an `appSelector?: ReactElement` prop to `ShellBarProps`. The element is expected to be `<AppSelector …/>` (or any Reltio app-selector implementation, for forward-compat) — TypeScript does not enforce the element type since UI5 slot validation already accepts any `ReactElement`.
- The wrapper SHALL render the `appSelector` slot into the underlying UI5 ShellBar's `children` slot, alongside any explicit `children` the consumer passes. The slot is rendered AFTER explicit children (right-most in the right cluster, before the profile area).
- Document the slot in `ShellBar`'s `README.md` and add a `WithAppSelector` story.
- The `appSelector` slot is an entry point for the canonical Reltio app-selector. Consumers retain full flexibility to also pass `<AppSelector>` via `children` for unusual layouts, but the slot prop is the documented happy path.

## Capabilities

### New Capabilities

(none — `AppSelector` is already in `@reltio/design`)

### Modified Capabilities

- `shell-bar-component`: gains the `appSelector` slot prop.

## Impact

- `components/ShellBar/ShellBar.types.ts` — add `appSelector?: ReactElement`.
- `components/ShellBar/ShellBar.tsx` — merge the slot element into the children passed to the underlying UI5 ShellBar.
- `components/ShellBar/README.md` — document the slot.
- `components/ShellBar/ShellBar.stories.tsx` — add a `WithAppSelector` story.
- One changeset entry — **minor** bump of `@reltio/design` (additive prop).
- Apps currently passing `<AppSelector>` via `children` can switch to the slot prop in follow-up cleanup PRs (out of scope here).
