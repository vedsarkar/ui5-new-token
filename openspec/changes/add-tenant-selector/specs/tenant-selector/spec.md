## ADDED Requirements

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

### Requirement: Searchable filtered table

The dialog SHALL contain a search input at the top and a table with the columns `Customer name`, `Tenant name`, `Tenant ID`, `Environment` (rendered in that order). When the user types into the search input, rows SHALL be filtered by case-insensitive substring match against ALL FOUR fields of each `TenantEntry`. An empty search string SHALL show every tenant.

#### Scenario: Empty search shows all tenants

- **WHEN** the dialog is open with N tenants in the `tenants` prop and the search input is empty
- **THEN** all N rows are rendered

#### Scenario: Search filters case-insensitively

- **WHEN** the dialog is open with tenants `[{customerName: "AnyCloud", ...}, {customerName: "BCE", ...}]` and the user types `"any"` into the search input
- **THEN** only the row with `customerName: "AnyCloud"` is rendered

#### Scenario: Search matches any of the four fields

- **WHEN** the dialog contains tenants where one has `environment="TST01"` and the user types `"TST"` into the search input
- **THEN** the row with `environment="TST01"` is rendered (matched by the environment field), even if no other field contains `"TST"`

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

When the `tenants` array is empty, the dialog SHALL render a centered "No tenants available" empty-state message in place of the table. When the search filter excludes all rows from a non-empty `tenants` array, the dialog SHALL render "No tenants match your search" instead.

#### Scenario: Empty tenants prop

- **WHEN** the dialog opens with `tenants=[]`
- **THEN** the dialog body shows the text `"No tenants available"` and the search input is disabled or hidden

#### Scenario: Search returns no matches

- **WHEN** the dialog opens with a non-empty `tenants` array, the user types a search string that does not match any tenant
- **THEN** the dialog body shows the text `"No tenants match your search"` AND the search input remains visible and editable
