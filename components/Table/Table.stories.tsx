import { Table } from "@ui5/webcomponents-react/Table";
import { TableCell } from "@ui5/webcomponents-react/TableCell";
import { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
import { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
import { TableRow } from "@ui5/webcomponents-react/TableRow";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Table,
	tags: ["doc-only"],
	parameters: { layout: "padded" },
	args: {
		onRowClick: fn(),
	},
});

export default meta;

const rows = [
	{ id: "ent-001", name: "Acme Corp", status: "Active", records: 1234 },
	{ id: "ent-002", name: "Globex", status: "Pending", records: 56 },
	{ id: "ent-003", name: "Initech", status: "Archived", records: 9821 },
	{ id: "ent-004", name: "Hooli", status: "Active", records: 412 },
];

export const Default = meta.story({
	render: (args) => (
		<Table {...args}>
			<TableHeaderRow slot="headerRow">
				<TableHeaderCell>
					<span>Entity</span>
				</TableHeaderCell>
				<TableHeaderCell>
					<span>Status</span>
				</TableHeaderCell>
				<TableHeaderCell>
					<span>Records</span>
				</TableHeaderCell>
			</TableHeaderRow>
			{rows.map((r) => (
				<TableRow key={r.id} rowKey={r.id}>
					<TableCell>{r.name}</TableCell>
					<TableCell>{r.status}</TableCell>
					<TableCell>{r.records.toLocaleString()}</TableCell>
				</TableRow>
			))}
		</Table>
	),
});

export const Empty = meta.story({
	render: (args) => (
		<Table {...args} noDataText="No records to display">
			<TableHeaderRow slot="headerRow">
				<TableHeaderCell>
					<span>Entity</span>
				</TableHeaderCell>
				<TableHeaderCell>
					<span>Status</span>
				</TableHeaderCell>
			</TableHeaderRow>
		</Table>
	),
});

export const SingleColumn = meta.story({
	render: (args) => (
		<Table {...args}>
			<TableHeaderRow slot="headerRow">
				<TableHeaderCell>
					<span>Entity</span>
				</TableHeaderCell>
			</TableHeaderRow>
			{rows.map((r) => (
				<TableRow key={r.id} rowKey={r.id}>
					<TableCell>{r.name}</TableCell>
				</TableRow>
			))}
		</Table>
	),
});

export const ManyRows = meta.story({
	render: (args) => {
		const many = Array.from({ length: 50 }, (_, i) => ({
			id: `row-${i}`,
			name: `Entity ${i + 1}`,
			status: i % 3 === 0 ? "Active" : "Pending",
		}));
		return (
			<div style={{ height: 400 }}>
				<Table {...args}>
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell>
							<span>Entity</span>
						</TableHeaderCell>
						<TableHeaderCell>
							<span>Status</span>
						</TableHeaderCell>
					</TableHeaderRow>
					{many.map((r) => (
						<TableRow key={r.id} rowKey={r.id}>
							<TableCell>{r.name}</TableCell>
							<TableCell>{r.status}</TableCell>
						</TableRow>
					))}
				</Table>
			</div>
		);
	},
});
