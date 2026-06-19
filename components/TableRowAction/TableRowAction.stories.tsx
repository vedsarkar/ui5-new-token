import { Table } from "@ui5/webcomponents-react/Table";
import { TableCell } from "@ui5/webcomponents-react/TableCell";
import { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
import { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
import { TableRow } from "@ui5/webcomponents-react/TableRow";
import { TableRowAction } from "@ui5/webcomponents-react/TableRowAction";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/edit.js";

const meta = preview.meta({
	component: TableRowAction,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Table>
		<TableHeaderRow slot="headerRow">
			<TableHeaderCell>
				<span>Entity</span>
			</TableHeaderCell>
		</TableHeaderRow>
		<TableRow rowKey="1" actions={<TableRowAction icon="edit" text="Edit" />}>
			<TableCell>Acme Corp</TableCell>
		</TableRow>
	</Table>
));
