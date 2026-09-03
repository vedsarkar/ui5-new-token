// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=25963-5151
// source=components/SideNavigation
// component=SideNavigation
import figma from "figma";

const instance = figma.selectedInstance;

// Floating is the overlay the ShellBar drawer renders, not a SideNavigation
// prop — the wrapper owns that. Only Collapsed maps.
const collapsed = instance.getEnum("Type", {
	Collapsed: true,
	Expanded: false,
	Floating: false,
});

const items = instance.findConnectedInstances(
	(node) => node.codeConnectId() === "side-navigation-item",
);
const first = items[0]?.executeTemplate().example;
const second = items[1]?.executeTemplate().example;
const third = items[2]?.executeTemplate().example;

const collapsedProp = collapsed
	? figma.code`
	collapsed`
	: "";

// Scrollbar and Arrow are omitted: UI5 shows both itself when the content
// needs them. Form Factor is content density.
export default {
	example: figma.code`
<SideNavigation
	onSelectionChange={onSelectionChange}${collapsedProp}
>${first}${second}${third}
</SideNavigation>`,
	imports: ['import { SideNavigation } from "@reltio/design/components"'],
	id: "side-navigation",
	metadata: { nestable: false },
};
