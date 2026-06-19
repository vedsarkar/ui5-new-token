# Carousel

`Carousel` is the SAP Fiori carousel, re-exported from `@ui5/webcomponents-react/Carousel` as the canonical Reltio entry point. Use it to page through a set of equally-sized items in a constrained space — image galleries, onboarding slides, a rotating set of KPI tiles or cards.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Carousel`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Paging

- **`itemsPerPage`** — how many items show per page at each breakpoint, e.g. `"S1 M2 L2 XL2"` (default `"S1 M1 L1 XL1"`).
- **`cyclic`** — wrap from the last page back to the first.
- **`arrowsPlacement`** — `Content` (default, over the items) or `Navigation` (in the indicator row).
- **`hideNavigationArrows`** / **`hidePageIndicator`** — hide the respective affordances.

### Accessibility

Set `accessibleName` to describe the set of items, and prefer real, focusable content inside each slide so keyboard and screen-reader users can reach it.

### See also

- [UI5 Carousel reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-carousel--docs) — full underlying API
- `MediaGallery` — for thumbnail-driven media browsing
