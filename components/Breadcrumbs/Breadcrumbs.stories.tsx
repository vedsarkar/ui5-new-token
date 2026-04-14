import { expect, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Link } from "@/icons/Link";
import { Breadcrumb } from "./Breadcrumb";
import { Breadcrumbs } from "./Breadcrumbs";
import cssClasses from "./Breadcrumbs.module.css";

const meta = preview.meta({
	component: Breadcrumbs,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export const Default = meta.story({
	render: () => (
		<Breadcrumbs>
			<Breadcrumb href="/">
				<Link size="small" /> Typography
			</Breadcrumb>
			<Breadcrumb href="/products">
				<Link size="small" /> Typography
			</Breadcrumb>
			<Breadcrumb>
				<Link size="small" /> Typography
			</Breadcrumb>
		</Breadcrumbs>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const nav = canvas.getByRole("navigation");

		expect(nav).toHaveAttribute("aria-label", "Breadcrumb");

		const links = canvas.getAllByRole("link");
		expect(links).toHaveLength(2);

		const currentItems = canvasElement.querySelectorAll(
			'[aria-current="page"]',
		);
		expect(currentItems.length).toBe(1);
	},
});

export const ManyItems = meta.story({
	render: () => (
		<Breadcrumbs>
			<Breadcrumb href="/">Home</Breadcrumb>
			<Breadcrumb href="/catalog">Catalog</Breadcrumb>
			<Breadcrumb href="/catalog/electronics">Electronics</Breadcrumb>
			<Breadcrumb href="/catalog/electronics/phones">Phones</Breadcrumb>
			<Breadcrumb>iPhone 16 Pro</Breadcrumb>
		</Breadcrumbs>
	),
});
