---
"@reltio/design": minor
---

Add `FileTree`, a connector-drawn tree offered alongside `Tree`

`FileTree` browses a hierarchy where the shape of the hierarchy is part of the
information — a repository, a set of generated artefacts, a document collection.
It draws connector lines between rows and highlights the run from the root down
to the selected row, so a deeply nested selection stays locatable.

```tsx
import { FileTree } from "@reltio/design/components";

<FileTree
	items={[{ id: "src", name: "src", children: [{ id: "index", name: "index.ts" }] }]}
	defaultExpandedIds={["src"]}
	onSelect={(node) => open(node.id)}
/>;
```

It sits **alongside** the endorsed SAP `Tree` rather than replacing it. `Tree`
remains the default for lists that merely happen to nest, where depth is
incidental and its level tinting is enough. Reach for `FileTree` when a reader
needs to trace ancestry. UI5 offers no way to add that to `Tree` — the
connectors are drawn geometry, not something a token or CSS Part can reach — so
this is a new component rather than a restyle.

Notes on the API:

- **Hierarchy is data.** `items` takes a nested `FileTreeNode[]`, not composed
  children, because a connector's shape depends on the row's position in the
  whole tree: whether each ancestor has a later sibling, whether the row is a
  last child, and where the selected row sits. None of that is legible from
  opaque React children.
- **Selection and expansion each work controlled or uncontrolled**, so a router
  or store can drive the tree without the component keeping a competing copy.
- **Icons are supplied, not shipped.** Each node takes an `icon` of any
  `ReactNode`. The design enumerates 23 file-type glyphs, most of them
  third-party marks (React, Docker, GitHub, Go, Python, Terraform); vendoring
  trademarks into a distributed package is a licensing decision rather than a
  styling one, so the component renders whatever it is handed and bundles none.
- **Full ARIA tree pattern** — one tab stop with a roving `tabindex`, arrows to
  move, `ArrowRight`/`ArrowLeft` to expand and collapse before descending or
  ascending, `Home`/`End`, and `Enter`/`Space` to activate. Connector cells are
  hidden from assistive technology since `aria-level` already conveys depth.

No token changes: all seven colours the design binds already existed and
matched.
