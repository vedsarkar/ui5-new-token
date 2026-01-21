import type { Meta, StoryObj } from "@storybook/react";
import { ChevronLeft } from "./ChevronLeft";

const meta: Meta<typeof ChevronLeft> = {
	component: ChevronLeft,
	title: "Icons/ChevronLeft",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ChevronLeft>;

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
				<ChevronLeft size="small" />
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
				<ChevronLeft size="medium" />
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
				<ChevronLeft size="large" />
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
				<ChevronLeft size="xlarge" />
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
				<ChevronLeft color="inherited" />
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
				<ChevronLeft color="primary" />
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
				<ChevronLeft color="success" />
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
				<ChevronLeft color="warning" />
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
				<ChevronLeft color="error" />
				<span style={{ fontSize: "12px", color: "#666" }}>error</span>
			</div>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ChevronLeft icon",
	},
};
