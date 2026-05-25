import type { Dialog } from "@ui5/webcomponents-react/Dialog";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Dialog.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Dialog` — no Reltio
 * wrapping or prop renaming. Use this re-export for modal interactions
 * (confirmations, blocking forms, errors that require acknowledgement).
 */
export type DialogProps = ComponentPropsWithoutRef<typeof Dialog>;
