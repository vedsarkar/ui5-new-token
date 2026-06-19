import { Calendar } from "@ui5/webcomponents-react/Calendar";
import { SpecialCalendarDate } from "@ui5/webcomponents-react/SpecialCalendarDate";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: SpecialCalendarDate,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Calendar formatPattern="yyyy-MM-dd">
		<SpecialCalendarDate value="2024-02-14" />
	</Calendar>
));
