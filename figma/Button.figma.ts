// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=91702-11733
// source=components/Button
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("✏️ Text");
const design = instance.getEnum("Type", {
	Primary: "Emphasized",
	Secondary: "Default",
	Accept: "Positive",
	Reject: "Negative",
	Attention: "Attention",
	Tertiary: "Transparent",
});
const disabled = instance.getEnum("Interaction State", {
	Regular: false,
	Hover: false,
	Down: false,
	Disabled: true,
});
const hasIcon = instance.getBoolean("Icon Left");

// `icon` takes an icon *name*, not a node — the registered binding from
// `@reltio/design/icons/sap/<name>`. Resolving the swapped Figma instance
// through `executeTemplate()` would emit JSX into a string prop, so the icon
// is emitted as the identifier the developer imports.
const icon = hasIcon
	? figma.code`
	icon={icon}`
	: "";
const disabledProp = disabled
	? figma.code`
	disabled`
	: "";

// Omitted, having no counterpart on the UI5 Button: Form Factor (density is a
// document-level concern), Toggled (that is `ToggleButton`), and the Attention
// and Counter badges (the `badge` slot takes a `ButtonBadge` element, which
// the boolean alone does not describe).
export default {
	example: figma.code`
<Button
	design="${design}"${icon}${disabledProp}
>
	${label}
</Button>`,
	imports: ['import { Button } from "@reltio/design/components"'],
	id: "button",
	metadata: { nestable: true },
};
