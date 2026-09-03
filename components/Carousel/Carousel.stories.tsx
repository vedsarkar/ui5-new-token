import { Carousel } from "@ui5/webcomponents-react/Carousel";
import preview from "../../.storybook/preview";

const Slide = ({ children }: { children: string }) => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "200px",
			background: "var(--sapButton_Background)",
			border: "1px solid var(--sapButton_BorderColor)",
			color: "var(--sapButton_TextColor)",
			fontSize: "20px",
		}}
	>
		{children}
	</div>
);

const meta = preview.meta({
	component: Carousel,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
		dualTheme: { split: "vertical" },
	},
	args: {
		style: { width: "480px" },
		children: [
			<Slide key="1">Slide 1</Slide>,
			<Slide key="2">Slide 2</Slide>,
			<Slide key="3">Slide 3</Slide>,
		],
	},
});

export default meta;

export const Default = meta.story({});

export const ArrowsOnNavigation = meta.story({
	args: {
		arrowsPlacement: "Navigation",
	},
});

export const Cyclic = meta.story({
	args: {
		cyclic: true,
	},
});

export const MultiPerPage = meta.story({
	args: {
		itemsPerPage: "S1 M2 L2 XL2",
	},
});
