import { Button } from "@ui5/webcomponents-react/Button";
import { ButtonBadge } from "@ui5/webcomponents-react/ButtonBadge";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ButtonBadge,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Button>
		Inbox
		<ButtonBadge slot="badge" text="12" />
	</Button>
));
