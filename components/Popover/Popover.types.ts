import type { Popover } from "@ui5/webcomponents-react/Popover";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Popover.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Popover` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on `opener`, `placement`, and the `modal` vs. non-modal split.
 */
export type PopoverProps = ComponentPropsWithoutRef<typeof Popover>;
