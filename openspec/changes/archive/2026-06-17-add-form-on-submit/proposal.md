## Why

The endorsed `Form` is a 1:1 re-export of the UI5 Form floorplan — pure layout, with no submission story. Every Reltio app that builds an edit/settings/configuration screen has to re-implement the same boilerplate to collect the field values and hand them to a network call. UI5 input components are already form-associated (`ElementInternals`), so this boilerplate is avoidable: a thin native `<form>` around the layout can serialize every field for free. Centralizing it removes per-app drift and gives a single, tested submit ergonomics.

## What Changes

- Convert `Form` from a documentation-only 1:1 re-export into a **thin Reltio wrapper** that renders a native `<form>` element around the UI5 Form floorplan.
- Add an `onSubmit?(data: FormData, event: React.FormEvent<HTMLFormElement>)` prop. The wrapper handles the native submit, calls `event.preventDefault()` (so no full-page reload), builds `FormData` from the form element, and invokes the callback.
- All existing UI5 `Form` props (`accessibleMode`, `headerText`, …), slots, and children behavior are passed through unchanged.
- Change two layout defaults: `layout` defaults to `"S1 M1 L1 XL1"` (single column on every breakpoint, vs UI5's responsive `"S1 M1 L2 XL3"`) and `labelSpan` to `"S12 M12 L12 XL12"` (labels on top, vs UI5's `"S12 M4 L4 XL4"`). Both remain overridable; this is an opinionated product default for predictable, scannable forms.
- `FormGroup` and `FormItem` remain unchanged 1:1 re-exports.
- This is a **curated divergence** from UI5 (documented in the README per `components/AGENTS.md`): `Form` stops being a passthrough and becomes a wrapper.

## Capabilities

### New Capabilities
- `form`: The endorsed Reltio Form surface — UI5 Form layout floorplan plus native-form submission with `FormData` serialization via the `onSubmit` prop.

### Modified Capabilities
<!-- None: no existing spec captures Form behavior yet. -->

## Impact

- **Code**: `components/Form/` gains `Form.tsx`, `index.ts`, and an updated `Form.types.ts` (now declaring `FormProps` as a wrapper prop type, not a bare `ComponentPropsWithoutRef`). `FormGroup`/`FormItem` types stay as 1:1 re-exports. `components/index.ts` export for `Form` switches from the doc-only path to the new wrapper.
- **Public API**: `Form` now accepts `onSubmit` and renders an extra native `<form>` wrapper element. Additive for consumers; existing usages keep working. Requires a changeset (minor).
- **Docs**: `Form.README.md` updated to document the divergence + submit pattern; `Form.stories.tsx` gains a submit story; `Form.story.mdx` + `Form.schema.json` regenerate.
- **Dependencies**: none new. Relies on existing UI5 `ElementInternals` form-association (requires `name` on each field; `Button type="Submit"` or Enter to submit).
