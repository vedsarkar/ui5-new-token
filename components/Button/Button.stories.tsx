import { Button } from "@ui5/webcomponents-react/Button";
import { fn } from "storybook/test";
import deleteIcon from "@/icons/sap/delete";
import editIcon from "@/icons/sap/edit";
import navigationRightArrowIcon from "@/icons/sap/navigation-right-arrow";
import refreshIcon from "@/icons/sap/refresh";
import saveIcon from "@/icons/sap/save";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Button,
	tags: ["doc-only"],
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
		icon: saveIcon,
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
		icon: deleteIcon,
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
		icon: editIcon,
		children: "Edit",
	},
});

export const WithEndIcon = meta.story({
	args: {
		endIcon: navigationRightArrowIcon,
		children: "Continue",
	},
});

export const IconOnly = meta.story({
	args: {
		icon: refreshIcon,
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
		icon: saveIcon,
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
			<Button design="Emphasized" icon={saveIcon}>
				Save
			</Button>
			<Button design="Transparent">Discard</Button>
			<Button design="Negative" icon={deleteIcon}>
				Delete
			</Button>
		</div>
	),
});
