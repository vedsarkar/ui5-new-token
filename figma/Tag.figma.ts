// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=159886-3878
// source=components/Tag
// component=Tag
import figma from "figma";

const instance = figma.selectedInstance;

// Figma splits what UI5 keeps in one prop: Value State picks the semantic
// design, and Color picks an indication number. The `b` colours are the second
// palette, which UI5 exposes as Set2 against Set1 for the plain numbers.
const valueState = instance.getEnum("Value State", {
	Information: "Information",
	Positive: "Positive",
	Critical: "Critical",
	Negative: "Negative",
	None: "Neutral",
	"Indication Colors": "indication",
});
const color = instance.getEnum("Color", {
	None: "",
	Semantic: "",
	"Indication 1": "1",
	"Indication 2": "2",
	"Indication 3": "3",
	"Indication 4": "4",
	"Indication 5": "5",
	"Indication 6": "6",
	"Indication 7": "7",
	"Indication 8": "8",
	"Indication 9": "9",
	"Indication 10": "10",
	"Indication 1b": "1",
	"Indication 2b": "2",
	"Indication 3b": "3",
	"Indication 4b": "4",
	"Indication 5b": "5",
	"Indication 6b": "6",
	"Indication 7b": "7",
	"Indication 8b": "8",
	"Indication 9b": "9",
	"Indication 10b": "10",
});
const palette = instance.getEnum("Color", {
	None: "Set1",
	Semantic: "Set1",
	"Indication 1": "Set1",
	"Indication 2": "Set1",
	"Indication 3": "Set1",
	"Indication 4": "Set1",
	"Indication 5": "Set1",
	"Indication 6": "Set1",
	"Indication 7": "Set1",
	"Indication 8": "Set1",
	"Indication 9": "Set1",
	"Indication 10": "Set1",
	"Indication 1b": "Set2",
	"Indication 2b": "Set2",
	"Indication 3b": "Set2",
	"Indication 4b": "Set2",
	"Indication 5b": "Set2",
	"Indication 6b": "Set2",
	"Indication 7b": "Set2",
	"Indication 8b": "Set2",
	"Indication 9b": "Set2",
	"Indication 10b": "Set2",
});
const size = instance.getEnum("Large Design", { No: "S", Yes: "L" });
const hasIcon = instance.getBoolean("Left Icon");
const label = instance.findText("Text");

const design = valueState === "indication" ? palette : valueState;
const colorScheme =
	valueState === "indication" && color
		? figma.code`
	colorScheme="${color}"`
		: "";
const sizeProp =
	size === "S"
		? ""
		: figma.code`
	size="${size}"`;
const icon = hasIcon
	? figma.code`
	icon={icon}`
	: "";

// Icon Only is omitted: UI5 expresses it by rendering no children, which the
// snippet already shows when the Figma text layer is absent.
export default {
	example: figma.code`
<Tag
	design="${design}"${colorScheme}${sizeProp}${icon}
>
	${label && label.type === "TEXT" ? label.textContent : ""}
</Tag>`,
	imports: ['import { Tag } from "@reltio/design/components"'],
	id: "tag",
	metadata: { nestable: true },
};
