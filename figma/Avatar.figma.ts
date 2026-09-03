// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=573-3623
// source=components/Avatar
// component=Avatar
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
	XS: "XS",
	S: "S",
	M: "M",
	L: "L",
	XL: "XL",
});
const type = instance.getEnum("Type", {
	Image: "image",
	Icon: "icon",
	Initials: "initials",
});
const initials = instance.getString("✏️ Initials");
const disabled = instance.getEnum("Interaction State", {
	Regular: false,
	Hover: false,
	Active: false,
	"Toggled Hover": false,
	Disabled: true,
});
// Figma numbers the accent colours; UI5 names them. Image and Tile are not
// colour schemes at all — the first means a photo fills the avatar, the second
// is a tile treatment UI5 has no counterpart for — so both fall back to Auto.
const colorScheme = instance.getEnum("Color", {
	Image: "Auto",
	Tile: "Auto",
	"1": "Accent1",
	"2": "Accent2",
	"3": "Accent3",
	"4": "Accent4",
	"5": "Accent5",
	"6": "Accent6",
	"7": "Accent7",
	"8": "Accent8",
	"9": "Accent9",
	"10": "Accent10",
	Transparent: "Transparent",
	Placeholder: "Placeholder",
});

const initialsProp =
	type === "initials"
		? figma.code`
	initials="${initials}"`
		: "";
const iconProp =
	type === "icon"
		? figma.code`
	icon={icon}`
		: "";
const children =
	type === "image"
		? figma.code`
	<img src={src} alt={alt} />`
		: "";
const colorSchemeProp =
	colorScheme === "Auto"
		? ""
		: figma.code`
	colorScheme="${colorScheme}"`;
const disabledProp = disabled
	? figma.code`
	disabled`
	: "";

// Omitted: Content (Person vs Object only picks which fallback glyph the
// Figma component shows), Optional Border and Badge (the `badge` slot takes an
// `AvatarBadge` element, which the boolean does not describe).
export default {
	example: figma.code`
<Avatar
	size="${size}"${colorSchemeProp}${initialsProp}${iconProp}${disabledProp}
>${children}
</Avatar>`,
	imports: ['import { Avatar } from "@reltio/design/components"'],
	id: "avatar",
	metadata: { nestable: true },
};
