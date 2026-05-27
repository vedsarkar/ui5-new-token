## Context

The Reltio Client Credentials / Customer Management apps switch context by customer (a coarser unit than tenant — a customer typically owns many tenants). The exploration screenshot shows `Select customer ▼` in the header with a dialog listing customers by `Customer ID` and `Description`. The two-column shape is simpler than `TenantSelector`'s four-column tenant view, but the UX pattern is identical.

This change is one of six `ShellBar`-related changes. The explicit decision from exploration was to keep `CustomerSelector` independent of `TenantSelector` in v1 — no shared internal primitive — because the domain types and rendering details are slightly different (two columns vs four; `description?` is optional whereas every tenant field is required).

## Goals / Non-Goals

**Goals:**

- A single endorsed Reltio component for customer selection in the header.
- Fully controlled selection — `selectedCustomerId` + `onSelect`.
- Internal dialog open/close state (matches `TenantSelector` precedent).
- Two-column table: `Customer ID`, `Description`.

**Non-Goals:**

- Sharing primitives with `TenantSelector`. Explicit exploration decision — keep them independent for v1.
- Server-side filtering. Client-side substring filter is sufficient.
- Multi-select.
- Customizable column set or trigger label format.
- i18n.

## Decisions

### Decision 1 — Internal dialog state, controlled selection

Same as `TenantSelector`: dialog open/close is internal `useState`; `selectedCustomerId` and `onSelect` form the public selection contract.

**Why:** consistency with `TenantSelector` is more important than perfect orthogonality. Two parallel components with the same pattern are easy for consumers to learn.

### Decision 2 — Trigger label is `customerId` (not `description`)

The trigger displays the `customerId` as the post-selection label, with the `description` shown as the `title` tooltip when present.

**Why:** `customerId` is the deterministic, always-present identifier (the screenshot shows entries like `ts_9430759`, `pms-cgw4` — opaque IDs that the user recognizes by their position in the table, not by their friendly name). The `description` is optional and not every customer has one. Showing the ID makes the trigger label unambiguous and stable.

**Alternative considered:** show `description ?? customerId`. Rejected — inconsistent display would confuse users who scan the trigger to know "which customer am I in".

### Decision 3 — Two-column table

The dialog renders exactly two columns:

- `Customer ID` (always present)
- `Description` (rendered as empty cell when missing)

Default sort: `customerId` ascending.

**Why:** matches the Client Credentials screenshot exactly.

### Decision 4 — Slot prop renders into UI5 `children`, CSS positioning

Same approach as `TenantSelector`. No UI5 experimental slots.

### Decision 5 — Independence from TenantSelector

We do NOT extract a shared `HeaderSelector` primitive in v1. The two components are written side-by-side with parallel but separate implementations. The risks of premature abstraction outweigh the duplication cost.

**Why:** the user's explicit decision during exploration. If the duplication becomes painful during the third or fourth selector (custom hierarchies, region pickers, etc.), refactor to a shared internal primitive at that point — public API contracts of `TenantSelector` and `CustomerSelector` would not change.

## Risks / Trade-offs

- [Risk] Real duplication with `TenantSelector` — search/sort/empty-state logic is essentially identical. → Accepted: per exploration decision. Refactor to an internal primitive later if it earns its weight.
- [Risk] `customerId` values are sometimes opaque (`ts_9430759`) and the trigger label may be cryptic to users. → Acceptable for v1: the user explicitly chose `customerId` as the source of truth. Tooltip shows `description` when present. Apps that want a friendlier trigger render their own selector and skip the slot.
- [Risk] `description` is optional and may be empty. → Mitigation: render an empty cell in the table; tooltip falls back to `customerId` when `description` is absent.

## Migration Plan

None — purely additive.

## Open Questions

- Same as `TenantSelector`: which UI5 base for the dialog body (`Table` vs `List`)? Default expectation: `Table` for the sortable two-column view.
- Should the trigger render a leading icon (e.g. `customer-and-supplier`) to distinguish it visually from the tenant trigger? Open question for the design phase; not in spec.
