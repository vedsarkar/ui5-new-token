import { Panel } from "@ui5/webcomponents-react/Panel";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Panel,
	parameters: { layout: "padded" },
	args: {
		headerText: "Section",
		onToggle: fn(),
	},
});

export default meta;

export const Default = meta.story({
	args: {
		children: (
			<div style={{ padding: 16 }}>
				Panel content — any React subtree, including tables, forms, and other
				panels.
			</div>
		),
	},
});

export const Collapsed = meta.story({
	args: {
		collapsed: true,
		children: (
			<div style={{ padding: 16 }}>This content is hidden until expanded.</div>
		),
	},
});

export const FixedHeader = meta.story({
	args: {
		fixed: true,
		children: (
			<div style={{ padding: 16 }}>
				Non-collapsible: the header is text-only, no toggle.
			</div>
		),
	},
});

export const NoHeader = meta.story({
	args: {
		headerText: undefined,
		fixed: true,
		children: <div style={{ padding: 16 }}>Headerless content card.</div>,
	},
});

export const Stacked = meta.story({
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Panel headerText="Entities" onToggle={fn()}>
				<div style={{ padding: 16 }}>Entities content.</div>
			</Panel>
			<Panel headerText="Relationships" onToggle={fn()}>
				<div style={{ padding: 16 }}>Relationships content.</div>
			</Panel>
			<Panel headerText="History" onToggle={fn()} collapsed>
				<div style={{ padding: 16 }}>History content.</div>
			</Panel>
		</div>
	),
});

export const Information = meta.story({
	args: {
		accessibleRole: "Form",
		children: (
			<div style={{ padding: 16 }}>
				Use `accessibleRole` to map the Panel to the right ARIA role for its
				content (Region, Form, Complementary).
			</div>
		),
	},
});
