## Context

A Reltio admin user typically belongs to many tenants — internal QA tenants, customer pilots, production tenants per region. The header surface needs to:

1. Show which tenant the user is currently working in.
2. Let the user switch to a different tenant via a searchable dialog (because tenant lists can be long).

The exploration screenshots show the canonical Console pattern: a header text element labelled `Select tenant ▼` (or, post-selection, formatted with customer + tenant + env values), which opens a dialog with a search field and a sortable table.

This is one of six `ShellBar`-related changes. The decision was made during exploration NOT to share a primitive with `CustomerSelector`; the two components are independent.

## Goals / Non-Goals

**Goals:**

- A single endorsed Reltio component that bundles trigger + dialog + sort/filter behavior.
- Fully controlled selection state — the consumer owns `selectedTenantId` and reacts to `onSelect`.
- Dialog open/close is internal, ephemeral interaction state — not exposed in the API.
- Trigger label format is fixed: `"customerName - tenantName - environment"` post-selection, `"Select tenant"` pre-selection.
- Works with any list of tenants; no assumed source (Reltio Config Service, custom API, hard-coded).

**Non-Goals:**

- Server-side filtering. The component filters client-side via substring match; consumers that need backend search can swap in a different pattern.
- Multi-select. A tenant is a singular context — single-select only.
- Customizable trigger label format. The label is fixed; consumers that need a different format render their own selector and skip the slot prop.
- Customizable column set. The four columns are fixed (`customerName`, `tenantName`, `tenantId`, `environment`).
- Sharing primitives with `CustomerSelector`. Explicit user decision during exploration — keep them independent for now.
- i18n. All labels are English strings.

## Decisions

### Decision 1 — Internal dialog open/close state

The dialog open/close is an ephemeral interaction concern — opening the dialog is not a routable application state. The component holds this state in a local `useState` and does NOT expose it via props. This matches the existing `AppSelector` precedent.

**Why:** the user's controlled-everywhere rule was explicitly scoped to "selection state" (`selectedTenantId={...} onSelect={...}`). Ephemeral popover/dialog state stays internal where it's not useful to the consumer.

**Alternative considered:** add `open` and `onOpenChange` props mirroring `NavigationDrawer`. Rejected — the overlay drawer needs external control (apps may open it from other code paths), but the tenant dialog is reflexively tied to clicking the trigger and has no equivalent need.

### Decision 2 — Fully controlled selection

`selectedTenantId?: string` and `onSelect: (tenant: TenantEntry) => void` form the public selection contract. The component does NOT keep a local `selectedTenant` shadow state. The trigger label is derived from `tenants.find(t => t.tenantId === selectedTenantId)`.

**Why:** matches the project-wide controlled-everywhere policy for selection. The consumer's source of truth (URL, store, etc.) is the only `selectedTenantId`; the component just reads it.

### Decision 3 — Trigger label format hard-coded as `"customer - tenant - env"`

Post-selection trigger renders `"${customerName} - ${tenantName} - ${environment}"`. Pre-selection renders the placeholder `"Select tenant"` with a UI5 caret icon.

**Why:** explicit user choice during exploration. Hard-coding the format avoids a `renderTrigger` prop that adds complexity for the 95% case. Apps that need a different format can render their own selector and skip the slot prop.

**Truncation:** if the formatted string overflows the trigger's allocated width, CSS `text-overflow: ellipsis` truncates from the right and the full string is exposed via the `title` attribute.

### Decision 4 — Search filters across all four columns

The search field at the top of the dialog filters rows by case-insensitive substring match across `customerName`, `tenantName`, `tenantId`, AND `environment`. There is no per-column filter, no advanced filter UI.

**Why:** matches the Console screenshot UX (a single search box, no column-specific filters). Power-user filters can be added later additively if needed.

### Decision 5 — Sortable by Customer name (default), other columns sortable on click

Default sort: `customerName` ascending. Clicking other column headers toggles sort by that column (asc/desc). Sort state is internal — not exposed in the API.

**Why:** the Console screenshot shows an arrow icon next to "Customer name" — sort is clearly part of the canonical UX.

### Decision 6 — Use UI5 Dialog + Table primitives, no Reltio-specific table

The dialog body uses UI5 `Dialog` for the overlay frame and UI5 `Table` (or `AnalyticalTable`/`List` — pick during implementation based on the most appropriate UI5 component for the row count and sort/filter behavior we need) for the row rendering. The search field is a UI5 `Input` with type=Search.

**Why:** matches the platform's "endorsed UI5 first" rule. We add only the Reltio-specific logic (trigger label, the four-column projection, the search filter, the close-on-select behavior).

### Decision 7 — Slot prop renders into UI5 `children`, CSS handles positioning

The `tenantSelector` slot in `ShellBar` is rendered into the UI5 ShellBar `children` slot alongside the existing `appSelector`. CSS inside `TenantSelector.module.css` handles whatever absolute/flex positioning is needed to anchor the trigger near the title area visually. We do NOT use the experimental UI5 `content` slot.

**Why:** explicit user decision during exploration. Avoids depending on UI5's experimental APIs that may change.

## Risks / Trade-offs

- [Risk] The trigger label `"customer - tenant - env"` may be very long for tenants with verbose names (e.g. `"ACME Corporation Multi-Region Worldwide - autoAcmeCorpUSA-INTERNAL - EUS102-DEVELOP"`). → Mitigation: CSS truncation + `title` tooltip. The Console screenshot uses the dialog rows, not the trigger, to show the full string; the trigger value can be lossy.
- [Risk] Client-side filtering will be slow for tenant lists > ~5000 rows. → Acceptable: real-world Reltio users have at most a few hundred tenants in their lookup list. If a tenant list grows beyond that, virtual scrolling + server-side filter becomes a separate feature.
- [Risk] The fixed four-column layout doesn't match every Reltio app — some apps care only about `tenantName` and `environment`, not `customerName`. → Acceptable for v1: the four-column layout matches the Console reference. Apps with different needs render their own selector. A `columns?: Column[]` API can be added additively later if a second app needs different columns.
- [Trade-off] No shared primitive with `CustomerSelector`. → Accepted: explicit user decision. If real duplication becomes painful during implementation, refactor to an internal `HeaderSelector` primitive (no public API change for either component).

## Migration Plan

None — purely additive. New component, new slot prop. Existing apps continue to roll their own selectors and migrate at their own pace.

## Open Questions

- Which UI5 component is the right base for the dialog body — `Table`, `AnalyticalTable`, or `List`? Decided during implementation based on the sort/filter ergonomics. Default expectation: `Table` (simple, accepts the four-column header row directly).
- Should the dialog be a UI5 `Dialog` (modal) or a UI5 `ResponsivePopover` (anchored)? The screenshot looks centered/modal — `Dialog` is the leading candidate.
- What's the keyboard interaction inside the dialog? At minimum: arrow keys move between rows, Enter selects the focused row, ESC closes. Verified during implementation against UI5's table keyboard model.
- Should the dialog show a row count ("Showing 12 of 47 tenants") below the search field? Nice-to-have; not in v1 unless trivial.
