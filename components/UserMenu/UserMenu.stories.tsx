import { faker } from "@faker-js/faker";
import { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem";
import { fn } from "storybook/test";
import preview from "@/.storybook/preview";
import { UserMenu } from "./UserMenu";

faker.seed(10);

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

const user = {
	username: `${firstName} ${lastName}`,
	email: faker.internet
		.email({ firstName, lastName, provider: "sap.com" })
		.toLowerCase(),
};

const meta = preview.meta({
	component: UserMenu,
	parameters: { layout: "centered", dualTheme: true },
	args: {
		onSignOut: fn(),
		user,
		appVersion: "2.21.3",
	},
});

export default meta;

export const Default = meta.story({});

export const WithAvatarImage = meta.story({
	args: {
		user: {
			...user,
			avatarUrl: faker.image.avatar(),
		},
	},
});

export const WithCustomMenuItems = meta.story({
	args: {
		onItemClick: fn(),
	},
	render: (args) => (
		<UserMenu {...args}>
			<UserMenuItem
				text="Settings"
				icon="action-settings"
				data-href="/settings"
			/>
			<UserMenuItem text="Help" icon="sys-help" data-href="/help" />
		</UserMenu>
	),
});
