## Context

The platform has 9 chart components built on Apache ECharts — all canvas-based, optimized for data visualization (bar, line, donut, etc.). The existing `GraphChart` renders node-edge graphs but limited to dots/icons as nodes. There is no way to display structured diagrams with rich content (cards, tables, markdown) inside nodes.

AI agents generate content for the Chat component via markdown-to-jsx. The `Markdown` component supports GFM, raw HTML, and design system component overrides (Button, Details, etc.). This same rendering pipeline will be reused inside diagram nodes.

Charts live in `charts/` and follow a two-layer architecture: internal base component + public high-level wrapper. The Diagram component will introduce a new base layer (React Flow) alongside the existing ECharts base, while following the same public API patterns (state handling, `classNames()`, `HtmlProps`, etc.).

## Goals / Non-Goals

**Goals:**
- Read-only diagram component with automatic dagre layout
- Built-in `markdown` node type rendering content via the existing `Markdown` component
- Nodes without `content` render label-only (simple box)
- Extensible via custom `nodeTypes` prop
- Consistent with existing chart component patterns (states, styling, exports)
- Themed with `--reltio-color-*` tokens, dark mode support via `data-theme`

**Non-Goals:**
- Interactive editing (drag nodes, create edges, delete nodes) — strictly read-only
- Multiple layout engines in v1 (only dagre; elkjs/d3-force deferred)
- Custom edge types or animated edges in v1
- Sub-flows / nested diagrams
- Minimap or controls panel
- Markdown node customization API (compact styles are internal, not configurable)

## Decisions

### 1. React Flow as rendering engine (not ECharts graph)

React Flow renders nodes as DOM elements (any React component), while ECharts renders on canvas with limited node content. Since the core requirement is rich content inside nodes (markdown, design system components), React Flow is the only viable choice.

**Alternative considered:** Extending ECharts `GraphChart` with custom rendering — rejected because ECharts canvas rendering cannot host React component trees inside nodes.

### 2. Two-pass layout with dagre

React Flow does not include built-in auto-layout. Dagre needs node dimensions to compute positions, but dimensions are only known after DOM rendering.

**Approach:**
1. First render: all nodes at position `{x: 0, y: 0}`, invisible (`opacity: 0`)
2. React Flow measures actual DOM dimensions via `useNodesInitialized()`
3. Run dagre with measured `{width, height}` per node
4. Update node positions, set `opacity: 1`, call `fitView()`

**Alternative considered:** Fixed/estimated node sizes — rejected because markdown content produces highly variable node dimensions. Estimation would cause overlaps or excessive whitespace.

### 3. Single built-in node type: `markdown`

Instead of multiple specialized types (entity, process, group), one universal `markdown` node type renders any content via `<Markdown>`. AI agents already know how to write markdown for chat — same skill applies to diagram nodes.

**Node structure:**
```
┌──────────────────────────┐
│  icon?  label            │  ← header (plain React, not markdown)
│ ──────────────────────── │  ← divider (only when content present)
│  <Markdown>{content}     │  ← body (markdown-to-jsx)
│  </Markdown>             │
│  ● handles ●             │  ← source/target handles for edges
└──────────────────────────┘
```

When `content` is omitted, the node renders label-only without the divider or body section.

**Alternative considered:** Multiple typed nodes (entity, process) — rejected for v1 as overengineering. The markdown approach covers all use cases with zero new APIs for AI to learn.

### 4. Compact Markdown styles inside nodes

The `Markdown` component's default CSS (line-height 1.5, paragraph margins, heading sizes) is designed for full-width chat messages. Inside compact node cards (150–300px wide), these styles produce excessive whitespace.

**Approach:** Override Markdown styles using the stable `.reltio_Markdown_root` class within the node wrapper scope:

```css
.nodeBody :global(.reltio_Markdown_root) {
  font-size: 12px;
  line-height: 1.3;
}
.nodeBody :global(.reltio_Markdown_root) p {
  margin: 2px 0;
}
.nodeBody :global(.reltio_Markdown_root) h1,
.nodeBody :global(.reltio_Markdown_root) h2,
.nodeBody :global(.reltio_Markdown_root) h3 {
  font-size: 13px;
  margin: 4px 0 2px;
}
```

This keeps the Markdown component untouched — overrides are scoped to the diagram node context.

### 5. React Flow styling integration with reltio tokens

React Flow ships its own CSS (`@xyflow/react/dist/style.css`). The Diagram component will import React Flow's base styles and override visual properties (colors, borders, backgrounds) with `--reltio-color-*` tokens via CSS specificity.

Key overrides:
- Node background → `--reltio-color-surface-1`
- Node border → `--reltio-color-border-2`
- Edge stroke → `--reltio-color-text-placeholder`
- Edge label background → `--reltio-color-surface-1`
- Selection/focus rings → `--reltio-color-primary`
- Viewport background → transparent (inherits from parent)

### 6. File structure — follows chart conventions with internal subcomponents

```
charts/Diagram/
├── Diagram.tsx              # Main component (ReactFlowProvider + layout orchestration)
├── Diagram.types.ts         # DiagramNode, DiagramEdge, DiagramProps
├── Diagram.module.css       # Root styles, React Flow overrides, state overlays
├── Diagram.stories.tsx      # Stories
├── index.ts                 # Public exports
└── components/
    └── MarkdownNode/
        ├── MarkdownNode.tsx      # Built-in markdown node type
        └── MarkdownNode.module.css  # Node card + compact Markdown overrides
```

### 7. Read-only mode configuration

React Flow's interactivity is disabled via props:
```tsx
<ReactFlow
  nodesDraggable={false}
  nodesConnectable={false}
  elementsSelectable={false}
  edgesFocusable={false}
  nodesFocusable={false}
  panOnDrag={true}
  zoomOnScroll={true}
  zoomOnPinch={true}
  preventScrolling={false}
  fitView
/>
```

Pan and zoom remain enabled for navigation. No editing capabilities exposed.

### 8. State management follows existing chart patterns

| Priority | State | Condition | Display |
|----------|-------|-----------|---------|
| 1 | Error | `error` prop set | Error text overlay |
| 2 | Loading | `loading={true}` | Loading overlay (Skeleton or spinner) |
| 3 | Empty | `nodes` empty/undefined | "No data" text overlay |
| 4 | Layouting | nodes rendered, positions not computed | Nodes invisible (`opacity: 0`) |
| 5 | Diagram | layout complete | Normal rendering with `fitView` |

## Risks / Trade-offs

**[Bundle size increase]** → `@xyflow/react` adds ~35KB gzip, dagre ~9KB. Mitigated by tree-shaking and the fact that Diagram is an opt-in import (not loaded unless used).

**[Two-pass layout flash]** → Brief invisible state while nodes are measured. Mitigated by starting with `opacity: 0` and transitioning to `opacity: 1` after layout completes. Could add a skeleton/loading placeholder during measurement.

**[Markdown rendering performance in nodes]** → Each node runs markdown-to-jsx parsing. For diagrams with 50+ nodes this could be noticeable. Mitigated by React.memo on MarkdownNode. For v1, targeting up to ~30 nodes which should be fine.

**[React Flow version lock-in]** → The component wraps React Flow completely — consumers never import from `@xyflow/react` directly. This allows swapping the rendering engine later without API changes.

**[Dagre is unmaintained]** → The original dagre package is archived. Using `@dagrejs/dagre` (community fork) which is actively maintained. If it stalls, elkjs is a drop-in alternative for future versions.
