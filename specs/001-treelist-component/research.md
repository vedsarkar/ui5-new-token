# Research: TreeList Component

## Rendering and Data Structure

- Decision: Represent hierarchical data as `TreeNode` with recursive `children`, render via flattened list for efficient updates.
- Rationale: Flattened traversal enables O(n) walk with stable keys and memoization; simplifies expand/collapse visibility logic.
- Alternatives considered: Direct recursive render (simpler but can re-render deeply); explicit adjacency maps (adds complexity without clear benefit for UI-only).

## Expand/Collapse State Model

- Decision: Maintain expansion state as `Map<string, boolean>` (or object map) keyed by node id; support controlled and uncontrolled modes.
- Rationale: Map lookups are O(1), easily serializable, and preserve state across updates; controlled mode enables external state management.
- Alternatives considered: Store state in nodes (mutates input, conflates data and UI); index-based tracking (breaks on reordering).

## Accessibility (A11y) Patterns

- Decision: Use WAI-ARIA roles: `role="tree"`, `role="treeitem"`, groups via `role="group"`. Implement keyboard navigation: ArrowUp/Down, ArrowLeft/Right (collapse/expand), Home/End, Enter/Space.
- Rationale: Aligns with ARIA Authoring Practices for trees; ensures screen reader compatibility and keyboard usability (FR-009, FR-010).
- Alternatives considered: Generic list semantics (insufficient for hierarchical relationships); custom shortcuts only (non-standard).

## Customization API

- Decision: Provide `renderNode` callback for custom content, `getNodeProps` for props/className overrides, and event handlers (e.g., `onNodeClick`).
- Rationale: Separates rendering concerns from core behavior; maximizes reuse across design systems without forking.
- Alternatives considered: Slot-based components (heavier API); theme-only styling (insufficient for behavior changes).

## Performance Strategy

- Decision: Memoize derived flatten output and visible rows; use `React.memo` on row items; batch state updates. Consider optional virtualization for very large datasets as a future enhancement.
- Rationale: Targets spec goals (1k nodes < 2s render; smooth up to 5k). Virtualization adds complexity; keep as optional follow-up.
- Alternatives considered: Always-on virtualization (overhead for small trees); no memoization (unnecessary re-renders).

## Dynamic Updates

- Decision: Recompute flatten on data changes while preserving expansion map; remove expansion entries for removed nodes lazily.
- Rationale: Maintains user context; prevents stale expansion state from causing errors.
- Alternatives considered: Reset all expansion on updates (poor UX); deep diffing (costly and unnecessary).

## Error Handling for Custom Renderers

- Decision: Guard `renderNode` with try/catch boundary at node level and fail gracefully to default rendering when exceptions occur; optionally surface `onRenderError`.
- Rationale: Prevents entire tree from breaking due to a single node’s customization.
- Alternatives considered: Global error boundary only (worse isolation); no guarding (risk of broken UI).

## Edge Cases

- Decision: Handle empty data (render nothing with placeholder aria), detect circular references (visited set), warn on missing/null ids, cap recursion depth with safe guardrails.
- Rationale: Improves robustness across documented edge cases.
- Alternatives considered: Assume well-formed input (fragile).




