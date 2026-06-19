import { ComboBox } from "@ui5/webcomponents-react/ComboBox";
import { ComboBoxItem } from "@ui5/webcomponents-react/ComboBoxItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ComboBoxItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<ComboBox style={{ width: "240px" }}>
		<ComboBoxItem text="Active" />
		<ComboBoxItem text="Pending" />
		<ComboBoxItem text="Archived" />
	</ComboBox>
));
