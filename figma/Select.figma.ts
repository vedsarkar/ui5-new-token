// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=181557-7507
// source=components/Select
// component=Select
import figma from "figma";

const instance = figma.selectedInstance;

// Drop-Down is whether Figma is showing the list open. UI5 does have an `open`
// prop, so this is a real mapping rather than a presentation-only variant.
const open = instance.getEnum("Drop-Down", { False: false, True: true });

const openProp = open
	? figma.code`
	open`
	: "";

// Form Factor is content density, set on an ancestor. The options come from
// children, which the Figma Select does not model as properties.
export default {
	example: figma.code`
<Select
	onChange={onChange}${openProp}
>
	<Option>{label}</Option>
</Select>`,
	imports: ['import { Select, Option } from "@reltio/design/components"'],
	id: "select",
	metadata: { nestable: false },
};
