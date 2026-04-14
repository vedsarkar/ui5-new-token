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
	},
});

export const WithIcon = meta.story({
	args: {
		children: <Star />,
	},
});

export const Sizes = meta.story({
	render: () => (
		<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
			<Avatar size="xs" src="https://i.pravatar.cc/150?u=xs" alt="XS" />
			<Avatar size="sm" src="https://i.pravatar.cc/150?u=sm" alt="SM" />
			<Avatar size="md" src="https://i.pravatar.cc/150?u=md" alt="MD" />
			<Avatar size="lg" src="https://i.pravatar.cc/150?u=lg" alt="LG" />
			<Avatar size="xl" src="https://i.pravatar.cc/150?u=xl" alt="XL" />
		</div>
	),
	play: async ({ canvasElement }) => {
		const avatars = canvasElement.querySelectorAll("span[class]");
		const sizes = [20, 24, 32, 40, 56];
		const rootAvatars = Array.from(avatars).filter(
			(el) => el.parentElement?.style.display === "flex",
		);
		for (let i = 0; i < rootAvatars.length; i++) {
			const { width, height } = rootAvatars[i].getBoundingClientRect();
			expect(width).toBe(sizes[i]);
			expect(height).toBe(sizes[i]);
		}
	},
});

export const Square = meta.story({
	args: {
		shape: "square",
		children: "RS",
	},
});

export const Fallback = meta.story({
	args: {
		src: "https://broken-url.invalid/avatar.png",
	},
	play: async ({ canvasElement }) => {
		// Wait for the image error to trigger fallback
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const imgs = canvasElement.querySelectorAll("img");
		expect(imgs.length).toBe(0);

		// Fallback should show the Person icon (an SVG element)
		const svg = canvasElement.querySelector("svg");
		expect(svg).toBeInTheDocument();
	},
});
