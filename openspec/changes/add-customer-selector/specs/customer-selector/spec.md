## ADDED Requirements

### Requirement: Component export

The `CustomerSelector` component SHALL be exported from `@reltio/design/components` as a named export, together with its `CustomerSelectorProps` and `CustomerEntry` types.

#### Scenario: Public import

- **WHEN** a consumer writes `import { CustomerSelector, type CustomerSelectorProps, type CustomerEntry } from "@reltio/design/components"`
- **THEN** module resolution succeeds and all three symbols are available with TypeScript types

### Requirement: Controlled selection state

The component SHALL accept `selectedCustomerId?: string` and `onSelect: (customer: CustomerEntry) => void`. The component SHALL NOT hold a local "current customer" shadow state. The trigger's label and the selected row in the dialog SHALL be derived solely from `selectedCustomerId` against the `customers` array.

#### Scenario: Trigger reflects the selected customer

- **WHEN** the component is rendered with `customers=[{customerId: "ts_9430759", description: "A king"}, …]` AND `selectedCustomerId="ts_9430759"`
- **THEN** the trigger displays the text `"ts_9430759"`

#### Scenario: Trigger shows placeholder without selection

- **WHEN** the component is rendered with a non-empty `customers` array AND no `selectedCustomerId`
- **THEN** the trigger displays the placeholder text `"Select customer"` with a dropdown caret icon

#### Scenario: Invalid selectedCustomerId falls back to placeholder

- **WHEN** the component is rendered with `selectedCustomerId="does-not-exist"` AND no matching customer in `customers`
- **THEN** the trigger displays the placeholder text `"Select customer"` with a dropdown caret icon

### Requirement: Trigger label format

When a customer is selected, the trigger label SHALL be the customer's `customerId`. The `description` field SHALL be exposed via the trigger's `title` attribute when present so a browser tooltip shows it on hover. When `description` is missing, the `title` SHALL fall back to the `customerId` itself.

#### Scenario: customerId is the visible label

- **WHEN** the trigger renders for a customer `{customerId: "ts_9430759", description: "A king"}`
- **THEN** the visible text is `"ts_9430759"` AND the `title` attribute equals `"A king"`

#### Scenario: title falls back to customerId when description absent

- **WHEN** the trigger renders for a customer `{customerId: "pms-cgw4"}` (no `description`)
- **THEN** the visible text is `"pms-cgw4"` AND the `title` attribute equals `"pms-cgw4"`

#### Scenario: Long label truncates with tooltip

- **WHEN** the trigger renders for a customer whose `customerId` exceeds the trigger's allocated width
- **THEN** the visible text is truncated with CSS `text-overflow: ellipsis` from the right AND the full untruncated `customerId` is reachable via the `title` attribute (or `description` when present)

### Requirement: Internal dialog open/close

The component SHALL hold its dialog open/close state internally. The dialog SHALL open when the user clicks the trigger and SHALL close when: the user selects a row, the user clicks the `Cancel` button, the user presses `Escape`, OR the user clicks the dialog backdrop. The component SHALL NOT expose `open` / `onOpenChange` props.

#### Scenario: Trigger click opens dialog

- **WHEN** the dialog is closed and the user clicks the trigger
- **THEN** the dialog opens with focus moving into it

#### Scenario: Row selection closes dialog and fires onSelect

- **WHEN** the dialog is open and the user clicks a customer row
- **THEN** `onSelect(customer)` is called with the clicked `CustomerEntry` AND the dialog closes

#### Scenario: Cancel button closes dialog without selection

- **WHEN** the dialog is open and the user clicks the `Cancel` button
- **THEN** the dialog closes AND `onSelect` is NOT called

#### Scenario: ESC key closes dialog

- **WHEN** the dialog is open and the user presses `Escape`
- **THEN** the dialog closes AND `onSelect` is NOT called

#### Scenario: Backdrop click closes dialog

- **WHEN** the dialog is open and the user clicks the area outside the dialog frame (backdrop)
- **THEN** the dialog closes AND `onSelect` is NOT called

### Requirement: Searchable two-column table

The dialog SHALL contain a search input at the top and a table with the columns `Customer ID` and `Description` (rendered in that order). When the user types into the search input, rows SHALL be filtered by case-insensitive substring match against the customer's `customerId` AND its `description` (treating a missing description as the empty string). An empty search string SHALL show every customer. Rows whose `description` is missing SHALL render an empty cell in the description column.

#### Scenario: Empty search shows all customers

- **WHEN** the dialog is open with N customers in the `customers` prop and the search input is empty
- **THEN** all N rows are rendered

#### Scenario: Search filters case-insensitively across customerId and description

- **WHEN** the dialog is open with customers `[{customerId: "ts_9430759", description: "A king"}, {customerId: "pms-cgw4"}]` and the user types `"king"` into the search input
- **THEN** only the row with `description: "A king"` is rendered

#### Scenario: Missing description renders empty cell

- **WHEN** the dialog is open with a customer `{customerId: "pms-cgw4"}` (no `description` field)
- **THEN** the row's Description cell is empty (no fallback string)

### Requirement: Sortable columns

The table SHALL render with `customerId` sorted ascending by default. The user SHALL be able to click the `Description` column header to sort by description. Clicking a column header that is already the active sort column SHALL toggle the sort direction (asc ↔ desc). Sort state is internal — it is NOT exposed via props.

#### Scenario: Default sort is by Customer ID ascending

- **WHEN** the dialog opens with `customers=[{customerId: "z"}, {customerId: "a"}, {customerId: "m"}]`
- **THEN** the rendered rows appear in order a, m, z

#### Scenario: Click Description header sorts by description

- **WHEN** the user clicks the `Description` column header
- **THEN** the rows reorder by `description` ascending; rows with missing `description` sort consistently (either before or after present-description rows — implementation choice, but stable)

#### Scenario: Click active sort column toggles direction

- **WHEN** the user clicks the `Customer ID` column header (currently the active sort)
- **THEN** the sort direction toggles from ascending to descending; clicking again toggles back to ascending

### Requirement: Empty state copy

When the `customers` array is empty, the dialog SHALL render a centered "No customers available" empty-state message in place of the table. When the search filter excludes all rows from a non-empty `customers` array, the dialog SHALL render "No customers match your search" instead.

#### Scenario: Empty customers prop

- **WHEN** the dialog opens with `customers=[]`
- **THEN** the dialog body shows the text `"No customers available"` and the search input is disabled or hidden

#### Scenario: Search returns no matches

- **WHEN** the dialog opens with a non-empty `customers` array, the user types a search string that does not match any customer
- **THEN** the dialog body shows the text `"No customers match your search"` AND the search input remains visible and editable
