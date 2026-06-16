import preview from "../../.storybook/preview";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationItem } from "../SideNavigationItem";
import { SideNavigationGroup } from "./SideNavigationGroup";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/org-chart.js";
import "@ui5/webcomponents-icons/dist/activity-items.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";

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
			<SideNavigationItem text="Home" icon="home" selected />
			<SideNavigationItem text="Entities" icon="business-objects-experience" />
			<SideNavigationItem text="Relationships" icon="org-chart" />
		</SideNavigationGroup>
	),
});

export const Collapsed = meta.story({
	args: {
		expanded: false,
	},
	render: (args) => (
		<SideNavigationGroup {...args}>
			<SideNavigationItem text="Home" icon="home" selected />
			<SideNavigationItem text="Entities" icon="business-objects-experience" />
			<SideNavigationItem text="Relationships" icon="org-chart" />
		</SideNavigationGroup>
	),
});

export const MultipleGroups = meta.story({
	render: (args) => (
		<>
			<SideNavigationGroup {...args}>
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
		</>
	),
});
