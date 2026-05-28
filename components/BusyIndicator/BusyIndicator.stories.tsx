import { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: BusyIndicator,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		active: true,
		delay: 0,
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<BusyIndicator {...args}>
			<div
				style={{
					width: "240px",
					height: "120px",
					padding: "16px",
					border: "1px solid var(--sapList_BorderColor)",
					borderRadius: "8px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "var(--sapContent_LabelColor)",
				}}
			>
				Wrapped content
			</div>
		</BusyIndicator>
	),
});

export const WithText = meta.story({
	args: {
		text: "Loading entity…",
	},
	render: (args) => (
		<BusyIndicator {...args}>
			<div
				style={{
					width: "280px",
					height: "120px",
					padding: "16px",
					border: "1px solid var(--sapList_BorderColor)",
					borderRadius: "8px",
				}}
			/>
		</BusyIndicator>
	),
});

export const TextPlacementBottom = meta.story({
	args: {
		text: "Validating…",
		textPlacement: "Bottom",
	},
	render: (args) => (
		<BusyIndicator {...args}>
			<div
				style={{
					width: "280px",
					height: "120px",
					border: "1px solid var(--sapList_BorderColor)",
					borderRadius: "8px",
				}}
			/>
		</BusyIndicator>
	),
});

export const SizeSmall = meta.story({
	args: {
		size: "S",
	},
	render: (args) => (
		<BusyIndicator {...args}>
			<div style={{ width: "120px", height: "32px" }} />
		</BusyIndicator>
	),
});

export const SizeLarge = meta.story({
	args: {
		size: "L",
	},
	render: (args) => (
		<BusyIndicator {...args}>
			<div
				style={{
					width: "320px",
					height: "200px",
					border: "1px solid var(--sapList_BorderColor)",
					borderRadius: "8px",
				}}
			/>
		</BusyIndicator>
	),
});

export const InactiveShowsContent = meta.story({
	args: {
		active: false,
	},
	render: (args) => (
		<BusyIndicator {...args}>
			<div
				style={{
					width: "280px",
					padding: "20px",
					border: "1px solid var(--sapList_BorderColor)",
					borderRadius: "8px",
				}}
			>
				Operation complete — content fully visible.
			</div>
		</BusyIndicator>
	),
});

export const DelayedAppearance = meta.story({
	args: {
		delay: 1500,
		text: "Spinner appears after 1.5s of latency",
	},
	render: (args) => (
		<BusyIndicator {...args}>
			<div
				style={{
					width: "320px",
					height: "120px",
					border: "1px solid var(--sapList_BorderColor)",
					borderRadius: "8px",
				}}
			/>
		</BusyIndicator>
	),
});
