// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=194605-104343
// source=components/TimePicker
// component=TimePicker
import figma from "figma";

const instance = figma.selectedInstance;

const open = instance.getEnum("Dropdown", { True: true, False: false });

const openProp = open
	? figma.code`
	open`
	: "";

// Form Factor is content density, set on an ancestor.
export default {
	example: figma.code`
<TimePicker
	value={value}
	onChange={onChange}${openProp}
/>`,
	imports: ['import { TimePicker } from "@reltio/design/components"'],
	id: "time-picker",
	metadata: { nestable: true },
};
