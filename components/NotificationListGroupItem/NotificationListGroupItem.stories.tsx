import { NotificationList } from "@ui5/webcomponents-react/NotificationList";
import { NotificationListGroupItem } from "@ui5/webcomponents-react/NotificationListGroupItem";
import { NotificationListItem } from "@ui5/webcomponents-react/NotificationListItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: NotificationListGroupItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<NotificationList style={{ width: "420px" }}>
		<NotificationListGroupItem titleText="Data quality">
			<NotificationListItem titleText="Match found" state="Information" />
			<NotificationListItem titleText="Validation failed" state="Negative" />
		</NotificationListGroupItem>
	</NotificationList>
));
