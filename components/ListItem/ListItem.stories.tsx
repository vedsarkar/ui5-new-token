import { faker } from "@faker-js/faker";
import { fn } from "storybook/test";
import { List, ListItem } from "@/components";
import accountIcon from "@/icons/sap/account";
import inboxIcon from "@/icons/sap/inbox";
import preview from "../../.storybook/preview";

faker.seed(42);

const meta = preview.meta({
	component: ListItem,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onClick: fn(),
	},
	decorators: [
		(Story) => (
			<List style={{ width: "320px" }}>
				<Story />
			</List>
		),
	],
});

export default meta;

export const Default = meta.story({
	args: {
		children: faker.commerce.department(),
	},
});

export const WithIcon = meta.story({
	args: {
		icon: inboxIcon,
		children: faker.commerce.department(),
	},
});

export const WithDescription = meta.story({
	args: {
		icon: accountIcon,
		children: faker.person.fullName(),
		description: faker.internet.email(),
	},
});

export const WithAdditionalText = meta.story({
	args: {
		children: faker.commerce.department(),
		additionalText: "12",
		additionalTextState: "Information",
	},
});

export const Selected = meta.story({
	args: {
		selected: true,
		children: faker.commerce.department(),
	},
});

export const CustomContent = meta.story({
	render: (args) => (
		<ListItem {...args}>
			<span style={{ fontWeight: 600 }}>{faker.company.name()}</span> —{" "}
			<span style={{ color: "var(--sapContent_LabelColor)" }}>
				{faker.location.city()}
			</span>
		</ListItem>
	),
});
