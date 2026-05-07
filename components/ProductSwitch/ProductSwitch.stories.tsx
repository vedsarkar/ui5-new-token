import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { Button } from "@ui5/webcomponents-react/Button";
import { Popover } from "@ui5/webcomponents-react/Popover";
import { ProductSwitch } from "@ui5/webcomponents-react/ProductSwitch";
import { ProductSwitchItem } from "@ui5/webcomponents-react/ProductSwitchItem";
import { useState } from "react";
import preview from "@/.storybook/preview";
import "@ui5/webcomponents-icons/dist/grid.js";

type App = {
	name: string;
	uri: string;
	icon: string;
	category: string;
};

const apps: App[] = [
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
		category: "Applications",
	},
	{
		name: "Console",
		uri: "https://example.com/console",
		icon: "https://reltio.design/apps/icons/console.svg",
		category: "Applications",
	},
	{
		name: "RDM",
		uri: "https://example.com/rdm",
		icon: "https://reltio.design/apps/icons/rdm.svg",
		category: "Applications",
	},
	{
		name: "Inbox",
		uri: "https://example.com/inbox",
		icon: "https://reltio.design/apps/icons/inbox.svg",
		category: "Applications",
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
];

const TRIGGER_ID = "reltio-product-switch-trigger";

const renderItem = (app: App) => (
	<ProductSwitchItem
		key={app.name}
		titleText={app.name}
		subtitleText={app.category}
		targetSrc={app.uri}
		target="_blank"
		image={
			<Avatar size="S" shape="Square" colorScheme="Transparent">
				<img src={app.icon} alt="" />
			</Avatar>
		}
	/>
);

type Placement = "Top" | "Bottom" | "Start" | "End";

const TriggerWithPopover = ({
	items = apps,
	placement = "Bottom",
}: {
	items?: App[];
	placement?: Placement;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button
				id={TRIGGER_ID}
				icon="grid"
				accessibleName="Applications"
				onClick={() => setOpen((value) => !value)}
			/>
			<Popover
				opener={TRIGGER_ID}
				open={open}
				placement={placement}
				onClose={() => setOpen(false)}
			>
				<ProductSwitch>{items.map(renderItem)}</ProductSwitch>
			</Popover>
		</>
	);
};

const meta = preview.meta({
	component: ProductSwitch,
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story({
	render: () => <TriggerWithPopover />,
});

export const FewItems = meta.story({
	render: () => <TriggerWithPopover items={apps.slice(2, 6)} />,
});

export const SidePlacement = meta.story({
	render: () => <TriggerWithPopover items={apps.slice(2, 6)} placement="End" />,
});
