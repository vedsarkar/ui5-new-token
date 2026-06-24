import preview from "@/.storybook/preview";
import { AppNavigation } from "./AppNavigation";

// Sample payload mirroring the Reltio Config Service response. `AppNavigation`
// reads only `name` and `url` from each app; every other field is ignored.
const apps = [
	{
		name: "Configuration",
		items: [
			{
				name: "UI Modeler",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/uimodeler?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Data Modeler",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/datamodeler?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Workflow Modeler",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/bpmnmodeler?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Notification Management",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/notificationMgmt?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Data Sharing",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/data-out/data-share/?env=${environment}&tenant=${tenant}",
			},
		],
	},
	{
		name: "Tenant Management",
		items: [
			{
				name: "Tenant Management",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/env/statistics?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Data Loader",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/dataloader/projects?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Export",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/export?env=${environment}&tenant=${tenant}",
			},
			{
				name: "External Match",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/externalMatch/?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Performance Monitoring",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/monitoring?env=${environment}&tenant=${tenant}",
			},
		],
	},
	{
		name: "Security",
		items: [
			{
				name: "SSO Configuration",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/sso?env=${environment}&tenant=${tenant}",
			},
			{
				name: "User Management",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/userManagement/?env=${environment}&tenant=${tenant}",
			},
			{
				name: "Client Credentials",
				// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
				url: "https://console.reltio.com/client-credentials?env=${environment}&tenant=${tenant}",
			},
		],
	},
];

const meta = preview.meta({
	component: AppNavigation,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		apps,
		env: "us-prod",
		tenant: "acme-corp",
	},
	decorators: [
		(Story) => (
			<div style={{ height: "100vh", display: "flex" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const WithHome = meta.story({
	args: {
		// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
		homeUrl:
			"https://console.reltio.com/home?env=${environment}&tenant=${tenant}",
	},
});

export const Collapsable = meta.story({
	args: {
		// biome-ignore lint/suspicious/noTemplateCurlyInString: URL template placeholders
		homeUrl:
			"https://console.reltio.com/home?env=${environment}&tenant=${tenant}",
		collapsable: true,
	},
});

export const UnknownAppsFallback = meta.story({
	args: {
		apps: [
			{
				name: "Custom",
				items: [
					{ name: "UI Modeler", url: "https://example.com/ui-modeler" },
					{ name: "Brand New App", url: "https://example.com/new" },
					{ name: "Another Unmapped App", url: "https://example.com/another" },
				],
			},
		],
	},
});
