import type { TableHeaderRow } from "@ui5/webcomponents-react/TableHeaderRow";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TableHeaderRow.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TableHeaderRow` — no Reltio
 * wrapping or prop renaming. Used within `Table`. See README.
 */
export type TableHeaderRowProps = ComponentPropsWithoutRef<
	typeof TableHeaderRow
>;
