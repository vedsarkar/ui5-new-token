import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { AvatarGroup } from "@ui5/webcomponents-react/AvatarGroup";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: AvatarGroup,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<AvatarGroup>
		<Avatar initials="JD" />
		<Avatar initials="AB" />
		<Avatar initials="MK" />
		<Avatar initials="RP" />
	</AvatarGroup>
));
