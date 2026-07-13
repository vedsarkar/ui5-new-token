import { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: UserMenuItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<UserMenuItem text="Settings" icon="action-settings" />
));
