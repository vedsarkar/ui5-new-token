import { ComboBox } from "@ui5/webcomponents-react/ComboBox";
import { ComboBoxItem } from "@ui5/webcomponents-react/ComboBoxItem";
import { ComboBoxItemGroup } from "@ui5/webcomponents-react/ComboBoxItemGroup";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ComboBox,
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "Pick a source system",
		onChange: fn(),
		onSelectionChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "320px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItem text="SAP" />
			<ComboBoxItem text="Salesforce" />
			<ComboBoxItem text="Workday" />
			<ComboBoxItem text="Oracle EBS" />
			<ComboBoxItem text="Internal CRM" />
		</ComboBox>
	),
});

export const WithAdditionalText = meta.story({
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItem text="SAP" additionalText="ERP" />
			<ComboBoxItem text="Salesforce" additionalText="CRM" />
			<ComboBoxItem text="Workday" additionalText="HCM" />
			<ComboBoxItem text="Oracle EBS" additionalText="ERP" />
		</ComboBox>
	),
});

export const Grouped = meta.story({
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItemGroup headerText="ERP">
				<ComboBoxItem text="SAP" />
				<ComboBoxItem text="Oracle EBS" />
			</ComboBoxItemGroup>
			<ComboBoxItemGroup headerText="CRM">
				<ComboBoxItem text="Salesforce" />
				<ComboBoxItem text="Internal CRM" />
			</ComboBoxItemGroup>
			<ComboBoxItemGroup headerText="HCM">
				<ComboBoxItem text="Workday" />
			</ComboBoxItemGroup>
		</ComboBox>
	),
});

export const StartsWithFiltering = meta.story({
	args: {
		filter: "StartsWith",
	},
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItem text="SAP" />
			<ComboBoxItem text="Salesforce" />
			<ComboBoxItem text="Workday" />
			<ComboBoxItem text="Oracle EBS" />
		</ComboBox>
	),
});

export const Required = meta.story({
	args: {
		required: true,
	},
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItem text="SAP" />
			<ComboBoxItem text="Salesforce" />
		</ComboBox>
	),
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		value: "SAP",
	},
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItem text="SAP" />
			<ComboBoxItem text="Salesforce" />
		</ComboBox>
	),
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		value: "SAP",
	},
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItem text="SAP" />
			<ComboBoxItem text="Salesforce" />
		</ComboBox>
	),
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		value: "Unknown system",
	},
	render: (args) => (
		<ComboBox {...args}>
			<ComboBoxItem text="SAP" />
			<ComboBoxItem text="Salesforce" />
		</ComboBox>
	),
});
