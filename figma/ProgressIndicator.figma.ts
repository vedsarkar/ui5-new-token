// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=578-5151
// source=components/ProgressIndicator
// component=ProgressIndicator
import figma from "figma";

const instance = figma.selectedInstance;

const valueState = instance.getEnum("Value State", {
	None: "None",
	Information: "Information",
	Positive: "Positive",
	Critical: "Critical",
	Negative: "Negative",
});
const hasText = instance.getBoolean("Text");
const displayValue = instance.getString("✏️ Text Value");

const valueStateProp =
	valueState === "None"
		? ""
		: figma.code`
	valueState="${valueState}"`;
// UI5 shows the value by default, so the Figma boolean maps to hiding it and
// to the override text when one is given.
const display = hasText
	? figma.code`
	displayValue="${displayValue}"`
	: figma.code`
	hideValue`;

// Interaction State is omitted: UI5's ProgressIndicator has no disabled prop.
export default {
	example: figma.code`
<ProgressIndicator
	value={value}${valueStateProp}${display}
/>`,
	imports: ['import { ProgressIndicator } from "@reltio/design/components"'],
	id: "progress-indicator",
	metadata: { nestable: true },
};
