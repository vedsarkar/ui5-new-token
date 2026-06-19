import type { TableRowAction } from "@ui5/webcomponents-react/TableRowAction";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TableRowAction.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TableRowAction` — no Reltio
 * wrapping or prop renaming. Used within `Table`. See README.
 */
export type TableRowActionProps = ComponentPropsWithoutRef<
	typeof TableRowAction
>;
