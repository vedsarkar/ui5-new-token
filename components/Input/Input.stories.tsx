import { Input } from "@ui5/webcomponents-react/Input";
import { SuggestionItem } from "@ui5/webcomponents-react/SuggestionItem";
import { SuggestionItemGroup } from "@ui5/webcomponents-react/SuggestionItemGroup";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Input,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "First name",
		onChange: fn(),
		onInput: fn(),
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

export const Default = meta.story({});

export const WithValue = meta.story({
	args: {
		value: "Jane",
	},
});

export const Email = meta.story({
	args: {
		type: "Email",
		placeholder: "Reltio account email",
	},
});

export const NumberType = meta.story({
	args: {
		type: "Number",
		placeholder: "Match score (0–100)",
	},
});

export const Password = meta.story({
	args: {
		type: "Password",
		placeholder: "API client secret",
	},
});

export const WithSuggestions = meta.story({
	args: {
		showSuggestions: true,
		placeholder: "Pick an entity type",
	},
	render: (args) => (
		<Input {...args}>
			<SuggestionItem text="Organization" />
			<SuggestionItem text="Individual" />
			<SuggestionItem text="Product" />
			<SuggestionItem text="Location" />
		</Input>
	),
});

export const GroupedSuggestions = meta.story({
	args: {
		showSuggestions: true,
		placeholder: "Pick a Reltio attribute",
	},
	render: (args) => (
		<Input {...args}>
			<SuggestionItemGroup headerText="Identity">
				<SuggestionItem text="firstName" />
				<SuggestionItem text="lastName" />
				<SuggestionItem text="email" />
			</SuggestionItemGroup>
			<SuggestionItemGroup headerText="Address">
				<SuggestionItem text="streetAddress" />
				<SuggestionItem text="city" />
				<SuggestionItem text="postalCode" />
			</SuggestionItemGroup>
		</Input>
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
		value: "Jane Doe",
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		value: "Jane Doe",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		value: "jane.doe",
		placeholder: "Email is invalid",
	},
});
