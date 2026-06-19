import { Calendar } from "@ui5/webcomponents-react/Calendar";
import { CalendarDate } from "@ui5/webcomponents-react/CalendarDate";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: CalendarDate,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Calendar formatPattern="yyyy-MM-dd">
		<CalendarDate value="2024-02-14" />
	</Calendar>
));
