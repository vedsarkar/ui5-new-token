import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarSelect } from "@ui5/webcomponents-react/ToolbarSelect";
import { ToolbarSelectOption } from "@ui5/webcomponents-react/ToolbarSelectOption";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ToolbarSelect,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Toolbar style={{ width: "420px" }}>
		<ToolbarSelect>
			<ToolbarSelectOption selected>All sources</ToolbarSelectOption>
			<ToolbarSelectOption>CRM</ToolbarSelectOption>
			<ToolbarSelectOption>ERP</ToolbarSelectOption>
		</ToolbarSelect>
	</Toolbar>
));
