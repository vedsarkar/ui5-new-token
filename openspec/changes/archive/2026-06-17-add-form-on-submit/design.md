## Context

`components/Form/` is currently a documentation-only directory: `Form.types.ts` re-exports `ComponentPropsWithoutRef<typeof Form>` 1:1 from `@ui5/webcomponents-react/Form`, and `components/index.ts` endorses it as a passthrough. The UI5 `Form` is a layout floorplan (a `<div>`-based responsive grid) — it neither renders a native `<form>` nor exposes a submit hook.

UI5 input components (`Input`, `TextArea`, `CheckBox`, `RadioButton`, `Select`, `ComboBox`, `MultiComboBox`, `DatePicker`, `StepInput`, …) are **form-associated custom elements** (`ElementInternals`, `formAssociated: true`). When placed inside a native `<form>` with a `name`, they report their value to the form exactly like built-in controls, so `new FormData(formEl)` collects them. A `Button` with `type="Submit"` (or Enter on a focused field) triggers the enclosing native form.

This change adds the missing submit ergonomics by wrapping the UI5 Form in a native `<form>`, per the user's request and the `components/AGENTS.md` "Wrapper" endorsement mode.

## Goals / Non-Goals

**Goals:**
- Add `onSubmit?(data: FormData, event)` to the endorsed `Form`.
- Keep the wrapper thin: pass through 100% of UI5 `Form` props/slots/children; behaviorally identical to the re-export when `onSubmit` is omitted (aside from the extra native `<form>` element).
- Preserve `FormGroup`/`FormItem` as 1:1 re-exports.
- Document the divergence from UI5 in the README and ship a changeset.

**Non-Goals:**
- No state management, controlled values, dirty-tracking, or reset logic — values stay owned by the consumer / the fields themselves.
- No validation framework. Field-level validation stays on the UI5 inputs (`valueState`, `required`). We do not add cross-field validation or a schema layer.
- No async/loading/submit-button state. The consumer owns the network call and any pending UI.
- No object/JSON auto-serialization beyond what `FormData` provides (consumer can `Object.fromEntries(data)`).

## Decisions

### D1 — Wrap with a native `<form>`, rely on UI5 form-association
Render `<form onSubmit={…}><UI5Form {...rest}>{children}</UI5Form></form>`. On submit: `event.preventDefault()`, then `onSubmit?.(new FormData(event.currentTarget), event)`.

*Why:* leverages the platform + UI5's existing `ElementInternals` support, so we add no serialization code and inherit correct values for every form-associated UI5 field. *Alternatives considered:* (a) iterate the DOM/refs to collect values — fragile, duplicates UI5 internals; (b) a context/provider + per-field registration — heavier API, re-implements form-association we already get for free.

### D2 — Curated divergence, not a new component name
Keep the name `Form`. `Form` becomes a wrapper; `FormGroup`/`FormItem` stay re-exports. Update `components/index.ts` so `Form` resolves to the wrapper while `FormGroup`/`FormItem` keep pointing at the doc-only types.

*Why:* consumers already import `Form` from `@reltio/design/components`; introducing a separate name (`SubmittableForm`) would fragment the surface. The divergence is documented per `components/AGENTS.md`.

### D3 — `onSubmit` signature: `(values: FormValues, event)`
Pass a flat JSON object first and the raw event second. The wrapper serializes the native `FormData` into a plain object: a `name` seen once maps to a single value, a `name` seen multiple times maps to an array (`getAll`) so multi-value fields are not lossy.

*Why:* ~99% of Reltio backends expect a JSON payload and client-side validation is far easier against a plain object than `FormData` — so JSON is the most valuable default first argument. Multi-value correctness (arrays) is handled centrally so every app gets it right. *Escape hatch:* the second argument is the native event, so `new FormData(event.currentTarget)` still gives raw `FormData` when needed (e.g. `File` fields). *Alternatives considered:* (a) `FormData` first — rejected: every consumer then re-implements `Object.fromEntries`/`getAll` and JSON is what they actually send; (b) plain `Object.fromEntries` — rejected: silently drops all-but-last value for repeated names.

### D4 — `ref` targets the native `<form>`
Forward `ref` to the wrapping `<form>` element (typed `HTMLFormElement`) so consumers can call `.requestSubmit()`/`.reset()`. UI5 Form-specific props still flow to the inner UI5 component via `...rest`.

*Why:* the native form is the new outermost element and the meaningful submit target.

## Risks / Trade-offs

- **Not every UI5 field is form-associated / some need explicit `name`** → README must state that each field needs a `name`, and link UI5's form-support note; the submit story demonstrates it. Fields without `name` are silently omitted from `FormData` (standard HTML behavior).
- **Extra `<form>` wrapper element in the DOM** → could affect CSS that assumed `Form` was the outermost node; mitigated by the wrapper having no layout styles of its own (the `<form>` is `display: contents`-equivalent in effect, or a bare element with no box). Decide in tasks: use a plain `<form>` with no class, or `display: contents` to avoid introducing a layout box.
- **Consumers might expect validation/loading out of the box** → README explicitly scopes the wrapper to layout + serialization and points to field-level `valueState` and consumer-owned async handling.
- **Behavioral change for SSR/forms already wrapped in `<form>`** → nested `<form>` is invalid HTML; README must warn not to wrap `Form` in another `<form>`.
