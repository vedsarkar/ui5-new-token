# SplitterLayout

`SplitterLayout` is the SAP Fiori splitter container, re-exported from `@ui5/webcomponents-react/SplitterLayout` as the canonical Reltio entry point. Use it for resizable, user-adjustable panes — a list/detail split, a navigation/content/inspector three-pane workspace, an editor with a preview. Users drag the bars between panes to redistribute space. Compose panes from `SplitterElement`.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/SplitterLayout`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Composition

- **`SplitterElement`** — one pane: `size` (initial width/height), `minSize`, and `resizable`. At least one pane should keep a dynamic (`auto`) size so the layout fills its container.
- **`vertical`** — stack panes top-to-bottom instead of side-by-side.

### See also

- [UI5 SplitterLayout reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-splitterlayout--docs) — full underlying API
- `DynamicSideContent` — for responsive (non-draggable) side content
