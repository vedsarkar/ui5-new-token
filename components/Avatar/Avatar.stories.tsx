import { expect, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Star } from "@/icons/Star";
import { Avatar } from "./Avatar";
import cssClasses from "./Avatar.module.css";

const meta = preview.meta({
	component: Avatar,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export const Default = meta.story({
	args: {
		src: "https://i.pravatar.cc/150?u=avatar-default",
		alt: "User avatar",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const img = canvas.getByRole("img");
		expect(img).toBeInTheDocument();
	},
});

export const Initials = meta.story({
	args: {
		children: "AB",
		colorScheme: 6,
	},
});

export const WithIcon = meta.story({
	args: {
		children: <Star />,
		colorScheme: 3,
	},
});

export const SizeXS = meta.story({
	args: {
		size: "xs",
		children: "XS",
		colorScheme: 1,
	},
});

export const SizeS = meta.story({
	args: {
		size: "s",
		children: "S",
		colorScheme: 2,
	},
});

export const SizeM = meta.story({
	args: {
		size: "m",
		children: "M",
		colorScheme: 5,
	},
});

export const SizeL = meta.story({
	args: {
		size: "l",
		children: "L",
		colorScheme: 7,
	},
});

export const SizeXL = meta.story({
	args: {
		size: "xl",
		children: "XL",
		colorScheme: 8,
	},
});

export const Square = meta.story({
	args: {
		shape: "square",
		children: "RS",
		colorScheme: 4,
	},
});

export const ColorSchemes = meta.story({
	render: () => (
		<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
			{([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((scheme) => (
				<Avatar key={scheme} size="s" colorScheme={scheme}>
					{`${scheme}`}
				</Avatar>
			))}
		</div>
	),
});

export const Fallback = meta.story({
	args: {
		src: "https://broken-url.invalid/avatar.png",
	},
	play: async ({ canvasElement }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const imgs = canvasElement.querySelectorAll("img");
		expect(imgs.length).toBe(0);
		const svg = canvasElement.querySelector("svg");
		expect(svg).toBeInTheDocument();
	},
});
