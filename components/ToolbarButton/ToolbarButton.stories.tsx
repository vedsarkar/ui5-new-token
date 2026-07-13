import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
import addIcon from "@/icons/sap/add";
import sortIcon from "@/icons/sap/sort";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ToolbarButton,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Toolbar style={{ width: "420px" }}>
		<ToolbarButton icon={addIcon} text="Add" design="Emphasized" />
		<ToolbarButton icon={sortIcon} text="Sort" />
	</Toolbar>
));
