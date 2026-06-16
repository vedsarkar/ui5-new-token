import preview from "../../.storybook/preview";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationItem } from "../SideNavigationItem";
import { SideNavigationSubItem } from "./SideNavigationSubItem";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";

const meta = preview.meta({
	component: SideNavigationSubItem,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		text: "Entity Types",
	},
	decorators: [
		(Story) => (
			<div style={{ height: "100vh", display: "flex" }}>
				<SideNavigation accessibleName="Main navigation">
					<SideNavigationItem
						text="Data Model"
						icon="business-objects-experience"
						expanded
					>
						<Story />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const Selected = meta.story({
	args: {
		text: "Entity Types",
		selected: true,
	},
});

export const Disabled = meta.story({
	args: {
		text: "Attributes",
		disabled: true,
	},
});

export const Multiple = meta.story({
	render: () => (
		<>
			<SideNavigationSubItem text="Entity Types" selected />
			<SideNavigationSubItem text="Relationship Types" />
			<SideNavigationSubItem text="Attributes" />
		</>
	),
});
