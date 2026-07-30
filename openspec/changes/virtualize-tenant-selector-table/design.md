## Context

`TenantSelector` renders every filtered/sorted tenant as a `TableRow` inside a UI5 `Table`. Under small tenant sets (dozens) this is fine; against real enterprise tenant lists (hundreds to thousands) the initial dialog render stalls, scroll jank appears, and every row's cells stay resident in memory even though only a handful are ever visible in the dialog viewport.

SAP UI5 ships a purpose-built primitive for this: `TableVirtualizer`. It requires the parent `Table` to be in `overflowMode="Scroll"` (already the default per `Table.schema.json`), the header row to be `sticky`, and the `Table` itself to have a bounded height so that scroll happens inside a fixed viewport. It exposes:

- Props: `rowCount` (total rows in the dataset), `rowHeight` (px), `extraRows` (overscan; default 0).
- Event: `onRangeChange` with `{ first, last }` (0-based, inclusive).
- Ref: `TableVirtualizerDomRef.reset()` — resets to initial state and refires `range-change`.

The API is marked `@experimental` in `@ui5/webcomponents` (since 2.5.0). Reltio Design pins `@ui5/webcomponents-react @ 2.21.3`, which includes this primitive; the pin absorbs any upstream API drift, and Chromatic in the CoE pipeline is the safety net if UI5 breaks the shape in a future bump.

## Goals / Non-Goals

**Goals:**
- Cut DOM row count in `TenantSelector` from `O(filtered tenants)` to `O(viewport rows + extraRows)` when the visible list exceeds a threshold.
- Keep the current behavior byte-identical below the threshold (no regressions for small tenant sets, no extra event handlers, no wrapper element).
- Preserve every existing capability: search, filter, sort, sticky header, selected-row highlight, keyboard interaction, `IllustratedMessage` empty states, custom trigger.
- Keep the public API unchanged.

**Non-Goals:**
- Exposing `rowHeight` / `extraRows` / `threshold` as component props. Consumers should not have to reason about virtualizer tuning. If a future need appears, it will land as a follow-up proposal.
- Backfilling virtualization into other Reltio components that use `Table`. Scoped to `TenantSelector` — a broader sweep is a separate proposal.
- Server-side pagination or windowed fetching. `TenantSelector` is a controlled component; the consumer owns the full tenant list and passes it in. Virtualization is a rendering optimization only.
- Dynamic (variable) row heights. UI5's `TableVirtualizer` assumes a fixed `rowHeight`; the TenantSelector rows are uniform, so the UI5 default fits without any measurement or constant.

## Decisions

### Decision 1: Threshold-gated virtualization, not always-on

Render the current full-DOM code path when `visibleTenants.length ≤ VIRTUALIZE_THRESHOLD`, virtualized code path otherwise.

**Rationale:**
- The virtualizer imposes a small per-render cost (extra child in the Table, a ResizeObserver / IntersectionObserver couple, a scroll-driven `onRangeChange`) that outweighs its benefit for short lists.
- The virtualizer's own docs warn that DOM height caps limit maximum virtual row count; keeping the small-list path unchanged means the "everything is trivially fine" case stays trivially fine.
- Existing Storybook snapshots for the current small-list behavior don't have to change.

**Alternative considered:** always-on virtualization. Rejected because it makes even the trivial 5-row story a virtualized render, which needlessly bloats DOM diffs and Chromatic snapshots.

**Threshold value:** start at `50`. Rationale: on the target dev laptops the current full-render path becomes visibly slower somewhere in the 50-100 row range, and picking the lower end of that window keeps a comfortable safety margin. This is a starting point, easy to revisit; a comment in the code notes that it is a soft heuristic.

### Decision 2: Leave `rowHeight` at UI5's default

Do not pass a custom `rowHeight` to `TableVirtualizer`. UI5 applies its own default (`45`), which is 1 px taller than the natural cozy row (`44`).

**Rationale:** the 1 px delta at threshold-crossing is imperceptible in practice — nobody watches the row height jump when the 50th filter match appears. In exchange we avoid: an internal constant that has to be re-verified after every typography change; a comment explaining a measurement procedure; and a subtle coupling between the CSS and the JS side of the component. Simpler wins.

**Alternatives considered:**
- **Measured `ROW_HEIGHT_PX = 44`.** Removes the 1 px delta but adds a hidden invariant (constant must match CSS-driven row height). Rejected — cost > benefit.
- **Dynamic measurement via `useLayoutEffect`.** Removes the constant but adds a paint dependency and a first render at `rowHeight=0`. Rejected — over-engineering.

### Decision 3: Reset the virtualizer on every dataset-shape change

When any of `sortColumn`, `sortDirection`, `query`, `customerFilter`, or `environmentFilter` changes, the virtualizer is reset via `virtualizerRef.current?.reset()`.

**Rationale:**
- The row identity at index `n` changes when sort/filter changes; without a reset the viewport can be pointing at an index that no longer contains the intended row, producing a visual flash of unrelated rows and (for search) an off-viewport landing position.
- `reset()` also refires `range-change`, which naturally re-populates the local `range` state to `{ first: 0, last: ... }` without extra bookkeeping.

**Alternative considered:** compute a `key` on the virtualizer that changes with the dataset shape, forcing React remount. Rejected: remount is a heavier operation than `reset()` and briefly unmounts the underlying UI5 element (losing focus / measured size).

### Decision 4: Preserve `position` prop on every rendered TableRow

Even in the virtualized path, each rendered `TableRow` receives `position={absoluteIndex}`. UI5 relies on `position` for accessible `aria-rowindex` announcements, keyboard navigation shortcuts (`PgUp` / `PgDn` step by page), and its own virtualization bookkeeping.

**Rationale:** `TableRow.position` is documented as required whenever `TableVirtualizer` is present. Omitting it breaks Home/End keyboard navigation and screen-reader row counting.

### Decision 5: Track viewport range in local state; slice `visibleTenants` for render

Wire the virtualizer's `onRangeChange` to `setRange({ first, last })` and render `visibleTenants.slice(first, last + 1)` in the map. Initial state: `{ first: 0, last: DEFAULT_INITIAL_VISIBLE_ROWS }` where the default is large enough to cover a first paint (e.g. 20) so the dialog is not empty before the virtualizer emits its first `range-change`.

**Rationale:**
- Slicing keeps the JSX close to the current shape (one `.map` over an array), which minimises diff and preserves the mental model of every scenario in the spec.
- The initial guess only matters for the very first frame after the dialog opens with a large list; the virtualizer emits `range-change` on mount, so the local guess is corrected on the same tick.

### Decision 6: Reset local `range` and virtualizer together on close

`close()` already resets sort/filter/search. It SHALL also reset the local `range` state to its initial value. `virtualizerRef.current?.reset()` runs on the next open via the effect that also resets on filter-change.

**Rationale:** avoid stale range surviving a close/reopen when the tenant list is unchanged.

## Risks / Trade-offs

- **[Risk]** `TableVirtualizer` is `@experimental` — SAP may change its API in a future UI5 minor release.
  **Mitigation:** `@reltio/design` pins `@ui5/webcomponents-react @ 2.21.3`. Any UI5 bump goes through the CoE upgrade path, where Chromatic + interaction tests on `TenantSelector` will catch a breaking API shape before it reaches consumers.

- **[Risk]** `VIRTUALIZE_THRESHOLD = 50` is a heuristic. A very slow device could benefit from a lower threshold; a very fast device could tolerate a higher one.
  **Mitigation:** starting value is documented as tunable in code; no consumer contract locks it. If we see complaints, we can lower it without a spec change (the spec talks about "the threshold count" abstractly, not a specific number).

- **[Trade-off]** Two code paths (below vs above threshold) mean a small amount of duplicated JSX. Consolidating into one branch (always the virtualized layout) would be more elegant but violates Decision 1 by dropping the trivially-fine small-list case.

- **[Trade-off]** Reset-on-any-change is a blunt hammer. In theory we could preserve viewport position when the sort direction toggles (index order reverses but item set unchanged). Not worth the complexity — the reset behavior is the intuitive one: "new list order, start at the top".

## Migration Plan

None. Internal-only change. On publish, consumers pick up the improvement automatically on the next `@reltio/design` install. No code moves, no imports move, no props change.

**Rollback:** revert the PR. The full-render path is preserved verbatim under the threshold branch, so a revert has zero risk of losing behavior.

## Open Questions

- Should the initial `range` guess be tuned to the actual dialog viewport, or a static value like `20`? Static keeps the code simpler and is only visible for one frame; deferring to implementation. Answer will land in the tasks phase.
- ~~Do we need `extraRows > 0` on fast-scroll devices?~~ **Resolved during implementation.** Manual testing of the `LargeList` story with `extraRows=0` showed a visible row "pop-in" at the viewport edge during moderate scroll. Setting `extraRows=5` (5 * 44px = 220px buffer top and bottom) removed the pop without a meaningful DOM row count increase.
