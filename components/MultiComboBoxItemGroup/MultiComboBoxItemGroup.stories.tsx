import { MultiComboBox } from "@ui5/webcomponents-react/MultiComboBox";
import { MultiComboBoxItem } from "@ui5/webcomponents-react/MultiComboBoxItem";
import { MultiComboBoxItemGroup } from "@ui5/webcomponents-react/MultiComboBoxItemGroup";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MultiComboBoxItemGroup,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<MultiComboBox style={{ width: "260px" }}>
		<MultiComboBoxItemGroup headerText="Sources">
			<MultiComboBoxItem text="CRM" />
			<MultiComboBoxItem text="ERP" />
		</MultiComboBoxItemGroup>
	</MultiComboBox>
));
