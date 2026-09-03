// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=307148-4032
// source=components/Menu
// component=Menu
import figma from "figma";

const instance = figma.selectedInstance;

// Form Factor is the only Figma property and is content density, set on an
// ancestor. A Menu is defined by its items, so they are resolved instead.
const items = instance.findConnectedInstances(
	(node) => node.codeConnectId() === "menu-item",
);
const first = items[0]?.executeTemplate().example;
const second = items[1]?.executeTemplate().example;
const third = items[2]?.executeTemplate().example;

export default {
	example: figma.code`
<Menu open={open} opener={opener} onClose={onClose}>${first}${second}${third}
</Menu>`,
	imports: ['import { Menu } from "@reltio/design/components"'],
	id: "menu",
	metadata: { nestable: false },
};
