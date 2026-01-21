import type { Meta, StoryObj } from "@storybook/react";
import { Settings } from "./Settings";

const meta: Meta<typeof Settings> = {
	component: Settings,
	title: "Icons/Settings",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Settings>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings size="small" />
				<span style={{ fontSize: "12px", color: "#666" }}>small</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings size="medium" />
				<span style={{ fontSize: "12px", color: "#666" }}>medium</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings size="large" />
				<span style={{ fontSize: "12px", color: "#666" }}>large</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings size="xlarge" />
				<span style={{ fontSize: "12px", color: "#666" }}>xlarge</span>
			</div>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings color="inherited" />
				<span style={{ fontSize: "12px", color: "#666" }}>inherited</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings color="primary" />
				<span style={{ fontSize: "12px", color: "#666" }}>primary</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings color="success" />
				<span style={{ fontSize: "12px", color: "#666" }}>success</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings color="warning" />
				<span style={{ fontSize: "12px", color: "#666" }}>warning</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<Settings color="error" />
				<span style={{ fontSize: "12px", color: "#666" }}>error</span>
			</div>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Settings icon",
	},
};
