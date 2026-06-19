import { Table } from "@ui5/webcomponents-react/Table";
import { TableCell } from "@ui5/webcomponents-react/TableCell";
import { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
import { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
import { TableRow } from "@ui5/webcomponents-react/TableRow";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: TableHeaderCell,
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
				<span>Records</span>
			</TableHeaderCell>
		</TableHeaderRow>
		<TableRow rowKey="1">
			<TableCell>Acme Corp</TableCell>
			<TableCell>1,234</TableCell>
		</TableRow>
	</Table>
));
