---
"@reltio/design": minor
---

Add `TenantSelector` component and a `tenantSelector` slot on `ShellBar`.

- `TenantSelector` renders a trigger label (`"customer - tenant - environment"` or a `"Select tenant"` placeholder) that opens a searchable, sortable dialog of tenants.
- Fully controlled selection via `selectedTenantId` + `onSelect`; the dialog open/close state is internal.
- Search filters case-insensitively across all four columns; columns are sortable (default `Customer name` ascending); empty states for no data and no search matches.
- `ShellBar` gains an additive `tenantSelector?: ReactElement` slot rendered into the UI5 ShellBar `children` slot.
