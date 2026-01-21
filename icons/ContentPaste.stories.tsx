import type { Meta, StoryObj } from "@storybook/react";
import { ContentPaste } from "./ContentPaste";

const meta: Meta<typeof ContentPaste> = {
	component: ContentPaste,
	title: "Icons/ContentPaste",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof ContentPaste>;

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
				<ContentPaste size="small" />
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
				<ContentPaste size="medium" />
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
				<ContentPaste size="large" />
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
				<ContentPaste size="xlarge" />
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
				<ContentPaste color="inherited" />
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
				<ContentPaste color="primary" />
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
				<ContentPaste color="success" />
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
				<ContentPaste color="warning" />
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
				<ContentPaste color="error" />
				<span style={{ fontSize: "12px", color: "#666" }}>error</span>
			</div>
		</div>
	),
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "ContentPaste icon",
	},
};
