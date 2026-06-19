import { MessageViewButton } from "@ui5/webcomponents-react/MessageViewButton";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MessageViewButton,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<MessageViewButton type="Negative" counter={3} />
));
