import { MessageItem } from "@ui5/webcomponents-react/MessageItem";
import { MessageView } from "@ui5/webcomponents-react/MessageView";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MessageItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<MessageView style={{ width: "420px", height: "220px" }}>
		<MessageItem
			titleText="Validation failed"
			type="Negative"
			subtitleText="Account"
		>
			A required attribute is missing.
		</MessageItem>
		<MessageItem
			titleText="Enrichment applied"
			type="Positive"
			subtitleText="Source"
		/>
	</MessageView>
));
