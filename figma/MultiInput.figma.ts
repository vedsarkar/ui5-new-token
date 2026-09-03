// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=212341-2965
// source=components/MultiInput
// component=MultiInput
import figma from "figma";

const instance = figma.selectedInstance;

const open = instance.getBoolean("Drop-Down");
// Display Only has no counterpart: UI5 offers `readonly`, which still renders
// a field, where the design's display-only strips the field chrome entirely.
// `readonly` is the closest honest approximation.
const displayOnly = instance.getEnum("Display Only", {
	False: false,
	True: true,
});

const openProp = open
	? figma.code`
	open`
	: "";
const readonly = displayOnly
	? figma.code`
	readonly`
	: "";

// "Show all" Footer is omitted: UI5 renders the token overflow indicator
// itself and offers no prop for it. Form Factor is content density.
export default {
	example: figma.code`
<MultiInput
	tokens={tokens}
	onTokenDelete={onTokenDelete}${openProp}${readonly}
/>`,
	imports: ['import { MultiInput } from "@reltio/design/components"'],
	id: "multi-input",
	metadata: { nestable: true },
};
