## Why

`ShellBar` omits UI5's search slot. That was a deliberate scoping decision — the wrapper's own docs say "search … intentionally omitted to keep the component focused; dedicated Reltio props will be added when needed."

They are now needed. The Profile screen puts a search field in the shell bar, between the title area and the right actions cluster, and there is no way to render one through the current API. Consumers would have to drop the wrapper and reach for UI5's `ShellBar` directly, which is exactly the coupling `@reltio/design` exists to prevent.

## What Changes

- Add a `searchField?: ReactElement` slot prop to `ShellBarProps`, mirroring the `tenantSelector`, `userMenu` and `appSelector` convention already in place.
- The wrapper SHALL pass the element into UI5's native `searchField` slot and SHALL set `showSearchField` when one is supplied, so the field renders expanded rather than collapsed behind the magnifier button. The consumer does not manage that flag.
- `searchField` is removed from the type's `Omit` list. The remaining search-related UI5 props (`showSearchField`, `hideSearchButton`, `disableSearchCollapse`, and the search callbacks) stay omitted: the wrapper owns the visibility flag, and the rest are deep customisation with no demand yet.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `shell-bar-component`: gains the `searchField` slot prop.

## Impact

- `components/ShellBar/ShellBar.types.ts` — add the prop, drop `searchField` from `Omit`.
- `components/ShellBar/ShellBar.tsx` — forward the slot and derive `showSearchField`.
- Additive only — a `minor` release.
