// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=148569-1727
// source=components/StepInput
// component=StepInput
import figma from "figma";

const instance = figma.selectedInstance;

const value = instance.getString("✏️ Value");
const valueState = instance.getEnum("Value State", {
	None: "None",
	Negative: "Negative",
	Critical: "Critical",
	Positive: "Positive",
	Information: "Information",
});
const state = instance.getEnum("Interaction State", {
	Regular: "regular",
	Hover: "regular",
	Active: "regular",
	Disabled: "disabled",
	"Read Only": "readonly",
});
const hasMessagePopover = instance.getBoolean("Message Popover");

const valueStateProp =
	valueState === "None"
		? ""
		: figma.code`
	valueState="${valueState}"`;
const stateProp =
	state === "regular"
		? ""
		: figma.code`
	${state}`;
const valueStateMessage = hasMessagePopover
	? figma.code`
	valueStateMessage={valueStateMessage}`
	: "";

// Form Factor is content density, set on an ancestor.
export default {
	example: figma.code`
<StepInput
	value={${value}}
	onChange={onChange}${valueStateProp}${stateProp}${valueStateMessage}
/>`,
	imports: ['import { StepInput } from "@reltio/design/components"'],
	id: "step-input",
	metadata: { nestable: true },
};
