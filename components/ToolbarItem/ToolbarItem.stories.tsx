import { CheckBox } from "@ui5/webcomponents-react/CheckBox";
import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarItem } from "@ui5/webcomponents-react/ToolbarItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ToolbarItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Toolbar style={{ width: "420px" }}>
		<ToolbarItem>
			<CheckBox text="Only verified" />
		</ToolbarItem>
	</Toolbar>
));
