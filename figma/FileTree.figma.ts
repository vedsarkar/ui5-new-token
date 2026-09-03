// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=27834-70178
// source=components/FileTree/FileTree.tsx
// component=FileTree
import figma from "figma";

const instance = figma.selectedInstance;

// The rows arrive through a real Figma SLOT, but they are data rather than
// children in code, so they interpolate into the `items` array instead of
// between the tags. Each resolves through the FileTreeItem template, which
// emits a `FileTreeNode` object.
const rows = instance.getSlot("File Tree Items");

export default {
	example: figma.code`
<FileTree
	items={[${rows}
	]}
	defaultExpandedIds={defaultExpandedIds}
	onSelect={onSelect}
/>`,
	imports: ['import { FileTree } from "@reltio/design/components"'],
	id: "file-tree",
	metadata: { nestable: false },
};
