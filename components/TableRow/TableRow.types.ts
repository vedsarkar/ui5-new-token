import type { TableRow } from "@ui5/webcomponents-react/TableRow";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TableRow.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TableRow` — no Reltio
 * wrapping or prop renaming. Used within `Table`. See README.
 */
export type TableRowProps = ComponentPropsWithoutRef<typeof TableRow>;
