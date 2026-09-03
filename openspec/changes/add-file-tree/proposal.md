## Why

The design system now carries a second tree, drawn in the Joule visual language: a **file tree** with connector lines, per-row file-type icons, and a highlighted path from the root to the selected row. It is positioned as an alternative to the SAP Tree already endorsed as `Tree`, for browsing hierarchies where the *shape* of the hierarchy is part of the information — repositories, generated artefacts, document sets — rather than lists that merely happen to nest.

Neither `@ui5/webcomponents` nor `@ui5/webcomponents-fiori` ships anything close. UI5's `Tree` indents with padding and marks depth by tinting rows (`sapList_AlternatingBackground` from level 2 down); it draws no connectors, has no per-row icon slot, and offers no way to trace the selected row's ancestry. The connector system is the whole point of this design and there is no token or CSS Part that can add it to `ui5-tree`, so this is a new Reltio component rather than a restyle.

Naming: the Figma page is titled "File Tree - Joule" and the component inside it is "File Tree". `FileTree` is proposed as the public name — Joule is a delivery context, not something a consumer should have to know to find a file tree. The README records the provenance.

## What Changes

- Add a `FileTree` Reltio business component under `components/FileTree/`, exported from `@reltio/design/components` alongside `FileTreeProps` and `FileTreeNode`.
- The component SHALL take its hierarchy as data (`items: FileTreeNode[]`) rather than as composed children. Connector shape and colour are derived from a row's position in the whole tree — whether each ancestor has a later sibling, whether the row is a last child, where the selected row sits — which the component cannot know from opaque React children. This follows the render-data pattern the composition guidance endorses for lists, not the compound-component pattern used for variant composition.
- Selection and expansion SHALL each work controlled or uncontrolled, so the component can be driven by a router or left to manage itself.
- The component SHALL implement the ARIA tree pattern: `role="tree"`/`treeitem"`, `aria-expanded`, `aria-selected`, `aria-level`, a single tab stop with a roving `tabindex`, and the standard key bindings (arrows, `Home`, `End`, `Enter`, `Space`).
- File-type icons SHALL be a consumer-supplied `ReactNode` per node. The design shows 23 glyphs, most of which are third-party marks (React, Docker, GitHub, Go, Python, Terraform, n8n); shipping those inside a design-system package is a licensing question, not a styling one, so the component takes whatever icon it is handed and ships none.

## Capabilities

### New Capabilities

- `file-tree`: a connector-drawn file tree with derived ancestry highlighting, controlled/uncontrolled selection and expansion, and full keyboard support.

### Modified Capabilities

None. `Tree` is untouched and remains the endorsed SAP tree.

## Impact

- `components/FileTree/` — new component: `FileTree.tsx`, `FileTree.types.ts`, `FileTree.module.css`, `FileTree.stories.tsx`, `README.md`, `index.ts`, plus the generated `FileTree.story.mdx` and `FileTree.schema.json`.
- `components/index.ts` — add the export.
- No token changes: all seven colours the design binds already exist and match (`sapGroup_ContentBackground`, `sapObjectHeader_BorderColor`, `sapContent_Selected_Hover_Background`, `sapLinkColor`, `sapTextColor`, `sapContent_ForegroundBorderColor`, `sapList_SelectionBorderColor`).
- Additive only — a `minor` release.
