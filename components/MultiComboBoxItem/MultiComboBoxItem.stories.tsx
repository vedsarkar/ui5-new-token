import { MultiComboBox } from "@ui5/webcomponents-react/MultiComboBox";
import { MultiComboBoxItem } from "@ui5/webcomponents-react/MultiComboBoxItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MultiComboBoxItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<MultiComboBox style={{ width: "260px" }}>
		<MultiComboBoxItem text="CRM" selected />
		<MultiComboBoxItem text="ERP" />
		<MultiComboBoxItem text="Marketing" />
	</MultiComboBox>
));
