import { CheckBox } from "@ui5/webcomponents-react/CheckBox";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: CheckBox,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		text: "Include archived records",
		onChange: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const Checked = meta.story({
	args: {
		checked: true,
	},
});

export const Indeterminate = meta.story({
	args: {
		indeterminate: true,
		checked: true,
		text: "Select all sources (partial)",
	},
});

export const Required = meta.story({
	args: {
		required: true,
		text: "I confirm the source priority change",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		checked: true,
		text: "Unavailable in this tenant",
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		checked: true,
		text: "Set by tenant policy",
	},
});

export const Warning = meta.story({
	args: {
		valueState: "Critical",
		text: "Apply to all matched entities",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		text: "Required confirmation",
	},
});

export const Wrapping = meta.story({
	args: {
		wrappingType: "Normal",
		text: "I understand that this action cannot be undone and will affect all child records inherited from this source.",
	},
	decorators: [
		(Story) => (
			<div style={{ width: "320px" }}>
				<Story />
			</div>
		),
	],
});

export const InGroup = meta.story({
	args: {
		text: undefined,
	},
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
			<CheckBox text="SAP" checked />
			<CheckBox text="Salesforce" checked />
			<CheckBox text="Workday" />
			<CheckBox text="Internal CRM" />
		</div>
	),
});
