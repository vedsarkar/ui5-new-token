import { Card } from "@ui5/webcomponents-react/Card";
import { CardHeader } from "@ui5/webcomponents-react/CardHeader";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: CardHeader,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		titleText: "Customer 360",
	},
	render: (args) => (
		<Card style={{ width: "320px" }} header={<CardHeader {...args} />} />
	),
});

export default meta;

export const Default = meta.story({});

export const WithSubtitle = meta.story({
	args: {
		subtitleText: "Acme Corporation",
	},
});

export const WithCounter = meta.story({
	args: {
		subtitleText: "Source systems",
		additionalText: "12",
	},
});

export const Interactive = meta.story({
	args: {
		subtitleText: "Click to open the entity",
		interactive: true,
		onClick: fn(),
	},
});
