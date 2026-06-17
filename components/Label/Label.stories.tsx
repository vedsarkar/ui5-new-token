import { faker } from "@faker-js/faker";
import { Input, Label } from "@/components";
import preview from "../../.storybook/preview";

faker.seed(88);

const meta = preview.meta({
	component: Label,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: `${faker.person.firstName()} ${faker.person.lastName()}`,
	},
});

export default meta;

export const Default = meta.story({
	args: {
		for: "first-name-input",
	},
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
			<Label {...args}>{args.children}</Label>
			<Input id="first-name-input" placeholder="First name" />
		</div>
	),
});

export const Required = meta.story({
	args: {
		required: true,
		for: "email-input",
		children: "Email address",
	},
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
			<Label {...args}>{args.children}</Label>
			<Input
				id="email-input"
				type="Email"
				placeholder="user@example.com"
				required
			/>
		</div>
	),
});

export const WithColon = meta.story({
	args: {
		showColon: true,
		for: "org-input",
		children: "Organization",
	},
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
			<Label {...args}>{args.children}</Label>
			<Input id="org-input" placeholder="Organization name" />
		</div>
	),
});

export const Wrapping = meta.story({
	args: {
		wrappingType: "Normal",
		children:
			"This is a longer label that describes a complex field and may span more than one line when there is not enough horizontal space",
	},
	render: (args) => (
		<div style={{ width: "200px" }}>
			<Label {...args}>{args.children}</Label>
		</div>
	),
});
