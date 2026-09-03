// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=186218-17136
// source=components/Tree
// component=Tree
import figma from "figma";

const instance = figma.selectedInstance;

// Form Factor is the only Figma property and is content density, set on an
// ancestor. A Tree is defined by its items, so they are resolved instead.
const items = instance.findConnectedInstances(
	(node) => node.codeConnectId() === "tree-item",
);
const first = items[0]?.executeTemplate().example;
const second = items[1]?.executeTemplate().example;

export default {
	example: figma.code`
<Tree onItemToggle={onItemToggle}>${first}${second}
</Tree>`,
	imports: ['import { Tree } from "@reltio/design/components"'],
	id: "tree",
	metadata: { nestable: false },
};
