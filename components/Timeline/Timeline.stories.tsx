import { Timeline } from "@ui5/webcomponents-react/Timeline";
import { TimelineGroupItem } from "@ui5/webcomponents-react/TimelineGroupItem";
import { TimelineItem } from "@ui5/webcomponents-react/TimelineItem";
import activityItemsIcon from "@/icons/sap/activity-items";
import employeeIcon from "@/icons/sap/employee";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Timeline,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		accessibleName: "Entity history",
		style: { width: "360px" },
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<Timeline {...args}>
			<TimelineItem
				titleText="Record created"
				subtitleText="2024-01-12"
				icon={employeeIcon}
				name="Jane Doe"
			>
				Initial profile ingested from CRM.
			</TimelineItem>
			<TimelineItem
				titleText="Source merged"
				subtitleText="2024-02-03"
				icon={activityItemsIcon}
				name="System"
			>
				ERP source matched and merged.
			</TimelineItem>
		</Timeline>
	),
});

export const Horizontal = meta.story({
	args: {
		layout: "Horizontal",
		style: { width: "520px" },
	},
	render: (args) => (
		<Timeline {...args}>
			<TimelineItem titleText="Created" subtitleText="Jan 12" />
			<TimelineItem titleText="Validated" subtitleText="Jan 20" />
			<TimelineItem titleText="Published" subtitleText="Feb 03" />
		</Timeline>
	),
});

export const Grouped = meta.story({
	render: (args) => (
		<Timeline {...args}>
			<TimelineGroupItem groupName="January 2024">
				<TimelineItem titleText="Record created" subtitleText="Jan 12" />
				<TimelineItem titleText="Reviewed" subtitleText="Jan 20" />
			</TimelineGroupItem>
			<TimelineGroupItem groupName="February 2024">
				<TimelineItem titleText="Source merged" subtitleText="Feb 03" />
			</TimelineGroupItem>
		</Timeline>
	),
});
