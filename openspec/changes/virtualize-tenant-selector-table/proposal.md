## Why

Large Reltio customers have hundreds to thousands of tenants. `TenantSelector` currently renders every filtered/sorted tenant as a full `TableRow` in the DOM, which produces a visible stall when the dialog first opens against large tenant sets, degrades scroll smoothness, and inflates memory for a picker most users only skim. UI5's `TableVirtualizer` provides the primitive to fix this without changing the component's public API.

## What Changes

- Add SAP UI5 `TableVirtualizer` inside the dialog's `Table`, gated by a threshold: when the number of visible (filtered) tenants is `≤ VIRTUALIZE_THRESHOLD` (starting value `50`), keep the current full-render code path unchanged; when it exceeds the threshold, render only rows within the current viewport range (plus a small `extraRows` overscan).
- Track the current visible range in local state, updated by the virtualizer's `onRangeChange` event; render the sliced tenants and set `position={absoluteIndex}` on each `TableRow`.
- Reset the virtualizer (`virtualizerRef.current.reset()`) and the local range state whenever the sort column, sort direction, search query, customer filter, or environment filter changes, so the viewport scrolls back to the top with the new dataset.
- Ensure the dialog gives the `Table` a bounded height and the `TableHeaderRow` stays sticky, so `overflowMode="Scroll"` (already the UI5 default) actually scrolls inside a fixed viewport rather than growing the dialog.
- Leave `rowHeight` at UI5's default (`45`). Pinning it to the natural cozy row height (44 px) buys a sub-pixel improvement at threshold-crossing that isn't worth the extra constant and the maintenance cost of re-measuring on any typography change.
- Set `extraRows` to a small overscan (`5`) — enough to hide row pop-in during moderate scroll on the LargeList story, small enough that the DOM row count stays bounded.
- Ship a new Storybook story (`LargeList`) with 1 000 mock tenants that demonstrates the virtualized code path and can serve as a manual perf regression check.

No public API change: `TenantSelectorProps` and `TenantEntry` are untouched, the threshold and row-height are internal constants, and behavior below the threshold is byte-identical to today.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `tenant-selector`: adds a new requirement covering the virtualized rendering path and the reset-on-filter behavior; touches no existing requirements' contracts.

## Impact

- **Code**: `components/TenantSelector/TenantSelector.tsx` (main change), `components/TenantSelector/TenantSelector.stories.tsx` (new `LargeList` story), `components/TenantSelector/TenantSelector.story.mdx` (short mention of the virtualization path).
- **Public API**: none. No changes to `TenantSelectorProps`, `TenantEntry`, `index.ts`, or the re-export in `packages/design/components.ts`.
- **Dependencies**: none added. `@ui5/webcomponents-react/TableVirtualizer` is already available transitively via the pinned `@ui5/webcomponents-react` version bundled by `@reltio/design`.
- **Release**: patch changeset for `@reltio/design` — internal perf fix, no consumer-visible API surface change. Consumers benefit automatically after upgrading.
- **Testing**: existing Storybook interaction / a11y tests for TenantSelector still apply. The new `LargeList` story exercises the virtualized path in Chromatic. TableVirtualizer is marked `@experimental` upstream — the risk is captured in `design.md`.
