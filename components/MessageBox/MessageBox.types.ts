import type { MessageBox } from "@ui5/webcomponents-react/MessageBox";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MessageBox.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MessageBox` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the `type` presets and action handling.
 */
export type MessageBoxProps = ComponentPropsWithoutRef<typeof MessageBox>;
