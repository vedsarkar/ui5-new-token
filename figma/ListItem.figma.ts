// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=155542-3387
// source=components/ListItem
// component=ListItem
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Text");
const byline = instance.getString("Byline");
const counter = instance.getString("Counter Value");
// Only three of the six Figma types are list *items*. List Header, Footer and
// Growing List Item are `List` props (`headerText`, `footerText`,
// `growingButtonText`), not rows, and Group Header is `ListItemGroup`.
const kind = instance.getEnum("Type", {
	"Single Line": "item",
	Byline: "byline",
	"Group Header": "group",
	"List Header": "listProp",
	Footer: "listProp",
	"Growing List Item": "listProp",
});
const selected = instance.getEnum("Selected", { True: true, False: false });
const hasLeadingIcon = instance.getBoolean("Leading Icon");
const hasTrailingIcon = instance.getBoolean("Trailing Icon");
const hasCounter = instance.getBoolean("Item Counter");
const navigation = instance.getBoolean("Navigation Indicator");

const description =
	kind === "byline"
		? figma.code`
	description="${byline}"`
		: "";
const icon = hasLeadingIcon
	? figma.code`
	icon={icon}`
	: "";
const iconEnd = hasTrailingIcon
	? figma.code`
	iconEnd={iconEnd}`
	: "";
const additionalText = hasCounter
	? figma.code`
	additionalText="${counter}"`
	: "";
const type = navigation
	? figma.code`
	type="Navigation"`
	: "";
const selectedProp = selected
	? figma.code`
	selected`
	: "";

// Omitted: Separator (a `List` concern — `separators`), Selector (driven by
// the list's `selectionMode`), Form Factor, the two action buttons, Thumbnail,
// Attachment and Object Status (no counterpart on `ListItem`).
export default {
	example:
		kind === "group"
			? figma.code`
<ListItemGroup headerText="${instance.getString("Group Name")}" />`
			: figma.code`
<ListItem${description}${icon}${iconEnd}${additionalText}${type}${selectedProp}
>
	${label}
</ListItem>`,
	imports: ['import { ListItem } from "@reltio/design/components"'],
	id: "list-item",
	metadata: { nestable: true },
};
