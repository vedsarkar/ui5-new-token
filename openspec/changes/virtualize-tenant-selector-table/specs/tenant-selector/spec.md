## ADDED Requirements

### Requirement: Virtualized table rendering above threshold

The dialog's tenant table SHALL render every filtered row directly when the visible tenant count is at or below an internal threshold, and SHALL delegate row rendering to SAP UI5's `TableVirtualizer` when the visible count exceeds it. In the virtualized path, only rows whose absolute index falls within the current viewport range (as reported by the virtualizer's `onRangeChange` event) SHALL be present in the DOM, each carrying a `position` prop equal to its 0-based absolute index in the filtered/sorted list. The internal `Table` SHALL keep `overflowMode="Scroll"` so that vertical scrolling occurs inside the dialog and the `TableHeaderRow` remains sticky over the virtualized rows.

The threshold SHALL be an internal constant, not exposed as a component prop. Row height SHALL be left at the UI5 `TableVirtualizer` default (`45`). `extraRows` SHALL be a small non-zero constant (currently `5`) to hide row pop-in during moderate scroll; raise or lower it only in response to an observed regression.

#### Scenario: Small tenant list uses the full-render path

- **WHEN** the dialog is open and the filtered/sorted tenant list contains at most the threshold count of entries
- **THEN** every filtered tenant is rendered as a `TableRow` AND no `TableVirtualizer` element is present in the table

#### Scenario: Large tenant list uses the virtualized path

- **WHEN** the dialog is open and the filtered/sorted tenant list contains more entries than the threshold
- **THEN** a `TableVirtualizer` is rendered inside the `Table` with `rowCount` equal to the filtered count
- **AND** only the rows within the current viewport range (as reported by `onRangeChange`) are rendered as `TableRow` elements
- **AND** each rendered `TableRow` carries a `position` prop equal to its 0-based absolute index in the filtered/sorted list

#### Scenario: Sort change resets the viewport

- **WHEN** the virtualized path is active and the user clicks a column header to change the sort column or toggle the sort direction
- **THEN** the underlying `TableVirtualizer` is reset AND the visible range starts again from the top of the new sorted list

#### Scenario: Search or filter change resets the viewport

- **WHEN** the virtualized path is active and the search query, customer filter, or environment filter changes
- **THEN** the underlying `TableVirtualizer` is reset AND the visible range starts again from the top of the new filtered list

#### Scenario: Threshold boundary switches paths downward

- **WHEN** the dialog is open with more entries than the threshold and the user then narrows the list (via search or filter) to at most the threshold count
- **THEN** the component switches to the full-render path AND no `TableVirtualizer` is present in the resulting DOM

#### Scenario: Threshold boundary switches paths upward

- **WHEN** the dialog is open with at most the threshold count of filtered entries and the user then broadens the list (by clearing a filter or search term) to more than the threshold
- **THEN** the component switches to the virtualized path AND `rowCount` reflects the restored count AND the viewport starts from the top

#### Scenario: Sticky header remains sticky under virtualization

- **WHEN** the virtualized path is active and the user scrolls the table
- **THEN** the `TableHeaderRow` remains visible at the top of the scroll viewport throughout the scroll

#### Scenario: Selected row highlight survives virtualization

- **WHEN** the virtualized path is active, a tenant is selected via `selectedTenantId`, and the user scrolls the selected row into and out of the viewport
- **THEN** whenever the selected row is within the current visible range it is rendered with the "selected" visual state AND its `position` prop matches its absolute index in the filtered/sorted list

### Requirement: Public API unchanged

The virtualization feature SHALL NOT change the exported types (`TenantSelectorProps`, `TenantEntry`), the component's props surface, or its exports. Consumers who upgrade `@reltio/design` after this change SHALL not need to modify any call site.

#### Scenario: No new props required

- **WHEN** an existing consumer renders `<TenantSelector tenants={...} selectedTenantId={...} onSelect={...} />` after upgrading `@reltio/design`
- **THEN** the component renders with the virtualization behavior applied automatically when the filtered tenant count exceeds the internal threshold AND no additional prop is required
