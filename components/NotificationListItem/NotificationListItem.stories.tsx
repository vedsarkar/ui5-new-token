import { NotificationList } from "@ui5/webcomponents-react/NotificationList";
import { NotificationListItem } from "@ui5/webcomponents-react/NotificationListItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: NotificationListItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<NotificationList style={{ width: "420px" }}>
		<NotificationListItem titleText="Match found" state="Information">
			A new match candidate is ready for review.
		</NotificationListItem>
		<NotificationListItem titleText="Merge completed" state="Positive" read>
			Two source records were merged.
		</NotificationListItem>
	</NotificationList>
));
