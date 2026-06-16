import { faker } from "@faker-js/faker";
import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { expect, fn, userEvent, waitFor } from "storybook/test";
import preview from "../../.storybook/preview";
import { SideNavigation } from "../SideNavigation";
import { SideNavigationGroup } from "../SideNavigationGroup";
import { SideNavigationItem } from "../SideNavigationItem";
import type { TenantEntry } from "../TenantSelector";
import { TenantSelector } from "../TenantSelector";
import { UserMenu } from "../UserMenu";
import { ShellBar } from "./ShellBar";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/database.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/shield.js";

faker.seed(7);

const shellBarUserFirstName = faker.person.firstName();
const shellBarUserLastName = faker.person.lastName();
const shellBarUser = {
	username: `${shellBarUserFirstName} ${shellBarUserLastName}`,
	email: faker.internet
		.email({
			firstName: shellBarUserFirstName,
			lastName: shellBarUserLastName,
			provider: "sap.com",
		})
		.toLowerCase(),
};

const meta = preview.meta({
	component: ShellBar,
	parameters: { layout: "fullscreen" },
	args: {
		onLogoClick: fn(),
	},
});

export default meta;

export const Default = meta.story({
	args: {
		primaryTitle: "Console",
		userMenu: (
			<UserMenu onSignOut={fn()} user={shellBarUser} appVersion="2.21.3" />
		),
	},
});

export const Minimal = meta.story({
	args: {
		primaryTitle: "Console",
	},
});

export const CustomBranding = meta.story({
	args: {
		primaryTitle: "Acme Module",
		logo: <Avatar initials="A" colorScheme="Accent1" size="XS" />,
	},
});

export const WithNavigation = meta.story({
	args: {
		primaryTitle: "Console",
		userMenu: (
			<UserMenu onSignOut={fn()} user={shellBarUser} appVersion="2.21.3" />
		),
		sideNavigation: (
			<SideNavigation accessibleName="Main navigation">
				<SideNavigationItem text="Home" icon="home" href="/home" selected />
				<SideNavigationGroup text="Configuration" expanded>
					<SideNavigationItem
						text="UI Modeler"
						icon="product"
						href="/ui-modeler"
					/>
					<SideNavigationItem
						text="Data Modeler"
						icon="database"
						href="/data-modeler"
					/>
				</SideNavigationGroup>
				<SideNavigationGroup text="Security" expanded>
					<SideNavigationItem
						text="User Management"
						icon="employee"
						href="/users"
					/>
					<SideNavigationItem
						text="SSO Configuration"
						icon="shield"
						href="/sso"
					/>
				</SideNavigationGroup>
			</SideNavigation>
		),
	},
	render: (args) => (
		<>
			<ShellBar {...args} />
			<div style={{ padding: "24px 32px" }}>
				<h2 style={{ margin: 0 }}>Console</h2>
				<p>
					Use the hamburger in the top-left corner to open the navigation
					drawer. It slides in from the left and dims this content.
				</p>
			</div>
		</>
	),
});

const shellBarTenants: TenantEntry[] = Array.from({ length: 4 }, () => ({
	customerName: faker.company.name(),
	tenantName: `${faker.commerce.department().toLowerCase()}-${faker.string.alpha({ length: 3, casing: "lower" })}`,
	tenantId: faker.string.alphanumeric(12),
	environment: faker.helpers.arrayElement([
		"EUS102-DEVELOP",
		"EUS105-PRODUCTION",
		"WUS201-STAGING",
	]),
}));

export const WithTenantSelector = meta.story({
	args: {
		primaryTitle: "Console",
		userMenu: (
			<UserMenu onSignOut={fn()} user={shellBarUser} appVersion="2.21.3" />
		),
		tenantSelector: (
			<TenantSelector
				onSelect={fn()}
				selectedTenantId={shellBarTenants[0].tenantId}
				tenants={shellBarTenants}
			/>
		),
	},
});

export const WithUserMenu = meta.story({
	play: async ({ canvasElement }) => {
		const avatar = canvasElement.querySelector("ui5-avatar") as HTMLElement;
		await userEvent.click(avatar);
		await waitFor(() => {
			const menu = document.querySelector("ui5-user-menu");
			expect(menu && (menu as unknown as { open: boolean }).open).toBeTruthy();
		});
	},
	args: {
		primaryTitle: "Console",
		userMenu: (
			<UserMenu onSignOut={fn()} user={shellBarUser} appVersion="2.21.3" />
		),
	},
});
