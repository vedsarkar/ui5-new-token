// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=160531-1416
// source=components/DatePicker
// component=DatePicker
import figma from "figma";

const instance = figma.selectedInstance;

const open = instance.getBoolean("Calendar");
// The Figma component covers both the single and range pickers; UI5 splits
// them into two elements rather than a prop.
const range = instance.getEnum("Type", {
	"One-Month": false,
	"Two-Month": true,
});

const openProp = open
	? figma.code`
	open`
	: "";

// Orientation is omitted: it only applies to the two-month calendar, and UI5
// lays that out itself with no prop. Form Factor is content density.
export default {
	example: range
		? figma.code`
<DateRangePicker
	value={value}
	onChange={onChange}${openProp}
/>`
		: figma.code`
<DatePicker
	value={value}
	onChange={onChange}${openProp}
/>`,
	imports: [
		'import { DatePicker, DateRangePicker } from "@reltio/design/components"',
	],
	id: "date-picker",
	metadata: { nestable: true },
};
