import { faker } from "@faker-js/faker";
import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { expect, fn, userEvent, waitFor } from "storybook/test";
import preview from "../../.storybook/preview";
import { AppNavigation } from "../AppNavigation";
import { AppSelector } from "../AppSelector";
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

// Application catalog as returned by the Reltio Config Service. `AppNavigation`
// reads only `name` and `url` and resolves each icon internally.
const appCatalog = [
	{
		name: "Configuration",
		items: [
			{ name: "UI Modeler", url: "https://console.reltio.com/uimodeler" },
			{ name: "Data Modeler", url: "https://console.reltio.com/datamodeler" },
			{
				name: "Workflow Modeler",
				url: "https://console.reltio.com/bpmnmodeler",
			},
		],
	},
	{
		name: "Tenant Management",
		items: [
			{ name: "Data Loader", url: "https://console.reltio.com/dataloader" },
			{ name: "Export", url: "https://console.reltio.com/export" },
			{
				name: "Performance Monitoring",
				url: "https://console.reltio.com/monitoring",
			},
		],
	},
	{
		name: "Security",
		items: [
			{
				name: "User Management",
				url: "https://console.reltio.com/userManagement",
			},
			{ name: "SSO Configuration", url: "https://console.reltio.com/sso" },
		],
	},
];

// The same catalog flattened into the `AppSelector` shape (flat list with a
// `category` per app and `uri` instead of `url`), so the popup grid mirrors the
// left-drawer list driven by `AppNavigation`. Unlike `AppNavigation` (which
// resolves a monochrome Reltio icon internally), `AppSelector` shows the real
// full-color app artwork served from `reltio.design/apps/icons/<slug>.svg`.
const appSelectorApps = appCatalog.flatMap((group) =>
	(group.items ?? []).map((item) => ({
		name: item.name,
		uri: item.url,
		category: group.name,
		icon: `https://reltio.design/apps/icons/${item.name
			.toLowerCase()
			.replace(/\s+/g, "-")}.svg`,
	})),
);

export const WithAppNavigation = meta.story({
	args: {
		primaryTitle: "Console",
		userMenu: (
			<UserMenu onSignOut={fn()} user={shellBarUser} appVersion="2.21.3" />
		),
		children: <AppSelector apps={appSelectorApps} positionArea="bottom" />,
		sideNavigation: (
			<AppNavigation
				apps={appCatalog}
				homeUrl="https://console.reltio.com/home"
			/>
		),
	},
	render: (args) => (
		<>
			<ShellBar {...args} />
			<div style={{ padding: "24px 32px" }}>
				<h2 style={{ margin: 0 }}>Console</h2>
				<p>
					Two views of the same app catalog: the left drawer (open it from the
					top-left hamburger) is built by <code>AppNavigation</code> as a
					persistent grouped menu, while the grid button in the header opens the{" "}
					<code>AppSelector</code> popup for quick switching. Both are fed by
					the same Config Service data.
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
