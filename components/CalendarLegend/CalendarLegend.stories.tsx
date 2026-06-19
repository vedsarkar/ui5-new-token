import { CalendarLegend } from "@ui5/webcomponents-react/CalendarLegend";
import { CalendarLegendItem } from "@ui5/webcomponents-react/CalendarLegendItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: CalendarLegend,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<CalendarLegend>
		<CalendarLegendItem text="Today" />
		<CalendarLegendItem text="Selected" />
		<CalendarLegendItem text="Working day" />
	</CalendarLegend>
));
