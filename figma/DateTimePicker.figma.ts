// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=353384-17365
// source=components/DateTimePicker
// component=DateTimePicker
import figma from "figma";

const instance = figma.selectedInstance;

const open = instance.getEnum("Dropdown", { False: false, True: true });

const openProp = open
	? figma.code`
	open`
	: "";

// Form Factor is content density, set on an ancestor.
export default {
	example: figma.code`
<DateTimePicker
	value={value}
	onChange={onChange}${openProp}
/>`,
	imports: ['import { DateTimePicker } from "@reltio/design/components"'],
	id: "date-time-picker",
	metadata: { nestable: true },
};
