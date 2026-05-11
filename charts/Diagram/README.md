# Diagram

`Diagram` renders a **node-edge diagram with auto-layout** — best suited for hierarchical or pipeline-shaped graphs (DAG, workflow, lineage, decision tree). Built on top of [`@xyflow/react`](https://reactflow.dev/) for the canvas + [`dagre`](https://github.com/dagrejs/dagre) for the layout algorithm. For general / cyclic topologies prefer `GraphChart` (force-directed).

### Data shape

- `nodes` — `{ id, type?, label?, icon?, content?, data? }`. `id` is the edge reference key. `content` is **Markdown** rendered inside the node body via Reltio's `Markdown` component, so you can embed code blocks, tables, links, etc. directly. `icon` is a leading emoji or text glyph in the header.
- `edges` — `{ source, target, label? }`. `source` / `target` reference node `id`.

### Built-in node type: `markdown`

By default every node is rendered with the bundled `markdown` node type — a styled card with header (`icon` + `label`) and Markdown body (`content`). If you need a different visual for some nodes, set `type: "yourType"` on the node and pass `nodeTypes={{ yourType: YourNodeComponent }}`. Built-in `markdown` is preserved unless you explicitly override it.

### Layout direction

`layout`:

- `"top-to-bottom"` (default) — parents above children. Natural for workflows, decision trees, mostly-linear pipelines.
- `"left-to-right"` — parents to the left. Better for wide hierarchies that would otherwise overflow vertically.

The dagre algorithm computes node positions deterministically based on the edge graph; the wrapper does not expose dagre-specific tuning props. If you need different spacing or ranking, fork the layout hook (`useAutoLayout`) rather than escape-hatching from the call site.

### Empty state

If `nodes` is empty or undefined, the diagram renders a "No data" overlay over the empty canvas — same convention as the chart family.

### See also

- [`@xyflow/react`](https://reactflow.dev/) — the underlying React Flow canvas (interactivity, controls, mini-map are inherited)
- [`dagre`](https://github.com/dagrejs/dagre) — the layout algorithm used by `useAutoLayout`
