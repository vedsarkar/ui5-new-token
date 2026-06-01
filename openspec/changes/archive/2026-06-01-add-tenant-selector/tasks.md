## 1. Scaffold TenantSelector component

- [x] 1.1 Create `components/TenantSelector/` with the canonical Reltio component layout: `TenantSelector.tsx`, `TenantSelector.types.ts`, `TenantSelector.module.css`, `TenantSelector.stories.tsx`, `README.md`, `index.ts`.
- [x] 1.2 Add side-effect icon imports for the caret/dropdown chevron and any column-sort indicator icons.

## 2. Types

- [x] 2.1 In `TenantSelector.types.ts`, declare `TenantEntry = { customerName: string; tenantName: string; tenantId: string; environment: string }` with per-field JSDoc.
- [x] 2.2 Declare `TenantSelectorProps` using `HtmlProps<"div", …>` — fields: `tenants`, `selectedTenantId?`, `onSelect`. Per-field JSDoc on every prop, including the trigger-label format note.

## 3. Trigger implementation

- [x] 3.1 Compute the trigger label: when `selectedTenantId` matches an entry in `tenants`, format as `"${customerName} - ${tenantName} - ${environment}"`; otherwise render the placeholder `"Select tenant"`.
- [x] 3.2 Render the trigger as a clickable element (likely a UI5 `Button design="Transparent"` or a plain `<button>` styled to match the header text + caret pattern). Expose the full label via `title` for tooltip.
- [x] 3.3 Apply CSS `text-overflow: ellipsis` to truncate long labels visually.
- [x] 3.4 On click, set internal `useState` flag to open the dialog.

## 4. Dialog implementation

- [x] 4.1 Render a UI5 `Dialog` (or equivalent — decide between `Dialog` and `ResponsivePopover` during implementation; default to `Dialog`).
- [x] 4.2 Top of dialog: a UI5 search `Input` with placeholder `"Search"` (or `"Search tenants"`). Wire its `onInput` to a local state holding the search query string.
- [x] 4.3 Body: a UI5 `Table` with column headers `Customer name`, `Tenant name`, `Tenant ID`, `Environment` (rendered in this fixed order).
- [x] 4.4 Footer: a `Cancel` button that closes the dialog without invoking `onSelect`.
- [x] 4.5 Wire row click: call `onSelect(tenant)` then close the dialog.
- [x] 4.6 Wire ESC and backdrop click: close the dialog without invoking `onSelect`.

## 5. Filtering and sorting

- [x] 5.1 Derive the rendered rows by filtering `tenants` against the search query — case-insensitive substring match across all four fields (`customerName`, `tenantName`, `tenantId`, `environment`).
- [x] 5.2 Maintain internal `sortColumn` + `sortDirection` state; default sort by `customerName` ascending.
- [x] 5.3 Wire column header click to set the sort column / toggle the direction.
- [x] 5.4 Highlight the active sort column header with an indicator icon (asc/desc).

## 6. Empty states

- [x] 6.1 When `tenants=[]`, render a centered UI5 `IllustratedMessage` (`NoEntries`) titled `"No tenants available"` in place of the table; hide the search/filter controls.
- [x] 6.2 When the search/filters result in zero rows, render a centered UI5 `IllustratedMessage` (`NoData`) titled `"No tenants match your search"` in place of the rows; keep the search input editable.

## 7. Styles

- [x] 7.1 In `TenantSelector.module.css`, style the trigger to integrate with the ShellBar header band — text + caret, hover and focus states from `--sap*` tokens, ellipsis overflow.
- [x] 7.2 Style the dialog's search input, table, and footer using plain values for spacing and `--sap*` tokens for colors.
- [x] 7.3 Trigger placement in the ShellBar is handled by routing `tenantSelector` into the UI5 ShellBar `content` slot (see design Decision 7), not by trigger-specific positioning CSS.

## 8. ShellBar integration

- [x] 8.1 Add `tenantSelector?: ReactElement` to `ShellBarProps` in `components/ShellBar/ShellBar.types.ts` with JSDoc pointing to `<TenantSelector>` as the canonical fill.
- [x] 8.2 In `components/ShellBar/ShellBar.tsx`, render the `tenantSelector` slot element into the underlying UI5 ShellBar's `content` slot, taking precedence over a directly-supplied `content` prop.

## 9. Stories

- [x] 9.1 Write `TenantSelector.stories.tsx` with `fn()` callbacks: trigger with no selection (placeholder), trigger with a tenant selected, dialog open with full list, dialog open with search filtering, dialog open with empty tenants, dialog open with empty search results, dark theme decorator.
- [x] 9.2 Add a `WithTenantSelector` story to `components/ShellBar/ShellBar.stories.tsx`.

## 10. Documentation

- [x] 10.1 Write `components/TenantSelector/README.md` following the AppSelector README structure: H1, intro, controlled selection, trigger label format, search and sort behavior, empty states, SAP Fiori references.
- [x] 10.2 Update `components/ShellBar/README.md` with a `### Tenant selector slot` section.
- [x] 10.3 Add `export * from "./TenantSelector"` to `components/index.ts`.

## 11. Build and verify

- [x] 11.1 Run `npm run build-component-docs` to regenerate `TenantSelector.story.mdx`, `TenantSelector.schema.json`, and refresh ShellBar's MDX/schema.
- [x] 11.2 Run `npm run format && npm run lint` — both must pass.
- [x] 11.3 Visually verify in Storybook: trigger renders correctly with and without selection, dialog opens/closes via all close paths, search filters across columns, column sort works, empty states render.

## 12. Release

- [x] 12.1 Add a changeset (minor bump of `@reltio/design`) noting the new `TenantSelector` component and the `tenantSelector` slot prop on `ShellBar`.

## 13. Review-driven enhancements

Added while reviewing the branch (each reflected in the spec, README, and stories):

- [x] 13.1 Render the default trigger as the endorsed UI5 `Button` (`design="Transparent"`, leading `building` icon, `slim-arrow-down` caret) instead of a native `<button>`.
- [x] 13.2 Add an optional `trigger?: ReactNode` prop — a custom element replaces the default; the component clones it and injects an `onClick` (merged with any existing handler) that opens the dialog.
- [x] 13.3 Add an optional `loading?: boolean` prop — drives the default trigger button's loading spinner (ignored for a custom trigger).
- [x] 13.4 Replace the plain-text empty states with UI5 `IllustratedMessage` (`NoEntries` / `NoData`).
- [x] 13.5 Replace the separate "close search" button with collapse-on-blur: the expanded search input collapses to the icon when it loses focus while empty.
- [x] 13.6 Add a ghost `Clear filter` button in the filter popover that resets both filters at once.
- [x] 13.7 Show a UI5 `ButtonBadge` (`InlineText`) with the active-filter count on the filter button while any filter is applied.
