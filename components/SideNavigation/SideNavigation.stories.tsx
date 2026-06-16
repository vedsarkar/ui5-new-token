import preview from "../../.storybook/preview";
import { SideNavigationGroup } from "../SideNavigationGroup";
import { SideNavigationItem } from "../SideNavigationItem";
import { SideNavigationSubItem } from "../SideNavigationSubItem";
import { SideNavigation } from "./SideNavigation";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/org-chart.js";
import "@ui5/webcomponents-icons/dist/activity-items.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/log.js";

const meta = preview.meta({
	component: SideNavigation,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		accessibleName: "Main navigation",
	},
	decorators: [
		(Story) => (
			<div style={{ height: "100vh", display: "flex" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Home" icon="home" selected />
			<SideNavigationItem text="Entities" icon="business-objects-experience" />
			<SideNavigationItem text="Relationships" icon="org-chart" />
			<SideNavigationItem text="Activity" icon="activity-items" />
		</SideNavigation>
	),
});

export const WithSubItems = meta.story({
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Home" icon="home" selected />
			<SideNavigationItem
				text="Data Model"
				icon="business-objects-experience"
				expanded
			>
				<SideNavigationSubItem text="Entity Types" />
				<SideNavigationSubItem text="Relationship Types" />
				<SideNavigationSubItem text="Attributes" />
			</SideNavigationItem>
			<SideNavigationItem text="Stewardship" icon="group">
				<SideNavigationSubItem text="Match Groups" />
				<SideNavigationSubItem text="Merge Queue" />
			</SideNavigationItem>
		</SideNavigation>
	),
});

export const WithGroups = meta.story({
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationGroup text="Explore" expanded>
				<SideNavigationItem text="Home" icon="home" selected />
				<SideNavigationItem
					text="Entities"
					icon="business-objects-experience"
				/>
				<SideNavigationItem text="Relationships" icon="org-chart" />
			</SideNavigationGroup>
			<SideNavigationGroup text="Operate" expanded>
				<SideNavigationItem text="Activity" icon="activity-items" />
				<SideNavigationItem text="Stewardship" icon="group" />
			</SideNavigationGroup>
		</SideNavigation>
	),
});

export const Collapsable = meta.story({
	args: {
		collapsable: true,
	},
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Home" icon="home" tooltip="Home" selected />
			<SideNavigationItem
				text="Entities"
				icon="business-objects-experience"
				tooltip="Entities"
			/>
			<SideNavigationItem
				text="Relationships"
				icon="org-chart"
				tooltip="Relationships"
			/>
			<SideNavigationItem
				text="Activity"
				icon="activity-items"
				tooltip="Activity"
			/>
		</SideNavigation>
	),
});

export const ItemStates = meta.story({
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Selected" icon="home" selected />
			<SideNavigationItem text="Default" icon="business-objects-experience" />
			<SideNavigationItem text="Disabled" icon="org-chart" disabled />
			<SideNavigationItem
				text="External link"
				icon="log"
				href="https://www.reltio.com"
				target="_blank"
				unselectable
			/>
			<SideNavigationItem
				text="Action"
				icon="add"
				design="Action"
				unselectable
			/>
		</SideNavigation>
	),
});

export const WithoutIcons = meta.story({
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Overview" selected />
			<SideNavigationItem text="Sources" />
			<SideNavigationItem text="Survivorship" />
			<SideNavigationItem text="Source Priority" />
		</SideNavigation>
	),
});
