import type { TableCell } from "@ui5/webcomponents-react/TableCell";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TableCell.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TableCell` — no Reltio
 * wrapping or prop renaming. Used within `Table`. See README.
 */
export type TableCellProps = ComponentPropsWithoutRef<typeof TableCell>;
