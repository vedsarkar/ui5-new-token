// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=24070-10588
// source=components/Panel
// component=Panel
import figma from "figma";

const instance = figma.selectedInstance;

const title = instance.getString("✏️ Title");
const collapsed = instance.getEnum("Collapsed", { False: false, True: true });
// Fixed means the panel cannot be collapsed, which is UI5's `fixed`.
const fixed = instance.getEnum("Fixed", { False: false, True: true });
const content = instance.getInstanceSwap("Slot");

const contentCode =
	content && content.type === "INSTANCE"
		? content.executeTemplate().example
		: "";

const collapsedProp = collapsed
	? figma.code`
	collapsed`
	: "";
const fixedProp = fixed
	? figma.code`
	fixed`
	: "";

// The four action booleans are omitted: UI5 has no action slot on Panel, and
// the header is either `headerText` or a custom `header` element.
export default {
	example: figma.code`
<Panel
	headerText="${title}"${collapsedProp}${fixedProp}
>${contentCode}
</Panel>`,
	imports: ['import { Panel } from "@reltio/design/components"'],
	id: "panel",
	metadata: { nestable: false },
};
