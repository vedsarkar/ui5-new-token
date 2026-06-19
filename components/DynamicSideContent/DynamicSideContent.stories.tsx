import { DynamicSideContent } from "@ui5/webcomponents-react/DynamicSideContent";
import preview from "../../.storybook/preview";

const Panel = ({ label }: { label: string }) => (
	<div
		style={{
			height: "160px",
			padding: "16px",
			borderRadius: "8px",
			background: "var(--sapButton_Background)",
			border: "1px solid var(--sapButton_BorderColor)",
			color: "var(--sapButton_TextColor)",
		}}
	>
		{label}
	</div>
);

const meta = preview.meta({
	component: DynamicSideContent,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
		dualTheme: { split: "vertical" },
	},
	args: {
		children: <Panel label="Main content" />,
		sideContent: <Panel label="Side content" />,
	},
});

export default meta;

export const Default = meta.story({});

export const EqualSplit = meta.story({
	args: {
		equalSplit: true,
	},
});

export const SideContentStart = meta.story({
	args: {
		sideContentPosition: "Start",
	},
});
