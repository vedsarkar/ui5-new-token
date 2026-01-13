# TreeList Component Design

## Context

The TreeList component is a fundamental UI element for displaying hierarchical data structures. It is commonly used for navigation menus, file explorers, data model viewers, and organizational charts within the Reltio Design System.

**Key Constraints:**
- Must follow Reltio Design System constitution principles (non-negotiable)
- Must support deep nesting (unlimited depth levels)
- Must support both controlled and uncontrolled expansion states
- Must allow custom label rendering for flexibility
- Must work in modern evergreen browsers only (no IE11)

**Stakeholders:**
- Design system developers (primary maintainers)
- Product developers (consumers of the component)
- End users (usability and readability of hierarchical data)
- Design team (visual consistency)

## Goals / Non-Goals

**Goals:**
- Create a flexible tree component that covers common hierarchical display use cases
- Enable external customization via CSS custom properties and LabelComponent
- Maintain visual tree lines that clearly show parent-child relationships
- Support both controlled and uncontrolled expansion modes
- Provide comprehensive Storybook documentation

**Non-Goals:**
- Built-in selection/checkbox functionality (compose with custom LabelComponent)
- Drag-and-drop reordering (separate capability if needed)
- Built-in search/filter functionality (filter data externally)
- Virtual scrolling for very large trees (can be added later if needed)
- Built-in context menu functionality (compose with custom LabelComponent)

## Decisions

### Decision: Use rc-tree as Underlying Library

**Choice:** Use rc-tree library for core tree rendering and expand/collapse logic.

**Rationale:**
- Battle-tested library from Ant Design ecosystem
- Handles complex tree traversal and state management
- Supports custom title rendering via titleRender prop
- Reduces implementation complexity and maintenance burden
- Well-documented and actively maintained

**Alternatives Considered:**
1. **Build tree from scratch:**
   - ❌ More development time
   - ❌ More bugs to fix
   - ❌ Reinventing the wheel
   - ✅ Full control over implementation

2. **Use react-arborist or similar:**
   - ❌ Larger bundle size
   - ❌ More opinionated about styling
   - ✅ More features out of the box

**Decision:** rc-tree provides the right balance of functionality and customizability while minimizing bundle size.

### Decision: CSS Modules + CSS Custom Properties

**Choice:** Use CSS Modules for scoped styles, with all design tokens exposed as CSS custom properties on the `.root` class.

**Rationale:**
- Constitution requirement (Principles IV & IX)
- CSS Modules prevent style conflicts
- CSS custom properties enable external customization
- Consumers can customize without !important or deep selectors
- Variables cascade to nested components (TreeNode, TreeLevelLines)

**Implementation:**
```css
.root {
  --reltio-tree-list-font-family: inherit;
  --reltio-tree-list-indent-size: 16px;
  /* ... all other tokens ... */
}
```

### Decision: Controlled vs Uncontrolled Expansion

**Choice:** Support both controlled (expandedKeys prop) and uncontrolled (internal state) modes.

**Rationale:**
- Uncontrolled mode is simpler for basic use cases
- Controlled mode enables external state management (Redux, URL sync, etc.)
- Pattern is familiar from HTML form elements
- Minimal API overhead

**Implementation:**
```tsx
const isControlled = expandedKeysProp !== undefined;
const [expandedKeys, setExpandedKeys] = useState<Set<TreeKey>>(() =>
  isControlled ? new Set() : new Set(topLevelKeys)
);
```

### Decision: Visual Tree Lines via Absolute Positioning

**Choice:** Render tree lines using absolutely positioned pseudo-elements within each row.

**Rationale:**
- Lines need to span across rows vertically
- Absolute positioning allows lines to extend beyond row boundaries
- Each node knows its depth and "last child" status
- Simple to calculate which lines to show using levelLines array

**Implementation:**
- Each node receives a `levelLines: boolean[]` array
- Array indicates whether to draw vertical line at each ancestor level
- `isLast` flag indicates if node is last child (truncates vertical line)

**Alternatives Considered:**
1. **SVG overlay for entire tree:**
   - ❌ Complex to sync with DOM nodes
   - ❌ Performance issues on large trees
   - ✅ More precise line rendering

2. **CSS Grid for structure:**
   - ❌ Harder to handle dynamic depth
   - ❌ Complex CSS for variable nesting
   - ✅ Better semantic structure

### Decision: LabelComponent for Custom Rendering

**Choice:** Accept a React component via `LabelComponent` prop for custom label rendering.

**Rationale:**
- Maximum flexibility for consumers
- Can render any content (icons, badges, buttons, etc.)
- Component receives full node data
- Default rendering when not provided

**Implementation:**
```tsx
{LabelComponent ? <LabelComponent data={node} /> : node.label}
```

**Alternatives Considered:**
1. **Render function (renderLabel):**
   - ✅ Slightly simpler API
   - ❌ Can't use hooks inside render function
   - ❌ Less clear that it's a component

2. **Slots pattern:**
   - ❌ More complex API
   - ❌ Less familiar pattern in React
   - ✅ More explicit about placement

### Decision: React.memo for Performance

**Choice:** Wrap TreeList, TreeNode, and TreeLevelLines with React.memo.

**Rationale:**
- Trees can have many nodes
- Expanding/collapsing only affects subset of nodes
- Memoization prevents unnecessary re-renders
- useCallback for stable handler references

**Implementation:**
```tsx
export const TreeList = memo(({ data, ... }: TreeListProps) => { ... });
export const TreeNode = memo(({ id, node, ... }: TreeNodeProps) => { ... });
```

### Decision: ChevronIcon with CSS Transform

**Choice:** Use SVG chevron icon that rotates via CSS transform for expand/collapse state.

**Rationale:**
- Smooth animation with CSS transition
- No need to swap between two different icons
- SVG scales well at any size
- Uses currentColor for easy theming

**Implementation:**
```tsx
<svg style={{ transform: expanded ? "rotate(0deg)" : "rotate(-90deg)" }}>
  <polygon points="6,9 18,9 12,16" fill="currentColor" />
</svg>
```

### Decision: Internal Subcomponents Not Exported

**Choice:** TreeNode, TreeLevelLines, and ChevronIcon are internal components, not exported from index.ts.

**Rationale:**
- Implementation details may change
- Keeps public API minimal and stable
- Consumers should compose with LabelComponent, not extend internals
- Reduces API surface for maintenance

## Risks / Trade-offs

### Risk: rc-tree Dependency

**Risk:** Dependency on external library for core functionality.

**Mitigation:**
- rc-tree is well-maintained (Ant Design ecosystem)
- Minimal API surface used (just Tree with titleRender)
- Can be replaced if needed with minimal API changes
- Library is tree-shakeable for bundle size

**Trade-off:** External dependency vs. reduced implementation time.

### Risk: Deep Tree Performance

**Risk:** Very deep trees may have performance issues.

**Mitigation:**
- React.memo prevents unnecessary re-renders
- useMemo for expensive calculations (levelLinesMap)
- Virtual scrolling can be added later via rc-tree's virtual prop
- Documented that virtual=false by default

**Trade-off:** Simplicity vs. performance on extreme cases.

### Risk: CSS Custom Properties Cascade

**Risk:** Variables need to cascade to deeply nested subcomponents.

**Mitigation:**
- All variables defined on .root
- Subcomponents reference variables directly (no redefinition)
- CSS custom properties naturally cascade to children

**Trade-off:** Requires consistent variable naming and usage.

## Migration Plan

**N/A** - This is a post-factum specification for an existing TreeList component. No migration is needed as the component is already implemented and follows all constitution principles.

## Open Questions

None - all design decisions have been resolved and implemented.
