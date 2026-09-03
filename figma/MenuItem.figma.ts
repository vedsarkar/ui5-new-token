// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=307148-3934
// source=components/MenuItem
// component=MenuItem
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Text");
const disabled = instance.getEnum("Interaction State", {
	Regular: false,
	Hover: false,
	Down: false,
	Disabled: true,
});
const selected = instance.getEnum("Selected", { False: false, True: true });
const hasLeadingIcon = instance.getBoolean("Leading Icon");

const icon = hasLeadingIcon
	? figma.code`
	icon={icon}`
	: "";
const disabledProp = disabled
	? figma.code`
	disabled`
	: "";
const selectedProp = selected
	? figma.code`
	selected`
	: "";

// Omitted: Separator (`MenuSeparator` is its own element), Leading and
// Trailing Space (layout padding, not props), and Form Factor.
export default {
	example: figma.code`
<MenuItem
	text="${label}"${icon}${disabledProp}${selectedProp}
/>`,
	imports: ['import { MenuItem } from "@reltio/design/components"'],
	id: "menu-item",
	metadata: { nestable: true },
};
