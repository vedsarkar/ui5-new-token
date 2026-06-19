import type { SelectDialog } from "@ui5/webcomponents-react/SelectDialog";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori SelectDialog.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/SelectDialog` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for single vs multi selection and the built-in search.
 */
export type SelectDialogProps = ComponentPropsWithoutRef<typeof SelectDialog>;
