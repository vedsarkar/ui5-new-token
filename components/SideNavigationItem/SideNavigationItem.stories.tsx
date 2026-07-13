import addIcon from "@/icons/sap/add";
import businessObjectsExperienceIcon from "@/icons/sap/business-objects-experience";
import homeIcon from "@/icons/sap/home";
import logIcon from "@/icons/sap/log";
import orgChartIcon from "@/icons/sap/org-chart";
import preview from "../../.storybook/preview";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationSubItem } from "../SideNavigationSubItem";
import { SideNavigationItem } from "./SideNavigationItem";

const meta = preview.meta({
	component: SideNavigationItem,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		text: "Entities",
		icon: businessObjectsExperienceIcon,
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

export const Default = meta.story({});

export const Selected = meta.story({
	args: {
		text: "Home",
		icon: homeIcon,
		selected: true,
	},
});

export const Disabled = meta.story({
	args: {
		text: "Relationships",
		icon: orgChartIcon,
		disabled: true,
	},
});

export const ExternalLink = meta.story({
	args: {
		text: "External link",
		icon: logIcon,
		href: "https://www.reltio.com",
		target: "_blank",
		unselectable: true,
	},
});

export const Action = meta.story({
	args: {
		text: "Add app",
		icon: addIcon,
		design: "Action",
		unselectable: true,
	},
});

export const WithoutIcon = meta.story({
	args: {
		text: "Overview",
		icon: undefined,
		selected: true,
	},
});

export const WithSubItems = meta.story({
	args: {
		text: "Data Model",
		icon: businessObjectsExperienceIcon,
		expanded: true,
	},
	render: (args) => (
		<SideNavigationItem {...args}>
			<SideNavigationSubItem text="Entity Types" />
			<SideNavigationSubItem text="Relationship Types" />
			<SideNavigationSubItem text="Attributes" />
		</SideNavigationItem>
	),
});
