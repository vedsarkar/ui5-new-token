import { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem";
import { UserMenuItemGroup } from "@ui5/webcomponents-react/UserMenuItemGroup";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: UserMenuItemGroup,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<UserMenuItemGroup>
		<UserMenuItem text="Profile" />
		<UserMenuItem text="Preferences" />
	</UserMenuItemGroup>
));
