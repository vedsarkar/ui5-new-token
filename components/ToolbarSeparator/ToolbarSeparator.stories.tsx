import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
import { ToolbarSeparator } from "@ui5/webcomponents-react/ToolbarSeparator";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/sort.js";

const meta = preview.meta({
	component: ToolbarSeparator,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Toolbar style={{ width: "420px" }}>
		<ToolbarButton icon="add" text="Add" />
		<ToolbarSeparator />
		<ToolbarButton icon="sort" text="Sort" />
	</Toolbar>
));
