import { Grid } from "@ui5/webcomponents-react/Grid";
import preview from "../../.storybook/preview";

const Cell = ({ children }: { children: string }) => (
	<div
		style={{
			height: "48px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
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
	component: Grid,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		children: [
			<Cell key="1">1</Cell>,
			<Cell key="2">2</Cell>,
			<Cell key="3">3</Cell>,
			<Cell key="4">4</Cell>,
		],
	},
});

export default meta;

export const Default = meta.story({});

export const TwoColumns = meta.story({
	args: {
		defaultSpan: "XL6 L6 M6 S12",
	},
});

export const CustomSpacing = meta.story({
	args: {
		defaultSpan: "XL4 L4 M6 S12",
		hSpacing: "2rem",
		vSpacing: "2rem",
	},
});
