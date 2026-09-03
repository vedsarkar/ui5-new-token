// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=154589-905
// source=components/CheckBox
// component=CheckBox
import figma from "figma";

const instance = figma.selectedInstance;

const hasLabel = instance.getBoolean("Label");
const label = instance.getString("✏️ Text");
// The Figma value states are named exactly as UI5's `ValueState`, so this is a
// pass-through rather than a translation.
const valueState = instance.getEnum("Value State", {
	None: "None",
	Information: "Information",
	Positive: "Positive",
	Critical: "Critical",
	Negative: "Negative",
});
const check = instance.getEnum("Check", {
	Unchecked: "unchecked",
	Checked: "checked",
	Tristate: "indeterminate",
});
const state = instance.getEnum("Interaction State", {
	Regular: "regular",
	Hover: "regular",
	Disabled: "disabled",
	"Read Only": "readonly",
	"Display Only": "displayOnly",
});

const text = hasLabel
	? figma.code`
	text="${label}"`
	: "";
const checked =
	check === "checked"
		? figma.code`
	checked`
		: "";
const indeterminate =
	check === "indeterminate"
		? figma.code`
	indeterminate`
		: "";
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

// Form Factor is omitted: content density is set on an ancestor, not per field.
export default {
	example: figma.code`
<CheckBox${text}${checked}${indeterminate}${valueStateProp}${stateProp}
/>`,
	imports: ['import { CheckBox } from "@reltio/design/components"'],
	id: "check-box",
	metadata: { nestable: true },
};
