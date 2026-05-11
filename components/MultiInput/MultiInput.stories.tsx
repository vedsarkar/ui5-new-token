import { MultiInput } from "@ui5/webcomponents-react/MultiInput";
import { SuggestionItem } from "@ui5/webcomponents-react/SuggestionItem";
import { Token } from "@ui5/webcomponents-react/Token";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MultiInput,
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "Add reviewers…",
		onChange: fn(),
		onInput: fn(),
		onTokenDelete: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "420px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const WithTokens = meta.story({
	render: (args) => (
		<MultiInput {...args}>
			<Token text="jane.doe@example.com" slot="tokens" />
			<Token text="john.smith@example.com" slot="tokens" />
			<Token text="qa-team@example.com" slot="tokens" />
		</MultiInput>
	),
});

export const WithSuggestions = meta.story({
	args: {
		showSuggestions: true,
		placeholder: "Pick reviewers",
	},
	render: (args) => (
		<MultiInput {...args}>
			<Token text="jane.doe@example.com" slot="tokens" />
			<SuggestionItem text="john.smith@example.com" />
			<SuggestionItem text="qa-team@example.com" />
			<SuggestionItem text="data-stewards@example.com" />
		</MultiInput>
	),
});

export const WithValueHelp = meta.story({
	args: {
		showValueHelpIcon: true,
		placeholder: "Choose tags…",
	},
	render: (args) => (
		<MultiInput {...args}>
			<Token text="priority:high" slot="tokens" />
			<Token text="status:in-review" slot="tokens" />
		</MultiInput>
	),
});

export const Required = meta.story({
	args: {
		required: true,
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
	},
	render: (args) => (
		<MultiInput {...args}>
			<Token text="archived" slot="tokens" />
			<Token text="readonly" slot="tokens" />
		</MultiInput>
	),
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
	},
	render: (args) => (
		<MultiInput {...args}>
			<Token text="tenant-default" slot="tokens" />
			<Token text="locked" slot="tokens" />
		</MultiInput>
	),
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
	},
	render: (args) => (
		<MultiInput {...args}>
			<Token text="not-a-valid-email" slot="tokens" />
		</MultiInput>
	),
});
