// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=24087-10369
// source=components/Switch
// component=Switch
import figma from "figma";

const instance = figma.selectedInstance;

// Figma's Semantic switch is the accept/reject one, which UI5 calls Graphical
// — the repo's own story for that design is named `AcceptReject`.
const design = instance.getEnum("Type", {
	"Non-Semantic": "Textual",
	Semantic: "Graphical",
});
const checked = instance.getEnum("Checked", { True: true, False: false });
const disabled = instance.getEnum("Interaction State", {
	Regular: false,
	Hover: false,
	Disabled: true,
});

const designProp =
	design === "Textual"
		? ""
		: figma.code`
	design="${design}"`;
const checkedProp = checked
	? figma.code`
	checked`
	: "";
const disabledProp = disabled
	? figma.code`
	disabled`
	: "";

// Form Factor is omitted: content density is set on an ancestor.
export default {
	example: figma.code`
<Switch
	accessibleName={accessibleName}${designProp}${checkedProp}${disabledProp}
/>`,
	imports: ['import { Switch } from "@reltio/design/components"'],
	id: "switch",
	metadata: { nestable: true },
};
