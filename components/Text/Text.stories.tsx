import { Text } from "@ui5/webcomponents-react/Text";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Text,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Reltio unifies your data into a single, trusted profile.",
	},
});

export default meta;

export const Default = meta.story({});

export const Truncated = meta.story({
	args: {
		maxLines: 2,
		children:
			"This profile aggregates attributes from every connected source system, applies survivorship rules, and resolves the surviving value across the whole dataset so downstream applications always read one consistent record.",
	},
	render: (args) => (
		<div style={{ width: "240px" }}>
			<Text {...args} />
		</div>
	),
});

export const EmptyIndicator = meta.story({
	args: {
		emptyIndicatorMode: "On",
		children: "",
	},
});
