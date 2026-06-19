import type { TableHeaderCell } from "@ui5/webcomponents-react/TableHeaderCell";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TableHeaderCell.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TableHeaderCell` — no Reltio
 * wrapping or prop renaming. Used within `Table`. See README.
 */
export type TableHeaderCellProps = ComponentPropsWithoutRef<
	typeof TableHeaderCell
>;
