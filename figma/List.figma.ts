// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=155542-3875
// source=components/List
// component=List
import figma from "figma";

const instance = figma.selectedInstance;

// The Figma List carries only Form Factor, which is content density and set on
// an ancestor rather than per list. Everything a List renders comes from its
// rows, so the template resolves them instead of inventing props.
const rows = instance.findConnectedInstances(
	(node) => node.codeConnectId() === "list-item",
);
const first = rows[0]?.executeTemplate().example;
const second = rows[1]?.executeTemplate().example;
const third = rows[2]?.executeTemplate().example;

export default {
	example: figma.code`
<List>${first}${second}${third}
</List>`,
	imports: ['import { List } from "@reltio/design/components"'],
	id: "list",
	metadata: { nestable: false },
};
