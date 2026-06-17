---
"@reltio/design": minor
---

Endorse the SAP Fiori Form floorplan from `@reltio/design/components`, with documentation and stories covering responsive multi-column layout, grouped sections, label placement, and edit/display mode. `FormGroup` and `FormItem` are 1:1 UI5 re-exports. `Form` is a thin Reltio wrapper that renders the UI5 Form inside a native `<form>` and adds an `onSubmit(values, event)` callback — it calls `preventDefault()` and serializes the form-associated UI5 fields (each needs a `name`) into a flat JSON object ready for a JSON API, so apps submit without re-implementing form-data collection. Repeated field names become arrays (multi-value safe); the raw `FormData` is still reachable via `new FormData(event.currentTarget)`. It also ships opinionated layout defaults that diverge from UI5: `layout="S1 M1 L1 XL1"` (single column on every breakpoint) and `labelSpan="S12 M12 L12 XL12"` (labels on top); both remain overridable. Other field behavior is unchanged from UI5.
