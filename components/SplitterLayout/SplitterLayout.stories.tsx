import { SplitterElement } from "@ui5/webcomponents-react/SplitterElement";
import { SplitterLayout } from "@ui5/webcomponents-react/SplitterLayout";
import preview from "../../.storybook/preview";

const Pane = ({ label }: { label: string }) => (
	<div style={{ padding: "16px", color: "var(--sapTextColor)" }}>{label}</div>
);

const meta = preview.meta({
	component: SplitterLayout,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
		dualTheme: { split: "vertical" },
	},
	args: {
		style: { height: "240px", width: "520px" },
	},
});

export default meta;

export const Horizontal = meta.story({
	render: (args) => (
		<SplitterLayout {...args}>
			<SplitterElement size="30%" minSize={120}>
				<Pane label="List" />
			</SplitterElement>
			<SplitterElement>
				<Pane label="Details" />
			</SplitterElement>
		</SplitterLayout>
	),
});

export const Vertical = meta.story({
	render: (args) => (
		<SplitterLayout {...args} vertical>
			<SplitterElement size="40%" minSize={80}>
				<Pane label="Top" />
			</SplitterElement>
			<SplitterElement>
				<Pane label="Bottom" />
			</SplitterElement>
		</SplitterLayout>
	),
});

export const ThreePanes = meta.story({
	render: (args) => (
		<SplitterLayout {...args}>
			<SplitterElement size="25%" minSize={100}>
				<Pane label="Navigation" />
			</SplitterElement>
			<SplitterElement>
				<Pane label="Content" />
			</SplitterElement>
			<SplitterElement size="25%" minSize={100}>
				<Pane label="Inspector" />
			</SplitterElement>
		</SplitterLayout>
	),
});
