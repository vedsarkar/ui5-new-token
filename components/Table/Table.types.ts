import type { Table } from "@ui5/webcomponents-react/Table";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Table.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Table` — no Reltio
 * wrapping or prop renaming. Compose with `TableHeaderRow` +
 * `TableHeaderCell` (column headers) and `TableRow` + `TableCell` (data
 * rows), all re-exported from `@reltio/design/components`.
 */
export type TableProps = ComponentPropsWithoutRef<typeof Table>;
