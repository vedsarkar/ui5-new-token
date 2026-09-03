import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { Label } from "@ui5/webcomponents-react/Label";
import { NotificationList } from "@ui5/webcomponents-react/NotificationList";
import { NotificationListGroupItem } from "@ui5/webcomponents-react/NotificationListGroupItem";
import { NotificationListItem } from "@ui5/webcomponents-react/NotificationListItem";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: NotificationList,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		onItemClick: fn(),
		onItemClose: fn(),
		style: { width: "420px" },
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<NotificationList {...args}>
			<NotificationListItem titleText="Match found" state="Information">
				A new match candidate is ready for review.
			</NotificationListItem>
			<NotificationListItem titleText="Merge completed" state="Positive" read>
				Two source records were merged into one profile.
			</NotificationListItem>
		</NotificationList>
	),
});

export const Importance = meta.story({
	render: (args) => (
		<NotificationList {...args}>
			<NotificationListItem
				titleText="Validation failed"
				state="Negative"
				importance="Important"
			>
				A required attribute is missing on this entity.
			</NotificationListItem>
		</NotificationList>
	),
});

export const WithAvatarAndFootnotes = meta.story({
	render: (args) => (
		<NotificationList {...args}>
			<NotificationListItem
				titleText="Match found"
				state="Information"
				avatar={<Avatar initials="RD" size="XS" />}
				footnotes={
					<>
						<Label>Data Stewardship</Label>
						<Label>Match Review</Label>
						<Label>11:13</Label>
					</>
				}
			>
				A new match candidate is ready for review.
			</NotificationListItem>
		</NotificationList>
	),
});

export const Grouped = meta.story({
	render: (args) => (
		<NotificationList {...args}>
			<NotificationListGroupItem titleText="Data quality">
				<NotificationListItem titleText="Match found" state="Information">
					A new match candidate is ready for review.
				</NotificationListItem>
				<NotificationListItem titleText="Validation failed" state="Negative">
					A required attribute is missing.
				</NotificationListItem>
			</NotificationListGroupItem>
		</NotificationList>
	),
});
