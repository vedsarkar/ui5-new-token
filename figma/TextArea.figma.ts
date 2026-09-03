// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=148569-1916
// source=components/TextArea/TextArea.tsx
// component=TextArea
import figma from "figma";

const instance = figma.selectedInstance;

const placeholder = instance.getString("✏️ Placeholder");
const typedText = instance.getString("✏️ Typed Text");
const content = instance.getEnum("Content", {
	Placeholder: "placeholder",
	"Typed Text": "value",
});
// `TextArea` is a Reltio component, not a UI5 re-export, and it uses the
// platform's own ValueState union — Error/Warning/Success where UI5 says
// Negative/Critical/Positive. Mapping to UI5's names here would not typecheck.
const valueState = instance.getEnum("Value State", {
	None: "None",
	Negative: "Error",
	Critical: "Warning",
	Positive: "Success",
	Information: "Information",
});
const state = instance.getEnum("Interaction State", {
	Regular: "regular",
	Hover: "regular",
	Active: "regular",
	Disabled: "disabled",
	"Read Only": "readOnly",
});
const hasMessagePopover = instance.getBoolean("Message Popover");

const value =
	content === "value"
		? figma.code`
	defaultValue="${typedText}"`
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
const valueStateMessage = hasMessagePopover
	? figma.code`
	valueStateMessage={valueStateMessage}`
	: "";

// Omitted: Scroll Bar (the component scrolls when content overflows), Counter
// and its text (no counter prop), and Form Factor.
export default {
	example: figma.code`
<TextArea
	label={label}
	placeholder="${placeholder}"${value}${valueStateProp}${stateProp}${valueStateMessage}
/>`,
	imports: ['import { TextArea } from "@reltio/design/components"'],
	id: "text-area",
	metadata: { nestable: true },
};
