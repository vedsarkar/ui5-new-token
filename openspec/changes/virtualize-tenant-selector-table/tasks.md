## 1. Constants and imports

- [ ] 1.1 Import `TableVirtualizer` and its `TableVirtualizerDomRef` type from `@ui5/webcomponents-react/TableVirtualizer` in `components/TenantSelector/TenantSelector.tsx` (direct UI5 import is allowed inside `components/` per project rules).
- [ ] 1.2 Add module-scoped constants next to `COLUMNS`: `VIRTUALIZE_THRESHOLD = 50`, `VIRTUALIZER_EXTRA_ROWS = 5`, `DEFAULT_INITIAL_VISIBLE_ROWS = 20`. Do NOT introduce a row-height constant — leave `rowHeight` at the UI5 default.

## 2. State and refs

- [ ] 2.1 Add `const virtualizerRef = useRef<TableVirtualizerDomRef>(null);`.
- [ ] 2.2 Add `const [range, setRange] = useState({ first: 0, last: DEFAULT_INITIAL_VISIBLE_ROWS });`.
- [ ] 2.3 Derive `const shouldVirtualize = visibleTenants.length > VIRTUALIZE_THRESHOLD;` after `visibleTenants` is computed.

## 3. Reset on dataset-shape change

- [ ] 3.1 Add a `resetViewport()` helper: `setRange({ first: 0, last: DEFAULT_INITIAL_VISIBLE_ROWS })` followed by `virtualizerRef.current?.reset()`. Call it imperatively from every place that mutates the dataset shape (`sortBy`, the search `onInput`, both filter `Select` `onChange`s, the `Clear filter` button, and `close`). Imperative calls avoid Biome's `useExhaustiveDependencies` complaint about a "trigger-only" `useEffect`.

## 4. Render branches

- [ ] 4.1 Keep the existing full-render `<TableRow>...</TableRow>` mapping under `!shouldVirtualize` — no changes to that JSX.
- [ ] 4.2 When `shouldVirtualize` is true, render a `<TableVirtualizer>` in the `Table`'s `features` slot with props: `ref={virtualizerRef}`, `rowCount={visibleTenants.length}`, `extraRows={VIRTUALIZER_EXTRA_ROWS}`, `onRangeChange={(e) => setRange({ first: e.detail.first, last: e.detail.last })}`. Do NOT pass `rowHeight` — the UI5 default (`45`) is fine.
- [ ] 4.3 In the virtualized branch, render `visibleTenants.slice(range.first, range.last + 1).map((tenant, offset) => <TableRow key={tenant.tenantId} rowKey={tenant.tenantId} interactive position={range.first + offset} className={classNames(tenant.tenantId === selectedTenantId && styles.selectedRow)}> ... </TableRow>)`.
- [ ] 4.4 Verify (by reading) that the JSX below the `Table` (Dialog header, filter Popover, footer) is unchanged.

## 5. Container height and sticky header

- [ ] 5.1 Inspect `TenantSelector.module.css` and confirm the Dialog / Table container has (or add) a bounded height so `overflowMode="Scroll"` produces an internal scroll region instead of growing the dialog. Use `--sap*` tokens or plain px values per the CLAUDE.md styling rules; do not introduce component-level CSS variables.
- [ ] 5.2 Manually verify in Storybook that the `<TableHeaderRow slot="headerRow" sticky>` remains sticky at the top of the scroll viewport in the virtualized `LargeList` story.

## 6. Storybook

- [ ] 6.1 In `TenantSelector.stories.tsx`, add a new `LargeList` story that generates 1000 mock tenants (varied `customerName`/`tenantName`/`tenantId`/`environment` for realistic sort/filter behavior). Reuse the same story `render` shape as existing stories (one variant per story per project rules).
- [ ] 6.2 In `TenantSelector.story.mdx` (or the source `README.md`), add a short paragraph noting that the component switches to `TableVirtualizer` above ~50 filtered rows and that consumers do not need to configure anything.

## 7. Types and API surface

- [ ] 7.1 Confirm `TenantSelector.types.ts` is unchanged (no new props). Do not export the internal constants.
- [ ] 7.2 Confirm `packages/design/components.ts` re-export is unchanged.
- [ ] 7.3 Confirm `TenantSelector.schema.json` is unchanged.

## 8. Verification

- [ ] 8.1 Run `npm run lint` and fix any Biome complaints.
- [ ] 8.2 Run `npm run format` to normalize formatting (tabs + double quotes).
- [ ] 8.3 Run `npm run test` and confirm existing TenantSelector interaction tests still pass.
- [ ] 8.4 Manually open the `LargeList` story with the dialog open and verify: (a) DOM row count is bounded (`document.querySelectorAll("ui5-table-row").length` stays near viewport size + `extraRows`), (b) scrolling is smooth, (c) sticky header stays fixed, (d) sort and search reset the viewport to the top, (e) selecting a row still closes the dialog and fires `onSelect` with the correct tenant.
- [ ] 8.5 Manually open the existing small-list story and verify DOM is byte-identical to before (no `<ui5-table-virtualizer>` child in the DOM, all rows present).

## 9. Release housekeeping

- [ ] 9.1 Run `npm run changeset` and author a `patch` changeset for `@reltio/design` summarizing the internal perf change and noting there is no API change. Use the `add-changeset` skill if handy for the wording.
- [ ] 9.2 Confirm the PR title follows `feat: ` / `perf: ` conventional prefix per the release workflow (`perf: virtualize TenantSelector table for large tenant lists`).
- [ ] 9.3 After merge, when the change is archived via `openspec archive`, verify `openspec/specs/tenant-selector/spec.md` gains the new `Virtualized table rendering above threshold` and `Public API unchanged` requirements.
