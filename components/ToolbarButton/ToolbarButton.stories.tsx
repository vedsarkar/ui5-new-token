import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/sort.js";

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
		<ToolbarButton icon="add" text="Add" design="Emphasized" />
		<ToolbarButton icon="sort" text="Sort" />
	</Toolbar>
));
