import { Tab } from "@ui5/webcomponents-react/Tab";
import { TabContainer } from "@ui5/webcomponents-react/TabContainer";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/pending.js";

const meta = preview.meta({
	component: TabContainer,
	tags: ["doc-only"],
	parameters: { layout: "padded" },
	args: {
		onTabSelect: fn(),
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<TabContainer {...args}>
			<Tab text="Pending" selected>
				<div style={{ padding: 16 }}>List of pending tasks.</div>
			</Tab>
			<Tab text="Failed">
				<div style={{ padding: 16 }}>List of failed tasks.</div>
			</Tab>
			<Tab text="Completed">
				<div style={{ padding: 16 }}>List of completed tasks.</div>
			</Tab>
		</TabContainer>
	),
});

export const WithIcons = meta.story({
	render: (args) => (
		<TabContainer {...args}>
			<Tab text="Pending" icon="pending" selected>
				<div style={{ padding: 16 }}>Pending</div>
			</Tab>
			<Tab text="Failed" icon="error">
				<div style={{ padding: 16 }}>Failed</div>
			</Tab>
			<Tab text="Completed" icon="accept">
				<div style={{ padding: 16 }}>Completed</div>
			</Tab>
		</TabContainer>
	),
});

export const WithCounters = meta.story({
	render: (args) => (
		<TabContainer {...args}>
			<Tab text="Pending" additionalText="12" selected>
				<div style={{ padding: 16 }}>Pending — 12 items</div>
			</Tab>
			<Tab text="Failed" additionalText="3">
				<div style={{ padding: 16 }}>Failed — 3 items</div>
			</Tab>
			<Tab text="Completed" additionalText="145">
				<div style={{ padding: 16 }}>Completed — 145 items</div>
			</Tab>
		</TabContainer>
	),
});

export const Inline = meta.story({
	args: { contentBackgroundDesign: "Transparent" },
	render: (args) => (
		<TabContainer {...args}>
			<Tab text="Overview" selected>
				<div style={{ padding: 16 }}>Overview content.</div>
			</Tab>
			<Tab text="Details">
				<div style={{ padding: 16 }}>Details content.</div>
			</Tab>
		</TabContainer>
	),
});

export const FixedTabs = meta.story({
	args: { tabLayout: "Inline" },
	render: (args) => (
		<TabContainer {...args}>
			<Tab text="First" selected>
				<div style={{ padding: 16 }}>First</div>
			</Tab>
			<Tab text="Second">
				<div style={{ padding: 16 }}>Second</div>
			</Tab>
		</TabContainer>
	),
});
