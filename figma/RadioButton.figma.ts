// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=154597-1967
// source=components/RadioButton
// component=RadioButton
import figma from "figma";

const instance = figma.selectedInstance;

const hasLabel = instance.getBoolean("Label");
const label = instance.getString("✏️ Text");
const selected = instance.getEnum("Selected", { False: false, True: true });
const valueState = instance.getEnum("Value State", {
	None: "None",
	Information: "Information",
	Positive: "Positive",
	Critical: "Critical",
	Negative: "Negative",
});
const state = instance.getEnum("Interaction State", {
	Regular: "regular",
	Hover: "regular",
	Disabled: "disabled",
	"Read Only": "readonly",
});

const text = hasLabel
	? figma.code`
	text="${label}"`
	: "";
const checked = selected
	? figma.code`
	checked`
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

// `name` is emitted because radios only behave as a group when they share one,
// and Figma has no property for it — the developer supplies the group name.
export default {
	example: figma.code`
<RadioButton
	name={name}${text}${checked}${valueStateProp}${stateProp}
/>`,
	imports: ['import { RadioButton } from "@reltio/design/components"'],
	id: "radio-button",
	metadata: { nestable: true },
};
