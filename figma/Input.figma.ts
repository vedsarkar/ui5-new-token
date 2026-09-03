// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=148569-1004
// source=components/Input
// component=Input
import figma from "figma";

const instance = figma.selectedInstance;

const placeholder = instance.getString("✏️ Placeholder");
const typedText = instance.getString("✏️ Typed Text");
const content = instance.getEnum("Content", {
	Placeholder: "placeholder",
	"Typed Text": "value",
});
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
	"Read Only": "readonly",
	Disabled: "disabled",
});
const hasTrailingAction = instance.getBoolean("Trailing Action");
const hasMessagePopover = instance.getBoolean("Message Popover");

const value =
	content === "value"
		? figma.code`
	value="${typedText}"`
		: "";
const placeholderProp = figma.code`
	placeholder="${placeholder}"`;
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
const icon = hasTrailingAction
	? figma.code`
	icon={icon}`
	: "";
const valueStateMessage = hasMessagePopover
	? figma.code`
	valueStateMessage={valueStateMessage}`
	: "";

// Omitted: Form Factor (density is set on an ancestor), the 2nd Action (UI5
// exposes a single `icon` slot), and Description Text (no counterpart on
// `Input`; it belongs to the surrounding `FormItem`).
export default {
	example: figma.code`
<Input${placeholderProp}${value}${valueStateProp}${stateProp}${icon}${valueStateMessage}
/>`,
	imports: ['import { Input } from "@reltio/design/components"'],
	id: "input",
	metadata: { nestable: true },
};
