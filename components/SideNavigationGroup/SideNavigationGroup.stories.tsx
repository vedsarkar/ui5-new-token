import activityItemsIcon from "@/icons/sap/activity-items";
import businessObjectsExperienceIcon from "@/icons/sap/business-objects-experience";
import groupIcon from "@/icons/sap/group";
import homeIcon from "@/icons/sap/home";
import orgChartIcon from "@/icons/sap/org-chart";
import preview from "../../.storybook/preview";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationItem } from "../SideNavigationItem";
import { SideNavigationGroup } from "./SideNavigationGroup";

const meta = preview.meta({
	component: SideNavigationGroup,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		text: "Explore",
		expanded: true,
	},
	decorators: [
		(Story) => (
			<div style={{ height: "100vh", display: "flex" }}>
				<SideNavigation accessibleName="Main navigation">
					<Story />
				</SideNavigation>
			</div>
		),
	],
});

export default meta;

export const Expanded = meta.story({
	render: (args) => (
		<SideNavigationGroup {...args}>
			<SideNavigationItem text="Home" icon={homeIcon} selected />
			<SideNavigationItem
				text="Entities"
				icon={businessObjectsExperienceIcon}
			/>
			<SideNavigationItem text="Relationships" icon={orgChartIcon} />
		</SideNavigationGroup>
	),
});

export const Collapsed = meta.story({
	args: {
		expanded: false,
	},
	render: (args) => (
		<SideNavigationGroup {...args}>
			<SideNavigationItem text="Home" icon={homeIcon} selected />
			<SideNavigationItem
				text="Entities"
				icon={businessObjectsExperienceIcon}
			/>
			<SideNavigationItem text="Relationships" icon={orgChartIcon} />
		</SideNavigationGroup>
	),
});

export const MultipleGroups = meta.story({
	render: (args) => (
		<>
			<SideNavigationGroup {...args}>
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
		</>
	),
});
