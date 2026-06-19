# MediaGallery

`MediaGallery` is the SAP Fiori media gallery, re-exported from `@ui5/webcomponents-react/MediaGallery` as the canonical Reltio entry point. Use it to browse a set of images or media with a large display area and a thumbnail strip — entity attachments, document previews, product imagery. Compose items from `MediaGalleryItem`.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/MediaGallery`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Composition

- **`MediaGalleryItem`** — one media entry; put the thumbnail in the `thumbnail` slot and the full-size content as children.
- **`layout`** — `Auto` (default), `Vertical`, or `Horizontal` thumbnail placement.
- **`showAllThumbnails`** — show every thumbnail instead of collapsing into an overflow.

### See also

- [UI5 MediaGallery reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-mediagallery--docs) — full underlying API
- `Carousel` — for paging through equally-sized items
