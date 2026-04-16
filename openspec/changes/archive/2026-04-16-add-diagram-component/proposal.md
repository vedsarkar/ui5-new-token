## Why

The platform needs structured diagram visualization for AI-generated content inside the Chat component. Existing `GraphChart` (ECharts-based) renders nodes as simple dots/icons on a canvas — it cannot display rich content (cards with fields, markdown, nested components) inside nodes. A new `Diagram` component built on React Flow will enable AI agents to generate interactive, read-only node-edge diagrams with arbitrary React content in each node — using the same markdown format they already use in chat messages.

## What Changes

- **New `Diagram` component** in `charts/` — a read-only React Flow wrapper with automatic dagre layout, reltio theming, and a built-in `markdown` node type that renders content via the existing `Markdown` component
- **New dependency**: `@xyflow/react` (React Flow v12) for node/edge rendering and viewport management
- **New dependency**: `@dagrejs/dagre` for automatic graph layout computation
- **Built-in `markdown` node type** — each node renders a label header and optional markdown body via `<Markdown>`, reusing the same overrides and component resolution that Chat messages use
- **Extensible `nodeTypes` prop** — consumers can register custom React components as additional node types beyond the built-in `markdown`
- **CSS style overrides for Markdown inside nodes** — compact spacing, tighter typography for node context (via stable `.reltio_` class overrides)

## Capabilities

### New Capabilities

- `diagram-component`: Core Diagram component — node/edge data model, React Flow integration, read-only mode, viewport controls (zoom, pan, fit-to-view), reltio color token theming
- `diagram-layout`: Automatic layout engine — dagre-based positioning with direction prop (TB/LR), two-pass measurement (render → measure DOM → compute layout → reposition), node spacing configuration
- `diagram-markdown-node`: Built-in markdown node type — label header, optional markdown body via `<Markdown>`, compact CSS overrides, handles for edge connections, label-only mode (no content)

### Modified Capabilities

_(none — no existing spec requirements change)_

## Impact

- **New files**: `charts/Diagram/` component folder (`.tsx`, `.types.ts`, `.module.css`, `.stories.tsx`, `index.ts`) plus internal subcomponents (`MarkdownNode`, layout utilities)
- **Modified files**: `charts/index.ts` (add `Diagram` export)
- **Dependencies**: `@xyflow/react`, `@dagrejs/dagre` added to `package.json`
- **Bundle size**: ~45KB gzip (`@xyflow/react` ~35KB + `dagre` ~9KB), tree-shakeable
- **No breaking changes** to existing APIs
