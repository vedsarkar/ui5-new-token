# tenant-selector Specification

## Purpose
TBD - created by archiving change add-tenant-selector. Update Purpose after archive.
## Requirements
### Requirement: Component export

The `TenantSelector` component SHALL be exported from `@reltio/design/components` as a named export, together with its `TenantSelectorProps` and `TenantEntry` types.

#### Scenario: Public import

- **WHEN** a consumer writes `import { TenantSelector, type TenantSelectorProps, type TenantEntry } from "@reltio/design/components"`
- **THEN** module resolution succeeds and all three symbols are available with TypeScript types

### Requirement: Controlled selection state

The component SHALL accept `selectedTenantId?: string` and `onSelect: (tenant: TenantEntry) => void`. The component SHALL NOT hold a local "current tenant" shadow state. The trigger's label and the selected row in the dialog SHALL be derived solely from the value of `selectedTenantId` against the `tenants` array.

#### Scenario: Trigger reflects the selected tenant

- **WHEN** the component is rendered with `tenants=[{customerName: "AnyCloud", tenantName: "autoAnyCloud-INTERNAL", tenantId: "autoAnyCloud", environment: "EUS102-DEVELOP"}, …]` AND `selectedTenantId="autoAnyCloud"`
- **THEN** the trigger displays the text `"AnyCloud - autoAnyCloud-INTERNAL - EUS102-DEVELOP"`

#### Scenario: Trigger shows placeholder without selection

- **WHEN** the component is rendered with a non-empty `tenants` array AND no `selectedTenantId`
- **THEN** the trigger displays the placeholder text `"Select tenant"` with a dropdown caret icon

#### Scenario: Invalid selectedTenantId falls back to placeholder

- **WHEN** the component is rendered with `selectedTenantId="does-not-exist"` AND no matching tenant in `tenants`
- **THEN** the trigger displays the placeholder text `"Select tenant"` with a dropdown caret icon

#### Scenario: Selection updates trigger after onSelect

- **WHEN** the dialog is open, the user clicks a row, the component invokes `onSelect(clickedTenant)`, AND the consumer updates `selectedTenantId` to `clickedTenant.tenantId` on the next render
- **THEN** the trigger label updates to reflect the newly selected tenant on the next render

### Requirement: Trigger label format

When a tenant is selected, the trigger label SHALL be exactly `"${customerName} - ${tenantName} - ${environment}"` (with literal " - " separators). Long labels SHALL truncate visually with CSS ellipsis; the untruncated string SHALL be exposed via the trigger's `title` attribute so a browser tooltip shows the full text on hover.

#### Scenario: Full label rendered

- **WHEN** the trigger renders for a tenant `{customerName: "A", tenantName: "T", tenantId: "id", environment: "E"}`
- **THEN** the visible text is `"A - T - E"` AND the `title` attribute equals `"A - T - E"`

#### Scenario: Long label truncates with tooltip

- **WHEN** the trigger renders for a tenant whose formatted label exceeds the trigger's allocated width
- **THEN** the visible text is truncated with `text-overflow: ellipsis` from the right AND the full untruncated string is exposed via the `title` attribute

### Requirement: Internal dialog open/close

The component SHALL hold its dialog open/close state internally. The dialog SHALL open when the user clicks the trigger and SHALL close when: the user selects a row, the user clicks the `Cancel` button, the user presses `Escape`, OR the user clicks the dialog backdrop. The component SHALL NOT expose `open` / `onOpenChange` props.

#### Scenario: Trigger click opens dialog

- **WHEN** the dialog is closed and the user clicks the trigger
- **THEN** the dialog opens with focus moving into it

#### Scenario: Row selection closes dialog and fires onSelect

- **WHEN** the dialog is open and the user clicks a tenant row
- **THEN** `onSelect(tenant)` is called with the clicked `TenantEntry` AND the dialog closes

#### Scenario: Cancel button closes dialog without selection

- **WHEN** the dialog is open and the user clicks the `Cancel` button
- **THEN** the dialog closes AND `onSelect` is NOT called

#### Scenario: ESC key closes dialog

- **WHEN** the dialog is open and the user presses `Escape`
- **THEN** the dialog closes AND `onSelect` is NOT called

#### Scenario: Backdrop click closes dialog

- **WHEN** the dialog is open and the user clicks the area outside the dialog frame (backdrop)
- **THEN** the dialog closes AND `onSelect` is NOT called

### Requirement: Custom trigger

The component SHALL render a default trigger (a transparent button showing the trigger label, a leading `building` icon, and a dropdown caret) when no `trigger` prop is supplied. The component SHALL accept an optional `trigger?: ReactNode` prop that replaces the default trigger. When the supplied `trigger` is a React element, the component SHALL clone it and inject an `onClick` handler that opens the dialog, merged with any `onClick` already present on the element (the existing handler is invoked first, then the dialog opens). The fixed trigger-label format applies only to the default trigger.

The component SHALL accept an optional `loading?: boolean` prop. When `true`, the default trigger button SHALL render its loading state (spinner) — used while the application fetches the full tenant list before the picker is opened. The `loading` prop SHALL only affect the default trigger button — when a custom `trigger` is supplied, `loading` SHALL have no effect.

#### Scenario: Default trigger renders without the prop

- **WHEN** the component is rendered without a `trigger` prop
- **THEN** the built-in transparent button is rendered with the derived trigger label and opens the dialog when clicked

#### Scenario: Custom trigger replaces the default

- **WHEN** the component is rendered with `trigger={<Button>Switch tenant</Button>}`
- **THEN** the custom element is rendered in place of the default button AND clicking it opens the dialog

#### Scenario: Injected onClick preserves the element's own handler

- **WHEN** the supplied `trigger` element already defines its own `onClick` AND the user clicks it
- **THEN** the element's original `onClick` is invoked AND the dialog opens

#### Scenario: Loading shows the default trigger spinner

- **WHEN** the component is rendered with `loading={true}` AND no custom `trigger`
- **THEN** the default trigger button renders its loading spinner

#### Scenario: Loading is ignored for a custom trigger

- **WHEN** the component is rendered with `loading={true}` AND a custom `trigger` element
- **THEN** the custom trigger is rendered unchanged AND the `loading` prop has no effect on it

### Requirement: Collapsing header search

The dialog header SHALL contain a collapsing search affordance: when collapsed it renders a search icon button; activating it expands an inline search input. There is NO separate close button — the expanded input SHALL collapse back to the search icon when it loses focus (blur) while its value is empty; when it holds a value it SHALL stay expanded on blur. The dialog body SHALL render a table with the columns `Customer name`, `Tenant name`, `Tenant ID`, `Environment` (rendered in that order). When the user types into the expanded search input, rows SHALL be filtered by case-insensitive substring match against ALL FOUR fields of each `TenantEntry`. An empty search string SHALL show every tenant (subject to any active column filters).

#### Scenario: Empty search shows all tenants

- **WHEN** the dialog is open with N tenants in the `tenants` prop and no search query and no active filters
- **THEN** all N rows are rendered

#### Scenario: Search expands from the icon

- **WHEN** the dialog is open and the user activates the header search icon
- **THEN** an inline search input appears in the header and receives focus

#### Scenario: Empty search collapses on blur

- **WHEN** the expanded search input is empty and loses focus
- **THEN** the input collapses back to the search icon button

#### Scenario: Non-empty search stays expanded on blur

- **WHEN** the expanded search input holds a query and loses focus
- **THEN** the input remains expanded

#### Scenario: Search filters case-insensitively

- **WHEN** the dialog is open with tenants `[{customerName: "AnyCloud", ...}, {customerName: "BCE", ...}]` and the user types `"any"` into the search input
- **THEN** only the row with `customerName: "AnyCloud"` is rendered

#### Scenario: Search matches any of the four fields

- **WHEN** the dialog contains tenants where one has `environment="TST01"` and the user types `"TST"` into the search input
- **THEN** the row with `environment="TST01"` is rendered (matched by the environment field), even if no other field contains `"TST"`

### Requirement: Customer and environment filter menu

The dialog header SHALL contain a filter affordance: a filter icon button that opens a popover with a `Customer` dropdown and an `Environment` dropdown. Each dropdown SHALL be populated from the distinct values present in the `tenants` array (sorted ascending) plus a leading sentinel option (`All customers` / `All environments`) that clears that filter. Selecting a concrete value SHALL narrow the table to rows whose `customerName` (respectively `environment`) exactly equals the selected value. The search query and the two filters SHALL combine: a row is shown only when it satisfies the search AND both active filters. The popover SHALL also contain a ghost (transparent) `Clear filter` button that resets both the customer and environment filters to their `All …` defaults in a single action. Whenever at least one filter is applied, the header filter button SHALL display a UI5 `ButtonBadge` (`InlineText`) showing the number of active filters as a standard indicator so the user is reminded that filtering is active; the badge SHALL disappear when no filter is applied. The `InlineText` design is used (rather than the overlay `AttentionDot`/`OverlayText`) because the surrounding UI5 `Bar` clips overlay badges via `overflow: hidden`.

#### Scenario: Customer filter narrows rows

- **WHEN** the dialog is open and the user selects a concrete customer in the filter popover's `Customer` dropdown
- **THEN** only rows whose `customerName` equals the selected customer are rendered

#### Scenario: Environment filter narrows rows

- **WHEN** the dialog is open and the user selects a concrete environment in the filter popover's `Environment` dropdown
- **THEN** only rows whose `environment` equals the selected environment are rendered

#### Scenario: Sentinel option clears a filter

- **WHEN** a customer filter is active and the user selects the `All customers` sentinel option
- **THEN** the customer filter is cleared and rows are no longer narrowed by customer

#### Scenario: Clear filter button resets both filters

- **WHEN** a customer filter and/or an environment filter are active and the user clicks the `Clear filter` button in the popover
- **THEN** both filters are reset to their `All …` defaults and the table is no longer narrowed by either filter

#### Scenario: Filter button shows an indicator when filters are applied

- **WHEN** at least one of the customer or environment filters is applied
- **THEN** the header filter button displays a `ButtonBadge` (`InlineText`) showing the count of active filters, which is removed once all filters are cleared

#### Scenario: Search and filters combine

- **WHEN** a search query and a concrete environment filter are both active
- **THEN** only rows that match the search query AND have the selected environment are rendered

### Requirement: Sortable columns

The table SHALL render with `customerName` sorted ascending by default. The user SHALL be able to click any column header to sort by that column. Clicking a column header that is already the active sort column SHALL toggle the sort direction (asc ↔ desc). Sort state is internal — it is NOT exposed via props.

#### Scenario: Default sort is by Customer name ascending

- **WHEN** the dialog opens with `tenants=[{customerName: "Z", ...}, {customerName: "A", ...}, {customerName: "M", ...}]`
- **THEN** the rendered rows appear in order A, M, Z

#### Scenario: Click column header sorts by that column

- **WHEN** the user clicks the `Tenant ID` column header
- **THEN** the rows reorder by `tenantId` ascending

#### Scenario: Click active sort column toggles direction

- **WHEN** the user clicks the `Tenant ID` column header twice in a row
- **THEN** after the first click rows sort `tenantId` ascending; after the second click rows sort `tenantId` descending

### Requirement: Empty state copy

Both empty states SHALL be rendered as a centered UI5 `IllustratedMessage`, not plain text. When the `tenants` array is empty, the dialog SHALL render the `NoEntries` illustration titled "No tenants available" in place of the table. When the active search and filters exclude all rows from a non-empty `tenants` array, the dialog SHALL render the `NoData` illustration titled "No tenants match your search" instead.

#### Scenario: Empty tenants prop

- **WHEN** the dialog opens with `tenants=[]`
- **THEN** the dialog body shows an `IllustratedMessage` (`NoEntries`) titled `"No tenants available"` and the header search and filter controls are hidden

#### Scenario: Search returns no matches

- **WHEN** the dialog opens with a non-empty `tenants` array, the user types a search string that does not match any tenant
- **THEN** the dialog body shows an `IllustratedMessage` (`NoData`) titled `"No tenants match your search"` AND the search input remains visible and editable

