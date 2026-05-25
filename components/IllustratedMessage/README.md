# IllustratedMessage

`IllustratedMessage` is the SAP Fiori page-level status component, re-exported from `@ui5/webcomponents-react/IllustratedMessage` as the canonical Reltio entry point. Use it for empty states, error pages, success confirmations, and any other moment where the user lands on a screen that has no data, no result, or a single message to communicate.

There is no Reltio wrapping around the underlying UI5 component: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/IllustratedMessage`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Anatomy

- `name` — the Fiori illustration to render. Common values: `NoData`, `NoEntries`, `NoSearchResults`, `UnableToLoad`, `SuccessScreen`, `ErrorScreen`. The full set lives in `@ui5/webcomponents-fiori/dist/illustrations/`.

> **Each illustration is lazy-loaded.** SAP ships every illustration as a separate ES module — the `name` prop alone is not enough. In the file that mounts the IllustratedMessage, add a side-effect import for every illustration you reference: `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"`. Without the import UI5 renders a fallback placeholder with no console error.
- `titleText` — the headline, in a single sentence.
- `subtitleText` — supporting copy that explains the state and tells the user what to do next.
- Children — optional primary action button(s). Most pages benefit from one Emphasized button paired with the illustration.

### Sizing

- `design="Auto"` (default) — sizes itself to its container.
- `design="Scene"` — large, full-page treatment with all artwork.
- `design="Dialog"` — medium size for inside dialogs and drawers.
- `design="Spot"` — compact, single-icon-style for inline empty states inside cards.

### When to use

| State | Illustration | Action |
|---|---|---|
| Empty list, no filter applied | `NoEntries` | Primary CTA to create the first item |
| Empty list, user filtered out everything | `NoData` / `NoFilterResults` | Reset filters secondary CTA |
| Could not load data | `UnableToLoad` | Retry primary CTA |
| Operation succeeded | `SuccessScreen` | Continue / Done primary CTA |
| 404, 500 | `PageNotFound` / `UnableToLoad` | Navigate-home primary CTA |

### Accessibility

`titleText` is rendered as a heading; the illustration is `aria-hidden` because it conveys no information beyond the title/subtitle copy. Always pair an illustration with descriptive text — never lean on the image alone.

### See also

- [SAP Fiori Illustrated Message guideline](https://experience.sap.com/fiori-design-web/illustrated-message/)
- [UI5 IllustratedMessage reference](https://ui5.github.io/webcomponents/components/fiori/IllustratedMessage/)
