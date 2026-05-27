## 1. Scaffold TenantSelector component

- [ ] 1.1 Create `components/TenantSelector/` with the canonical Reltio component layout: `TenantSelector.tsx`, `TenantSelector.types.ts`, `TenantSelector.module.css`, `TenantSelector.stories.tsx`, `README.md`, `index.ts`.
- [ ] 1.2 Add side-effect icon imports for the caret/dropdown chevron and any column-sort indicator icons.

## 2. Types

- [ ] 2.1 In `TenantSelector.types.ts`, declare `TenantEntry = { customerName: string; tenantName: string; tenantId: string; environment: string }` with per-field JSDoc.
- [ ] 2.2 Declare `TenantSelectorProps` using `HtmlProps<"div", …>` — fields: `tenants`, `selectedTenantId?`, `onSelect`. Per-field JSDoc on every prop, including the trigger-label format note.

## 3. Trigger implementation

- [ ] 3.1 Compute the trigger label: when `selectedTenantId` matches an entry in `tenants`, format as `"${customerName} - ${tenantName} - ${environment}"`; otherwise render the placeholder `"Select tenant"`.
- [ ] 3.2 Render the trigger as a clickable element (likely a UI5 `Button design="Transparent"` or a plain `<button>` styled to match the header text + caret pattern). Expose the full label via `title` for tooltip.
- [ ] 3.3 Apply CSS `text-overflow: ellipsis` to truncate long labels visually.
- [ ] 3.4 On click, set internal `useState` flag to open the dialog.

## 4. Dialog implementation

- [ ] 4.1 Render a UI5 `Dialog` (or equivalent — decide between `Dialog` and `ResponsivePopover` during implementation; default to `Dialog`).
- [ ] 4.2 Top of dialog: a UI5 search `Input` with placeholder `"Search"` (or `"Search tenants"`). Wire its `onInput` to a local state holding the search query string.
- [ ] 4.3 Body: a UI5 `Table` with column headers `Customer name`, `Tenant name`, `Tenant ID`, `Environment` (rendered in this fixed order).
- [ ] 4.4 Footer: a `Cancel` button that closes the dialog without invoking `onSelect`.
- [ ] 4.5 Wire row click: call `onSelect(tenant)` then close the dialog.
- [ ] 4.6 Wire ESC and backdrop click: close the dialog without invoking `onSelect`.

## 5. Filtering and sorting

- [ ] 5.1 Derive the rendered rows by filtering `tenants` against the search query — case-insensitive substring match across all four fields (`customerName`, `tenantName`, `tenantId`, `environment`).
- [ ] 5.2 Maintain internal `sortColumn` + `sortDirection` state; default sort by `customerName` ascending.
- [ ] 5.3 Wire column header click to set the sort column / toggle the direction.
- [ ] 5.4 Highlight the active sort column header with an indicator icon (asc/desc).

## 6. Empty states

- [ ] 6.1 When `tenants=[]`, render the centered text `"No tenants available"` in place of the table; disable or hide the search input.
- [ ] 6.2 When the search filter results in zero rows, render `"No tenants match your search"` in place of the table rows; keep the search input editable.

## 7. Styles

- [ ] 7.1 In `TenantSelector.module.css`, style the trigger to integrate with the ShellBar header band — text + caret, hover and focus states from `--sap*` tokens, ellipsis overflow.
- [ ] 7.2 Style the dialog's search input, table, and footer using plain values for spacing and `--sap*` tokens for colors.
- [ ] 7.3 Position the trigger inside the ShellBar host using CSS — no dependence on the experimental UI5 `content` slot.

## 8. ShellBar integration

- [ ] 8.1 Add `tenantSelector?: ReactElement` to `ShellBarProps` in `components/ShellBar/ShellBar.types.ts` with JSDoc pointing to `<TenantSelector>` as the canonical fill.
- [ ] 8.2 In `components/ShellBar/ShellBar.tsx`, render the `tenantSelector` slot element into the underlying UI5 ShellBar's `children` slot, ordered before `customerSelector` and `appSelector`.

## 9. Stories

- [ ] 9.1 Write `TenantSelector.stories.tsx` with `fn()` callbacks: trigger with no selection (placeholder), trigger with a tenant selected, dialog open with full list, dialog open with search filtering, dialog open with empty tenants, dialog open with empty search results, dark theme decorator.
- [ ] 9.2 Add a `WithTenantSelector` story to `components/ShellBar/ShellBar.stories.tsx`.

## 10. Documentation

- [ ] 10.1 Write `components/TenantSelector/README.md` following the AppSelector README structure: H1, intro, controlled selection, trigger label format, search and sort behavior, empty states, SAP Fiori references.
- [ ] 10.2 Update `components/ShellBar/README.md` with a `### Tenant selector slot` section.
- [ ] 10.3 Add `export * from "./TenantSelector"` to `components/index.ts`.

## 11. Build and verify

- [ ] 11.1 Run `npm run build-component-docs` to regenerate `TenantSelector.story.mdx`, `TenantSelector.schema.json`, and refresh ShellBar's MDX/schema.
- [ ] 11.2 Run `npm run format && npm run lint` — both must pass.
- [ ] 11.3 Visually verify in Storybook: trigger renders correctly with and without selection, dialog opens/closes via all close paths, search filters across columns, column sort works, empty states render.

## 12. Release

- [ ] 12.1 Add a changeset (minor bump of `@reltio/design`) noting the new `TenantSelector` component and the `tenantSelector` slot prop on `ShellBar`.
