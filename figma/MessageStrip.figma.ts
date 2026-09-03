// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=910-2517
// source=components/MessageStrip
// component=MessageStrip
import figma from "figma";

const instance = figma.selectedInstance;

const design = instance.getEnum("Value State", {
	Information: "Information",
	Positive: "Positive",
	Critical: "Critical",
	Negative: "Negative",
	"Indication Color": "ColorSet1",
});
const color = instance.getEnum("Color", {
	None: "",
	"Indication 1": "1",
	"Indication 2": "2",
	"Indication 3": "3",
	"Indication 4": "4",
	"Indication 5": "5",
	"Indication 6": "6",
	"Indication 7": "7",
	"Indication 8": "8",
	"Indication 9": "9",
	"Indication 10": "10",
	"Indication 1b": "1",
	"Indication 2b": "2",
	"Indication 3b": "3",
	"Indication 4b": "4",
	"Indication 5b": "5",
	"Indication 6b": "6",
	"Indication 7b": "7",
	"Indication 8b": "8",
	"Indication 9b": "9",
	"Indication 10b": "10",
});
// Both are inverted: Figma says what is shown, UI5 says what is hidden.
const closeButton = instance.getBoolean("Close Button");
const icon = instance.getEnum("Icon", { True: true, False: false });
const text = instance.findText("Text");

const colorScheme =
	design === "ColorSet1" && color
		? figma.code`
	colorScheme="${color}"`
		: "";
const hideCloseButton = closeButton
	? ""
	: figma.code`
	hideCloseButton`;
const hideIcon = icon
	? ""
	: figma.code`
	hideIcon`;

export default {
	example: figma.code`
<MessageStrip
	design="${design}"${colorScheme}${hideCloseButton}${hideIcon}
>
	${text && text.type === "TEXT" ? text.textContent : ""}
</MessageStrip>`,
	imports: ['import { MessageStrip } from "@reltio/design/components"'],
	id: "message-strip",
	metadata: { nestable: true },
};
