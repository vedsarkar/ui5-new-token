import { Table } from "@ui5/webcomponents-react/Table";
import { TableCell } from "@ui5/webcomponents-react/TableCell";
import { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
import { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
import { TableRow } from "@ui5/webcomponents-react/TableRow";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: TableRow,
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
			<TableHeaderCell>
				<span>Status</span>
			</TableHeaderCell>
		</TableHeaderRow>
		<TableRow rowKey="1">
			<TableCell>Acme Corp</TableCell>
			<TableCell>Active</TableCell>
		</TableRow>
		<TableRow rowKey="2">
			<TableCell>Globex</TableCell>
			<TableCell>Pending</TableCell>
		</TableRow>
	</Table>
));
