import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { AvatarBadge } from "@ui5/webcomponents-react/AvatarBadge";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/accept.js";

const meta = preview.meta({
	component: AvatarBadge,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Avatar initials="JD" accessibleName="Jane Doe">
		<AvatarBadge slot="badge" icon="accept" />
	</Avatar>
));
