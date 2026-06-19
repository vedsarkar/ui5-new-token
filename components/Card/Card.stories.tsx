import { Card } from "@ui5/webcomponents-react/Card";
import { CardHeader } from "@ui5/webcomponents-react/CardHeader";
import preview from "../../.storybook/preview";

const content = (
	<div style={{ padding: "16px", color: "var(--sapTextColor)" }}>
		A trusted profile aggregated from every connected source system.
	</div>
);

const meta = preview.meta({
	component: Card,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		style: { width: "320px" },
		children: content,
	},
});

export default meta;

export const Default = meta.story({
	args: {
		header: (
			<CardHeader titleText="Customer 360" subtitleText="Acme Corporation" />
		),
	},
});

export const Interactive = meta.story({
	args: {
		header: (
			<CardHeader
				titleText="Open entity"
				subtitleText="Click the header to navigate"
				interactive
			/>
		),
	},
});

export const Loading = meta.story({
	args: {
		loading: true,
		header: <CardHeader titleText="Loading…" />,
	},
});
