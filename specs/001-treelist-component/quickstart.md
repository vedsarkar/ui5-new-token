# Quickstart: TreeList Component

## Prerequisites
- Node.js LTS
- Package manager (npm or yarn or pnpm)

## Installation
This component is part of the repository under `components/TreeList/`. Import it directly from the package entry or relative path depending on your build setup.

## Usage

```tsx
import { TreeList, TreeNode } from "../../components/TreeList";

type Node = { id: string; label: string; children?: Node[] };

const data: Node[] = [
  { id: "a", label: "Parent A", children: [{ id: "a-1", label: "Child A-1" }] },
  { id: "b", label: "Parent B" },
];

export function Example() {
  return (
    <div style={{ width: 320 }}>
      <TreeList
        data={data}
        getId={(n) => n.id}
        getChildren={(n) => n.children}
        getLabel={(n) => n.label}
        defaultExpandedKeys={["a"]}
        labels={{ rootAriaLabel: "Example Tree" }}
        renderNode={({ node, depth, expanded, toggle }) => (
          <TreeNode
            row={{
              id: node.id,
              node,
              depth,
              isLeaf: !node.children || node.children.length === 0,
              isExpanded: expanded,
            }}
            onToggle={toggle}
            Label={() => <span>{node.label}</span>}
          />
        )}
      />
    </div>
  );
}
``` 

## Props (high-level)
- `data`: `TreeNode[]` — hierarchical data to render.
- `renderNode?`: `(node: TreeNode) => ReactNode` — custom renderer.
- `className?`, `style?`: styling hooks.
- `expandedIds?` / `defaultExpandedIds?`: controlled/uncontrolled expansion state.
- `onToggle?`: `(id: string, expanded: boolean) => void` — expansion callback.
- `onNodeClick?`: `(node: TreeNode) => void` — interaction callback.
- Accessibility: `aria-label` or `aria-labelledby` should be provided on the root.

## Stories
Open Storybook and review `TreeList` stories covering:
- Basic rendering
- Expand/Collapse interactions
- Custom rendering and styles
- Accessibility and keyboard navigation


