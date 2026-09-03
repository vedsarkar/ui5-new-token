## 1. Component

- [x] 1.1 `components/FileTree/FileTree.types.ts` — `FileTreeNode`, `FileTreeProps` via `HtmlProps<"div", …>`, JSDoc on every field
- [x] 1.2 `components/FileTree/FileTree.module.css` — container card, row, connector cells, selection states; `--sap*` for colour only
- [x] 1.3 `components/FileTree/FileTree.tsx` — flatten/derive connectors, controlled + uncontrolled state, keyboard handling, ARIA tree pattern
- [x] 1.4 `components/FileTree/index.ts` — public surface
- [x] 1.5 `components/index.ts` — add the export

## 2. Documentation and stories

- [x] 2.1 `components/FileTree/FileTree.stories.tsx` — one story per enum-like variant, `fn()` callbacks, dual-theme left on
- [x] 2.2 `components/FileTree/README.md` — rationale, connector model, icon policy, divergence from `Tree`
- [x] 2.3 `npm run build-component-docs` to generate `FileTree.story.mdx` + `FileTree.schema.json`

## 3. Verification

- [x] 3.1 Measure the rendered rows and connectors against the Figma spec
- [x] 3.2 `npm run format` and `npm run lint` clean
- [x] 3.3 Storybook suite passes
- [x] 3.4 Changeset (`minor` — new component)
