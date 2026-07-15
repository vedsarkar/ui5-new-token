"use client";

import {
	Table,
	TableCell,
	TableHeaderCell,
	TableHeaderRow,
	TableRow,
} from "@reltio/design/components";
import { useConfig } from "@/lib/useConfig";

// Lists the Reltio environments from the public config as a table. `name` is
// the client-side environment id (passed as a query param elsewhere); `label`
// is its display string; `apiPath` is the main Reltio API the app talks to.
export default function EnvironmentsPage() {
	const { data, error, isLoading } = useConfig();
	const environments = data?.environments ?? [];

	return (
		<section>
			<h2 style={{ color: "var(--sapTitleColor)" }}>Environments</h2>

			{isLoading && (
				<p style={{ color: "var(--sapContent_LabelColor)" }}>Loading…</p>
			)}

			{error != null && (
				<p style={{ color: "var(--sapNegativeColor)" }}>
					Failed to load the environments.
				</p>
			)}

			{data && (
				<Table
					noDataText="No environments configured."
					headerRow={
						<TableHeaderRow>
							<TableHeaderCell width="12rem">Label</TableHeaderCell>
							<TableHeaderCell width="12rem">Name</TableHeaderCell>
							<TableHeaderCell>API path</TableHeaderCell>
						</TableHeaderRow>
					}
				>
					{environments.map((environment) => (
						<TableRow key={environment.name} rowKey={environment.name}>
							<TableCell>{environment.label}</TableCell>
							<TableCell>{environment.name}</TableCell>
							<TableCell>{environment.apiPath}</TableCell>
						</TableRow>
					))}
				</Table>
			)}
		</section>
	);
}
