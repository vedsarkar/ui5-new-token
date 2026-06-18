import { Link } from "@ui5/webcomponents-react/Link";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Link,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: "View source record",
		href: "https://www.reltio.com",
		target: "_blank",
		onClick: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const Subtle = meta.story({
	args: {
		design: "Subtle",
		children: "Show details",
	},
});

export const Emphasized = meta.story({
	args: {
		design: "Emphasized",
		children: "Open full profile",
	},
});

export const ActionLink = meta.story({
	args: {
		href: undefined,
		target: undefined,
		children: "Merge candidates",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		children: "Unavailable action",
	},
});
