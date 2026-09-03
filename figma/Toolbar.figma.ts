// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=183497-6191
// source=components/Toolbar
// component=Toolbar
import figma from "figma";

const instance = figma.selectedInstance;

const hasTitle = instance.getBoolean("Title");
const title = instance.getString("✏️ Title Text");
// Thirteen action booleans vary the toolbar's length. In code the actions are
// children, so they become a count rather than thirteen props.
const actionCount = [
	"1st Action",
	"2nd Action",
	"3rd Action",
	"4th Action",
	"5th Action",
	"6th Action",
	"7th Action",
	"8th Action",
	"9th Action",
	"10th Action",
	"11th Action",
	"12th Action",
	"13th Action",
].filter((name) => instance.getBoolean(name)).length;
const hasSegmentedButton = instance.getBoolean("Segmented Button");

// A title sits left of a spacer that pushes the actions right — that spacer is
// how UI5 expresses the design's layout, not a prop.
const titleParts = hasTitle
	? figma.code`
	<Text>${title}</Text>
	<ToolbarSpacer />`
	: "";
const first =
	actionCount > 0
		? figma.code`
	<ToolbarButton text={text} />`
		: "";
const second =
	actionCount > 1
		? figma.code`
	<ToolbarButton text={text} />`
		: "";
const third =
	actionCount > 2
		? figma.code`
	<ToolbarButton text={text} />`
		: "";
const segmented = hasSegmentedButton
	? figma.code`
	<ToolbarSelect onChange={onChange} />`
	: "";

// Input is omitted: UI5 has no toolbar input element, so a field goes in as
// arbitrary children. Form Factor is content density.
export default {
	example: figma.code`
<Toolbar>${titleParts}${first}${second}${third}${segmented}
</Toolbar>`,
	imports: [
		'import { Toolbar, ToolbarButton, ToolbarSelect, ToolbarSpacer, Text } from "@reltio/design/components"',
	],
	id: "toolbar",
	metadata: { nestable: false },
};
