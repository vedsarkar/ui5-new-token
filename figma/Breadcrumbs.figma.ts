// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=153806-1972
// source=components/Breadcrumbs
// component=Breadcrumbs
import figma from "figma";

const instance = figma.selectedInstance;

const currentItem = instance.getString("✏️ Current Item");
// The seven child booleans are how Figma varies the trail length. In code the
// trail is children, so they collapse to a count rather than seven props.
const shown = [
	"1st Child Item",
	"2nd Child item",
	"3rd Child Item",
	"4th Child Item",
	"5th Child Item",
	"6th Child Item",
	"7th Child Item",
].filter((name) => instance.getBoolean(name)).length;

const first =
	shown > 0
		? figma.code`
	<BreadcrumbsItem>{label}</BreadcrumbsItem>`
		: "";
const second =
	shown > 1
		? figma.code`
	<BreadcrumbsItem>{label}</BreadcrumbsItem>`
		: "";
const third =
	shown > 2
		? figma.code`
	<BreadcrumbsItem>{label}</BreadcrumbsItem>`
		: "";

// Overflow and Popover are omitted: UI5 collapses the trail itself when it
// runs out of room, with no prop to force it.
export default {
	example: figma.code`
<Breadcrumbs onItemClick={onItemClick}>${first}${second}${third}
	<BreadcrumbsItem>${currentItem}</BreadcrumbsItem>
</Breadcrumbs>`,
	imports: [
		'import { Breadcrumbs, BreadcrumbsItem } from "@reltio/design/components"',
	],
	id: "breadcrumbs",
	metadata: { nestable: false },
};
