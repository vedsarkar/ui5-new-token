import preview from "../../.storybook/preview";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationSubItem } from "../SideNavigationSubItem";
import { SideNavigationItem } from "./SideNavigationItem";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/org-chart.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/log.js";

const meta = preview.meta({
	component: SideNavigationItem,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		text: "Entities",
		icon: "business-objects-experience",
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
		icon: "home",
		selected: true,
	},
});

export const Disabled = meta.story({
	args: {
		text: "Relationships",
		icon: "org-chart",
		disabled: true,
	},
});

export const ExternalLink = meta.story({
	args: {
		text: "External link",
		icon: "log",
		href: "https://www.reltio.com",
		target: "_blank",
		unselectable: true,
	},
});

export const Action = meta.story({
	args: {
		text: "Add app",
		icon: "add",
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
		icon: "business-objects-experience",
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
