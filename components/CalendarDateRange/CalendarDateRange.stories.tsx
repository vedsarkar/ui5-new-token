import { Calendar } from "@ui5/webcomponents-react/Calendar";
import { CalendarDateRange } from "@ui5/webcomponents-react/CalendarDateRange";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: CalendarDateRange,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Calendar selectionMode="Range" formatPattern="yyyy-MM-dd">
		<CalendarDateRange startValue="2024-02-01" endValue="2024-02-10" />
	</Calendar>
));
