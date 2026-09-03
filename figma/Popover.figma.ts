// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=153790-2065
// source=components/Popover
// component=Popover
import figma from "figma";

const instance = figma.selectedInstance;

const hasHeader = instance.getBoolean("Header");
const hasFooter = instance.getBoolean("Footer");
const arrow = instance.getEnum("Arrow", { False: false, True: true });
const resizable = instance.getBoolean("Resize Handle");
// Figma names thirteen arrow anchors; UI5 has four placements, and the arrow
// sits on the side facing the opener. Each anchor collapses to its side, and
// None leaves the placement to UI5's default.
const placement = instance.getEnum("Arrow Position", {
	None: "",
	"↖ Top Left": "Top",
	"↑ Top Center": "Top",
	"↗ Top Right": "Top",
	"↗ Right Top": "End",
	"→ Right Center": "End",
	"↘ Right Bottom": "End",
	"↘ Bottom Right": "Bottom",
	"↓ Bottom Center": "Bottom",
	"↙ Bottom Left": "Bottom",
	"↙ Left Bottom": "Start",
	"← Left Center": "Start",
	"↖ Left Top": "Start",
});
const content = instance.getInstanceSwap("Slot");

const contentCode =
	content && content.type === "INSTANCE"
		? content.executeTemplate().example
		: "";

const placementProp = placement
	? figma.code`
	placement="${placement}"`
	: "";
const hideArrow = arrow
	? ""
	: figma.code`
	hideArrow`;
const header = hasHeader
	? figma.code`
	header={header}`
	: "";
const footer = hasFooter
	? figma.code`
	footer={footer}`
	: "";
const resizableProp = resizable
	? figma.code`
	resizable`
	: "";

// Resize Handle Position is omitted: UI5 places the handle itself.
export default {
	example: figma.code`
<Popover
	open={open}
	opener={opener}${placementProp}${hideArrow}${header}${footer}${resizableProp}
>${contentCode}
</Popover>`,
	imports: ['import { Popover } from "@reltio/design/components"'],
	id: "popover",
	metadata: { nestable: false },
};
