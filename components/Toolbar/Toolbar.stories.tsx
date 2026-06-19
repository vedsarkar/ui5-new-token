import { CheckBox } from "@ui5/webcomponents-react/CheckBox";
import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
import { ToolbarItem } from "@ui5/webcomponents-react/ToolbarItem";
import { ToolbarSelect } from "@ui5/webcomponents-react/ToolbarSelect";
import { ToolbarSelectOption } from "@ui5/webcomponents-react/ToolbarSelectOption";
import { ToolbarSeparator } from "@ui5/webcomponents-react/ToolbarSeparator";
import { ToolbarSpacer } from "@ui5/webcomponents-react/ToolbarSpacer";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/filter.js";

const meta = preview.meta({
	component: Toolbar,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		style: { width: "480px" },
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<Toolbar {...args}>
			<ToolbarButton icon="add" text="Add" design="Emphasized" />
			<ToolbarButton icon="sort" text="Sort" />
			<ToolbarButton icon="filter" text="Filter" />
		</Toolbar>
	),
});

export const WithSpacer = meta.story({
	render: (args) => (
		<Toolbar {...args}>
			<ToolbarButton icon="add" text="Add" design="Emphasized" />
			<ToolbarSpacer />
			<ToolbarButton icon="sort" text="Sort" />
		</Toolbar>
	),
});

export const WithSelectAndSeparator = meta.story({
	render: (args) => (
		<Toolbar {...args}>
			<ToolbarButton icon="add" text="Add" />
			<ToolbarSeparator />
			<ToolbarSelect>
				<ToolbarSelectOption selected>All sources</ToolbarSelectOption>
				<ToolbarSelectOption>CRM</ToolbarSelectOption>
				<ToolbarSelectOption>ERP</ToolbarSelectOption>
			</ToolbarSelect>
		</Toolbar>
	),
});

export const WithCustomItem = meta.story({
	render: (args) => (
		<Toolbar {...args}>
			<ToolbarButton icon="add" text="Add" />
			<ToolbarSpacer />
			<ToolbarItem>
				<CheckBox text="Only verified" />
			</ToolbarItem>
		</Toolbar>
	),
});
