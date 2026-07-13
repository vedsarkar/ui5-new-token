import { Option } from "@ui5/webcomponents-react/Option";
import { OptionCustom } from "@ui5/webcomponents-react/OptionCustom";
import { Select } from "@ui5/webcomponents-react/Select";
import { fn } from "storybook/test";
import customerIcon from "@/icons/sap/customer";
import databaseIcon from "@/icons/sap/database";
import employeeIcon from "@/icons/sap/employee";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Select,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		accessibleName: "Entity type",
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "280px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<Select {...args}>
			<Option>Organization</Option>
			<Option>Individual</Option>
			<Option>Product</Option>
			<Option>Location</Option>
		</Select>
	),
});

export const Preselected = meta.story({
	render: (args) => (
		<Select {...args}>
			<Option>Organization</Option>
			<Option selected>Individual</Option>
			<Option>Product</Option>
		</Select>
	),
});

export const WithIcons = meta.story({
	render: (args) => (
		<Select {...args}>
			<Option icon={databaseIcon}>Organization</Option>
			<Option icon={employeeIcon}>Individual</Option>
			<Option icon={customerIcon}>Customer</Option>
		</Select>
	),
});

export const WithAdditionalText = meta.story({
	render: (args) => (
		<Select {...args}>
			<Option additionalText="org">Organization</Option>
			<Option additionalText="ind">Individual</Option>
			<Option additionalText="prod">Product</Option>
		</Select>
	),
});

export const CustomOptionLayout = meta.story({
	render: (args) => (
		<Select {...args}>
			<OptionCustom>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "2px",
					}}
				>
					<span style={{ fontWeight: 600 }}>Organization</span>
					<span
						style={{
							fontSize: "11px",
							color: "var(--sapContent_LabelColor)",
						}}
					>
						Companies, partners, subsidiaries
					</span>
				</div>
			</OptionCustom>
			<OptionCustom>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "2px",
					}}
				>
					<span style={{ fontWeight: 600 }}>Individual</span>
					<span
						style={{
							fontSize: "11px",
							color: "var(--sapContent_LabelColor)",
						}}
					>
						People, contacts, leads
					</span>
				</div>
			</OptionCustom>
		</Select>
	),
});

export const Required = meta.story({
	args: {
		required: true,
	},
	render: (args) => (
		<Select {...args}>
			<Option>Organization</Option>
			<Option>Individual</Option>
		</Select>
	),
});

export const Disabled = meta.story({
	args: {
		disabled: true,
	},
	render: (args) => (
		<Select {...args}>
			<Option selected>Organization</Option>
			<Option>Individual</Option>
		</Select>
	),
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
	},
	render: (args) => (
		<Select {...args}>
			<Option selected>Organization</Option>
			<Option>Individual</Option>
		</Select>
	),
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
	},
	render: (args) => (
		<Select {...args}>
			<Option>Organization</Option>
			<Option>Individual</Option>
		</Select>
	),
});
