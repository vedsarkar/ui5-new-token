# DynamicSideContent

`DynamicSideContent` is the SAP Fiori responsive side-content layout, re-exported from `@ui5/webcomponents-react/DynamicSideContent` as the canonical Reltio entry point. Use it to place supporting content beside a main area — a details panel next to a list, a help/insights rail next to a form — that automatically reflows below or hides the side content as the viewport narrows.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/DynamicSideContent`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Layout props

- **children** — the main content; **`sideContent`** slot — the supporting content.
- **`sideContentPosition`** — `End` (default) or `Start`.
- **`equalSplit`** — split the available width evenly instead of the default main-dominant ratio.
- **`sideContentVisibility`** / **`sideContentFallDown`** — control at which breakpoints the side content shows and when it drops below the main area.
- **`hideMainContent`** / **`hideSideContent`** — imperatively hide either region.

### See also

- [UI5 DynamicSideContent reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-dynamicsidecontent--docs) — full underlying API
- `FlexibleColumnLayout` — for multi-column master/detail flows (not yet endorsed)
