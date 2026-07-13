import { faker } from "@faker-js/faker";
import { fn } from "storybook/test";
import { List, ListItem, ListItemGroup } from "@/components";
import accountIcon from "@/icons/sap/account";
import calendarIcon from "@/icons/sap/calendar";
import emailReadIcon from "@/icons/sap/email-read";
import taskIcon from "@/icons/sap/task";
import preview from "../../.storybook/preview";

faker.seed(42);

const meta = preview.meta({
	component: List,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onItemClick: fn(),
		onSelectionChange: fn(),
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<List {...args}>
			<ListItem>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
		</List>
	),
});

export const SingleSelect = meta.story({
	args: {
		selectionMode: "Single",
	},
	render: (args) => (
		<List {...args}>
			<ListItem selected>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
		</List>
	),
});

export const MultiSelect = meta.story({
	args: {
		selectionMode: "Multiple",
	},
	render: (args) => (
		<List {...args}>
			<ListItem selected>{faker.commerce.department()}</ListItem>
			<ListItem selected>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
			<ListItem>{faker.commerce.department()}</ListItem>
		</List>
	),
});

export const Grouped = meta.story({
	render: (args) => (
		<List {...args}>
			<ListItemGroup headerText="Productivity">
				<ListItem icon={taskIcon}>{faker.hacker.verb()} tasks</ListItem>
				<ListItem icon={calendarIcon}>{faker.hacker.verb()} events</ListItem>
			</ListItemGroup>
			<ListItemGroup headerText="Communication">
				<ListItem icon={emailReadIcon}>{faker.hacker.verb()} messages</ListItem>
				<ListItem icon={accountIcon}>{faker.hacker.verb()} contacts</ListItem>
			</ListItemGroup>
		</List>
	),
});
