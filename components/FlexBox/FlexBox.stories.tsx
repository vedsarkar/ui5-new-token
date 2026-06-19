import { FlexBox } from "@ui5/webcomponents-react/FlexBox";
import preview from "../../.storybook/preview";

const Box = ({ children }: { children: string }) => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			minWidth: "64px",
			height: "48px",
			padding: "0 12px",
			borderRadius: "8px",
			background: "var(--sapButton_Background)",
			border: "1px solid var(--sapButton_BorderColor)",
			color: "var(--sapButton_TextColor)",
		}}
	>
		{children}
	</div>
);

const meta = preview.meta({
	component: FlexBox,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		gap: "8px",
		children: [
			<Box key="a">One</Box>,
			<Box key="b">Two</Box>,
			<Box key="c">Three</Box>,
		],
	},
});

export default meta;

export const Row = meta.story({
	args: {
		direction: "Row",
	},
});

export const Column = meta.story({
	args: {
		direction: "Column",
	},
});

export const JustifySpaceBetween = meta.story({
	args: {
		justifyContent: "SpaceBetween",
		fitContainer: true,
	},
});

export const AlignCenter = meta.story({
	args: {
		alignItems: "Center",
		justifyContent: "Center",
		fitContainer: true,
		style: { height: "160px", border: "1px dashed var(--sapList_BorderColor)" },
	},
});

export const Wrap = meta.story({
	args: {
		wrap: "Wrap",
		style: { maxWidth: "180px" },
	},
});
