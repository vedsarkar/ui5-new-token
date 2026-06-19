import { Breadcrumbs } from "@ui5/webcomponents-react/Breadcrumbs";
import { BreadcrumbsItem } from "@ui5/webcomponents-react/BreadcrumbsItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: BreadcrumbsItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Breadcrumbs>
		<BreadcrumbsItem>Home</BreadcrumbsItem>
		<BreadcrumbsItem>Customers</BreadcrumbsItem>
		<BreadcrumbsItem>Acme Corporation</BreadcrumbsItem>
	</Breadcrumbs>
));
