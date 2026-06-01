# TenantSelector

`TenantSelector` is the Reltio header tenant picker. It renders a trigger that
shows the active tenant and opens a searchable, sortable dialog of every tenant
the user can switch to. Each Reltio admin application (Console, admin-tools,
data-out, …) historically rolled its own version on top of UI5 `Dialog` + a
custom table; this component is the single endorsed implementation so column
layout, search semantics, and empty-state copy stay consistent across products.

It composes UI5 `Dialog`, `Table`, `Input`, `Select`, and `Popover` — it adds only
the Reltio-specific concerns: the fixed trigger-label format, the four-column
projection, the cross-column search filter, the customer/environment filter menu,
column sorting, and the close-on-select behavior.

### Controlled selection

The component is fully controlled. The consumer owns `selectedTenantId` and reacts
to `onSelect`. There is no shadow selection state inside the component: the trigger
label and the highlighted row are both derived from matching `selectedTenantId`
against the `tenants` array. After the user picks a row, `onSelect(tenant)` fires
and the dialog closes — the consumer is responsible for updating `selectedTenantId`
(from its URL, store, etc.) on the next render.

### Trigger label format

Once a tenant is selected the trigger reads
`"${customerName} - ${tenantName} - ${environment}"`. With no selection (or a
`selectedTenantId` that matches no entry) it reads `"Select tenant"` with a
dropdown caret. Long labels truncate with an ellipsis; the full untruncated string
is always available via the trigger's `title` attribute for a hover tooltip.

### Custom trigger

By default the trigger is a transparent `Button` with a leading `building` icon,
the selected-tenant label, and a dropdown caret. Pass `trigger` to replace it with
any React element — the component clones the element and injects an `onClick` that
opens the dialog (merged with any `onClick` already on the element), so the custom
trigger should be interactive (a button, link, or other clickable element). The
fixed trigger-label format only applies to the default trigger; a custom trigger
renders exactly what you pass.

Set `loading` to put the default trigger button into its loading state (spinner)
while the tenant list (or the active tenant) is being fetched, before the picker is
opened — applications always load the full tenant list up front so the trigger can
render the correct label. `loading` is ignored when a custom `trigger` is supplied —
the consumer owns that element's loading state.

### Search, filter, and sort

The dialog header carries a **collapsing search** (a search icon that expands into
an input) and a **filter menu** (a filter icon that opens a popover with `Customer`
and `Environment` dropdowns), mirroring the canonical Console tenant picker. There
is no close button — the expanded search input collapses back to the icon on blur
when it is empty, and stays open while it holds a query.

- **Search** filters rows by case-insensitive substring match across **all four**
  fields (customer name, tenant name, tenant ID, environment).
- **Filter** narrows rows to an exact `customerName` and/or `environment`; the
  dropdowns are populated from the distinct values present in `tenants`, with an
  `All customers` / `All environments` sentinel that clears each filter. A ghost
  `Clear filter` button in the popover resets both filters at once. While any filter
  is applied, the filter button carries a UI5 `ButtonBadge` (`InlineText`) showing
  the number of active filters, so the active filtering stays visible. (The inline
  design is used because the surrounding `Bar` clips overlay-style badges.)
- **Sort** is by `Customer name` ascending by default; clicking any column header
  sorts by that column, and clicking the active column again toggles the direction.

Search, filter, and sort state are all internal — they reset to defaults each time
the dialog reopens and are never exposed as props. Search and filter combine (a row
must satisfy both).

### Internal dialog state

The dialog open/close state is ephemeral interaction state and stays internal —
there is no `open` prop. Clicking the trigger opens it; selecting a row, the
`Cancel` button, `Escape`, or a backdrop click all close it. Only a row selection
invokes `onSelect`.

### Empty states

Both empty states render a UI5 `IllustratedMessage` rather than plain text. When
`tenants` is empty the dialog shows the `NoEntries` illustration titled
`"No tenants available"` and the search and filter controls are hidden. When the
active search and filter match nothing the dialog keeps the controls available and
shows the `NoData` illustration titled `"No tenants match your search"` in place of
the rows.

### See also

- [UI5 Table reference](https://ui5.github.io/webcomponents/components/Table/) — row rendering, sticky header, keyboard model
- [UI5 Dialog reference](https://ui5.github.io/webcomponents/components/Dialog/) — overlay frame, close paths
- [SAP Fiori — Shell Bar](https://www.sap.com/design-system/fiori-design-web/v1-145/ui-elements/shell-bar) — where the tenant picker lives in the canonical header
