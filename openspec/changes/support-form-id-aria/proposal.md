## Why

The Reltio `Form` wrapper already owns a native `<form>` for submit serialization and ref forwarding, but `id` and `aria-*` are not applied to that element — `...rest` currently forwards to the inner UI5 Form. Assistive tech and labelled form regions need those attributes on the real form control, not the layout web component.

## What Changes

- Accept `id` and ARIA attributes (`aria-label`, `aria-labelledby`, `aria-describedby`, and other `aria-*`) on `Form` and apply them to the outer native `<form>`.
- Keep UI5 Form props (`layout`, `labelSpan`, `headerText`, `accessibleMode`, …) on the inner UI5 Form only — do not dual-apply native form a11y attrs to both layers.
- Update `FormProps` typing so these attributes are part of the public API.
- Add a Storybook story demonstrating `id` / ARIA usage; update `Form` README.
- Additive API only — no breaking removals.

## Capabilities

### New Capabilities

<!-- None — extends the existing form capability. -->

### Modified Capabilities

- `form`: Require that `id` and ARIA attributes land on the native `<form>` wrapper rather than being forwarded to the inner UI5 Form.

## Impact

- **Code**: `components/Form/Form.tsx`, `Form.types.ts`, `Form.stories.tsx`, `README.md`.
- **Public API**: Additive props/`id` + `aria-*` on `Form` (minor bump; changeset already drafted as `.changeset/support-form-id-aria.md`).
- **Specs**: Delta under `openspec/specs/form/`.
- **Dependencies**: none.
