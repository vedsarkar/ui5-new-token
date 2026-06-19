import { Breadcrumbs } from "@ui5/webcomponents-react/Breadcrumbs";
import { BreadcrumbsItem } from "@ui5/webcomponents-react/BreadcrumbsItem";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Breadcrumbs,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
	args: {
		onItemClick: fn(),
		children: [
			<BreadcrumbsItem key="1">Home</BreadcrumbsItem>,
			<BreadcrumbsItem key="2">Customers</BreadcrumbsItem>,
			<BreadcrumbsItem key="3">Acme Corporation</BreadcrumbsItem>,
		],
	},
});

export default meta;

export const Default = meta.story({});

export const NoCurrentPage = meta.story({
	args: {
		design: "NoCurrentPage",
	},
});

export const GreaterThanSeparator = meta.story({
	args: {
		separators: "GreaterThan",
	},
});
