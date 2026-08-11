import activityItemsIcon from "@/icons/sap/activity-items";
import addIcon from "@/icons/sap/add";
import businessObjectsExperienceIcon from "@/icons/sap/business-objects-experience";
import groupIcon from "@/icons/sap/group";
import homeIcon from "@/icons/sap/home";
import logIcon from "@/icons/sap/log";
import orgChartIcon from "@/icons/sap/org-chart";
import preview from "../../.storybook/preview";
import { SideNavigationGroup } from "../SideNavigationGroup";
import { SideNavigationItem } from "../SideNavigationItem";
import { SideNavigationSubItem } from "../SideNavigationSubItem";
import { SideNavigation } from "./SideNavigation";

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
			<SideNavigationItem text="Home" icon={homeIcon} selected />
			<SideNavigationItem
				text="Entities"
				icon={businessObjectsExperienceIcon}
			/>
			<SideNavigationItem text="Relationships" icon={orgChartIcon} />
			<SideNavigationItem text="Activity" icon={activityItemsIcon} />
		</SideNavigation>
	),
});

export const WithSubItems = meta.story({
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Home" icon={homeIcon} selected />
			<SideNavigationItem
				text="Data Model"
				icon={businessObjectsExperienceIcon}
				expanded
			>
				<SideNavigationSubItem text="Entity Types" />
				<SideNavigationSubItem text="Relationship Types" />
				<SideNavigationSubItem text="Attributes" />
			</SideNavigationItem>
			<SideNavigationItem text="Stewardship" icon={groupIcon}>
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
				<SideNavigationItem text="Home" icon={homeIcon} selected />
				<SideNavigationItem
					text="Entities"
					icon={businessObjectsExperienceIcon}
				/>
				<SideNavigationItem text="Relationships" icon={orgChartIcon} />
			</SideNavigationGroup>
			<SideNavigationGroup text="Operate" expanded>
				<SideNavigationItem text="Activity" icon={activityItemsIcon} />
				<SideNavigationItem text="Stewardship" icon={groupIcon} />
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
			<SideNavigationItem text="Home" icon={homeIcon} tooltip="Home" selected />
			<SideNavigationItem
				text="Entities"
				icon={businessObjectsExperienceIcon}
				tooltip="Entities"
			/>
			<SideNavigationItem
				text="Relationships"
				icon={orgChartIcon}
				tooltip="Relationships"
			/>
			<SideNavigationItem
				text="Activity"
				icon={activityItemsIcon}
				tooltip="Activity"
			/>
		</SideNavigation>
	),
});

export const CollapsedByDefault = meta.story({
	args: {
		collapsable: true,
		defaultCollapsed: true,
	},
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Home" icon={homeIcon} tooltip="Home" selected />
			<SideNavigationItem
				text="Entities"
				icon={businessObjectsExperienceIcon}
				tooltip="Entities"
			/>
			<SideNavigationItem
				text="Relationships"
				icon={orgChartIcon}
				tooltip="Relationships"
			/>
			<SideNavigationItem
				text="Activity"
				icon={activityItemsIcon}
				tooltip="Activity"
			/>
		</SideNavigation>
	),
});

export const ItemStates = meta.story({
	render: (args) => (
		<SideNavigation {...args}>
			<SideNavigationItem text="Selected" icon={homeIcon} selected />
			<SideNavigationItem text="Default" icon={businessObjectsExperienceIcon} />
			<SideNavigationItem text="Disabled" icon={orgChartIcon} disabled />
			<SideNavigationItem
				text="External link"
				icon={logIcon}
				href="https://www.reltio.com"
				target="_blank"
				unselectable
			/>
			<SideNavigationItem
				text="Action"
				icon={addIcon}
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
