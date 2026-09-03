// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=321359-13754
// source=components/IllustratedMessage
// component=IllustratedMessage
import figma from "figma";

const instance = figma.selectedInstance;

const title = instance.getString("✏️ Title");
const description = instance.getString("✏️ Description");
// UI5 picks the illustration size itself from the available space; `design`
// forces one. Auto is the default, so only an explicit size is emitted.
const design = instance.getEnum("Size", {
	"Extra Small (XS)": "Spot",
	"Small (S)": "Dialog",
	"Medium (M)": "Dialog",
	"Large (L)": "Scene",
});
const buttonCount = ["1st Button", "2nd Button", "3rd Button"].filter((name) =>
	instance.getBoolean(name),
).length;

const first =
	buttonCount > 0
		? figma.code`
	<Button design="Emphasized">{label}</Button>`
		: "";
const second =
	buttonCount > 1
		? figma.code`
	<Button>{label}</Button>`
		: "";

// The four Illustration swaps are one choice in code — `name` selects from
// UI5's illustration set, and the Figma swap carries no name UI5 recognises,
// so it is emitted as the identifier the developer picks.
export default {
	example: figma.code`
<IllustratedMessage
	name={illustrationName}
	design="${design}"
	titleText="${title}"
	subtitleText="${description}"
>${first}${second}
</IllustratedMessage>`,
	imports: [
		'import { IllustratedMessage, Button } from "@reltio/design/components"',
	],
	id: "illustrated-message",
	metadata: { nestable: false },
};
