import { Timeline } from "@ui5/webcomponents-react/Timeline";
import { TimelineGroupItem } from "@ui5/webcomponents-react/TimelineGroupItem";
import { TimelineItem } from "@ui5/webcomponents-react/TimelineItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: TimelineGroupItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Timeline accessibleName="History" style={{ width: "360px" }}>
		<TimelineGroupItem groupName="January 2024">
			<TimelineItem titleText="Record created" subtitleText="Jan 12" />
			<TimelineItem titleText="Reviewed" subtitleText="Jan 20" />
		</TimelineGroupItem>
	</Timeline>
));
