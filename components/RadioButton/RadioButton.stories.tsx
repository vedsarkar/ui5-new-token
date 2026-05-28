import { RadioButton } from "@ui5/webcomponents-react/RadioButton";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: RadioButton,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		text: "Source priority: SAP wins",
		name: "source-priority",
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

export const Group = meta.story({
	args: {
		text: undefined,
	},
	render: () => (
		<div
			role="radiogroup"
			aria-label="Source priority"
			style={{ display: "flex", flexDirection: "column", gap: "8px" }}
		>
			<RadioButton name="src" text="SAP wins" checked />
			<RadioButton name="src" text="Salesforce wins" />
			<RadioButton name="src" text="Workday wins" />
			<RadioButton name="src" text="Most recent wins" />
		</div>
	),
});

export const Required = meta.story({
	args: {
		required: true,
		text: "Required choice",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		checked: true,
		text: "Set by tenant policy",
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		checked: true,
		text: "Read-only state",
	},
});

export const Warning = meta.story({
	args: {
		valueState: "Critical",
		checked: true,
		text: "Will overwrite the current default",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		text: "Required selection",
	},
});

export const Wrapping = meta.story({
	args: {
		wrappingType: "Normal",
		text: "I confirm this priority change will be applied retroactively to every matched entity across all source systems.",
	},
	decorators: [
		(Story) => (
			<div style={{ width: "320px" }}>
				<Story />
			</div>
		),
	],
});
