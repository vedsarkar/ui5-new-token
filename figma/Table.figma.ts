// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=191125-43355
// source=components/Table
// component=Table
import figma from "figma";

const instance = figma.selectedInstance;

// Highlight is the leading status strip, which UI5 puts on the row rather than
// the table — `TableRow`'s `highlight`. Structure only picks whether the Figma
// frame shows the column or row axis, and has no bearing on the markup.
const highlight = instance.getBoolean("Highlight");

// Form Factor is content density, set on an ancestor.
export default {
	example: figma.code`
<Table
	headerRow={<TableHeaderRow><TableHeaderCell>{label}</TableHeaderCell></TableHeaderRow>}
>
	<TableRow${highlight ? " highlight={highlight}" : ""}>
		<TableCell>{value}</TableCell>
	</TableRow>
</Table>`,
	imports: [
		'import { Table, TableHeaderRow, TableHeaderCell, TableRow, TableCell } from "@reltio/design/components"',
	],
	id: "table",
	metadata: { nestable: false },
};
