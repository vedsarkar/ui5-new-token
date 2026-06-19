import { ExpandableText } from "@ui5/webcomponents-react/ExpandableText";
import preview from "../../.storybook/preview";

const longText =
	"This profile aggregates attributes from every connected source system, applies survivorship rules, and resolves the surviving value across the whole dataset so downstream applications always read one consistent, trusted record for the entity.";

const meta = preview.meta({
	component: ExpandableText,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		children: longText,
	},
	render: (args) => (
		<div style={{ maxWidth: "420px" }}>
			<ExpandableText {...args} />
		</div>
	),
});

export default meta;

export const Default = meta.story({});

export const ShortLimit = meta.story({
	args: {
		maxCharacters: 60,
	},
});

export const Popover = meta.story({
	args: {
		maxCharacters: 60,
		overflowMode: "Popover",
	},
});

export const EmptyIndicator = meta.story({
	args: {
		children: "",
		emptyIndicatorMode: "On",
	},
});
