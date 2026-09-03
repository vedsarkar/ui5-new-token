// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=25168-10849
// source=components/Slider
// component=Slider
import figma from "figma";

const instance = figma.selectedInstance;

// Figma models the handle position as five sample variants; UI5 takes a
// number, so each maps to its numeric value rather than to a prop of its own.
const value = instance.getEnum("Value", {
	"0%": "0",
	"25%": "25",
	"50%": "50",
	"75%": "75",
	"100%": "100",
});
const showTickmarks = instance.getBoolean("Tick Marks");
const labels = instance.getBoolean("Labels");
const disabled = instance.getEnum("Interaction State", {
	Regular: false,
	Disabled: true,
});

const tickmarks = showTickmarks
	? figma.code`
	showTickmarks`
	: "";
// UI5 draws labels off `labelInterval`; there is no boolean, so the interval
// is emitted for the developer to set rather than guessed.
const labelInterval = labels
	? figma.code`
	labelInterval={labelInterval}`
	: "";
const disabledProp = disabled
	? figma.code`
	disabled`
	: "";

// Form Factor is content density, set on an ancestor.
export default {
	example: figma.code`
<Slider
	value={${value}}
	onChange={onChange}${tickmarks}${labelInterval}${disabledProp}
/>`,
	imports: ['import { Slider } from "@reltio/design/components"'],
	id: "slider",
	metadata: { nestable: true },
};
