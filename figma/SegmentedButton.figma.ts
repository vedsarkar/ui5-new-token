// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=91702-11986
// source=components/SegmentedButton
// component=SegmentedButton
import figma from "figma";

const instance = figma.selectedInstance;

// Figma varies the button count with three booleans on top of the two that
// are always present. In code these are children, so they collapse to a count.
const count =
	2 +
	["3rd Button", "4th Button", "5th Button"].filter((name) =>
		instance.getBoolean(name),
	).length;
const iconOnly = instance.getEnum("Type", { Text: false, Icon: true });

const item = iconOnly
	? figma.code`
	<SegmentedButtonItem icon={icon} />`
	: figma.code`
	<SegmentedButtonItem>{label}</SegmentedButtonItem>`;
const third = count > 2 ? item : "";
const fourth = count > 3 ? item : "";
const fifth = count > 4 ? item : "";

// Form Factor is content density, set on an ancestor.
export default {
	example: figma.code`
<SegmentedButton onSelectionChange={onSelectionChange}>${item}${item}${third}${fourth}${fifth}
</SegmentedButton>`,
	imports: [
		'import { SegmentedButton, SegmentedButtonItem } from "@reltio/design/components"',
	],
	id: "segmented-button",
	metadata: { nestable: false },
};
