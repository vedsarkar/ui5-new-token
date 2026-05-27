## Why

Some Reltio admin applications (Client Credentials, Customer Management, etc.) need a customer selector in the header — a trigger element that opens a searchable dialog of available customers and lets the user pick one. The exploration screenshots show the canonical pattern: a trigger labelled `Select customer ▼`, opening a dialog with a search field and a two-column table (`Customer ID`, `Description`). Today each application ships its own version on top of UI5 `Dialog` + a custom searchable table.

This proposal ships a single endorsed Reltio `CustomerSelector` business component (paralleling but independent of `TenantSelector`) and surfaces it as a typed slot on `ShellBar`.

## What Changes

- Add a new `CustomerSelector` Reltio business component under `components/CustomerSelector/`. The component is fully controlled — the consumer owns `selectedCustomerId` and an `onSelect` callback receives the chosen `CustomerEntry`.
- API:
  - `customers: CustomerEntry[]` where `CustomerEntry = { customerId: string; description?: string }`.
  - `selectedCustomerId?: string` — the currently selected `customerId`, used to derive the trigger label and the row highlighting inside the dialog. When omitted, the trigger renders the placeholder "Select customer" with a caret.
  - `onSelect: (customer: CustomerEntry) => void` — required callback fired when the user picks a row. The component closes the dialog after calling `onSelect`.
- Trigger label format: `customerId` once a customer is selected (or `description` if `customerId` is verbose and `description` carries the friendlier display name — see the design decision below); placeholder `"Select customer"` with a dropdown caret icon otherwise. Long values truncate with ellipsis; the full string is exposed via `title`.
- Dialog content:
  - Search field at the top — filters rows by case-insensitive substring match across `customerId` AND `description`.
  - Table with columns `Customer ID`, `Description` — sortable by `Customer ID` (default), `Description` sortable on click.
  - Each row is a clickable surface; clicking a row calls `onSelect(customer)` and closes the dialog.
  - `Cancel` button in the footer dismisses without selection.
  - Empty state when `customers=[]`: "No customers available".
  - Empty state when search has no matches: "No customers match your search".
- The component owns its dialog open/close state internally — there is NO `open` prop. (Same rationale as `TenantSelector`.)
- Add a corresponding `customerSelector?: ReactElement` slot prop to `ShellBar`. When supplied, `ShellBar` renders it in the UI5 `children` slot.
- Export the new component and its types from `@reltio/design/components`.

This component is intentionally **independent** of `TenantSelector` — no shared primitive in v1, per the exploration decision. If meaningful duplication emerges during implementation an internal primitive can be extracted later without changing either public API.

## Capabilities

### New Capabilities

- `customer-selector`: Reltio customer-picker component (trigger label + searchable dialog) with a controlled `selectedCustomerId` API.

### Modified Capabilities

- `shell-bar-component`: gains a `customerSelector?: ReactElement` slot prop that hosts the new component.

## Impact

- New directory `components/CustomerSelector/` with the canonical 6-file Reltio component layout.
- `components/ShellBar/ShellBar.types.ts` — add `customerSelector?: ReactElement`.
- `components/ShellBar/ShellBar.tsx` — pipe the slot element through into UI5 children.
- `components/ShellBar/README.md` — document the slot.
- `components/index.ts` — re-export `CustomerSelector` and its types.
- One changeset entry — **minor** bump of `@reltio/design` (additive component + additive slot prop).
