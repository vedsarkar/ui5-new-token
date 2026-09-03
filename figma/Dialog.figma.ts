// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=1101-2510
// source=components/Dialog
// component=Dialog
import figma from "figma";

const instance = figma.selectedInstance;

const resizable = instance.getBoolean("Resize Handle");
const content = instance.getInstanceSwap("Slot");

const contentCode =
	content && content.type === "INSTANCE"
		? content.executeTemplate().example
		: "";

const resizableProp = resizable
	? figma.code`
	resizable`
	: "";

// Scrollable Content is omitted: UI5 scrolls the content area when it
// overflows, with no prop to opt in. Form Factor is content density, set on an
// ancestor.
export default {
	example: figma.code`
<Dialog
	open={open}
	headerText={headerText}
	footer={footer}
	onClose={onClose}${resizableProp}
>${contentCode}
</Dialog>`,
	imports: ['import { Dialog } from "@reltio/design/components"'],
	id: "dialog",
	metadata: { nestable: false },
};
