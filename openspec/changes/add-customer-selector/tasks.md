## 1. Scaffold CustomerSelector component

- [ ] 1.1 Create `components/CustomerSelector/` with the canonical Reltio component layout: `CustomerSelector.tsx`, `CustomerSelector.types.ts`, `CustomerSelector.module.css`, `CustomerSelector.stories.tsx`, `README.md`, `index.ts`.
- [ ] 1.2 Add side-effect icon imports for the caret/dropdown chevron and any column-sort indicator icons.

## 2. Types

- [ ] 2.1 In `CustomerSelector.types.ts`, declare `CustomerEntry = { customerId: string; description?: string }` with per-field JSDoc.
- [ ] 2.2 Declare `CustomerSelectorProps` using `HtmlProps<"div", …>` — fields: `customers`, `selectedCustomerId?`, `onSelect`. Per-field JSDoc on every prop, including the trigger-label rules.

## 3. Trigger implementation

- [ ] 3.1 Compute the trigger label: when `selectedCustomerId` matches an entry in `customers`, render the `customerId`; otherwise render the placeholder `"Select customer"`.
- [ ] 3.2 Compute the `title` tooltip: when `description` is present, use it; otherwise fall back to the `customerId`.
- [ ] 3.3 Render the trigger as a clickable element styled to match the header text + caret pattern. Apply CSS `text-overflow: ellipsis` for truncation.
- [ ] 3.4 On click, set internal `useState` flag to open the dialog.

## 4. Dialog implementation

- [ ] 4.1 Render a UI5 `Dialog` (default; verify against `ResponsivePopover` during implementation).
- [ ] 4.2 Top of dialog: a UI5 search `Input` with placeholder text (e.g. `"Search customers"`); wire `onInput` to a local search-query state.
- [ ] 4.3 Body: a UI5 `Table` with column headers `Customer ID` and `Description` (rendered in this fixed order).
- [ ] 4.4 Footer: a `Cancel` button that closes the dialog without invoking `onSelect`.
- [ ] 4.5 Wire row click: call `onSelect(customer)` then close the dialog.
- [ ] 4.6 Wire ESC and backdrop click: close the dialog without invoking `onSelect`.

## 5. Filtering and sorting

- [ ] 5.1 Derive the rendered rows by filtering `customers` against the search query — case-insensitive substring match against `customerId` AND `description` (treating missing `description` as the empty string).
- [ ] 5.2 Maintain internal `sortColumn` + `sortDirection` state; default sort by `customerId` ascending.
- [ ] 5.3 Wire column header click to set the sort column / toggle the direction.
- [ ] 5.4 For the `Description` sort, pick a stable order for rows with missing `description` (recommended: missing-description rows come AFTER present-description rows in ascending, before in descending — or always last, document the choice).

## 6. Empty states

- [ ] 6.1 When `customers=[]`, render `"No customers available"` centered in place of the table; disable or hide the search input.
- [ ] 6.2 When the search filter results in zero rows, render `"No customers match your search"` in place of the table rows; keep the search input editable.

## 7. Styles

- [ ] 7.1 In `CustomerSelector.module.css`, style the trigger to integrate with the ShellBar header band — text + caret, hover and focus states from `--sap*` tokens, ellipsis overflow.
- [ ] 7.2 Style the dialog's search input, table, and footer using plain values for spacing and `--sap*` tokens for colors.
- [ ] 7.3 Position the trigger inside the ShellBar host using CSS — no dependence on the experimental UI5 `content` slot.

## 8. ShellBar integration

- [ ] 8.1 Add `customerSelector?: ReactElement` to `ShellBarProps` in `components/ShellBar/ShellBar.types.ts`.
- [ ] 8.2 In `components/ShellBar/ShellBar.tsx`, render the `customerSelector` slot element into the underlying UI5 ShellBar's `children` slot, AFTER `tenantSelector` and before `appSelector`.

## 9. Stories

- [ ] 9.1 Write `CustomerSelector.stories.tsx`: trigger with no selection, trigger with selection (descriptions present), trigger with selection (no description), dialog open with full list, dialog open with search filtering, dialog open with empty customers, dialog open with no search matches, dark theme decorator.
- [ ] 9.2 Add a `WithCustomerSelector` story to `components/ShellBar/ShellBar.stories.tsx`.

## 10. Documentation

- [ ] 10.1 Write `components/CustomerSelector/README.md` following the AppSelector README structure: H1, intro, controlled selection, trigger label rules (customerId visible, description as tooltip), search and sort behavior, empty states.
- [ ] 10.2 Update `components/ShellBar/README.md` with a `### Customer selector slot` section.
- [ ] 10.3 Add `export * from "./CustomerSelector"` to `components/index.ts`.

## 11. Build and verify

- [ ] 11.1 Run `npm run build-component-docs`.
- [ ] 11.2 Run `npm run format && npm run lint`.
- [ ] 11.3 Visually verify in Storybook: trigger renders correctly, dialog open/close paths, search filters, sort works, empty states render.

## 12. Release

- [ ] 12.1 Add a changeset (minor bump of `@reltio/design`) noting the new `CustomerSelector` component and the `customerSelector` slot prop on `ShellBar`.
