import { ComboBox } from "@ui5/webcomponents-react/ComboBox";
import { ComboBoxItem } from "@ui5/webcomponents-react/ComboBoxItem";
import { ComboBoxItemGroup } from "@ui5/webcomponents-react/ComboBoxItemGroup";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ComboBoxItemGroup,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<ComboBox style={{ width: "240px" }}>
		<ComboBoxItemGroup headerText="Status">
			<ComboBoxItem text="Active" />
			<ComboBoxItem text="Pending" />
		</ComboBoxItemGroup>
		<ComboBoxItemGroup headerText="Lifecycle">
			<ComboBoxItem text="Archived" />
		</ComboBoxItemGroup>
	</ComboBox>
));
