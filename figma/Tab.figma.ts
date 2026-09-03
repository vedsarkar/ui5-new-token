// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=24850-10550
// source=components/Tab
// component=Tab
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Text");
const additionalText = instance.getString("✏️ Additional Text");
// UI5 calls the semantic colour `design`, using SemanticColor rather than the
// ValueState names the rest of the library uses.
const design = instance.getEnum("Value State", {
	"Non Semantic": "Default",
	None: "Neutral",
	Positive: "Positive",
	Critical: "Critical",
	Negative: "Negative",
});
const selected = instance.getEnum("Interaction State", {
	"Regular Active": true,
	"Regular Inactive": false,
	"Hover on Arrow (Active)": true,
	"Hover (Inactive)": false,
	"Hover on Text (Inactive)": false,
	"Hover on Arrow (Inactive)": false,
});
const hasIcon = instance.getBoolean("Item Count");
const iconOnly = instance.getEnum("Type", {
	Inline: false,
	"Icon Only": true,
	"Shell Navigation": false,
	"Process and Filter": false,
	"Filter Total": false,
});

const designProp =
	design === "Default"
		? ""
		: figma.code`
	design="${design}"`;
const selectedProp = selected
	? figma.code`
	selected`
	: "";
const additional = hasIcon
	? figma.code`
	additionalText="${additionalText}"`
	: "";
const icon = iconOnly
	? figma.code`
	icon={icon}`
	: "";

// Omitted: Badge, Menu Arrow, Separator and Arrow (UI5 renders the overflow
// and nesting affordances itself), and Form Factor.
export default {
	example: figma.code`
<Tab
	text="${iconOnly ? "" : label}"${icon}${additional}${designProp}${selectedProp}
/>`,
	imports: ['import { Tab } from "@reltio/design/components"'],
	id: "tab",
	metadata: { nestable: true },
};
