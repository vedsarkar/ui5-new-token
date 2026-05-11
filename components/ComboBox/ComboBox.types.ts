import type { ComboBox } from "@ui5/webcomponents-react/ComboBox";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ComboBox.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ComboBox` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on filtering, free-text entry, and pairing with
 * `ComboBoxItem` / `ComboBoxItemGroup` children.
 */
export type ComboBoxProps = ComponentPropsWithoutRef<typeof ComboBox>;
