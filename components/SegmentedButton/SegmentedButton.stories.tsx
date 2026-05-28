import { SegmentedButton } from "@ui5/webcomponents-react/SegmentedButton";
import { SegmentedButtonItem } from "@ui5/webcomponents-react/SegmentedButtonItem";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/table-view.js";

const meta = preview.meta({
	component: SegmentedButton,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		accessibleName: "View mode",
		onSelectionChange: fn(),
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<SegmentedButton {...args}>
			<SegmentedButtonItem selected>Day</SegmentedButtonItem>
			<SegmentedButtonItem>Week</SegmentedButtonItem>
			<SegmentedButtonItem>Month</SegmentedButtonItem>
			<SegmentedButtonItem>Year</SegmentedButtonItem>
		</SegmentedButton>
	),
});

export const Multiple = meta.story({
	args: {
		selectionMode: "Multiple",
	},
	render: (args) => (
		<SegmentedButton {...args}>
			<SegmentedButtonItem selected>Open</SegmentedButtonItem>
			<SegmentedButtonItem selected>In Review</SegmentedButtonItem>
			<SegmentedButtonItem>Resolved</SegmentedButtonItem>
			<SegmentedButtonItem>Archived</SegmentedButtonItem>
		</SegmentedButton>
	),
});

export const IconOnly = meta.story({
	render: (args) => (
		<SegmentedButton {...args}>
			<SegmentedButtonItem
				icon="list"
				accessibleName="List view"
				tooltip="List view"
				selected
			/>
			<SegmentedButtonItem
				icon="table-view"
				accessibleName="Table view"
				tooltip="Table view"
			/>
			<SegmentedButtonItem
				icon="menu2"
				accessibleName="Compact view"
				tooltip="Compact view"
			/>
		</SegmentedButton>
	),
});

export const IconWithText = meta.story({
	render: (args) => (
		<SegmentedButton {...args}>
			<SegmentedButtonItem icon="list" selected>
				List
			</SegmentedButtonItem>
			<SegmentedButtonItem icon="table-view">Table</SegmentedButtonItem>
			<SegmentedButtonItem icon="menu2">Compact</SegmentedButtonItem>
		</SegmentedButton>
	),
});

export const Disabled = meta.story({
	render: (args) => (
		<SegmentedButton {...args}>
			<SegmentedButtonItem selected>Day</SegmentedButtonItem>
			<SegmentedButtonItem disabled>Week</SegmentedButtonItem>
			<SegmentedButtonItem>Month</SegmentedButtonItem>
		</SegmentedButton>
	),
});
