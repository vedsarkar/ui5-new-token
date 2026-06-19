import { List } from "@ui5/webcomponents-react/List";
import { ListItemGroup } from "@ui5/webcomponents-react/ListItemGroup";
import { ListItemStandard } from "@ui5/webcomponents-react/ListItemStandard";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ListItemGroup,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<List style={{ width: "320px" }}>
		<ListItemGroup headerText="Sources">
			<ListItemStandard>Salesforce CRM</ListItemStandard>
			<ListItemStandard>SAP ERP</ListItemStandard>
		</ListItemGroup>
		<ListItemGroup headerText="Derived">
			<ListItemStandard>Golden record</ListItemStandard>
		</ListItemGroup>
	</List>
));
