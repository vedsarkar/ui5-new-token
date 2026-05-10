import { Button } from "@ui5/webcomponents-react/Button";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/save.js";

const meta = preview.meta({
	component: Button,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Button",
		onClick: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const Emphasized = meta.story({
	args: {
		design: "Emphasized",
		children: "Save",
		icon: "save",
	},
});

export const Positive = meta.story({
	args: {
		design: "Positive",
		children: "Approve",
	},
});

export const Negative = meta.story({
	args: {
		design: "Negative",
		children: "Delete entity",
		icon: "delete",
	},
});

export const Attention = meta.story({
	args: {
		design: "Attention",
		children: "Review changes",
	},
});

export const Transparent = meta.story({
	args: {
		design: "Transparent",
		children: "Cancel",
	},
});

export const WithIcon = meta.story({
	args: {
		icon: "edit",
		children: "Edit",
	},
});

export const WithEndIcon = meta.story({
	args: {
		endIcon: "navigation-right-arrow",
		children: "Continue",
	},
});

export const IconOnly = meta.story({
	args: {
		icon: "refresh",
		children: undefined,
		accessibleName: "Refresh data",
		tooltip: "Refresh data",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		children: "Unavailable",
	},
});

export const Loading = meta.story({
	args: {
		loading: true,
		loadingDelay: 0,
		children: "Saving…",
	},
});

export const SubmitInsideForm = meta.story({
	args: {
		type: "Submit",
		design: "Emphasized",
		children: "Submit form",
	},
	decorators: [
		(Story) => (
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<Story />
			</form>
		),
	],
});

export const LongLabelOverflow = meta.story({
	args: {
		children:
			"Reconcile the cross-source profile with the latest survivorship rules",
		icon: "save",
	},
	decorators: [
		(Story) => (
			<div style={{ width: "240px" }}>
				<Story />
			</div>
		),
	],
});

export const InToolbarRow = meta.story({
	args: {
		children: undefined,
	},
	render: () => (
		<div style={{ display: "flex", gap: "8px" }}>
			<Button design="Emphasized" icon="save">
				Save
			</Button>
			<Button design="Transparent">Discard</Button>
			<Button design="Negative" icon="delete">
				Delete
			</Button>
		</div>
	),
});
