## 1. Setup

- [x] 1.1 Install dependencies: `@xyflow/react` and `@dagrejs/dagre`
- [x] 1.2 Create `charts/Diagram/` folder structure: `Diagram.tsx`, `Diagram.types.ts`, `Diagram.module.css`, `Diagram.stories.tsx`, `index.ts`, `components/MarkdownNode/`

## 2. Types

- [x] 2.1 Define `DiagramNode` type (`id`, `type?`, `label?`, `icon?`, `content?`, `data?`)
- [x] 2.2 Define `DiagramEdge` type (`source`, `target`, `label?`)
- [x] 2.3 Define `DiagramDirection` type (`"TB" | "LR"`)
- [x] 2.4 Define `DiagramProps` using `HtmlProps<"div", ...>` with `nodes`, `edges`, `layout`, `direction`, `nodeTypes`, `nodeSpacing`, `rankSpacing`, `loading`, `error`

## 3. MarkdownNode Component

- [x] 3.1 Create `MarkdownNode.tsx` — card with label header, optional icon, optional Markdown body, source/target Handles
- [x] 3.2 Create `MarkdownNode.module.css` — card styling (surface-1 background, border-2 border, rounded corners), header styles, divider, compact Markdown overrides via `.reltio_Markdown_root` scoping
- [x] 3.3 Support layout direction context — position Handles top/bottom for TB, left/right for LR

## 4. Layout Engine

- [x] 4.1 Create `useAutoLayout` hook (or utility function) — accepts nodes with measured dimensions + edges + direction + spacing, returns nodes with computed positions via dagre
- [x] 4.2 Implement two-pass rendering: initial render at `{0,0}` with `opacity: 0`, then reposition after measurement with `opacity: 1`
- [x] 4.3 Trigger layout recomputation when `nodes` or `edges` props change

## 5. Diagram Component

- [x] 5.1 Create `Diagram.tsx` — wrap `ReactFlowProvider` + `ReactFlow` with read-only config (`nodesDraggable={false}`, `nodesConnectable={false}`, `elementsSelectable={false}`, etc.)
- [x] 5.2 Map `DiagramNode[]` → React Flow `Node[]` and `DiagramEdge[]` → React Flow `Edge[]`
- [x] 5.3 Register built-in `markdown` node type, merge with custom `nodeTypes` prop
- [x] 5.4 Implement state handling: error overlay > loading overlay > empty "No data" overlay > diagram
- [x] 5.5 Call `fitView()` after layout completes
- [x] 5.6 Pass `direction` to MarkdownNode via React context or node data for handle positioning

## 6. Styling

- [x] 6.1 Import React Flow base CSS and override with `--reltio-color-*` tokens (node bg, borders, edge stroke, edge labels)
- [x] 6.2 Style state overlays consistent with existing chart overlay pattern
- [x] 6.3 Ensure dark mode works via `data-theme="dark"` (tokens resolve automatically)

## 7. Stories

- [x] 7.1 `Default` story — basic diagram with labeled nodes and edges
- [x] 7.2 `WithMarkdownContent` story — nodes with markdown body content (lists, bold, code)
- [x] 7.3 `LeftToRight` story — `direction="LR"` layout
- [x] 7.4 `LabelOnly` story — nodes without content (simple boxes)
- [x] 7.5 `Loading` story — loading state
- [x] 7.6 `Empty` story — empty nodes array
- [x] 7.7 `Error` story — error state
- [x] 7.8 `CustomHeight` story — non-default height

## 8. Exports

- [x] 8.1 Export `Diagram`, `DiagramNode`, `DiagramEdge`, `DiagramDirection`, `DiagramProps` from `charts/Diagram/index.ts`
- [x] 8.2 Add `Diagram` export to `charts/index.ts`

## 9. Quality

- [x] 9.1 Run `npm run format`
- [x] 9.2 Run `npm run lint` and fix any issues
