// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=23575-10458
// source=components/BusyIndicator
// component=BusyIndicator
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", { Small: "S", Medium: "M", Large: "L" });
const hasText = instance.getBoolean("Text");
const label = instance.getString("✏️ Text Value");

const sizeProp =
	size === "M"
		? ""
		: figma.code`
	size="${size}"`;
const text = hasText
	? figma.code`
	text="${label}"`
	: "";

// `active` is emitted because the indicator only shows when it is set, and
// Figma has no property for it — the design renders the busy state directly.
export default {
	example: figma.code`
<BusyIndicator
	active${sizeProp}${text}
/>`,
	imports: ['import { BusyIndicator } from "@reltio/design/components"'],
	id: "busy-indicator",
	metadata: { nestable: true },
};
