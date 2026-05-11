import { MultiComboBox } from "@ui5/webcomponents-react/MultiComboBox";
import { MultiComboBoxItem } from "@ui5/webcomponents-react/MultiComboBoxItem";
import { MultiComboBoxItemGroup } from "@ui5/webcomponents-react/MultiComboBoxItemGroup";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MultiComboBox,
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "Source systems",
		onChange: fn(),
		onSelectionChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "380px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" />
			<MultiComboBoxItem text="Salesforce" />
			<MultiComboBoxItem text="Workday" />
			<MultiComboBoxItem text="Oracle EBS" />
			<MultiComboBoxItem text="Internal CRM" />
		</MultiComboBox>
	),
});

export const Preselected = meta.story({
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" selected />
			<MultiComboBoxItem text="Salesforce" selected />
			<MultiComboBoxItem text="Workday" />
			<MultiComboBoxItem text="Oracle EBS" />
		</MultiComboBox>
	),
});

export const Grouped = meta.story({
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItemGroup headerText="ERP">
				<MultiComboBoxItem text="SAP" />
				<MultiComboBoxItem text="Oracle EBS" />
			</MultiComboBoxItemGroup>
			<MultiComboBoxItemGroup headerText="CRM">
				<MultiComboBoxItem text="Salesforce" />
				<MultiComboBoxItem text="Internal CRM" />
			</MultiComboBoxItemGroup>
			<MultiComboBoxItemGroup headerText="HCM">
				<MultiComboBoxItem text="Workday" />
			</MultiComboBoxItemGroup>
		</MultiComboBox>
	),
});

export const ShowSelectAll = meta.story({
	args: {
		showSelectAll: true,
	},
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" />
			<MultiComboBoxItem text="Salesforce" />
			<MultiComboBoxItem text="Workday" />
			<MultiComboBoxItem text="Oracle EBS" />
		</MultiComboBox>
	),
});

export const ContainsFilter = meta.story({
	args: {
		filter: "Contains",
	},
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" />
			<MultiComboBoxItem text="Salesforce" />
			<MultiComboBoxItem text="Workday" />
			<MultiComboBoxItem text="Oracle EBS" />
		</MultiComboBox>
	),
});

export const Required = meta.story({
	args: {
		required: true,
	},
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" />
			<MultiComboBoxItem text="Salesforce" />
		</MultiComboBox>
	),
});

export const Disabled = meta.story({
	args: {
		disabled: true,
	},
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" selected />
			<MultiComboBoxItem text="Salesforce" />
		</MultiComboBox>
	),
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
	},
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" selected />
			<MultiComboBoxItem text="Salesforce" selected />
		</MultiComboBox>
	),
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
	},
	render: (args) => (
		<MultiComboBox {...args}>
			<MultiComboBoxItem text="SAP" />
			<MultiComboBoxItem text="Salesforce" />
		</MultiComboBox>
	),
});
