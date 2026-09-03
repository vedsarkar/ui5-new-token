// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=284154-13919
// source=components/NotificationListItem
// component=NotificationListItem
import figma from "figma";

const instance = figma.selectedInstance;

const title = instance.getString("✏️ Title");
const description = instance.getString("✏️ Description");
const groupName = instance.getString("✏️ Group Name");
const kind = instance.getEnum("Type", {
	"Notification List Item": "item",
	"Group Header": "group",
});
const read = instance.getEnum("Read", { False: false, True: true });
const hasDescription = instance.getBoolean("Description");
const hasAvatar = instance.getBoolean("Icon");
const hasImportance = instance.getBoolean("Importance Tag");
const hasActions = instance.getBoolean("Action Items");
const hasClose = instance.getBoolean("More");

const readProp = read
	? figma.code`
	read`
	: "";
const avatar = hasAvatar
	? figma.code`
	avatar={avatar}`
	: "";
// UI5 models importance as `importance="High"`, not a separate tag element.
const importance = hasImportance
	? figma.code`
	importance="High"`
	: "";
const menu = hasActions
	? figma.code`
	menu={menu}`
	: "";
const showClose = hasClose
	? figma.code`
	showClose`
	: "";
const body = hasDescription ? description : "";

// Omitted: Status Indicator (UI5's `state` takes a ValueState the boolean does
// not name), Interaction State, Selected, and Form Factor.
export default {
	example:
		kind === "group"
			? figma.code`
<NotificationListGroupItem titleText="${groupName}">
	{children}
</NotificationListGroupItem>`
			: figma.code`
<NotificationListItem
	titleText="${title}"${readProp}${avatar}${importance}${menu}${showClose}
>
	${body}
</NotificationListItem>`,
	imports: [
		'import { NotificationListItem, NotificationListGroupItem } from "@reltio/design/components"',
	],
	id: "notification-list-item",
	metadata: { nestable: true },
};
