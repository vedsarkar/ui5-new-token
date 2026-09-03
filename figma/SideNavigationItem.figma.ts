// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=25963-4820
// source=components/SideNavigationItem
// component=SideNavigationItem
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Text");
// The four Figma types are three different elements in code: a group, a
// top-level item, and a nested sub-item. Quick Create is an app affordance
// with no counterpart, so it falls back to a plain item.
const kind = instance.getEnum("Type", {
	"Navigation Item": "item",
	"Child Item": "subItem",
	"Navigation Group": "group",
	"Quick Create": "item",
});
const selected = instance.getEnum("Selected", { True: true, False: false });
const expanded = instance.getEnum("Expanded", { True: true, False: false });
const disabled = instance.getEnum("Interaction State", {
	Regular: false,
	Hover: false,
	Active: false,
	Disabled: true,
	"Pressed Hover": false,
	"Pressed Active": false,
});
const hasIcon = instance.getBoolean("Left Icon");
const externalLink = instance.getBoolean("External Link");

const icon = hasIcon
	? figma.code`
	icon={icon}`
	: "";
const selectedProp = selected
	? figma.code`
	selected`
	: "";
const expandedProp = expanded
	? figma.code`
	expanded`
	: "";
const disabledProp = disabled
	? figma.code`
	disabled`
	: "";
// UI5 has no "external" flag — an external destination is an href with a
// target, which is what the design's indicator is signalling.
const external = externalLink
	? figma.code`
	href={href}
	target="_blank"`
	: "";

// Tag and Two Click-Area are omitted: neither has a counterpart on the item.
export default {
	example:
		kind === "group"
			? figma.code`
<SideNavigationGroup text="${label}"${expandedProp} />`
			: kind === "subItem"
				? figma.code`
<SideNavigationSubItem
	text="${label}"${icon}${selectedProp}${disabledProp}${external}
/>`
				: figma.code`
<SideNavigationItem
	text="${label}"${icon}${selectedProp}${expandedProp}${disabledProp}${external}
/>`,
	imports: [
		'import { SideNavigationItem, SideNavigationSubItem, SideNavigationGroup } from "@reltio/design/components"',
	],
	id: "side-navigation-item",
	metadata: { nestable: true },
};
