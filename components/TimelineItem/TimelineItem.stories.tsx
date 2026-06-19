import { Timeline } from "@ui5/webcomponents-react/Timeline";
import { TimelineItem } from "@ui5/webcomponents-react/TimelineItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: TimelineItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Timeline accessibleName="History" style={{ width: "360px" }}>
		<TimelineItem
			titleText="Record created"
			subtitleText="2024-01-12"
			name="Jane Doe"
		>
			Ingested from CRM.
		</TimelineItem>
		<TimelineItem
			titleText="Source merged"
			subtitleText="2024-02-03"
			name="System"
		/>
	</Timeline>
));
