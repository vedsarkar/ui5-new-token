// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=24494-10444
// source=components/RatingIndicator
// component=RatingIndicator
import figma from "figma";

const instance = figma.selectedInstance;

const state = instance.getEnum("Interaction State", {
	Regular: "regular",
	"Read Only": "readonly",
	Disabled: "disabled",
});

const stateProp =
	state === "regular"
		? ""
		: figma.code`
	${state}`;

// Label is omitted: the Figma label is a sibling `Label`, not a prop on the
// indicator. Form Factor is content density, set on an ancestor — note UI5's
// `size` here is the icon scale, not density, so the two are unrelated.
export default {
	example: figma.code`
<RatingIndicator
	value={value}
	onChange={onChange}${stateProp}
/>`,
	imports: ['import { RatingIndicator } from "@reltio/design/components"'],
	id: "rating-indicator",
	metadata: { nestable: true },
};
