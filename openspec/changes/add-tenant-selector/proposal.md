## Why

Most Reltio admin applications (Console, admin-tools, data-out, etc.) need a tenant selector in the header: a trigger element next to the app title that opens a searchable dialog of available tenants, lets the user pick one, and updates the application's current-tenant state. Today each application ships its own version on top of UI5 `Dialog` + a custom searchable table, so column layout, filter UX, search semantics, and empty-state copy drift between apps.

This proposal ships a single endorsed Reltio `TenantSelector` business component that wraps the trigger + searchable dialog pattern, and surfaces it as a typed slot on `ShellBar`.

## What Changes

- Add a new `TenantSelector` Reltio business component under `components/TenantSelector/`. The component is fully controlled — the consumer owns the `selectedTenantId` and an `onSelect` callback receives the chosen `TenantEntry`.
- API:
  - `tenants: TenantEntry[]` where `TenantEntry = { customerName: string; tenantName: string; tenantId: string; environment: string }`.
  - `selectedTenantId?: string` — the currently selected `tenantId`, used to derive the trigger label and the row highlighting inside the dialog. When omitted, the trigger renders the placeholder "Select tenant" with a caret.
  - `onSelect: (tenant: TenantEntry) => void` — required callback fired when the user picks a row. The component closes the dialog after calling `onSelect`.
- Trigger label format: `"customerName - tenantName - environment"` once a tenant is selected; placeholder `"Select tenant"` with a dropdown caret otherwise. Long values are truncated with ellipsis; the full string is exposed via `title` for hover-tooltip.
- Dialog content:
  - Search field at the top — filters rows by case-insensitive substring match across all four columns.
  - Table with columns `Customer name`, `Tenant name`, `Tenant ID`, `Environment` — sortable by the `Customer name` column (default), other columns sortable on click.
  - Each row is a clickable surface; clicking a row calls `onSelect(tenant)` and closes the dialog.
  - `Cancel` button in the dialog footer dismisses without selection.
  - Empty state when `tenants=[]` (no data): "No tenants available".
  - Empty state when search has no matches: "No tenants match your search".
- The component owns its own dialog open/close state internally — clicking the trigger opens; selecting a row, clicking Cancel, pressing ESC, or clicking the backdrop closes. There is NO `open` prop. (Rationale: the dialog is an ephemeral interaction, not application state. The consumer only cares about the selected tenant.)
- Add a corresponding `tenantSelector?: ReactElement` slot prop to `ShellBar`. When supplied, `ShellBar` renders the slot element in the canonical position via the UI5 ShellBar `children` slot. Final CSS positioning is handled by the `TenantSelector` itself (no UI5 experimental `content` slot).
- Export the new component and its types from `@reltio/design/components`.

## Capabilities

### New Capabilities

- `tenant-selector`: Reltio tenant-picker component (trigger label + searchable dialog) with a controlled `selectedTenantId` API.

### Modified Capabilities

- `shell-bar-component`: gains a `tenantSelector?: ReactElement` slot prop that hosts the new component.

## Impact

- New directory `components/TenantSelector/` with the canonical 6-file Reltio component layout.
- `components/ShellBar/ShellBar.types.ts` — add `tenantSelector?: ReactElement`.
- `components/ShellBar/ShellBar.tsx` — pipe the slot element through into UI5 children.
- `components/ShellBar/README.md` — document the slot.
- `components/index.ts` — re-export `TenantSelector` and its types.
- One changeset entry — **minor** bump of `@reltio/design` (additive component + additive slot prop).
- The duplicate-elimination follow-up with `CustomerSelector` (which has the same dialog UX over different domain data) is intentionally deferred; the two components are shipped independently and a shared primitive may be extracted later if it earns its weight.
