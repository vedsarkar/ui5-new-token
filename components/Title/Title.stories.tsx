import { Title } from "@ui5/webcomponents-react/Title";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Title,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Entity profile",
	},
});

export default meta;

export const Default = meta.story({});

export const LevelH1 = meta.story({
	args: {
		level: "H1",
		size: "H1",
		children: "Customer 360",
	},
});

export const LevelH3 = meta.story({
	args: {
		level: "H3",
		size: "H3",
		children: "Source systems",
	},
});

export const SizeOverridesLevel = meta.story({
	args: {
		level: "H2",
		size: "H4",
		children: "Rendered small, still an H2 in the document outline",
	},
});

export const Wrapping = meta.story({
	args: {
		wrappingType: "Normal",
		children:
			"A long section heading that wraps onto multiple lines instead of being truncated",
	},
	render: (args) => (
		<div style={{ width: "260px" }}>
			<Title {...args} />
		</div>
	),
});
