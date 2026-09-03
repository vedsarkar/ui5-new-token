// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=27834-70293
// source=components/FileTree/FileTree.types.ts
// component=FileTree
import figma from "figma";

const instance = figma.selectedInstance;

// There is no row *component* to map to: `FileTree` takes its hierarchy as
// data, because a connector's shape depends on the row's position in the whole
// tree. So a Figma row maps to a `FileTreeNode` — the object that produces it.
const label = instance.findText("Name");
const hasIcon = instance.getBoolean("Show Icon");
const expandable = instance.getEnum("Level", {
	Root: true,
	"Level 1": true,
	"Level 2": true,
	"Level 3": false,
});

const name = label && label.type === "TEXT" ? label.textContent : "";
const icon = hasIcon
	? figma.code`
	icon: <Icon name={icon} />,`
	: "";
const children = expandable
	? figma.code`
	children: [],`
	: "";

// Selected is not on the node: the tree owns selection through `selectedId`,
// so a selected row is a property of the tree, not of this object.
//
// Omitted: Show Expand and Show Actions (the component draws no chevron and
// has no row-action slot), Show File Type and Tile Types (the icon is whatever
// node the consumer supplies), and the End slot.
export default {
	example: figma.code`
{
	id: "${name}",
	name: "${name}",${icon}${children}
}`,
	imports: ['import { Icon } from "@reltio/design/components"'],
	id: "file-tree-item",
	metadata: { nestable: true },
};
