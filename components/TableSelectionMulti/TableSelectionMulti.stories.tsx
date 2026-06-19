import { Table } from "@ui5/webcomponents-react/Table";
import { TableCell } from "@ui5/webcomponents-react/TableCell";
import { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
import { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
import { TableRow } from "@ui5/webcomponents-react/TableRow";
import { TableSelectionMulti } from "@ui5/webcomponents-react/TableSelectionMulti";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: TableSelectionMulti,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Table features={<TableSelectionMulti />}>
		<TableHeaderRow slot="headerRow">
			<TableHeaderCell>
				<span>Entity</span>
			</TableHeaderCell>
		</TableHeaderRow>
		<TableRow rowKey="1">
			<TableCell>Acme Corp</TableCell>
		</TableRow>
		<TableRow rowKey="2">
			<TableCell>Globex</TableCell>
		</TableRow>
	</Table>
));
