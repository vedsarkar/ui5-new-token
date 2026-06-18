import { ObjectStatus } from "@ui5/webcomponents-react/ObjectStatus";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ObjectStatus,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Synchronized",
	},
});

export default meta;

export const Default = meta.story({});

export const Positive = meta.story({
	args: {
		state: "Positive",
		children: "Validated",
	},
});

export const Critical = meta.story({
	args: {
		state: "Critical",
		children: "Needs review",
	},
});

export const Negative = meta.story({
	args: {
		state: "Negative",
		children: "Sync failed",
	},
});

export const Information = meta.story({
	args: {
		state: "Information",
		children: "In progress",
	},
});

export const WithDefaultIcon = meta.story({
	args: {
		state: "Positive",
		showDefaultIcon: true,
		children: "Validated",
	},
});

export const Large = meta.story({
	args: {
		state: "Negative",
		showDefaultIcon: true,
		large: true,
		children: "Sync failed",
	},
});

export const EmptyIndicator = meta.story({
	args: {
		emptyIndicator: true,
		children: "",
	},
});
