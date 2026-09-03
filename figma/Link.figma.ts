// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=187-305
// source=components/Link
// component=Link
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Text");
// Icon Link is not a design — it is the icon-only layout, so it keeps the
// Default design and simply carries no text.
const design = instance.getEnum("Type", {
	Regular: "Default",
	Emphasized: "Emphasized",
	Subtle: "Subtle",
	"Icon Link": "Default",
});
const iconOnly = instance.getEnum("Type", {
	Regular: false,
	Emphasized: false,
	Subtle: false,
	"Icon Link": true,
});
const disabled = instance.getEnum("Interaction State", {
	Regular: false,
	Hover: false,
	Visited: false,
	Down: false,
	Disabled: true,
});
// UI5 splits leading and trailing into two props rather than a position enum.
const iconPosition = instance.getEnum("Icon Position", {
	Left: "icon",
	Right: "endIcon",
	"N/A": "",
});

const designProp =
	design === "Default"
		? ""
		: figma.code`
	design="${design}"`;
const icon =
	iconPosition || iconOnly
		? figma.code`
	${iconPosition || "icon"}={icon}`
		: "";
const disabledProp = disabled
	? figma.code`
	disabled`
	: "";

export default {
	example: figma.code`
<Link
	href={href}${designProp}${icon}${disabledProp}
>
	${iconOnly ? "" : label}
</Link>`,
	imports: ['import { Link } from "@reltio/design/components"'],
	id: "link",
	metadata: { nestable: true },
};
