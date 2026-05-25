## Why

Every Reltio application renders the SAP Fiori ShellBar as its top navigation chrome. SAP ships `ShellBar` with a `logo` slot but no default — every Reltio app currently fills the slot with its own copy of `ReltioLogo.svg`, drifting in size, positioning, and (worst) failing to swap between light and dark themes consistently. This wrapper ships a single endorsed Reltio brand logo with horizon-light/horizon-dark variants so apps inherit the canonical Reltio mark transitively from `@reltio/design` without bundling the assets themselves.

ui-export Phase 3c `Shell.tsx` is the first consumer; the rest of the Reltio ecosystem (data-out, admin-tools, login-page, agent-flow-ui) becomes the second wave.

## What Changes

- Add a Reltio `ShellBar` business component under `components/ShellBar/` that wraps `@ui5/webcomponents-react/ShellBar`.
- Bundle two SVG assets (`ReltioLogo.light.svg`, `ReltioLogo.dark.svg`) under `components/ShellBar/assets/`, imported in `ShellBar.tsx`.
- Default the new UI5 `branding` slot to a `<ShellBarBranding>` containing a `<picture>` element that swaps between the two assets based on the active `data-theme`. The `branding` slot is the canonical left-mark slot in UI5 2.21+ (the legacy `logo` slot now renders near the profile and is left as a pass-through prop).
- Allow the default branding to be overridden with a `branding?: ReactNode` prop (sub-apps that want their own mark).
- Forward `data-test-id` to the rendered host element.
- All other UI5 ShellBar props pass through unchanged.
- Export from `@reltio/design/components` as `ShellBar` and `ShellBarProps`. Also re-export the supporting UI5 primitives consumers compose into ShellBar: `ShellBarBranding`, `ShellBarItem`, `ShellBarSearch`.

## Capabilities

### New Capabilities

- `shell-bar-component`: Reltio ShellBar wrapper with default brand logo, override prop, and test-id forwarding.

### Modified Capabilities

(none)

## Impact

- New files under `components/ShellBar/`, including two bundled `.svg` assets.
- One new line in `components/index.ts`.
- One entry added to the existing changeset.
- Each consuming app may delete its local copy of `ReltioLogo.svg` in a follow-up cleanup PR (out of scope here).
