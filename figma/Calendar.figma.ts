// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=12845-11142
// source=components/Calendar
// component=Calendar
import figma from "figma";

const instance = figma.selectedInstance;

// Figma's Selection is which picker page is showing — day grid, month list,
// year list. UI5 opens on the day grid and navigates between them itself, so
// only the day/range distinction reaches a prop.
const selection = instance.getEnum("Selection", {
	Day: "Single",
	Month: "Single",
	Year: "Single",
	"Year Range": "Range",
});
const weekNumbers = instance.getBoolean("Week Numbers");

const selectionMode =
	selection === "Single"
		? ""
		: figma.code`
	selectionMode="${selection}"`;
// UI5 shows week numbers by default, so the Figma boolean maps to hiding them.
const hideWeekNumbers = weekNumbers
	? ""
	: figma.code`
	hideWeekNumbers`;

// Mixed Calendar is omitted: UI5 expresses a second calendar type with
// `secondaryCalendarType`, which takes a calendar name the boolean does not
// carry. Form Factor is content density.
export default {
	example: figma.code`
<Calendar
	onSelectionChange={onSelectionChange}${selectionMode}${hideWeekNumbers}
/>`,
	imports: ['import { Calendar } from "@reltio/design/components"'],
	id: "calendar",
	metadata: { nestable: false },
};
