import { Icon } from "@ui5/webcomponents-react/Icon";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/information.js";
import "@ui5/webcomponents-icons/dist/save.js";

const meta = preview.meta({
	component: Icon,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		name: "save",
	},
});

export default meta;

export const Default = meta.story({});

export const ImageMode = meta.story({
	args: {
		name: "accept",
		mode: "Image",
		accessibleName: "Approved",
	},
});

export const Interactive = meta.story({
	args: {
		name: "edit",
		mode: "Interactive",
		accessibleName: "Edit entity",
		onClick: fn(),
	},
});

export const DesignNegative = meta.story({
	args: {
		name: "decline",
		design: "Negative",
		mode: "Image",
		accessibleName: "Rejected",
	},
});

export const DesignCritical = meta.story({
	args: {
		name: "alert",
		design: "Critical",
		mode: "Image",
		accessibleName: "Needs review",
	},
});

export const DesignPositive = meta.story({
	args: {
		name: "accept",
		design: "Positive",
		mode: "Image",
		accessibleName: "Approved",
	},
});

export const DesignInformation = meta.story({
	args: {
		name: "information",
		design: "Information",
		mode: "Image",
		accessibleName: "Additional information available",
	},
});

export const InContrastSurface = meta.story({
	args: {
		name: "save",
		design: "Contrast",
	},
	render: (args) => (
		<div
			style={{
				background: "var(--sapShellColor)",
				padding: "16px",
				borderRadius: "8px",
				display: "inline-flex",
			}}
		>
			<Icon {...args} />
		</div>
	),
});
