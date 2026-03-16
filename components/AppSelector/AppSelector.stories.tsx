import preview from "@/.storybook/preview";
import { AppSelector } from "./AppSelector";
import cssClasses from "./AppSelector.module.css";

const meta = preview.meta({
	component: AppSelector,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export default meta;

export const Default = meta.story({
	args: {
		apps: [
			{
				name: "Agents",
				uri: "https://example.com/agent-flow",
				icon: "https://reltio.design/apps/icons/agentflow.svg",
				category: "Agentflow",
			},
			{
				name: "Quality",
				uri: "https://example.com/af-quality",
				icon: "https://reltio.design/apps/icons/af-quality.svg",
				category: "Agentflow",
			},
			{
				name: "Hub",
				uri: "https://example.com/hub",
				icon: "https://reltio.design/apps/icons/mdm.svg",
				category: "Data Cloud",
			},
			{
				name: "Console",
				uri: "https://example.com/console",
				icon: "https://reltio.design/apps/icons/console.svg",
				category: "Data Cloud",
			},
			{
				name: "RDM",
				uri: "https://example.com/rdm",
				icon: "https://reltio.design/apps/icons/rdm.svg",
				category: "Data Cloud",
			},
			{
				name: "Inbox",
				uri: "https://example.com/inbox",
				icon: "https://reltio.design/apps/icons/inbox.svg",
				category: "Data Cloud",
			},
			{
				name: "External Match",
				uri: "https://example.com/external-match",
				icon: "https://reltio.design/apps/icons/external-match.svg",
				category: "Tenant Management",
			},
			{
				name: "Export",
				uri: "https://example.com/export",
				icon: "https://reltio.design/apps/icons/export.svg",
				category: "Tenant Management",
			},
			{
				name: "Data Loader",
				uri: "https://example.com/data-loader",
				icon: "https://reltio.design/apps/icons/data-loader.svg",
				category: "Tenant Management",
			},
			{
				name: "Performance Monitoring",
				uri: "https://example.com/performance-monitoring",
				icon: "https://reltio.design/apps/icons/performance-monitoring.svg",
				category: "Tenant Management",
			},
		],
	},
});

export const UriTemplates = meta.story({
	args: {
		env: "us-prod",
		tenant: "acme-corp",
		apps: [
			{
				name: "Console",
				uri: "https://console.reltio.com/?env=${env}&tenant=${tenant}",
				icon: "https://reltio.design/apps/icons/console.svg",
				category: "Data Cloud",
			},
			{
				name: "Hub",
				uri: "https://hub.reltio.com/?env=${env}&tenant=${tenant}",
				icon: "https://reltio.design/apps/icons/mdm.svg",
				category: "Data Cloud",
			},
			{
				name: "RDM",
				uri: "https://rdm.reltio.com/?env=${env}&tenant=${tenant}",
				icon: "https://reltio.design/apps/icons/rdm.svg",
				category: "Data Cloud",
			},
		],
	},
});

export const OptionalFields = meta.story({
	args: {
		apps: [
			{
				name: "Hub",
				uri: "https://example.com/hub",
				icon: "https://reltio.design/apps/icons/mdm.svg",
				category: "Data Cloud",
			},
			{
				name: "Custom App",
				uri: "https://example.com/custom",
			},
			{
				name: "Another App",
				uri: "https://example.com/another",
				category: "Data Cloud",
			},
			{ uri: "https://example.com/no-name" },
			{ name: "No URI" },
			{},
		],
	},
});
