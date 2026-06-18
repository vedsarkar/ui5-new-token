import { Tag } from "@ui5/webcomponents-react/Tag";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Tag,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Verified",
	},
});

export default meta;

export const Default = meta.story({});

export const Positive = meta.story({
	args: {
		design: "Positive",
		children: "Active",
	},
});

export const Critical = meta.story({
	args: {
		design: "Critical",
		children: "Pending review",
	},
});

export const Negative = meta.story({
	args: {
		design: "Negative",
		children: "Rejected",
	},
});

export const Information = meta.story({
	args: {
		design: "Information",
		children: "Draft",
	},
});

export const Large = meta.story({
	args: {
		size: "L",
		design: "Positive",
		children: "Active",
	},
});

export const Interactive = meta.story({
	args: {
		interactive: true,
		children: "Filter: Country = US",
	},
});
