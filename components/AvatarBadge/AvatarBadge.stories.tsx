import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { AvatarBadge } from "@ui5/webcomponents-react/AvatarBadge";
import acceptIcon from "@/icons/sap/accept";
import preview from "../../.storybook/preview";

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
		<AvatarBadge slot="badge" icon={acceptIcon} />
	</Avatar>
));
