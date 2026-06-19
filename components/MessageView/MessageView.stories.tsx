import { MessageItem } from "@ui5/webcomponents-react/MessageItem";
import { MessageView } from "@ui5/webcomponents-react/MessageView";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MessageView,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<MessageView onItemSelect={fn()} style={{ width: "420px", height: "260px" }}>
		<MessageItem
			titleText="Validation failed"
			type="Negative"
			subtitleText="Account"
		>
			A required attribute is missing on this entity.
		</MessageItem>
		<MessageItem
			titleText="Possible duplicate"
			type="Critical"
			subtitleText="Match"
		>
			This record may match an existing profile.
		</MessageItem>
		<MessageItem
			titleText="Enrichment applied"
			type="Positive"
			subtitleText="Source"
		>
			Address standardized from the postal service.
		</MessageItem>
	</MessageView>
));

export const Grouped = meta.story(() => (
	<MessageView
		groupItems
		onItemSelect={fn()}
		style={{ width: "420px", height: "260px" }}
	>
		<MessageItem
			titleText="Validation failed"
			type="Negative"
			groupName="Data quality"
		/>
		<MessageItem
			titleText="Possible duplicate"
			type="Critical"
			groupName="Data quality"
		/>
		<MessageItem
			titleText="Enrichment applied"
			type="Positive"
			groupName="Sources"
		/>
	</MessageView>
));
